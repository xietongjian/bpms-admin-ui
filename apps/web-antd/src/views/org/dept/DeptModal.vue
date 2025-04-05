<script lang="ts" setup>
  import { ref, computed, unref, defineEmits, defineExpose } from 'vue';
  import { deptFormSchema } from './dept.data';
  import { saveOrUpdate } from '#/api/org/dept';
  import {useVbenForm} from "#/adapter/form";
  import {useVbenModal} from '@vben/common-ui';
  import { message } from 'ant-design-vue';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      componentProps: {
        class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: deptFormSchema,
    wrapperClass: 'grid-cols-1',
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
          formApi.setValues(values);
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      handleSubmit();
    },
  });

  /*const [registerModal, { setModalProps, closeModal, changeLoading }] = useModalInner(
    async (data) => {
      await resetFields();
      setModalProps({ confirmLoading: true });
      changeLoading(true);
      isUpdate.value = !!data?.isUpdate;
      const treeData = await getCompanies();
      setModalProps({ confirmLoading: false });
      changeLoading(false);
      let formData = data.record;

      if (formData.leaderCode && formData.leaderName) {
        formData.leaderPersonal = [
          {
            name: formData.leaderName,
            code: formData.leaderCode,
          },
        ];
      }
      if (formData.superiorCode && formData.superiorName) {
        formData.superiorPersonal = [
          {
            name: formData.superiorName,
            code: formData.superiorCode,
          },
        ];
      }

      await updateSchema([
        {
          field: 'companyId',
          componentProps: { treeData },
        },
        {
          field: 'code',
          dynamicRules: () => {
            return [
              {
                required: true,
                whitespace: true,
                message: '编码不能为空！',
              },
              {
                pattern: new RegExp(FormValidPatternEnum.SN),
                type: 'string',
                message: '请输入英文或数字！',
              },
              {
                max: 64,
                message: '字符长度不能大于64！',
              },
              ...getBaseDynamicRules({
                id: (unref(isUpdate) && formData && formData.id) || '',
                field: 'code',
                fieldValue: '',
                fieldName: '编码',
              }),
            ];
          },
        },
      ]);

      if (unref(isUpdate)) {
        setFieldsValue({
          ...data.record,
        });
      } else {
        if (formData.companyId) {
          setFieldsValue({
            companyId: formData.companyId,
          });
        }
      }
    },
  );*/

  const getTitle = computed(() => (!unref(isUpdate) ? '新增部门' : '修改部门'));

  async function handleSubmit() {
    try {
      modalApi.setState({loading: true, confirmLoading: true});
      const {valid} = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();

      if (values.leaderPersonal && values.leaderPersonal.length > 0) {
        const personal = values.leaderPersonal[0];
        values.leaderCode = personal.code;
        values.leaderName = personal.name;
      }
      if (values.superiorPersonal && values.superiorPersonal.length > 0) {
        const personal = values.superiorPersonal[0];
        values.superiorCode = personal.code;
        values.superiorName = personal.name;
      }
      delete values.leaderPersonal;
      delete values.superiorPersonal;

      const {success, msg} = await saveOrUpdate(values);
      if(success){
        message.success(msg);
        modalApi.close();
        emit('success');
      } else{
        message.error(msg);
      }
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }
  defineExpose(modalApi);
</script>
<template>
  <BasicModal >
    <BasicForm />
  </BasicModal>
</template>
