<template>
  <BasicModal v-bind="$attrs" :title="getTitle" @ok="handleSubmit">
    <BasicForm />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { defineComponent, defineEmits, defineExpose, ref, computed, unref } from 'vue';
  import {useVbenForm} from "#/adapter/form";
  import {useVbenModal} from '@vben/common-ui';
  import {message} from 'ant-design-vue';
  import { formSchema } from './flowprocess.data';
  import { saveOrUpdate, checkEntityExist } from '#/api/bpm/flowprocess';

  const emit = defineEmits(['success'])

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
    ] as any[];
  };

  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    async onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          // await resetFields();
          // setModalProps({ confirmLoading: false });
          // isUpdate.value = !!data?.isUpdate;
          let formData = values;

          await formApi.updateSchema([
            {
              fieldName: 'name',
              dynamicRules: () => {
                return [
                  {
                    required: true,
                    whitespace: true,
                    message: '名称不能为空！',
                  },
                  {
                    max: 64,
                    message: '字符长度不能大于64！',
                  },
                  ...getBaseDynamicRules({
                    id: (unref(isUpdate) && formData && formData.id) || '',
                    field: 'name',
                    fieldValue: '',
                    fieldName: '名称',
                  }),
                ];
              },
            },
          ]);
          if (unref(isUpdate)) {
            formApi.setValues({
              ...values,
            });
          }
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      // await baseFormApi.submitForm();
      handleSubmit();
    },
  });


  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));

  async function handleSubmit() {
    try {
      modalApi.setState({loading: true, confirmLoading: true});
      const { valid } = await formApi.validate();
      const values = await formApi.getValues();
      const {success, msg, data}  = await saveOrUpdate(values);
      if(success){
        modalApi.close();
        emit('success');
        message.success(msg);
      } else {
        message.error(msg);
      }
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }

  defineExpose(modalApi)
</script>
