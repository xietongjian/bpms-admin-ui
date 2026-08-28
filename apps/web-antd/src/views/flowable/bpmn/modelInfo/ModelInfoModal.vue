<template>
  <BasicModal v-bind="$attrs" :title="getTitle">
    <BasicForm />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineEmits } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import {message} from 'ant-design-vue';

  import { modelInfoFormSchema } from './modelInfo.data';
  import { saveOrUpdate, checkEntityExist } from '#/api/flowable/bpmn/modelInfo';
  import { getAll } from '#/api/base/app';

  const emit = defineEmits(['success', 'register']);

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
          isUpdate.value = !!values?.isUpdate;
          const formData = values.record;
          if (unref(isUpdate)) {
            formApi.setValues({
              ...formData,
            });
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
      componentProps: {},
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: modelInfoFormSchema,
    wrapperClass: 'grid-cols-1',
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

  async function handleSubmit() {
    try {
      modalApi.setState({loading: true, confirmLoading: true});
      const {valid} = await formApi.validate();
      if (!valid) {
        return;
      }
      const values = await formApi.getValues();
      const result = await saveOrUpdate(values);
      modalApi.close();
      emit('success');
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }
</script>