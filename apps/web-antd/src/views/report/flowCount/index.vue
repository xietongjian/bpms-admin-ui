<template>
  <Page auto-content-height>
    <div class="p-4 bg-card" style="padding-bottom: 0">
      <BasicForm class="" @register="registerSearchForm" />
    </div>

    <div class="mt-4">
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
                <a-button type="primary" @click="handleExportTodo">导出Excel</a-button>
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
                <a-button type="primary" @click="handleExportHaveDown">导出Excel</a-button>
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
                <a-button type="primary" @click="handleExportLaunched">导出Excel</a-button>
              </div>
            </template>
            <template #personalNameRender="{ record }">
              <EmpInfo :no="record.personalCode" :name="record.personalName" />
            </template>
          </LaunchedBasicTable>
        </TabPane>
      </Tabs>
    </div>
  </Page>
</template>
<script lang="ts" setup>
  import { defineComponent, nextTick, ref } from 'vue';
  import type { Recordable } from '@vben/types';
  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {useVbenForm} from '#/adapter/form';
  import {message, Tabs, Badge } from 'ant-design-vue';
  import type {VxeGridProps} from '#/adapter/vxe-table';
  import type {VbenFormProps} from '@vben/common-ui';
  import {PerEnum} from "#/enums/perEnum";

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
  import {formSchema, listColumns} from "#/views/base/app/app.data";
  import {getAppListByPage} from "#/api/base/app";

  const TabPane = Tabs.Pane;

  const activeKey = ref<string>('todo');
  const dataCount = ref<object>({ appingCount: 0, applyedCount: 0, myCount: 0 });

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: searchFormSchema,
    wrapperClass: 'grid-cols-1',
  });

  /*const [
    registerSearchForm,
    { setFieldsValue, updateSchema, resetFields, setProps, validate },
  ] = useForm({
    labelWidth: 80,
    schemas: searchFormSchema,
    showActionButtonGroup: true,
    showAdvancedButton: true,
    actionColOptions: {
      span: 24,
    },
    compact: true,
    autoAdvancedLine: 1,
    alwaysShowLines: 1,
    submitFunc: doSearchFunc,
    fieldMapToTime: [['dateRange', ['startDate', 'endDate'], 'YYYY-MM-DD']],
  });*/

/*  const [registerTodoTable, { reload: reloadTodo }] = useTable({
    title: '',
    size: 'small',
    api: getTaskProcessDetail,
    columns,
    immediate: false,
    canColDrag: true,
    useSearchForm: false,
    bordered: true,
    showIndexColumn: true,
    searchInfo: {
      taskFinishFlag: false,
    },
  });*/

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
          return await getTaskProcessDetail({
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
  const [TodoBasicTable, todoTableApi] = useVbenVxeGrid({gridOptions});


/*  const [registerHaveDownTable, { reload: reloadHaveDown }] = useTable({
    title: '',
    size: 'small',
    api: getTaskProcessDetail,
    columns,
    immediate: false,
    canColDrag: true,
    useSearchForm: false,
    bordered: true,
    showIndexColumn: true,
    searchInfo: {
      taskFinishFlag: true,
    },
  });*/
  const [HaveDownBasicTable, haveDownTableApi] = useVbenVxeGrid({gridOptions});


/*  const [registerLaunchedTable, { reload: reloadLaunched }] = useTable({
    title: '',
    size: 'small',
    api: getMyProcessDetail,
    columns,
    immediate: false,
    canColDrag: true,
    useSearchForm: false,
    bordered: true,
    showIndexColumn: true,
  });*/
  const myGridOptions: VxeGridProps<any> = {
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
          return await getMyProcessDetail({
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
  const [LaunchedBasicTable, launchedTableApi] = useVbenVxeGrid({myGridOptions});


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
