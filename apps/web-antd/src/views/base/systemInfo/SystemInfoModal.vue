<template>
  <BasicModal >
    <BasicForm />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, defineEmits, defineExpose } from 'vue';
  import { formSchema } from './systemInfo.data';
  import { saveOrUpdateSystemInfo } from '#/api/base/systemInfo';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import {message} from 'ant-design-vue';

  const emit = defineEmits(['success', 'register']);

  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          const formData = JSON.parse(JSON.stringify(values));
          if (formData.imgUrl) {
            formData.imgUpload = [{url: formData.imgUrl}];
          }
          formApi.setValues(formData);
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      // await formApi.submitForm();
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
      const { valid } = await formApi.validate();
      if (!valid) return;
      modalApi.setState({loading: true, confirmLoading: true});
      const values = await formApi.getValues();
      values.imgUrl = values.imgUpload && values.imgUpload.length > 0 ? (values.imgUpload[0].response||values.imgUpload[0].url) : '';
      const {success, msg} = await saveOrUpdateSystemInfo(values);
      if(success){
        message.success(msg);
        modalApi.close();
        emit('success');
      }
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }

  defineExpose(modalApi);
</script>
