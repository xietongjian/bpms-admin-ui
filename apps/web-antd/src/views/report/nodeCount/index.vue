<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleExport"> 导出Excel </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:partition-outlined',
                tooltip: '流程图预览',
                label: '',
                onClick: handlePreview.bind(null, record),
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
            ]"
          />
        </template>

        <template v-else-if="column.key === 'personalName'">
          <EmpInfo :no="record.personalCode" :name="record.personalName" />
        </template>
      </template>
    </BasicTable>
    <ApproveHistoryModal @register="registerApproveHistoryModal" />
    <FlowPropertiesModal @register="registerFlowPropertiesModal" />
    <BpmnPreviewModal @register="registerBpmnPreviewModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { nextTick } from 'vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import BpmnPreviewModal from '#/views/components/preview/bpmnPreview/index.vue';
  import { getAll } from '#/api/base/app';
  import { useLoading } from '@/components/Loading';
  import { columns, searchFormSchema } from './nodeCount.data';
  import ApproveHistoryModal from '#/views/flowoperation/processInst/ApproveHistoryModal.vue';
  import FlowPropertiesModal from '#/views/flowoperation/processInst/FlowPropertiesModal.vue';
  import {EmpInfo} from '#/views/components/EmpInfo';
  import { useModal } from '@/components/Modal';
  import { exportExcel, getModelByNodeReportQueryVo } from '#/api/report/nodeCount';
  import { downloadBlob, downloadByOnlineUrl, downloadByUrl } from '#/utils/file/download';

  const { createMessage } = useMessage();
  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '下载中...',
  });

  const [registerApproveHistoryModal, { openModal: openApproveHistoryModal, setModalProps }] =
    useModal();
  const [
    registerFlowPropertiesModal,
    { openModal: openFlowPropertiesModal, setModalProps: setFlowPropertiesModalProps },
  ] = useModal();
  const [
    registerBpmnPreviewModal,
    { openModal: openBpmnPreviewModal, setModalProps: setBpmnPreviewProps },
  ] = useModal();

  const [registerTable, { getForm, reload }] = useTable({
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
  });

  nextTick(() => {
    const { updateSchema } = getForm();
    getAll().then((res) => {
      updateSchema([
        {
          field: 'appSn',
          componentProps: { options: res, labelField: 'id' },
        },
      ]);
    });
  });

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

  function handleViewApproveHistory(record: Recordable) {
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

  function handleViewFlowProperties(record: Recordable) {
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

  function handlePreview(record: Recordable) {
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
