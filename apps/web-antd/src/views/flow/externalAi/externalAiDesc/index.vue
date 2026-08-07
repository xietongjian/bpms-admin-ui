<script lang="ts" setup>
import { ref } from 'vue';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';
import { useVbenModal } from '@vben/common-ui';
import { ColPage } from '@vben/common-ui';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { message } from 'ant-design-vue';
import { externalAiDescSearchFormSchema, externalAiDescColumns, externalAiDescFormSchema } from './externalAiDesc.data';
import { pageListFlowNodeDetail, deleteFlowNodeDetail, saveOrUpdateFlowNodeDetail } from '#/api/flow/externalAi';
import { useVbenForm } from '@vben/common-ui';
import FlowNodeTree from './FlowNodeTree.vue';

const currentNode = ref<any>({});

const [Form, formApi] = useVbenForm({ commonConfig: { labelWidth: 100 }, schema: externalAiDescFormSchema });

const [Modal, modalApi] = useVbenModal({
  showCancelButton: false, showConfirmButton: true, confirmText: '确定',
  onOpenChange: async (isOpen) => {
    if (isOpen) {
      const data = modalApi.getData<{ isUpdate: boolean; record: any }>();
      await formApi.resetForm();
      if (data?.record && Object.keys(data.record).length > 0) {
        formApi.setValues(data.record);
      } else if (currentNode.value?.nodeType === 'type') {
        formApi.setValues({ typeId: currentNode.value.id });
      } else if (currentNode.value?.nodeType === 'node') {
        formApi.setValues({ nodeId: currentNode.value.id });
      }
    }
  },
  onConfirm: async () => {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = formApi.getValues();
    modalApi.setState({ confirmLoading: true });
    try {
      const { success, msg } = await saveOrUpdateFlowNodeDetail(values);
      if (success) { message.success(msg); modalApi.close(); reloadData(); }
      else message.error(msg);
    } finally { modalApi.setState({ confirmLoading: false }); }
  },
});

const formOptions: VbenFormProps = {
  showCollapseButton: false, submitOnEnter: true, commonConfig: { labelWidth: 60 },
  wrapperClass: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3', actionWrapperClass: 'pl-2',
  schema: externalAiDescSearchFormSchema,
};

const gridOptions: VxeGridProps = {
  columns: externalAiDescColumns, columnConfig: { resizable: true }, height: 'auto',
  keepSource: true, border: false, stripe: true, showOverflow: false,
  proxyConfig: { ajax: { query: async ({ page }, formValues) => {
    const params: any = { ...formValues, pageSize: page.pageSize, pageNum: page.currentPage };
    if (currentNode.value?.nodeType === 'type') params.typeId = currentNode.value.id;
    else if (currentNode.value?.nodeType === 'node') params.nodeId = currentNode.value.id;
    return await pageListFlowNodeDetail(params);
  } } },
};
const [BasicTable, { reload }] = useVbenVxeGrid({ formOptions, gridOptions });

function reloadData() {
  reload();
}

function handleCreate() {
  modalApi.setData({ isUpdate: false, record: {} });
  modalApi.open();
}

function handleEdit(record: any) {
  modalApi.setData({ isUpdate: true, record });
  modalApi.open();
}

async function handleDelete(record: any) {
  await deleteFlowNodeDetail({ id: record.id });
  await reload();
}

function handleSelect(node: any) {
  currentNode.value = node;
  reloadData();
}
</script>

<template>
  <ColPage left-width="250px">
    <template #left>
      <FlowNodeTree @select="handleSelect" />
    </template>
    <template #right>
      <BasicTable table-title="节点描述" @create="handleCreate">
        <template #action="{ row }">
          <VbenTableAction :actions="[
            { label: '编辑', icon: 'clarity:note-edit-line', onClick: () => handleEdit(row) },
            { label: '删除', icon: 'ant-design:delete-outlined', color: 'error', popConfirm: { title: '是否确认删除', confirm: () => handleDelete(row) } },
          ]" />
        </template>
      </BasicTable>
    </template>
  </ColPage>
  <Modal><Form /></Modal>
</template>
