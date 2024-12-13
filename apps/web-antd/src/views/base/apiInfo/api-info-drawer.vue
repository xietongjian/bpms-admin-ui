<template>
  <BasicDrawer
      v-bind="$attrs"
      @register="registerDrawer"
      title="接口编辑"
      width="70%"
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
      <template #headersSlot="{ model, field, disabled }">
        <ApiInfoVariables ref="headersRef" type="header" :variables="model[field]"/>
      </template>
      <template #pathVariablesSlot="{ model, field, disabled }">
        <ApiInfoVariables ref="pathVariablesRef" type="path" :variables="model[field]"/>
      </template>
      <template #queryVariablesSlot="{ model, field, disabled }">
        <ApiInfoVariables ref="queryVariablesRef" type="query" :variables="model[field]"/>
      </template>
      <!--      <template #requestBody="{ model, field, disabled }">
              <ApiInfoVariables :variables="model[field]" />
            </template>-->
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup>
import {ref, unref, defineEmits} from 'vue';
import {BasicDrawer, useDrawerInner} from '@/components/Drawer';

import {BasicForm, useForm} from '@/components/Form';
import {apiInfoFormSchema} from './apiInfo.data';
import {FormItem, FormItemRest, Input, Select} from "ant-design-vue";
import {getApiCategoryListData, getApiCategoryTreeData, saveOrUpdateApiInfo} from '#/api/base/apiInfo';
import { useMessage } from '@/hooks/web/useMessage';

import ApiInfoVariables from "@/views/base/apiInfo/ApiInfoVariables.vue";
const { createMessage } = useMessage();

const headersRef = ref(null);
const pathVariablesRef = ref(null);
const queryVariablesRef = ref(null);

const isUpdate = ref(true);
const emit = defineEmits(['success'])
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
});

async function handleSubmit() {
  try {
    const values = await validate();
    setDrawerProps({confirmLoading: true, loading: true});

    const headersData = await unref(headersRef).handleSubmit();
    const pathVariablesData = await unref(pathVariablesRef).handleSubmit();
    const queryVariablesData = await unref(queryVariablesRef).handleSubmit();

    values.headers = JSON.stringify(headersData);
    values.pathVariables = JSON.stringify(pathVariablesData);
    values.queryVariables = JSON.stringify(queryVariablesData);

    const {success, msg} = await saveOrUpdateApiInfo(values);
    if(success){
      emit('success');
      createMessage.success(msg);
      closeDrawer();
    } else{
      createMessage.error(msg);
    }
  } finally {
    setDrawerProps({loading: false, confirmLoading: false});
  }
}
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
