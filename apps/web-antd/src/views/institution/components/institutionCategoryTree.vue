<script setup lang="ts">
  import { computed, defineEmits, onMounted, ref } from 'vue';
  import { Empty, Spin } from 'ant-design-vue';
  // import { createTheme, NConfigProvider, NTree, treeDark } from 'naive-ui';
  // import TreeHeader from '@/components/Tree/src/components/TreeHeader.vue';
  import { getAllParentKeys } from '#/utils/helper/treeHelper';
  import { getInstitutionTree } from '#/api/institution/institution';
  // import { useDarkModeTheme } from '@/hooks/setting/useDarkModeTheme';
  import { usePreferences } from '@vben/preferences';

  defineOptions({ name: 'InstitutionCategoryTree' });

  const { isDark } = usePreferences();

  const emit = defineEmits(['select', 'contextmenu']);
  const slot = defineSlots<{
    actions(props: { node: any }): any;
  }>();
debugger;
  const treeTheme = computed(() => {
    // return isDark.value ? createTheme([treeDark]) : undefined;
    return undefined;
  });

  const treeData = ref<any[]>([]);
  const treeLoading = ref<boolean>(false);
  const expandedKeys = ref<string[]>([]);
  const selectedKeys = ref<string[]>([]);

  function expandAll(expandAll: boolean) {
    expandedKeys.value = expandAll ? getAllParentKeys(treeData.value) : ([] as string[]);
  }

  // 渲染操作按钮
  function renderActions({ option }) {
    return slot.actions?.({ node: option }) || null;
  }

  const nodeProps = ({ option }) => {
    return {
      onClick() {
        emit('select', option);
      },
    };
  };

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

  onMounted(() => fetch());
</script>

<template>
  <div class="company-tree mr-0 overflow-hidden" v-loading="treeLoading">
    <div class="h-full n-naive-framework-tree">
      <div>制度分类</div>
      <Spin
        wrapperClassName="h-[calc(100%-56px)] overflow-y-auto"
        :spinning="treeLoading"
        tip="加载中..."
      >
        <n-config-provider abstract preflight-style-disabled :theme="treeTheme">
          <n-tree
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
          </n-tree>
        </n-config-provider>
      </Spin>
    </div>
  </div>
</template>
