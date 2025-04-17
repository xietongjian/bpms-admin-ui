<script lang="ts" setup>
import { defineEmits, defineExpose } from 'vue';
import { formSchema } from './companyType.data';
import { saveOrUpdate } from '#/api/org/companyType';
import {useVbenForm} from "#/adapter/form";
import {useVbenModal} from '@vben/common-ui';

import {message} from 'ant-design-vue';

const emit = defineEmits(['success', 'register']);

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    labelWidth: 100,
  },
  schema: formSchema,
  showDefaultActions: false,
});

const [BasicModal, modalApi] = useVbenModal({
  fullscreenButton: false,
  onCancel(){
    modalApi.close();
  },
  onConfirm() {
    handleSubmit();
  },
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }
    modalApi.setState({loading: true, confirmLoading: true});

    const values = modalApi.getData();
    await formApi.setValues(values);
    modalApi.setState({loading: false, confirmLoading: false});
  },
});

async function handleSubmit() {
  try {
    modalApi.setState({loading: true, confirmLoading: true});
    const { valid }  = await formApi.validate();
    if (!valid) {
      return;
    }
    const values = await formApi.getValues();

    const {success, msg} = await saveOrUpdate(values);
    if (success) {
      message.success(msg);
      emit('success');
      await modalApi.close();
    } else{
      message.error(msg);
    }
  } finally {
    modalApi.setState({loading: false, confirmLoading: false});
  }
}
defineExpose(modalApi)
</script>


<template>
  <BasicModal>
    <BasicForm />
  </BasicModal>
</template>
