<template>
  <div class="p-2 w-full !bg-gradient-to-r !from-blue-700/90 !to-blue-500/20 !color-white">
    <RadioGroup
      class="analysis-date-range bg-transparent !color-white"
      prefixCls=""
      size="small"
      v-model:value="dateRangeNum"
      @change="handleChangeDateRange"
      button-style="outline"
      option-type="button"
    >
      <RadioButton class="!border-0 bg-transparent !color-teal-100 overflow-hidden" value="7">近七天</RadioButton>
      <RadioButton class="!border-0 bg-transparent !color-teal-100 overflow-hidden" value="30"
        >近一个月</RadioButton
      >
      <RadioButton class="!border-0 bg-transparent !color-teal-100 overflow-hidden" value="90"
        >近三个月</RadioButton
      >
    </RadioGroup>
  </div>
  <EchartsUI
    ref="chartRef"
    class="report-chart"
    :style="{ height, width }"
    v-loading="chartDataLoading"
  ></EchartsUI>
</template>
<script lang="ts" setup>
  import { onMounted, ref, unref, nextTick, defineProps } from 'vue';
  import type { Ref } from 'vue';
  import type { EchartsUIType } from '@vben/plugins/echarts';
  import { Radio } from 'ant-design-vue';

  // import { useECharts } from '@/hooks/web/useECharts';
  import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

  import { basicProps } from './props';
  import { getProcessCountBi } from '#/api/report/flowCount';

  const RadioButton = Radio.Button;
  const RadioGroup = Radio.Group;
  defineProps({ ...basicProps });

  const chartRef = ref<EchartsUIType>();
  const dateRangeNum = ref('30');
  const dateList = ref<any[]>([]);
  const instCounts = ref<any[]>([]);
  const taskCounts = ref<any[]>([]);
  const maxCount = ref<number>(0);
  const chartDataLoading = ref(false);
  // const { setOptions, echarts } = useEcharts(chartRef as Ref<HTMLDivElement>);
  const { renderEcharts } = useEcharts(chartRef);

  onMounted(() => {
    nextTick(() => {
      fetchData();
    });
  });

  function handleChangeDateRange() {
    fetchData();
  }

  function fetchData() {
    chartDataLoading.value = true;
    getProcessCountBi({ dateRangeCount: unref(dateRangeNum) })
      .then((data) => {
        dateList.value = data.map((item) => {
          return item.date;
        });
        instCounts.value = data.map((item) => {
          return item.instCount;
        });
        taskCounts.value = data.map((item) => {
          return item.taskCount;
        });
        const allCounts = [...unref(instCounts), ...unref(taskCounts)];
        maxCount.value = Math.max(...allCounts);
        intAnalysis();
        chartDataLoading.value = false;
      })
      .catch((e) => {
        chartDataLoading.value = false;
        debugger;
      });
  }

  function intAnalysis() {
    renderEcharts(
      {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true,
              backgroundColor: '#333',
            },
          },
          formatter: (params) => {
            return `
                  ${params[0].name}<br/>
                  流程发起量：${params[1].data}<br/>
                  待办任务量：${params[0].data}<br/>
                `;
          },
        },
        legend: {
          data: ['流程发起量', '待办任务量'],
          textStyle: {
            color: '#ccc',
          },
        },
        xAxis: {
          data: dateList,
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
        },
        series: [
          {
            name: '待办任务量',
            type: 'line',
            smooth: true,
            showAllSymbol: 'auto',
            symbol: 'emptyCircle',
            symbolSize: 15,
            data: unref(taskCounts),
          },
          {
            name: '流程发起量',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              borderRadius: 5,
              // color: '#14C8D4',
              color: {
                type: 'linear', 					// 线性渐变
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0, color: '#0D7D85' 		// 0% 处的颜色
                  },
                  {
                    offset: 1, color: '#0D7D85' 		// 100% 处的颜色
                  }
                ]
              }
            },
            data: unref(instCounts),
          },
          {
            name: '待办任务量',
            type: 'bar',
            barGap: '-100%',
            barWidth: 10,
            itemStyle: {
              borderRadius: 2,
              // color: '#5ab1ef',
              color: {
                type: 'linear', 					// 线性渐变
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0, color: '#0D7D85' 		// 0% 处的颜色
                  },
                  {
                    offset: 1, color: '#14C8D4' 		// 100% 处的颜色
                  }
                ]
              }
            },
            z: -12,
            data: unref(taskCounts),
          },
        ],
      }
    );
    // setOptions();
  }
</script>

<style lang="less" scoped>
  .report-chart {
    background-color: var(--sider-dark-bg-color);
  }
  .analysis-date-range {
    border: none;
    .ant-radio-button-wrapper-checked {
      font-weight: bold;
      border: none;
      border-bottom: 2px solid white !important;
      background: transparent;
      color: white;
      border-radius: 0;
    }
  }
</style>
