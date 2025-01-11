<template>
  <Page auto-content-height class="h-full" content-class="flex flex-col">
    <ProcInstJobTable>
      <template #toolbar-actions>
        <RadioGroup v-model:value="jobType" button-style="solid" @change="handleChangeJobType">
          <Badge class="z-10" :overflow-count="99999999" :number-style="{ backgroundColor: '#52c41a' }" :count="dataCount.timerJobCount" >
            <RadioButton value="timer">
              延时队列
            </RadioButton>
          </Badge>
          <Badge :overflow-count="99999999" :count="dataCount.deadLetterJobCount">
            <RadioButton value="deadLetter">
              死信队列
            </RadioButton>
          </Badge>
        </RadioGroup>
      </template>
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix + PerEnum.UPDATE"
                danger @click="handleBatchExe"
                v-if="jobType === 'deadLetter'" :disabled="selectedRowsCount <= 0">
          批量执行
        </Button>
      </template>
      <template #action="{row}">
        <TableAction :actions="createActions(row)"/>
      </template>
      <template #processInstanceId="{row}">
        <a class="cursor-pointer" v-if="!!row.processInstanceId" @click="doCopyContent(row.processInstanceId)">
          <CopyOutlined />
        </a>
        {{ row.processInstanceId||'-' }}
      </template>

      <template #tenantId="{row}">
        {{ appObjs && appObjs[row.tenantId] }}
      </template>

      <template #duedate="{row}">
        {{ row.duedate??'-' }}
        <Tooltip title="修改队列执行时间">
          <HighlightOutlined @click="handleChangeDueDate(row)" class="cursor-pointer"/>
        </Tooltip>
      </template>

      <template #processName="{row}">
        <Tooltip title="查看流程图">
          <a>
            <PartitionOutlined @click="handlePreview(row)" />
          </a>
        </Tooltip>
        <Tooltip placement="topLeft" :mouseEnterDelay="0.3">
          <template #title>
            {{ row.processName }}
          </template>
          {{ row.processName }}
        </Tooltip>
      </template>
    </ProcInstJobTable>
    <ApproveHistoryModal ref="approveHistoryModalRef" @register="registerApproveHistoryModal" />
    <FlowPropertiesModal ref="flowPropertiesModalRef" @register="registerFlowPropertiesModal" />
    <BpmnPreviewModal ref="bpmnPreviewModalRef" @register="registerBpmnPreviewModal" />
    <TimerJobEditModal ref="timerJobEditModalRef" @success="handleChangeTab" />
  </Page>
</template>
<script lang="ts" setup>
  import { nextTick, ref } from 'vue';
  import { PerEnum } from '#/enums/perEnum';
  import type {Recordable} from '@vben/types';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {VxeGridProps, VxeGridListeners} from '#/adapter/vxe-table';
  import { useClipboard } from '@vueuse/core';

  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {Page} from '@vben/common-ui';
  import {TableAction} from '#/components/table-action';

  import {
    getJobsCount,
    moveDeadLetterJobToExecutableJobByJobIds,
    queryDeadLetterJobPagerModel,
    queryTimerJobPagerModel,
  } from '#/api/flowoperation/processJob';
  import {BpmnPreviewModal} from '#/views/components/preview';
  import { getAll } from '#/api/base/app';
  import { timerJobColumns, deadLetterJobColumns, searchFormSchema } from './processJob.data';
  import ApproveHistoryModal from '../processInst/ApproveHistoryModal.vue';
  import FlowPropertiesModal from '../processInst/FlowPropertiesModal.vue';
  import TimerJobEditModal from './TimerJobEditModal.vue';
  import { CopyOutlined, PartitionOutlined, HighlightOutlined } from '@ant-design/icons-vue';
  import { Tooltip, Modal, RadioGroup, RadioButton, Badge, Button, Space, message } from 'ant-design-vue';

  defineOptions({ name: 'ProcessJob' });
  const { copy } = useClipboard({ legacy: true });

  const jobType = ref('timer');
  const PerPrefix = 'ProcessJob:';

  const dataCount = ref<object>({ timerJobCount: 0, DeadLetterJobCount: 0 });
  const selectedRowsCount = ref(0);
  const appObjs = ref({});

  const approveHistoryModalRef = ref(),
    flowPropertiesModalRef = ref(),
    bpmnPreviewModalRef = ref(),
    timerJobEditModalRef = ref();

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
    columns: timerJobColumns,
    columnConfig: {resizable: true},
    height: 'auto',
    maxHeight: '100%',
    border: false,
    keepSource: true,
    autoResize: false,
    stripe: true,
    round: false,
    checkboxConfig: {
      highlight: true,
      labelField: 'processName',
      trigger: 'row',
    },
    proxyConfig: {
      ajax: {
        query: async ({page}, formValues) => {
          selectedRowsCount.value = 0;
          const params = {
            query: {
              pageNum: page.currentPage,
              pageSize: page.pageSize,
            },
            entity: formValues || {},
          };
          return jobType.value === 'timer'
              ? await queryTimerJobPagerModel(params)
              : await queryDeadLetterJobPagerModel(params);
        },
      },
    },
  };
  const gridEvents: VxeGridListeners = {
    checkboxChange: ({records}) => {
      selectedRowsCount.value = records.length;
    },
    checkboxAll: ({records}) => {
      selectedRowsCount.value = records.length;
    }
  };
  const [ProcInstJobTable, tableApi] = useVbenVxeGrid({gridOptions, formOptions, gridEvents});

  function createActions(record: Recordable<any>) {
    return [
      {
        auth: [PerPrefix + PerEnum.UPDATE],
        icon: 'ant-design:play-circle-filled',
        tooltip: '执行',
        label: '',
        danger: true,
        ifShow: () => jobType.value === 'deadLetter',
        popConfirm: {
          title: '确认执行吗?',
          confirm: handleExe.bind(null, record),
          okButtonProps:{
            danger: true
          }
        },
      },
      {
        icon: 'ant-design:partition-outlined',
        tooltip: '流程图预览',
        label: '',
        onClick: handlePreview.bind(null, record),
      },
      {
        tooltip: '审批记录',
        icon: 'ant-design:history-outlined',
        onClick: handleViewApproveHistory.bind(null, record),
      },
      {
        tooltip: '审批变量',
        icon: 'ant-design:profile-outlined',
        onClick: handleViewFlowProperties.bind(null, record),
      },
    ];
  }

  function handleChangeDueDate(record: Recordable<any>) {
    timerJobEditModalRef.value.setData(record);
    timerJobEditModalRef.value.open();
    timerJobEditModalRef.value.setState({
      title: `修改队列执行时间`
    });
  }

  nextTick(async () => {
    dataCount.value = await getJobsCount();
    const appList = await getAll();
    const appObjsTemp = {};
    if (appList) {
      appList.forEach((item) => {
        appObjsTemp[item.sn] = item.name;
      });
    }
    appObjs.value = appObjsTemp;
  });

  async function handleChangeJobType(e: Event) {
    tableApi.grid.remove();
    selectedRowsCount.value = 0;
    tableApi.setGridOptions({
      columns: e.target?.value === 'timer'? timerJobColumns : deadLetterJobColumns,
    });

    const values = await tableApi?.formApi.getValues();
    tableApi.reload(values);
    loadDataCount();
  }

  async function loadDataCount(){
    dataCount.value = await getJobsCount();
  }

  async function batchExe(ids) {
    const {success, msg} = await moveDeadLetterJobToExecutableJobByJobIds(ids);
    if (success) {
      message.success(msg, 0.5, () => {
        tableApi.reload();
        loadDataCount();
      });
    } else {
      message.error(msg);
    }
  }

  function handleBatchExe() {
    const selectedRows = tableApi.grid.getCheckboxRecords();
    if (selectedRows && selectedRows.length <= 0) {
      message.warn('请选择行！');
      return;
    }
    Modal.confirm({
      iconType: 'warning',
      title: '提示',
      content: '确定要执行所选行吗？',
      onOk: async () => {
        const ids = selectedRows.map((item) => item.id);
        await batchExe(ids);
      },
      okButtonProps: {
        danger: true,
      }
    });
  }

  function handleExe(record: Recordable<any>) {
    batchExe([record.id]);
  }

  function handleViewApproveHistory(record: Recordable<any>) {
    approveHistoryModalRef.value.setData(record);
    approveHistoryModalRef.value.open();
    approveHistoryModalRef.value.setState({
      title: `查看流程【${record.processName??'-'}】的审批记录`,
    });
  }

  function handleViewFlowProperties(record: Recordable<any>) {
    flowPropertiesModalRef.value.setData(record);
    flowPropertiesModalRef.value.open();
    flowPropertiesModalRef.value.setState({
      title: `查看流程【${record.processName}】的变量`,
    });
  }

  function handlePreview(record: Recordable<any>) {
    bpmnPreviewModalRef.value.setData({
      modelKey: record.processDefinitionId?.substring(0, record.processDefinitionId?.indexOf(':')),
      procInstId: record.processInstanceId,
    });
    bpmnPreviewModalRef.value.open();
  }

  async function doCopyContent(content) {
    await copy(content);
    message.success('已拷贝到剪切板！');
  }
</script>
<style lang="less">
  .job-search-form {
    & > .ant-row {
      & > :last-child {
        flex: 1;
      }
    }
  }
  .duedate-wrap {
    .duedate-modify {
      display: none;
      cursor: pointer;
      &:hover {
        color: blue;
      }
    }
    &:hover {
      .duedate-modify {
        display: inline-block;
      }
    }
  }
</style>
