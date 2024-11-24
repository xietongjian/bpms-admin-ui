<template>
  <PageWrapper>
    <div v-loading="loading" class="min-h-screen bg-white p-4 rounded-md">
      <MarkdownViewer :value="docContent" />
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { h, ref, computed } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import {getIntegrationDoc} from "@/api/sys/integration";
  import {MarkdownViewer} from "@/components/Markdown";
  import {useRoute} from "vue-router";

  const {path} = useRoute();

  const fileName = computed(() => {
    return path.split('/').pop();
  });

  const loading = ref(true);

  const docContent = ref('');

  try {
    loading.value = true;
    const path = `/docs/integration/${fileName.value}.md`;
    getIntegrationDoc({path}).then(res => {
      docContent.value = res.data
    });
  } catch (e) {
    loading.value = false;
  } finally {
    loading.value = false;
  }
</script>
