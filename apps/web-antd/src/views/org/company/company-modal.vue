<script lang="ts" setup>
  import { computed, defineEmits, ref, unref, defineExpose } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import {message} from 'ant-design-vue';
  import {useVbenForm} from '#/adapter/form';
  import { cloneDeep } from '@vben/utils';
  import { $t } from '@vben/locales';

  import { formSchema } from './company.data';
  import { saveOrUpdate } from '#/api/org/company';

  const emit = defineEmits<{ success: [] }>();

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
      modalApi.setState({loading: true, confirmLoading: true});
      const values = modalApi.getData();
      isUpdate.value = !!values.id;
      await formApi.setValues(values);
      modalApi.setState({loading: false, confirmLoading: false});
    },
  });

  async function handleConfirm() {
    try {
      modalApi.setState({loading: true, confirmLoading: true});
      const { valid } = await formApi.validate();
      if (!valid) {
        return;
      }
      const data = cloneDeep(await formApi.getValues());
      const {success, msg} = await saveOrUpdate(data);
      if(success){
        message.success(msg);
        emit('success');
        modalApi.close();
      } else {
        message.error(msg);
      }
    } catch (error) {
      console.error(error);
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }

  async function handleCancel() {
    modalApi.close();
    await formApi.resetForm();
  }
  defineExpose(modalApi);
</script>
<template>
  <BasicModal :close-on-click-modal="false" :title="title">
    <BasicForm />
  </BasicModal>
</template>
