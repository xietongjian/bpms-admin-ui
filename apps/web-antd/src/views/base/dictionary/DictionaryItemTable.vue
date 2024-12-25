<template>
  <div class="bg-card overflow-hidden dictionary h-full">
    <BasicTable >
      <template #toolbar>
        <Authority :value="'Dictionary:' + PerEnum.ADD">
          <Button v-if="dictId !== ''" type="primary" @click="handleCreate">新增</Button>
        </Authority>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'Dictionary:' + PerEnum.UPDATE,
                tooltip: '修改字典项',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                auth: 'Dictionary:' + PerEnum.DELETE,
                tooltip: '删除',
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  confirm: handleDelete.bind(null, record),
                  placement: 'left',
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <DictionaryItemModal ref="dictionaryItemModalRef" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { ref, defineExpose } from 'vue';
  import { PerEnum } from '#/enums/perEnum';
  import type {VxeGridProps} from '#/adapter/vxe-table';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {Recordable} from '@vben/types';
  import {TableAction} from '#/components/table-action';
  import {useVbenVxeGrid} from "#/adapter/vxe-table";
  import {Button, message} from 'ant-design-vue';

  import { dictionaryItemPageList, deleteItemByIds } from '#/api/base/dictionary';

  import { itemColumns, dictionaryItemSearchFormSchema } from './dictionary.data';
  import DictionaryItemModal from './DictionaryItemModal.vue';

  const dictId = ref<string>('');

  const dictionaryItemModalRef = ref();

 /* const [registerModal, { openModal, setModalProps }] = useModal();
  const [registerTable, { reload, setProps, setTableData }] = useTable({
    title: '字典项列表',
    api: dictionaryItemPageList,
    columns: itemColumns,
    formConfig: {
      labelWidth: 120,
      schemas: dictionaryItemSearchFormSchema,
      showAdvancedButton: false,
      showResetButton: false,
      autoSubmitOnEnter: true,
    },
    immediate: false,
    useSearchForm: true,
    showIndexColumn: false,
    showTableSetting: false,
    bordered: true,
    actionColumn: {
      width: 80,
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
    wrapperClass: 'grid-cols-2',
    actionWrapperClass: 'col-start-2 text-left ml-4',
    resetButtonOptions: {
      show: false,
    },
    schema: dictionaryItemSearchFormSchema,
  };

  const gridOptions: VxeGridProps<any> = {
    columns: itemColumns,
    columnConfig: {resizable: true},
    height: 'auto',
    keepSource: true,
    border: false,
    stripe: true,
    proxyConfig: {
      ajax: {
        query: async ({page}, formValues) => {
          return dictionaryItemPageList({
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
    if (dictId.value === '') {
      message.warning('请选择数据字典！', 2);
      return;
    }
    setModalProps({ title: '新增字典项' });
    openModal(true, {
      record: { mainId: dictId.value },
      isUpdate: false,
    });
  }

  function filterByDict(param) {
    dictId.value = param;
    setProps({ searchInfo: { mainId: dictId.value } });
    tableApi.reload({ page: 1 });
  }

  function cleanTableData() {
    setTableData([]);
    dictId.value = '';
  }

  function handleEdit(record: Recordable<any>) {
    setModalProps({ title: '修改字典项' });
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleDelete(record: Recordable<any>) {
    deleteItemByIds(record.id).then(() => {
      tableApi.reload();
    });
  }

  function handleSuccess() {
    tableApi.reload();
  }

  defineExpose({ filterByDict, cleanTableData });
</script>

<style lang="less">
  .dictionary {
    .vben-basic-table-form-container {
      padding: 0;

      .vben-basic-form {
        margin-bottom: 0;
      }
    }
  }
</style>
