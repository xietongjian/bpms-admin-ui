<script lang="ts" setup>
  import { defineComponent, ref, computed, defineEmits, unref } from 'vue';
  // import { BasicModal, useModalInner } from '@/components/Modal';
  // import { BasicForm, Rule, useForm } from '@/components/Form/index';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from "#/adapter/form";

  import { roleFormSchema } from './role.data';
  import { saveOrUpdate, checkEntityExist } from '#/api/org/role';
  import { getCompanies } from '#/api/org/company';
  // import { CheckExistParams } from '#/api/model/baseModel';
  import { FormValidPatternEnum } from '#/enums/constantEnum';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
/*
  const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: roleFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });*/


  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          baseFormApi.setValues(values);
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      // await baseFormApi.submitForm();
      handleSubmit();
    },
  });

  const [BaseForm, baseFormApi] = useVbenForm({
    commonConfig: {
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: roleFormSchema,
    wrapperClass: 'grid-cols-1',
  });



  const getBaseDynamicRules = (params: any) => {
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
  };

  /*const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    const formData = data.record;
    await updateSchema([
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
              pattern: new RegExp(FormValidPatternEnum.FIELD_NAME_SN),
              type: 'string',
              message: '请输入英文或数字（以英文或下划线开头）！',
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

    setFieldsValue({
      ...formData,
    });
  });*/

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      const values = await validate();
      if (values.id) {
        values.companyId = null;
      }
      await saveOrUpdate(values);
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
