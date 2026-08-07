<script lang="ts" setup>
import type { EChartsOption } from 'echarts';
import type { Ref } from 'vue';

import { computed, ref, watch } from 'vue';

import { useEcharts } from '@vben/plugins/echarts';

import { deptProcessVolumeApi } from '#/api/flow/deptEfficiency';
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
      type: 'category',
      data: chartData.value?.xAxis ?? [],
      axisLabel: {
        color: textColor,
        rotate: 30,
      },
    },
    yAxis: {
      type: 'value',
      name: '处理量',
      nameTextStyle: { color: textColor },
      axisLabel: { color: textColor },
    },
    series: [
      {
        type: 'bar',
        data: chartData.value?.data ?? [],
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: '#722ed1',
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
      const res = await deptProcessVolumeApi(val);
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
    <div class="chart-title">部门工作量排名</div>
    <div ref="chartRef" style="height: 350px; width: 100%"></div>
  </div>
</template>
