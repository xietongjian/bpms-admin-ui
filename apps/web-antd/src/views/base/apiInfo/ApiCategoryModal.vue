<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineEmits } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { apiCategoryFormSchema } from './apiInfo.data';
  import { getApiCategoryTreeData, saveOrUpdateApiCategory } from '@/api/base/apiInfo';
  import { useMessage } from '@/hooks/web/useMessage';

  const emit = defineEmits(['success']);
  const { createMessage } = useMessage();

  const isUpdate = ref(true);

  const [registerForm, { resetFields, updateSchema, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: apiCategoryFormSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    setModalProps({ confirmLoading: true, loading: true });
    isUpdate.value = !!data?.isUpdate;
    let formData = data.record;
    const categoryTreeData = await getApiCategoryTreeData();

    await updateSchema([
      {
        field: 'pid',
        componentProps: {treeData: categoryTreeData, fieldNames: {value: 'id', label: 'name'}},
      },
    ]);

    await setFieldsValue({
      ...formData,
    });
    setModalProps({ confirmLoading: false, loading: false });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true, loading: true });
      const values = await validate();
      const {success, msg} = await saveOrUpdateApiCategory(values);
      if(success){
        createMessage.success(msg);
        closeModal();
        emit('success');
      } else{
        createMessage.error(msg);
      }
    } finally {
      setModalProps({ confirmLoading: false, loading: false });
    }
  }
</script>
