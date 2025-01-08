<script setup lang="ts">
  /**
   * @desc ThreeMonthlyPie
   * @author DragonTeam <https://www.bpmport.com>
   * @since 2024/10/11 15:48
   */

  import { nextTick, Ref, ref, shallowRef, watch } from 'vue';
  import { EchartsUI, useEcharts } from '@vben/plugins/echarts';
  import {
    getInstanceCountsForLastNumMonth,
    getTaskCountsForLastNumMonth,
  } from '#/api/report/processInstanceCount';
  import MonthlyBar from '#/views/report/processInstanceCount/components/MonthlyBar.vue';

  defineOptions({ name: 'ThreeMonthlyPie' });

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

  const month = ref('');
  const activeMonth = ref('');
  const showDaysChart = ref(false);
  const chartLoading = ref(true);
  const chartContent = shallowRef<HTMLDivElement | null>(null);
  const { setOptions, getInstance } = useECharts(chartContent as Ref<HTMLDivElement>);

  const baseOptions = {
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true,
          backgroundColor: '#333',
        },
      },
    },
    legend: {
      show: false,
    },
  };

  async function fetchData() {
    try {
      const { formName = '', modelKey = '', date: presetDate } = props.params;
      const date = (month.value = presetDate?.slice(0, 7));

      if (date) {
        const requestMethod =
          props.requester === 'task'
            ? getTaskCountsForLastNumMonth
            : getInstanceCountsForLastNumMonth;
        const data = await requestMethod({ formName, modelKey, date });

        await nextTick();
        await setOptions({
          ...baseOptions,
          series: [
            {
              name: '总计',
              type: 'pie',
              radius: '80%',
              center: ['50%', '50%'],
              color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
              data: data.map((i) => ({ name: i.date, value: i.count })),
              animationType: 'scale',
              animationEasing: 'exponentialInOut',
            },
          ],
        });

        getInstance()?.on('dblclick', (params) => {
          showDaysChart.value = true;
          activeMonth.value = params.name;
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
      <div>{{ month }}</div>
    </div>
    <div class="w-full h-full" ref="chartContent"></div>

    <MonthlyBar
      v-if="showDaysChart"
      :requester="requester"
      :params="{ ...params, date: activeMonth }"
      class="z-100"
      show-back
      @click="showDaysChart = false"
    />
  </div>
</template>
