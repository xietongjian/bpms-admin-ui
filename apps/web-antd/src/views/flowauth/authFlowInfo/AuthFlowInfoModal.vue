<template>
  <BasicModal >
    <BasicForm />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineEmits, defineExpose } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import {message} from 'ant-design-vue';
  import {useVbenForm} from '#/adapter/form';
  import { formSchema } from './authFlowInfo.data';
  import { saveOrUpdate } from '#/api/flowauth/authFlowInfo';
  import { formatToDate } from '#/utils/dateUtil';

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
  });
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
      handleSubmit();
    },
  });


  // const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));

  async function handleSubmit() {
    try {
      modalApi.setState({loading: true, confirmLoading: true});
      const valid = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.validate();

      if (values.authUser) {
        values.authUser = values.authUser[0].code;
      }
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
      const result = await saveOrUpdate(values);

      if (result?.data?.success) {
        message.success(result?.data?.msg);
        modalApi.close();
        emit('success');
      } else {
        message.error(result?.data?.msg);
      }
    } finally {
      modalApi.setState({loading: true, confirmLoading: true});
    }
  }

  defineExpose(modalApi);
</script>
