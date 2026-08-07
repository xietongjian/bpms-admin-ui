<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Page } from '@vben/common-ui';
import { Card, Statistic, Row, Col, Table as AntdTable, Tag } from 'ant-design-vue';

const columns = [
  { title: '序号', dataIndex: 'index', width: 60 },
  { title: '部门', dataIndex: 'dept', width: 150 },
  { title: '流程总数', dataIndex: 'total', width: 100 },
  { title: '完成数', dataIndex: 'completed', width: 100 },
  { title: '进行中', dataIndex: 'running', width: 100 },
  { title: '效率', dataIndex: 'efficiency', width: 100 },
];

const loading = ref(false);
const dataSource = ref<any[]>([]);

onMounted(() => {
  dataSource.value = [
    { index: 1, dept: '技术部', total: 120, completed: 95, running: 25, efficiency: '79%', key: 1 },
    { index: 2, dept: '财务部', total: 80, completed: 72, running: 8, efficiency: '90%', key: 2 },
    { index: 3, dept: '人事部', total: 45, completed: 38, running: 7, efficiency: '84%', key: 3 },
    { index: 4, dept: '市场部', total: 60, completed: 48, running: 12, efficiency: '80%', key: 4 },
  ];
});
</script>

<template>
  <Page auto-content-height>
    <div class="p-4">
      <Row :gutter="16" class="mb-4">
        <Col :span="6"><Card><Statistic title="流程总数" :value="305" /></Card></Col>
        <Col :span="6"><Card><Statistic title="已完成" :value="253" /></Card></Col>
        <Col :span="6"><Card><Statistic title="进行中" :value="52" /></Card></Col>
        <Col :span="6"><Card><Statistic title="平均效率" value="83%" /></Card></Col>
      </Row>
      <Card title="部门流程效率">
        <AntdTable :columns="columns" :data-source="dataSource" :pagination="false" :loading="loading" />
      </Card>
    </div>
  </Page>
</template>
