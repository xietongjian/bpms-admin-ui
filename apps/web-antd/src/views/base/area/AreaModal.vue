<script lang="ts" setup>
  import { defineEmits, defineExpose } from 'vue';
  import { formSchema } from './area.data';
  import { saveOrUpdate } from '#/api/base/area';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import {message} from "ant-design-vue";

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
    modalApi.setState({loading: true, confirmLoading: true});
    try {
      const {valid} = await formApi.validate();
      if (!valid) {
        return;
      }
      const values = await formApi.getValues();
      const {success, msg} = await saveOrUpdate(values);
      if(success){
        message.success(msg);
        modalApi.close();
        emit('success');
      }else{
        message.error(msg);
      }
    } catch (e) {
      console.error(e);
      message.error(e.message);
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }

  defineExpose(modalApi)
</script>

<template>
  <BasicModal>
    <BasicForm/>
  </BasicModal>
</template>
