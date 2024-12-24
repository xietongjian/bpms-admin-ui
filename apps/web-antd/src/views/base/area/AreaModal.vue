<template>
  <BasicModal>
    <BasicForm />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineEmits, defineExpose } from 'vue';
  import { formSchema } from './area.data';
  import { saveOrUpdate, checkEntityExist } from '#/api/base/area';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import {message} from "ant-design-vue";

  const emit = defineEmits(['success', 'register']);

/*

  const [registerForm, { resetFields, updateSchema, setFieldsValue, validate }] = useForm({
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

  const [registerModal, { setModalProps, closeModal, changeLoading }] = useModalInner(
    async (data) => {
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
                required: true,
                whitespace: true,
                message: '编码不能为空！',
              },
              {
                pattern: new RegExp(FormValidPatternEnum.SN),
                type: 'string',
                message: '请输入英文或数字！',
              },
              {
                max: 10,
                message: '字符长度不能大于10！',
              },
              ...getBaseDynamicRules({
                id: (unref(isUpdate) && formData && formData.code) || '',
                field: 'code',
                fieldValue: '',
                fieldName: '标识',
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
    },
  );
*/

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

  async function handleSubmit() {
    modalApi.setState({loading: true, confirmLoading: true});
    try {
      const valid = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();
      const {success, msg} = await saveOrUpdate(values);
      if(success){
        modalApi.close();
        emit('success');
        message.success(msg);
      }else{
        message.error(msg);
      }
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }

  defineExpose(modalApi)
</script>
