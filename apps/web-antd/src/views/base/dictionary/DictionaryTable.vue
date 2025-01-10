<template>
  <div class="bg-white overflow-hidden dictionary h-full">
    <BasicTable
      @row-click="clickDictionary"
      @selection-change="changeDictionary"
    >
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix+PerEnum.ADD" v-if="dictTypeId !== ''" type="primary" @click="handleCreate">新增</Button>
      </template>
      <template #action="{row}">
        <TableAction
            :actions="createActions(row)"
        />
      </template>
    </BasicTable>
    <DictionaryModal ref="dictionaryModalRef" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { ref, defineExpose } from 'vue';
  import type {VxeGridProps} from '#/adapter/vxe-table';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {Recordable} from '@vben/types';
  import {TableAction} from '#/components/table-action';

  import { PerEnum } from '#/enums/perEnum';
  import { dictionaryPageList, deleteByIds } from '#/api/base/dictionary';

  import { useAccess } from '@vben/access';

  import { columns, searchFormSchema } from './dictionary.data';
  import {Button, Space, Image, Tag, message} from 'ant-design-vue';

  import DictionaryModal from './DictionaryModal.vue';
  import {useVbenVxeGrid} from "#/adapter/vxe-table";

  const PerPrefix = "Group:";
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

  const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});


  function createActions(row: Recordable<any>) {
    return [
      {
        auth: 'Dictionary:' + PerEnum.UPDATE,
        tooltip: '修改',
        icon: 'clarity:note-edit-line',
        onClick: handleEdit.bind(null, row),
      },
      {
        auth: 'Dictionary:' + PerEnum.DELETE,
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

  /*const [registerModal, { openModal, setModalProps }] = useModal();

  const [registerTable, { reload, setProps, setTableData, getSelectRows, setSelectedRowKeys }] =
    useTable({
      title: '数据字典列表',
      api: dictionaryPageList,
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
        showAdvancedButton: false,
        showResetButton: false,
        autoSubmitOnEnter: true,
      },
      immediate: false,
      clickToRowSelect: true,
      rowSelection: { type: 'radio', columnWidth: 40 },
      useSearchForm: true,
      showIndexColumn: false,
      showTableSetting: false,
      bordered: true,
      rowKey: 'id',
      actionColumn: {
        width: 80,
        title: '操作',
        dataIndex: 'action',
      },
    });*/

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

  function filterByDictType(typeId) {
    dictTypeId.value = typeId;
    setProps({ searchInfo: { dicTypeId: typeId } });
    reload({ page: 1 });
  }

  function cleanTableData() {
    setTableData([]);
    dictTypeId.value = '';
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

  function handleDelete(record: Recordable<any>) {
    deleteByIds(record.id).then(() => {
      tableApi.reload();
    });
  }

  function handleSuccess() {
    setTimeout(() => {
      tableApi.reload();
    }, 200);
  }

  function clickDictionary(e) {
    const selectedRows = getSelectRows();
    emit('handleSelect', selectedRows[0]?.id);
  }

  function changeDictionary({ keys, rows }) {
    if (rows && rows.length > 0) {
      emit('handleSelect', rows[0].id);
    }
  }

  defineExpose({
    cleanTableData,
    filterByDictType,
  });
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
