<template>
  <Page auto-content-height>
    <BasicTable>
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix+PerEnum.ADD" type="primary" @click="handleCreate"> 新增</Button>
      </template>
      <template #action="{ row }">
        <TableAction :actions="createActions(row)" />
      </template>
      <template #ifDefault="{ row }">
        <Tag :color="row.ifDefault ? 'green' : 'default'">
          {{ row.ifDefault ? '是' : '否' }}
        </Tag>
      </template>
    </BasicTable>
    <AuthPointModal ref="authPointModalRef" @success="handleSuccess" />
  </Page>
</template>
<script lang="ts" setup>
  import {ref} from 'vue';
  import { PerEnum } from '#/enums/perEnum';
  import {Page} from '@vben/common-ui';
  import type {VxeGridProps} from '#/adapter/vxe-table';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {Recordable} from '@vben/types';
  import { columns, searchFormSchema } from './authPoint.data';
  import AuthPointModal from './AuthPointModal.vue';
  import { getAuthPointListByPage, deleteByIds } from '#/api/flowauth/authPoint';
  import {TableAction} from '#/components/table-action';
  import {useVbenVxeGrid} from "#/adapter/vxe-table";
  import {Button, message} from 'ant-design-vue';
  import {Tag} from 'ant-design-vue';

  const PerPrefix = 'AuthPoint:';
  const authPointModalRef = ref();

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

  const gridOptions: VxeGridProps<any> = {
    columns,
    columnConfig: {resizable: true},
    height: 'auto',
    keepSource: true,
    border: false,
    stripe: true,
    proxyConfig: {
      ajax: {
        query: async ({page}, formValues) => {
          return await getAuthPointListByPage({
            query: {
              pageNum: page.currentPage,
              pageSize: page.pageSize,
            },
            entity: formValues || {},
          }).then(res => {
            return Promise.resolve(res);
          });
        },
      },
    },
  };

  const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

  function createActions(row: Recordable<any>) {
    return [
      {
        auth: [PerPrefix + PerEnum.UPDATE],
        tooltip: '修改',
        icon: 'clarity:note-edit-line',
        onClick: handleEdit.bind(null, row),
      },
      {
        auth: [PerPrefix + PerEnum.DELETE],
        tooltip: '删除',
        icon: 'ant-design:delete-outlined',
        danger: true,
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, row),
          placement: 'left',
          okButtonProps: {
            danger: true,
          }
        },
      },
    ];
  }

  function handleCreate() {
    authPointModalRef.value.setData({});
    authPointModalRef.value.open();
    authPointModalRef.value.setState({
      title: '新建'
    });
  }

  function handleEdit(record: Recordable<any>) {
    authPointModalRef.value.setData(record);
    authPointModalRef.value.open();
    authPointModalRef.value.setState({
      title: '新建'
    });
  }

  async function handleDelete(record: Recordable<any>) {
    const {success, msg} = await deleteByIds({ id: record.id });
    if (success) {
      message.success(msg, 0.5, () => tableApi.reload());
    } else {
      message.error(msg);
    }
  }

  function handleSuccess() {
    tableApi.reload();
  }
</script>
