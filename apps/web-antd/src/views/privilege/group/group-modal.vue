<script lang="ts" setup>
import {defineExpose, defineEmits} from 'vue';
import {useVbenModal} from '@vben/common-ui';
import {message} from 'ant-design-vue';
import {formSchema} from './group.data';
import {useVbenForm} from '#/adapter/form';
import {saveOrUpdate} from '#/api/base/app';

const emit = defineEmits<{
  onSuccess: [void];
}>();

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

const [BasicForm, baseFormApi] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 所有表单项
    componentProps: {
      // class: 'w-full',
    },
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: formSchema,
  wrapperClass: 'grid-cols-1',
});

async function handleSubmit() {
  modalApi.setState({loading: true, confirmLoading: true});
  const {valid} = await baseFormApi.validate();
  if (valid) {
    try {
      const values = await baseFormApi.getValues();
      const {msg, success} = await saveOrUpdate(values);
      if (success) {
        message.success(msg);
        modalApi.close();
        emit('onSuccess');
      } else {
        message.error(msg);
      }
    } catch (e) {
      message.error(e);
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }
  modalApi.setState({loading: false, confirmLoading: false});
}

defineExpose(modalApi)
</script>
<template>
  <BasicModal class="w-[600px]">
    <BasicForm/>
  </BasicModal>
</template>


<!--
<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineEmits } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, Rule, useForm } from '@/components/Form/index';
  import { formSchema } from './group.data';
  import { saveOrUpdate, checkEntityExist } from '@/api/privilege/group';
  import { CheckExistParams } from '@/api/model/baseModel';
  import { FormValidPatternEnum } from '@/enums/constantEnum';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);

  const [registerForm, { resetFields, updateSchema, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const getBaseDynamicRules = (params: CheckExistParams) => {
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

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    let formData = data.record;

    await updateSchema([
      {
        field: 'sn',
        dynamicRules: () => {
          return [
            {
              required: true,
              whitespace: true,
              message: '标识不能为空！',
            },
            {
              trigger: ['change', 'blur'],
              pattern: new RegExp(FormValidPatternEnum.SN),
              type: 'string',
              message: '请输入英文或数字！',
            },
            {
              trigger: ['change', 'blur'],
              max: 64,
              message: '字符长度不能大于64！',
            },
            ...getBaseDynamicRules({
              id: (unref(isUpdate) && formData && formData.id) || '',
              field: 'sn',
              fieldValue: '',
              fieldName: '标识',
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
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      await saveOrUpdate(values);
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
-->
