<template>
  <BasicModal class="w-[800px]">
    <BasicForm class="relative" />
  </BasicModal>
</template>
<script lang="ts" setup>
import { ref, defineExpose, defineEmits } from 'vue';
import { useVbenModal } from '@vben/common-ui';
import { useVbenForm } from '#/adapter/form';
import { message } from 'ant-design-vue';
import { complete } from '#/api/process/process';

const nextUserPrefix = 'next_user__';
const selectorTypeRef = ref('');

const emit = defineEmits(['success', 'saveForm']);

const [BasicModal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const values = modalApi.getData<Record<string, any>>();
      if (values) {
        const { actionType, taskId, procInstId, message: msg, approveSettings } = values;
        selectorTypeRef.value = actionType;

        let customFields = [];

        if (approveSettings?.flow_to) {
          customFields.push({
            fieldName: 'flowTo',
            label: '流转条件',
            component: 'Select',
            componentProps: {
              options: approveSettings.flow_to.map((item) => ({
                label: item.name,
                value: item.code,
              })),
            },
            required: true,
          });
        }

        if (approveSettings?.next_user) {
          approveSettings.next_user.forEach((item) => {
            customFields.push({
              fieldName: nextUserPrefix + item.code,
              label: item.name,
              component: 'PersonalSelector',
              componentProps: {
                multiple: item.multiple,
              },
              required: true,
            });
          });
        }

        modalApi.setState({ title: '审批' });

        formApi.updateSchema([
          ...customFields,
          {
            fieldName: 'message',
            label: '审批意见',
            component: 'Textarea',
            componentProps: {
              autoSize: {
                minRows: 2,
                maxRows: 8,
              },
            },
          },
          {
            fieldName: 'taskId',
            label: 'taskId',
            component: 'Input',
            dependencies: {
              show: false,
              triggerFields: ['taskId'],
            },
          },
        ]);

        formApi.setValues({
          actionType,
          taskId,
          procInstId,
          message: msg,
        });
        modalApi.setState({ loading: false, confirmLoading: false });
      }
    }
  },
  onConfirm() {
    handleSubmit();
  },
});

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {},
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: [],
  wrapperClass: 'gap-0 grid-cols-1',
});

async function handleSubmit() {
  const defaultMsg = '网络异常，请稍后再试！';
  try {
    modalApi.setState({ loading: true, confirmLoading: true });
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = await formApi.getValues();

    let nextUsers = [];
    for (const item in values) {
      if (item.indexOf(nextUserPrefix) === 0) {
        const personals = values[item];
        nextUsers.push({
          code: item.replace(nextUserPrefix, ''),
          values: personals.map((itm) => itm.code),
        });
      }
    }

    const params = {
      taskId: values.taskId,
      message: values.message,
      nextSequenceFlow: { code: values.flowTo },
      nextUsers,
    };

    emit('saveForm', async (saveFormRes) => {
      if (saveFormRes.success) {
        try {
          const res = await complete(params);
          const result = res.data;
          if (result.success) {
            message.success(result.msg);
            modalApi.close();
            emit('success');
          } else {
            message.error(result.msg || defaultMsg);
          }
        } catch (e) {
          message.error(defaultMsg);
          console.error(e);
        }
      } else {
        message.error(saveFormRes.msg || defaultMsg);
      }
      modalApi.setState({ loading: false, confirmLoading: false });
    });
  } catch (e) {
    message.error(defaultMsg);
    console.error(e);
    modalApi.setState({ loading: false, confirmLoading: false });
  }
}

defineExpose(modalApi);
</script>
