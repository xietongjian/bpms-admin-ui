<template>
  <div class="company-tree bg-white overflow-hidden" v-loading="treeLoading">
    <Tree
      ref="treeRef"
      v-bind="$attrs"
      v-if="treeData.length > 0"
      :class="$attrs.class"
      :field-names="{ title: 'title', key: 'key' }"
      :show-line="false"
      :tree-data="treeData"
      block-node
      :virtual="false"
      default-expand-all
      @select="handleSelect"
    >
    </Tree>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, unref, nextTick, defineEmits } from 'vue';
  import { getCompanies } from '#/api/org/company';
  import { findNode } from '#/utils/helper/treeHelper';
  import {Tree} from "ant-design-vue";

  const emit = defineEmits(['select']);

  const treeData = ref<any[]>([]);
  const treeLoading = ref<boolean>(false);
  const treeRef = ref(null);

  async function fetch() {
    treeLoading.value = true;
    getCompanies()
      .then((res) => {
        treeData.value = res||[];
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
