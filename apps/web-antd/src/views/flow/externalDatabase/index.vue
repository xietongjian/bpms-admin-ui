<script lang="ts" setup>
import { ref } from 'vue';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';
import { useVbenModal } from '@vben/common-ui';
import { Page } from '@vben/common-ui';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { message } from 'ant-design-vue';
import { databaseSearchFormSchema, externalDatabaseColumns, externalDatabaseFormSchema } from './externalDatabase.data';
import { pagerExternalDatabase, deleteExternalDatabaseById, saveOrUpdateExternalDatabase } from '#/api/flow/externalDatabase';
import { useVbenForm } from '@vben/common-ui';

const [Form, formApi] = useVbenForm({
  commonConfig: { labelWidth: 100 },
  schema: externalDatabaseFormSchema,
});

const [Modal, modalApi] = useVbenModal({
  showCancelButton: false,
  showConfirmButton: true,
  confirmText: '确定',
  onOpenChange: async (isOpen) => {
    if (isOpen) {
      const data = modalApi.getData<{ isUpdate: boolean; record: any }>();
      await formApi.resetForm();
      if (data?.record) {
        formApi.setValues(data.record);
      }
    }
  },
  onConfirm: async () => {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = formApi.getValues();
    modalApi.setState({ confirmLoading: true });
    try {
      const { success, msg } = await saveOrUpdateExternalDatabase(values);
      if (success) {
        message.success(msg);
        modalApi.close();
        reloadGrid();
      } else {
        message.error(msg);
      }
    } finally {
      modalApi.setState({ confirmLoading: false });
    }
  },
});

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: { labelWidth: 60 },
  wrapperClass: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  actionWrapperClass: 'pl-2',
  schema: databaseSearchFormSchema,
};

let reloadGrid: () => void;

const gridOptions: VxeGridProps = {
  columns: externalDatabaseColumns,
  columnConfig: { resizable: true },
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  showOverflow: false,
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await pagerExternalDatabase({
          ...formValues,
          pageNum: page.currentPage,
          pageSize: page.pageSize,
        });
      },
    },
  },
};

const [BasicTable, { reload }] = useVbenVxeGrid({ formOptions, gridOptions });
reloadGrid = reload;

function handleCreate() {
  modalApi.setData({ isUpdate: false, record: null });
  modalApi.open();
}

function handleEdit(record: any) {
  modalApi.setData({ isUpdate: true, record });
  modalApi.open();
}

async function handleDelete(record: any) {
  await deleteExternalDatabaseById(record.id);
  await reload();
}
</script>

<template>
  <Page auto-content-height>
    <BasicTable table-title="外部数据库列表" @create="handleCreate">
      <template #action="{ row }">
        <VbenTableAction
          :actions="[
            { label: '编辑', icon: 'clarity:note-edit-line', onClick: () => handleEdit(row) },
            {
              label: '删除',
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: { title: '是否确认删除', confirm: () => handleDelete(row) },
            },
          ]"
        />
      </template>
    </BasicTable>
    <Modal>
      <Form />
    </Modal>
  </Page>
</template>
