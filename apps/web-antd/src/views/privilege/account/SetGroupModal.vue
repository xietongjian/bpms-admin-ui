<template>
  <BasicModal v-bind="$attrs" >
    <BasicForm />
  </BasicModal>
</template>
<script lang="ts" setup>
  import {defineEmits, defineExpose } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import { setGroupFormSchema } from './account.data';
  import { allocationRoles } from '#/api/privilege/account';
  import {useVbenForm} from "#/adapter/form";
  import {message} from 'ant-design-vue';

  const emit = defineEmits(['success']);

  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          const groups = values.groups.map(item => item.id);
          baseFormApi.setValues({...values, groups: groups});
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      // await baseFormApi.submitForm();
      handleSubmit();
    },
  });

  const [BasicForm, baseFormApi] = useVbenForm({
    // 所有表单项共用，可单独在表单内覆盖
    commonConfig: {
      // 所有表单项
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: false,
    // 提交函数
    // handleSubmit: onSubmit,
    // 垂直布局，label和input在不同行，值为vertical
    // 水平布局，label和input在同一行
    layout: 'horizontal',
    schema: setGroupFormSchema,
    // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
    wrapperClass: 'grid-cols-1',
  });

  async function handleSubmit() {
    try {
      modalApi.setState({confirmLoading: true});
      const {valid} = await baseFormApi.validate();
      if(!valid){
        return;
      }
      const values = await baseFormApi.getValues();
      values.groups = values.groups.map((item) => {
        return { id: item };
      });
      values.userId = values.id;
      delete values.id;

      const {success, msg} = await allocationRoles(values);
      if(success){
        message.success(msg);
        await modalApi.close();
        emit('success');
      } else {
        message.error(msg);
      }
    } catch (e){
      console.error(e);
    } finally {
      modalApi.setState({confirmLoading: false});
    }
  }

  defineExpose(modalApi)
</script>
