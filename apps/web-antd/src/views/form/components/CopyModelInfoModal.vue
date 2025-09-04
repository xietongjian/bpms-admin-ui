<template>
  <BasicModal class="w-[600px]" v-bind="$attrs" >
    <BasicForm />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, defineEmits, defineExpose } from 'vue';
  import {message} from 'ant-design-vue';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import { copyModelInfoFormSchema, copyBizModelInfoFormSchema } from './modelInfo.data';
  import { copyCustForm } from '#/api/form/customForm';
  import { copyBizForm } from '#/api/form/bizForm';

  const emit = defineEmits(['success', 'register']);

  const formType = ref('custom');

  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        formType.value = values.formType === 0 ? 'custom' : 'biz';
        formApi.setState({ schema: values.formType === 0 ? copyModelInfoFormSchema: copyBizModelInfoFormSchema });

        if (values) {
          formApi.setValues({
            fromModelKey: values.modelKey,
            newCategoryCode: values.categoryCode,
            newModelName: values.name + '-copy',
            newModelKey: values.modelKey + '_copy',
          });
          // 自定义表单
          if(values.formType === 0){
            // 设置表单规则
          }
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      handleSubmit();
    },
  });

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      componentProps: {
        class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: [],
    wrapperClass: 'grid-cols-1',
  });

  async function handleSubmit() {
    try {
      modalApi.setState({loading: true, confirmLoading: true});
      const {valid} = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();
      const {success, msg} =
          formType.value === 'custom'
          ? await copyCustForm(values)
          : await copyBizForm(values);

      if (success) {
        message.success(msg, 2);
        modalApi.close();
        emit('success');
      } else {
        message.error(msg, 2);
      }
    } catch (e) {
      console.error(e);
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }
  defineExpose(modalApi);
</script>
