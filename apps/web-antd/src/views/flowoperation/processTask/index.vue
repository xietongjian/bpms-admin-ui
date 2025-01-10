<template>
  <Page auto-content-height>
    <BasicTable>
      <template #action="{ row }">
        <TableAction
            :actions="createActions(row)"
            :dropDownActions="createDropDownActions(row)"
        />
      </template>

      <template #formName="{ row }">
        <Tooltip title="查看流程图">
          <a>
            <PartitionOutlined @click="handlePreview(row)" />
          </a>
        </Tooltip>

        <Tooltip placement="topLeft" :mouseEnterDelay="0.3">
          <template #title>
            {{ row.formName }}
          </template>
          {{ row.formName }}
        </Tooltip>
      </template>

      <template #assigneeName="{ row }">
        <div class="text-right">
          <Space>
            <EmpInfo :no="row.assignee" :name="row.assigneeName" />
            <Button v-access:code="PerPrefix + PerEnum.UPDATE" size="small" type="error" @click="handleChangeAssignee(row)">变更</Button>
          </Space>
        </div>
      </template>

      <template #taskId="{ row }">
        <a @click="doCopyContent(row.taskId)"><CopyOutlined /></a>
        {{ row.taskId }}
      </template>

      <template #businessKey="{ row }">
        <a v-if="!!row.businessKey" @click="doCopyContent(row.businessKey)"><CopyOutlined /></a>
        {{ row.businessKey || '' }}
      </template>

      <template #processInstanceId="{ row }">
        <a @click="doCopyContent(row.processInstanceId)"><CopyOutlined /></a>
        {{ row.processInstanceId }}
      </template>

      <template #startPersonName="{ row }">
        <EmpInfo :no="row.startPersonCode" :name="row.startPersonName" />
      </template>

      <template #processStatusName="{ row }">
        <ProcessStatus :value="row.processStatus" :text="row.processStatusName" />
      </template>

    </BasicTable>
    <BpmnPreviewModal ref="bpmnPreviewModalRef" @register="registerBpmnPreviewModal" @success="handleSuccess" />
    <PersonalSelectorModal ref="personalSelectorModalRef"
      @register="registerPersonalModal"
      @change="handleSettingPersonalSuccess"
    />
    <FlowPropertiesModal ref="flowPropertiesModalRef" @register="registerFlowPropertiesModal" />
    <ApproveHistoryModal ref="approveHistoryModalRef" @register="registerApproveHistoryModal" />
    <ProcessFormModal ref="processFormModalRef"
      @register="registerProcessFormModal"
      @reload="handleProcessFormVisibleChange"
    />
  </Page>
</template>
<script lang="ts" setup>
  import { createVNode, nextTick, ref, unref } from 'vue';
  import { useVbenVxeGrid } from '#/adapter/vxe-table';
  import type {Recordable} from '@vben/types';
  import type {VxeGridProps} from '#/adapter/vxe-table';
  import type {VbenFormProps} from '@vben/common-ui';
  import {Page} from '@vben/common-ui';
  import {
    completeBackStage,
    getPagerModelRunTasks,
    stopProcess,
    updateAssignee,
  } from '#/api/flowoperation/processTask';
  import {BpmnPreviewModal} from '#/views/components/preview';
  // import PersonalSelectorModal from '#/components/Selector/src/PersonalSelectorModal.vue';
  import FlowPropertiesModal from '../processInst/FlowPropertiesModal.vue';
  import { columns, searchFormSchema } from './processTask.data';
  import ApproveHistoryModal from '../processInst/ApproveHistoryModal.vue';
  import ProcessFormModal from './ProcessFormModal.vue';
  import {
    CopyOutlined,
    PartitionOutlined,
    ExclamationCircleOutlined,
  } from '@ant-design/icons-vue';
  import { Tooltip, Space, Modal, Button, message } from 'ant-design-vue';
  import { PerEnum } from '#/enums/perEnum';
  import {EmpInfo} from '#/views/components/EmpInfo';
  import {TableAction} from '#/components/table-action';
  import { useClipboard } from '@vueuse/core';

  import ProcessStatus from '#/views/components/process/ProcessStatus.vue';

  const { copy } = useClipboard({ legacy: true });

  defineOptions({ name: 'ProcessTask' });
  const PerPrefix = 'ProcessTask:';
  const bpmnPreviewModalRef = ref(),
    personalSelectorModalRef = ref(),
    flowPropertiesModalRef = ref(),
    approveHistoryModalRef = ref(),
    processFormModalRef = ref();

  // 人员选择弹窗
  /*const [
    registerPersonalModal,
    { openModal: openPersonalSelector, setModalProps: setPersonalModalProps },
  ] = useModal();
  const currentTask = ref<Recordable>({});
  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '执行中...',
  });
  const [registerApproveHistoryModal, { openModal: openApproveHistoryModal, setModalProps }] =
    useModal();
  const [
    registerFlowPropertiesModal,
    { openModal: openFlowPropertiesModal, setModalProps: setFlowPropertiesModalProps },
  ] = useModal();
  const [
    registerProcessFormModal,
    { openModal: openProcessFormModal, setModalProps: setProcessFormModalProps },
  ] = useModal();
  const [
    registerBpmnPreviewModal,
    { openModal: openBpmnPreviewModal, setModalProps: setBpmnPreviewProps },
  ] = useModal();*/

  /*const [registerTable, { getForm, reload }] = useTable({
    title: '',
    size: 'small',
    api: getPagerModelRunTasks,
    columns,
    formConfig: {
      labelWidth: 90,
      schemas: searchFormSchema,
      showAdvancedButton: true,
      showResetButton: true,
      autoAdvancedLine: 1,
      alwaysShowLines: 1,
      autoSubmitOnEnter: true,
      // fieldMapToTime: [['pickerVal', ['startTime', 'endTime'], 'YYYY-MM-DD']],
    },
    beforeFetch: (values) => {
      if (values.userCode && values.userCode.length > 0) {
        values.userCode = values.userCode[0].code;
      }
      return values;
    },
    canColDrag: true,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: true,
    canResize: true,
    actionColumn: {
      width: 160,
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
    wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    actionWrapperClass: 'col-span-2 col-start-3 text-left ml-4',
    resetButtonOptions: {
      show: false,
    },
    schema: searchFormSchema,
  };

  const gridOptions: VxeGridProps<any> = {
    checkboxConfig: {
      highlight: true,
      labelField: 'name',
    },
    columns,
    columnConfig: {resizable: true},
    height: 'auto',
    keepSource: true,
    border: false,
    stripe: true,
    proxyConfig: {
      ajax: {
        query: async ({page}, formValues) => {
          return await getPagerModelRunTasks({
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

  const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

  /*  useRequest(
      () => {
        tableApi.reload();
        return Promise.resolve({});
      },
      {
        refreshOnWindowFocus: true,
      },
    );*/

  // 人员选择后回调
  function handleSettingPersonalSuccess(selectedPersonal) {
    if (selectedPersonal.length === 0) {
      message.warning('请选择变更人员！');
      return;
    }
    // openFullLoading();
    const personals = selectedPersonal.map((item) => item.code);
    updateAssignee({ userId: personals[0], taskId: unref(currentTask).taskId })
      .then((res) => {
        const { data } = res;
        if (data.success) {
          message.success(data.msg, 2);
        } else {
          message.error(data.msg, 2);
        }
      })
      .finally(() => {
        // closeFullLoading();
        tableApi.reload();
      });
  }

  nextTick(() => {
    /*const { updateSchema } = tableApi.formApi;
    getAll().then((res) => {
      updateSchema([
        {
          fieldName: 'appSn',
          componentProps: { options: res, labelField: 'id' },
        },
      ]);
    });*/
  });

  async function handleExe(record: Recordable<any>) {
    tableApi.setLoading(true);

    try {
      const {success, msg} = await completeBackStage({taskId: record.taskId, processInstanceId: record.processInstanceId});
      if (success) {
        message.success(msg);
        tableApi.reload();
      } else {
        message.error(msg);
      }
    } catch (e) {
    } finally {
      tableApi.setLoading(false);
    }
  }

  function handleStop(record: Recordable<any>) {
    Modal.confirm({
      title: '警告！',
      icon: createVNode(ExclamationCircleOutlined),
      content: `确定要终止【${record.formName}】流程吗？`,
      okText: '确定',
      cancelText: '取消',
      okButtonProps: {
        danger: true,
      },
      onOk() {
        openFullLoading();
        stopProcess({ taskId: record.taskId, processInstanceId: record.processInstanceId })
          .then((res) => {
            const { data } = res;
            if (data.success) {
              message.success(data.msg);
              tableApi.reload();
            } else {
              message.error(data.msg);
            }
          })
          .finally(() => {
            closeFullLoading();
          });
      },
    });
  }

  function handleViewApproveHistory(record: Recordable<any>) {
    openApproveHistoryModal(true, {
      record,
      isUpdate: true,
    });
    setModalProps({
      width: 800,
      centered: true,
      title: `查看流程【${record.formName}】的审批记录`,
      showOkBtn: false,
      cancelText: '关闭',
    });
  }

  function handleViewForm(record: Recordable<any>) {
    record.allowsOperation = true;
    openProcessFormModal(true, {
      record,
    });
    setProcessFormModalProps({
      width: 1000,
      title: `查看流程【${record.formName}】的表单`,
      showOkBtn: false,
      centered: true,
      cancelText: '关闭',
      maskClosable: true,
    });
  }

  function handleViewFlowProperties(record: Recordable<any>) {
    openFlowPropertiesModal(true, {
      record,
    });
    setFlowPropertiesModalProps({
      width: 900,
      title: `查看流程【${record.formName}】的变量`,
      showOkBtn: false,
      centered: true,
      cancelText: '关闭',
    });
  }

  function handlePreview(record: Recordable<any>) {
    bpmnPreviewModalRef.value.setData({
      modelKey: record.modelKey,
      procInstId: record.processInstanceId,
    });
    bpmnPreviewModalRef.value.open();
    /*openBpmnPreviewModal(true, {
      modelKey: record.modelKey,
      procInstId: record.processInstanceId,
    });
    setBpmnPreviewProps({
      title: `预览-${record.formName}`,
      centered: true,
      useWrapper: false,
      showOkBtn: false,
      cancelText: '关闭',
    });*/
  }

  function handleChangeAssignee(record: Recordable<any>) {
    currentTask.value = record;
    openPersonalSelector(true, {
      selectorProps: {
        multiple: false,
        selectedList: [],
      },
    });

    setPersonalModalProps({
      title: `变更任务【${record.formName} - ${record.name || '未知节点名'}】的当前审批人`,
      bodyStyle: { padding: '0px', margin: '0px' },
      width: 850,
      showOkBtn: true,
      showCancelBtn: true,
    });
  }


  function createActions (row: Recordable<any>) {
    return [
      {
        label: '',
        tooltip: '查看表单',
        icon: 'ant-design:pic-right-outlined',
        onClick: handleViewForm.bind(null, row),
      },
      {
        icon: 'ant-design:partition-outlined',
        tooltip: '流程图预览',
        onClick: handlePreview.bind(null, row),
      },
      {
        auth: [PerPrefix + PerEnum.UPDATE],
        icon: 'ant-design:play-circle-filled',
        tooltip: '执行',
        label: '',
        popConfirm: {
          title: '确认执行吗?',
          placement: 'left',
          confirm: handleExe.bind(null, row),
          okButtonProps: {

          }
        },
      },
    ];
  }

  function createDropDownActions (row: Recordable<any>) {
    return [
      {
        label: '审批变量',
        icon: 'ant-design:profile-outlined',
        onClick: handleViewFlowProperties.bind(null, row),
      },
      {
        label: '审批记录',
        icon: 'ant-design:history-outlined',
        onClick: handleViewApproveHistory.bind(null, row),
      },
      {
        auth: [PerPrefix + PerEnum.UPDATE],
        icon: 'ant-design:stop-twotone',
        tooltip: '终止',
        label: '终止',
        danger: true,
        onClick: handleStop.bind(null, row),
        okButtonProps: {
          danger: true
        }
      },
    ];
  }

  function handleSuccess() {
    tableApi.reload();
  }

  function handleCloseFunc() {
    tableApi.reload();
    return Promise.resolve(true);
  }

  function doCopyContent(content) {
    copy(content);
    message.success('已拷贝到剪切板！');
  }

  function handleProcessFormVisibleChange() {
    tableApi.reload();
  }
</script>
