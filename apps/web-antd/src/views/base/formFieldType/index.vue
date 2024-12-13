<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <Authority :value="'App:' + PerEnum.ADD">
          <a-button type="primary" @click="handleCreate">新增</a-button>
        </Authority>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'App:' + PerEnum.UPDATE,
                tooltip: '修改',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <FormFieldTypeModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { PerEnum } from '@/enums/perEnum';
  import { Authority } from '@/components/Authority';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getListByPage } from '#/api/base/formFieldType';
  import { columns, searchFormSchema } from './formFieldType.data';
  import FormFieldTypeModal from './FormFieldTypeModal.vue';
  import { useModal } from '@/components/Modal';

  const [registerModal, { openModal }] = useModal();

  const [registerTable, { reload }] = useTable({
    title: '列表',
    titleHelpMessage: '自定义表单控件存储在数据库对应的数据类型',
    api: getListByPage,
    columns,
    formConfig: {
      labelWidth: 100,
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
    },
  });

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleSuccess() {
    setTimeout(() => {
      reload();
    }, 200);
  }
</script>
