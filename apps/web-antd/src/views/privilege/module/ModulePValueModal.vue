<template>
  <BasicModal>
    <BasicForm/>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineEmits } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import {message} from 'ant-design-vue';
  import {useVbenForm} from '#/adapter/form';

  import { pValueFormSchema } from './module.data';
  import { saveOrUpdate } from '#/api/privilege/module';

  const emit = defineEmits(['success', 'register']);

  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          values.pvs = values.pvs.map(item => item.id);
          baseFormApi.setValues(values);
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      handleSubmit();
    },
  });

  const [BasicForm, baseFormApi] = useVbenForm({
    // 所有表单项共用，可单独在表单内覆盖
    commonConfig: {
      // 所有表单项
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: pValueFormSchema,
    wrapperClass: 'grid-cols-1',
  });

  /*const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record,
      });
      updateSchema([
        {
          field: 'component',
          show: false,
        },
        {
          field: 'url',
          show: false,
        },
      ]);
    } else {
      updateSchema([
        {
          field: 'component',
          show: true,
        },
        {
          field: 'url',
          show: true,
        },
      ]);
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));
*/
  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      const values = await validate();
      await saveOrUpdate(values);
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  defineExpose(modalApi);
</script>
