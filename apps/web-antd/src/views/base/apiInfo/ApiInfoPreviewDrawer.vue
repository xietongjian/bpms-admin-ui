<template>
  <BasicDrawer
    class="w-[70%]"
    v-bind="$attrs"
    title="接口预览"
    showFooter
    @ok="handleDownload"
  >
    <div ref="pdfContentRef" class="h-auto overflow-y-auto">
      <div v-if="batch">
        <Spin :spinning="batchLoading">
          <div class="w-full" v-for="rootNode in treeData" :key="rootNode.id">
            <BatchCategoryView :node="rootNode" :level="1" />
          </div>
        </Spin>
      </div>
      <div v-else>
        <Spin v-if="detail && detail.name" :spinning="detailLoading">
          <ApiDocContainer :detail="detail" />
        </Spin>
      </div>
    </div>
  </BasicDrawer>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue';
import { useVbenDrawer } from '@vben/common-ui';
import { Spin } from 'ant-design-vue';
import printJS from 'print-js';
import ApiDocContainer from './components/ApiDocContainer.vue';
import BatchCategoryView from './components/BatchCategoryView.vue';
import { getApiCategoryListData, getApiInfoListData, getApiInfoById } from '#/api/base/apiInfo';

const pdfContentRef = ref(null);
const detail = ref<any>({});
const batch = ref(false);
const detailLoading = ref(false);
const batchLoading = ref(false);
const treeData = ref<any[]>([]);

function enrichApiInfo(api: any) {
  try {
    if (api.headers && typeof api.headers === 'string') {
      api.headersJSON = JSON.parse(api.headers);
    } else if (api.headers) {
      api.headersJSON = api.headers;
    }
    if (api.pathVariables && typeof api.pathVariables === 'string') {
      api.pathVariablesJSON = JSON.parse(api.pathVariables);
    } else if (api.pathVariables) {
      api.pathVariablesJSON = api.pathVariables;
    }
    if (api.queryVariables && typeof api.queryVariables === 'string') {
      api.queryVariablesJSON = JSON.parse(api.queryVariables);
    } else if (api.queryVariables) {
      api.queryVariablesJSON = api.queryVariables;
    }
  } catch (e) {
    console.error('解析接口字段失败', e);
  }
  return api;
}

function buildCategoryTree(categories: any[], apiInfos: any[]) {
  const categoryMap = new Map();
  const rootNodes: any[] = [];

  categories.forEach((cat: any) => {
    categoryMap.set(cat.id, {
      id: cat.id,
      name: cat.name,
      pid: cat.pid,
      orderNo: cat.orderNo || 0,
      children: [],
      apis: [],
    });
  });

  const uncategorizedNode = {
    id: 'uncategorized',
    name: '未分类',
    pid: null,
    orderNo: 999,
    children: [],
    apis: [],
  };
  categoryMap.set('uncategorized', uncategorizedNode);

  apiInfos.forEach((api: any) => {
    const targetNode = categoryMap.get(api.categoryId) || uncategorizedNode;
    targetNode.apis.push(api);
  });

  categoryMap.forEach((node) => {
    if (node.pid && categoryMap.has(node.pid)) {
      categoryMap.get(node.pid).children.push(node);
    } else if (!node.pid) {
      rootNodes.push(node);
    }
  });

  function pruneEmptyNodes(nodes: any[]): any[] {
    return nodes.filter((node) => {
      if (node.children.length > 0) {
        node.children = pruneEmptyNodes(node.children);
      }
      const hasInterfaces = node.apis && node.apis.length > 0;
      const hasValidChildren = node.children && node.children.length > 0;
      return hasInterfaces || hasValidChildren;
    });
  }

  function sortNodes(nodes: any[]) {
    nodes.sort((a, b) => a.orderNo - b.orderNo);
    nodes.forEach((node) => {
      if (node.children.length > 0) sortNodes(node.children);
      if (node.apis && node.apis.length > 0) {
        node.apis.sort((a: any, b: any) => (a.orderNo || 0) - (b.orderNo || 0));
      }
    });
  }

  const filteredRoots = pruneEmptyNodes(rootNodes);
  sortNodes(filteredRoots);
  return filteredRoots;
}

async function loadAll() {
  batchLoading.value = true;
  try {
    const categories = await getApiCategoryListData();
    const apiInfos = await getApiInfoListData();
    const enrichedApis = apiInfos.map((api: any) => enrichApiInfo({ ...api }));
    treeData.value = buildCategoryTree(categories || [], enrichedApis || []);
  } catch (error) {
    console.error('批量加载失败', error);
  } finally {
    batchLoading.value = false;
    await nextTick();
  }
}

async function loadDetail(id: string) {
  detailLoading.value = true;
  try {
    const res = await getApiInfoById(id);
    if (res) {
      enrichApiInfo(res);
    }
    detail.value = res;
  } catch (error) {
    console.error('加载接口详情失败', error);
  } finally {
    await nextTick();
    detailLoading.value = false;
  }
}

const [BasicDrawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const data = drawerApi.getData<Record<string, any>>();
      batch.value = !!data?.batch;

      if (!batch.value) {
        loadDetail(data?.record?.id);
      } else {
        loadAll();
      }
    }
  },
});

function getAllStyles() {
  let styleString = '';
  document.querySelectorAll('style').forEach((styleTag) => {
    styleString += styleTag.innerHTML;
  });
  const links = document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]');
  links.forEach((link) => {
    const href = link.href;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', href, false);
    xhr.send();
    if (xhr.status === 200 || xhr.status === 0) {
      styleString += xhr.responseText;
    }
  });
  styleString += `@media print {html, body { height: auto; overflow: visible;}}`;
  return styleString;
}

function handleDownload() {
  const element = pdfContentRef.value;
  if (!element) return;
  setTimeout(() => {
    printJS({
      printable: element,
      type: 'html',
      documentTitle: 'API文档-' + (detail.value?.name ?? ''),
      targetStyles: ['*'],
      scanStyles: false,
      style: getAllStyles(),
    });
  }, 500);
}
</script>
