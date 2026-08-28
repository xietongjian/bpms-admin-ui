<template>
  <BasicModal>
    <BasicForm/>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineEmits } from 'vue';
  import { useVbenModal } from '@vben/common-ui';
  import { useVbenForm } from '#/adapter/form';

  import { pValueFormSchema } from './module.data';
  import { saveOrUpdate } from '#/api/privilege/module';

  const emit = defineEmits(['success', 'register']);

  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          values.pvs = values.pvs.map((item: any) => item.id);
          baseFormApi.setValues(values);
          modalApi.setState({ loading: false, confirmLoading: false });
        }
      }
    },
    onConfirm() {
      handleSubmit();
    },
  });

  const [BasicForm, baseFormApi] = useVbenForm({
    commonConfig: {
      componentProps: {},
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: pValueFormSchema,
    wrapperClass: 'grid-cols-1',
  });

  async function handleSubmit() {
    try {
      modalApi.setState({ loading: true, confirmLoading: true });
      const { valid } = await baseFormApi.validate();
      if (!valid) {
        return;
      }
      const values = await baseFormApi.getValues();
      await saveOrUpdate(values);
      modalApi.close();
      emit('success');
    } finally {
      modalApi.setState({ loading: false, confirmLoading: false });
    }
  }

  defineExpose(modalApi);
</script>