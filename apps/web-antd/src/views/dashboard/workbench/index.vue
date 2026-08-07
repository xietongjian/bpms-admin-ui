<script lang="ts" setup>
import { onErrorCaptured, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import CustomConfigRender from "#/views/base/systemConfig/components/WorkbenchLayoutRender.vue";

import { useUserStore } from '@vben/stores';
import { openWindow } from '@vben/utils';
import QuickNav from './components/QuickNav.vue';
import WorkbenchHeader from './components/WorkbenchHeader.vue';

import AnalyticsVisitsSource from '../analytics/analytics-visits-source.vue';
import GrowCard from './components/GrowCard.vue';
import TodoCenter from './components/TodoCenter.vue';
import CalendarCard from './components/CalendarCard.vue';
import CommonSystem from './components/CommonSystem.vue';
import NoticeInfo from './components/NoticeInfo.vue';

console.log('[Workbench] 组件模块已加载');

const userStore = useUserStore();

const router = useRouter();

const renderError = ref<Error | null>(null);

onErrorCaptured((err) => {
  console.error('[Workbench] 子组件渲染错误:', err);
  renderError.value = err as Error;
  return false; // 阻止错误继续传播
});

onMounted(() => {
  console.log('[Workbench] 组件已挂载');
});

</script>

<template>
  <div class="w-full h-full overflow-y-auto">
    <div v-if="renderError" style="padding: 20px; color: red;">
      <h3>Workbench 渲染错误:</h3>
      <pre>{{ renderError.message }}</pre>
      <pre>{{ renderError.stack }}</pre>
    </div>
    <CustomConfigRender v-else />
  </div>
</template>
