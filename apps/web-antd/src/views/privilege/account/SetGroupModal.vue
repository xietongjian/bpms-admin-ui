<template>
  <BasicModal v-bind="$attrs">
    <BasicForm />
  </BasicModal>
</template>
<script lang="ts" setup>
import { defineEmits, defineExpose, nextTick } from 'vue';
import { useVbenModal } from '@vben/common-ui';
import { useVbenForm } from '#/adapter/form';
import { message } from 'ant-design-vue';
import { setGroupFormSchema } from './account.data';
import { allocationRoles } from '#/api/privilege/account';
import { getAllList } from '#/api/privilege/group';

const emit = defineEmits(['success']);

const [BasicForm, baseFormApi] = useVbenForm({
  commonConfig: {
    componentProps: {},
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: setGroupFormSchema,
  wrapperClass: 'grid-cols-1',
});

const [BasicModal, modalApi] = useVbenModal({
  draggable: true,
  async onOpenChange(isOpen: boolean) {
    if (isOpen) {
      modalApi.setState({ confirmLoading: true });
      try {
        // 获取组列表
        const groupList = (await getAllList()) as any[];
        const options = (groupList || []).map((item: any) => ({
          label: item.name,
          value: item.id,
        }));
        // 动态注入 options 和 mode
        baseFormApi.updateSchema([
          {
            fieldName: 'groups',
            componentProps: {
              mode: 'multiple',
              options,
            },
          },
        ]);

        const values = modalApi.getData<Record<string, any>>() || {};
        if (values) {
          const groups = (values.groups || []).map((item: any) => item.id);
          await nextTick();
          baseFormApi.setValues({ ...values, groups });
        }
      } finally {
        modalApi.setState({ confirmLoading: false });
      }
    }
  },
  onConfirm() {
    handleSubmit();
  },
});

async function handleSubmit() {
  try {
    modalApi.setState({ confirmLoading: true });
    const { valid } = await baseFormApi.validate();
    if (!valid) {
      modalApi.setState({ confirmLoading: false });
      return;
    }
    const values = await baseFormApi.getValues();
    const groups = (values.groups || []).map((item: any) => ({ id: item }));
    const { success, msg } = await allocationRoles({ userId: values.id, groups });
    if (success) {
      message.success(msg);
      await modalApi.close();
      emit('success');
    } else {
      message.error(msg);
    }
  } catch (e) {
    console.error(e);
  } finally {
    modalApi.setState({ confirmLoading: false });
  }
}

defineExpose(modalApi);
</script>
