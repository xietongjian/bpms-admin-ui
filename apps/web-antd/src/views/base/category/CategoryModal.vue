<template>
  <BasicModal >
    <BasicForm />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { defineEmits, defineExpose } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import {message} from 'ant-design-vue';
  import { formSchema } from './category.data';
  import { saveOrUpdate } from '#/api/base/category';

  const emit = defineEmits(['success']);

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
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      // await formApi.submitForm();
      handleSubmit();
    },
  });

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: formSchema,
    wrapperClass: 'grid-cols-1',
  });

  async function handleSubmit() {
    try {
      modalApi.setState({loading: true, confirmLoading: true});

      const { valid } = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();
      values.frontShow = values.frontShow ? 1 : 0;
      const {success, msg} = await saveOrUpdate(values);
      if(success){
        modalApi.close();
        message.success(msg);
        emit('success');
      } else{
        message.error(msg);
      }
    } catch (e){
      console.error(e);
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }

  defineExpose(modalApi);
</script>
