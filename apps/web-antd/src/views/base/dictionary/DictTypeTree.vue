<template>
  <div class="bg-white mr-0 overflow-hidden">
    <BasicTree
      title="数据分类"
      toolbar
      search
      treeWrapperClassName="h-[calc(100%-35px)] overflow-auto"
      :clickRowToExpand="false"
      :treeData="treeData"
      @select="handleSelect"
    />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, defineEmits } from 'vue';
  import { BasicTree, TreeItem } from '@/components/Tree';
  import { getDicTypes } from '#/api/base/dicType';

  const emit = defineEmits(['select']);

  const treeData = ref<TreeItem[]>([]);

  async function fetch() {
    treeData.value = (await getDicTypes()) as unknown as TreeItem[];
  }

  function handleSelect(keys: string, e) {
    emit('select', keys[0]);
  }

  onMounted(() => {
    fetch();
  });
</script>
