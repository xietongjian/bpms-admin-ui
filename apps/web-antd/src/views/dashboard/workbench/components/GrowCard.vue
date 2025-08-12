<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { VbenCountToAnimator } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';

import { Card, Empty } from 'ant-design-vue';
import { countProcInstTask } from '#/api/report/flowCount';

const loading = ref(false);

const countData = ref();

async function getProcInstTaskCount() {
  countProcInstTask().then((res) => {
    countData.value = res;
  });
}

onMounted(() => {
  getProcInstTaskCount();
});

const growCardList = countData;
</script>

<template>
  <div v-if="growCardList" class="grid grid-cols-2 gap-2 h-full">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <Card
        size="small"
        :loading="loading"
        class="w-full"
      >
        <router-link :to="item.path">
          <div class="flex justify-between items-center">
            <div class="text-2xl">
              <VbenCountToAnimator :duration="3000" :end-val="item.value" :start-val="1" />
              <div class="text-sm text-gray-500 font-bold">{{item.title}}</div>
            </div>
            <IconifyIcon :icon="item.icon || 'ant-design:ellipsis-outlined'" class="size-5" height="20" width="20"/>
          </div>
        </router-link>
      </Card>
    </template>
  </div>
  <div v-else class="w-full text-center bg-card">
    <Empty />
  </div>
</template>
