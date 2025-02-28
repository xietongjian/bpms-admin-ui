<template>
  <div class="analysis-panel border-1 border-teal-400 h-full">
    <div class="w-full p-4 border-b-1 border-b-teal-400 font-bold color-white">
      <DashboardOutlined class="mr-1 color-[#2d93f9] font-size-[16px]" />
      <span>流程统计</span>
    </div>
    <div class="md:flex position-relative enter-y p-2" v-if="activeKey === 'tab1'">
      <div class="xl:w-1/2 md:w-1/2 xm:w-full">
        <InstAndTaskAnalysis />
      </div>
      <div class="xl:w-1/4 md:w-1/4 xm:w-full">
        <TopTaskAnalysis />
      </div>
      <div class="xl:w-1/4 md:w-1/4 xm:w-full">
        <TopTaskAnalysis order-by="DESC" />
      </div>
    </div>
    <!--    <p v-if="activeKey === 'tab2'">
      <VisitAnalysisBar />
    </p>-->
    <div class="panel-footer float-clear">
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Card } from 'ant-design-vue';
  import InstAndTaskAnalysis from './InstAndTaskAnalysis.vue';
  import TopTaskAnalysis from './TopTaskAnalysis.vue';
  import {DashboardOutlined} from "@ant-design/icons-vue";

  const activeKey = ref('tab1');

  const tabListTitle = [
    {
      key: 'tab1',
      tab: '流程统计',
    },
  ];

  function onTabChange(key) {
    activeKey.value = key;
  }
</script>

<style lang="less" scoped>
  .analysis-panel {
    position: relative;
    border: 1px solid rgba(25, 186, 139);
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      width: 10px;
      height: 10px;
      border-top: 2px solid #02a6b5;
      border-left: 2px solid #02a6b5;
    }
    &::after {
      position: absolute;
      top: 0;
      right: 0;
      content: "";
      width: 10px;
      height: 10px;
      border-top: 2px solid #02a6b5;
      border-right: 2px solid #02a6b5;
    }
    .panel-footer{
      position: relative;
      left: 0;
      bottom: 0;
      width: 100%;
      &::before {
        position: absolute;
        bottom: 0;
        left: 0;
        content: "";
        width: 10px;
        height: 10px;
        border-bottom: 2px solid #02a6b5;
        border-left: 2px solid #02a6b5;
      }
      &::after {
        position: absolute;
        bottom: 0;
        right: 0;
        content: "";
        width: 10px;
        height: 10px;
        border-bottom: 2px solid #02a6b5;
        border-right: 2px solid #02a6b5;
      }
    }
  }
</style>
