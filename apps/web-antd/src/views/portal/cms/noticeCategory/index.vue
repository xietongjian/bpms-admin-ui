<template>
  <Page auto-content-height>
    <BasicTable >
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix + PerEnum.ADD" type="primary" @click="handleCreate"> 新增 </Button>
      </template>
      <template #action="{row}">
        <TableAction :actions="createActions(row)" />
      </template>
      <template #status="{row}">
        <Tag :color="row.status ? 'green' : 'red'">{{ row.status ? '启用' : '停用' }}</Tag>
      </template>
      <template #signerNameRender="{ row }">
        <EmpInfo :no="row.signerNo" :name="row.signerName" />
      </template>
<!--
      <template #createdByRender="{ row }">
        <EmpInfo :no="row.createdByNo" :name="row.createdBy" />
      </template>-->
      <template #nameRender="{ row }">
        <span class="color-block" :style="{ background: row.style }"> &nbsp; </span>
        &nbsp;
        <span>{{ row.name }}</span>
      </template>
<!--      <template #updatedByRender="{ row }">
        <EmpInfo :no="row.updatedByNo" :name="row.updatedBy" />
      </template>-->
    </BasicTable>
    <NoticeCategoryModal ref="noticeCategoryModalRef" @success="handleSuccess" />
  </Page>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import type {Recordable} from '@vben/types';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {VxeGridProps} from '#/adapter/vxe-table';

  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {TableAction} from '#/components/table-action';
  import { columns, searchFormSchema } from './noticeCategory.data';
  import NoticeCategoryModal from './NoticeCategoryModal.vue';
  import { getNoticeCategoriesData, deleteByIds } from '#/api/portal/cms/noticeCategory';
  import { EmpInfo } from '#/views/components/EmpInfo';
  import { findPath, findPathAll } from '#/utils/helper/treeHelper';
  import { PerEnum } from '#/enums/perEnum';
  import {Button, message, Tag} from 'ant-design-vue';
  import {Page} from '@vben/common-ui';

  const PerPrefix = 'NoticeCategory:';

  const noticeCategoryModalRef = ref();

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
    pagerConfig: {
      enabled: false,
    },
    treeConfig: {
      parentField: 'pid',
      rowField: 'id',
      transform: true,
    },
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
          return await getNoticeCategoriesData(formValues);
        },
      },
    },
  };

  const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

  function createActions(record: Recordable<any>) {
    return [
      {
        auth: [PerPrefix + PerEnum.ADD],
        tooltip: '添加子分类',
        icon: 'ant-design:plus-outlined',
        onClick: handleCreateChild.bind(null, record),
        // ifShow: handleAddChildBtnIfShow.bind(null, record),
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
    noticeCategoryModalRef.value.setData({});
    noticeCategoryModalRef.value.open();
    noticeCategoryModalRef.value.setState({
      title: '新建分类',
    });
  }

  function handleEdit(record: Recordable<any>) {
    noticeCategoryModalRef.value.setData(record);
    noticeCategoryModalRef.value.open();
    noticeCategoryModalRef.value.setState({
      title: '修改分类',
    });
  }

  async function handleDelete(record: Recordable<any>) {
    const {success, msg} = await deleteByIds([record.id]);
    if(success){
      message.success(msg);
      tableApi.reload();
    }
  }

  function handleAddChildBtnIfShow(record: Recordable<any>) {
    const path = findPath(
        tableApi.grid.getFullData(),
        (node) => {
          return node.id === record.id;
        },
        { id: 'id', children: 'children', pid: 'pid' },
    );
    return path.length <= 2;
  }

  function handleSuccess() {
    tableApi.reload();
  }

  function handleCreateChild(record: Recordable<any>, e) {
    noticeCategoryModalRef.value.setData({
      pid: record.id,
      frontShow: 1,
      status: true,
    });
    noticeCategoryModalRef.value.open();
    noticeCategoryModalRef.value.setState({
      title: '新增【' + record.name + '】的子分类',
    });
  }
</script>

<style lang="less" scoped>
  .color-block {
    width: 20px;
    height: 20px;
    display: inline-block;
  }
</style>
