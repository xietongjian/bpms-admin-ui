<template>
  <PageWrapper title="流程中心" contentBackground class="!mt-4">
    <template #extra>
      <launch-button />
    </template>

    <div class="m-1 desc-wrap">
      <router-view></router-view>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { defineComponent, ref } from 'vue';
  // import { PageWrapper } from '@/components/Page';
  import { Divider, Card, Empty, Descriptions} from 'ant-design-vue';

  const currentView = ref("./approve.vue");
</script>
