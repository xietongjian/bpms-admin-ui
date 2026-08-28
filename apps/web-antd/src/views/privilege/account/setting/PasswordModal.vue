<template>
  <BasicModal :title="getTitle">
    <BasicForm />
  </BasicModal>
</template>
<script lang="ts" setup>
import {computed, defineEmits, ref, unref} from 'vue';
// import {BasicModal, useModalInner} from '@/components/Modal';
import {passwordFormSchema} from './data';
import {restSetPassword} from "#/api/sys/user";
import {useVbenForm, useVbenModal} from '@vben/common-ui'
import { message } from 'ant-design-vue';

const emit = defineEmits(['success'])

const isUpdate = ref(true);

const [BasicForm, formApi] = useVbenForm({
  schemas: passwordFormSchema,
  showDefaultActions: false,
  layout: 'horizontal',
  wrapperClass: 'grid-cols-1',
});

/*const [registerForm, {setFieldsValue, resetFields, validate}] = useForm({
  labelWidth: 100,
  schemas: passwordFormSchema,
  showActionButtonGroup: false,
  actionColOptions: {
    span: 23,
  },
});*/


const [basicModal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
    }
  },
  onConfirm() {
    // await baseFormApi.submitForm();
    handleSubmit();
  },
});
/*
const [registerModal, {setModalProps, closeModal}] = useModalInner(async (data) => {
  resetFields();
  setModalProps({
    confirmLoading: false,
    title: `给账号【${data.record.realName}(${data.record.username})】设置密码`,
  });
  isUpdate.value = !!data?.isUpdate;

  if (unref(isUpdate)) {
    setFieldsValue({
      ...data.record,
    });
  }
});
*/

const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '设置密码'));

async function handleSubmit() {
  try {
    modalApi.setState({loading: true, confirmLoading: true});
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    const values = await formApi.getValues();
    values.password = values.passwordNew;
    delete values.passwordNew;
    delete values.confirmPassword;
    const { success, msg } = await restSetPassword(values);
    if (success) {
      message.success(msg);
      modalApi.close();
      emit('success');
    } else {
      message.error(msg);
    }
  } finally {
    modalApi.setState({loading: false, confirmLoading: false});
  }
}
</script>
