<template>
  <div class="p-4 h-full">
    <div
      class="p-2 position-relative analysis-container h-full rounded overflow-y-auto"
      :class="{ 'bg-[var(--sider-dark-bg-color)] [&_.top-task-analysis_*]:!color-white': !isDark }"
    >
      <div class="title-container text-center w-full h-[60px]font-bold text-xl">
        <div
          class="w-[50%] m-auto analysis-title position-relative before:content-[''] before:absolute before:block before:top-[-4px] before:left-[-66px] before:w-[65px] before:h-[30px] before:border-t-2 before:border-t-sky-600 before:rotate-40 after:content-[''] after:absolute after:block after:top-[-4px] after:right-[-66px] after:w-[65px] after:h-[30px] after:border-t-2 after:border-t-sky-600 -after:rotate-40"
        >
          <Divider class="h-[40px] !border-blue-400 title-divider !color-white">
            <h1
              class="analysis-title-text position-relative before:content-[''] before:absolute before:top-[21px] before:left-[-20px] before:w-[10px] before:h-[10px] before:rounded-full before:bg-blue-400 after:content-[''] after:absolute after:top-[21px] after:right-[-20px] after:w-[10px] after:h-[10px] after:rounded-full after:bg-blue-400"
            >
              数据分析
            </h1>
          </Divider>
        </div>
      </div>
      <GrowCard :loading="loading" class="enter-y" />
      <div class="mt-4">
        <ProcessAnalysis class="w-full" :loading="loading" />
      </div>
    </div>

    <!--<div class="!my-4 md:flex enter-y">
      <ProcessTopAnalysis class="md:w-1/4 w-full md:!mx-4" :loading="loading" />
      <ProcessTopAnalysis class="md:w-1/4 w-full" :loading="loading" />
    </div>-->

    <!-- <SiteAnalysis class="!my-4 enter-y" :loading="loading" />-->
    <!--
    <div class="md:flex enter-y mt-4">
      <VisitRadar class="md:w-1/3 w-full" :loading="loading" />

      <VisitSource class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="loading" />
      <SalesProductPie class="md:w-1/3 w-full" :loading="loading" />
    </div>-->
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import GrowCard from './components/GrowCard.vue';
  import ProcessAnalysis from './components/ProcessAnalysis.vue';
  import VisitSource from './components/VisitSource.vue';
  import VisitRadar from './components/VisitRadar.vue';
  import SalesProductPie from './components/SalesProductPie.vue';
  import { usePreferences } from '@vben/preferences';


  import { Divider } from 'ant-design-vue';

  const { isDark } = usePreferences();

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
