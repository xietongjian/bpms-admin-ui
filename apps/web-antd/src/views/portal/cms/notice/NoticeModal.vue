<template>
  <BasicModal >
    <BasicForm />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineExpose } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  // import { formSchema } from './notice.data';
  import { insert, update, checkEntityExist } from '#/api/portal/cms/notice';
  import { CheckExistParams } from '#/api/model/baseModel';

  const isUpdate = ref(true);

  const [registerForm, { resetFields, updateSchema, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    // schemas: formSchema,
    showActionButtonGroup: false,
  });

  const getBaseDynamicRules = (params: CheckExistParams) => {
    return [
      {
        trigger: 'blur',
        validator: (_, value) => {
          if (value) {
            return checkEntityExist({
              id: params.id,
              fieldName: params.field,
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
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });

      if (values.id) {
        await update(values);
      } else {
        await insert(values);
      }

      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  /*export default defineComponent({
    name: 'NoticeModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {


      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });*/
</script>
