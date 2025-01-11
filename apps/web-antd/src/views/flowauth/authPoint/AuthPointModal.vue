<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { defineEmits, defineExpose } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import {message} from 'ant-design-vue';
  import {useVbenForm} from '#/adapter/form';
  import { formSchema } from './authPoint.data';
  import { saveOrUpdate } from '#/api/flowauth/authPoint';

  const emit = defineEmits(['success']);

  const [BasicForm, formApi] = useVbenForm({
    // 所有表单项共用，可单独在表单内覆盖
    commonConfig: {
      // 所有表单项
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: formSchema,
    wrapperClass: 'grid-cols-1',
  });
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

  async function handleSubmit() {
    try {
      modalApi.setState({loading: true, confirmLoading: true});
      const {valid} = await formApi.validate();
      if (!valid) {
        return;
      }
      const values = await formApi.getValues();

      const {success, msg} = await saveOrUpdate(values);
      if (success) {
        message.success(msg);
        modalApi.close();
        emit('success');
      } else {
        message.error(msg);
      }
    } catch (error) {
      console.error(error);
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }

  defineExpose(modalApi);
</script>
