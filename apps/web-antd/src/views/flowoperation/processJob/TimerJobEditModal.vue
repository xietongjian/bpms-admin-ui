<template>
  <BasicModal v-bind="$attrs" @register="registerModal" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #processNameRender="{ model, field }">
        {{ model[field] }}
      </template>
      <template #elementNameRender="{ model, field }">
        {{ model[field] }}
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineEmits } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { timerJobFormSchema } from './processJob.data';
  import { updateDuedateById } from '#/api/flowoperation/processJob';
  import { useMessage } from '@/hooks/web/useMessage';

  const emit = defineEmits(['success', 'register']);

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
  });

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      const values = await validate();
      const res = await updateDuedateById(values);
      const { data, success, msg } = res.data;
      if (success) {
        message.success(msg);
        emit('success');
        closeModal();
      } else {
        message.error(msg);
      }
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
