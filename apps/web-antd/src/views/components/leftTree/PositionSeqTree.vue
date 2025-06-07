<template>
  <div class="bg-card h-full w-full">
    <BasicTree
      ref="basicTreeRef"
      title="岗位序列"
      :show-search="true"
      :show-toolbar="true"
      class="h-full flex flex-col"
      size="small"
      :tree-data="treeData"
      @select="handleSelect"
      :height="treeHeight"
      :field-names="{children:'children', title:'name', key:'id' }"

    />
  </div>
</template>
<script lang="ts" setup>
import {onMounted, ref, unref, nextTick, defineEmits, computed} from 'vue';
  import {BasicTree} from "#/components/tree";
  import { getPositionSeqs } from '#/api/org/positionSeq';
  import { useElementSize } from '@vueuse/core'

  const emit = defineEmits(['select']);

  const treeData = ref<any[]>([]);
  const treeLoading = ref<boolean>(false);
  const basicTreeRef = ref<any>(null);
  const { height } = useElementSize(basicTreeRef);

  const treeHeight = computed(() => {
    return height.value - 70;
  })

  async function fetch() {
    treeLoading.value = true;
    getPositionSeqs()
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
