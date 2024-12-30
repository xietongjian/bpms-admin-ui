<template>
  <BasicModal>
    <BasicForm />
  </BasicModal>
</template>
<script lang="ts" setup>
import {ref, computed, unref, defineEmits, defineExpose} from 'vue';
import {useVbenModal} from '@vben/common-ui';
import {useVbenForm} from '#/adapter/form';
import {message} from 'ant-design-vue';

import {formSchema} from './formFieldType.data';
import {saveOrUpdate} from '#/api/base/formFieldType';

const emit = defineEmits(['success', 'register']);

const isUpdate = ref(true);

/*const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
  labelWidth: 100,
  schemas: formSchema,
  showActionButtonGroup: false,
});

const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
  await resetFields();
  setModalProps({ confirmLoading: false });
  isUpdate.value = !!data?.isUpdate;
  let formData = data.record;

  if (unref(isUpdate)) {
    setFieldsValue({
      ...formData,
    });
  }
});*/


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
  schema: formSchema,
  wrapperClass: 'grid-cols-1',
});

const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));

async function handleSubmit() {
  try {
    modalApi.setState({loading: true, confirmLoading: true});

    const {valid} = await formApi.validate();
    if (!valid) {
      return;
    }
    const values = await formApi.getValues();
    const {success, msg} = await saveOrUpdate(values);
    if (success) {
      modalApi.close();
      message.success(msg);
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
