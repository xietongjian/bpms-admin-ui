<script lang="ts" setup>
import { reactive, ref } from 'vue';

import { Page } from '@vben/common-ui';

import {
  Button,
  DatePicker,
  Form,
  FormItem,
  RadioGroup,
  Select,
  Space,
} from 'ant-design-vue';

import DeptEfficiencyNode from './components/DeptEfficiencyNode.vue';
import DeptProcessEfficiency from './components/DeptProcessEfficiency.vue';
import DeptQuality from './components/DeptQuality.vue';
import EnterpriseEfficiency from './components/EnterpriseEfficiency.vue';
import ProcessEfficiencyTop10 from './components/ProcessEfficiencyTop10.vue';
import ProcessVolume from './components/ProcessVolume.vue';

const formState = reactive({
  dateRange: [] as any[],
  dateType: '1', // 1: 按月, 0: 按天
  orgId: undefined as string | undefined,
});

const searchParams = ref<Record<string, any>>({});

const handleSearch = () => {
  const params: Record<string, any> = {
    dateType: formState.dateType,
  };
  if (formState.dateRange?.length === 2) {
    params.startDate = formState.dateRange[0]?.format?.('YYYY-MM-DD') ?? formState.dateRange[0];
    params.endDate = formState.dateRange[1]?.format?.('YYYY-MM-DD') ?? formState.dateRange[1];
  }
  if (formState.orgId) {
    params.orgId = formState.orgId;
  }
  searchParams.value = { ...params };
};
</script>

<template>
  <Page class="dept-efficiency">
    <div class="p-4">
      <Form :model="formState" layout="inline">
        <FormItem label="时间范围">
          <DatePicker.RangePicker
            v-model:value="formState.dateRange"
            :picker="formState.dateType === '0' ? 'date' : 'month'"
            style="width: 240px"
          />
        </FormItem>
        <FormItem label="日期类型">
          <RadioGroup v-model:value="formState.dateType" option-type="button">
            <Radio value="0">按天</Radio>
            <Radio value="1">按月</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem>
          <Space>
            <Button type="primary" @click="handleSearch">查询</Button>
          </Space>
        </FormItem>
      </Form>
    </div>

    <div class="analysis-chart">
      <div class="top-row">
        <EnterpriseEfficiency :search-params="searchParams" />
        <DeptProcessEfficiency :search-params="searchParams" />
        <ProcessEfficiencyTop10 :search-params="searchParams" />
      </div>
      <div class="middle-row">
        <DeptEfficiencyNode :search-params="searchParams" />
        <DeptQuality :search-params="searchParams" />
      </div>
      <div class="bottom-row">
        <ProcessVolume :search-params="searchParams" />
      </div>
    </div>
  </Page>
</template>

<style lang="less" scoped>
@import './index.less';
</style>
