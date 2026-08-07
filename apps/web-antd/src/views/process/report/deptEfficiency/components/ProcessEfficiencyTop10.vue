<script lang="ts" setup>
import type { EChartsOption } from 'echarts';
import type { Ref } from 'vue';

import { computed, ref, watch } from 'vue';

import { useEcharts } from '@vben/plugins/echarts';

import { processEfficiencyTop10Api } from '#/api/flow/deptEfficiency';
import { isDarkTheme } from '../../shared/reportTheme';

const props = defineProps<{
  searchParams: Record<string, any>;
}>();

const chartRef = ref<HTMLElement | null>(null);
const { setOptions } = useEcharts(chartRef as Ref<HTMLDivElement>);
const loading = ref(false);
const chartData = ref<any>(null);

const options = computed<EChartsOption>(() => {
  if (!chartData.value) return {};

  const isDark = isDarkTheme();
  const textColor = isDark ? '#ffffffd9' : '#000000d9';

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      axisLabel: { color: textColor },
    },
    yAxis: {
      type: 'category',
      data: chartData.value?.yAxis ?? [],
      axisLabel: { color: textColor },
      inverse: true,
    },
    series: [
      {
        type: 'bar',
        data: chartData.value?.data ?? [],
        itemStyle: {
          borderRadius: [0, 4, 4, 0],
          color: '#1890ff',
        },
        label: {
          show: true,
          position: 'right',
          color: textColor,
        },
      },
    ],
  };
});

watch(
  () => props.searchParams,
  async (val) => {
    if (!val || Object.keys(val).length === 0) return;
    loading.value = true;
    try {
      const res = await processEfficiencyTop10Api(val);
      chartData.value = res;
    } finally {
      loading.value = false;
    }
  },
  { deep: true, immediate: true },
);

watch(options, (val) => {
  setOptions(val);
});
</script>

<template>
  <div class="chart-card">
    <div class="chart-title">流程效率 Top10</div>
    <div ref="chartRef" style="height: 400px; width: 100%"></div>
  </div>
</template>
