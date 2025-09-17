<template>
  <Page auto-content-height>
    <BasicTable table-title="流程任务列表">
      <template #action="{ row }">
        <TableAction
            :actions="createActions(row)"
            :dropDownActions="createDropDownActions(row)"
        />
      </template>

      <template #formName="{ row }">
        <Tooltip title="查看流程图">
          <TypographyLink @click="handlePreview(row)" class="mr-2">
            <PartitionOutlined />
          </TypographyLink>
        </Tooltip>
        <TypographyLink @click="handleViewForm(row)">{{ row.formName }}</TypographyLink>
      </template>

      <template #assigneeName="{ row }">
        <div class="text-right">
          <Space>
            <EmpInfo :no="row.assignee" :name="row.assigneeName" />
            <Button v-access:code="PerPrefix + PerEnum.UPDATE" size="small" danger @click="handleChangeAssignee(row)">变更</Button>
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
    <BpmnPreviewModal ref="bpmnPreviewModalRef" @success="handleSuccess" />
    <PersonalSelectorModal ref="personalSelectorModalRef" @change="handleSettingPersonalSuccess" />
    <FlowPropertiesModal ref="flowPropertiesModalRef" />
    <ApproveHistoryModal ref="approveHistoryModalRef" />
    <ProcessFormPreviewDrawer ref="processFormPreviewDrawerRef" />
  </Page>
</template>
<script lang="ts" setup>
  import { createVNode, ref, unref } from 'vue';
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
  import {BpmnPreviewModal, ProcessFormPreviewDrawer} from '#/views/components/preview';
  import PersonalSelectorModal from '#/components/selector/personal-selector/PersonalSelectorModal.vue';
  import FlowPropertiesModal from '../processInst/FlowPropertiesModal.vue';
  import { columns, searchFormSchema } from './processTask.data';
  import ApproveHistoryModal from '../processInst/ApproveHistoryModal.vue';
  import {
    CopyOutlined,
    PartitionOutlined,
    ExclamationCircleOutlined,
  } from '@ant-design/icons-vue';
  import { Tooltip, TypographyLink, Space, Modal, Button, message } from 'ant-design-vue';
  import { PerEnum } from '#/enums/perEnum';
  import {EmpInfo} from '#/views/components/EmpInfo';
  import {TableAction} from '#/components/table-action';
  import { useClipboard } from '@vueuse/core';

  import ProcessStatus from '#/views/components/process/ProcessStatus.vue';

  const { copy } = useClipboard({ legacy: true });

  defineOptions({ name: 'ProcessTask' });
  const PerPrefix = 'ProcessTask:';
  const currentTask = ref();
  const bpmnPreviewModalRef = ref(),
    personalSelectorModalRef = ref(),
    flowPropertiesModalRef = ref(),
    approveHistoryModalRef = ref(),
    processFormPreviewDrawerRef = ref();

  const formOptions: VbenFormProps = {
    showCollapseButton: true,
    collapsed: true,
    submitOnEnter: true,
    commonConfig: {
      labelWidth: 80,
    },
    // fieldMappingTime: [['pickerVal', ['startTime', 'endTime'], 'YYYY-MM-DD']],
    collapsedRows: 1,
    resetButtonOptions: {
      show: true,
    },
    schema: searchFormSchema,
    wrapperClass: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  const gridOptions: VxeGridProps = {
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
          if (formValues.userCode && formValues.userCode.length > 0) {
            formValues.userCode = formValues.userCode[0].key;
          }
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

  // 人员选择后回调
  async function handleSettingPersonalSuccess(selectedPersonal: Array<any>) {
    if (selectedPersonal.length === 0) {
      message.warning('请选择变更人员！');
      return;
    }
    const {success, msg} = await updateAssignee({ userId: selectedPersonal[0].code, taskId: unref(currentTask).taskId });
    if (success) {
      message.success(msg, 2);
      // tableApi.reload();
      currentTask.value.assignee = selectedPersonal[0].code;
      currentTask.value.assigneeName = selectedPersonal[0].name;
      tableApi.grid.reloadRow(currentTask.value)
    } else {
      message.error(msg, 2);
    }
  }

  async function handleExe(record: Recordable<any>) {
    try {
      const {success, msg} = await completeBackStage({taskId: record.taskId, processInstanceId: record.processInstanceId});
      if (success) {
        message.success(msg, 0.5, () => tableApi.reload());
      } else {
        message.error(msg);
      }
    } catch (e) {
      console.error(e);
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
      async onOk() {
        const {success, msg} = await stopProcess({
          taskId: record.taskId,
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

  function handleViewApproveHistory(record: Recordable<any>) {
    approveHistoryModalRef.value.setData(record);
    approveHistoryModalRef.value.open();
    approveHistoryModalRef.value.setState({
      title: `查看流程【${record.formName}】的审批记录`,
    });
  }

  function handleViewForm(record: Recordable<any>) {
    record.allowsOperation = true;
    processFormPreviewDrawerRef.value.setData({
      ...record,
      procInstId: record.processInstanceId,
      modelKey: record.processDefinitionKey,
      showOperation: true,
      viewFormTitle: record.formName,
    }).open();
  }

  function handleViewFlowProperties(record: Recordable<any>) {
    flowPropertiesModalRef.value.setData(record);
    flowPropertiesModalRef.value.open();
    flowPropertiesModalRef.value.setState({
      title: `查看流程【${record.formName}】的变量`,
    });
  }

  function handlePreview(record: Recordable<any>) {
    bpmnPreviewModalRef.value.setData({
      modelKey: record.modelKey,
      procInstId: record.processInstanceId,
    });
    bpmnPreviewModalRef.value.open();
  }
  function handleChangeAssignee(record: Recordable<any>) {
    currentTask.value = record;

    personalSelectorModalRef.value.setState({
      title: `变更任务【${record.formName} - ${record.name || '未知节点名'}】的当前审批人`,
    });
    personalSelectorModalRef.value.open();
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

  function doCopyContent(content: string) {
    copy(content);
    message.success('已拷贝到剪切板！');
  }
</script>
