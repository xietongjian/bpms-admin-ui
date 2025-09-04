<template>
  <ColPage
      :left-max-width="50"
      :left-min-width="10"
      :left-width="15"
      :split-handle="true"
      :split-line="true"
      :resizable="true"
      :left-collapsible="true"
      :auto-content-height="true"
      content-class="h-full">
    <template #left>
      <Tree
          class="h-full overflow-y-auto"
          :loading="treeLoading"
          title="API列表"
          toolbar
          search
          block-node
          showIcon
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
      </Tree>
    </template>
    <div class="h-full">
      <div v-if="!!currentNode" class="bg-card h-full overflow-y-auto">
        <div class="p-2">
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
              <HeaderForm />
            </TabPane>
            <TabPane key="pathVariable" tab="路径参数"
                     v-if="currentNode.pathVariables && currentNode.pathVariables.length>0" force-render>
              <PathVariableForm />
            </TabPane>
            <TabPane key="queryVariable" tab="查询参数"
                     v-if="currentNode.queryVariables && currentNode.queryVariables.length>0" force-render>
              <QueryVariableForm />
            </TabPane>
            <TabPane key="requestBody" tab="请求体" v-if="currentNode.requestBody">
              <RequestBodyForm />
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
              <CodeEditor placeholder="调试结果" v-model:value="responseBody" :mode="MODE.JSON" :disabled="true"/>
            </TabPane>
            <TabPane key="resultCase" tab="响应体示例">
              <CodeEditor placeholder="响应体示例" readonly v-model:value="responseBodyCase" :mode="MODE.JSON" :disabled="true"/>
            </TabPane>
          </Tabs>
        </div>
      </div>
      <div v-else class="h-full flex items-center justify-center bg-card">
        <h3 class="font-bold">请选择一个API进行调试</h3>
      </div>
    </div>
    <!--    <ApiTestingDrawer @register="registerApiTestingDrawer"/>-->
  </ColPage>
</template>
<script lang="ts" setup>
import {nextTick, ref, unref} from 'vue';
import {apiTesting, getApiInfoTreeData} from '#/api/base/apiInfo';
import {Page} from '@vben/common-ui';
import {Alert, Button, Tree, Col, Row, Space, Tabs, Tag} from 'ant-design-vue';
import {CodeEditor, MODE} from '#/components/CodeEditor';
import {ColPage} from '@vben/common-ui';
import {headerFormSchema, pathVariableFormSchema, queryVariableFormSchema, requestBodyFormSchema} from './apiInfo.data';
import {forEach, listToTree} from "#/utils/helper/treeHelper";
import {ApiOutlined, FolderOpenOutlined} from '@ant-design/icons-vue';
import {useVbenForm} from "#/adapter/form";

const treeLoading = ref(true);
const apiTestingErrorMsg = ref("");
const TabPane = Tabs.TabPane;
const apiInfoTreeData = ref<any[]>([]);

const activeParamKey = ref("header");
const activeResultKey = ref("testingResult");

const currentNode = ref<any>(undefined);
const requestBody = ref("");
const responseBody = ref(undefined);
const responseBodyCase = ref(undefined);

/*const [
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
});*/


const [HeaderForm, headerFormApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      // class: 'w-full',
    },
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: headerFormSchema,
  wrapperClass: 'grid-cols-1',
});

/*const [
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
});*/

const [PathVariableForm, pathVariableFormApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      // class: 'w-full',
    },
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: pathVariableFormSchema,
  wrapperClass: 'grid-cols-1',
});


/*const [
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
});*/
const [QueryVariableForm, queryVariableFormApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      // class: 'w-full',
    },
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: queryVariableFormSchema,
  wrapperClass: 'grid-cols-1',
});
const [RequestBodyForm, requestBodyFormApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      // class: 'w-full',
    },
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: requestBodyFormSchema,
  wrapperClass: 'grid-cols-1',
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
  const {setState: resetHeaderSchema } = headerFormApi;
  const {setState: resetPathVariableSchema } = pathVariableFormApi;
  const {setState: resetQueryVariableSchema } = queryVariableFormApi;
  if (apiInfo) {
    if (apiInfo.headers && apiInfo.headers.length > 0) {
      apiInfo.headers.forEach(item => {
        item.component = 'Input';
        item.fieldName = item.field;
      });
      await resetHeaderSchema({schema: apiInfo.headers});
      activeParamKey.value = "header";
    }
    if (apiInfo.pathVariables && apiInfo.pathVariables.length > 0) {
      apiInfo.pathVariables.forEach(item => {
        item.component = 'Input';
        item.rules = 'required';
        item.fieldName = item.field;
      });
      await resetPathVariableSchema({schema: apiInfo.pathVariables});
      activeParamKey.value = unref(activeParamKey) || "pathVariables";
    }
    if (apiInfo.queryVariables && apiInfo.queryVariables.length > 0) {
      apiInfo.queryVariables.forEach(item => {
        item.component = 'Input';
        item.fieldName = item.field;
      });
      await resetQueryVariableSchema({schema: apiInfo.queryVariables});
      activeParamKey.value = unref(activeParamKey) || "queryVariables";
    }

    if (apiInfo.requestBody) {
      requestBody.value = apiInfo.requestBody;
      activeParamKey.value = unref(activeParamKey) || "requestBody";
    } else {
      requestBody.value = '';
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
    debugger;
    apiTestingErrorMsg.value = '';
    const currentApi = unref(currentNode);
    let url = currentApi.url;

    let headerFieldsValue = undefined;
    if (currentApi.headers && currentApi.headers.length > 0) {
      try {
        const {valid} = await headerFormApi.validate();
        if(!valid) return;
        headerFieldsValue = await headerFormApi.getValues();
      } catch (e) {
        activeParamKey.value = 'header';
        return;
      }
    }

    let pathVariableFieldsValue = undefined;
    if (currentApi.pathVariables && currentApi.pathVariables.length > 0) {
      try {
        const {valid} = await pathVariableFormApi.validate();
        if(!valid) return;

        pathVariableFieldsValue = await pathVariableFormApi.getValues();
      } catch (e) {
        activeParamKey.value = 'pathVariable';
        return;
      }
    }

    let queryVariableFieldsValue = undefined;
    if (currentApi.queryVariables && currentApi.queryVariables.length > 0) {
      try {
        const {valid} = await queryVariableFormApi.validate();
        if(!valid) return;

        queryVariableFieldsValue = await queryVariableFormApi.getValues();
      } catch (e) {
        activeParamKey.value = 'queryVariable';
        return;
      }
    }

    const requestBodyValues = await requestBodyFormApi.getValues();
    debugger;
    const body = unref(requestBody);
    let bodyContent = undefined;
    if (body) {
      try {
        bodyContent = JSON.parse(body);
      } catch (e) {
        activeParamKey.value = 'requestBody';
      }
    } else {

    }

    const queryVariables = queryVariableFieldsValue || {};

    if (headerFieldsValue) {

    }
    if (pathVariableFieldsValue) {
      url = resolvePathVariables(currentApi.url, pathVariableFieldsValue);
    }

    // 组装路径上面的参数
    // openFullLoading();
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
    // closeFullLoading();
  } catch (e) {
    console.log(e);
    apiTestingErrorMsg.value = e;
    // closeFullLoading();
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
