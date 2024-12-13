<template>
  <Page auto-content-height>
    <div class="p-4 h-full">
      <SplitPane>
        <template #left>
          <BasicTree
              :loading="treeLoading"
              title="API列表"
              toolbar
              search
              treeWrapperClassName="h-[calc(100%-35px)] overflow-auto"
              :clickRowToExpand="false"
              :treeData="apiInfoTreeData"
              @select="handleSelect"
              ref="basicTreeRef"
          >
            <template #icon="item">
              <FolderOpenOutlined v-if="item.type === 'category'" style="color: #105bfe;"/>
              <span v-else>
                <ApiOutlined style="color: green;"/>
              </span>
            </template>
          </BasicTree>
        </template>
        <template #main>
          <ScrollContainer v-if="!!currentNode" class="bg-white">
            <div class="">
              <Alert type="success">
                <template #message>
                  <Row align="middle">
                    <Col span="20">
                      <h3>{{ currentNode.name }}</h3>
                      <div>
                        <Space>
                          <span>{{ currentNode.url }}</span>
                          <Tag color="#0f0">{{ currentNode.method }}</Tag>
                        </Space>
                      </div>
                    </Col>
                    <Col span="4" class="text-right">
                      <Button @click="handleTesting" type="primary">开始调试</Button>
                    </Col>
                  </Row>
                </template>
              </Alert>
            </div>
            <div class="p-2">
              <Tabs v-model:activeKey="activeParamKey">
                <TabPane key="header" tab="请求头" v-if="currentNode.headers && currentNode.headers.length>0"
                         force-render>
                  <BasicForm @register="registerHeaderForm"/>
                </TabPane>
                <TabPane key="pathVariable" tab="路径参数"
                         v-if="currentNode.pathVariables && currentNode.pathVariables.length>0" force-render>
                  <BasicForm @register="registerPathVariableForm"/>
                </TabPane>
                <TabPane key="queryVariable" tab="查询参数"
                         v-if="currentNode.queryVariables && currentNode.queryVariables.length>0" force-render>
                  <BasicForm @register="registerQueryVariableForm"/>
                </TabPane>
                <TabPane key="requestBody" tab="请求体" v-if="currentNode.requestBody">
                  <CodeEditor v-model:value="requestBody" :mode="MODE.JSON"/>
                </TabPane>
              </Tabs>
            </div>

            <div v-if="apiTestingErrorMsg" class="mt-2 p-2">
              <Alert type="error">
                <template #message>
                  {{ apiTestingErrorMsg }}
                </template>
              </Alert>
            </div>

            <div class="mt-0 p-2 !pt-0">
              <Tabs v-model:activeKey="activeResultKey">
                <TabPane key="testingResult" tab="调试结果">
                  <CodeEditor v-model:value="responseBody" :mode="MODE.JSON"/>
                </TabPane>
                <TabPane key="resultCase" tab="响应体示例">
                  <CodeEditor readonly v-model:value="responseBodyCase" :mode="MODE.JSON"/>
                </TabPane>
              </Tabs>
            </div>
          </ScrollContainer>
          <div v-else class="h-full flex items-center justify-center bg-white">
            <h3 class="font-bold">请选择一个API进行调试</h3>
          </div>
        </template>
      </SplitPane>
    </div>
    <!--    <ApiTestingDrawer @register="registerApiTestingDrawer"/>-->
  </Page>
</template>
<script lang="ts" setup>
import {nextTick, ref, unref} from 'vue';
import {apiTesting, getApiInfoTreeData} from '#/api/base/apiInfo';
import {Page} from '@vben/common-ui';
import {Alert, Button, Col, Row, Space, Tabs, Tag} from 'ant-design-vue';
import {CodeEditor, MODE} from '@/components/CodeEditor';
import {BasicForm, useForm} from '@/components/Form';

import SplitPane from '@/views/components/splitPane/index.vue';
import {headerFormSchema, pathVariableFormSchema, queryVariableFormSchema} from './apiInfo.data';
import {BasicTree, TreeItem} from "@/components/Tree";
// import {useDrawer} from "@/components/Drawer";
// import ApiTestingDrawer from './ApiTestingDrawer.vue';
import ScrollContainer from "@/components/Container/src/ScrollContainer.vue";
import {forEach, listToTree} from "@/utils/helper/treeHelper";
import {useLoading} from '@/components/Loading';
import {ApiOutlined, FolderOpenOutlined} from '@ant-design/icons-vue';

const treeLoading = ref(true);
const apiTestingErrorMsg = ref("");
const TabPane = Tabs.TabPane;
// const [registerApiTestingDrawer, {openDrawer: openApiTestingDrawer, setDrawerProps: setApiTestingDrawerProps}] = useDrawer();
const [openFullLoading, closeFullLoading] = useLoading({
  tip: '存在执行...',
});
const apiInfoTreeData = ref<TreeItem[]>([]);

const activeParamKey = ref("header");
const activeResultKey = ref("testingResult");

const currentNode = ref(undefined);
const requestBody = ref("");
const responseBody = ref(undefined);
const responseBodyCase = ref(undefined);

const [
  registerHeaderForm,
  {
    resetFields: resetHeaderFields,
    updateSchema: updateHeaderSchema,
    resetSchema: resetHeaderSchema,
    getFieldsValue: getHeaderFieldsValue,
    setFieldsValue: setHeaderFieldsValue,
    validate: validateHeader
  },
] = useForm({
  labelWidth: 300,
  layout: 'vertical',
  wrapperCol: {span: 22},
  schemas: headerFormSchema,
  showActionButtonGroup: false,
});

const [
  registerPathVariableForm,
  {
    resetFields: resetPathVariableFields,
    updateSchema: updatePathVariableSchema,
    resetSchema: resetPathVariableSchema,
    getFieldsValue: getPathVariableFieldsValue,
    setFieldsValue: setPathVariableFieldsValue,
    validate: validatePathVariable
  },
] = useForm({
  labelWidth: 300,
  layout: 'vertical',
  wrapperCol: {span: 22},
  schemas: pathVariableFormSchema,
  showActionButtonGroup: false,
});
const [
  registerQueryVariableForm,
  {
    resetFields: resetQueryVariableFields,
    updateSchema: updateQueryVariableSchema,
    resetSchema: resetQueryVariableSchema,
    getFieldsValue: getQueryVariableFieldsValue,
    setFieldsValue: setQueryVariableFieldsValue,
    validate: validateQueryVariable
  },
] = useForm({
  labelWidth: 300,
  layout: 'vertical',
  wrapperCol: {span: 22},
  schemas: queryVariableFormSchema,
  showActionButtonGroup: false,
});

fetchApiInfoTreeData();

async function fetchApiInfoTreeData() {
  treeLoading.value = true;
  const res = await getApiInfoTreeData();

  const treeData = listToTree(res);

  forEach(treeData, (item) => {
    if (item.children.length === 0) {
      delete item.children;
    }
  });
  console.table(treeData)
  apiInfoTreeData.value = treeData;
  treeLoading.value = false;
}

async function initApiTestingInfo() {
  activeParamKey.value = "";
  const apiInfo = unref(currentNode);
  if (apiInfo) {
    if (apiInfo.headers && apiInfo.headers.length > 0) {
      apiInfo.headers.forEach(item => {
        item.colProps = {span: 12};
        item.component = 'Input';
      });
      await resetHeaderSchema(apiInfo.headers);
      activeParamKey.value = "header";
    }
    if (apiInfo.pathVariables && apiInfo.pathVariables.length > 0) {
      apiInfo.pathVariables.forEach(item => {
        item.colProps = {span: 12};
        item.component = 'Input';
        item.required = true;
      });
      await resetPathVariableSchema(apiInfo.pathVariables);
      activeParamKey.value = unref(activeParamKey) || "pathVariables";
    }
    if (apiInfo.queryVariables && apiInfo.queryVariables.length > 0) {
      apiInfo.queryVariables.forEach(item => {
        item.colProps = {span: 12};
        item.component = 'Input';
      });
      await resetQueryVariableSchema(apiInfo.queryVariables);
      activeParamKey.value = unref(activeParamKey) || "queryVariables";
    }

    if (apiInfo.requestBody) {
      requestBody.value = apiInfo.requestBody;
      activeParamKey.value = unref(activeParamKey) || "requestBody";
    }
    if (apiInfo.responseBodyCase) {
      responseBodyCase.value = apiInfo.responseBodyCase;
    }
  }
}


function resolvePathVariables(path, variables) {
  return path.replace(/\{(\w+)\}/g, function (match, key) {
    return variables[key] || match;
  });
}

async function handleTesting() {
  try {
    apiTestingErrorMsg.value = '';
    const currentApi = unref(currentNode);
    let url = currentApi.url;

    let headerFieldsValue = undefined;
    if (currentApi.headers && currentApi.headers.length > 0) {
      try {
        headerFieldsValue = await validateHeader();
      } catch (e) {
        activeParamKey.value = 'header';
        return;
      }
    }

    let pathVariableFieldsValue = undefined;
    if (currentApi.pathVariables && currentApi.pathVariables.length > 0) {
      try {
        pathVariableFieldsValue = await validatePathVariable();
      } catch (e) {
        activeParamKey.value = 'pathVariable';
        return;
      }
    }

    let queryVariableFieldsValue = undefined;
    if (currentApi.queryVariables && currentApi.queryVariables.length > 0) {
      try {
        queryVariableFieldsValue = await validateQueryVariable();
      } catch (e) {
        activeParamKey.value = 'queryVariable';
        return;
      }
    }
    const body = unref(requestBody);
    let bodyContent = undefined;
    if (body) {
      try {
        bodyContent = JSON.parse(body);
      } catch (e) {
        activeParamKey.value = 'requestBody';
      }
    }

    const queryVariables = queryVariableFieldsValue || {};

    if (headerFieldsValue) {

    }
    if (pathVariableFieldsValue) {
      url = resolvePathVariables(currentApi.url, pathVariableFieldsValue);
    }

    // 组装路径上面的参数
    openFullLoading();
    const {data, status} = await apiTesting({
      url: url,
      method: currentApi.method,
      headers: headerFieldsValue,
      requestBody: bodyContent,
      params: queryVariables
    });
    debugger;
    if (status === 200) {

    }
    responseBody.value = data;
    closeFullLoading();
  } catch (e) {
    console.log(e);
    apiTestingErrorMsg.value = e;
    closeFullLoading();
  }
}

async function handleSelect(node: any, e: any) {
  const selectedNode = e.selectedNodes[0];
  apiTestingErrorMsg.value = '';
  if (selectedNode) {
    if (selectedNode.type === 'api') {
      const {
        id,
        name,
        title,
        url,
        pid,
        type,
        method,
        responseBodyCase,
        headers,
        pathVariables,
        queryVariables,
        requestBody,
      } = selectedNode;
      const apiInfo = {
        id,
        name,
        title,
        url,
        pid,
        type,
        method,
        responseBodyCase,
        headers: !!headers ? JSON.parse(headers) : [],
        pathVariables: !!pathVariables ? JSON.parse(pathVariables) : [],
        queryVariables: !!queryVariables ? JSON.parse(queryVariables) : [],
        requestBody,
      };
      debugger;
      currentNode.value = apiInfo;
      await nextTick();
      setTimeout(() => {
        initApiTestingInfo();
      })
    } else {
      // 展开
    }
  } else {
    // 请选择
    currentNode.value = undefined;
  }

}
</script>
