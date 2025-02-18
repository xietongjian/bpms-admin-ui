<template>
  <BasicModal v-bind="$attrs" @register="registerModal" @ok="handleSubmit">
    <BasicForm />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, defineEmits, defineExpose } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  // import { BasicForm, useForm } from '@/components/Form/index';
  import { approveActionFormSchema } from './action.data';
  import {message} from 'ant-design-vue'
  import {
    afterAddSign,
    beforeAddSign,
    delegateTask,
    turnTask,
    reviewTask,
  } from '#/api/flowoperation/processTask';
  import {formSchema} from "#/views/org/jobGrade/jobGrade.data";

  const emit = defineEmits(['success', 'register']);
  const selectorTypeRef = ref('');
  /*const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: approveActionFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });*/

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: approveActionFormSchema,
    wrapperClass: 'grid-cols-1',
  });

  /*const [registerModal, { setModalProps, changeLoading, closeModal }] = useModalInner(
    async (data) => {
      await resetFields();
      setModalProps({confirmLoading: false, loading: false});
      const { actionType, multiple, taskId, procInstId, message } = data.selectorProps;
      selectorTypeRef.value = actionType;

      switch (actionType) {
        case 'reviewTask':
          updatePropsByActionType('流程转阅', '转阅人员', '转阅附言');
          break;
        case 'delegateTask':
          updatePropsByActionType('流程委派', '委派人员', '委派附言');
          break;
        case 'turnTask':
          updatePropsByActionType('流程转办', '转办人员', '转办附言');
          break;
        case 'addsign':
          updatePropsByActionType('流程加签', '加签人员', '加签附言');
          break;
      }

      setFieldsValue({
        actionType,
        taskId,
        procInstId,
        message,
      });
      setModalProps({ confirmLoading: false });
    },
  );*/



  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          // formApi.setValues(values);
          modalApi.setState({loading: false, confirmLoading: false});
          const { actionType, multiple, taskId, procInstId, approveMsg } = values;

          switch (actionType) {
            case 'reviewTask':
              updatePropsByActionType('流程转阅', '转阅人员', multiple, '转阅附言');
              break;
            case 'delegateTask':
              updatePropsByActionType('流程委派', '委派人员', multiple, '委派附言');
              break;
            case 'turnTask':
              updatePropsByActionType('流程转办', '转办人员', multiple, '转办附言');
              break;
            case 'addsign':
              updatePropsByActionType('流程加签', '加签人员', multiple, '加签附言');
              break;
          }
          formApi.setValues({
            message: approveMsg,
            actionType,
            taskId,
            procInstId,
          });
        }
      }
    },
    onConfirm() {
      // await formApi.submitForm();
      handleSubmit();
    },
  });

  const updatePropsByActionType = (title, actionPersonalLabel, multiple, messageLabel) => {
    const {updateSchema} = formApi;
    modalApi.setState({ title: title });
    updateSchema([
      {
        fieldName: 'actionPersonal',
        label: actionPersonalLabel,
        componentProps: {
          multiple: !!multiple,
        },
      },
      {
        fieldName: 'message',
        label: messageLabel,
      }
    ]);
  };

  function closeCurrModal() {
    // setModalProps({ confirmLoading: false });
    // changeLoading(false);
    // closeModal();
    modalApi.close();
    emit('success');
  }

  async function handleSubmit() {
    const defaultMsg = '网络异常，请稍后再试！';
    debugger;
    try {
      const {valid} = await formApi.validate();
      if(!valid){
        return;
      }
      modalApi.setState({loading: true, confirmLoading: true})

      const values = await formApi.getValues();
      const params = {
        taskId: values.taskId,
        processInstanceId: values.procInstId,
        message: values.message,
      };
      switch (values.actionType) {
        case 'reviewTask': // 转阅
          // 设置转阅给哪些人
          params['transferToUserNos'] = values.actionPersonal.map((item) => item.code);
          reviewTask(params)
            .then((res) => {
              const result = res.data;
              if (result.success) {
                message.success(result.msg);
                closeCurrModal();
              } else {
                message.error(result.msg || defaultMsg);
                modalApi.setState({loading: false, confirmLoading: false})
              }
            })
            .catch(() => {
              message.error(defaultMsg);
              modalApi.setState({loading: false, confirmLoading: false})
            })
            .finally(() => {});
          break;
        case 'delegateTask':
          params['delegateUserCode'] = values.actionPersonal.map((item) => item.code)[0];
          delegateTask(params)
            .then((res) => {
              const result = res.data;
              if (result.success) {
                message.success(result.msg);
                closeCurrModal();
              } else {
                message.error(result.msg || defaultMsg);
                modalApi.setState({loading: false, confirmLoading: false})
              }
            })
            .catch(() => {
              message.error(defaultMsg);
              modalApi.setState({loading: false, confirmLoading: false})
            })
            .finally(() => {});
          break;
        case 'turnTask':
          params['turnToUserId'] = values.actionPersonal.map((item) => item.code)[0];
          turnTask(params)
            .then((res) => {
              const result = res.data;
              if (result.success) {
                message.success(result.msg);
                closeCurrModal();
              } else {
                message.error(result.msg || defaultMsg);
                modalApi.setState({loading: false, confirmLoading: false})
              }
            })
            .catch(() => {
              message.error(defaultMsg);
              modalApi.setState({loading: false, confirmLoading: false})

            })
            .finally(() => {});
          break;
        case 'addsign':
          params['signPersonals'] = values.actionPersonal.map(item => item.code);
          if (values.signType) {
            beforeAddSign(params).then(res => {
              const result = res.data;
              if (result.success) {
                message.success(result.msg, 1, () => {
                  closeCurrModal();
                })
                // go("/process/todo");
              } else {
                message.error(result.msg || defaultMsg)
              }
            }).catch(() => {
              message.error(defaultMsg)
            }).finally(() => {
              modalApi.setState({loading: false, confirmLoading: false})
            });
          } else {
            afterAddSign(params).then(res => {
              const result = res.data;
              if (result.success) {
                message.success(result.msg, 1, () => {
                  closeCurrModal();
                })
              } else {
                message.error(result.msg || defaultMsg)
              }
            }).catch(() => {
              message.error(defaultMsg)
            }).finally(() => {
              modalApi.setState({loading: false, confirmLoading: false})
            });
          }
          break;
        case 'afterAddSign':
          params['signPersonals'] = values.actionPersonal.map((item) => item.code);
          afterAddSign(params)
            .then((res) => {
              const result = res.data;
              if (result.success) {
                message.success(result.msg);
                closeCurrModal();
              } else {
                message.error(result.msg || defaultMsg);
                modalApi.setState({loading: false, confirmLoading: false})
              }
            })
            .catch(() => {
              message.error(defaultMsg);
              modalApi.setState({loading: false, confirmLoading: false})
            })
            .finally(() => {});
          break;
        case 'beforeAddSign':
          params['signPersonals'] = values.actionPersonal.map((item) => item.code);
          beforeAddSign(params)
            .then((res) => {
              const result = res.data;
              if (result.success) {
                debugger
                message.success(result.msg);
                closeCurrModal();
              } else {
                message.error(result.msg || defaultMsg);
                modalApi.setState({loading: false, confirmLoading: false})
              }
            })
            .catch(() => {
              message.error(defaultMsg);
              modalApi.setState({loading: false, confirmLoading: false})
            })
            .finally(() => {});
          break;
      }
    } catch(e){
      modalApi.setState({loading: false, confirmLoading: false})

    } finally {
      modalApi.setState({loading: false, confirmLoading: false})
    }
  }

  defineExpose(modalApi)
</script>
