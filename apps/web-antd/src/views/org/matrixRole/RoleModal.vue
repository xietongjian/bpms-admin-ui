<script lang="ts" setup>
import {computed, defineEmits, defineExpose, ref, unref} from 'vue';
import {useVbenModal} from '@vben/common-ui';
import {useVbenForm} from "#/adapter/form";

import {roleFormSchema} from './role.data';
import {saveOrUpdate} from '#/api/org/role';

const emit = defineEmits(['success']);

const isUpdate = ref(true);

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
  schema: roleFormSchema,
  wrapperClass: 'grid-cols-1',
});


/*const getBaseDynamicRules = (params: any) => {
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

async function handleSubmit() {
  try {
    modalApi.setState({loading: true, confirmLoading: true});
    const valid = await formApi.validate();
    if (!valid) {
      return;
    }
    const values = await formApi.getValues();
    if (values.id) {
      values.companyId = null;
    }
    await saveOrUpdate(values);
    modalApi.close();
    emit('success');
  } finally {
    modalApi.setState({loading: false, confirmLoading: false});
  }
}

defineExpose(modalApi)
</script>
<template>
  <BasicModal>
    <BasicForm/>
  </BasicModal>
</template>
