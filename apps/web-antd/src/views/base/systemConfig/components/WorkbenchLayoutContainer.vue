<template>
  <div class="flex h-full p-0 items-stretch gap-2">
    <div class="w-40 h-full overflow-y-auto border bg-blue/10 p-2"
         :class="{'!hidden': !componentPanelVisible}">
      <div class="flex flex-col gap-2 overflow-hidden">
        <div
            :data-drag-item="JSON.stringify(item)"
            v-for="item in componentList"
            :style="{ backgroundImage: `url(${item.widgetThumb})` }"
            class="w-full group !h-20 bg-no-repeat bg-cover border text-red-600/80 border-blue/50 cursor-move active:!bg-red-500/30 text-center flex items-center justify-center text-lg overflow-hidden"
            draggable="true"
            unselectable="on"
            @drag="drag"
            @dragend="dragEnd"
        >
          <span class="text-shadow-md text-shadow-red-900">{{ item.alias }}</span>
        </div>
      </div>
    </div>
    <div class="flex-1 h-full relative">
      <span @click="() => componentPanelVisible = !componentPanelVisible"
            class="absolute w-auto leading-10 rounded-md -left-0 !bg-blue-500/30 cursor-pointer hover:!bg-blue-500/60 z-50 top-1/2 transform -translate-y-1/2 block">
        <CaretLeftOutlined v-if="componentPanelVisible"/>
        <CaretRightOutlined v-else/>
      </span>
      <span @click="() => propertyPanelVisible = !propertyPanelVisible"
            class="absolute w-auto leading-10 rounded-md right-0 !bg-blue-500/30 cursor-pointer hover:!bg-blue-500/60 z-50 top-1/2 transform -translate-y-1/2 block">
        <CaretRightOutlined v-if="propertyPanelVisible"/>
        <CaretLeftOutlined v-else/>
      </span>
      <div ref="wrapper" class="flex-1 w-full h-full !relative overflow-x-hidden">
        <GridLayout class="bg-slate/10" ref="gridLayout" :is-bounded="true" v-model:layout="layout" :row-height="10">
          <GridItem
              class="component-item overflow-hidden [&_span.vgl-item__resizer]:!z-50 group"
              v-for="item in layout"
              :key="item.i"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :i="item.i"
              @resize="resize"
              @move="move"
              @resized="resized"
              @container-resized="containerResized"
              @moved="moved"
              @click="handleClick"
          >
            <span
                title="移除组件"
                class="!hidden group-hover:!flex group-hover:absolute !text-red-500 text-xl hover:!text-red-600 z-100 cursor-pointer top-0 right-0 size-6 rounded-full text-center items-center justify-center"
                @click="removeLayout(item.i)">
              <CloseCircleOutlined/>
            </span>
            <WidgetRender :options="item"/>
          </GridItem>
        </GridLayout>
      </div>
    </div>
    <div class="h-full w-2/10 !bg-slate/10 overflow-hidden"
         :class="{'!hidden': !propertyPanelVisible}">
      <h3 class="border-b-1 border-b-blue-200 p-2">属性面板</h3>
      <div class="p-2">
        <div class="space-y-2 gap-2">
            样式：<span class="text-secondary-foreground/50">(请输入tailwindcss样式名)</span>
          <TextArea :autoSize="{minRows: 3, maxRows:8}" placeholder="请输入样式名" v-model:value="selectedComponent.className" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {getSysConfigBySn, saveOrUpdate} from '#/api/base/systemConfig';
import {GridLayout, GridItem} from 'grid-layout-plus';
import {CaretLeftOutlined, CaretRightOutlined, CloseCircleOutlined} from '@ant-design/icons-vue';
import { preferences, updatePreferences  } from '@vben/preferences';
import {
  reactive, watch, onMounted, defineExpose, ref, onBeforeUnmount
} from 'vue'
import { useThrottleFn } from '@vueuse/core';
import WidgetRender from "#/views/base/systemConfig/components/WorkbenchLayoutWidgetRender.vue";
import {Button, Input, message} from "ant-design-vue";


const TextArea = Input.TextArea;

const dataLoading = ref(false);

const componentPanelVisible = ref(true);
const propertyPanelVisible = ref(false);
const selectedComponent = ref({});

const componentList = ref([
  {field: 'BannerInfo', className: '', alias: '轮播图', defaultW: 4, defaultH: 12, minW: 2, minH: 2, widgetThumb: '/resource/img/widget-thumb/banner.jpg'},
  {field: 'TodoCenter', className: '', alias: '待办中心', defaultW: 8, defaultH: 25, minW: 4, minH: 8, widgetThumb: '/resource/img/widget-thumb/todo-center.jpg'},
  {field: 'GrowCard', className: '', alias: '流程统计', defaultW: 4, defaultH: 12, minW: 2, minH: 2, widgetThumb: '/resource/img/widget-thumb/flow-count.jpg'},
  {field: 'CommonSystem', className: '', alias: '常用系统', defaultW: 3, defaultH: 10, minW: 3, minH: 4, widgetThumb: '/resource/img/widget-thumb/common-sys.jpg'},
  {field: 'NoticeInfo', className: '', alias: '公告公示', defaultW: 3, defaultH: 16, minW: 3, minH: 4, widgetThumb: '/resource/img/widget-thumb/notice.jpg'},
  {field: 'WorkbenchHeader', className: '', alias: '人员头像', defaultW: 4, defaultH: 6, minW: 4, minH: 8, widgetThumb: '/resource/img/widget-thumb/user-header.jpg'},
  {field: 'InstAndTaskAnalysis', className: '', alias: '流程图表', defaultW: 6, defaultH: 16, minW: 4, minH: 16, widgetThumb: '/resource/img/widget-thumb/flow-chart.jpg'},
  {field: 'QuickNav', className: '', alias: '常用业务', defaultW: 4, defaultH: 12, minW: 4, minH: 8, widgetThumb: '/resource/img/widget-thumb/common-biz.jpg'},
  {field: 'ProcessStatistics', className: '', alias: '统计图表', defaultW: 8, defaultH: 20, minW: 4, minH: 8, widgetThumb: '/resource/img/widget-thumb/flow-chart.jpg'},
]);

console.log('==================', preferences);
// const appStore = useAppConfig();

const layout = ref<any>([
  {x: 0, y: 0, w: 8, h: 9, i: '0', field: 'TodoCenter', className: ''},
  {x: 8, y: 0, w: 4, h: 4, i: '1', field: 'WorkbenchHeader', className: ''},
  {x: 8, y: 8, w: 4, h: 4, i: '2', field: 'NoticeInfo', className: ''},
]);

watch(layout, (newVal, oldVal) => {
  // console.log('=================>', newVal);
}, {deep: true});

function removeLayout(i) {
  const idx = layout.value.findIndex(item => i === item.i);
  layout.value.splice(idx, 1);
}

const wrapper = ref<HTMLElement>()
const gridLayout = ref<any>()

onMounted(() => {
  document.addEventListener('dragover', syncMousePosition);
  const {app: {workbenchLayout}} = preferences;
  if (workbenchLayout) {
    layout.value = JSON.parse(workbenchLayout);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('dragover', syncMousePosition);
});

const mouseAt = {x: -1, y: -1}

function selectCurrentDragItem(e) {
  if (e.target.dataset.elType === 'dragHandle') {
    const allItem = e.target.closest('.vgl-layout').children;
    if (allItem) {
      for (let i = 0; i < allItem.length; i++) {
        allItem[i].classList.remove('!outline-2');
        allItem[i].classList.remove('!outline-solid');
        allItem[i].classList.remove('!outline-blue-600');
      }
    }
    const currentSection = e.target.closest('section.vgl-item');
    currentSection.classList.add('!outline-2');
    currentSection.classList.add('!outline-solid');
    currentSection.classList.add('!outline-blue-600');
  }
}

function handleClick(e) {
  if (e.target.dataset.elType === 'dragHandle') {
    selectCurrentDragItem(e);
    const item = e.target.dataset.elItem;
    if (item) {
      // debugger;
      const itemObj = JSON.parse(item);

      let selectedL = layout.value.find(itm=>itm.i === itemObj.i);
      selectedL.className = itemObj.className;
      selectedComponent.value = selectedL;
    }
  }
}

function resize(e) {
  // console.log('====================>resize', e);
}

function move(e) {
  // console.log('====================>move', e);
}

function resized(e) {
  // console.log('====================>resized', e);
}

function containerResized(e) {
  // console.log('====================>containerResized', e);
}

function moved(e) {
  // console.log('====================>moved', e);
}

function syncMousePosition(event: MouseEvent) {
  mouseAt.x = event.clientX
  mouseAt.y = event.clientY
}

const dropId = 'drop'
const dragItem = {x: -1, y: -1, w: 2, h: 2, i: '', field: '', className: ''}

const drag = useThrottleFn((e) => {
  const parentRect = wrapper.value?.getBoundingClientRect()

  if (!parentRect || !gridLayout.value) return
  const mouseInGrid =
      mouseAt.x > parentRect.left &&
      mouseAt.x < parentRect.right &&
      mouseAt.y > parentRect.top &&
      mouseAt.y < parentRect.bottom

  if (mouseInGrid && !layout.value.find(item => item.i === dropId)) {
    layout.value.push({
      x: (layout.value.length * 2) % 12,
      y: layout.value.length + 12, // puts it at the bottom
      w: 2,
      h: 2,
      i: dropId,
    })
  }

  const index = layout.value.findIndex(item => item.i === dropId)
  if (index !== -1) {
    const item = gridLayout.value.getItem(dropId)

    if (!item) return

    try {
      item.wrapper.style.display = 'none'
    } catch (e) {
    }

    Object.assign(item.state, {
      top: mouseAt.y - parentRect.top,
      left: mouseAt.x - parentRect.left,
    })
    const newPos = item.calcXY(mouseAt.y - parentRect.top, mouseAt.x - parentRect.left)

    const dragItemData = e.target.dataset.dragItem;
    let defaultW = 2;
    let defaultH = 2;
    let fieldName = '';
    let className = '';
    if (dragItemData) {
      const itemObj = JSON.parse(dragItemData);
      fieldName = itemObj.field;
      className = itemObj.className;
      defaultW = itemObj.defaultW;
      defaultH = itemObj.defaultH;
    }

    if (mouseInGrid) {
      gridLayout.value.dragEvent('dragstart', dropId, newPos.x, newPos.y, defaultH, defaultW)
      dragItem.i = String(index + new Date().getTime());
      dragItem.x = layout.value[index].x;
      dragItem.y = layout.value[index].y;
      dragItem.field = fieldName;
      dragItem.className = className;
      dragItem.w = defaultW;
      dragItem.h = defaultH;
    } else {
      gridLayout.value.dragEvent('dragend', dropId, newPos.x, newPos.y, dragItem.h, dragItem.w)
      layout.value = layout.value.filter(item => item.i !== dropId)
    }
  }
}, 300, true, true)

function dragEnd() {
  const parentRect = wrapper.value?.getBoundingClientRect()

  if (!parentRect || !gridLayout.value) return

  const mouseInGrid =
      mouseAt.x > parentRect.left &&
      mouseAt.x < parentRect.right &&
      mouseAt.y > parentRect.top &&
      mouseAt.y < parentRect.bottom

  if (mouseInGrid) {
    console.log(`Dropped element props:\n${JSON.stringify(dragItem, ['x', 'y', 'w', 'h'], 2)}`);
    // alert(`Dropped element props:\n${JSON.stringify(dragItem, ['x', 'y', 'w', 'h'], 2)}`)
    gridLayout.value.dragEvent('dragend', dropId, dragItem.x, dragItem.y, dragItem.h, dragItem.w)
    layout.value = layout.value.filter(item => item.i !== dropId)
  } else {
    return;
  }

  layout.value.push({
    x: dragItem.x,
    y: dragItem.y,
    w: dragItem.w,
    h: dragItem.h,
    i: dragItem.i,
    field: dragItem.field,
    className: dragItem.className,
  });
  gridLayout.value.dragEvent('dragend', dragItem.i, dragItem.x, dragItem.y, dragItem.h, dragItem.w);

  const item = gridLayout.value.getItem(dropId);

  if (!item) return;

  try {
    item.wrapper.style.display = '';
  } catch (e) {
    console.error(e);
  }
}
async function doSave() {
  try {
    dataLoading.value = true;
    console.log('save...', JSON.stringify(layout.value));
    // SYS_COM_WORKBENCH_LAYOUT
    let configObj = {
      configSn: 'SYS_COM_WORKBENCH_LAYOUT',
      configKey: 'SYS_COM_WORKBENCH_LAYOUT',
      configValue: JSON.stringify(layout.value)
    }
    const config = await getSysConfigBySn({sn: 'SYS_COM_WORKBENCH_LAYOUT'});
    if (config) {
      configObj = config;
      configObj.configValue = JSON.stringify(layout.value);
    }
    const {success, msg} = await saveOrUpdate(configObj);

    if (success) {
      message.success(msg);
      // 更新缓存
      updatePreferences({app: {workbenchLayout: configObj.configValue}});
    } else {
      message.error(msg);
    }
  } catch (e) {
    console.error(e)
  } finally {
    dataLoading.value = false;
  }
}

defineExpose({
  doSave
})

</script>
<style lang="scss" scoped>
.vgl-layout {
  //background-color: #eee;
  border: 1px solid rgba(255, 0, 0, 0.3);
  height: 100%;
  overflow-y: auto;
}
.vgl-layout::before {
  position: absolute;
  width: calc(100% - 5px);
  height: calc(100% - 5px);
  margin: 5px;
  content: '';
  background-image:
      linear-gradient(to right, lightgrey 1px, transparent 1px),
      linear-gradient(to bottom, lightgrey 1px, transparent 1px);
  background-repeat: repeat;
  background-size: calc(calc(100% - 5px) / 12) 40px;
}

.component-item {
  :deep(.vgl-item__resizer) {
    z-index: 199 !important;
  }
}

:deep(.vgl-item:not(.vgl-item--placeholder)) {
  background-color: transparent;
  outline: 1px dotted green;
}

:deep(.vgl-item--resizing) {
  opacity: 90%;
}

:deep(.vgl-item--static) {
  background-color: #cce;
}

.columns {
  columns: 200px;
}

</style>
