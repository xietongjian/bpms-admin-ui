<template>
  <Page content-class="flex flex-row gap-4 h-full" auto-content-height>
    <div class="min-h-screen w-full bg-card p-4 rounded-md">
<!--      <MarkdownViewer :value="docContent" />-->
      <div v-html="docContent"></div>
    </div>
  </Page>
</template>
<script lang="ts" setup>
  import { ref, unref, onMounted, nextTick } from 'vue';
  import {getIntegrationDoc} from "#/api/sys/integration";
  // import {MarkdownViewer} from "@/components/Markdown";
  import { useRouter } from 'vue-router';
  import {Page} from '@vben/common-ui';

  const {currentRoute} = useRouter();

  const loading = ref(true);

  const docContent = ref('');

  onMounted(async () => {
    await nextTick();
    setTimeout(() => {
      loadDocContent();
    }, 100);
  });

  function loadDocContent() {
    try {
      loading.value = true;
      const fileName = unref(currentRoute).path.split('/').pop();
      const url = `/docs/integration/${fileName}/index.md`;
      getIntegrationDoc({ url })
          .then((res: any) => {
            docContent.value = res.data;
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {});
    } catch (e) {
      console.error(e);
      loading.value = false;
    } finally {
      loading.value = false;
    }
  }
</script>
