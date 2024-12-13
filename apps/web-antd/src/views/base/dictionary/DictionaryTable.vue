<template>
  <div class="bg-white overflow-hidden dictionary">
    <BasicTable
      @register="registerTable"
      @row-click="clickDictionary"
      @selection-change="changeDictionary"
    >
      <template #toolbar>
        <Authority :value="'Dictionary:' + PerEnum.ADD">
          <a-button v-if="dictTypeId !== ''" type="primary" @click="handleCreate">新增</a-button>
        </Authority>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'Dictionary:' + PerEnum.UPDATE,
                tooltip: '修改',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                auth: 'Dictionary:' + PerEnum.DELETE,
                tooltip: '删除',
                icon: 'ant-design:delete-outlined',
                color: 'error',
                onClick: handleDeleteStop.bind(null, record),
                popConfirm: {
                  title: '是否确认删除',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <DictionaryModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { ref, defineExpose } from 'vue';
  import { PerEnum } from '@/enums/perEnum';
  import { Authority } from '@/components/Authority';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { dictionaryPageList, deleteByIds } from '#/api/base/dictionary';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useModal } from '@/components/Modal';

  import { columns, searchFormSchema } from './dictionary.data';

  import DictionaryModal from './DictionaryModal.vue';

  const { createMessage } = useMessage();

  const emit = defineEmits(['handleSelect']);

  const [registerModal, { openModal, setModalProps }] = useModal();
  const dictTypeId = ref<string>('');
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
    });

  function handleCreate() {
    if (dictTypeId.value === '') {
      createMessage.warning('请选择数据类型！', 2);
      return;
    }
    setModalProps({ title: '新增字典' });
    openModal(true, {
      record: { dicTypeId: dictTypeId.value },
      isUpdate: false,
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

  function handleEdit(record: Recordable, e) {
    e.stopPropagation();
    setModalProps({ title: '修改字典' });
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleDeleteStop(record: Recordable, e) {
    e.stopPropagation();
  }

  function handleDelete(record: Recordable) {
    deleteByIds(record.id).then(() => {
      reload();
    });
  }

  function handleSuccess() {
    setTimeout(() => {
      reload();
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
