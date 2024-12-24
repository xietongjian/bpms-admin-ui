<template>
  <Page auto-content-height>
    <BasicTable>
      <template #toolbar-tools>
        <Button v-if="hasAccessByCodes([PerPrefix+PerEnum.ADD])" type="primary" @click="handleCreate"> 新增</Button>
      </template>
      <template #action="{ row }">
        <TableAction :actions="createActions(row)" />
      </template>
    </BasicTable>
    <AuthPointModal ref="authPointModalRef" @success="handleSuccess" />
  </Page>
</template>
<script lang="ts" setup>
  import {ref} from 'vue';
  import { PerEnum } from '#/enums/perEnum';
  import {Page} from '@vben/common-ui';
  import {useAccess} from '@vben/access';
  import type {VxeGridProps} from '#/adapter/vxe-table';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {Recordable} from '@vben/types';
  import { columns, searchFormSchema } from './authPoint.data';
  import AuthPointModal from './AuthPointModal.vue';
  import { getAuthPointListByPage, deleteByIds } from '#/api/flowauth/authPoint';
  import {TableAction} from '#/components/table-action';
  import {getAccountPageList} from "#/api/privilege/account";
  import {useVbenVxeGrid} from "#/adapter/vxe-table";
  import {Button, message} from 'ant-design-vue';

  const PerPrefix = 'AuthPoint:';

  const {hasAccessByCodes} = useAccess();

  const authPointModalRef = ref();
  // const [registerModal, { openModal }] = useModal();

  /*const [registerTable, { reload }] = useTable({
    title: '列表',
    api: getAuthPointListByPage,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      showAdvancedButton: false,
      showResetButton: false,
      autoSubmitOnEnter: true,
    },
    canColDrag: true,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: true,
    actionColumn: {
      width: 100,
      title: '操作',
      dataIndex: 'action',
      fixed: false,
    },
  });*/

  const formOptions: VbenFormProps = {
    showCollapseButton: false,
    submitOnEnter: true,
    commonConfig: {
      labelWidth: 60,
    },
    actionWrapperClass: 'col-span-2 col-start-2 text-left ml-4',
    resetButtonOptions: {
      show: false,
    },
    schema: searchFormSchema,
    wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
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
            danager: true,
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

  function handleDelete(record: Recordable<any>) {
    deleteByIds({ id: record.id }).then(() => {
      tableApi.reload();
    });
  }

  function handleSuccess() {
    setTimeout(() => {
      tableApi.reload();
    }, 200);
  }
</script>
