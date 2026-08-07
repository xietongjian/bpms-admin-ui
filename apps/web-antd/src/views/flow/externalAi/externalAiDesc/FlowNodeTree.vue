<script lang="ts" setup>
import { onMounted, ref, nextTick } from 'vue';
import { Tree } from 'ant-design-vue';
import { flowNodeTree } from '#/api/flow/externalAi';
import type { TreeProps } from 'ant-design-vue';

const emit = defineEmits<{ select: [node: any] }>();

const treeData = ref<TreeProps['treeData']>([]);
const loading = ref(false);
const selectedKeys = ref<string[]>([]);
const expandedKeys = ref<string[]>([]);

async function fetch() {
  loading.value = true;
  try {
    const res = await flowNodeTree();
    treeData.value = (res as any) || [];
    nextTick(() => {
      if (treeData.value && treeData.value.length < 10) {
        const keys: string[] = [];
        const collectKeys = (nodes: any[]) => {
          nodes.forEach((node) => {
            if (node.key || node.id) keys.push(node.key || node.id);
            if (node.children) collectKeys(node.children);
          });
        };
        collectKeys(treeData.value as any[]);
        expandedKeys.value = keys;
      }
    });
  } finally {
    loading.value = false;
  }
}

function handleSelect(keys: any, info: any) {
  selectedKeys.value = keys as string[];
  emit('select', info.node);
}

onMounted(() => {
  fetch();
});
</script>

<template>
  <div class="flow-node-tree bg-white overflow-hidden h-full">
    <Tree
      v-if="treeData && treeData.length > 0"
      :tree-data="treeData"
      :selected-keys="selectedKeys"
      :expanded-keys="expandedKeys"
      :field-names="{ title: 'name', key: 'id', children: 'children' }"
      show-search
      block-node
      @select="handleSelect"
    />
    <div v-else-if="loading" class="flex items-center justify-center h-32 text-gray-400">加载中...</div>
    <div v-else class="flex items-center justify-center h-32 text-gray-400">无数据</div>
  </div>
</template>
