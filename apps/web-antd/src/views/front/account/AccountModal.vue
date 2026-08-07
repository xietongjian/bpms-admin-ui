<script lang="ts" setup>
import { nextTick, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { z as zod } from 'zod';

import { Button, Form, FormItem, Input, message, Switch } from 'ant-design-vue';

import { saveOrUpdateAccountApi } from '#/api/front/account';

defineOptions({ inheritAttrs: true });

const emit = defineEmits<{
  success: [];
}>();

const isUpdate = ref(false);
const formData = ref<Record<string, any>>({});
const formRef = ref();
const loading = ref(false);

const [BasicModal, modalApi] = useVbenModal({
  title: '编辑账号',
  confirmLoading: false,
  onOpenChange: async (open) => {
    if (open) {
      isUpdate.value = modalApi.getState()?.isUpdate ?? false;
      const data = modalApi.getData() || {};
      if (data.record) {
        formData.value = { ...data.record };
      } else {
        formData.value = {};
      }
      await nextTick();
      formRef.value?.resetFields();
    }
  },
  onConfirm: async () => {
    loading.value = true;
    try {
      await saveOrUpdateAccountApi(formData.value);
      message.success(isUpdate.value ? '修改成功' : '新增成功');
      modalApi.close();
      emit('success');
    } catch (e) {
      message.error('操作失败');
    } finally {
      loading.value = false;
    }
  },
});

defineExpose(modalApi);

const title = ref('新增');

modalApi.onEvent((ev) => {
  if (ev.type === 'state') {
    title.value = modalApi.getState()?.title || '编辑账号';
  }
});
</script>

<template>
  <BasicModal :title="title" :destroy-on-close="true">
    <Form ref="formRef" :model="formData" layout="vertical" style="max-width: 500px">
      <FormItem label="用户名[工号]" name="username">
        <Input v-model:value="formData.username" placeholder="请输入用户名" />
      </FormItem>
      <FormItem label="姓名" name="name" required>
        <Input v-model:value="formData.name" placeholder="请输入姓名" />
      </FormItem>
      <FormItem label="手机" name="mobile">
        <Input v-model:value="formData.mobile" placeholder="请输入手机号" />
      </FormItem>
      <FormItem label="启用状态" name="enabled">
        <Switch
          v-model:checked="formData.enabled"
          :checked-value="true"
          :un-checked-value="false"
          checked-children="启用"
          un-checked-children="禁用"
        />
      </FormItem>
      <FormItem label="锁定状态" name="accountNonLocked">
        <Switch
          v-model:checked="formData.accountNonLocked"
          :checked-value="true"
          :un-checked-value="false"
          checked-children="未锁定"
          un-checked-children="锁定"
        />
      </FormItem>
    </Form>
  </BasicModal>
</template>
