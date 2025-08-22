<template>
  <Page auto-content-height>
    <BasicTable >
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
    <ApproveHistoryModal ref="approveHistoryModalRef" />
    <FlowPropertiesModal ref="flowPropertiesModalRef" />
    <BpmnPreviewModal ref="bpmnPreviewModalRef" @success="handleSuccess" />
  </Page>
</template>
<script lang="ts" setup>
  import { nextTick, ref } from 'vue';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {VxeGridProps, VxeGridListeners} from '#/adapter/vxe-table';
  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {BpmnPreviewModal} from '#/views/components/preview';
  import { columns, searchFormSchema } from './nodeCount.data';
  import type {Recordable} from '@vben/types';
  import ApproveHistoryModal from '#/views/flowoperation/processInst/ApproveHistoryModal.vue';
  import FlowPropertiesModal from '#/views/flowoperation/processInst/FlowPropertiesModal.vue';
  import { EmpInfo } from '#/views/components/EmpInfo';
  import { exportExcel, getModelByNodeReportQueryVo } from '#/api/report/nodeCount';
  import { downloadBlob, downloadByOnlineUrl, downloadByUrl } from '#/utils/file/download';
  import { Button, message } from 'ant-design-vue';
  import {TableAction} from '#/components/table-action';
  import {Page} from '@vben/common-ui';

  const bpmnPreviewModalRef = ref();

  const formOptions: VbenFormProps = {
    showCollapseButton: false,
    submitOnEnter: true,
    commonConfig: {
      labelWidth: 60,
    },
    wrapperClass: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
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
    pagerConfig: {
      enabled: false,
    },
    proxyConfig: {
      ajax: {
        query: async ({}, formValues) => {
          let userNo = '';
          // currentModelInfo.value = {};
          if (formValues.userNo && formValues.userNo.length > 0) {
            userNo = formValues.userNo[0].code;
          }

          return await getModelByNodeReportQueryVo({...formValues, userNo});
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

  function handleViewApproveHistory(record: Recordable<any>) {

  }

  function handleViewFlowProperties(record: Recordable<any>) {

  }

  function handlePreview(record: Recordable<any>) {
    bpmnPreviewModalRef.value.setData({
      modelKey: record.modelKey,
      procInstId: record.processInstanceId,
    });
    bpmnPreviewModalRef.value.open();
  }

  async function handleExport() {
    /*openFullLoading();
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
      });*/
  }

  function handleSuccess() {
    tableApi.reload();
  }
</script>
