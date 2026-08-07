<template>
  <BasicDrawer class="w-[1000px]" v-bind="$attrs" showFooter @ok="handleSubmit">
    <BasicForm class="doc-manage-form-wrapper" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
import { useVbenDrawer } from '@vben/common-ui';
import { useVbenForm } from '#/adapter/form';

import { docManageFormSchema } from './docManage.data';
import { message } from 'ant-design-vue';
import { saveOrUpdateDocManage } from '#/api/base/docManage';

const emit = defineEmits(['success']);

const [BasicDrawer, drawerApi] = useVbenDrawer({
  destroyOnClose: true,
  onCancel() {
    drawerApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const values = drawerApi.getData<Record<string, any>>();
      if (values) {
        formApi.setValues(values.record || {});
        drawerApi.setState({ loading: false, confirmLoading: false });
      }
    }
  },
  onConfirm() {
    handleSubmit();
  },
});

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {},
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: docManageFormSchema,
  wrapperClass: 'grid-cols-1',
});

async function handleSubmit() {
  try {
    const { valid } = await formApi.validate();
    if (!valid) return;

    const values = await formApi.getValues();
    drawerApi.setState({ loading: true, confirmLoading: true });

    const { success, msg } = await saveOrUpdateDocManage(values);
    if (success) {
      emit('success');
      message.success(msg);
      drawerApi.close();
    } else {
      message.error(msg);
    }
  } finally {
    drawerApi.setState({ loading: false, confirmLoading: false });
  }
}

defineExpose(drawerApi);
</script>
<style lang="scss">
.doc-manage-form-wrapper {
  .vditor-img {
    z-index: 999;
  }
}
</style>
