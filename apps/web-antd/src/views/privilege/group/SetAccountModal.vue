<script lang="ts" setup>
import {defineEmits, defineExpose} from 'vue';
import {setAccountFormSchema} from './group.data';
import {addUserGroups} from '#/api/privilege/group';
import {useVbenForm} from "#/adapter/form";
import {useVbenModal} from '@vben/common-ui';
import {message} from 'ant-design-vue';

const emit = defineEmits(['success']);

const [BasicModal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      modalApi.setState({loading: true, confirmLoading: true});

      const values = modalApi.getData<Record<string, any>>();
      if (values) {
        const users = values.users?.map(item => {
          return item.id
        });

        setTimeout(() => {
          formApi.setValues({...values, users});
          modalApi.setState({loading: false, confirmLoading: false});
        }, 500)
      }
    }
  },
  onConfirm() {
    // await baseFormApi.submitForm();
    handleSubmit();
  },
});

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      // class: 'w-full',
    },
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: setAccountFormSchema,
  wrapperClass: 'grid-cols-1',
});

async function handleSubmit() {
  try {
    modalApi.setState({loading: true, confirmLoading: true});
    const {valid} = await formApi.validate();
    if (!valid) {
      return;
    }
    const values = await formApi.getValues();
    console.log(values);
    values.users = values.users?.map((item) => {
      return {id: item};
    }) || [];
    values.groupId = values.id;
    delete values.id;

    const {success, msg} = await addUserGroups(values);
    if (success) {
      message.success(msg);
      emit('success');
      modalApi.close();
    } else {
      message.error(msg);
    }
  } finally {
    modalApi.setState({loading: false, confirmLoading: false});
  }
}

defineExpose(modalApi)
</script>
<template>
  <BasicModal class="w-[600px]">
    <BasicForm/>
  </BasicModal>
</template>
