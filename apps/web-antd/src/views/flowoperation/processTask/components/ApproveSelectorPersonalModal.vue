<template>
  <BasicModal v-bind="$attrs" @register="registerModal" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, defineEmits } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { approveActionFormSchema } from './action.data';
  import {
    afterAddSign,
    beforeAddSign,
    delegateTask,
    turnTask,
    reviewTask,
  } from '@/api/flowoperation/processTask';
  import { useMessage } from '@/hooks/web/useMessage';

  const emit = defineEmits(['success', 'register']);
  const selectorTypeRef = ref('');
  const { createMessage } = useMessage();
  const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: approveActionFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps, changeLoading, closeModal }] = useModalInner(
    async (data) => {
      await resetFields();
      setModalProps({confirmLoading: false, loading: false});
      const { actionType, multiple, taskId, procInstId, message } = data.selectorProps;
      selectorTypeRef.value = actionType;

      const updatePropsByActionType = (title, actionPersonalLabel, messageLabel) => {
        setModalProps({ title: title });
        updateSchema({
          field: 'actionPersonal',
          label: actionPersonalLabel,
          componentProps: {
            multiple: !!multiple,
          },
          colProps: {
            span: 24,
          },
        });
        updateSchema({
          field: 'message',
          label: messageLabel,
          colProps: {
            span: 24,
          },
        });
      };

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
  );

  function closeCurrModal() {
    setModalProps({ confirmLoading: false });
    changeLoading(false);
    closeModal();
    emit('success');
  }

  async function handleSubmit() {
    const defaultMsg = '网络异常，请稍后再试！';
    try {
      setModalProps({ confirmLoading: true });
      const values = await validate();
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
                createMessage.success(result.msg);
                closeCurrModal();
              } else {
                createMessage.error(result.msg || defaultMsg);
                setModalProps({ confirmLoading: false });
                changeLoading(false);
              }
            })
            .catch(() => {
              createMessage.error(defaultMsg);
              setModalProps({ confirmLoading: false });
              changeLoading(false);
            })
            .finally(() => {});
          break;
        case 'delegateTask':
          params['delegateUserCode'] = values.actionPersonal.map((item) => item.code)[0];
          delegateTask(params)
            .then((res) => {
              const result = res.data;
              if (result.success) {
                createMessage.success(result.msg);
                closeCurrModal();
              } else {
                createMessage.error(result.msg || defaultMsg);
                setModalProps({ confirmLoading: false });
                changeLoading(false);
              }
            })
            .catch(() => {
              createMessage.error(defaultMsg);
              setModalProps({ confirmLoading: false });
              changeLoading(false);
            })
            .finally(() => {});
          break;
        case 'turnTask':
          params['turnToUserId'] = values.actionPersonal.map((item) => item.code)[0];
          turnTask(params)
            .then((res) => {
              const result = res.data;
              if (result.success) {
                createMessage.success(result.msg);
                closeCurrModal();
              } else {
                createMessage.error(result.msg || defaultMsg);
                setModalProps({ confirmLoading: false });
                changeLoading(false);
              }
            })
            .catch(() => {
              createMessage.error(defaultMsg);
              setModalProps({ confirmLoading: false });
              changeLoading(false);
            })
            .finally(() => {});
          break;
        case 'addsign':
          params['signPersonals'] = values.actionPersonal.map(item => item.code);
          if (values.signType) {
            beforeAddSign(params).then(res => {
              const result = res.data;
              if (result.success) {
                createMessage.success(result.msg, 1, () => {
                  closeCurrModal();
                })
                // go("/process/todo");
              } else {
                createMessage.error(result.msg || defaultMsg)
              }
            }).catch(() => {
              createMessage.error(defaultMsg)
            }).finally(() => {
              setModalProps({confirmLoading: false, loading: false});
            });
          } else {
            afterAddSign(params).then(res => {
              const result = res.data;
              if (result.success) {
                createMessage.success(result.msg, 1, () => {
                  closeCurrModal();
                })
              } else {
                createMessage.error(result.msg || defaultMsg)
              }
            }).catch(() => {
              createMessage.error(defaultMsg)
            }).finally(() => {
              setModalProps({confirmLoading: false, loading: false});
            });
          }
          break;
        case 'afterAddSign':
          params['signPersonals'] = values.actionPersonal.map((item) => item.code);
          afterAddSign(params)
            .then((res) => {
              const result = res.data;
              if (result.success) {
                createMessage.success(result.msg);
                closeCurrModal();
              } else {
                createMessage.error(result.msg || defaultMsg);
                setModalProps({ confirmLoading: false });
                changeLoading(false);
              }
            })
            .catch(() => {
              createMessage.error(defaultMsg);
              setModalProps({ confirmLoading: false });
              changeLoading(false);
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
                createMessage.success(result.msg);
                closeCurrModal();
              } else {
                createMessage.error(result.msg || defaultMsg);
                setModalProps({ confirmLoading: false });
                changeLoading(false);
              }
            })
            .catch(() => {
              createMessage.error(defaultMsg);
              setModalProps({ confirmLoading: false });
              changeLoading(false);
            })
            .finally(() => {});
          break;
      }
    } catch(e){
      setModalProps({ confirmLoading: false });
    } finally {
      //setModalProps({ confirmLoading: false });
    }
  }

</script>
