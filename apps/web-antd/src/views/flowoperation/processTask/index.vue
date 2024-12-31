<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '',
                tooltip: '查看表单',
                icon: 'ant-design:pic-right-outlined',
                onClick: handleViewForm.bind(null, record),
              },
              {
                icon: 'ant-design:partition-outlined',
                tooltip: '流程图预览',
                onClick: handlePreview.bind(null, record),
              },
              {
                auth: 'ProcessTask:' + PerEnum.UPDATE,
                icon: 'ant-design:play-circle-filled',
                tooltip: '执行',
                label: '',
                color: 'success',
                popConfirm: {
                  title: '确认执行吗?',
                  confirm: handleExe.bind(null, record),
                },
              },
            ]"
            :dropDownActions="[
              {
                label: '审批变量',
                icon: 'ant-design:profile-outlined',
                onClick: handleViewFlowProperties.bind(null, record),
              },
              {
                label: '审批记录',
                icon: 'ant-design:history-outlined',
                onClick: handleViewApproveHistory.bind(null, record),
              },
              {
                auth: 'ProcessTask:' + PerEnum.UPDATE,
                icon: 'ant-design:stop-twotone',
                tooltip: '终止',
                label: '终止',
                color: 'error',
                onClick: handleStop.bind(null, record),
              },
            ]"
          />
        </template>

        <template v-else-if="column.key === 'formName'">
          <Tooltip title="查看流程图">
            <a>
              <PartitionOutlined @click="handlePreview(record)" />
            </a>
          </Tooltip>

          <Tooltip placement="topLeft" :mouseEnterDelay="0.3">
            <template #title>
              {{ record.formName }}
            </template>
            {{ record.formName }}
          </Tooltip>
        </template>

        <template v-else-if="column.key === 'assigneeName'">
          <div class="text-right">
            <Space>
              <EmpInfo :no="record.assignee" :name="record.assigneeName" />
              <Authority :value="'ProcessTask:' + PerEnum.UPDATE">
                <a-button size="small" type="error" @click="handleChangeAssignee(record)"
                  >变更</a-button
                >
              </Authority>
            </Space>
          </div>
        </template>

        <template v-else-if="column.key === 'taskId'">
          <a @click="doCopyContent(record.taskId)"><CopyOutlined /></a>
          {{ record.taskId }}
        </template>

        <template v-else-if="column.key === 'businessKey'">
          <a v-if="!!record.businessKey" @click="doCopyContent(record.businessKey)"><CopyOutlined /></a>
          {{ record.businessKey || '' }}
        </template>

        <template v-else-if="column.key === 'processInstanceId'">
          <a @click="doCopyContent(record.processInstanceId)"><CopyOutlined /></a>
          {{ record.processInstanceId }}
        </template>

        <template v-else-if="column.key === 'startPersonName'">
          <EmpInfo :no="record.startPersonCode" :name="record.startPersonName" />
        </template>

        <template v-if="column.key === 'processStatusName'">
          <ProcessStatus :value="record.processStatus" :text="record.processStatusName" />
        </template>
      </template>
    </BasicTable>
    <BpmnPreviewModal @register="registerBpmnPreviewModal" @success="handleSuccess" />
    <PersonalSelectorModal
      @register="registerPersonalModal"
      @change="handleSettingPersonalSuccess"
    />
    <FlowPropertiesModal @register="registerFlowPropertiesModal" />
    <ApproveHistoryModal @register="registerApproveHistoryModal" />
    <ProcessFormModal
      @register="registerProcessFormModal"
      @reload="handleProcessFormVisibleChange"
    />
  </div>
</template>
<script lang="ts" setup>
  import { createVNode, nextTick, ref, unref } from 'vue';
  import { useVbenVxeGrid } from '#/adapter/vxe-table';
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
  import PersonalSelectorModal from '#/components/Selector/src/PersonalSelectorModal.vue';
  import FlowPropertiesModal from '../processInst/FlowPropertiesModal.vue';
  import { getAll } from '#/api/base/app';
  import { columns, searchFormSchema } from './processTask.data';
  import ApproveHistoryModal from '../processInst/ApproveHistoryModal.vue';
  import ProcessFormModal from './ProcessFormModal.vue';
  import {
    CopyOutlined,
    PartitionOutlined,
    ExclamationCircleOutlined,
  } from '@ant-design/icons-vue';
  import { Tooltip, Space, Modal } from 'ant-design-vue';
  import { PerEnum } from '#/enums/perEnum';
  import { EmpInfo } from '@/components/EmpInfo';
  import { useRequest } from '@vben/hooks';
  import ProcessStatus from '#/views/components/process/ProcessStatus.vue';

  defineOptions({ name: 'ProcessTask' });
  // 人员选择弹窗
  const [
    registerPersonalModal,
    { openModal: openPersonalSelector, setModalProps: setPersonalModalProps },
  ] = useModal();
  const currentTask = ref<Recordable>({});
  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '执行中...',
  });
  const { createMessage } = useMessage();

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
  ] = useModal();

  const [registerTable, { getForm, reload }] = useTable({
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
  });

  useRequest(
    () => {
      reload();
      return Promise.resolve({});
    },
    {
      refreshOnWindowFocus: true,
    },
  );

  // 人员选择后回调
  function handleSettingPersonalSuccess(selectedPersonal) {
    if (selectedPersonal.length === 0) {
      createMessage.warning('请选择变更人员！');
      return;
    }
    openFullLoading();
    const personals = selectedPersonal.map((item) => item.code);
    updateAssignee({ userId: personals[0], taskId: unref(currentTask).taskId })
      .then((res) => {
        const { data } = res;
        if (data.success) {
          createMessage.success(data.msg, 2);
        } else {
          createMessage.error(data.msg, 2);
        }
      })
      .finally(() => {
        closeFullLoading();
        reload();
      });
  }

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

  function handleExe(record: Recordable) {
    openFullLoading();
    completeBackStage({ taskId: record.taskId, processInstanceId: record.processInstanceId })
      .then((res) => {
        const { data } = res;
        if (data.success) {
          createMessage.success(data.msg);
          reload();
        } else {
          createMessage.error(data.msg);
        }
      })
      .finally(() => {
        closeFullLoading();
      });
  }

  function handleStop(record: Recordable) {
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
              createMessage.success(data.msg);
              reload();
            } else {
              createMessage.error(data.msg);
            }
          })
          .finally(() => {
            closeFullLoading();
          });
      },
    });
  }

  function handleViewApproveHistory(record: Recordable) {
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

  function handleViewForm(record: Recordable) {
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

  function handleViewFlowProperties(record: Recordable) {
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

  function handlePreview(record: Recordable) {
    openBpmnPreviewModal(true, {
      modelKey: record.modelKey,
      procInstId: record.processInstanceId,
    });
    setBpmnPreviewProps({
      title: `预览-${record.formName}`,
      centered: true,
      useWrapper: false,
      showOkBtn: false,
      cancelText: '关闭',
    });
  }

  function handleChangeAssignee(record: Recordable) {
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

  function handleSuccess() {
    reload();
  }

  function handleCloseFunc() {
    reload();
    return Promise.resolve(true);
  }

  function doCopyContent(content) {
    copyText(content);
  }

  function handleProcessFormVisibleChange() {
    setTimeout(() => {
      reload();
    }, 200);
  }
</script>
