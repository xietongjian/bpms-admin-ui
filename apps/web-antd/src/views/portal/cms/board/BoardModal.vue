<template>
  <BasicModal >
    <BasicForm/>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { defineExpose, defineEmits } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import { formSchema } from './board.data';
  import { insert, update } from '#/api/portal/cms/board';
  import {message} from 'ant-design-vue';

  const emit = defineEmits(['success'])

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

      let res = null;
      if (values.id) {
        res = await update(values);
      } else {
        res = await insert(values);
      }
      const {success, msg} = res;
      if (success) {
        message.success(msg);
        await modalApi.close();
        emit('success');
      } else {
        message.error(msg);
      }
    } catch (e) {
      console.error(e);
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }

  defineExpose(modalApi);
</script>
