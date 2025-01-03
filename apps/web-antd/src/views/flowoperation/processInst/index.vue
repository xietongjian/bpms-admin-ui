<template>
  <Page auto-content-height>
    <BasicTable class="proc-inst-table" @register="registerTable">
      <template #toolbar>
        <Segmented
          class="data-type-switch"
          @change="handleReload"
          v-model:value="procInstDataType"
          :options="[
            { value: 'running', label: '运行中实例' },
            { value: 'history', label: '全部实例' },
          ]"
        />
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="getTableActions(record)"
            :dropDownActions="getTableDownActions(record)"
          />
        </template>

        <template v-else-if="column.key === 'processInstanceId'">
          <a @click="doCopyContent(record.processInstanceId)"><CopyOutlined /></a>
          {{ record.processInstanceId }}
        </template>

        <template v-else-if="column.key === 'businessKey'">
          <a v-if="!!record.businessKey" @click="doCopyContent(record.businessKey)"><CopyOutlined /></a>
          {{ record.businessKey || '' }}
        </template>

        <template v-else-if="column.key === 'startedUserName'">
          <EmpInfo :no="record.startedUserId" :name="record.startedUserName" />
        </template>

        <template v-if="column.key === 'formName'">
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

        <template v-if="column.key === 'processStatusName'">
          <Badge v-if="record.suspensionState === 2">
            <template #count>
              <Tooltip title="已挂起">
                <PauseCircleFilled style="color: #f5222d" />
              </Tooltip>
            </template>
            <ProcessStatus :value="record.processStatus" :text="record.processStatusName" />
          </Badge>
          <ProcessStatus v-else :value="record.processStatus" :text="record.processStatusName" />
        </template>
      </template>
    </BasicTable>

    <ApproveHistoryModal @register="registerApproveHistoryModal" />
    <FlowPropertiesModal @register="registerFlowPropertiesModal" />
    <BpmnPreviewModal @register="registerBpmnPreviewModal" />
    <ProcessFormModal @register="registerProcessFormModal" />
    <ProcessNodeSelectionModal
      @register="registerProcessNodeSelectionModal"
      @success="handleReload"
    />
    <ProcessVersionSelectionModal
      @register="registerProcessVersionSelectionModal"
      @success="handleReload"
    />
    <ProcessVariablesModal @register="registerProcessVariableModal" @success="handleReload" />
  </Page>
</template>

<script lang="ts" setup>
  import { nextTick, createVNode, ref } from 'vue';
  import { PerEnum } from '#/enums/perEnum';
  import {useAccess} from '@vben/access';
  import type {Recordable} from '@vben/types';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {VxeGridProps, VxeGridListeners} from '#/adapter/vxe-table';

  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {ColPage, Page} from '@vben/common-ui';
  import {TableAction} from '#/components/table-action';

  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import {
    changeProcInstActive,
    executeProcessInstance,
    findProcessinstancesPagerModel,
  } from '#/api/flowoperation/processInst';
  import BpmnPreviewModal from '@/views/components/preview/bpmnPreview/index.vue';
  import ProcessNodeSelectionModal from '@/views/flowoperation/processTask/components/ProcessNodeSelectionModal.vue';
  import ProcessVersionSelectionModal from '@/views/flowoperation/processInst/ProcessVersionSelectionModal.vue';
  import { getAll } from '#/api/base/app';

  import { columns, searchFormSchema } from './processInst.data';
  import ApproveHistoryModal from './ApproveHistoryModal.vue';
  import ProcessStatus from '@/views/components/process/ProcessStatus.vue';
  import FlowPropertiesModal from './FlowPropertiesModal.vue';
  import { EmpInfo } from '#/views/components/EmpInfo';
  import {
    CopyOutlined,
    ExclamationCircleOutlined,
    PartitionOutlined,
    PauseCircleFilled,
  } from '@ant-design/icons-vue';
  import { copyText } from '@/utils/copyTextToClipboard';
  import ProcessFormModal from '../processTask/ProcessFormModal.vue';
  import { Modal, Tooltip, Segmented, Badge, message, Button } from 'ant-design-vue';
  import { useModal } from '@/components/Modal';
  import { useRequest } from '@vben/hooks';

  import { backToStep, restartProcessInstance, stopProcess } from '#/api/flowoperation/processTask';
  import { useLoading } from '@/components/Loading';
  import ProcessVariablesModal from '@/views/flowoperation/processInst/ProcessVariablesModal.vue';

  defineOptions({ name: 'ProcessInst' });

  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '执行中...',
  });

  const procInstDataType = ref('running');

  const [
    registerProcessFormModal,
    { openModal: openProcessFormModal, setModalProps: setProcessFormModalProps },
  ] = useModal();
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
  const [registerProcessNodeSelectionModal, { openModal: openProcessNodeSelectionModal }] =
    useModal();
  const [registerProcessVersionSelectionModal, { openModal: openProcessVersionSelectionModal }] =
    useModal();
  const [registerProcessVariableModal, { openModal: openProcessVariableModal }] = useModal();

  const [registerTable, { getForm, reload }] = useTable({
    size: 'small',
    api: findProcessinstancesPagerModel,
    columns,
    formConfig: {
      labelWidth: 90,
      schemas: searchFormSchema,
      showAdvancedButton: true,
      showResetButton: true,
      autoAdvancedLine: 1,
      alwaysShowLines: 1,
      autoSubmitOnEnter: true,
      fieldMapToTime: [['dateRange', ['startTime', 'endTime'], 'YYYY-MM-DD']],
    },
    beforeFetch: (values) => {
      if (values.companyId && values.companyId.length > 0) {
        values.companyId = values.companyId[0].id;
      }
      if (values.deptId && values.deptId.length > 0) {
        values.deptId = values.deptId[0].id;
      }
      if (values.startedUserIds && values.startedUserIds.length > 0) {
        values.startedUserIds = values.startedUserIds.map((item) => item.code).join(',');
      }
      if (values.processDefinitionKey && values.processDefinitionKey.length > 0) {
        values.processDefinitionKey = values.processDefinitionKey[0].modelKey;
      }
      values['procInstDataType'] = procInstDataType.value;
      return values;
    },
    canColDrag: true,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: true,
    actionColumn: {
      width: 180,
      title: '操作',
      dataIndex: 'action',
    },
  });

  useRequest(
    () => {
      tableApi.reload();
      return Promise.resolve({});
    },
    {
      refreshOnWindowFocus: true,
    },
  );

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

  function handleViewForm(record: Recordable) {
    openProcessFormModal(true, {
      record,
    });
    setProcessFormModalProps({
      width: 1000,
      title: `查看流程【${record.formName}】的表单`,
      showOkBtn: false,
      centered: true,
      cancelText: '关闭',
      maskClosable: false,
    });
  }

  function handleViewApproveHistory(record: Recordable) {
    openApproveHistoryModal(true, {
      record,
      isUpdate: true,
    });
    setModalProps({
      width: 800,
      title: `查看流程【${record.formName}】的审批记录`,
      showOkBtn: false,
      centered: true,
      cancelText: '关闭',
    });
  }

  // 查看
  function handleViewFlowProperties(record: Recordable) {
    openFlowPropertiesModal(true, {
      record,
    });
    setFlowPropertiesModalProps({
      title: `查看流程【${record.formName}】的变量`,
      showOkBtn: false,
      centered: true,
      cancelText: '关闭',
    });
  }

  // 终止
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
        stopProcess({ taskId: '', processInstanceId: record.processInstanceId })
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

  // 挂起/激活实例
  function handleChangePState(record: Recordable) {
    const stateName = record.suspensionState === 1 ? '挂起' : '激活';
    Modal.confirm({
      title: '警告！',
      icon: createVNode(ExclamationCircleOutlined),
      content: `确定要${stateName}【${record.formName}】流程吗？`,
      okText: '确定',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk() {
        openFullLoading();
        changeProcInstActive({
          procInstId: record.processInstanceId,
          suspensionState: record.suspensionState,
        })
          .then((res) => {
            const { data } = res;
            if (data.success) {
              message.success(data.msg);
              tableApi.reload();
            } else {
              message.error(data.msg);
            }
          })
          .catch((e) => {
            console.error(e);
            message.error(stateName + '流程失败！');
          })
          .finally(() => {
            closeFullLoading();
          });
      },
    });
  }

  // 执行实例
  function execute(record: Recordable) {
    Modal.confirm({
      title: '警告！',
      icon: createVNode(ExclamationCircleOutlined),
      content: `确定要执行【${record.formName}】流程吗？`,
      okText: '确定',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk() {
        openFullLoading();
        executeProcessInstance(record.processInstanceId)
          .then(() => tableApi.reload())
          .finally(() => closeFullLoading());
      },
    });
  }

  // 预览流程图
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

  // 干预
  function handleIntervention(record: Recordable) {
    openProcessNodeSelectionModal(true, {
      title: '流程干预',
      helpMessage: '请选择绿色的已流转过节点，双击元素取消选中',
      multi: false,
      record,
      formSchema: [
        {
          field: 'message',
          required: true,
          ifShow: true,
        },
      ],
      request: (activityId, form) =>
        backToStep({
          distFlowElementId: activityId,
          processInstanceId: record.processInstanceId,
          ...form,
        }),
    });
  }

  // 复活
  function handleRevival(record: Recordable) {
    openProcessNodeSelectionModal(true, {
      title: '流程复活',
      helpMessage: '请选择复活到哪个任务节点，双击元素取消选中',
      multi: true,
      record,
      request: (activityIds) => restartProcessInstance(record.processInstanceId, activityIds),
    });
  }

  // 版本切换
  function handleChangeVersion(record: Recordable) {
    openProcessVersionSelectionModal(true, { record });
  }

  // 变量补偿
  function handleChangeVariable(record: Recordable) {
    openProcessVariableModal(true, { record });
  }

  function doCopyContent(content) {
    copyText(content);
  }

  async function handleReload(value) {
    const { updateSchema } = getForm();
    await updateSchema([
      {
        field: 'processStatus',
        componentProps: {
          disabled: value === 'running',
        },
      },
    ]);
    tableApi.reload();
  }

  function getTableActions(record) {
    return [
      {
        label: '',
        tooltip: '查看表单',
        icon: 'ant-design:pic-right-outlined',
        onClick: () => handleViewForm(record),
      },
      {
        icon: 'ant-design:partition-outlined',
        tooltip: '流程图预览',
        label: '',
        onClick: () => handlePreview(record),
      },
      {
        tooltip: '审批记录',
        icon: 'ant-design:history-outlined',
        onClick: () => handleViewApproveHistory(record),
      },
      {
        tooltip: '审批变量',
        icon: 'ant-design:profile-outlined',
        onClick: () => handleViewFlowProperties(record),
      },
    ];
  }
  function getTableDownActions(record) {
    const actions = [
      {
        auth: 'ProcessInst:' + PerEnum.UPDATE,
        icon: 'ant-design:stop-twotone',
        label: '终止',
        color: 'error',
        ifShow: record.processStatus !== 'end' && record.processStatus !== 'zz',
        onClick: () => handleStop(record),
      },
      {
        auth: 'ProcessInst:' + PerEnum.UPDATE,
        ifShow: record.suspensionState !== null,
        icon:
          record.suspensionState === 1
            ? 'ant-design:pause-circle-filled'
            : 'ant-design:play-circle-filled',
        label: record.suspensionState === 1 ? '挂起' : '激活',
        color: 'error',
        onClick: () => handleChangePState(record),
      },
    ];

    if (procInstDataType.value === 'running') {
      actions.push({
        auth: 'ProcessInst:' + PerEnum.UPDATE,
        icon: 'clarity:fast-forward-line',
        label: '执行',
        color: 'error',
        onClick: () => execute(record),
      });
      actions.push({
        auth: 'ProcessInst:' + PerEnum.UPDATE,
        icon: 'ant-design:rollback-outlined',
        label: '干预',
        color: 'error',
        onClick: () => handleIntervention(record),
      });
      actions.push({
        auth: 'ProcessInst:' + PerEnum.UPDATE,
        icon: 'ant-design:branches-outlined',
        label: '切换版本',
        color: 'error',
        onClick: () => handleChangeVersion(record),
      });
      actions.push({
        auth: 'ProcessInst:' + PerEnum.UPDATE,
        icon: 'clarity:code-outline-badged',
        label: '变量补偿',
        color: 'error',
        onClick: () => handleChangeVariable(record),
      });
    }

    if (record.endTime) {
      actions.push({
        auth: 'ProcessInst:' + PerEnum.UPDATE,
        icon: 'ant-design:medicine-box-outlined',
        tooltip: '复活',
        label: '复活',
        color: 'error',
        onClick: () => handleRevival(record),
      });
    }

    return actions;
  }
</script>

<style lang="less">
  .proc-inst-table {
    .vben-basic-table-header__toolbar {
      justify-content: flex-start;
    }
    .data-type-switch {
      .ant-segmented-item-selected {
        background: @button-primary-color;
        color: @white;
      }
    }
  }
</style>
