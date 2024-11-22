<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle">
    <BasicForm @register="registerForm">
      <template #snSlot="{ model, field }">
        {{ model[field] }}
      </template>
      <template #secretKeySlot="{ model, field }">
        <div class="">
          <TextArea readonly :rows="3" v-model:value="model[field]" />
          <Space class="mt-2">
            <Button v-if="!model[field]" @click="refreshSecretKeyHandle(model)"> 生成密钥 </Button>
            <Popconfirm
              v-else
              title="确定要重新生成秘钥吗？"
              @confirm="refreshSecretKeyHandle(model)"
            >
              <template #icon><QuestionCircleOutlined style="color: red" /></template>
              <Button> 更新密钥 </Button>
            </Popconfirm>

            <Button type="primary" @click="handleCopy"> 复制 </Button>
          </Space>
        </div>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { secretKeyFormSchema } from './app.data';
  import { refreshSecretKey } from '#/api/base/app';
  import { QuestionCircleOutlined } from '@ant-design/icons-vue';
  import { copyText } from '@/utils/copyTextToClipboard';
  import { message } from 'ant-design-vue';
  import { Button, Input, Space, Popconfirm } from 'ant-design-vue';

  const { TextArea } = Input;

  const isUpdate = ref(true);
  const valueRef = ref('');


  const [registerForm, { resetFields, setFieldsValue }] = useForm({
    labelWidth: 150,
    schemas: secretKeyFormSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps }] = useModalInner(async (data) => {
    await resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    let formData = data.record;
    valueRef.value = formData.secretKey;

    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));

  async function refreshSecretKeyHandle(model) {
    try {
      setModalProps({ confirmLoading: true });
      const result = await refreshSecretKey(model.id);
      valueRef.value = result;
      setFieldsValue({
        secretKey: result,
      });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  function handleCopy() {
    try {
      const value = unref(valueRef);
      if (!value) {
        createMessage.warning('请重新获取密钥！');
        return;
      }
      copyText(value);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
