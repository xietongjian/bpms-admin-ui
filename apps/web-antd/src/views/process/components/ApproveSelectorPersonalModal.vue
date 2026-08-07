<template>
  <BasicModal class="w-[800px]">
    <BasicForm class="relative" />
  </BasicModal>
</template>
<script lang="ts" setup>
import { ref, defineExpose, defineEmits } from 'vue';
import { useVbenModal } from '@vben/common-ui';
import { useVbenForm } from '#/adapter/form';
import { approveActionFormSchema } from './action.data';
import { message } from 'ant-design-vue';
import { afterAddSign, beforeAddSign, delegateTask, turnTask, reviewTask } from '#/api/process/process';

const emit = defineEmits(['success']);
const selectorTypeRef = ref('');

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {},
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
        modalApi.setState({ loading: false, confirmLoading: false });
        const { actionType, multiple } = values;
        selectorTypeRef.value = actionType;

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

        formApi.setValues({ ...values });
      }
    }
  },
  onConfirm() {
    handleSubmit();
  },
});

function updatePropsByActionType(title, actionPersonalLabel, multiple, messageLabel) {
  const { updateSchema } = formApi;
  modalApi.setState({ title });
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
    },
  ]);
}

function closeCurrModal() {
  modalApi.close();
  emit('success');
}

async function handleSubmit() {
  const defaultMsg = '网络异常，请稍后再试！';
  const { valid } = await formApi.validate();
  if (!valid) return;

  modalApi.setState({ loading: true, confirmLoading: true });
  const values = await formApi.getValues();
  const params = { taskId: values.taskId, processInstanceId: values.procInstId, message: values.message };

  try {
    switch (values.actionType) {
      case 'reviewTask':
        params['transferToUserNos'] = values.actionPersonal?.map((item) => item.code) || [];
        const reviewRes = await reviewTask(params);
        const reviewData = reviewRes.data;
        if (reviewData.success) {
          message.success(reviewData.msg);
          closeCurrModal();
        } else {
          message.error(reviewData.msg || defaultMsg);
        }
        break;
      case 'delegateTask':
        params['delegateUserCode'] = values.actionPersonal?.map((item) => item.code)[0] || '';
        const delegateRes = await delegateTask(params);
        const delegateData = delegateRes.data;
        if (delegateData.success) {
          message.success(delegateData.msg);
          closeCurrModal();
        } else {
          message.error(delegateData.msg || defaultMsg);
        }
        break;
      case 'turnTask':
        params['turnToUserId'] = values.actionPersonal?.map((item) => item.code)[0] || '';
        const turnRes = await turnTask(params);
        const turnData = turnRes.data;
        if (turnData.success) {
          message.success(turnData.msg);
          closeCurrModal();
        } else {
          message.error(turnData.msg || defaultMsg);
        }
        break;
      case 'addsign':
        params['signPersonals'] = values.actionPersonal?.map((item) => item.code) || [];
        if (values.signType) {
          const beforeRes = await beforeAddSign(params);
          const beforeData = beforeRes.data;
          if (beforeData.success) {
            message.success(beforeData.msg);
            closeCurrModal();
          } else {
            message.error(beforeData.msg || defaultMsg);
          }
        } else {
          const afterRes = await afterAddSign(params);
          const afterData = afterRes.data;
          if (afterData.success) {
            message.success(afterData.msg);
            closeCurrModal();
          } else {
            message.error(afterData.msg || defaultMsg);
          }
        }
        break;
      default:
        message.error('未定义的审批功能！');
        break;
    }
  } catch (e) {
    message.error(defaultMsg);
    console.error(e);
  } finally {
    modalApi.setState({ loading: false, confirmLoading: false });
  }
}

defineExpose(modalApi);
</script>
