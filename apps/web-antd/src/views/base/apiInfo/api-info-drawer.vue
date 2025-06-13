<template>
  <BasicDrawer
      class="w-[1000px]"
      v-bind="$attrs"
      title="接口编辑"
      showFooter
      @ok="handleSubmit"
  >
    <BasicForm class="apiInfo_form">
      <template #requestParamList="slotProps">
        <div class="w-full min-h-[400px] p-b-10">
          <Tabs v-model:activeKey="activeTab" size="small">
            <TabPane key="1">
              <template #tab>
                Headers<span class="ml-1"
                             v-if="slotProps.field.value?.headers?.length>0">({{ slotProps.field.value?.headers?.length }})</span>
              </template>
              <ApiInfoVariables ref="headersRef" type="header" :variables="slotProps.field.value?.headers"/>
            </TabPane>
            <TabPane key="2">
              <template #tab>
                Query Params<span class="ml-1"
                                  v-if="slotProps.field.value?.pathVariables?.length>0">({{ slotProps.field.value?.pathVariables?.length }})</span>
              </template>
              <ApiInfoVariables ref="pathVariablesRef" type="path" :variables="slotProps.field.value?.pathVariables"/>
            </TabPane>
            <TabPane key="3">
              <template #tab>
                Path Variables<span class="ml-1"
                                    v-if="slotProps.field.value?.queryVariables?.length>0">({{ slotProps.field.value?.queryVariables?.length }})</span>
              </template>
              <ApiInfoVariables ref="queryVariablesRef" type="query"
                                :variables="slotProps.field.value?.queryVariables"/>
            </TabPane>
          </Tabs>
        </div>
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup>
import {ref, unref, defineEmits, defineExpose} from 'vue';
import {useVbenDrawer} from '@vben/common-ui';
import {useVbenForm} from '#/adapter/form';

import {apiInfoFormSchema} from './apiInfo.data';
import {message, Tabs} from "ant-design-vue";
import {saveOrUpdateApiInfo} from '#/api/base/apiInfo';

import ApiInfoVariables from "#/views/base/apiInfo/ApiInfoVariables.vue";

const TabPane = Tabs.TabPane;
const activeTab = ref('1');
const headersRef = ref(null);
const pathVariablesRef = ref(null);
const queryVariablesRef = ref(null);

const emit = defineEmits(['success'])


const [BasicDrawer, drawerApi] = useVbenDrawer({
  destroyOnClose: true,
  onCancel() {
    drawerApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const values = drawerApi.getData<Record<string, any>>();
      if (values) {
        values.requestParamList = {
          headers: JSON.parse(values.headers),
          pathVariables: JSON.parse(values.pathVariables),
          queryVariables: JSON.parse(values.queryVariables),
        };
        values.requestMethodUrl = [values.method, values.url];
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

async function handleSubmit() {
  try {
    const {valid} = await formApi.validate();
    if (!valid) return;

    const values = await formApi.getValues();

    debugger;
    drawerApi.setState({loading: true, confirmLoading: true});

    const headersData = await unref(headersRef)?.handleSubmit();
    const pathVariablesData = await unref(pathVariablesRef)?.handleSubmit();
    const queryVariablesData = await unref(queryVariablesRef)?.handleSubmit();

    values.headers = JSON.stringify(headersData);
    values.pathVariables = JSON.stringify(pathVariablesData);
    values.queryVariables = JSON.stringify(queryVariablesData);

    values.method = values.requestMethodUrl[0];
    values.url = values.requestMethodUrl[1];
    const {success, msg} = await saveOrUpdateApiInfo(values);
    if (success) {
      emit('success');
      message.success(msg);
      drawerApi.close();
    } else {
      message.error(msg);
    }
  } finally {
    drawerApi.setState({loading: false, confirmLoading: false});
  }
}

defineExpose(drawerApi)
</script>
<style lang="scss">
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
