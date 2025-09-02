<script setup lang="ts">
import {computed, defineEmits, onMounted, ref} from 'vue';
import {getAllParentKeys} from '#/utils/helper/treeHelper';
import {getInstitutionTree} from '#/api/institution/institution';
import {BasicTree} from "#/components/tree";
import {useElementSize} from "@vueuse/core";

const basicTreeRef = ref();

const {height} = useElementSize(basicTreeRef);

const treeHeight = computed(() => {
  return height.value - 70;
})
defineOptions({name: 'InstitutionCategoryTree'});

const emit = defineEmits(['select']);

const treeData = ref<any[]>([]);
const treeLoading = ref<boolean>(false);
const expandedKeys = ref<string[]>([]);

// 初始数据加载
async function fetch() {
  try {
    treeLoading.value = true;
    const res = await getInstitutionTree();
    treeData.value = res;
    expandedKeys.value = getAllParentKeys(res);
  } catch (e) {
    console.error(e);
  } finally {
    treeLoading.value = false;
  }
}

function handleSelect(node: any) {
  emit('select', node);
}

onMounted(() => fetch());
</script>

<template>
  <div class="bg-card h-full w-full">
    <!--      <div>制度分类</div>-->
    <BasicTree
        ref="basicTreeRef"
        title="制度分类"
        :show-search="true"
        :show-toolbar="true"
        :tree-data="treeData"
        class="h-full flex flex-col"
        size="small"
        @select="handleSelect"
        :height="treeHeight"
    />

    <!--      <Spin
            wrapperClassName="h-[calc(100%-56px)] overflow-y-auto"
            :spinning="treeLoading"
            tip="加载中..."
          >
            <Tree
                v-model:expanded-keys="expandedKeys"
                v-model:selected-keys="selectedKeys"
                :data="treeData"
                :render-suffix="renderActions"
                :node-props="nodeProps"
                block-line
                key-field="id"
                label-field="name"
            >
              <template #empty>
                <Empty :image="Empty.PRESENTED_IMAGE_SIMPLE" class="!mt-4" />
              </template>
            </Tree>
          </Spin>-->
  </div>
</template>
