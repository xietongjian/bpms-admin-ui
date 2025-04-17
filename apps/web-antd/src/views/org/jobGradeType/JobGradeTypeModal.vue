<script lang="ts" setup>
import {defineEmits, ref, defineExpose} from 'vue';
import {formSchema} from './jobGradeType.data';
import {saveOrUpdate} from '#/api/org/jobGradeType';
import {useVbenForm} from "#/adapter/form";
import {useVbenModal} from '@vben/common-ui';
import {message} from 'ant-design-vue';

const emit = defineEmits(['success']);

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    labelWidth: 100,
  },
  schema: formSchema,
  showDefaultActions: false,
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
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    const values = await formApi.getValues();
    const {success, msg} = await saveOrUpdate(values);
    if(success){
      message.success(msg);
      modalApi.close();
      emit('success');
    }else {
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
    <BasicForm/>
  </BasicModal>
</template>
