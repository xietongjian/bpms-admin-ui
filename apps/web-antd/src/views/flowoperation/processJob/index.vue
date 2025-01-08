<template>
  <Page auto-content-height class="h-full flex flex-row">
    <div class="p-4 bg-card !pb-1">
      <BasicForm class="job-search-form" @register="registerSearchForm" />
    </div>
    <div class="mt-4 bg-card flex-1">
      <Tabs
          class="h-full"
        @change="handleChangeTab"
        type="card"
        :tabBarStyle="{ marginBottom: 0 }"
        v-model:activeKey="activeKey"
      >
        <template #rightExtra>
          <div v-if="selectedRowsCount > 0">
            <Button v-if="hasAccessByCodes([PerPrefix + PerEnum.UPDATE])" class="mr-4" type="primary" @click="handleBatchExe">批量执行</Button>
          </div>
        </template>
        <TabPane key="timerJob">
          <template #tab>
            <Space>
              <span class="font-bold">延迟队列</span>
              <Badge :overflow-count="99999999" :count="dataCount.timerJobCount" />
            </Space>
          </template>
          <TimerJobTable @register="registerTimerJobTable">
            <template #action="{row}">
              <TableAction :actions="createActions(row, 'timerJob')"/>
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
              <div class="duedate-wrap">
                {{ row.duedate }}
                <Tooltip title="修改队列执行时间">
                  <HighlightOutlined
                      @click="handleChangeDueDate(row)"
                      class="duedate-modify"
                  />
                </Tooltip>
              </div>
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
          </TimerJobTable>
        </TabPane>
        <TabPane key="deadLetterJob">
          <template #tab>
            <Space>
              <span class="font-bold">死信队列</span>
              <Badge :overflow-count="99999999" :count="dataCount.deadLetterJobCount" />
            </Space>
          </template>
          <DeadLetterJobTable @register="registerDeadLetterJobTable" @selection-change="changeSelection">
            <template #action="{row}">
              <TableAction :actions="createActions(row, 'deadLetterJob')"/>
            </template>
            <template #processInstanceId="{row}">
              <a v-if="!!row.processInstanceId" @click="doCopyContent(row.processInstanceId)">
                <CopyOutlined />
              </a>
              {{ row.processInstanceId||'-' }}
            </template>

            <template #tenantId="{row}">
              {{ appObjs && appObjs[row.tenantId] }}
            </template>

            <template #processName="{row}">
              <Tooltip title="查看流程图">
                <a>
                  <PartitionOutlined @click="handlePreview(row)" />
                </a>
              </Tooltip>
              <Tooltip placement="top" :mouseEnterDelay="0.3">
                <template #title>
                  {{ row.processName }}
                </template>
                {{ row.processName }}
              </Tooltip>
            </template>
          </DeadLetterJobTable>
        </TabPane>
      </Tabs>
    </div>
    <ApproveHistoryModal ref="approveHistoryModalRef" @register="registerApproveHistoryModal" />
    <FlowPropertiesModal ref="flowPropertiesModalRef" @register="registerFlowPropertiesModal" />
    <BpmnPreviewModal ref="bpmnPreviewModalRef" @register="registerBpmnPreviewModal" />
    <TimerJobEditModal ref="timerJobEditModalRef" @register="registerTimerJobEditModal" @success="handleChangeTab" />
  </Page>
</template>
<script lang="ts" setup>
  import { nextTick, ref } from 'vue';
  import { PerEnum } from '#/enums/perEnum';
  import {useAccess} from '@vben/access';
  import type {Recordable} from '@vben/types';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {VxeGridProps, VxeGridListeners} from '#/adapter/vxe-table';
  import { useClipboard } from '@vueuse/core';

  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {ColPage, Page} from '@vben/common-ui';
  import {TableAction} from '#/components/table-action';


  import {
    getJobsCount,
    moveDeadLetterJobToExecutableJobByJobIds,
    queryDeadLetterJobPagerModel,
    queryTimerJobPagerModel,
  } from '#/api/flowoperation/processJob';
  import {BpmnPreviewModal} from '#/views/components/preview';
  import { getAll } from '#/api/base/app';
  // import { useLoading } from '@/components/Loading';
  import { timerJobColumns, deadLetterJobColumns, searchFormSchema } from './processJob.data';
  import ApproveHistoryModal from '../processInst/ApproveHistoryModal.vue';
  import FlowPropertiesModal from '../processInst/FlowPropertiesModal.vue';
  import TimerJobEditModal from './TimerJobEditModal.vue';
  import { CopyOutlined, PartitionOutlined, HighlightOutlined } from '@ant-design/icons-vue';
  // import { copyText } from '@/utils/copyTextToClipboard';
  import { Tooltip, Tabs, Badge, Button, Space, message } from 'ant-design-vue';
  // import { useModal } from '@/components/Modal';
  // import { useRequest } from '@vben/hooks';
  // import { PerEnum } from '@/enums/perEnum';
  // import { Authority } from '@/components/Authority';
  // import { BasicForm, Rule, useForm } from '@/components/Form/index';
  // import {columns} from "#/views/form/custom/modelInfo/modelInfo.data";
  // import {getCustomPagerModel} from "#/api/form/customForm";
  import {useVbenForm} from '#/adapter/form';

  defineOptions({ name: 'ProcessJob' });
  const { copy } = useClipboard({ legacy: true });

  const PerPrefix = 'ProcessJob:';
  const {hasAccessByCodes} = useAccess();

  const TabPane = Tabs.TabPane;
  const activeKey = ref<string>('timerJob');
  const dataCount = ref<object>({ timerJobCount: 0, DeadLetterJobCount: 0 });
  const selectedRowsCount = ref(0);
  const appObjs = ref({});

  const approveHistoryModalRef = ref(),
    flowPropertiesModalRef = ref(),
    bpmnPreviewModalRef = ref(),
    timerJobEditModalRef = ref();
  /*
  const [
    registerTimerJobEditModal,
    { openModal: openTimerJobEditModal, setModalProps: setTimerJobEditModalProps },
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
  ] = useModal();*/
/*
  const [registerSearchForm, { updateSchema, setProps, validate }] = useForm({
    labelWidth: 90,
    showResetButton: true,
    autoSubmitOnEnter: true,
    schemas: searchFormSchema,
    actionColOptions: {
      span: 24,
    },
    compact: true,
    submitFunc: doSearchFunc,
    fieldMapToTime: [['dateRange', ['startDate', 'endDate'], 'YYYY-MM-DD']],
  });*/



  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: true,
    submitButtonOptions: {
      content: '查询',
    },
    layout: 'horizontal',
    schema: searchFormSchema,
    wrapperClass: 'grid-cols-4',
  });


/*
  const [registerTimerJobTable, { reload: reloadTimerJob }] = useTable({
    title: '',
    size: 'small',
    api: queryTimerJobPagerModel,
    columns: timerJobColumns,
    beforeFetch: (values) => {
      return values;
    },

    canColDrag: true,
    useSearchForm: false,
    bordered: true,
    showIndexColumn: true,
    actionColumn: {
      width: 160,
      title: '操作',
      dataIndex: 'action',
    },
  });*/

  /*const [registerDeadLetterJobTable, { reload: reloadDeadLetterJob, getSelectRows }] = useTable({
    title: '',
    size: 'small',
    api: queryDeadLetterJobPagerModel,
    columns: deadLetterJobColumns,
    rowSelection: {
      type: 'checkbox',
      columnWidth: 30,
    },
    beforeFetch: (values) => {
      return values;
    },
    canColDrag: true,
    useSearchForm: false,
    bordered: true,
    showIndexColumn: true,
    actionColumn: {
      width: 160,
      title: '操作',
      dataIndex: 'action',
    },
  });*/

  const deadLetterJobGridOptions: VxeGridProps = {
    columns: deadLetterJobColumns,
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
          return await queryDeadLetterJobPagerModel({
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

  const [DeadLetterJobTable, deadLetterJobTableApi] = useVbenVxeGrid({gridOptions: deadLetterJobGridOptions});


  const timerJobGridOptions: VxeGridProps = {
    columns: timerJobColumns,
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
          return await queryTimerJobPagerModel({
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

  const [TimerJobTable, timerJobTableApi] = useVbenVxeGrid({gridOptions: timerJobGridOptions});

  function createActions(record: Recordable<any>, type: string) {
    if(type === 'timerJob'){
      return [
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
    return [
      {
        auth: PerPrefix + PerEnum.UPDATE,
        icon: 'ant-design:play-circle-filled',
        tooltip: '执行',
        label: '',
        color: 'success',
        popConfirm: {
          title: '确认执行吗?',
          confirm: handleExe.bind(null, record),
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

  /**
   *  自定义搜索功能
   **/
  async function doSearchFunc() {
    try {
      await setProps({
        submitButtonOptions: {
          loading: true,
        },
      });
      await handleChangeTab(activeKey.value);
    } catch (error) {
    } finally {
      setProps({
        submitButtonOptions: {
          loading: false,
        },
      });
    }
  }

  const reloadData = (params) => {
    const searchInfo = params || {};
    if (activeKey.value === 'timerJob') {
      reloadTimerJob({ searchInfo });
    } else if (activeKey.value === 'deadLetterJob') {
      reloadDeadLetterJob({ searchInfo });
    }
  };

  function changeSelection({ keys, rows }) {
    selectedRowsCount.value = keys.length;
  }

  function handleChangeDueDate(record) {
    openTimerJobEditModal(true, {
      record,
      isUpdate: true,
    });
    setTimerJobEditModalProps({
      width: 600,
      title: `修改队列执行时间`,
      showOkBtn: true,
      centered: true,
      cancelText: '关闭',
    });
  }

/*  useRequest(
    () => {
      handleChangeTab();
      return Promise.resolve({});
    },
    {
      refreshOnWindowFocus: true,
    },
  );*/

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

    await formApi.updateSchema([
      {
        fieldName: 'tenantId',
        componentProps: { options: appList, labelField: 'id' },
      },
    ]);
  });

  async function handleChangeTab() {
    const values = await validate();
    reloadData(values);
    dataCount.value = await getJobsCount();
  }

  function batchExe(ids) {
    openFullLoading();
    moveDeadLetterJobToExecutableJobByJobIds(ids)
      .then((res) => {
        const { data, success, msg } = res.data;
        if (success) {
          message.success(msg);
          setTimeout(() => {
            handleChangeTab();
            closeFullLoading();
          }, 1000);
        } else {
          message.error(msg);
        }
      })
      .catch((e) => {
        closeFullLoading();
      })
      .finally(() => {
        closeFullLoading();
      });
  }

  function handleBatchExe() {
    const selectedRows = getSelectRows();
    if (selectedRows && selectedRows.length <= 0) {
      message.warn('请选择行！');
      return;
    }
    createConfirm({
      iconType: 'warning',
      title: '提示',
      content: '确定要执行所选行吗？',
      onOk: async () => {
        const ids = selectedRows.map((item) => item.id);
        batchExe(ids);
      },
    });
  }

  function handleExe(record: Recordable<any>) {
    batchExe([record.id]);
  }

  function handleViewApproveHistory(record: Recordable<any>) {
    openApproveHistoryModal(true, {
      record,
      isUpdate: true,
    });
    setModalProps({
      width: 800,
      title: `查看流程【${record.processName}】的审批记录`,
      showOkBtn: false,
      centered: true,
      cancelText: '关闭',
    });
  }

  function handleViewFlowProperties(record: Recordable<any>) {
    openFlowPropertiesModal(true, {
      record,
    });
    setFlowPropertiesModalProps({
      width: 900,
      title: `查看流程【${record.processName}】的变量`,
      showOkBtn: false,
      centered: true,
      cancelText: '关闭',
    });
  }

  function handlePreview(record: Recordable<any>) {
    bpmnPreviewModalRef.value.setData({
      modelKey: record.processDefinitionId.substring(0, record.processDefinitionId.indexOf(':')),
      procInstId: record.processInstanceId,
    });
    bpmnPreviewModalRef.value.open();
    /*openBpmnPreviewModal(true, {
      modelKey: record.processDefinitionId.substring(0, record.processDefinitionId.indexOf(':')),
      procInstId: record.processInstanceId,
    });
    setBpmnPreviewProps({
      centered: true,
      useWrapper: false,
      showOkBtn: false,
      cancelText: '关闭',
    });*/
  }

  function handleCloseFunc() {
    handleChangeTab();
    return Promise.resolve(true);
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
