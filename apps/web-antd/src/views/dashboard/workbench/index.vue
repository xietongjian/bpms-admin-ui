<script lang="ts" setup>
import type {
  WorkbenchProjectItem,
  WorkbenchQuickNavItem,
  WorkbenchTodoItem,
  WorkbenchTrendItem,
} from '@vben/common-ui';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

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

const userStore = useUserStore();

const router = useRouter();

</script>

<template>
  <div class="p-4">
    <div class="flex gap-4 flex-col lg:flex-row">
      <div class="lg:w-1/3">
        <GrowCard />
        <TodoCenter class="!mb-4 enter-y" />
      </div>
      <div class="lg:w-1/3">
        <QuickNav class="enter-y mb-4" />
        <CommonSystem class="enter-y" />
      </div>
      <div class="lg:w-1/3">
        <WorkbenchHeader class="w-full mb-4" />
        <CalendarCard class="w-full mb-4" />
        <NoticeInfo class="w-full "/>
      </div>
    </div>
  </div>
</template>
