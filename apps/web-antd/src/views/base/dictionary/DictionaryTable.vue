<template>
  <div class="bg-white overflow-hidden dictionary h-full">
    <BasicTable
      table-title="数据字典"
    >
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix+PerEnum.ADD" :disabled="dictTypeId === ''" type="primary" @click="handleCreate">新增</Button>
      </template>
      <template #action="{row}">
        <TableAction :actions="createActions(row)" />
      </template>
    </BasicTable>
    <DictionaryModal ref="dictionaryModalRef" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { ref, defineExpose } from 'vue';
  import type {VxeGridProps, VxeGridListeners} from '#/adapter/vxe-table';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {Recordable} from '@vben/types';
  import {TableAction} from '#/components/table-action';
  import { PerEnum } from '#/enums/perEnum';
  import { dictionaryPageList, deleteByIds } from '#/api/base/dictionary';
  import { columns, searchFormSchema } from './dictionary.data';
  import {Button, message} from 'ant-design-vue';
  import DictionaryModal from './DictionaryModal.vue';
  import {useVbenVxeGrid} from "#/adapter/vxe-table";

  const PerPrefix = "Dictionary:";
  const emit = defineEmits(['handleSelect']);

  const dictionaryModalRef = ref();
  const dictTypeId = ref<string>('');

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
    schema: searchFormSchema,
  };

  const gridOptions: VxeGridProps = {
    columns,
    columnConfig: {resizable: true},
    height: 'auto',
    radioConfig: {
      trigger: 'row',
      labelField: 'cname',
      highlight: true,
      strict: true,
    },
    keepSource: true,
    border: false,
    stripe: true,
    proxyConfig: {
      ajax: {
        query: async ({page}, formValues) => {
          formValues.dicTypeId = dictTypeId.value;
          return dictionaryPageList({
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

  const gridEvents: VxeGridListeners = {
    radioChange: ({row}) => {
      if (row) {
        emit('handleSelect', row.id);
      }
    }
  };

  const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions, gridEvents});

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
        onClick: handleDeleteStop.bind(null, row),
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, row),
          okButtonProps: {
            danger: true
          }
        },
      },
    ];
  }

  function handleCreate() {
    if (dictTypeId.value === '') {
      message.warning('请选择数据类型！', 2);
      return;
    }
    dictionaryModalRef.value.setData({ dicTypeId: dictTypeId.value });
    dictionaryModalRef.value.open();
    dictionaryModalRef.value.setState({
      title: '新增字典'
    });
  }

  function filterByDictType(typeId: string) {
    dictTypeId.value = typeId;
    tableApi.reload();
  }

  function cleanTableData() {
    dictTypeId.value = '';
    tableApi.reload();
  }

  function handleEdit(record: Recordable<any>, e) {
    e.stopPropagation();

    dictionaryModalRef.value.setData(record);
    dictionaryModalRef.value.open();
    dictionaryModalRef.value.setState({
      title: '修改字典'
    });
  }

  function handleDeleteStop(record: Recordable<any>, e) {
    e.stopPropagation();
  }

  async function handleDelete(record: Recordable<any>) {
    const {success, msg} = await deleteByIds(record.id);
    if (success) {
      message.success(msg);
      tableApi.reload();
    } else {
      message.error(msg);
    }
  }

  function handleSuccess() {
    setTimeout(() => {
      tableApi.reload();
    }, 200);
  }

  defineExpose({
    cleanTableData,
    filterByDictType,
  });
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
