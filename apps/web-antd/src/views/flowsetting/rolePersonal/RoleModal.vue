<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineEmits, defineExpose } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  // import { approveBackToStepFormSchema, backToStepTableColumns } from './action.data';

  // import { BasicModal, useModalInner } from '@/components/Modal';
  // import { BasicForm, Rule, useForm } from '@/components/Form/index';
  import { companyRoleFormSchema } from './rolePersonal.data';
  import { saveOrUpdate, checkEntityExist } from '#/api/org/role';
  import { getCompanies } from '#/api/org/company';
  // import { CheckExistParams } from '#/api/model/baseModel';
  // import { FormValidPatternEnum } from '#/enums/commonEnum';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);

/*  const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: companyRoleFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });*/

  /*const getBaseDynamicRules = (params: CheckExistParams) => {
    return [
      {
        trigger: 'blur',
        validator: (_, value) => {
          if (value) {
            return checkEntityExist({
              id: params.id,
              field: params.field,
              fieldValue: value,
              fieldName: params.fieldName,
            })
              .then((res) => {
                if (res) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(params.fieldName + '已存在，请修改！');
                }
              })
              .catch((res) => {
                return Promise.reject(res);
              });
          } else {
            return Promise.resolve();
          }
        },
      },
    ] as Rule[];
  };*/


  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: companyRoleFormSchema,
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
          // loadBackToStepNodes(values.taskId);

          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      // await formApi.submitForm();
      handleSubmit();
    },
  });

  /*const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    let formData = data.record;

    const treeData = await getCompanies();
    await updateSchema([
      {
        field: 'companyId',
        componentProps: { treeData },
      },
      {
        field: 'sn',
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
              field: 'sn',
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
    }
  });*/

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      const {valid} = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();
      await saveOrUpdate(values);
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
  defineExpose(modalApi);
</script>
