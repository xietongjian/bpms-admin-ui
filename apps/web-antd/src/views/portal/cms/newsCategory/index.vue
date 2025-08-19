<template>
  <Page auto-content-height>
    <BasicTable>
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix + PerEnum.ADD" type="primary" @click="handleCreate"> 新增</Button>
      </template>
      <template #action="{row}">
        <TableAction :actions="createActions(row)" />
      </template>
      <template #status="{row}">
        <Tag :color="row.status ? 'green' : 'red'">{{ row.status ? '启用' : '停用' }}</Tag>
      </template>
      <template #name="{ row }">
        <span class="size-5 inline-block" :style="{background: row.style}">
          &nbsp;
        </span>
        &nbsp;
        <span>{{row.name}}</span>
      </template>

      <!--
      <template #createdByRender="{ record }">
        <EmpInfo :no="record.createdByNo" :name="record.createdBy" />
      </template>
      <template #updatedByRender="{ record }">
        <EmpInfo :no="record.updatedByNo" :name="record.updatedBy" />
      </template>-->
    </BasicTable>
    <NewsCategoryModal ref="newsCategoryModalRef" @success="handleSuccess" />
  </Page>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import type {Recordable} from '@vben/types';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {VxeGridProps} from '#/adapter/vxe-table';

  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {TableAction} from '#/components/table-action';
  import { columns, searchFormSchema } from './newsCategory.data';
  import NewsCategoryModal from './NewsCategoryModal.vue';
  import { deleteByIds, getAllNewsCategory } from '#/api/portal/cms/newsCategory';
  import { PerEnum } from '#/enums/perEnum';
  import {Button, message, Tag} from 'ant-design-vue';
  import {Page} from '@vben/common-ui';

  const PerPrefix = 'NewsCategory:';
  const newsCategoryModalRef = ref();

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
        query: async ({}, formValues) => {
          return await getAllNewsCategory(formValues);
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
        ifShow: false,
      },
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
    newsCategoryModalRef.value.setData({});
    newsCategoryModalRef.value.open();
    newsCategoryModalRef.value.setState({
      title: '新建'
    });
  }

  function handleEdit(record: Recordable<any>) {
    newsCategoryModalRef.value.setData(record);
    newsCategoryModalRef.value.open();
    newsCategoryModalRef.value.setState({
      title: '编辑'
    });
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
  function handleCreateChild(record: Recordable<any>, e) {
    newsCategoryModalRef.value.setData({
      pid: record.id,
      status: true,
    });
    newsCategoryModalRef.value.open();
    newsCategoryModalRef.value.setState({
      title: '新增【' + record.name + '】的子分类'
    });
  }
</script>

