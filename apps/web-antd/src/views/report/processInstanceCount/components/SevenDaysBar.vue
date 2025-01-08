<script setup lang="ts">
  /**
   * @desc SevenDaysBar
   * @author DragonTeam <https://www.bpmport.com>
   * @since 2024/10/11 15:46
   */

  import { nextTick, Ref, ref, shallowRef, watch } from 'vue';
  import { EchartsUI, useEcharts } from '@vben/plugins/echarts';
  import OneDayLine from '#/views/report/processInstanceCount/components/OneDayLine.vue';
  import {
    getInstanceCountsForLastNumDays,
    getTaskCountsForLastNumDays,
  } from '#/api/report/processInstanceCount';

  defineOptions({ name: 'SevenDaysBar' });

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

  const date = ref('');
  const activeDay = ref('');
  const showDaysChart = ref(false);
  const chartLoading = ref(true);
  const chartContent = shallowRef<HTMLDivElement | null>(null);
  const { setOptions, echarts, getInstance } = useECharts(chartContent as Ref<HTMLDivElement>);

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
      date.value = presetDate?.slice(0, 10);

      if (date.value) {
        const requestMethod =
          props.requester === 'task'
            ? getTaskCountsForLastNumDays
            : getInstanceCountsForLastNumDays;

        const data = await requestMethod({ formName, modelKey, date: date.value });

        await nextTick();
        await setOptions({
          ...baseOptions,
          xAxis: {
            name: '日期',
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
              type: 'bar',
              barWidth: 10,
              itemStyle: {
                borderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#14c8d4' },
                  { offset: 1, color: '#43eec6' },
                ]),
              },
              data: data.map((d) => d.count),
            },
          ],
        });

        getInstance()?.on('dblclick', (params) => {
          showDaysChart.value = true;
          activeDay.value = params.name;
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
      <div>{{ date }}</div>
    </div>
    <div class="w-full h-full" ref="chartContent"></div>

    <OneDayLine
      v-if="showDaysChart"
      :requester="requester"
      :params="{ ...params, date: activeDay }"
      class="z-100"
      show-back
      @click="showDaysChart = false"
    />
  </div>
</template>
