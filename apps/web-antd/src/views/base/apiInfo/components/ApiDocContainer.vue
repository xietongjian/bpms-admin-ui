<template>
  <div class="api-container">
    <div class="mb-2 flex items-center">
      <h1 class="text-xl font-bold flex items-center gap-2">
        {{ detail.name }}
      </h1>
    </div>

    <div class="mb-4">
      <h2 class="text-lg font-bold">基本信息</h2>
      <p class="flex items-center">
        <span class="font-bold text-nowrap">请求方式</span>
        <Tag color="processing">{{ detail.method }}</Tag>
      </p>
      <p class="flex items-center">
        <span class="font-bold text-nowrap">请求地址</span>
        <Tag class="break-all text-wrap" color="processing">{{ detail.url }}</Tag>
      </p>
      <div class="flex">
        <span class="whitespace-nowrap pt-1 font-bold">描述</span>
        <div class="flex-1 pl-2">
          <pre class="whitespace-pre-wrap">{{ detail.remark || '' }}</pre>
        </div>
      </div>
    </div>

    <div class="mb-4" v-if="detail.headersJSON && detail.headersJSON.length > 0">
      <h2 class="text-lg font-bold">请求头</h2>
      <Table bordered size="small" :pagination="false" :data-source="detail.headersJSON" :columns="commonColumns"/>
    </div>

    <div class="mb-4" v-if="detail.pathVariablesJSON && detail.pathVariablesJSON.length > 0">
      <h2 class="text-lg font-bold">路径参数</h2>
      <Table bordered size="small" :pagination="false" :data-source="detail.pathVariablesJSON" :columns="commonColumns"/>
    </div>

    <div class="mb-4" v-if="detail.queryVariablesJSON && detail.queryVariablesJSON.length > 0">
      <h2 class="text-lg font-bold">查询参数</h2>
      <Table bordered size="small" :pagination="false" :data-source="detail.queryVariablesJSON" :columns="commonColumns"/>
    </div>

    <div class="mb-4" v-if="detail.requestBody">
      <h2 class="text-lg font-bold">请求体</h2>
      <Tabs class="w-full">
        <TabPane key="caseRequestBody" tab="示例">
          <pre class="bg-gray-50 p-3 rounded text-sm overflow-auto max-h-80">{{ detail.requestBody }}</pre>
        </TabPane>
      </Tabs>
    </div>

    <div class="mb-4" v-if="detail.responseBodyCase || detail.responseFieldDescription">
      <h2 class="text-lg font-bold">响应</h2>
      <Tabs>
        <TabPane key="caseBodyCase" tab="示例" v-if="detail.responseBodyCase">
          <pre class="bg-gray-50 p-3 rounded text-sm overflow-auto max-h-80">{{ detail.responseBodyCase }}</pre>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { Table, Tag, Tabs } from 'ant-design-vue';

const TabPane = Tabs.TabPane;

const props = defineProps({
  detail: {
    type: Object,
    default: null,
  },
});

const commonColumns = [
  { title: '字段名', dataIndex: 'field', key: 'field' },
  { title: '描述', dataIndex: 'label', key: 'label' },
  {
    title: '是否必填',
    dataIndex: 'required',
    key: 'required',
    customRender: ({ record }: any) => {
      const required = record.required === true;
      const color = required ? 'green' : 'default';
      const text = required ? '是' : '否';
      return h(Tag, { color }, () => text);
    },
  },
  { title: '默认值', dataIndex: 'defaultValue', key: 'defaultValue' },
  { title: '备注', dataIndex: 'helpMessage', key: 'helpMessage' },
];
</script>

<style scoped></style>
