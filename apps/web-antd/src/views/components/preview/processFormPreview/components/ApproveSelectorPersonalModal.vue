<template>
  <BasicModal v-bind="$attrs" class="w-[800px]">
    <BasicForm class="relative"/>
  </BasicModal>
</template>
<script lang="ts" setup>
import {ref, defineEmits, defineExpose} from 'vue';
import {useVbenModal} from '@vben/common-ui';
import {useVbenForm} from '#/adapter/form';
import {approveActionFormSchema} from './action.data';
import {message} from 'ant-design-vue'
import {
  afterAddSign,
  beforeAddSign,
  delegateTask,
  turnTask,
  reviewTask,
} from '#/api/flowoperation/processTask';

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
  wrapperClass: 'gap-0 grid-cols-1',
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
        const {actionType, multiple, taskId, procInstId, approveMsg} = values;

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
          actionType,
          taskId,
          procInstId,
          ...values
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
  modalApi.setState({title: title});
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
  const {valid} = await formApi.validate();
  if (!valid) {
    return;
  }
  modalApi.setState({loading: true, confirmLoading: true})
  const {
    approveMsg, signImg, attachmentList, taskId,
    procInstId, actionPersonal, actionType, signType
  } = await formApi.getValues();

  const commentAttachmentList = attachmentList?.filter(item => item.status === "done" && !!item.response?.data).map(item => {
    return {
      fileName: item.name,
      fileSize: item.size,
      filePath: item.response.data,
      fileType: item.name.split('.').pop().toUpperCase()
    }
  }) || [];

  const params = {
    taskId,
    processInstanceId: procInstId,
    message: approveMsg,
    signatureImg: signImg,
    commentAttachmentList
  };

  switch (actionType) {
    case 'reviewTask': // 转阅
      // 设置转阅给哪些人
      params['transferToUserNos'] = actionPersonal?.map((item) => item.code) || [];
      try {
        const {success, msg} = await reviewTask(params);
        if (success) {
          message.success(msg);
          closeCurrModal();
        } else {
          message.error(msg || defaultMsg);
        }
      } catch (e) {
        message.error(defaultMsg);
        console.error(e);
      } finally {
        modalApi.setState({loading: false, confirmLoading: false})
      }
      break;
    case 'delegateTask':
      params['delegateUserCode'] = actionPersonal?.map((item) => item.code)[0] || '';
      try {
        const {success, msg} = await delegateTask(params);
        if (success) {
          message.success(msg);
          closeCurrModal();
        } else {
          message.error(msg || defaultMsg);
          modalApi.setState({loading: false, confirmLoading: false})
        }
      } catch (e) {
        message.error(defaultMsg);
        console.error(e);
      } finally {
        modalApi.setState({loading: false, confirmLoading: false})
      }
      break;
    case 'turnTask':
      params['turnToUserId'] = actionPersonal?.map((item) => item.code)[0] || '';
      try {
        const {success, msg} = await turnTask(params);
        if (success) {
          message.success(msg);
          closeCurrModal();
        } else {
          message.error(msg || defaultMsg);
          modalApi.setState({loading: false, confirmLoading: false})
        }
      } catch (e) {
        message.error(defaultMsg);
        console.error(e);
      } finally {
        modalApi.setState({loading: false, confirmLoading: false})
      }
      break;
    case 'addsign':
      params['signPersonals'] = actionPersonal?.map(item => item.code) || [];
      if (signType) {
        try {
          const {success, msg} = await beforeAddSign(params);
          if (success) {
            message.success(msg, 1, () => {
              closeCurrModal();
            })
          } else {
            message.error(msg || defaultMsg)
          }
        } catch (e) {
          message.error(defaultMsg)
          console.error(e);
        } finally {
          modalApi.setState({loading: false, confirmLoading: false})
        }
      } else {
        try {
          const {success, msg} = await afterAddSign(params);
          if (success) {
            message.success(msg, 1, () => {
              closeCurrModal();
            })
          } else {
            message.error(msg || defaultMsg)
          }
        } catch (e) {
          message.error(defaultMsg)
          console.error(e)
        } finally {
          modalApi.setState({loading: false, confirmLoading: false})
        }
      }
      break;
    case 'afterAddSign':
      params['signPersonals'] = actionPersonal?.map((item) => item.code) || [];
      try {
        const {success, msg} = await afterAddSign(params);
        if (success) {
          message.success(msg);
          closeCurrModal();
        } else {
          message.error(msg || defaultMsg);
          modalApi.setState({loading: false, confirmLoading: false})
        }
      } catch (e) {
        message.error(defaultMsg);
        console.error(e);
      } finally {
        modalApi.setState({loading: false, confirmLoading: false})
      }
      break;
    case 'beforeAddSign':
      params['signPersonals'] = actionPersonal?.map((item) => item.code) || [];
      try {
        const {success, msg} = await beforeAddSign(params);
        if (success) {
          message.success(msg);
          closeCurrModal();
        } else {
          message.error(msg || defaultMsg);
          modalApi.setState({loading: false, confirmLoading: false})
        }
      } catch (e) {
        message.error(defaultMsg);
        console.error(e);
      } finally {
        modalApi.setState({loading: false, confirmLoading: false})
      }
      break;
  }
}

defineExpose(modalApi)
</script>
