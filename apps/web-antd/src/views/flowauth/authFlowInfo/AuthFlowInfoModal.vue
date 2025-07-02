<template>
  <BasicModal class="w-[800px]" >
    <BasicForm />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { defineEmits, defineExpose, ref } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import {message} from 'ant-design-vue';
  import {useVbenForm} from '#/adapter/form';
  import { formSchema } from './authFlowInfo.data';
  import { saveOrUpdate } from '#/api/flowauth/authFlowInfo';
  import dayjs, { Dayjs } from 'dayjs';
  import { cloneDeep } from '@vben/utils';

  const emit = defineEmits(['success', 'register']);

  /*const [registerForm, { resetFields, updateSchema, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
    fieldMapToTime: [['dateRange', ['startTime', 'endTime'], 'YYYY-MM-DD']],
  });

  const [registerModal, { setModalProps, changeLoading, closeModal }] = useModalInner(
    async (data) => {
      await resetFields();
      isUpdate.value = !!data?.isUpdate;
      let formData = data.record ? JSON.parse(JSON.stringify(data.record)) : {};
      setModalProps({ confirmLoading: false });

      formData.dateRange = [formData.startTime, formData.endTime];
      formData.authUser = [{ code: formData.authUser, name: formData.authUserName }];
      formData.currUser = [{ code: formData.currUser, name: formData.currUserName }];

      if (formData.authType === '1') {
        // await updateSchema([{
        //   field: 'authFlowKeys',
        //   required: false,
        // }])
        formData.authFlowKeys = [];
      } else {
        // await updateSchema([{
        //   field: 'authFlowKeys',
        //   required: true,
        // }]);
        if (formData.authFlowKeys) {
          const modelInfos =
            typeof formData.authFlowKeys === 'string'
              ? JSON.parse(formData.authFlowKeys)
              : formData.authFlowKeys;
          const tempModelInfos = modelInfos
            ? modelInfos.map((item) => {
                return { modelKey: item.modelKey, name: item.modelName };
              })
            : [];
          formData.authFlowKeys = tempModelInfos;
        } else {
          formData.authFlowKeys = [];
        }
      }
      if (unref(isUpdate)) {
        setTimeout(() => {
          setFieldsValue({
            ...formData,
          });
        }, 100);
      }
    },
  );*/

  const [BasicForm, formApi] = useVbenForm({
    // 所有表单项共用，可单独在表单内覆盖
    commonConfig: {
      // 所有表单项
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: formSchema,
    wrapperClass: 'grid-cols-1',
    fieldMappingTime: [['dateRange', ['startTime', 'endTime'], 'YYYY-MM-DD']],

  });
  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const dt = modalApi.getData<Record<string, any>>();
        if (dt) {
          const values = cloneDeep(dt);
          values.authUser = values.authUser ? [{ value: values.authUser, label: values.authUserName }] : [];
          values.currUser = values.currUser? [{ value: values.currUser, label: values.currUserName }]: [];

          values.dateRange = [dayjs(values.startTime), dayjs(values.endTime)];
          if (values.authType === '1') {
            values.authFlowKeys = [];
          } else {
            if (values.authFlowKeys) {
              const modelInfos =
                  typeof values.authFlowKeys === 'string'
                      ? JSON.parse(values.authFlowKeys)
                      : values.authFlowKeys;
              const tempModelInfos = modelInfos
                  ? modelInfos.map((item) => {
                    return {modelKey: item.modelKey, name: item.modelName, value: item.modelKey, label: item.modelName};
                  })
                  : [];
              values.authFlowKeys = tempModelInfos;
            } else {
              values.authFlowKeys = [];
            }
          }
          formApi.setValues(values);
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      handleSubmit();
    },
  });

  async function handleSubmit() {
    try {
      modalApi.setState({loading: true, confirmLoading: true});
      const { valid } = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();

      // 授权给xx用户
      if (values.authUser) {
        values.authUser = values.authUser[0].code;
      }
      // 当前用户
      if (values.currUser) {
        values.currUser = values.currUser[0].code;
      }

      if (values.authType === '1') {
        values.authFlowKeys = '';
      } else {
        // 组装授权流程的JSON数据[{modelKey: name}, {modelKey: name}]
        const authFlow = values.authFlowKeys;
        if (authFlow && authFlow.length > 0) {
          let authFlowKeys = authFlow.map((item) => {
            return { modelKey: item.modelKey, modelName: item.name };
          });
          values.authFlowKeys = JSON.stringify(authFlowKeys);
        }
      }
      const {success, msg, data} = await saveOrUpdate(values);

      if (success) {
        message.success(msg);
        modalApi.close();
        emit('success');
      } else {
        message.error(msg);
      }
    } finally {
      modalApi.setState({loading: true, confirmLoading: true});
    }
  }

  defineExpose(modalApi);
</script>
