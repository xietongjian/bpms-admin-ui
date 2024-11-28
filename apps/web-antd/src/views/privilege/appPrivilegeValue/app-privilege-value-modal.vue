<script lang="ts" setup>
import {computed, defineEmits, ref, unref} from 'vue';
import {BasicForm, useForm} from '@/components/Form/index';
import {saveOrUpdate} from '#/api/privilege/appPrivilegeValue';
import {useVbenModal} from '@vben/common-ui';
import {useVbenForm} from "#/adapter/form";
import {formSchema} from './app.data';

const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
  });


  const [BaseForm, formApi] = useVbenForm({
    // 所有表单项共用，可单独在表单内覆盖
    commonConfig: {
      // 所有表单项
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: false,
    // 提交函数
    // handleSubmit: onSubmit,
    // 垂直布局，label和input在不同行，值为vertical
    // 水平布局，label和input在同一行
    layout: 'horizontal',
    schema: formSchema,
    // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
    wrapperClass: 'grid-cols-1',
  });

  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    async onOpenChange(isOpen: boolean) {
      if (!isOpen) {
        return null;
      }
      modalApi.modalLoading(true);
      const values = modalApi.getData<Record<string, any>>();
      isUpdate.value = !!values.id;
      if (isUpdate.value) {
        await formApi.setValues(values);
      }
      if (values) {
        modalApi.setValues(values);
        modalApi.setState({loading: false, confirmLoading: false});
      }
      modalApi.modalLoading(false);
    },
    onConfirm() {
      // await baseFormApi.submitForm();
      handleSubmit();
    },
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      const values = await validate();
      const res = await saveOrUpdate(values);
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>

<template>
  <BasicModal class="w-[800px]">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
