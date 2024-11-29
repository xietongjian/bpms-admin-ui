<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';

  import {useVbenModal} from '@vben/common-ui';
  import { passwordFormSchema } from './account.data';
  import { setPassword } from '#/api/privilege/account';
  import { message } from 'ant-design-vue';
  import {useVbenForm} from '#/adapter/form';

  const isUpdate = ref(true);

  const [BasicForm, baseFormApi] = useVbenForm({
    labelWidth: 100,
    schemas: passwordFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
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
          baseFormApi.setValues(values);
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      // await baseFormApi.submitForm();
      handleSubmit();
    },
  });

  /*const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
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
  });*/

  const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '设置密码'));

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      const values = await validate();
      values.password = values.passwordNew;
      delete values.passwordNew;
      delete values.confirmPassword;
      const {
        data: { success, msg },
      } = await setPassword(values);
      if (success) {
        message.success(msg);
        closeModal();
      } else {
        message.error(msg);
      }
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
  defineExpose(modalApi)
</script>
