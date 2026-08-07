<template>
  <ColPage
      :left-max-width="50"
      :left-min-width="10"
      :left-width="15"
      :split-handle="false"
      :split-line="false"
      :resizable="true"
      :left-collapsible="false"
      :auto-content-height="true"
      content-class="h-full">
    <template #left>
      <div class="h-full bg-card overflow-y-auto">
        <BasicTree
          ref="basicTreeRef"
          title="报表树"
          :show-search="true"
          :show-toolbar="true"
          :tree-data="treeData"
          class="h-full flex flex-col"
          size="small"
          @select="handleSelect"
          :height="treeHeight"
        />
      </div>
    </template>
    <div class="h-full">
      <div class="h-full" v-show="!!currentNode.id">
        <div class="p-4">
          <h3>{{ reportInfo?.name }}</h3>
          <p>数据预览区域</p>
        </div>
      </div>
      <div v-show="!currentNode.id" class="p-10 bg-white">
        <a-empty description="请选择台账">
          <template #description>
            <span>请从左侧选择要查看的数据</span>
          </template>
        </a-empty>
      </div>
    </div>
    <BpmnPreviewModal ref="bpmnPreviewModalRef" />
    <ProcessFormPreviewDrawer ref="processFormPreviewDrawerRef" />
  </ColPage>
</template>
<script lang="ts" setup>
import { ref, unref, nextTick, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ColPage } from '@vben/common-ui';
import { BasicTree } from '#/components/tree';
import { useElementSize } from '@vueuse/core';
import { getCategoriesList } from '#/api/process/category';
import { getMyProcessFormList } from '#/api/process/processFormData';
import { BpmnPreviewModal, ProcessFormPreviewDrawer } from '#/views/components/preview';

const basicTreeRef = ref<any>(null);
const { height } = useElementSize(basicTreeRef);
const treeHeight = computed(() => {
  return height.value - 70;
});

const bpmnPreviewModalRef = ref();
const processFormPreviewDrawerRef = ref();
const treeData = ref<any[]>([]);
const treeLoading = ref<boolean>(false);
const currentNode = ref<any>({});
const reportInfo = ref<any>(null);

async function fetch() {
  treeLoading.value = true;
  const categoriesList = await getCategoriesList();
  const dataReportList = await getMyProcessFormList();
  treeData.value = buildTreeWithDataOnly(categoriesList, dataReportList);
}

function buildTreeWithDataOnly(categoriesList: any[], formList: any[]) {
  const nodeMap = new Map();
  for (const cat of categoriesList) {
    nodeMap.set(cat.id, { ...cat });
  }
  const keepIds = new Set();
  for (const form of formList) {
    const category = categoriesList.find((cat: any) => cat.code === form.categoryCode);
    if (category) {
      keepIds.add(category.id);
    } else {
      console.warn(`未找到 categoryCode = ${form.categoryCode} 的分类`);
    }
  }
  const addAncestors = (id: string) => {
    let currentId = id;
    while (currentId && nodeMap.has(currentId)) {
      const parentId = nodeMap.get(currentId).pid;
      if (parentId && nodeMap.has(parentId)) {
        keepIds.add(parentId);
        currentId = parentId;
      } else {
        break;
      }
    }
  };
  for (const id of keepIds) {
    addAncestors(id);
  }
  const treeNodeMap = new Map();
  for (const id of keepIds) {
    const cat = nodeMap.get(id);
    treeNodeMap.set(id, {
      id: cat.id,
      pid: cat.pid,
      name: cat.name,
      type: 'category',
      children: [] as any[],
    });
  }
  for (const node of treeNodeMap.values()) {
    if (node.pid && treeNodeMap.has(node.pid)) {
      treeNodeMap.get(node.pid).children.push(node);
    }
  }
  for (const form of formList) {
    const category = categoriesList.find((cat: any) => cat.code === form.categoryCode);
    if (!category) continue;
    const parentId = category.id;
    if (!treeNodeMap.has(parentId)) continue;
    const formNode = {
      id: form.id,
      pid: parentId,
      name: form.name,
      type: 'data',
    };
    treeNodeMap.get(parentId).children.push(formNode);
  }
  const roots: any[] = [];
  for (const node of treeNodeMap.values()) {
    if (!node.pid || node.pid === 0 || node.pid === '0') {
      roots.push(node);
    }
  }
  return roots;
}

onMounted(async () => {
  try {
    await fetch();
    await nextTick();
  } catch (e) {
    console.error(e);
  }
});

async function handleSelect(node: any, e: any) {
  if (e.node.type === 'category') {
    return;
  }
  if (!e.selectedNodes[0]) {
    return;
  }
  const selectedNode = e.selectedNodes[0];
  currentNode.value = { id: selectedNode.id };
  reportInfo.value = { id: selectedNode.id, name: selectedNode.name };
}
</script>
