<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineEmits } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import { setGroupFormSchema } from './account.data';
  import { allocationRoles } from '#/api/privilege/account';
  import {useVbenForm} from "#/adapter/form";

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const title = ref('设置组');

  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          const groups = values.groups.map(item => item.sn);
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


  /*const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
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
*/
  let getTitle = computed(() => (!unref(isUpdate) ? '新增' : title.value));

  async function handleSubmit() {
    try {
      modalApi.setState({confirmLoading: true});
      const {valid} = await baseFormApi.validate();

      if(valid){
        const values = await baseFormApi.getValues();
        debugger;
        values.groups = values.groups.map((item) => {
          return { id: item };
        });
        values.userId = values.id;
        delete values.id;

        await allocationRoles(values);
        emit('success');
      }

    } finally {
      modalApi.setState({confirmLoading: false});
    }
  }

  defineExpose(modalApi)
</script>
