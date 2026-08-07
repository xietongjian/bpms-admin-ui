<template>
  <div class="mb-6 break-inside-avoid">
    <component
      :is="headingTag"
      class="mt-4 mb-3 pb-2 border-b border-gray-200"
      :class="{
        'text-3xl font-bold': headingTag === 'h1',
        'text-2xl font-semibold': headingTag === 'h2',
        'text-xl font-medium': headingTag === 'h3',
      }"
    >
      {{ node.name }}
    </component>

    <div v-if="hasApis" class="mt-2">
      <ApiDocContainer
        v-for="api in node.apis"
        :key="api.id"
        :detail="api"
        class="mb-5"
      />
    </div>

    <div v-if="hasChildren">
      <BatchCategoryView
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :level="level + 1"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import ApiDocContainer from './ApiDocContainer.vue';

interface CategoryNode {
  id: string;
  name: string;
  pid: string | null;
  orderNo?: number;
  children?: CategoryNode[];
  apis?: any[];
}

const props = defineProps<{
  node: CategoryNode;
  level: number;
}>();

const hasApis = computed(() => props.node.apis && props.node.apis.length > 0);
const hasChildren = computed(() => props.node.children && props.node.children.length > 0);
const headingTag = computed(() => {
  if (props.level === 1) return 'h1';
  if (props.level === 2) return 'h2';
  return 'h3';
});
</script>
