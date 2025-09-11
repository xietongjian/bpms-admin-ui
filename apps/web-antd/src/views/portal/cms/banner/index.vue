<template>
  <Page auto-content-height>
    <BasicTable table-title="轮播图管理">
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix + PerEnum.ADD" type="primary" @click="handleCreate"> 新增</Button>
      </template>

      <template #imgs="{ row }">
        <div class="!h-20 relative">
          <div v-if="row.imgPath">
            <Image :src="row.imgPath" :alt="row.title" class="w-full !h-20 object-contain" />
          </div>
          <span v-else class="">暂无图片</span>
          <p :title="row.title"
             class="absolute bottom-0 leading-8 flex flex-col justify-center bg-card/50 items-center w-full">
            <a v-if="row.linkUrl" :href="row.linkUrl" target="_blank">
              {{ row.title }}
            </a>
            <span v-else>
              {{ row.title }}
            </span>
          </p>
        </div>
      </template>
      <template #publishBoard="{ row }">
        <Tag v-for="item in row.publishBoard.split(',')">
          {{publishBoardSnMap.get(item)?.name}}
        </Tag>
      </template>
      <template #linkUrlRender="{ row }">
        <a v-if="row.linkUrl" :href="row.linkUrl" target="_blank">
          {{ row.linkUrl }}
        </a>
        <span v-else> 无 </span>
      </template>
      <template #timeRangeRender="{ row }">
        {{ row.startTime || '-' }} <br />
        ~ <br />
        {{ row.endTime || '-' }}
      </template>
      <template #action="{ row }">
        <TableAction :actions="createActions(row)"/>
      </template>
      <template #status="{row}">
        <Tag :color="row.status ? 'green' : 'red'">{{ row.status ? '启用' : '停用' }}</Tag>
      </template>
    </BasicTable>
    <BannerDrawer ref="bannerDrawerRef" @success="handleSuccess" />
  </Page>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import type {Recordable} from '@vben/types';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {VxeGridProps} from '#/adapter/vxe-table';

  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {TableAction} from '#/components/table-action';
  import { columns, searchFormSchema } from './banner.data';
  import {Button, message, Image, Tag} from 'ant-design-vue';
  import { getBannerListByPage, deleteByIds } from '#/api/portal/cms/banner';
  import BannerDrawer from './BannerDrawer.vue';
  import { EmpInfo } from '#/views/components/EmpInfo';
  import { getAllBoard } from '#/api/portal/cms/board';
  import { PerEnum } from '#/enums/perEnum';
  import {Page} from '@vben/common-ui';

  const PerPrefix = 'Banner:';

  const publishBoardList = ref<any>([]);
  const publishBoardSnMap = ref<any>(new Map());
  const bannerDrawerRef = ref();

  const formOptions: VbenFormProps = {
    showCollapseButton: false,
    submitOnEnter: true,
    commonConfig: {
      labelWidth: 70,
    },
    wrapperClass: 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
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
          return await getBannerListByPage({
            query: {
              pageNum: page.currentPage,
              pageSize: page.pageSize,
            },
            entity: formValues || {},
          });
        },
      },
    },
    showOverflow: false,
  };

  const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

  onMounted(async() => {
    const res = await getAllBoard({type: 3});
    publishBoardList.value = res;

    res.forEach((item: any) => {
      publishBoardSnMap.value.set(item.sn, item);
    });

  });
  function createActions(record: Recordable<any>) {
    return [
      {
        auth: [PerPrefix + PerEnum.UPDATE],
        tooltip: '修改',
        icon: 'ant-design:form-outlined',
        onClick: handleEdit.bind(null, record),
      },
      {
        auth: [PerPrefix + PerEnum.DELETE],
        tooltip: '删除',
        icon: 'ant-design:delete-outlined',
        danger: true,
        popConfirm: {
          title: '是否确认删除',
          placement: 'left',
          confirm: handleDelete.bind(null, record),
          okButtonProps: { danger: true },
        },
      },
    ];
  }
  function handleCreate() {
    bannerDrawerRef.value.setData({});
    bannerDrawerRef.value.open();
    bannerDrawerRef.value.setState({
      title: '编辑'
    });
  }

  function handleEdit(record: Recordable) {
    bannerDrawerRef.value.setData(record);
    bannerDrawerRef.value.open();
    bannerDrawerRef.value.setState({
      title: '编辑'
    });
  }

  async function handleDelete(record: Recordable<any>) {
    const {success, msg} = await deleteByIds([record.id]);
    if(success){
      message.success(msg);
      tableApi.reload();
    }else {
      message.error(msg);
    }
  }

  function handleSuccess() {
    tableApi.reload();
  }
</script>

<style lang="scss">
  .banner-list-preview {
    width: 100%;
    height: 100px;
    overflow: hidden;
    display: block;
    position: relative;
    border: 1px dotted #536dfe;
    white-space: nowrap;
    word-break: keep-all;

    .vben-basic-table-img {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover; //重要
      .ant-image {
        width: auto !important;
      }
    }

    .banner-title {
      position: absolute;
      top: 67px;
      background: rgba(0, 0, 0, 0.2);
      width: inherit;
      text-align: left;
      padding: 5px;
      color: white;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
