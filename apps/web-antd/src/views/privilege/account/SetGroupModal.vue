<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineEmits } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { setGroupFormSchema } from './account.data';
  import { allocationRoles } from '@/api/privilege/account';
  import { getAllList } from '@/api/privilege/group';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const title = ref('设置组');

  const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: setGroupFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();

    setModalProps({
      confirmLoading: false,
      title: '给账号【' + data.record.realName + '(' + data.record.username + ')】设置组',
    });
    isUpdate.value = !!data?.isUpdate;

    const groupList = (await getAllList()) as any;
    groupList.forEach((item) => {
      item.label = item.name;
      item.value = item.id;
    });
    updateSchema([
      {
        field: 'groups',
        componentProps: {
          mode: 'multiple',
          options: groupList,
        },
      },
    ]);

    if (unref(isUpdate)) {
      let groups = data.record.groups || [];
      groups = groups.map((item) => {
        return item.id;
      });
      setFieldsValue({
        ...data.record,
        groups,
      });
    }
  });

  let getTitle = computed(() => (!unref(isUpdate) ? '新增' : title.value));

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      const values = await validate();
      values.groups = values.groups.map((item) => {
        return { id: item };
      });
      values.userId = values.id;
      delete values.id;

      await allocationRoles(values);
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
