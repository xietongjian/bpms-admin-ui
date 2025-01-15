<template>
  <div class="w-full h-full" v-loading="treeLoading">
    <Tree
      class="h-full overflow-auto"
      title="流程分类"
      toolbar
      search
      treeWrapperClassName="h-[calc(100%-35px)] overflow-auto"
      :clickRowToExpand="false"
      :treeData="treeData"
      @select="handleSelect"
      ref="basicTreeRef"
      :fieldNames="{title: 'name'}"
      block-node
    />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, unref, nextTick, defineEmits } from 'vue';
  // import { BasicTree, TreeActionType, TreeItem } from '@/components/Tree';
  import { getFlowCategories } from '#/api/base/category';
  import { Tree, Tooltip } from 'ant-design-vue';
  import { forEach, listToTree } from '#/utils/helper/treeHelper';

  const emit = defineEmits(['select']);

  const treeData = ref<TreeItem[]>([]);
  const treeLoading = ref<boolean>(false);
  const basicTreeRef = ref<Nullable<TreeActionType>>(null);

  async function fetch() {
    try {
      treeLoading.value = true;
      const res = await getFlowCategories();

      treeData.value = listToTree(res);
      /*nextTick(() => {
          // 加载后展开节层级
          if (unref(treeData).length < 10) {
            unref(basicTreeRef)?.filterByLevel(1);
          }
        });*/
    } catch (e) {
    } finally {
      treeLoading.value = false;
    }
  }

  function handleSelect(keys: string, e) {
    emit('select', e.selectedNodes[0]);
  }

  onMounted(() => {
    fetch();
  });
</script>
