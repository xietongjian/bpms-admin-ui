<template>
  <BasicDrawer v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
import { ref, computed, unref, defineEmits, defineExpose } from 'vue';
import { formSchema } from './module.data';
import { saveOrUpdate, checkEntityExist } from '#/api/privilege/module';
import { FormValidPatternEnum } from '#/enums/constantEnum';
import {useVbenForm} from "#/adapter/form";
import {setAccountFormSchema} from "#/views/privilege/group/group.data";
import {useVbenModal, useVbenDrawer} from "@vben/common-ui";

const emit = defineEmits(['success', 'register']);

const isUpdate = ref(true);


const [BasicDrawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onOpenChange(isOpen: boolean) {
    debugger;
    if (isOpen) {
      const values = drawerApi.getData<Record<string, any>>();
      if (values) {
        formApi.setValues(values);
        drawerApi.setState({loading: false, confirmLoading: false});
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
  schema: formSchema,
  wrapperClass: 'grid-cols-1',
});
/*
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
    let moduleType = '';

    if (formData.component === 'LAYOUT') {
      moduleType = 'dictionary';
    } else {
      moduleType = 'menu';
    }
    setFieldsValue({
      ...formData,
      moduleType,
    });
  }
});*/

const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));
async function handleSubmit() {
  try {
    drawerApi.setState({loading: true, confirmLoading: true});
    const valid = await formApi.validate();
    if(!valid){
      return;
    }
    const values = await formApi.getValues();
    if (values.moduleType === 'dictionary') {
      values.component = 'LAYOUT';
      delete values.moduleType;
    }
    if (!values.menuType) {
      values.menuType = 1;
    }
    await saveOrUpdate(values);
    drawerApi.close();
    emit('success');
  } catch (error) {
    console.error(error);
  } finally {
    drawerApi.setState({loading: false, confirmLoading: false});
  }
}
defineExpose(drawerApi)
</script>
