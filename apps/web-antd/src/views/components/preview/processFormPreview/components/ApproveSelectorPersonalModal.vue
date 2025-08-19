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
        const {actionType, multiple} = values;

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
        debugger;
        formApi.setValues({
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
  } as any;

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
    case 'delegateTask': // 委派
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
    case 'turnTask': // 转办
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
    case 'addsign': // 加签 （true：前加签，false：后加签）
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
    default:
      message.error('未定义的审批功能！')
      modalApi.setState({loading: false, confirmLoading: false})
      break;
  }
}

defineExpose(modalApi)
</script>
