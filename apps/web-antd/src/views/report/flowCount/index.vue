<template>
  <div class="p-4">
    <div class="p-4 bg-white" style="padding-bottom: 0">
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
          <BasicTable @register="registerTodoTable">
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
          </BasicTable>
        </TabPane>
        <TabPane key="haveDown">
          <template #tab>
            <span class="font-bold">已处理</span>
            <Badge :overflow-count="99999999" :count="dataCount.applyedCount" />
          </template>
          <BasicTable @register="registerHaveDownTable">
            <template #title>
              <div> </div>
              <div>
                <a-button type="primary" @click="handleExportHaveDown">导出Excel</a-button>
              </div>
            </template>
            <template #personalNameRender="{ record }">
              <EmpInfo :no="record.personalCode" :name="record.personalName" />
            </template>
          </BasicTable>
        </TabPane>
        <TabPane key="launched">
          <template #tab>
            <span class="font-bold">提交的</span>
            <Badge :overflow-count="99999999" :count="dataCount.myCount" />
          </template>
          <BasicTable @register="registerLaunchedTable">
            <template #title>
              <div> </div>
              <div>
                <a-button type="primary" @click="handleExportLaunched">导出Excel</a-button>
              </div>
            </template>
            <template #personalNameRender="{ record }">
              <EmpInfo :no="record.personalCode" :name="record.personalName" />
            </template>
          </BasicTable>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, nextTick, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { BasicForm, Rule, useForm } from '@/components/Form/index';
  import { Tabs, Badge } from 'ant-design-vue';
  import { useLoading } from '@/components/Loading';
  import { useMessage } from '@/hooks/web/useMessage';

  import { columns, searchFormSchema } from './flowCount.data';
  import { EmpInfo } from '@/components/EmpInfo';

  import {
    downloadMyProcessDetail,
    downloadTaskProcessDetail,
    getFlowCountReport,
    getMyProcessDetail,
    getTaskProcessDetail,
  } from '@/api/report/flowCount';

  export default defineComponent({
    name: 'FlowInstCount',
    components: {
      BasicForm,
      Tabs,
      TabPane: Tabs.TabPane,
      Badge,
      EmpInfo,
      // ApproveHistoryModal,
      // FlowPropertiesModal,
      BasicTable,
      TableAction,
    },
    setup() {
      const { createMessage } = useMessage();

      const [openFullLoading, closeFullLoading] = useLoading({
        tip: '下载中...',
      });
      const activeKey = ref<string>('todo');
      const dataCount = ref<object>({ appingCount: 0, applyedCount: 0, myCount: 0 });

      const [
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
      });

      const [registerTodoTable, { reload: reloadTodo }] = useTable({
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
      });

      const [registerHaveDownTable, { reload: reloadHaveDown }] = useTable({
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
      });

      const [registerLaunchedTable, { reload: reloadLaunched }] = useTable({
        title: '',
        size: 'small',
        api: getMyProcessDetail,
        columns,
        immediate: false,
        canColDrag: true,
        useSearchForm: false,
        bordered: true,
        showIndexColumn: true,
      });

      async function handleChangeTab(value) {
        const values = await validate();
        if (!values.userNo && !values.deptId && !values.companyId && !values.dateRange) {
          return;
        }
        switch (value) {
          case 'todo':
            reloadTodo({ searchInfo: { ...values } });
            break;
          case 'haveDown':
            reloadHaveDown({ searchInfo: { ...values } });
            break;
          case 'launched':
            reloadLaunched({ searchInfo: { ...values } });
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

      return {
        activeKey,
        dataCount,
        registerTodoTable,
        registerSearchForm,
        registerHaveDownTable,
        registerLaunchedTable,
        handleChangeTab,
        handleExportTodo,
        handleExportHaveDown,
        handleExportLaunched,
      };
    },
  });
</script>
