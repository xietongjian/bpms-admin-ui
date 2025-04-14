<script lang="ts" setup>
  import { defineEmits, defineExpose } from 'vue';
  import { setAccountFormSchema } from './group.data';
  import { addUserGroups } from '#/api/privilege/group';
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
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          const users = values.users?.map(item => {
            return item.id
          });
          formApi.setValues({...values, users});
          modalApi.setState({loading: false, confirmLoading: false});
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

  /*const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: setAccountFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });*/
  /*const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();

    setModalProps({
      confirmLoading: false,
      title: '给组【' + data.record.name + '(' + data.record.sn + ')】分配用户',
    });
    isUpdate.value = !!data?.isUpdate;
    const accountList = (await getAllList()) as any;

    updateSchema([
      {
        label: '选择用户',
        field: 'users',
        component: 'ApiSelect',
        labelWidth: 65,
        componentProps: {
          options: accountList,
          mode: 'multiple',
        },
      },
    ]);

    accountList.forEach((item) => {
      item.label = item.realName + '(' + item.username + ')';
      item.value = item.id;
    });
    accountOptions.value = accountList;
    if (unref(isUpdate)) {
      let users = data.record.users || [];
      users = users.map((item) => {
        return item.id;
      });
      setFieldsValue({
        ...data.record,
        users,
      });
    }
  });*/

  // let getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));

  async function handleSubmit() {
    try {
      modalApi.setState({loading: true, confirmLoading: true});
      const {valid} = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();
      console.log(values);
      values.users = values.users?.map((item) => {
        return { id: item };
      })||[];
      values.groupId = values.id;
      delete values.id;

      const {success, msg} = await addUserGroups(values);
      if(success){
        message.success(msg);
        emit('success');
        modalApi.close();
      } else{
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
    <BasicForm />
  </BasicModal>
</template>
