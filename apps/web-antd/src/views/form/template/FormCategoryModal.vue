<template>
  <BasicModal :title="getTitle" @ok="handleSubmit">
    <BasicForm />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineEmits, defineExpose } from 'vue';
  import {message} from 'ant-design-vue';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import { formCategoryFormSchema } from './formTemplate.data';
  import { saveOrUpdateFormCategory } from '#/api/form/formTemplate';

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
    schema: formCategoryFormSchema,
    wrapperClass: 'grid-cols-1',
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));

  async function handleSubmit() {
    try {
      modalApi.setState({loading: true, confirmLoading: true});
      const {valid} = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();
      const {success, msg} = await saveOrUpdateFormCategory(values);
      if(success){
        message.success(msg);
        modalApi.close();
        emit('success');
      } else{
        message.error(msg);
      }
    } catch (e) {
      console.error(e);
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }
  defineExpose(modalApi)
</script>
