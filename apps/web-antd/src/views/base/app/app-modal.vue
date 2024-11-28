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

const [Modal, modalApi] = useVbenModal({
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
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 所有表单项
    componentProps: {
      // class: 'w-full',
    },
  },
  showDefaultActions: false,
  // 提交函数
  // handleSubmit: onSubmit,
  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: formSchema,
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
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
  <Modal class="w-[600px]">
    <BaseForm/>
  </Modal>
</template>
