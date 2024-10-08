<script lang="ts" setup>
import {useVbenModal} from '@vben/common-ui';
import {message} from 'ant-design-vue';
import dayjs from 'dayjs';
import {formSchema} from './app.data';
import {useVbenForm} from '#/adapter';
import {saveOrUpdate} from '#/api/base/app';

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
      }
    }
  },
  async onConfirm() {
    baseFormApi.submitForm();
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
  handleSubmit: onSubmit,
  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: formSchema,
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-1',
});

async function onSubmit(values: Record<string, any>) {
  const {valid} = await baseFormApi.validate();
  if(valid){
    const {msg} = await saveOrUpdate(values);
    debugger;
    message.success(msg);
    modalApi.close();
  }
}
</script>
<template>
  <Modal class="w-[600px]">
    <BaseForm/>
  </Modal>
</template>
