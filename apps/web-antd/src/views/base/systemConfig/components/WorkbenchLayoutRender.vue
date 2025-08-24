<template>
  <div ref="wrapper" class="w-full h-full">
    <GridLayout
            class="!h-full w-full"
            ref="gridLayout"
            v-model:layout="layout"
            :col-num="24"
            :row-height="10">
      <GridItem
          class="component-item overflow-auto"
          v-for="item in layout"
          :is-draggable="false"
          :is-resizable="false"
          :key="item.i"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :class="item.className"
      >
        <WidgetRender :is-draggable="false" :options="item" />
      </GridItem>
    </GridLayout>
  </div>
</template>
<script lang="ts" setup>
import {getSysConfigBySn, saveOrUpdate} from '#/api/base/systemConfig';
// import { usePermission } from '@/hooks/web/usePermission';
// import { useMessage } from '@/hooks/web/useMessage';
import { GridLayout, GridItem } from 'grid-layout-plus';
import {message} from 'ant-design-vue';
import {CaretLeftOutlined, CaretRightOutlined, CloseCircleOutlined} from '@ant-design/icons-vue';
// import { useAppStore } from '@/store/modules/app';
import { preferences, updatePreferences  } from '@vben/preferences';

import { reactive, watch, onMounted
  ,ref,onBeforeUnmount } from 'vue'
import { useThrottleFn } from '@vueuse/core';
import WidgetRender from "#/views/base/systemConfig/components/WorkbenchLayoutWidgetRender.vue";

// const appStore = useAppStore();

const layout = ref([
  { x: 0, y: 0, w: 8, h: 9, i: '0', field: 'TodoCenter' },
  { x: 8, y: 0, w: 4, h: 4, i: '1', field: 'WorkbenchHeader'},
  { x: 8, y: 8, w: 4, h: 4, i: '2', field: 'NoticeInfo'},
]);

const wrapper = ref<HTMLElement>()
const gridLayout = ref<any>()

onMounted(() => {
  document.addEventListener('dragover', syncMousePosition);
  const {app: {workbenchLayout}} = preferences;
  if (workbenchLayout) {
    const tempLayout = JSON.parse(workbenchLayout);
    layout.value = tempLayout;
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('dragover', syncMousePosition);
});

const mouseAt = { x: -1, y: -1 }

function syncMousePosition(event: MouseEvent) {
  mouseAt.x = event.clientX
  mouseAt.y = event.clientY
}

</script>
<style lang="scss" scoped>

</style>
