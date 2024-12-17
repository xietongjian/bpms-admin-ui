<script setup lang="ts">
  /**
   * @desc OneDayLine
   * @author DragonTeam <https://www.bpmport.com>
   * @since 2024/10/11 15:48
   */

  import { nextTick, Ref, ref, shallowRef, watch } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import {
    getInstanceCountsFor24Hour,
    getTaskCountsFor24Hour,
  } from '@/api/report/processInstanceCount';

  defineOptions({ name: 'OneDayLine' });

  const props = defineProps({
    requester: {
      type: String as PropType<string>,
      required: true,
    },
    params: {
      type: Object as PropType<any>,
      default: () => ({}),
    },
    showBack: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  });

  const emit = defineEmits(['click']);

  const day = ref('');
  const chartLoading = ref(true);
  const chartContent = shallowRef<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartContent as Ref<HTMLDivElement>);

  const baseOptions = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true,
          backgroundColor: '#333',
        },
      },
    },
    legend: {
      textStyle: { color: '#ccc' },
    },
    yAxis: {
      splitLine: { show: false },
      axisLine: {
        lineStyle: { color: '#ccc' },
      },
    },
  };

  async function fetchData() {
    try {
      const { formName = '', modelKey = '', date: presetDate } = props.params;
      const date = (day.value = presetDate);

      if (date) {
        const requestMethod =
          props.requester === 'task' ? getTaskCountsFor24Hour : getInstanceCountsFor24Hour;

        const data = await requestMethod({ formName, modelKey, date });

        await nextTick();
        await setOptions({
          ...baseOptions,
          xAxis: {
            name: '时刻',
            data: data.map((d) => d.date),
            axisLine: {
              lineStyle: {
                color: '#ccc',
              },
            },
          },
          series: [
            {
              name: '总量',
              type: 'line',
              itemStyle: {
                color: '#14c8d4',
              },
              data: data.map((d) => d.count),
            },
          ],
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      chartLoading.value = false;
    }
  }

  function handleBack() {
    emit('click');
  }

  watch(() => props.params, fetchData, { immediate: true, deep: true });
</script>

<template>
  <div class="report-chart w-full h-full absolute left-0 top-0" v-loading="chartLoading">
    <div
      class="report-chart-back absolute left-0 top-0 z-10 p-2 rounded-br-lg bg-slate-500/50 text-white flex"
    >
      <div v-if="showBack" class="mr-4 cursor-pointer" @click="handleBack">返回</div>
      <div>{{ day }}</div>
    </div>
    <div class="w-full h-full" ref="chartContent"></div>
  </div>
</template>
