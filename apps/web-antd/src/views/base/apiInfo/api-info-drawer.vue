<template>
  <BasicDrawer
      class="w-[1000px]"
      v-bind="$attrs"
      @register="registerDrawer"
      title="接口编辑"
      showFooter
      @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" class="apiInfo_form">
      <template #urlSlot="{ model, field, disabled }">
        <Input.Group compact>
          <Select
              :disabled="disabled"
              style="width: 100px"
              v-model:value="model[field]"
          >
            <Select.Option value="GET">GET</Select.Option>
            <Select.Option value="POST">POST</Select.Option>
            <Select.Option value="PUT">PUT</Select.Option>
            <Select.Option value="DELETE">DELETE</Select.Option>
          </Select>
          <FormItem name="url" class="local_urlValue" :rules="[{ required: true }]">
            <FormItemRest>
              <Input style="width: 100%;"
                     placeholder="请输入URL"
                     v-model:value="model['url']"
                     :disabled="disabled"
              />
            </FormItemRest>
          </FormItem>
        </Input.Group>
      </template>
      <template #headers="slotProps">
        <ApiInfoVariables ref="headersRef" type="header" :variables="slotProps.field.value"/>
      </template>
      <template #pathVariables="slotProps">
        <ApiInfoVariables ref="pathVariablesRef" type="path" :variables="slotProps.field.value"/>
      </template>
      <template #queryVariables="slotProps">
        <ApiInfoVariables ref="queryVariablesRef" type="query" :variables="slotProps.field.value"/>
      </template>
      <!--      <template #requestBody="{ model, field, disabled }">
              <ApiInfoVariables :variables="model[field]" />
            </template>-->
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup>
import {ref, unref, defineEmits, defineExpose} from 'vue';
import {useVbenDrawer, useVbenModal} from '@vben/common-ui';
import {useVbenForm} from '#/adapter/form';

import {apiInfoFormSchema} from './apiInfo.data';
import {FormItem, FormItemRest, message, Input, Select} from "ant-design-vue";
import {getApiCategoryListData, getApiCategoryTreeData, saveOrUpdateApiInfo} from '#/api/base/apiInfo';

import ApiInfoVariables from "#/views/base/apiInfo/ApiInfoVariables.vue";

const headersRef = ref(null);
const pathVariablesRef = ref(null);
const queryVariablesRef = ref(null);

const isUpdate = ref(true);
const emit = defineEmits(['success'])


const [BasicDrawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const values = drawerApi.getData<Record<string, any>>();
      if (values) {
        formApi.setValues(values);
        drawerApi.setState({loading: false, confirmLoading: false});
      }
    }
  },
  onConfirm() {
    // await formApi.submitForm();
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
  schema: apiInfoFormSchema,
  wrapperClass: 'grid-cols-1',
});
/*
const [
  registerForm,
  {resetFields, updateSchema, getFieldsValue, scrollToField, setFieldsValue, validate},
] = useForm({
  labelWidth: 100,
  schemas: apiInfoFormSchema,
  showActionButtonGroup: false,
});

const [registerDrawer, {setDrawerProps, closeDrawer}] = useDrawerInner(async (data) => {
  try {
    setDrawerProps({loading: true, confirmLoading: true});
    await resetFields();
    isUpdate.value = !!data?.isUpdate;
    let formData = data.record;

    const categoryTreeData = await getApiCategoryTreeData();
    await updateSchema([
      {
        field: 'categoryId',
        componentProps: {treeData: categoryTreeData, fieldNames: {value: 'id', label: 'name'}},
      },
    ]);
    await setFieldsValue(formData);
    scrollToField('categoryId', {behavior: 'smooth'});
  } finally {
    setDrawerProps({loading: false, confirmLoading: false});
  }
});*/

async function handleSubmit() {
  try {
    const valid = await formApi.validate();
    if (!valid) return;

    const values = formApi.getValues();

    drawerApi.setState({loading: true, confirmLoading: true});

    const headersData = await unref(headersRef).handleSubmit();
    const pathVariablesData = await unref(pathVariablesRef).handleSubmit();
    const queryVariablesData = await unref(queryVariablesRef).handleSubmit();

    values.headers = JSON.stringify(headersData);
    values.pathVariables = JSON.stringify(pathVariablesData);
    values.queryVariables = JSON.stringify(queryVariablesData);

    const {success, msg} = await saveOrUpdateApiInfo(values);
    if(success){
      emit('success');
      message.success(msg);
      drawerApi.close();
    } else{
      message.error(msg);
    }
  } finally {
    drawerApi.setState({loading: false, confirmLoading: false});
  }
}
defineExpose(drawerApi)
</script>
<style lang="less">
.apiInfo_form .local_urlValue {
  width: calc(100% - 100px);
  margin-bottom: 0;
  margin-left: -1px;
  border-right: 0;

  .ant-input {
    border-radius: 0 6px 6px 0;
  }
}
</style>
