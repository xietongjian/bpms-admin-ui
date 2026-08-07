<script lang="ts" setup>
import type { EChartsOption } from 'echarts';
import type { Ref } from 'vue';

import { computed, ref, watch } from 'vue';

import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

import { assigneeProcessEfficiencyApi } from '#/api/flow/deptEfficiency';
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
  const borderColor = isDark ? '#303030' : '#f0f0f0';

  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      bottom: 0,
      textStyle: { color: textColor },
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor,
          borderWidth: 1,
        },
        label: {
          show: true,
          formatter: '{b}\n{d}%',
        },
        emphasis: {
          label: { show: true, fontSize: 14, fontWeight: 'bold' },
        },
        data: chartData.value?.data ?? [],
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
      const res = await assigneeProcessEfficiencyApi(val);
      chartData.value = res;
    } finally {
      loading.value = false;
    }
  },
  { deep: true, immediate: true },
);
</script>

<template>
  <div class="chart-card">
    <div class="chart-title">企业效率总览</div>
    <div ref="chartRef" style="height: 300px; width: 100%"></div>
  </div>
</template>
