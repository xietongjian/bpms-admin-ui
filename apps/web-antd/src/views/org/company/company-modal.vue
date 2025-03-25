<script lang="ts" setup>
  import { defineEmits, ref, defineExpose } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import {message} from 'ant-design-vue';

  import { cloneDeep } from '@vben/utils';

  import { formSchema } from './company.data';
  import { saveOrUpdate } from '#/api/org/company';

  const emit = defineEmits<{ success: [] }>();

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
  <BasicModal >
    <BasicForm />
  </BasicModal>
</template>
