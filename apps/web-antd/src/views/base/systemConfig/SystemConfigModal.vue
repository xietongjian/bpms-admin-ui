<template>
  <BasicModal class="w-[600px]">
    <BasicForm/>
  </BasicModal>
</template>
<script lang="ts" setup>
import {defineEmits, defineExpose} from 'vue';
import {useVbenModal} from '@vben/common-ui';
import {useVbenForm} from "#/adapter/form";
import {message} from 'ant-design-vue';
import {formSchema} from './systemConfig.data';
import {saveOrUpdate} from '#/api/base/systemConfig';

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
    // await baseFormApi.submitForm();
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
    const {valid} = await formApi.validate();
    if (!valid) {
      return;
    }
    const values = await formApi.getValues();
    const {success, msg} = await saveOrUpdate(values);
    if (success) {
      modalApi.close()
      message.success(msg);
      emit('success');
    } else {
      message.error(msg);
    }
  } finally {
    modalApi.setState({loading: false, confirmLoading: false});
  }
}

defineExpose(modalApi);
</script>
