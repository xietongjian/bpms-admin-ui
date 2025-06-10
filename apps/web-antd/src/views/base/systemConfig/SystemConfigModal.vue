<template>
  <BasicModal class="w-[600px]">
    <BasicForm />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { defineEmits, defineExpose} from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from "#/adapter/form";
  import {message} from 'ant-design-vue';
  import { formSchema } from './systemConfig.data';
  import { saveOrUpdate} from '#/api/base/systemConfig';

  const emit = defineEmits(['success']);

  /*const [registerForm, { resetFields, updateSchema, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
  });*/

  /*const getBaseDynamicRules = (params: CheckExistParams) => {
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
  };*/

  /*const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    let formData = data.record;

    await updateSchema([
      {
        field: 'configName',
        componentProps: {
          disabled: unref(isUpdate) && formData.configSn.indexOf('SYS_') !== -1,
        },
      },
      {
        field: 'configSn',
        dynamicRules: () => {
          return [
            {
              required: true,
              whitespace: true,
              message: '标识不能为空！',
            },
            {
              pattern: new RegExp(FormValidPatternEnum.SN),
              type: 'string',
              message: '请输入英文或数字！',
            },
            {
              max: 60,
              message: '字符长度不能大于60！',
            },
            ...getBaseDynamicRules({
              id: (unref(isUpdate) && formData && formData.id) || '',
              field: 'configSn',
              fieldValue: '',
              fieldName: '标识',
            }),
          ];
        },
        componentProps: {
          disabled: unref(isUpdate) && formData.configSn.indexOf('SYS_') !== -1,
        },
      },
      {
        field: 'configKey',
        dynamicRules: () => {
          return [
            {
              required: true,
              whitespace: true,
              message: '配置Key不能为空！',
            },
            {
              pattern: new RegExp(FormValidPatternEnum.SN),
              type: 'string',
              message: '请输入英文或数字！',
            },
            {
              max: 64,
              message: '字符长度不能大于64！',
            },
            ...getBaseDynamicRules({
              id: (unref(isUpdate) && formData && formData.id) || '',
              field: 'configKey',
              fieldValue: '',
              fieldName: '配置Key',
            }),
          ];
        },
      },
    ]);
    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record,
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
    schema: formSchema,
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
      const {success, msg} = await saveOrUpdate(values);
      if(success){
        modalApi.close()
        message.success(msg);
        emit('success');
      }else{
        message.error(msg);
      }
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }

  defineExpose(modalApi);
</script>
