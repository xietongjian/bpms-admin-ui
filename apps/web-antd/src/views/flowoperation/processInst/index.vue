<template>
  <Page auto-content-height>
    <BasicTable class="proc-inst-table" @register="registerTable">
      <template #toolbar-actions>
        <RadioGroup v-model:value="procInstDataType" button-style="solid" @change="handleChangeProcInstType">
          <RadioButton value="running">
            运行中实例
          </RadioButton>
          <RadioButton value="history">
            全部实例
          </RadioButton>
        </RadioGroup>
      </template>
      <template #action="{row}">
        <TableAction :actions="getTableActions(row)" :dropDownActions="getTableDownActions(row)"/>
      </template>
      <template #processInstanceId="{row}">
        <a @click="doCopyContent(row.processInstanceId)"><CopyOutlined /></a>
        {{ row.processInstanceId }}
      </template>

      <template #businessKey="{row}">
        <a v-if="!!row.businessKey" @click="doCopyContent(row.businessKey)"><CopyOutlined /></a>
        {{ row.businessKey || '' }}
      </template>

      <template #startedUserName="{row}">
        <EmpInfo :no="row.startedUserId" :name="row.startedUserName" />
      </template>

      <template #formName="{row}">
        <Tooltip title="查看流程图">
          <TypographyLink @click="handlePreview(row)" class="mr-2">
            <PartitionOutlined  />
          </TypographyLink>
        </Tooltip>
        <TypographyLink @click="handleViewForm(row)">
          {{ row.formName }}
        </TypographyLink>
      </template>

      <template #processStatusName="{row}">
        <Badge v-if="row.suspensionState === 2">
          <template #count>
            <Tooltip title="已挂起">
              <PauseCircleFilled style="color: #f5222d" />
            </Tooltip>
          </template>
          <ProcessStatus :value="row.processStatus" :text="row.processStatusName" />
        </Badge>
        <ProcessStatus v-else :value="row.processStatus" :text="row.processStatusName" />
      </template>
    </BasicTable>

    <ApproveHistoryModal ref="approveHistoryModalRef"  @register="registerApproveHistoryModal" />
    <FlowPropertiesModal ref="flowPropertiesModalRef"  @register="registerFlowPropertiesModal" />
    <BpmnPreviewModal ref="bpmnPreviewModalRef"  @register="registerBpmnPreviewModal" />
    <ProcessFormModal ref="processFormModalRef"  @register="registerProcessFormModal" />
    <ProcessNodeSelectionModal ref="processNodeSelectionModalRef"
      @register="registerProcessNodeSelectionModal"
      @success="handleReload"
    />
    <ProcessVersionSelectionModal ref="processVersionSelectionModalRef"
      @register="registerProcessVersionSelectionModal"
      @success="handleReload"
    />
    <ProcessVariablesModal ref="processVariablesModalRef"  @register="registerProcessVariableModal" @success="handleReload" />
    <ProcessFormPreviewDrawer ref="processFormPreviewDrawerRef" />
  </Page>
</template>

<script lang="ts" setup>
  import { nextTick, createVNode, ref } from 'vue';
  import { PerEnum } from '#/enums/perEnum';
  import type {Recordable} from '@vben/types';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {VxeGridProps, VxeGridListeners} from '#/adapter/vxe-table';

  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {ColPage, Page} from '@vben/common-ui';
  import { TableAction } from '#/components/table-action';

  import {
    changeProcInstActive,
    executeProcessInstance,
    findProcessinstancesPagerModel,
  } from '#/api/flowoperation/processInst';
  import ProcessNodeSelectionModal from '#/views/flowoperation/processTask/components/ProcessNodeSelectionModal.vue';
  import ProcessVersionSelectionModal from '#/views/flowoperation/processInst/ProcessVersionSelectionModal.vue';
  import { getAll } from '#/api/base/app';
  import {BpmnPreviewModal, ProcessFormPreviewDrawer, ProcessFormPreviewModal} from '#/views/components/preview';
  import { useClipboard } from '@vueuse/core';

  import { columns, searchFormSchema } from './processInst.data';
  import ApproveHistoryModal from './ApproveHistoryModal.vue';
  import ProcessStatus from '#/views/components/process/ProcessStatus.vue';
  import FlowPropertiesModal from './FlowPropertiesModal.vue';
  import { EmpInfo } from '#/views/components/EmpInfo';
  import {
    CopyOutlined,
    ExclamationCircleOutlined,
    PartitionOutlined,
    PauseCircleFilled,
  } from '@ant-design/icons-vue';
  import ProcessFormModal from '../processTask/ProcessFormModal.vue';
  import {Modal, TypographyLink, Tooltip, Segmented, Badge, message, Button, RadioButton, RadioGroup} from 'ant-design-vue';
  import { backToStep, restartProcessInstance, stopProcess } from '#/api/flowoperation/processTask';
  import ProcessVariablesModal from '#/views/flowoperation/processInst/ProcessVariablesModal.vue';

  const approveHistoryModalRef = ref(),
      flowPropertiesModalRef = ref(),
      bpmnPreviewModalRef = ref(),
      processFormModalRef = ref(),
      processNodeSelectionModalRef = ref(),
      processVersionSelectionModalRef = ref(),
    processFormPreviewDrawerRef = ref(),
      processVariablesModalRef = ref();

  const { isSupported, copy, copied } = useClipboard({ legacy: true });

  defineOptions({ name: 'ProcessInst' });

  const procInstDataType = ref('running');

  /*const [
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
*/
 /* const [registerTable, { getForm, reload }] = useTable({
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
  */

/*  useRequest(
    () => {
      tableApi.reload();
      return Promise.resolve({});
    },
    {
      refreshOnWindowFocus: true,
    },
  );*/

  const formOptions: VbenFormProps = {
    showCollapseButton: true,
    collapsed: true,
    submitOnEnter: true,
    commonConfig: {
      labelWidth: 80,
    },
    collapsedRows: 1,
    resetButtonOptions: {
      show: true,
    },
    schema: searchFormSchema,
  };

  const gridOptions: VxeGridProps = {
    columns,
    columnConfig: {resizable: true},
    height: 'auto',
    maxHeight: '100%',
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
          return await findProcessinstancesPagerModel({
            query: {
              pageNum: page.currentPage,
              pageSize: page.pageSize,
            },
            entity: {...formValues, procInstDataType: procInstDataType.value},
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
    // const { updateSchema } = tableApi.formApi;
    /*getAll().then((res) => {
      updateSchema([
        {
          fieldName: 'appSn',
          componentProps: { options: res, labelField: 'id' },
        },
      ]);
    });*/
  });

  async function handleChangeProcInstType(e: Event) {
    const values = await tableApi?.formApi.getValues();
    tableApi.reload(values);
  }

  function handleViewForm(record: Recordable<any>) {
    // processFormModalRef.value.setData(record);
    // processFormModalRef.value.open();
    // processFormModalRef.value.setState({title: `查看流程【${record.formName}】的表单`});
    debugger;
    record.allowsOperation = true;
    processFormPreviewDrawerRef.value.setData({
      ...record,
      procInstId: record.processInstanceId,
      modelKey: record.processDefinitionKey,
    });
    processFormPreviewDrawerRef.value.open();
    processFormPreviewDrawerRef.value.setState({title: `查看流程【${record.formName}】的表单`});
  }

  function handleViewApproveHistory(record: Recordable<any>) {
    approveHistoryModalRef.value.setData(record);
    approveHistoryModalRef.value.open();
    approveHistoryModalRef.value.setState({
      title: `查看流程【${record.formName}】的审批记录`,
    });
  }

  // 查看
  function handleViewFlowProperties(record: Recordable<any>) {
    flowPropertiesModalRef.value.setData(record);
    flowPropertiesModalRef.value.open();
    flowPropertiesModalRef.value.setState({
      title: `查看流程【${record.formName}】的变量`,
    });
    /*openFlowPropertiesModal(true, {
      record,
    });
    setFlowPropertiesModalProps({
      title: `查看流程【${record.formName}】的变量`,
      showOkBtn: false,
      centered: true,
      cancelText: '关闭',
    });*/
  }

  // 终止
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
      async onOk() {
        const {success, msg} = await stopProcess({
          taskId: '',
          processInstanceId: record.processInstanceId
        });
        if (success) {
          message.success(msg, 0.5,() => tableApi.reload());
        } else {
          message.error(msg);
        }
      },
    });
  }

  // 挂起/激活实例
  function handleChangePState(record: Recordable<any>) {
    const stateName = record.suspensionState === 1 ? '挂起' : '激活';
    Modal.confirm({
      title: '警告！',
      icon: createVNode(ExclamationCircleOutlined),
      content: `确定要${stateName}【${record.formName}】流程吗？`,
      okText: '确定',
      cancelText: '取消',
      okButtonProps: { danger: true },
      async onOk() {
        try {
          const {success, msg} = await changeProcInstActive({
            procInstId: record.processInstanceId,
            suspensionState: record.suspensionState,
          });
          if (success) {
            message.success(msg, 0.5, () =>tableApi.reload());
          } else {
            message.error(msg);
          }
        } catch (e) {
          console.error(e);
          message.error(stateName + '流程失败！');
        }
      }
    });
  }

  // 执行实例
  function execute(record: Recordable<any>) {
    Modal.confirm({
      title: '警告！',
      icon: createVNode(ExclamationCircleOutlined),
      content: `确定要执行【${record.formName}】流程吗？`,
      okText: '确定',
      cancelText: '取消',
      okButtonProps: { danger: true },
      async onOk() {
        try {
          const {success, msg} = await executeProcessInstance(record.processInstanceId);
          if (success) {
            message.success(msg, 0.5, () => tableApi.reload());
          } else {
            message.error(msg);
          }
        } catch (e) {
          console.error(e);
        }
      },
    });
  }

  // 预览流程图
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

  // 干预
  function handleIntervention(record: Recordable<any>) {
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
  function handleRevival(record: Recordable<any>) {
    openProcessNodeSelectionModal(true, {
      title: '流程复活',
      helpMessage: '请选择复活到哪个任务节点，双击元素取消选中',
      multi: true,
      record,
      request: (activityIds) => restartProcessInstance(record.processInstanceId, activityIds),
    });
  }

  // 版本切换
  function handleChangeVersion(record: Recordable<any>) {
    openProcessVersionSelectionModal(true, { record });
  }

  // 变量补偿
  function handleChangeVariable(record: Recordable<any>) {
    openProcessVariableModal(true, { record });
  }

  async function doCopyContent(content) {
    await copy(content);
    message.success('已拷贝到剪切板！');
  }

  async function handleReload(value) {
    const { updateSchema } = tableApi.formApi;
    await updateSchema([
      {
        fieldName: 'processStatus',
        componentProps: {
          disabled: value === 'running',
        },
      },
    ]);
    tableApi.reload();
  }

  function getTableActions(record: Recordable<any>) {
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
  function getTableDownActions(record: Recordable<any>) {
    const actions = [
      {
        auth: ['ProcessInst:' + PerEnum.UPDATE],
        icon: 'ant-design:stop-twotone',
        label: '终止',
        danger: true,
        ifShow: record.processStatus !== 'end' && record.processStatus !== 'zz',
        onClick: () => handleStop(record),
      },
      {
        auth: ['ProcessInst:' + PerEnum.UPDATE],
        ifShow: record.suspensionState !== null,
        icon:
          record.suspensionState === 1
            ? 'ant-design:pause-circle-filled'
            : 'ant-design:play-circle-filled',
        label: record.suspensionState === 1 ? '挂起' : '激活',
        danger: true,
        onClick: () => handleChangePState(record),
      },
    ];

    if (procInstDataType.value === 'running') {
      actions.push({
        auth: ['ProcessInst:' + PerEnum.UPDATE],
        icon: 'clarity:fast-forward-line',
        label: '执行',
        danger: true,
        onClick: () => execute(record),
      });
      actions.push({
        auth: ['ProcessInst:' + PerEnum.UPDATE],
        icon: 'ant-design:rollback-outlined',
        label: '干预',
        danger: true,
        onClick: () => handleIntervention(record),
      });
      actions.push({
        auth: ['ProcessInst:' + PerEnum.UPDATE],
        icon: 'ant-design:branches-outlined',
        label: '切换版本',
        danger: true,
        onClick: () => handleChangeVersion(record),
      });
      actions.push({
        auth: ['ProcessInst:' + PerEnum.UPDATE],
        icon: 'clarity:code-outline-badged',
        label: '变量补偿',
        danger: true,
        onClick: () => handleChangeVariable(record),
      });
    }

    if (record.endTime) {
      actions.push({
        auth: ['ProcessInst:' + PerEnum.UPDATE],
        icon: 'ant-design:medicine-box-outlined',
        tooltip: '复活',
        label: '复活',
        danger: true,
        onClick: () => handleRevival(record),
      });
    }
    return actions;
  }
</script>
