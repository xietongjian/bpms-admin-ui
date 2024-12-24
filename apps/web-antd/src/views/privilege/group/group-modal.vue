<script lang="ts" setup>
import {defineExpose, defineEmits} from 'vue';
import {useVbenModal} from '@vben/common-ui';
import {message} from 'ant-design-vue';
import {formSchema} from './group.data';
import {useVbenForm} from '#/adapter/form';
import { saveOrUpdate } from '#/api/privilege/group';

const emit = defineEmits<{
  onSuccess: [void];
}>();


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
  modalApi.setState({loading: true, confirmLoading: true});
  const {valid} = await formApi.validate();
  if (valid) {
    try {
      const values = await formApi.getValues();
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

defineExpose(modalApi)
</script>
<template>
  <BasicModal class="w-[600px]">
    <BasicForm/>
  </BasicModal>
</template>
