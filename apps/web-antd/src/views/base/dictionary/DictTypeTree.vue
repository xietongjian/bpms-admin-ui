<template>
  <div class="bg-card h-full">
    <BasicTree
        ref="basicTreeRef"
        title="字典分类"
        :show-search="true"
        :show-toolbar="true"
        class="h-full w-full flex flex-col"
        size="small"
        :tree-data="treeData"
        @select="handleSelect"
        :height="treeHeight"
        :field-names="{children:'children', title:'name', key:'id' }"
    />
  </div>
</template>
<script lang="ts" setup>
import {onMounted, ref, defineEmits, computed} from 'vue';
import {getDicTypes} from '#/api/base/dicType';
import {BasicTree} from "#/components/tree";
import {useElementSize} from '@vueuse/core'

const emit = defineEmits(['select']);

const treeData = ref<any[]>([]);
const treeLoading = ref<boolean>(false);
const basicTreeRef = ref<any>(null);
const {height} = useElementSize(basicTreeRef);

const treeHeight = computed(() => {
  return height.value - 70;
})

async function fetch() {
  treeData.value = (await getDicTypes()) as unknown as any[];
}

function handleSelect(node: any) {
  emit('select', node);
}

onMounted(() => {
  fetch();
});
</script>
