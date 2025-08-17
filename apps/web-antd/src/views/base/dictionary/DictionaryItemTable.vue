<template>
  <div class="bg-card overflow-hidden dictionary h-full">
    <BasicTable table-title="字典项" >
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix+PerEnum.ADD" :disabled="dictId === ''" type="primary" @click="handleCreate">新增</Button>
      </template>
      <template #action="{ row }">
        <TableAction :actions="createActions(row)" />
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
  import { TableAction } from '#/components/table-action';
  import {useVbenVxeGrid} from "#/adapter/vxe-table";
  import {Button, message} from 'ant-design-vue';
  import { dictionaryItemPageList, deleteItemByIds } from '#/api/base/dictionary';
  import { itemColumns, dictionaryItemSearchFormSchema } from './dictionary.data';
  import DictionaryItemModal from './DictionaryItemModal.vue';

  const PerPrefix = 'Dictionary:';
  const dictId = ref<string>('');

  const dictionaryItemModalRef = ref();

  const formOptions: VbenFormProps = {
    showCollapseButton: false,
    submitOnEnter: true,
    commonConfig: {
      labelWidth: 60,
    },
    wrapperClass: 'grid grid-cols-1 md:grid-cols-2',
    actionWrapperClass: 'pl-2 !justify-end md:!justify-start',
    actionPosition: 'left',
    actionLayout: 'inline',
    resetButtonOptions: {
      show: false,
    },
    schema: dictionaryItemSearchFormSchema,
  };

  const gridOptions: VxeGridProps = {
    columns: itemColumns,
    columnConfig: {resizable: true},
    height: 'auto',
    keepSource: true,
    border: false,
    stripe: true,
    proxyConfig: {
      ajax: {
        query: async ({page}, formValues) => {
          formValues.mainId = dictId.value;
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
    dictionaryItemModalRef.value.setData({ mainId: dictId.value });
    dictionaryItemModalRef.value.setState({
      title: '新增字典项'
    });
    dictionaryItemModalRef.value.open();
  }

  function filterByDict(param) {
    dictId.value = param;
    tableApi.reload();
  }

  function createActions(record: Recordable<any>) {
    return [
      {
        auth: [PerPrefix + PerEnum.UPDATE],
        tooltip: '修改字典项',
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
          confirm: handleDelete.bind(null, record),
          placement: 'left',
          okButtonProps: {
            danger: true
          }
        },
      },
    ];
  }

  function cleanTableData() {
    tableApi.grid.clearData();
    dictId.value = '';
  }

  function handleEdit(record: Recordable<any>) {
    dictionaryItemModalRef.value.setData(record);
    dictionaryItemModalRef.value.setState({ title: '修改字典项' });
    dictionaryItemModalRef.value.open();
  }

  async function handleDelete(record: Recordable<any>) {
    try {
      const {success, msg} = await deleteItemByIds(record.id);
      if (success) {
        message.success(msg);
        tableApi.reload();
      } else {
        message.error(msg);
      }
    } catch (e) {
      console.error(e);
    }
  }

  function handleSuccess() {
    tableApi.reload();
  }

  defineExpose({ filterByDict, cleanTableData });
</script>

<style lang="scss">
  .dictionary {
    .vben-basic-table-form-container {
      padding: 0;

      .vben-basic-form {
        margin-bottom: 0;
      }
    }
  }
</style>
