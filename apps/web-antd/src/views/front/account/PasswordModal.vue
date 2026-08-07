<script lang="ts" setup>
import { nextTick, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Form, FormItem, Input, InputPassword, message } from 'ant-design-vue';

import { setAccountPasswordApi } from '#/api/front/account';

defineOptions({ inheritAttrs: true });

const formData = ref<Record<string, any>>({});
const formRef = ref();

const [BasicModal, modalApi] = useVbenModal({
  title: '设置密码',
  confirmLoading: false,
  onOpenChange: async (open) => {
    if (open) {
      const data = modalApi.getData() || {};
      formData.value = {
        id: data.record?.id,
        password: '',
        confirmPassword: '',
      };
      await nextTick();
      formRef.value?.resetFields();
    }
  },
  onConfirm: async () => {
    try {
      await formRef.value?.validate();
      await setAccountPasswordApi({
        id: formData.value.id,
        password: formData.value.password,
      });
      message.success('密码设置成功');
      modalApi.close();
    } catch (e) {
      // validation error
    }
  },
});

defineExpose(modalApi);

const title = ref('设置密码');

modalApi.onEvent((ev) => {
  if (ev.type === 'state') {
    title.value = modalApi.getState()?.title || '设置密码';
  }
});

const validateConfirmPassword = (_rule: any, value: string) => {
  if (!value) {
    return Promise.reject('确认密码不能为空');
  }
  if (value !== formData.value.password) {
    return Promise.reject('两次输入的密码不一致');
  }
  return Promise.resolve();
};
</script>

<template>
  <BasicModal :title="title" :destroy-on-close="true">
    <Form ref="formRef" :model="formData" layout="vertical" style="max-width: 500px">
      <FormItem
        label="密码"
        name="password"
        :rules="[
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 6, max: 32, message: '长度必需在6-32之间', trigger: 'change' },
          { pattern: /^[^\u4e00-\u9fa5]+$/, message: '密码不能输入汉字', trigger: 'change' },
        ]"
      >
        <InputPassword v-model:value="formData.password" placeholder="请输入密码" />
      </FormItem>
      <FormItem
        label="确认密码"
        name="confirmPassword"
        :rules="[
          { required: true, validator: validateConfirmPassword, trigger: 'change' },
          { pattern: /^[^\u4e00-\u9fa5]+$/, message: '密码不能输入汉字', trigger: 'change' },
        ]"
      >
        <InputPassword v-model:value="formData.confirmPassword" placeholder="请再次输入密码" />
      </FormItem>
    </Form>
  </BasicModal>
</template>
