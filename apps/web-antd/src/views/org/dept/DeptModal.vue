<script lang="ts" setup>
  import { defineEmits, defineExpose } from 'vue';
  import { deptFormSchema } from './dept.data';
  import { saveOrUpdate } from '#/api/org/dept';
  import {useVbenForm} from "#/adapter/form";
  import {useVbenModal} from '@vben/common-ui';
  import { message } from 'ant-design-vue';

  const emit = defineEmits(['success', 'register']);

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      labelWidth: 80,
      componentProps: {
        class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: deptFormSchema,
    wrapperClass: 'grid-cols-2',
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
          if (values.leaderCode && values.leaderName) {
            values.leaderPersonal = [
              {
                label: values.leaderName,
                value: values.leaderCode,
              },
            ];
          }
          if (values.superiorCode && values.superiorName) {
            values.superiorPersonal = [
              {
                label: values.superiorName,
                value: values.superiorCode,
              },
            ];
          }

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
      const {valid} = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();

      if (values.leaderPersonal && values.leaderPersonal.length > 0) {
        const personal = values.leaderPersonal[0];
        values.leaderCode = personal.code;
        values.leaderName = personal.name;
      }
      if (values.superiorPersonal && values.superiorPersonal.length > 0) {
        const personal = values.superiorPersonal[0];
        values.superiorCode = personal.code;
        values.superiorName = personal.name;
      }
      delete values.leaderPersonal;
      delete values.superiorPersonal;

      const {success, msg} = await saveOrUpdate(values);
      if(success){
        message.success(msg);
        emit('success');
        modalApi.close();
      } else{
        message.error(msg);
      }
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }
  defineExpose(modalApi);
</script>
<template>
  <BasicModal class="w-[600px]" >
    <BasicForm />
  </BasicModal>
</template>
