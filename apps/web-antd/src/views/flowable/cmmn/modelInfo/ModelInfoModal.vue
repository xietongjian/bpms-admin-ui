<template>
  <BasicModal v-bind="$attrs" >
    <BasicForm />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineExpose, defineEmits } from 'vue';
  // import { BasicModal, useModalInner } from '@/components/Modal';
  // import { BasicForm, Rule, useForm } from '@/components/Form/index';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import {message} from 'ant-design-vue';
  import { modelInfoFormSchema } from './modelInfo.data';
  import { saveOrUpdate, checkEntityExist } from '#/api/flowable/bpmn/modelInfo';
  import { getAll } from '#/api/base/app';
  import {formSchema} from "#/views/bpm/businessFlow/businessFlowApply.data";
  // import { useGo } from '@/hooks/web/usePage';
  // import { CheckExistParams } from '#/api/model/baseModel';
  // import { FormValidPatternEnum } from '@/enums/constantEnum';

  const emit = defineEmits(['success', 'register']);

  // const go = useGo();

/*  const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: modelInfoFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });*/

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      labelWidth: 100,
    },
    schema: modelInfoFormSchema,
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
      handleSubmit();
    },
    onOpenChange: async (isOpen) => {
      if (!isOpen) {
        return null;
      }
      modalApi.setState({loading: true, confirmLoading: true});
      const formData = modalApi.getData();
      let appList = null;
      try {
        appList = await getAll();
      } finally {
      }

      /*await formApi.updateSchema([
        {
          field: 'appSn',
          componentProps: { options: appList, labelField: 'id' },
        },
        {
          field: 'modelKey',
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
                max: 150,
                message: '字符长度不能大于150！',
              },
              ...getBaseDynamicRules({
                id: (unref(isUpdate) && formData && formData.id) || '',
                field: 'modelKey',
                fieldValue: '',
                fieldName: '编码',
              }),
            ];
          },
        },
      ]);*/

      formApi.setValues(formData);

      modalApi.setState({loading: false, confirmLoading: false});
    },
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
        message.success(msg);
        modalApi.close();
        emit('success');
      }else {
        message.error(msg);
      }
      // go("/flowable/bpmn/designer?modelId=" + result.modelId);
      // go({ name: 'BpmnDesigner', query: { modelId: result.modelId } });
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }
</script>
