<template>
  <div class="bg-card h-full w-full">
    <BasicTree
        ref="basicTreeRef"
        title="公司"
        :show-search="true"
        :show-toolbar="true"
        :tree-data="treeData"
        class="h-full flex flex-col"
        size="small"
        @select="handleSelect"
        :height="treeHeight"
    />
<!--    <div class="h-[30px] leading-[30px] font-md font-bold">
      公司
    </div>
    <div class="flex-1 overflow-auto">
      <BasicTree
          :show-search="true"
          :show-toolbar="true"
          :tree-data="treeData"
          class="mb-4 h-full w-full"
          title="公司"
      />
&lt;!&ndash;      <Tree
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
        <template #icon>
          <HomeOutlined />
        </template>
      </Tree>&ndash;&gt;
    </div>-->
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, computed, unref, nextTick, defineEmits } from 'vue';
  import {getCompanies, getCompanyTreeData} from '#/api/org/company';
  import { findNode } from '#/utils/helper/treeHelper';
  import {Tree} from "ant-design-vue";
  import {HomeTwoTone, HomeOutlined, SmileOutlined} from "@ant-design/icons-vue";
  import {BasicTree} from "#/components/tree";
  import { useUserStore } from '@vben/stores';
  import {useElementSize} from "@vueuse/core";

  const userStore = useUserStore();

  const emit = defineEmits(['select']);
  const selectedKeys = ref<string[]>([]);

  /*watch(
      selectedKeys,
      (newValue, oldValue) => {
        console.log(newValue);
        // handleSearch();
        // debugger
        emit('select', newValue && newValue[0]);
      },
  );*/

  const treeData = ref<any[]>([]);
  const treeLoading = ref<boolean>(false);
  const basicTreeRef = ref(null);
  const { height } = useElementSize(basicTreeRef);

  const treeHeight = computed(() => {
    return height.value - 70;
  })
  async function fetch() {
    treeLoading.value = true;
    getCompanyTreeData()
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
