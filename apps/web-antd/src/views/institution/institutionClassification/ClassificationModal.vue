<script setup lang="ts">
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import { computed, defineEmits, defineExpose } from 'vue';
  import { InstitutionalClassificationFormSchema } from './schema.data';
  import {message} from 'ant-design-vue';
  import { saveOrUpdateClassification } from '#/api/institution/institution';

  const emit = defineEmits(['success']);

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      labelWidth: 100,
    },
    schema: InstitutionalClassificationFormSchema,
    showDefaultActions: false,
  });

  const [BasicModal, modalApi] = useVbenModal({
    fullscreenButton: false,
    onCancel() {
      modalApi.close();
    },
    onConfirm() {
      // await baseFormApi.submitForm();
      handleSubmit();
    },
    onOpenChange: async (isOpen) => {
      if (!isOpen) {
        return null;
      }
      modalApi.setState({loading: true, confirmLoading: true});
      const formData = modalApi.getData();
      try {
        /*await updateSchema([
          {
            field: 'code',
            dynamicRules: () => {
              return [
                {
                  required: true,
                  whitespace: true,
                  message: '编码不能为空！',
                },
                {
                  pattern: new RegExp(FormValidPatternEnum.SN),
                  type: 'string',
                  message: '请输入英文或数字！',
                },
                {
                  max: 64,
                  message: '字符长度不能大于64！',
                },
              ];
            },
          },
        ]);*/
        formApi.setValues(formData);
      } finally {
      }
      modalApi.setState({loading: false, confirmLoading: false});
    },
  });

  async function handleSubmit() {
    try {
      modalApi.setState({loading: true, confirmLoading: true});

      const {valid} = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();
      const {success, msg} = await saveOrUpdateClassification(values);
      if(success){
        emit('success');
        modalApi.close();
      } else {
        message.error(msg);
      }
    } catch (e) {
      console.error(e);
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }

  defineExpose(modalApi);
</script>

<template>
  <BasicModal >
    <BasicForm />
  </BasicModal>
</template>
