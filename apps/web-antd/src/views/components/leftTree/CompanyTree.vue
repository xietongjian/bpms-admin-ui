<template>
  <div class="company-tree bg-white overflow-hidden" v-loading="treeLoading">
    <BasicTree
      title="公司"
      toolbar
      search
      treeWrapperClassName="h-[calc(100%-35px)] overflow-auto"
      :clickRowToExpand="false"
      :treeData="treeData"
      @select="handleSelect"
      ref="basicTreeRef"
    />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, unref, nextTick, defineEmits } from 'vue';
  import { getCompanies } from '#/api/org/company';
  import { findNode } from '#/utils/helper/treeHelper';

  const emit = defineEmits(['select']);

  const treeData = ref<TreeItem[]>([]);
  const treeLoading = ref<boolean>(false);
  const basicTreeRef = ref<Nullable<TreeActionType>>(null);

  async function fetch() {
    treeLoading.value = true;
    getCompanies()
      .then((res) => {
        treeData.value = res as unknown as TreeItem[];
        nextTick(() => {
          // 加载后展开节层级
          if (unref(treeData).length < 10) {
            unref(basicTreeRef)?.filterByLevel(1);
          }
        });
      })
      .finally(() => {
        treeLoading.value = false;
      });
  }

  function handleSelect(keys: string, e) {
    const node = findNode(treeData.value, (item) => item.id === keys[0], {
      id: 'id',
      pid: 'pid',
      children: 'children',
    });
    emit('select', node);
  }

  onMounted(() => {
    fetch();
  });
</script>
