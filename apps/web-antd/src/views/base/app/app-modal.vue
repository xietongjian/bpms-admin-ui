<script lang="ts" setup>
import {defineExpose} from 'vue';
import {useVbenModal} from '@vben/common-ui';
import {message} from 'ant-design-vue';
import {formSchema} from './app.data';
import {useVbenForm} from '#/adapter/form';
import {saveOrUpdate} from '#/api/base/app';

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
        baseFormApi.setValues(values);
        modalApi.setState({loading: false, confirmLoading: false});
      }
    }
  },
  onConfirm() {
    // await baseFormApi.submitForm();
    handleSubmit();
  },
});

const [BaseForm, baseFormApi] = useVbenForm({
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
  const {valid} = await baseFormApi.validate();
  if (valid) {
    try {
      const values = await baseFormApi.getValues();
      const {msg, success} = await saveOrUpdate(values);
      if (success) {
        message.success(msg);
        modalApi.close();
        emit('onSuccess');
      } else {
        message.error(msg);
      }
    } catch (e) {
      message.error(e);
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }
  modalApi.setState({loading: false, confirmLoading: false});
}

defineExpose(modalApi);
</script>
<template>
  <BasicModal class="w-[600px]">
    <BaseForm/>
  </BasicModal>
</template>
