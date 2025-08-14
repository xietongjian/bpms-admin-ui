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
      <div class="bg-card h-full w-full">
        <BasicTree
            ref="basicTreeRef"
            title="分类"
            :show-search="true"
            :show-toolbar="true"
            :tree-data="treeData"
            class="h-full flex flex-col"
            size="small"
            @select="handleSelect"
            :height="treeHeight"
        />
      </div>
    </template>

    <BasicTable class="ml-2 w-full" :searchInfo="searchInfo">
      <template #toolbar-tools>
<!--        <Authority :value="'Notice:' + PerEnum.SYNC">
          <PopConfirmButton
            type="primary"
            @confirm="handleSync"
            title="同步所需时间较长，是否确认同步？"
            :loading="syncLoading"
            >同步
          </PopConfirmButton>
        </Authority>-->
        <Button v-access:code="PerPrefix + PerEnum.ADD" type="primary" @click="handleCreate"> 新增</Button>
      </template>
      <template #action="{row}">
        <TableAction :actions="createActions(row)" />
      </template>
      <template #title="{ row }">
        <TypographyLink @click="handlePreview(row)">
          {{row.title}}
        </TypographyLink>
      </template>

      <template #signerName="{row}">
        <EmpInfo :no="row.signerNo" :name="row.signerName" />
      </template>
      <template #publishStatusName="{row}">
        {{ row.publishStatusName }}
      </template>
<!--      <template #publishBoard="{row}">
        <div v-if="row.publishBoard">
          <Space>
            <Tag
                v-for="item in row.publishBoard
                  .split(',')
                  .map((item) => allPublishBoardMap[item])"
            >{{ item }}</Tag
            >
          </Space>
        </div>
        <div v-else> 未设置 </div>
      </template>-->
    </BasicTable>
    <NoticePreviewDrawer ref="noticePreviewDrawerRef" @success="handleSuccess" />
    <NoticeInputDrawer ref="noticeInputDrawerRef" @success="handleSuccess" />
  </ColPage>
</template>

<script lang="ts" setup>
  import { onMounted, ref, reactive, unref, computed } from 'vue';
  import type {Recordable} from '@vben/types';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {VxeGridProps} from '#/adapter/vxe-table';

  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {TableAction} from '#/components/table-action';
  import { columns, searchFormSchema } from './notice.data';
  import NoticePreviewDrawer from './NoticePreviewDrawer.vue';
  import NoticeInputDrawer from './NoticeInputDrawer.vue';
  import {
    getNoticeListByPage,
    deleteByIds,
    update,
    publish,
    SyncNotice,
  } from '#/api/portal/cms/notice';
  import { getAllBoard } from '#/api/portal/cms/board';
  import { BasicTree } from '#/components/Tree';
  import { getAllNoticeCategory } from '#/api/portal/cms/noticeCategory';
  import { EmpInfo } from '#/views/components/EmpInfo';
  import {Tag, Space, Button, message, TypographyLink} from 'ant-design-vue';
  // import {StatusTagColor} from "#/enums/commonEnum";
  import { getPublishStatus } from '#/api/portal/cms/news';
  import { PerEnum } from '#/enums/perEnum';
  import {ColPage} from '@vben/common-ui';
  import {useElementSize} from "@vueuse/core";

  const basicTreeRef = ref(null);
  const { height } = useElementSize(basicTreeRef);
  const currentCategory = ref({});

  const treeHeight = computed(() => {
    return height.value - 70;
  })

  const PerPrefix = 'Notice:';
  const noticeInputDrawerRef = ref(), noticePreviewDrawerRef = ref();
  const treeData = ref<any[]>([]);
  const searchInfo = reactive<Recordable<any>>({});
  const allPublishBoardMap = ref({});
  const publishStatusMap = ref({});
  const syncLoading = ref(false);

  const formOptions: VbenFormProps = {
    showCollapseButton: false,
    submitOnEnter: true,
    commonConfig: {
      labelWidth: 60,
    },
    wrapperClass: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
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
          formValues.categoryId = currentCategory.value?.id;
          return await getNoticeListByPage({
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

  onMounted(async () => {
    fetchCategory();
    const { updateSchema } = tableApi.formApi;
    const allPublishBoard = await getAllBoard({ type: 1 });
    const allPublishStatus = await getPublishStatus();
    // 将发布版块转换成Map
    let tempMap = {};
    allPublishBoard.forEach((item) => {
      tempMap[item.sn] = item.name;
    });
    allPublishBoardMap.value = tempMap;

    // 将发布状态转换成Mapp
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

  function handlePreview(record: Recordable<any>) {
    noticePreviewDrawerRef.value.setData();
    noticePreviewDrawerRef.value.open();
    noticePreviewDrawerRef.value.setState(
        {title: `预览 - ${record.title}`,}
    );
    /*// 预览前获取数据传入预览方法
    openNoticePreviewDrawer(true, {
      isTemp: false,
      record,
    });
    setNoticePreviewDrawerProps({
      title: `预览 - ${record.title}`,
      bodyStyle: { padding: '0px', margin: '0px' },
      width: 900,
      showOkBtn: false,
      showCancelBtn: true,
      cancelText: '关闭',
    });*/
  }

  function handleSelect(node: any) {
    currentCategory.value = node;
    tableApi.reload();
  }

  function createActions(record: Recordable<any>) {
    return [
      {
        auth: [PerPrefix + PerEnum.QUERY],
        tooltip: '预览',
        icon: 'ant-design:eye-outlined',
        onClick: handlePreview.bind(null, record),
      },
      /*{
      auth: 'Notice:' + PerEnum.UPDATE,
      tooltip: '下架',
      icon: 'ant-design:down-outlined',
      ifShow:(() => record.publishStatus === 'PUBLISHED' && record.sourceType!=='EKP'),
      popConfirm: {
        title: '是否确认下架',
        confirm: handleDown.bind(null, record),
      },
    },*/
      {
        auth: [PerPrefix + PerEnum.PUBLISH],
        tooltip: '发布',
        icon: 'ant-design:check-square-outlined',
        ifShow: () => record.publishStatus === 'DRAFT',
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
        danger: true,
        ifShow: record.sourceType !== 'EKP',
        popConfirm: {
          title: '是否确认删除',
          placement: 'left',
          confirm: handleDelete.bind(null, record),
          okButtonProps: { danger: true },
        },
      },
    ];
  }
  function handlePublish(record: Recordable<any>) {
    publish({ publishStatus: 'PUBLISHED', id: record.id }).then(() => {
      tableApi.reload();
    });
  }

  function handleDown(record: Recordable<any>) {
    update({ publishStatus: 'DOWN_SHELF', id: record.id }).then(() => {
      tableApi.reload();
    });
  }

  function handleCreate() {
    noticeInputDrawerRef.value.setData({ id: '' });
    noticeInputDrawerRef.value.open();
    noticeInputDrawerRef.value.setState({
      title: `新增公文`,
    });
    /*openNoticeInputDrawer(true, { id: '' });

    setNoticeInputDrawerProps({
      title: `新增公文`,
      bodyStyle: { padding: '0px', margin: '0px' },
      width: 1000,
      cancelText: '关闭',
      showOkBtn: false,
      destroyOnClose: true,
      maskClosable: false,
    });*/
  }
  function handleSync() {
    syncLoading.value = true;
    SyncNotice().finally(() => {
      syncLoading.value = false;
    });
  }
  function handleEdit(record: Recordable<any>) {
    noticeInputDrawerRef.value.setData( { id: record.id });
    noticeInputDrawerRef.value.open();
    noticeInputDrawerRef.value.setState({
      title: `编辑公文 - ${record.title}`,
    });

   /* openNoticeInputDrawer(true, { id: record.id });

    setNoticeInputDrawerProps({
      title: `编辑公文 - ${record.title}`,
      bodyStyle: { padding: '0px', margin: '0px' },
      width: 1000,
      cancelText: '关闭',
      showOkBtn: false,
      destroyOnClose: true,
      maskClosable: false,
    });*/
  }

  async function handleDelete(record: Recordable<any>) {
    const {success, msg} = await deleteByIds([record.id]);
    if(success){
      message.success(msg);
      tableApi.reload();
    }
  }

  function handleSuccess() {
    tableApi.reload();
  }

  async function fetchCategory() {
    treeData.value = await getAllNoticeCategory({ status: true });
  }
</script>
