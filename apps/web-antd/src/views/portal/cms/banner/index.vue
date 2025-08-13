<template>
  <Page auto-content-height>
    <BasicTable>
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix + PerEnum.ADD" type="primary" @click="handleCreate"> 新增</Button>
      </template>
      <template #imgs="{ row }">
        <div class="banner-list-preview">
          <TableImg :showBadge="false" :simpleShow="true" :imgList="[row.imgPath]" />
          <div class="banner-title">
            <Tooltip placement="bottom">
              <template #title>
                <span>{{ row.title }}</span>
              </template>
              <a v-if="row.linkUrl" :href="row.linkUrl" target="_blank">
                {{ row.title }}
              </a>
              <span v-else>
                {{ row.title }}
              </span>
            </Tooltip>
          </div>
        </div>
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
        <TableAction
          :actions="createActions(row)"
        />
      </template>
      <template #createdByRender="{ row }">
        <EmpInfo :no="row.createdByNo" :name="row.createdBy" />
      </template>
      <template #updatedByRender="{ row }">
        <EmpInfo :no="row.updatedByNo" :name="row.updatedBy" />
      </template>
    </BasicTable>
    <BannerDrawer ref="bannerDrawerRef" />
  </Page>
</template>
<script lang="ts" setup>
  import { onMounted, ref, unref } from 'vue';
  import type {Recordable} from '@vben/types';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {VxeGridProps} from '#/adapter/vxe-table';

  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {TableAction} from '#/components/table-action';
  import { columns, searchFormSchema } from './banner.data';
  import { Button, Tooltip, message } from 'ant-design-vue';
  import { getBannerListByPage, deleteByIds } from '#/api/portal/cms/banner';
  import BannerDrawer from './BannerDrawer.vue';
  import { EmpInfo } from '#/views/components/EmpInfo';
  import { PerEnum } from '#/enums/perEnum';
  import {Page} from '@vben/common-ui';

  const PerPrefix = 'Banner:';
  const bannerDrawerRef = ref();

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
  };

  const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

  /*const [registerTable, { reload, getForm }] = useTable({
    title: '列表',
    api: getBannerListByPage,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      showAdvancedButton: false,
      showResetButton: false,
      autoSubmitOnEnter: true,
    },
    searchInfo: {
      // publishBoard: board
    },
    canColDrag: true,
    useSearchForm: true,
    bordered: false,
    showIndexColumn: false,
    actionColumn: {
      width: 100,
      title: '操作',
      field: 'action',
      slots: { customRender: 'action' },
      fixed: 'right',
    },
  });*/

  onMounted(() => {
    /*const { updateSchema } = getForm();
    updateSchema([
      {
        fieldName: 'publishBoard',
        componentProps: {
          onChange: (value, label, extra) => {
            reload({ searchInfo: { publishBoard: value } });
          },
        },
      },
    ]);*/
  });
  function createActions(record: Recordable<any>) {
    return [
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
  function handleCreate() {
    openBannerDrawer(true, {
      record: {
        // publishBoard: board
      },
      isUpdate: false,
    });
    /*openModal(true, {
      isUpdate: false,
    });
    setModalProps({
      width: 800
    });*/
  }

  function handleEdit(record: Recordable) {
    openBannerDrawer(true, { record, isUpdate: true });
    /*openModal(true, {
    record,
    isUpdate: true,
  });
  setModalProps({
    width: 800
  });*/
  }

  async function handleDelete(record: Recordable) {
    const {success, msg} = await deleteByIds([record.id]);
    if(success){
      message.success();
      tableApi.reload();
    }

  }

  function handleSuccess() {
    tableApi.reload();
  }
</script>

<style lang="less">
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
