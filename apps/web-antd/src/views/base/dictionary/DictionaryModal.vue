<template>
  <BasicModal >
    <BasicForm />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { computed, defineEmits, ref, unref, defineExpose } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';

  import {message} from 'ant-design-vue';

  import {dictionaryFormSchema, dictionaryItemFormSchema} from './dictionary.data';
  import { checkEntityExist, saveOrUpdate } from '#/api/base/dictionary';
  import { FormValidPatternEnum } from '#/enums/commonEnum';

  const emit = defineEmits(['success', 'register']);

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
    schema: dictionaryFormSchema,
    wrapperClass: 'grid-cols-1',
  });

/*
  const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: dictionaryFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
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

    await updateSchema([
      {
        field: 'code',
        dynamicRules: () => {
          return [
            {
              whitespace: true,
              required: true,
              message: '编码不能为空！',
            },
            {
              pattern: new RegExp(FormValidPatternEnum.SN),
              type: 'string',
              message: '请输入英文或数字！',
            },
            {
              pattern: new RegExp('^.{1,32}$'),
              type: 'string',
              message: '字符长度不能大于32！',
            },
            ...getBaseDynamicRules({
              id: (unref(isUpdate) && formData && formData.id) || '',
              field: 'code',
              fieldValue: '',
              fieldName: '编码',
            }),
          ];
        },
      },
    ]);
    setFieldsValue({
      ...data.record,
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));
*/

  async function handleSubmit() {
    try {
      modalApi.setState({loading: true, confirmLoading: true});

      const valid = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();
      const {success, msg} = await saveOrUpdateItem(values);
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

  defineExpose(modalApi);
</script>
