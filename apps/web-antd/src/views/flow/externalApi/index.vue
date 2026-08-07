<script lang="ts" setup>
import { ref } from 'vue';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';
import { useVbenModal } from '@vben/common-ui';
import { Page } from '@vben/common-ui';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { useVbenForm } from '@vben/common-ui';
import { message } from 'ant-design-vue';
import { pagerExternalApi, deleteExternalApi, saveOrUpdateExternalApi } from '#/api/flow/externalApi';

const [Form, formApi] = useVbenForm({
  commonConfig: { labelWidth: 100 },
  schema: [
    { component: 'Input', fieldName: 'id', componentProps: { hidden: true } },
    { component: 'Input', fieldName: 'name', label: '接口名称', rules: 'required' },
    { component: 'Input', fieldName: 'code', label: '接口编码', rules: 'required' },
    { component: 'Select', fieldName: 'method', label: '请求方式', rules: 'required',
      componentProps: { options: [{ label: 'GET', value: 'GET' }, { label: 'POST', value: 'POST' }, { label: 'PUT', value: 'PUT' }, { label: 'DELETE', value: 'DELETE' }] },
    },
    { component: 'Input', fieldName: 'url', label: '接口地址', rules: 'required' },
    { component: 'Textarea', fieldName: 'description', label: '描述', componentProps: { rows: 3 } },
  ],
});

const [Modal, modalApi] = useVbenModal({
  showCancelButton: false, showConfirmButton: true, confirmText: '确定',
  onOpenChange: async (isOpen) => {
    if (isOpen) {
      const data = modalApi.getData<{ isUpdate: boolean; record: any }>();
      await formApi.resetForm();
      if (data?.record) formApi.setValues(data.record);
    }
  },
  onConfirm: async () => {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = formApi.getValues();
    modalApi.setState({ confirmLoading: true });
    try {
      const { success, msg } = await saveOrUpdateExternalApi(values);
      if (success) { message.success(msg); modalApi.close(); reloadGrid(); }
      else message.error(msg);
    } finally { modalApi.setState({ confirmLoading: false }); }
  },
});

const formOptions: VbenFormProps = {
  showCollapseButton: false, submitOnEnter: true, commonConfig: { labelWidth: 60 },
  wrapperClass: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3', actionWrapperClass: 'pl-2',
  schema: [
    { component: 'Input', fieldName: 'keyword', label: '关键字', componentProps: { placeholder: '请输入关键字', allowClear: true } },
    { component: 'Select', fieldName: 'method', label: '请求方式', componentProps: { options: [{ label: '全部', value: '' }, { label: 'GET', value: 'GET' }, { label: 'POST', value: 'POST' }, { label: 'PUT', value: 'PUT' }, { label: 'DELETE', value: 'DELETE' }], allowClear: true } },
  ],
};

const gridOptions: VxeGridProps = {
  columns: [
    { type: 'seq', width: 60, align: 'center' },
    { field: 'name', title: '接口名称', align: 'left', minWidth: 150 },
    { field: 'code', title: '接口编码', align: 'left', width: 120 },
    { field: 'url', title: '接口地址', align: 'left', minWidth: 200 },
    { field: 'method', title: '请求方式', align: 'center', width: 100 },
    { field: 'description', title: '描述', align: 'left', minWidth: 150 },
    { field: 'createTime', title: '创建时间', width: 180, align: 'center' },
    { cellRender: { name: 'VbenTableAction' }, field: 'action', fixed: 'right', title: '操作', width: 140 },
  ],
  columnConfig: { resizable: true }, height: 'auto', keepSource: true, border: false, stripe: true, showOverflow: false,
  proxyConfig: { ajax: { query: async ({ page }, formValues) => await pagerExternalApi({ ...formValues, pageSize: page.pageSize, pageNum: page.currentPage }) } },
};
const [BasicTable, { reload }] = useVbenVxeGrid({ formOptions, gridOptions });
let reloadGrid = reload;

function handleCreate() { modalApi.setData({ isUpdate: false, record: null }); modalApi.open(); }
function handleEdit(record: any) { modalApi.setData({ isUpdate: true, record }); modalApi.open(); }
async function handleDelete(record: any) { await deleteExternalApi(record.id); await reloadGrid(); }
</script>

<template>
  <Page auto-content-height>
    <BasicTable table-title="外部接口管理" @create="handleCreate">
      <template #action="{ row }">
        <VbenTableAction :actions="[
          { label: '编辑', icon: 'clarity:note-edit-line', onClick: () => handleEdit(row) },
          { label: '删除', icon: 'ant-design:delete-outlined', color: 'error', popConfirm: { title: '是否确认删除', confirm: () => handleDelete(row) } },
        ]" />
      </template>
    </BasicTable>
    <Modal><Form /></Modal>
  </Page>
</template>
