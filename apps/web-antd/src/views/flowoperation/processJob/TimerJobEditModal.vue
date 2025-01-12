<template>
  <BasicModal class="w-[500px]">
    <BasicForm>
      <template #processName="slotProps">
        {{slotProps.value??'-'}}
      </template>
      <template #elementName="slotProps">
        {{slotProps.value??'-'}}
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineEmits, defineExpose } from 'vue';
  // import { BasicModal, useModalInner } from '@/components/Modal';
  // import { BasicForm, useForm } from '@/components/Form/index';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import {Input, message} from 'ant-design-vue';

  import { timerJobFormSchema } from './processJob.data';
  import { updateDuedateById } from '#/api/flowoperation/processJob';

  const emit = defineEmits(['success', 'register']);
/*
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: timerJobFormSchema,
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setFieldsValue({
      jobId: data.record.id,
      duedate: data.record.duedate,
      ...data.record,
    });
  });*/

  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          values.jobId = values.id;
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

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: timerJobFormSchema,
    wrapperClass: 'grid-cols-1',
  });


  async function handleSubmit() {
    try {
      modalApi.setState({loading: true, confirmLoading: true});
      const {valid} = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();
      if(!values.jobId){
        message.error('任务不存在！');
        return;
      }
      const {success, msg} = await updateDuedateById(values);
      if (success) {
        message.success(msg);
        emit('success');
        modalApi.close();
      } else {
        message.error(msg);
      }
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }

  defineExpose(modalApi);
</script>
