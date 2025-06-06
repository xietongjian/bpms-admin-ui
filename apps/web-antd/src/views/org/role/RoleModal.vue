<script lang="ts" setup>
  import { defineExpose, defineEmits } from 'vue';
  import { roleFormSchema } from './role.data';
  import {useVbenModal} from '@vben/common-ui';
  import { saveOrUpdate } from '#/api/org/role';

  import {useVbenForm} from "#/adapter/form";
  import { message } from 'ant-design-vue';

  const emit = defineEmits(['success'])

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      labelWidth: 100,
    },
    schema: roleFormSchema,
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
      // await baseFormApi.submitForm();
      handleSubmit();
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
      if (values.id) {
        values.companyId = null;
      }
      const {success, msg} = await saveOrUpdate(values);
      if(success){
        message.success(msg);
        emit('success');
        modalApi.close();
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
  <BasicModal >
    <BasicForm />
  </BasicModal>
</template>
