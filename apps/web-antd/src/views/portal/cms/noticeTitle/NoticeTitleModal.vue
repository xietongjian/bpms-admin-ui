<template>
  <BasicModal class="w-[600px]">
    <BasicForm />
  </BasicModal>
</template>
<script lang="ts" setup>
  import {ref, defineExpose, defineEmits} from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import { formSchema } from './noticeTitle.data';
  import {message} from 'ant-design-vue';
  import { insert, update, checkEntityExist } from '#/api/portal/cms/noticeTitle';

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
      // await formApi.submitForm();
      handleSubmit();
    },
  });

  async function handleSubmit() {
    try {
      const {valid} = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();
      modalApi.setState({loading: true, confirmLoading: true});
      let res = null;
      if (values.id) {
        res = await update(values);
      } else {
        res = await insert(values);
      }
      const {success, msg} = res;
      if (success) {
        message.success(msg);
        modalApi.close();
        emit('success');
      }
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }

  defineExpose(modalApi)
</script>
