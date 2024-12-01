<script lang="ts" setup>
  import { PerEnum } from '#/enums/perEnum';
  import { ref, unref } from 'vue';
  import type {VxeGridProps} from '#/adapter/vxe-table';

  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import { getPagerModel, deleteById } from '#/api/org/positionInfo';
  // import PositionSeqTree from '#/views/components/leftTree/PositionSeqTree.vue';
  // import { useModal } from '@/components/Modal';
  import PositionInfoModal from './PositionInfoModal.vue';
  import {Button, Popconfirm, message} from 'ant-design-vue';
  import type {VbenFormProps} from '@vben/common-ui';
  import {Page, useVbenModal} from '@vben/common-ui';
  import {useAccess} from '@vben/access';
  import { TableAction } from '#/components/table-action';

  import { columns, searchFormSchema } from './positionInfo.data';
  import {listColumns} from "#/views/base/app/app.data";
  import type { Recordable } from '@vben/types';

  const PerPrefix = "PositionInfo:";
  const {hasAccessByCodes} = useAccess();

  // const [registerModal, { openModal, setModalProps }] = useModal();
  const currentTreeNode = ref<Recordable>({});

  /*const [registerTable, { reload, setProps }] = useTable({
    title: '列表',
    api: getPagerModel,
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
    showIndexColumn: false,
    actionColumn: {
      width: 100,
      title: '操作',
      dataIndex: 'action',
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
  };

  const gridOptions: VxeGridProps<any> = {
    checkboxConfig: {
      highlight: true,
      labelField: 'name',
    },
    columns: listColumns,
    columnConfig: {resizable: true},
    height: 'auto',
    keepSource: true,
    border: false,
    stripe: true,
    proxyConfig: {
      ajax: {
        query: async ({page}, formValues) => {
          return await getPagerModel({
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


  function handleCreate() {
    if (!unref(currentTreeNode).id) {
      createMessage.warning('请选择岗位序列！', 2);
      return;
    }
    setModalProps({ title: '新增岗位' });
    openModal(true, {
      record: {
        positionSeqId: unref(currentTreeNode).id,
        positionSeqCode: unref(currentTreeNode).code,
      },
      isUpdate: true,
    });
  }

  function handleEdit(record: Recordable) {
    setModalProps({ title: '修改岗位' });
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleDelete(record: Recordable) {
    deleteById([record.id]).then(() => {
      reload();
    });
  }

  function handleSuccess() {
    setTimeout(() => {
      handleSelect(currentTreeNode.value);
    }, 200);
  }

  function handleSelect(node: any) {
    currentTreeNode.value = node;
    let searchInfo = { positionSeqId: node ? node.id : '' };
    setProps({ searchInfo: searchInfo });
    reload({ searchInfo });
  }

  function createActions(record: Recordable) {
    return [
      {
        auth: 'PositionInfo:' + PerEnum.UPDATE,
        tooltip: '修改',
        icon: 'clarity:note-edit-line',
        onClick: handleEdit.bind(null, record),
      },
      {
        auth: 'PositionInfo:' + PerEnum.DELETE,
        tooltip: '删除',
        icon: 'ant-design:delete-outlined',
        color: 'error',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
          placement: 'left',
        },
      },
    ];
  }
</script>

<template>
  <Page auto-content-height>
    <PositionSeqTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5">
      <template #toolbar-tools>
        <Button v-if="hasAccessByCodes([PerPrefix + PerEnum.ADD])" type="primary" @click="handleCreate">新增</Button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
              :actions="createActions(record)"
          />
        </template>
      </template>
    </BasicTable>
    <PositionInfoModal @register="registerModal" @success="handleSuccess" />
  </Page>
</template>
