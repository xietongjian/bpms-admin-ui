<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm"/>
  </BasicModal>
</template>
<script lang="ts" setup>
import {computed, defineEmits, ref, unref} from 'vue';
import {BasicModal, useModalInner} from '@/components/Modal';
import {passwordFormSchema} from './data';
import {restSetPassword} from "#/api/sys/user";
import {useVbenForm} from '@vben/common-ui'

const {createMessage} = useMessage();

const emit = defineEmits(['success'])

const isUpdate = ref(true);

const [BasicForm, formApi] = useVbenForm({
  schemas: passwordFormSchema,
  showDefaultActions: false,
  layout: 'horizontal',
  wrapperClass: 'grid-cols-1',
});

const [registerForm, {setFieldsValue, resetFields, validate}] = useForm({
  labelWidth: 100,
  schemas: passwordFormSchema,
  showActionButtonGroup: false,
  actionColOptions: {
    span: 23,
  },
});

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

const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '设置密码'));

async function handleSubmit() {
  try {
    setModalProps({confirmLoading: true});
    const values = await validate();
    values.password = values.passwordNew;
    delete values.passwordNew;
    delete values.confirmPassword;
    const {
      data: {success, msg},
    } = await restSetPassword(values);
    if (success) {
      createMessage.success(msg);
      closeModal();
      emit('success');
    } else {
      createMessage.error(msg);
    }
  } finally {
    setModalProps({confirmLoading: false});
  }
}
</script>
