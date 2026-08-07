<template>
  <BasicModal class="w-[800px]">
    <BasicForm class="relative">
      <template #backToStepNodeList>
        <Table
          ref="backToStepNodeTableRef"
          :pagination="false"
          rowKey="nodeId"
          :row-selection="{ type: 'radio', selectedRowKeys: selectedKeys, onChange: changeSelect }"
          :columns="backToStepTableColumns"
          :data-source="backToStepNodeList"
          :scroll="{ y: 180 }"
          size="small"
          :customRow="customRow"
          :loading="backToStepNodeListLoading"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
import { ref, unref, defineExpose, defineEmits } from 'vue';
import { useVbenModal } from '@vben/common-ui';
import { useVbenForm } from '#/adapter/form';
import { approveBackToStepFormSchema, backToStepTableColumns } from './action.data';
import { Table, message } from 'ant-design-vue';
import { backToStep, getBackToStepNodes } from '#/api/process/process';

const emit = defineEmits(['success']);
const backToStepNodeList = ref([]);
const backToStepNodeListLoading = ref(false);
const selectedKeys = ref([]);
const selectedRows = ref([]);
const backToStepNodeTableRef = ref();

const [BasicModal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const values = modalApi.getData<Record<string, any>>();
      if (values) {
        selectedKeys.value = [];
        selectedRows.value = [];
        formApi.setValues(values);
        loadBackToStepNodes(values.taskId);
        modalApi.setState({ loading: false, confirmLoading: false });
      }
    }
  },
  onConfirm() {
    handleSubmit();
  },
});

async function loadBackToStepNodes(taskId) {
  backToStepNodeListLoading.value = true;
  try {
    const res = await getBackToStepNodes({ taskId });
    backToStepNodeList.value = res;
  } catch (e) {
    console.error(e);
  } finally {
    backToStepNodeListLoading.value = false;
  }
}

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {},
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: approveBackToStepFormSchema,
  wrapperClass: 'gap-0 grid-cols-1',
});

function closeCurrModal() {
  genLoading(false);
  modalApi.close();
  emit('success');
}

function genLoading(status) {
  modalApi.setState({ loading: status, confirmLoading: status });
}

async function handleSubmit() {
  try {
    genLoading(true);
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = await formApi.getValues();
    const params = {
      taskId: values.taskId,
      processInstanceId: values.procInstId,
      message: values.message,
    };

    if (unref(selectedKeys) && unref(selectedKeys).length > 0) {
      params['distFlowElementId'] = unref(selectedKeys)[0];
      const res = await backToStep(params);
      const result = res.data;
      if (result.success) {
        message.success(result.msg);
        closeCurrModal();
      } else {
        message.error(result.msg);
      }
    } else {
      message.error('请选择要驳回的节点!');
      genLoading(false);
      return;
    }
  } catch (e) {
    message.error('驳回失败，请稍后再试!');
    console.error(e);
  } finally {
    genLoading(false);
  }
}

function changeSelect(e) {
  selectedRows.value = unref(backToStepNodeList).filter((item) => item.nodeId === e[0]);
  selectedKeys.value = e;
}

function customRow(record) {
  return {
    onClick: () => {
      selectedKeys.value = [record.nodeId];
      selectedRows.value = [record];
    },
  };
}

defineExpose(modalApi);
</script>
