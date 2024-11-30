<script lang="ts" setup>
  import { computed, defineEmits, ref, unref } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import {message} from 'ant-design-vue';
  import {useVbenForm} from '#/adapter/form';
  import { cloneDeep } from '@vben/utils';
  import { $t } from '@vben/locales';

  import { formSchema } from './company.data';
  import { checkEntityExist, saveOrUpdate } from '#/api/org/company';
  import { FormValidPatternEnum } from '#/enums/constantEnum';

  const emit = defineEmits<{ reload: [] }>();

  const isUpdate = ref(true);
  const title = computed(() => {
    return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
  });
  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      labelWidth: 100,
    },
    schema: formSchema,
    showDefaultActions: false,
  });

  const [BasicModal, modalApi] = useVbenModal({
    fullscreenButton: false,
    onCancel: handleCancel,
    onConfirm: handleConfirm,
    onOpenChange: async (isOpen) => {
      if (!isOpen) {
        return null;
      }
      modalApi.modalLoading(true);
      const { id } = modalApi.getData() as { id?: number | string };
      isUpdate.value = !!id;
      if (isUpdate.value && id) {
        const record = await dictTypeInfo(id);
        await formApi.setValues(record);
      }
      modalApi.modalLoading(false);
    },
  });

  async function handleConfirm() {
    try {
      modalApi.modalLoading(true);
      const { valid } = await formApi.validate();
      if (!valid) {
        return;
      }
      const data = cloneDeep(await formApi.getValues());
      await saveOrUpdate(data);
      emit('reload');
      await handleCancel();
    } catch (error) {
      console.error(error);
    } finally {
      modalApi.modalLoading(false);
    }
  }

  async function handleCancel() {
    modalApi.close();
    await formApi.resetForm();
  }
</script>
<template>
  <BasicModal :close-on-click-modal="false" :title="title">
    <BasicForm />
  </BasicModal>
</template>
