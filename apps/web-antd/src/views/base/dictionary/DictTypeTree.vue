<template>
  <div class="bg-card mr-0 overflow-hidden">
    <Tree
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
  import { getDicTypes } from '#/api/base/dicType';
  import {Tree} from 'ant-design-vue';

  const emit = defineEmits(['select']);

  const treeData = ref<any[]>([]);

  async function fetch() {
    treeData.value = (await getDicTypes()) as unknown as any[];
  }

  function handleSelect(keys: string, e) {
    emit('select', keys[0]);
  }

  onMounted(() => {
    fetch();
  });
</script>
