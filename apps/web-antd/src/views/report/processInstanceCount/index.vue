<script setup lang="ts">
  import { RadioGroup, RadioButton, Card } from 'ant-design-vue';
  import { onMounted, ref } from 'vue';
  import dayjs from 'dayjs';
  import type {VxeGridProps} from '#/adapter/vxe-table';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {Recordable} from '@vben/types';
  import { searchFormSchema } from './processInstanceCount.data';
  import OneYearPie from './components/OneYearPie.vue';
  import OneDayLine from '#/views/report/processInstanceCount/components/OneDayLine.vue';
  import SevenDaysBar from '#/views/report/processInstanceCount/components/SevenDaysBar.vue';
  import MonthlyBar from '#/views/report/processInstanceCount/components/MonthlyBar.vue';
  import ThreeMonthlyPie from '#/views/report/processInstanceCount/components/ThreeMonthlyPie.vue';
  import {useVbenForm} from "#/adapter/form";
  import {Page} from '@vben/common-ui';


  const operationType = ref('2');
  const params = ref({
    date: dayjs().format('YYYY-MM-DD'),
  });

/*  const [registerSearchForm, { setFieldsValue, updateSchema, getFieldsValue }] = useForm({
    labelWidth: 80,
    schemas: searchFormSchema,
    showResetButton: false,
    submitButtonOptions: { text: '统计' },
    actionColOptions: { span: 24 },
    submitFunc: resetSearch,
  });*/

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: searchFormSchema,
    wrapperClass: 'grid-cols-1',
  });

  async function resetData() {
    if (operationType.value === '5') {
      return updateSchema([{ field: 'date', componentProps: { picker: 'year', format: 'YYYY' } }]);
    }
    if (operationType.value === '4') {
      return updateSchema([
        { field: 'date', componentProps: { picker: 'month', format: 'YYYY-MM' } },
      ]);
    }
    return updateSchema([
      { field: 'date', componentProps: { picker: 'date', format: 'YYYY-MM-DD' } },
    ]);
  }

  async function resetSearch() {
    const fields = getFieldsValue();
    params.value = { ...fields, modelKey: fields.modelKey?.[0]?.modelKey };
  }

  onMounted(() => {
    // setFieldsValue({ date: params.value.date });
  });
</script>

<template>
  <Page auto-content-height>
    <div class="p-4 h-full flex flex-col">
      <div class="p-4 bg-white" style="padding-bottom: 0">
        <BasicForm class="" >
          <template #opType>
            <RadioGroup v-model:value="operationType" button-style="solid" @change="resetData">
              <!--            <RadioButton value="1">最近24小时</RadioButton>-->
              <RadioButton value="2">最近7天</RadioButton>
              <RadioButton value="3">最近一个月</RadioButton>
              <RadioButton value="4">最近三个月</RadioButton>
              <RadioButton value="5">最近一年</RadioButton>
            </RadioGroup>
          </template>
        </BasicForm>
      </div>

      <div class="mt-4 w-full flex-1 flex">
        <div class="w-[50%]">
          <Card
            title="实例报表统计"
            class="h-full flex flex-col"
            :body-style="{ height: '100%', position: 'relative' }"
          >
            <OneDayLine v-if="operationType === '1'" :params="params" requester="process" />
            <SevenDaysBar v-if="operationType === '2'" :params="params" requester="process" />
            <MonthlyBar v-if="operationType === '3'" :params="params" requester="process" />
            <ThreeMonthlyPie v-if="operationType === '4'" :params="params" requester="process" />
            <OneYearPie v-if="operationType === '5'" :params="params" requester="process" />
          </Card>
        </div>
        <div class="w-[50%] ml-4">
          <Card
            title="任务报表统计"
            class="h-full flex flex-col"
            :body-style="{ height: '100%', position: 'relative' }"
          >
            <OneDayLine v-if="operationType === '1'" :params="params" requester="task" />
            <SevenDaysBar v-if="operationType === '2'" :params="params" requester="task" />
            <MonthlyBar v-if="operationType === '3'" :params="params" requester="task" />
            <ThreeMonthlyPie v-if="operationType === '4'" :params="params" requester="task" />
            <OneYearPie v-if="operationType === '5'" :params="params" requester="task" />
          </Card>
        </div>
      </div>
    </div>
  </Page>
</template>

<style scoped lang="scss">
  ::v-deep(.report-chart) {
    //background-color: #0f375f;
    background-color: var(--sider-dark-bg-color);
  }
  ::v-deep(.report-chart-back) {
    //background-color: #0f375f;
    background-color: #1890ff;
  }
</style>
