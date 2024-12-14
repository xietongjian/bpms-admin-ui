<script lang="ts" setup>
import { ref, computed, unref, defineEmits } from 'vue';
import { formSchema } from './companyType.data';
import { saveOrUpdate, checkEntityExist } from '#/api/org/companyType';
import {useVbenForm} from "#/adapter/form";
import {useVbenModal} from '@vben/common-ui';

import {message} from 'ant-design-vue';

const emit = defineEmits(['success', 'register']);

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    labelWidth: 100,
  },
  schema: formSchema,
  showDefaultActions: false,
});

const [BasicModal, modalApi] = useVbenModal({
  fullscreenButton: false,
  onCancel(){

  },
  onConfirm() {},
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }
    modalApi.setState({loading: true, confirmLoading: true});

    const values = modalApi.getData();
    await formApi.setValues(values);
    modalApi.setState({loading: false, confirmLoading: false});
  },
});

/*const [BasicModal, modalApi] = useVbenModal({
  fullscreenButton: false,
  onCancel: handleCancel,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }
    modalApi.modalLoading(true);
    const { id } = modalApi.getData() as { id?: number | string };
    isUpdate.value = !!id;
    if (isUpdate.value && id) {
      const record = await dictTypeInfo(id);
      await formApi.setValues(record);
    }
    modalApi.modalLoading(false);
  },
});*/


/* const [registerForm, { resetFields, updateSchema, setFieldsValue, validate }] = useForm({
   labelWidth: 100,
   schemas: formSchema,
   showActionButtonGroup: false,
 });*/

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
  let formData = data.record;

  await updateSchema([
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
      ...formData,
    });
  }
});*/

async function handleSubmit() {
  try {
    modalApi.setState({loading: true, confirmLoading: true});
    const valid  = await formApi.validate();
    if (!valid) {
      return;
    }
    const values = await formApi.getValues();

    const {success, msg} = await saveOrUpdate(values);
    if (success) {
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
defineExpose(modalApi)
</script>


<template>
  <BasicModal>
    <BasicForm />
  </BasicModal>
</template>
