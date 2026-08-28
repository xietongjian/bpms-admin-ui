<template>
  <BasicModal>
    <BasicForm/>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineEmits, defineExpose } from 'vue';
  import { useVbenModal } from '@vben/common-ui';
  import { useVbenForm } from '#/adapter/form';

  import { formSchema } from './module.data';
  import { saveOrUpdate, checkEntityExist } from '#/api/privilege/module';
  import { FormValidPatternEnum } from '#/enums/commonEnum';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);

  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          isUpdate.value = !!values?.isUpdate;
          const formData = values.record;
          if (unref(isUpdate)) {
            formApi.setValues({
              ...formData,
            });
          }
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
    schema: formSchema,
    wrapperClass: 'grid-cols-1',
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));

  async function handleSubmit() {
    try {
      modalApi.setState({ loading: true, confirmLoading: true });
      const { valid } = await formApi.validate();
      if (!valid) {
        return;
      }
      const values = await formApi.getValues();
      await saveOrUpdate(values);
      modalApi.close();
      emit('success');
    } finally {
      modalApi.setState({ loading: false, confirmLoading: false });
    }
  }

  defineExpose(modalApi);
</script>