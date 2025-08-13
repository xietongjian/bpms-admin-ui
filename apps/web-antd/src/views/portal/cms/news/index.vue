<template>
  <ColPage
      :left-max-width="50"
      :left-min-width="10"
      :left-width="15"
      :split-handle="false"
      :split-line="false"
      :resizable="true"
      :left-collapsible="false"
      :auto-content-height="true"
      content-class="h-full">
    <template #left >
      <div class="w-full mr-0 overflow-hidden bg-white">
        <BasicTree
          title="分类"
          toolbar
          search
          :clickRowToExpand="false"
          :treeData="treeData"
          :fieldNames="{ key: 'id', title: 'name' }"
          @select="handleSelect"
        />
      </div>
    </template>
    <BasicTable class="w-full" :searchInfo="searchInfo">
      <template #toolbar-tools>
        <!--        <Authority :value="'News' + PerEnum.ADD">-->
        <Button type="primary" @click="handleCreate"> 新增</Button>
        <!--        </Authority>-->
      </template>
      <template #action="{row}">
        <TableAction :actions="createActions(row)" />
      </template>

      <template #publishStatusRender="{ row }">
        <!--        <Tag :color="StatusTagColor[record.publishStatus]?.color">{{publishStatusMap[record?.publishStatus]}}</Tag>-->
      </template>

      <template #createdByRender="{ row }">
        <EmpInfo :no="row.createdByNo" :name="row.createdBy" />
      </template>
      <template #updatedByRender="{ row }">
        <EmpInfo :no="row.updatedByNo" :name="row.updatedBy" />
      </template>
      <template #publishPersonalRender="{ row }">
        <EmpInfo :no="row.personalNo" :name="row.personalName" />
      </template>
    </BasicTable>
    <NewsPreviewDrawer ref="newsPreviewDrawerRef" />
    <NewsInputDrawer ref="newsInputDrawerRef" @success="handleSuccess" />
  </ColPage>
</template>
<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
  import type {Recordable} from '@vben/types';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {VxeGridProps} from '#/adapter/vxe-table';

  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {ColPage} from '@vben/common-ui';
  import {TableAction} from '#/components/table-action';
  // import { BasicTable, TableAction, useTable } from '#/components/Table';
  // import { useDrawer } from '#/components/Drawer';
  import { columns, searchFormSchema } from './news.data';
  import {
    deleteByIds,
    getNewsListByPage,
    getPublishStatus,
    update,
    publish,
  } from '#/api/portal/cms/news';
  import NewsPreviewDrawer from './NewsPreviewDrawer.vue';
  import NewsInputDrawer from './NewsInputDrawer.vue';
  import { getAllBoard } from '#/api/portal/cms/board';
  // import { PageWrapper } from '#/components/Page';
  import { BasicTree } from '#/components/Tree';
  import { getAllNewsCategory } from '#/api/portal/cms/newsCategory';
  import { EmpInfo } from '#/views/components/EmpInfo';
  import { PerEnum } from '#/enums/perEnum';
  import {Button, message} from 'ant-design-vue';
  import {Page} from '@vben/common-ui';

  const PerPrefix = 'News:';
  const newsPreviewDrawerRef = ref(),newsInputDrawerRef = ref();

  // import {StatusTagColor} from "#/enums/commonEnum";
  // import {update} from "#/api/portal/cms/news";

  const allPublishBoardMap = ref({});
  const publishStatusMap = ref({});
/*  const [
    registerNewsInputDrawer,
    { openDrawer: openNewsInputDrawer, setDrawerProps: setNewsInputDrawerProps },
  ] = useDrawer();
  const [
    registerNewsPreviewDrawer,
    { openDrawer: openNewsPreviewDrawer, setDrawerProps: setNewsPreviewDrawerProps },
  ] = useDrawer();*/
  const treeData = ref<any[]>([]);
  const searchInfo = reactive<Recordable>({});

  const formOptions: VbenFormProps = {
    showCollapseButton: false,
    submitOnEnter: true,
    commonConfig: {
      labelWidth: 60,
    },
    wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    actionWrapperClass: 'pl-2 !justify-end md:!justify-start',
    actionPosition: 'left',
    actionLayout: 'inline',
    resetButtonOptions: {
      show: false,
    },
    schema: searchFormSchema,
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
          return await getNewsListByPage({
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

  /*const [registerTable, { reload, getForm }] = useTable({
    title: '列表',
    api: getNewsListByPage,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      showAdvancedButton: true,
      showResetButton: true,
      autoSubmitOnEnter: true,
    },
    canColDrag: true,
    useSearchForm: true,
    bordered: false,
    showIndexColumn: true,
    actionColumn: {
      width: 150,
      title: '操作',
      field: 'action',
      fixed: 'right',
    },
  });*/

  onMounted(async () => {
    fetchCategory();
    const { getFieldsValue, updateSchema } = tableApi.formApi;
    const allPublishBoard = await getAllBoard({ type: 1 });
    const allPublishStatus = await getPublishStatus();

    // 将发布版块转换成Map
    let tempMap = {};
    allPublishBoard.forEach((item) => {
      tempMap[item.sn] = item.name;
    });
    allPublishBoardMap.value = tempMap;

    // 将发布状态转换成Map
    let tempStatusMap = {};

    allPublishStatus.forEach((item) => {
      tempStatusMap[item.value] = item.label;
    });

    publishStatusMap.value = tempStatusMap;

    await updateSchema([
      {
        fieldName: 'publishBoard',
        component: 'Select',
        componentProps: {
          options: allPublishBoard,
        },
      },
      {
        fieldName: 'publishStatus',
        component: 'Select',
        componentProps: {
          options: allPublishStatus,
        },
      },
    ]);
  });

  function handlePreview(record: Recordable) {
    // 预览前获取数据传入预览方法
    openNewsPreviewDrawer(true, {
      isTemp: false,
      record,
    });
    setNewsPreviewDrawerProps({
      title: `预览 - ${record.title}`,
      bodyStyle: { padding: '0px', margin: '0px' },
      width: 1000,
      showOkBtn: false,
      showCancelBtn: true,
      cancelText: '关闭',
    });
  }

  function handleCreate() {
    newsInputDrawerRef.value.setData({ id: '' });
    newsInputDrawerRef.value.open();
    newsInputDrawerRef.value.setState({
      title: `新增新闻`
    });
    // go({ name: 'NewsInput', query: { id: '' } });
    /*openNewsInputDrawer(true, { id: '' });

    setNewsInputDrawerProps({
      title: `新增新闻`,
      bodyStyle: { padding: '0px', margin: '0px' },
      width: 1000,
      cancelText: '关闭',
      showOkBtn: false,
      destroyOnClose: true,
      maskClosable: false,
    });*/
  }

  function handleDown(record: Recordable) {
    update({ publishStatus: 'DOWN_SHELF', id: record.id }).then(() => {
      tableApi.reload();
    });
  }

  function handlePublish(record: Recordable) {
    publish({ publishStatus: 'PUBLISHED', id: record.id }).then(() => {
      tableApi.reload();
    });
  }

  function createActions (record: Recordable) {
    return [
      {
        auth: [PerPrefix + PerEnum.QUERY],
        tooltip: '预览',
        icon: 'ant-design:eye-outlined',
        onClick: handlePreview.bind(null, record),
      },
      {
        auth: [PerPrefix + PerEnum.UPDATE],
        tooltip: '下架',
        icon: 'ant-design:down-outlined',
        ifShow: () => record.publishStatus === 'PUBLISHED',
        popConfirm: {
          title: '是否确认下架',
          confirm: handleDown.bind(null, record),
          okButtonProps: {
            danger: true
          }
        },
      },
      {
        auth: [PerPrefix + PerEnum.PUBLISH],
        tooltip: '发布',
        icon: 'ant-design:check-square-outlined',
        ifShow: () => record.publishStatus === 1,
        popConfirm: {
          title: '是否确认发布',
          confirm: handlePublish.bind(null, record),
        },
      },
      {
        auth: [PerPrefix + PerEnum.UPDATE],
        tooltip: '修改',
        icon: 'clarity:note-edit-line',
        onClick: handleEdit.bind(null, record),
      },
      {
        auth: [PerPrefix + PerEnum.DELETE],
        tooltip: '删除',
        icon: 'ant-design:delete-outlined',
        color: 'error',
        popConfirm: {
          title: '是否确认删除',
          placement: 'left',
          confirm: handleDelete.bind(null, record),
          okButtonProps: {
            danger: true
          }
        },
      },
    ];
  }

  function handleSelect(categoryId) {
    searchInfo.categoryId = categoryId[0];
    tableApi.reload();
  }

  function handleEdit(record: Recordable) {
    newsInputDrawerRef.value.setData({ id: record.id });
    newsInputDrawerRef.value.open();
    newsInputDrawerRef.value.setState({
      title: `编辑新闻 - ${record.title}`,
    });
    /*openNewsInputDrawer(true, { id: record.id });

    setNewsInputDrawerProps({
      bodyStyle: { padding: '0px', margin: '0px' },
      width: 1000,
      cancelText: '关闭',
      showOkBtn: false,
      destroyOnClose: true,
      maskClosable: false,
    });*/
  }

  function handleDelete(record: Recordable) {
    deleteByIds([record.id]).then(() => {
      tableApi.reload();
    });
  }

  async function fetchCategory() {
    treeData.value = await getAllNewsCategory({ status: true });
  }
  function handleSuccess() {
    tableApi.reload();
  }
</script>

