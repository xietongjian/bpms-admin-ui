<template>
  <BasicModal>
    <BasicForm />
  </BasicModal>
</template>
<script lang="ts" setup>
import { defineEmits, defineExpose } from 'vue';
import { useVbenModal } from '@vben/common-ui';
import { useVbenForm } from '#/adapter/form';
import { message } from 'ant-design-vue';
import { editProcessTitleFormSchema } from './formCount.data';
import { updateProcessNameByProcInstId } from '#/api/form/customForm';

const emit = defineEmits(['success']);

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    labelWidth: 100,
  },
  showDefaultActions: false,
  schema: editProcessTitleFormSchema,
});

const [BasicModal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const data = modalApi.getData<Record<string, any>>();
      if (data) {
        formApi.setValues(data);
        modalApi.setState({ loading: false, confirmLoading: false });
      }
    }
  },
  onConfirm() {
    handleSubmit();
  },
});

async function handleSubmit() {
  try {
    modalApi.setState({ loading: true, confirmLoading: true });
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = await formApi.getValues();
    const { success, msg } = await updateProcessNameByProcInstId(values);
    if (success) {
      message.success(msg);
      modalApi.close();
      emit('success');
    } else {
      message.error(msg);
    }
  } finally {
    modalApi.setState({ loading: false, confirmLoading: false });
  }
}

defineExpose(modalApi);
</script>
