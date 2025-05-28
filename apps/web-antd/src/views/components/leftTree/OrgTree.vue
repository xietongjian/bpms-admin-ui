<template>
  <div class="bg-card h-full" v-loading="treeLoading">
    <BasicTree
      :show-search="true"
      :show-toolbar="true"
      :tree-data="treeData"
      class="h-full flex flex-col"
      size="small"
      @select="handleSelect"
      title="组织"
    />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, unref, nextTick, defineEmits } from 'vue';
  import {BasicTree} from "#/components/tree";
  import { getOrgTree } from '#/api/org/dept';
  import { findNode } from '#/utils/helper/treeHelper';
  import type { Nullable } from '@vben/types';

  const emit = defineEmits(['select']);

  const treeData = ref<[]>([]);
  const treeLoading = ref<boolean>(false);
  const basicTreeRef = ref<Nullable<TreeActionType>>(null);

  async function fetch() {
    treeLoading.value = true;
    getOrgTree()
      .then((res) => {
        treeData.value = res || [];
        nextTick(() => {
          // 加载后展开节层级
          if (unref(treeData).length < 10) {
            // unref(basicTreeRef)?.filterByLevel(1);
          }
        });
      })
      .finally(() => {
        treeLoading.value = false;
      });
  }

  function handleSelect(node: any) {
    emit('select', node);
  }

  onMounted(() => {
    fetch();
  });
</script>
