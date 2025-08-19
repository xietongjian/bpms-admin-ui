<template>
  <BasicModal >
    <BasicForm />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { defineExpose, defineEmits } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import { formSchema } from './noticeSubject.data';
  import { insert, update } from '#/api/portal/cms/noticeSubject';
  import {message} from "ant-design-vue";

  const emit = defineEmits(['success']);

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: formSchema,
    wrapperClass: 'grid-cols-3',
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

          const signatureImgUpload = values.signatureImg ? [{url: values.signatureImg}] : [];
          const signerSelector = values.signerNo ? [{value: values.signerNo, label: values.signerName}] : [];

          const formData = {...values, signatureImgUpload, signerSelector};


          formApi.setValues(formData);
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
      const {valid} = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();

      /*values.usingRanges = values.usingRanges.map(item=>{
        return {
          rangeId: item.code,
          rangeName: item.name,
          rangeType: Object.keys(OrgDataType)[item.sourceType-1]
        }
      });*/

      if (values.haveSigner) {
        const signer = values.signerSelector;
        values.signerName = signer[0].name;
        values.signerNo = signer[0].code;
      } else {
        values.signerNo = '';
        values.signerName = '';
      }

      // logoUploader， signatureImgUploader
      if (values.logoUploader && values.logoUploader.length > 0) {
        values.logo = values.logoUploader[0].filePath;
        delete values.logoUploader;
      } else {
        values.logo = '';
      }
      // if(values.signatureImgUploader && values.signatureImgUploader.length>0){
      //   values.signatureImg = values.signatureImgUploader[0].filePath
      //   delete values.signatureImgUploader;
      // }else{
      //   values.signatureImg='';
      // }

      delete values.signerSelector;
      values.haveSigner = values.haveSigner ? 1 : 0;

      const signatureImg = values.signatureImgUpload?.length > 0
          ? values.signatureImgUpload[0].response||values.signatureImgUpload[0].url : '';

      const formData = {...values, signatureImg};

      modalApi.setState({loading: true, confirmLoading: true});
      let res = null;
      if (formData.id) {
        res = await update(formData);
      } else {
        res = await insert(formData);
      }

      const {success, msg} = res;
      if(success){
        message.success(msg);
        await modalApi.close();
        emit('success');
      }

    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }

  defineExpose(modalApi);
</script>
