<template>
  <Page auto-content-height>
    <!--    <template #headerContent> <WorkbenchHeader /> </template>-->
    <div class="lg:flex">
      <div class="lg:w-4/10 w-full !mr-4 enter-y">
        <BpmInfo :loading="loading" class="!my-0 enter-y"/>
      </div>
      <div class="lg:w-6/10 w-full enter-y">
        <QuickNav :loading="loading" class="enter-y"/>

        <Card class="!my-4 enter-y" :loading="loading">
          <img class="xl:h-50 h-30 mx-auto" src="../../../assets/svg/illustration.svg"/>
        </Card>

      </div>
    </div>
  </Page>
</template>
<script lang="ts" setup>
import {ref} from 'vue';
import {Card} from 'ant-design-vue';
import {Page} from '@vben/common-ui';
import WorkbenchHeader from './components/WorkbenchHeader.vue';
import ProjectCard from './components/ProjectCard.vue';
import CalendarCard from './components/CalendarCard.vue';
import QuickNav from './components/QuickNav.vue';
import BpmInfo from './components/BpmInfo.vue';
import SaleRadar from './components/SaleRadar.vue';

const loading = ref(true);

setTimeout(() => {
  loading.value = false;
}, 1500);
</script>
