<template>
  <Page auto-content-height>
    <div class="w-full ">
<!--      <MarkdownViewer :value="docContent" />-->
      <div v-html="docContentHtml" class="markdown-body markdown-content"></div>

<!--      <Markdown
          html
          linkify
          typographer
          highlight
          :source="docContent"
          :options="markdownOptions"
      />-->

<!--      <VMarkdownView
          html
          :mode="getTheme"
          :content="docContent"
          :options="markdownOptions"
      ></VMarkdownView>-->
    </div>
  </Page>
</template>
<script lang="ts" setup>
  import {computed, ref, unref, onMounted, nextTick } from 'vue';
  import {getIntegrationDoc} from "#/api/sys/integration";
  import { useRouter } from 'vue-router';
  import {Page} from '@vben/common-ui';
  // import Markdown from 'vue3-markdown-it';
  import hljs from 'highlight.js';
  import 'highlight.js/styles/dark.css';
  import 'highlight.js/styles/github.css';

  import { Marked } from 'marked'
  import { markedHighlight } from "marked-highlight";
  // import { VMarkdownView } from 'vue3-markdown'
  import 'highlight.js/styles/atom-one-dark.css'

  import { usePreferences } from '@vben/preferences';

  // import 'vue3-markdown/dist/vue3-markdown.css'

  const markdownOptions = {
    highlight: true,
  }

  const { isDark } = usePreferences();
  const getTheme = computed(() => {
    if(isDark){
      switchHighlightTheme('dark');
    } else {
      switchHighlightTheme('github');
    }
    return (isDark.value ? 'dark' : 'light');
  });


  const {currentRoute} = useRouter();

  const loading = ref(true);

  const docContent = ref('');

  onMounted(async () => {
    await nextTick();
    await loadDocContent();
  });
  const marked=new Marked(
      markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang) {
          const language = hljs.getLanguage(lang) ? lang : 'shell'
          return hljs.highlight(code, { language }).value
        }
      })
  )
  /*
  * markedHighlight({
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight(code, lang, info) {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(code, { language }).value;
        }
      })
  * */
  marked.use({
    highlight: (code) => {
      return hljs.highlightAuto(code).value;
    }
  });

  const docContentHtml = computed(() => {
        return marked.parse(docContent.value);
      }
  );

  async function loadDocContent() {
    try {
      loading.value = true;
      const fileName = unref(currentRoute).path.split('/').pop();
      const url = `/docs/integration/${fileName}/index.md`;
      const {data} = await getIntegrationDoc({ url });
      docContent.value = data;
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  function switchHighlightTheme(newTheme) {
    debugger;
    // 移除所有旧的主题样式
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      if (link.href.includes('/highlight.js/styles/')) {
        link.remove();
      }
    });

    // 加载新主题样式
    var themeLink = document.createElement('link');
    themeLink.rel = 'stylesheet';
    themeLink.href = '/highlight.js/styles/' + newTheme + '.css';
    document.head.appendChild(themeLink);

    // 重新渲染所有高亮代码
    hljs.highlightAll();
  }
</script>

<style scoped lang="css">
@import 'github-markdown-css/github-markdown.css';
@import 'github-markdown-css/github-markdown-dark.css';
@import 'github-markdown-css/github-markdown-light.css';
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
/*
.markdown-content table {
  width: 100%;
  border-collapse: collapse !important; !* 确保边框合并生效 *!
  margin: 20px 0;
  border: 1px solid black !important; !* 设置表格整体边框颜色为黑色 *!
}

.markdown-content th, .markdown-content td {
  border: 1px solid black !important; !* 设置表头和单元格边框颜色为黑色 *!
  padding: 8px;
}

.markdown-content th {
  text-align: left;
}*/
</style>
