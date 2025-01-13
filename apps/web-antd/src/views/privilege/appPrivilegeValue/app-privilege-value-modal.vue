<script lang="ts" setup>
import {defineEmits, ref, defineExpose} from 'vue';
import {saveOrUpdate} from '#/api/privilege/appPrivilegeValue';
import {useVbenModal} from '@vben/common-ui';
import {useVbenForm} from "#/adapter/form";
import {formSchema} from './appPrivilegeValue.data';
import {message} from 'ant-design-vue';

const emit = defineEmits(['success', 'register']);

const isUpdate = ref(true);

const [BasicForm, formApi] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 所有表单项
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
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      return null;
    }
    modalApi.setState({loading: true, confirmLoading: true});

    const values = modalApi.getData<Record<string, any>>();
    isUpdate.value = !!values.id;
    if (isUpdate.value) {
      await formApi.setValues(values);
    }
    if (values) {
      formApi.setValues(values);
      modalApi.setState({loading: false, confirmLoading: false});
    }
    modalApi.setState({loading: false, confirmLoading: false});
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
    const {success, msg} = await saveOrUpdate(values);
    if(success){
      modalApi.close();
      emit('success');
      message.success(msg);
    }else {
      message.error(msg);
    }
  } finally {
    modalApi.setState({loading: false, confirmLoading: false});
  }
}

defineExpose(modalApi);
</script>

<template>
  <BasicModal class="w-[600px]">
    <BasicForm/>
  </BasicModal>
</template>
