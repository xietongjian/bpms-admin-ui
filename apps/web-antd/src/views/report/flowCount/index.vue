<template>
  <Page auto-content-height>
    <BasicTable>
      <template #toolbar-actions>
        <RadioGroup v-model:value="procInstDataType" button-style="solid" @change="handleChangeProcInstType">
          <RadioButton value="todo">
            <div class="flex items-center gap-1">
              未处理
              <Badge
                  :numberStyle="{height: '16px', lineHeight: '16px', fontSize: '12px' }"
                  :overflow-count="99999999"
                  :count="dataCount.appingCount" />
            </div>
          </RadioButton>
          <RadioButton value="haveDown">
            <div class="flex items-center gap-1">
              已处理
              <Badge
                  :numberStyle="{height: '16px', lineHeight: '16px', fontSize: '12px' }"
                  :overflow-count="99999999"
                  :count="dataCount.applyedCount" />
            </div>
          </RadioButton>
          <RadioButton value="launched">
            <div class="flex items-center gap-1">
              已提交
              <Badge
                  :numberStyle="{height: '16px', lineHeight: '16px', fontSize: '12px' }"
                  :overflow-count="99999999"
                  :count="dataCount.myCount" />
            </div>
          </RadioButton>
        </RadioGroup>
      </template>

      <template #startedUserName="{row}">
        <EmpInfo :no="row.startedUserId" :name="row.startedUserName" />
      </template>

      <template #processName="{row}">
        <Tooltip title="查看流程图">
          <TypographyLink @click="handlePreview(row)" class="mr-2">
            <PartitionOutlined  />
          </TypographyLink>
        </Tooltip>
        <TypographyLink @click="handleViewForm(row)">
          {{ row.processName }}
        </TypographyLink>
      </template>

      <template #processStatusName="{row}">
        <ProcessStatus :value="row.processStatus" :text="row.processStatusName" />
      </template>
    </BasicTable>

    <ApproveHistoryModal ref="approveHistoryModalRef" />
    <FlowPropertiesModal ref="flowPropertiesModalRef" />
    <BpmnPreviewModal ref="bpmnPreviewModalRef" />
    <ProcessNodeSelectionModal ref="processNodeSelectionModalRef" />
    <ProcessVersionSelectionModal ref="processVersionSelectionModalRef" />
    <ProcessVariablesModal ref="processVariablesModalRef" />
    <ProcessFormPreviewDrawer ref="processFormPreviewDrawerRef" />


<!--    <div class="p-4 bg-card" style="padding-bottom: 0">
      <BasicForm/>
    </div>

    <div class="mt-4 flex-1">
      <Tabs
        @change="handleChangeTab"
        type="card"
        :tabBarStyle="{ marginBottom: 0 }"
        v-model:activeKey="activeKey"
      >
        <TabPane key="todo">
          <template #tab>
            <span class="font-bold">未处理</span>
            <Badge :overflow-count="99999999" :count="dataCount.appingCount" />
          </template>
          <TodoBasicTable @register="registerTodoTable">
            <template #title>
              <div>
                <Button type="primary" @click="handleExportTodo">导出Excel</Button>
              </div>
            </template>
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'personalName'">
                <EmpInfo :no="record.personalCode" :name="record.personalName" />
              </template>
            </template>
          </TodoBasicTable>
        </TabPane>
        <TabPane key="haveDown">
          <template #tab>
            <span class="font-bold">已处理</span>
            <Badge :overflow-count="99999999" :count="dataCount.applyedCount" />
          </template>
          <HaveDownBasicTable @register="registerHaveDownTable">
            <template #title>
              <div> </div>
              <div>
                <Button type="primary" @click="handleExportHaveDown">导出Excel</Button>
              </div>
            </template>
            <template #personalNameRender="{ record }">
              <EmpInfo :no="record.personalCode" :name="record.personalName" />
            </template>
          </HaveDownBasicTable>
        </TabPane>
        <TabPane key="launched">
          <template #tab>
            <span class="font-bold">提交的</span>
            <Badge :overflow-count="99999999" :count="dataCount.myCount" />
          </template>
          <LaunchedBasicTable @register="registerLaunchedTable">
            <template #title>
              <div> </div>
              <div>
                <Button type="primary" @click="handleExportLaunched">导出Excel</Button>
              </div>
            </template>
            <template #personalNameRender="{ record }">
              <EmpInfo :no="record.personalCode" :name="record.personalName" />
            </template>
          </LaunchedBasicTable>
        </TabPane>
      </Tabs>
    </div>-->
  </Page>
</template>
<script lang="ts" setup>
  import {  ref } from 'vue';
  import type { Recordable } from '@vben/types';
  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {message, Tooltip, Badge, TypographyLink, RadioButton, RadioGroup} from 'ant-design-vue';
  import type {VxeGridProps} from '#/adapter/vxe-table';
  import type {VbenFormProps} from '@vben/common-ui';
  import { columns, searchFormSchema } from './flowCount.data';
  import { EmpInfo } from '#/views/components/EmpInfo';

  import {
    downloadMyProcessDetail,
    downloadTaskProcessDetail,
    getFlowCountReport,
    getMyProcessDetail,
    getTaskProcessDetail,
  } from '#/api/report/flowCount';
  import {Page} from "@vben/common-ui";
  import {BpmnPreviewModal, ProcessFormPreviewDrawer} from "#/views/components/preview";
  import { PartitionOutlined} from "@ant-design/icons-vue";
  import FlowPropertiesModal from "#/views/flowoperation/processInst/FlowPropertiesModal.vue";
  import ProcessStatus from "#/views/components/process/ProcessStatus.vue";
  import ApproveHistoryModal from "#/views/flowoperation/processInst/ApproveHistoryModal.vue";
  import ProcessNodeSelectionModal from "#/views/flowoperation/processTask/components/ProcessNodeSelectionModal.vue";
  import ProcessVersionSelectionModal from "#/views/flowoperation/processInst/ProcessVersionSelectionModal.vue";
  import ProcessVariablesModal from "#/views/flowoperation/processInst/ProcessVariablesModal.vue";
  import { isEmpty } from '#/utils/is';

  const procInstDataType = ref('todo');

  const dataCount = ref<object>({ appingCount: 0, applyedCount: 0, myCount: 0 });

  const approveHistoryModalRef = ref(),
      flowPropertiesModalRef = ref(),
      bpmnPreviewModalRef = ref(),
      processFormPreviewDrawerRef = ref(),
      processVariablesModalRef = ref();

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
    fieldMappingTime: [['dateRange', ['startDate', 'endDate'], 'YYYY-MM-DD']],
    wrapperClass: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
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
      autoLoad: false,
      ajax: {
        query: async ({page}, formValues) => {
          if (isEmpty(formValues.userNo)
              && isEmpty(formValues.deptId)
              && isEmpty(formValues.companyId)
              && isEmpty(formValues.dateRange)) {
            message.warning('请至少选择一个条件！')
            return Promise.resolve([]);
          }

          const params = {
            query: {
              pageNum: page.currentPage,
              pageSize: page.pageSize,
            },
            entity: {...formValues, procInstDataType: procInstDataType.value}
          };
          dataCount.value = await getFlowCountReport(params);
          if(procInstDataType.value === 'todo'){
            params.entity.taskFinishFlag = false;
            return await getTaskProcessDetail(params);
          } else if(procInstDataType.value === 'haveDown'){
            params.entity.taskFinishFlag = true;
            return await getTaskProcessDetail(params);
          } else if(procInstDataType.value === 'launched'){
            return await getMyProcessDetail(params);
          }
        },
      },
    },
  };

  const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});
  // 预览流程图
  function handlePreview(record: Recordable<any>) {
    bpmnPreviewModalRef.value.setData({
      modelKey: record.modelKey,
      procInstId: record.processInstanceId,
    });
    bpmnPreviewModalRef.value.open();
  }

  function handleViewForm(record: Recordable<any>) {
    record.allowsOperation = false;
    processFormPreviewDrawerRef.value.setData({
      ...record,
      procInstId: record.processInstanceId,
      modelKey: record.modelKey,
    });
    processFormPreviewDrawerRef.value.open();
    processFormPreviewDrawerRef.value.setState({title: `查看流程【${record.processName}】的表单`});
  }

  function handleChangeProcInstType(e: Event) {
    tableApi.reload();
  }

  async function handleChangeTab(value) {
    const values = await formApi.getValues();
    if (!values.userNo && !values.deptId && !values.companyId && !values.dateRange) {
      return;
    }
    switch (value) {
      case 'todo':
        todoTableApi.reload({ searchInfo: { ...values } });
        break;
      case 'haveDown':
        haveDownTableApi.reload({ searchInfo: { ...values } });
        break;
      case 'launched':
        launchedTableApi.reload({ searchInfo: { ...values } });
        break;
    }
    dataCount.value = await getFlowCountReport({ ...values });
  }

  /**
   *  自定义搜索功能
   **/
  async function doSearchFunc() {
    try {
      const values = await validate();
      await setProps({
        submitButtonOptions: {
          loading: true,
        },
      });
      if (!values.userNo && !values.deptId && !values.companyId) {
        createMessage.warning('请至少选择一个条件！');
        return;
      }
      // await handleChangeTab(activeKey.value);
    } catch (error) {
    } finally {
      setProps({
        submitButtonOptions: {
          loading: false,
        },
      });
    }
  }

  // 下载待办
  async function handleExportTodo() {
    openFullLoading();
    const values = await validate();
    downloadTaskProcessDetail({ ...values, taskFinishFlag: false }).finally(() => {
      setTimeout(() => {
        closeFullLoading();
      }, 1500);
    });
  }
  // 下载已办
  async function handleExportHaveDown() {
    openFullLoading();
    const values = await validate();
    downloadTaskProcessDetail({ ...values, taskFinishFlag: true }).finally(() => {
      setTimeout(() => {
        closeFullLoading();
      }, 1500);
    });
  }
  // 下载已发起的
  async function handleExportLaunched() {
    openFullLoading();
    const values = await validate();
    downloadMyProcessDetail({ ...values }).finally(() => {
      setTimeout(() => {
        closeFullLoading();
      }, 1500);
    });
  }
</script>
