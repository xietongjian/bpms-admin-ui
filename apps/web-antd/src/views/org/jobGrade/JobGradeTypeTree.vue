<template>
  <div class="bg-card h-full">
    <BasicTree
        :show-search="true"
        :show-toolbar="true"
        :tree-data="treeData"
        class="h-full flex flex-col"
        size="small"
        @select="handleSelect"
        title="分类"
    />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, unref, nextTick, defineEmits } from 'vue';
  import { findNode } from '#/utils/helper/treeHelper';
  import {Tree} from "ant-design-vue";
  import {HomeTwoTone, HomeOutlined, SmileOutlined} from "@ant-design/icons-vue";
  import {BasicTree} from "#/components/tree";
  import { getJobGradeTypesToTree } from '#/api/org/jobGradeType';

  const emit = defineEmits(['select']);

  const treeData = ref<any[]>([]);
  const treeLoading = ref<boolean>(false);
  const treeRef = ref(null);

  async function fetch() {
    treeLoading.value = true;
    getJobGradeTypesToTree({})
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

  function handleSelect(node: any) {
    emit('select', node);
  }

  onMounted(() => {
    fetch();
  });
</script>
