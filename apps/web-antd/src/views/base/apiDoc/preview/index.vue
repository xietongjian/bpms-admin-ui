<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { getApiDetail } from '#/api/base/apiInfo';

const route = useRoute();
const apiDetail = ref<any>(null);
const loading = ref(false);

async function load() {
  const id = route.query.id;
  if (!id) return;
  loading.value = true;
  try { apiDetail.value = await getApiDetail({ id: Number(id) }); }
  finally { loading.value = false; }
}
load();
</script>

<template>
  <div class="p-4">
    <div v-if="loading" class="text-center p-10">加载中...</div>
    <div v-else-if="apiDetail" class="p-4 bg-white rounded">
      <h2 class="text-lg font-bold mb-4">{{ apiDetail.name }}</h2>
      <div class="mb-2"><span class="font-medium">请求方式：</span>{{ apiDetail.method }}</div>
      <div class="mb-2"><span class="font-medium">接口地址：</span>{{ apiDetail.url }}</div>
      <div class="mb-4"><span class="font-medium">描述：</span>{{ apiDetail.description || '-' }}</div>
    </div>
    <div v-else class="text-center p-10 text-gray-400">未找到接口信息</div>
  </div>
</template>
