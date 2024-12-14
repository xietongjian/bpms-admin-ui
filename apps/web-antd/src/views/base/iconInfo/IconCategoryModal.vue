<script lang="ts" setup>
import {computed, defineEmits, defineExpose, ref, unref} from 'vue';
import {useVbenModal} from '@vben/common-ui';
import {useVbenForm} from '#/adapter/form';

import {iconCategoryFormSchema} from './iconInfo.data';
import {saveOrUpdateIconCategory} from '#/api/base/iconInfo';
import {message} from 'ant-design-vue';

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
    const valid = await formApi.validate();
    if (!valid) {
      return;
    }
    const values = await formApi.getValues();
    const {success, msg} = await saveOrUpdateIconCategory(values);
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

<template>
  <BasicModal>
    <BasicForm/>
  </BasicModal>
</template>
