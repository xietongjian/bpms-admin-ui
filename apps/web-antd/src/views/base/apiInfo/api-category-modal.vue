<script lang="ts" setup>
import { computed, defineEmits, ref, unref } from 'vue';
import {message} from 'ant-design-vue';
import {useVbenModal} from '@vben/common-ui';
import {useVbenForm} from '#/adapter/form';

import {
  getApiCategoryTreeData,
  saveOrUpdateApiCategory,
} from '#/api/base/apiInfo';

import { apiCategoryFormSchema } from './apiInfo.data';

const emit = defineEmits(['success']);

const isUpdate = ref(true);


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
    // await formApi.submitForm();
    handleSubmit();
  },
});

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      // class: 'w-full',
    },
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: apiCategoryFormSchema,
  wrapperClass: 'grid-cols-1',
});
/*
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
);*/

const getTitle = computed(() => (unref(isUpdate) ? '修改' : '新增'));

async function handleSubmit() {
  try {
    modalApi.setState({loading: true, confirmLoading: true});
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    const values = await formApi.getValues();
    const { success, msg } = await saveOrUpdateApiCategory(values);
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
defineExpose(modalApi)
</script>
<template>
  <BasicModal >
    <BasicForm />
  </BasicModal>
</template>
