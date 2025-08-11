<template>
  <Page auto-content-height>
    <BasicTable @register="registerTable">
      <template #toolbar-tools>
        <Button type="primary" @click="handleExport"> 导出Excel </Button>
      </template>

      <template #action="{row}">
        <TableAction :actions="createActions(row)" />
      </template>
      <template #personalName="{row}">
        <EmpInfo :no="row.personalCode" :name="row.personalName" />
      </template>
    </BasicTable>
    <ApproveHistoryModal ref="approveHistoryModalRef" @register="registerApproveHistoryModal" />
    <FlowPropertiesModal ref="flowPropertiesModalRef" @register="registerFlowPropertiesModal" />
    <BpmnPreviewModal ref="bpmnPreviewModalRef" @register="registerBpmnPreviewModal" @success="handleSuccess" />
  </Page>
</template>
<script lang="ts" setup>
  import { nextTick } from 'vue';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {VxeGridProps, VxeGridListeners} from '#/adapter/vxe-table';

  import {useVbenVxeGrid} from '#/adapter/vxe-table';

  // import { BasicTable, useTable, TableAction } from '@/components/Table';
  import {BpmnPreviewModal} from '#/views/components/preview';
  import { getAll } from '#/api/base/app';
  // import { useLoading } from '@/components/Loading';
  import { columns, searchFormSchema } from './nodeCount.data';
  import type {Recordable} from '@vben/types';

  import ApproveHistoryModal from '#/views/flowoperation/processInst/ApproveHistoryModal.vue';
  import FlowPropertiesModal from '#/views/flowoperation/processInst/FlowPropertiesModal.vue';
  import { EmpInfo } from '#/views/components/EmpInfo';
  // import { useModal } from '@/components/Modal';
  import { exportExcel, getModelByNodeReportQueryVo } from '#/api/report/nodeCount';
  import { downloadBlob, downloadByOnlineUrl, downloadByUrl } from '#/utils/file/download';
  import { Button, message } from 'ant-design-vue';
  import {TableAction} from '#/components/table-action';
  import {getCustomPagerModel} from "#/api/form/customForm";
  import {ColPage, Page} from '@vben/common-ui';

  // const { createMessage } = useMessage();
  // const [openFullLoading, closeFullLoading] = useLoading({
  //   tip: '下载中...',
  // });

/*  const [registerApproveHistoryModal, { openModal: openApproveHistoryModal, setModalProps }] =
    useModal();
  const [
    registerFlowPropertiesModal,
    { openModal: openFlowPropertiesModal, setModalProps: setFlowPropertiesModalProps },
  ] = useModal();
  const [
    registerBpmnPreviewModal,
    { openModal: openBpmnPreviewModal, setModalProps: setBpmnPreviewProps },
  ] = useModal();*/

  /*const [registerTable, { getForm, reload }] = useTable({
    title: '列表',
    api: getModelByNodeReportQueryVo,
    immediate: false,
    columns,
    formConfig: {
      labelWidth: 100,
      schemas: searchFormSchema,
      showAdvancedButton: false,
      showResetButton: false,
      autoSubmitOnEnter: true,
      submitFunc: doSearchFunc,
    },
    useSearchForm: true,
    bordered: true,
    pagination: false,
    showIndexColumn: true,
    actionColumn: {
      width: 140,
      title: '操作',
      dataIndex: 'action',
    },
  });*/


  const formOptions: VbenFormProps = {
    showCollapseButton: false,
    submitOnEnter: true,
    commonConfig: {
      labelWidth: 60,
    },
    wrapperClass: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    actionWrapperClass: 'pl-2 !justify-end md:!justify-start',
    actionPosition: 'left',
    actionLayout: 'inline',
    resetButtonOptions: {
      show: false,
    },
    schema: searchFormSchema,
  };

  const gridOptions: VxeGridProps = {
    columns,
    columnConfig: {resizable: true},
    height: 'auto',
    border: false,
    keepSource: true,
    autoResize: false,
    stripe: true,
    round: false,
    radioConfig: {
      highlight: true,
      labelField: 'name',
      trigger: 'row',
    },
    proxyConfig: {
      ajax: {
        query: async ({page}, formValues) => {
          // currentModelInfo.value = {};
          return await getModelByNodeReportQueryVo({
            query: {
              pageNum: page.currentPage,
              pageSize: page.pageSize,
            },
            entity: formValues || {},
          });
        },
      },
    },
  };

  const gridEvents: VxeGridListeners = {
    radioChange: ({row}) => {
      // clickRow(row);
    }
  };

  const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions, gridEvents});


  nextTick(() => {
    // const { updateSchema } = getForm();
    /*getAll().then((res) => {
      updateSchema([
        {
          field: 'appSn',
          componentProps: { options: res, labelField: 'id' },
        },
      ]);
    });*/
  });

  function createActions(row: Recordable<any>) {
    return [
      {
        icon: 'ant-design:partition-outlined',
        tooltip: '流程图预览',
        label: '',
        onClick: handlePreview.bind(null, row),
      },
      /*{
        tooltip: '审批记录',
        icon: 'ant-design:history-outlined',
        onClick: handleViewApproveHistory.bind(null, record),
      },
      {
        tooltip: '审批变量',
        icon: 'ant-design:profile-outlined',
        onClick: handleViewFlowProperties.bind(null, record),
      },*/
    ];
  }

  /**
   *  自定义搜索功能
   **/
  async function doSearchFunc() {
    const { validate, setProps } = getForm();
    try {
      const values = await validate();
      if (!values.userNo) {
        createMessage.warning('请选择人员进行查询！');
        return;
      }
      setProps({
        submitButtonOptions: {
          loading: true,
        },
      });
      await reload(values);
    } catch (error) {
    } finally {
      setProps({
        submitButtonOptions: {
          loading: false,
        },
      });
    }
  }

  function handleViewApproveHistory(record: Recordable<any>) {
    openApproveHistoryModal(true, {
      record,
      isUpdate: true,
    });
    setModalProps({
      width: 800,
      height: 500,
      title: `查看流程【${record.modelName}】的审批记录`,
      showOkBtn: false,
      cancelText: '关闭',
    });
  }

  function handleViewFlowProperties(record: Recordable<any>) {
    openFlowPropertiesModal(true, {
      record,
    });
    setFlowPropertiesModalProps({
      width: 800,
      height: 500,
      title: `查看流程【${record.modelName}】的变量`,
      showOkBtn: false,
      cancelText: '关闭',
    });
  }

  function handlePreview(record: Recordable<any>) {
    openBpmnPreviewModal(true, {
      modelKey: record.modelKey,
      procInstId: record.processInstanceId,
    });
    setBpmnPreviewProps({
      title: `预览-${record.modelName}`,
      centered: true,
      useWrapper: false,
      showOkBtn: false,
      cancelText: '关闭',
    });
  }

  async function handleExport() {
    openFullLoading();
    const { validate } = getForm();
    const values = await validate();
    exportExcel(values)
      .then((res) => {
        downloadBlob(res, '人员节点统计.xlsx');
      })
      .finally(() => {
        setTimeout(() => {
          closeFullLoading();
        }, 500);
      });
  }

  function handleSuccess() {
    reload();
  }
</script>
