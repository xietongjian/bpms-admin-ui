<script lang="ts" setup>
import { computed, defineEmits, ref, unref } from 'vue';

import {
  getApiCategoryTreeData,
  saveOrUpdateApiCategory,
} from '@/api/base/apiInfo';
import { BasicForm, useForm } from '@/components/Form';
import { BasicModal, useModalInner } from '@/components/Modal';
import { useMessage } from '@/hooks/web/useMessage';

import { apiCategoryFormSchema } from './apiInfo.data';

const emit = defineEmits(['success']);
const { createMessage } = useMessage();

const isUpdate = ref(true);

const [registerForm, { resetFields, updateSchema, setFieldsValue, validate }] =
  useForm({
    labelWidth: 100,
    schemas: apiCategoryFormSchema,
    showActionButtonGroup: false,
  });

const [registerModal, { setModalProps, closeModal }] = useModalInner(
  async (data) => {
    await resetFields();
    setModalProps({ confirmLoading: true, loading: true });
    isUpdate.value = !!data?.isUpdate;
    const formData = data.record;
    const categoryTreeData = await getApiCategoryTreeData();

    await updateSchema([
      {
        field: 'pid',
        componentProps: {
          treeData: categoryTreeData,
          fieldNames: { value: 'id', label: 'name' },
        },
      },
    ]);

    await setFieldsValue({
      ...formData,
    });
    setModalProps({ confirmLoading: false, loading: false });
  },
);

const getTitle = computed(() => (unref(isUpdate) ? '修改' : '新增'));

async function handleSubmit() {
  try {
    setModalProps({ confirmLoading: true, loading: true });
    const values = await validate();
    const { success, msg } = await saveOrUpdateApiCategory(values);
    if (success) {
      createMessage.success(msg);
      closeModal();
      emit('success');
    } else {
      createMessage.error(msg);
    }
  } finally {
    setModalProps({ confirmLoading: false, loading: false });
  }
}
</script>
<template>
  <BasicModal
    v-bind="$attrs"
    :title="getTitle"
    @ok="handleSubmit"
    @register="registerModal"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
