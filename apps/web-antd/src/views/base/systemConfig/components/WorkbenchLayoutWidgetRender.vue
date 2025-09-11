<template>
  <div class="w-full h-full relative" :class="options.className">
    <div
      v-if="isDraggable"
      data-el-type="dragHandle"
      :data-el-item="JSON.stringify(options)"
      class="selector absolute w-full h-full z-50 bg-red-500/10"></div>
    <QuickNav v-if="options.field === 'QuickNav'" />
    <GrowCard v-else-if="options.field === 'GrowCard'" />
    <BannerInfo v-else-if="options.field === 'BannerInfo'" />
    <CommonSystem v-else-if="options.field === 'CommonSystem'" />
    <TodoCenter v-else-if="options.field === 'TodoCenter'" />
    <NoticeInfo v-else-if="options.field === 'NoticeInfo'" />
    <WorkbenchHeader v-else-if="options.field === 'WorkbenchHeader'" />
    <InstAndTaskAnalysis v-else-if="options.field === 'InstAndTaskAnalysis'" />
<!--    <ProcessStatistics v-else-if="options.field === 'ProcessStatistics'" />-->
  </div>
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue';
  import CommonSystem from '#/views/dashboard/workbench/components/CommonSystem.vue';
  import QuickNav from '#/views/dashboard/workbench/components/QuickNav.vue';
  import TodoCenter from '#/views/dashboard/workbench/components/TodoCenter.vue';
  import NoticeInfo from '#/views/dashboard/workbench/components/NoticeInfo.vue';
  import WorkbenchHeader from '#/views/dashboard/workbench/components/WorkbenchHeader.vue';
  import GrowCard from "#/views/dashboard/workbench/components/GrowCard.vue";
  import BannerInfo from "#/views/dashboard/workbench/components/BannerInfo.vue";
  import InstAndTaskAnalysis from "#/views/dashboard/analysis/components/InstAndTaskAnalysis.vue";
  // import ProcessStatistics from "#/views/dashboard/workbench/components/ProcessStatistics.vue";

  defineProps({
    options: {
      default: {},
      type: Object,
    },
    isDraggable: {
      default: true,
      type: Boolean,
    }
  });
</script>
