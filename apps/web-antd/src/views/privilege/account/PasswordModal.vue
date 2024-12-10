<template>
  <BasicModal :title="getTitle" @ok="handleSubmit">
    <BasicForm />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';

  import {useVbenModal} from '@vben/common-ui';
  import {passwordFormSchema} from './account.data';
  import { setPassword } from '#/api/privilege/account';
  import { message } from 'ant-design-vue';
  import {useVbenForm} from '#/adapter/form';


  const [BasicForm, formApi] = useVbenForm({
    schema: passwordFormSchema,
    commonConfig: {
      // 所有表单项
      componentProps: {
        class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    wrapperClass: 'grid-cols-1',
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

  const getTitle = computed(() => '设置密码');

  async function handleSubmit() {
    try {
      modalApi.setState({loading: true, confirmLoading: true});
      const valid = await formApi.validate();
      if(valid){
        const values = await formApi.getValues();
        const res = await setPassword({id: values.id, password: values.passwordNew});
        debugger;
        if (success) {
          message.success(msg);
          modalApi.close();
        } else {
          message.error(msg);
        }
      }

    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }
  defineExpose(modalApi)
</script>
