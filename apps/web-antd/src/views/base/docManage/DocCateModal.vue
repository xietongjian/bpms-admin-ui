<script lang="ts" setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { useVbenModal } from '@vben/common-ui';
import { useVbenForm } from '#/adapter/form';

import { saveOrUpdateDocCate } from '#/api/base/docManage';

import { docCateFormSchema } from './docManage.data';

const emit = defineEmits<{ (e: 'success'): void }>();

const isUpdate = ref(false);

const [BasicModal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const values = modalApi.getData<Record<string, any>>();
      if (values) {
        isUpdate.value = !!values.isUpdate;
        formApi.setValues(values.record || {});
        modalApi.setState({ loading: false, confirmLoading: false });
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
  schema: docCateFormSchema,
  wrapperClass: 'grid-cols-1',
});

async function handleSubmit() {
  try {
    modalApi.setState({ loading: true, confirmLoading: true });
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    const values = await formApi.getValues();
    const { success, msg } = await saveOrUpdateDocCate(values);
    if (success) {
      message.success(msg);
      modalApi.close();
      emit('success');
    } else {
      message.error(msg);
    }
  } finally {
    modalApi.setState({ loading: false, confirmLoading: false });
  }
}

defineExpose(modalApi);
</script>
<template>
  <BasicModal :title="isUpdate ? '编辑分类' : '新增分类'">
    <BasicForm />
  </BasicModal>
</template>
