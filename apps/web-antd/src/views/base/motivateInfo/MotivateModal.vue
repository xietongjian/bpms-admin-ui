<script lang="ts" setup>
import { computed } from 'vue';
import { defineExpose, defineEmits } from 'vue';
import { message } from 'ant-design-vue';
import { useVbenModal } from '@vben/common-ui';
import { useVbenForm } from '#/adapter/form';
import { formSchema } from './motivate.data';
import { saveOrUpdateMotivateInfo } from '#/api/base/motivateInfo';

const emit = defineEmits<{
  onSuccess: [void];
}>();

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
        modalApi.setState({ loading: false, confirmLoading: false });
      }
    }
  },
  onConfirm() {
    handleSubmit();
  },
});

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {},
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: formSchema,
  wrapperClass: 'grid-cols-1',
});

const authorField = computed(() => {
  return formApi?.getValues()?.then
    ? formSchema.find((f) => f.fieldName === 'author')
    : null;
});

async function handleSubmit() {
  modalApi.setState({ loading: true, confirmLoading: true });
  const { valid } = await formApi.validate();
  if (valid) {
    try {
      const values = await formApi.getValues();
      const { msg, success } = await saveOrUpdateMotivateInfo(values);
      if (success) {
        message.success(msg);
        modalApi.close();
        emit('onSuccess');
      } else {
        message.error(msg);
      }
    } catch (e: any) {
      message.error(e?.message || '保存失败');
    } finally {
      modalApi.setState({ loading: false, confirmLoading: false });
    }
    return;
  }
  modalApi.setState({ loading: false, confirmLoading: false });
}

defineExpose(modalApi);
</script>
<template>
  <BasicModal class="w-[600px]">
    <BasicForm>
      <template #author>
        <template v-if="formApi?.getValues()?.type === '2'">
          <!-- Author field shown when type=2 (有作者) -->
        </template>
      </template>
    </BasicForm>
  </BasicModal>
</template>
