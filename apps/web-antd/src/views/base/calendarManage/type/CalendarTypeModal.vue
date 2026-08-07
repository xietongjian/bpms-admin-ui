<script lang="ts" setup>
import { defineExpose, defineEmits } from 'vue';
import { message } from 'ant-design-vue';
import { useVbenModal } from '@vben/common-ui';
import { useVbenForm } from '#/adapter/form';
import { calendarTypeFormSchema } from './calendarType.data';
import { saveOrUpdateCalendarType } from '#/api/base/calendarManage/calendarType.api';

const emit = defineEmits<{
  onSuccess: [void];
}>();

const [BasicModal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const values = modalApi.getData<Record<string, any>>();
      if (values) {
        formApi.setValues(values);
        modalApi.setState({ loading: false, confirmLoading: false });
      }
    }
  },
  onConfirm() {
    handleSubmit();
  },
});

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {},
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: calendarTypeFormSchema,
  wrapperClass: 'grid-cols-1',
});

async function handleSubmit() {
  modalApi.setState({ loading: true, confirmLoading: true });
  const { valid } = await formApi.validate();
  if (valid) {
    try {
      const values = await formApi.getValues();
      const { msg, success } = await saveOrUpdateCalendarType(values);
      if (success) {
        message.success(msg);
        modalApi.close();
        emit('onSuccess');
      } else {
        message.error(msg);
      }
    } catch (e: any) {
      message.error(e?.message || '保存失败');
    } finally {
      modalApi.setState({ loading: false, confirmLoading: false });
    }
    return;
  }
  modalApi.setState({ loading: false, confirmLoading: false });
}

defineExpose(modalApi);
</script>
<template>
  <BasicModal class="w-[600px]">
    <BasicForm />
  </BasicModal>
</template>
