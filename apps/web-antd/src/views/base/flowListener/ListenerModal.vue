<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { defineComponent, ref, computed, unref, defineEmits, defineExpose } from 'vue';

  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';

  import { formSchema } from './listener.data';
  import {
    saveOrUpdate,
    checkEntityExist,
    getExpressionTypes,
    getListenerTypes,
  } from '#/api/base/flowListener';

const emit = defineEmits(['success'])
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
    schema: formSchema,
    wrapperClass: 'grid-cols-1',
  });

  /*const [registerForm, { resetFields, updateSchema, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
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

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    let formData = data.record;

    const expressionTypes = await getExpressionTypes();
    const listenerTypes = await getListenerTypes();
    const expressionTypeMap = {};
    expressionTypes.forEach((item) => {
      expressionTypeMap[item.value] = item.label;
    });

    await updateSchema([
      {
        field: 'value',
        label: expressionTypeMap[formData.type || 'class'],
      },
      {
        field: 'name',
        dynamicRules: () => {
          return [
            {
              required: true,
              whitespace: true,
              message: '名称不能为空！',
            },
            {
              max: 80,
              message: '字符长度不能大于80！',
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
      {
        field: 'type',
        componentProps: {
          options: expressionTypes,
          onChange: (e) => {
            let v = typeof e == 'string' ? e : e.target.value;
            updateSchema({
              field: 'value',
              label: expressionTypeMap[v],
            });
          },
        },
      },
      {
        field: 'listenerType',
        componentProps: {
          options: listenerTypes,
        },
      },
    ]);
    setFieldsValue({
      ...data.record,
    });
  });*/

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));

  async function handleSubmit() {
    try {
      modalApi.setState({loading: true, confirmLoading: true});

      const {valid} = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();
      await saveOrUpdate(values);
      modalApi.close();
      emit('success');
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }
  defineExpose(modalApi);
</script>
