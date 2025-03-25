<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { defineComponent, ref, computed, unref } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';

  import {formSchema} from './businessFlowApply.data';
  import { saveOrUpdate, checkEntityExist } from '#/api/bpm/businessFlowApply';
  // import { CheckExistParams } from '#/api/model/baseModel';

  const isUpdate = ref(true);

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      labelWidth: 100,
    },
    schema: formSchema,
    showDefaultActions: false,
  });

  const getBaseDynamicRules = (params: any) => {
    return [
      {
        trigger: 'blur',
        validator: (_, value) => {
          if (value) {
            return checkEntityExist({
              id: params.id,
              field: params.field,
              fieldValue: value,
              fieldName: params.fieldName,
            })
                .then((res) => {
                  if (res) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(params.fieldName + '已存在，请修改！');
                  }
                })
                .catch((res) => {
                  return Promise.reject(res);
                });
          } else {
            return Promise.resolve();
          }
        },
      },
    ] as Rule[];
  };

  const [BasicModal, modalApi] = useVbenModal({
    fullscreenButton: false,
    onCancel() {
      modalApi.close();
    },
    onConfirm() {
      // await baseFormApi.submitForm();
      // handleSubmit();
    },
    onOpenChange: async (isOpen) => {
      if (!isOpen) {
        return null;
      }
      modalApi.setState({loading: true, confirmLoading: true});
      const formData = modalApi.getData();
      formApi.setValues(formData);
      modalApi.setState({loading: false, confirmLoading: false});
    },
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      await saveOrUpdate(values);
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

/*  export default defineComponent({
    name: 'BusinessFlowApplyModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {


      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });*/
</script>
