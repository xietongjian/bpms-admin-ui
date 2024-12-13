<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
import {ref, computed, unref, defineEmits, defineExpose} from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';

  import { iconCategoryFormSchema } from './iconInfo.data';
  import { getIconCategoryTreeData, saveOrUpdateIconCategory } from '#/api/base/iconInfo';
  import {message} from 'ant-design-vue';

  const emit = defineEmits(['success']);

  const isUpdate = ref(true);
/*

  const [registerForm, { resetFields, updateSchema, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: iconCategoryFormSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    setModalProps({ confirmLoading: true, loading: true });
    isUpdate.value = !!data?.isUpdate;
    let formData = data.record;
    const categoryTreeData = await getIconCategoryTreeData();

    await updateSchema([
      {
        field: 'pid',
        componentProps: { treeData: categoryTreeData, fieldNames: { value: 'id', label: 'name' } },
      },
    ]);

    await setFieldsValue({
      ...formData,
    });
    setModalProps({ confirmLoading: false, loading: false });
  });
*/


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

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: iconCategoryFormSchema,
    wrapperClass: 'grid-cols-1',
  });


  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));

  async function handleSubmit() {
    try {
      modalApi.setState({loading: true, confirmLoading: true});
      const values = await formApi.validate();
      const { success, msg } = await saveOrUpdateIconCategory(values);
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
defineExpose(modalApi);

</script>
