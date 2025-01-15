<template>
  <div class="bpmn-viewer-container w-full h-full">
    <div class="containers group relative h-full w-full" ref="container" >
      <BpmnPresetViewer
          v-if="modelKey || procInstId"
          ref="presetViewer"
          :theme="getTheme"
          local="zh_CN"
          translate-prefix="bpmn.information."
          :procInstId="procInstId"
          :modelKey="modelKey"
          @viewer-init="handleViewerInit"
          @data-change="handleDataChange"
      />
      <div class="svg-controller transition-all text-center -bottom-20 group-hover:bottom-0 group-hover:block absolute bottom-0 hidden w-full overflow-hidden">
        <div class="scale-rate">
          {{ Math.floor(defaultZoom * 10 * 10) + '%' }}
        </div>
        <Space>
          <Button
              title="缩小"
              shape="circle"
              size="small"
              @click="processZoomOut()"
              type="primary"
          >
            <MinusOutlined />
          </Button>
          <Button
              :title="isFitView ? '按窗口大小显示' : '实际大小'"
              shape="circle"
              size="small"
              @click="processFitContainer()"
              type="primary"
          >
            <CompressOutlined v-if="isFitView" />
            <ExpandOutlined v-else />
          </Button>
          <Button
              title="放大"
              shape="circle"
              size="small"
              @click="processZoomIn()"
              type="primary"
          >
            <PlusOutlined />
          </Button>
        </Space>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, unref, shallowRef, defineProps, defineEmits, defineExpose, watch} from 'vue';
  import { Button, Space } from 'ant-design-vue';
  import {
    CompressOutlined,
    ExpandOutlined,
    MinusOutlined,
    PlusOutlined,
  } from '@ant-design/icons-vue';
  import { BpmnPresetViewer } from '#/assets/bpmn/viewer/lib/bpmn-viewer.js';
  import { useElementSize  } from '@vueuse/core'

  import '#/assets/bpmn/viewer/lib/style.css';
  import { usePreferences } from '@vben/preferences';
  const emit = defineEmits(['data-change']);
  const { isDark } = usePreferences();
  const getTheme = computed(() => (isDark.value ? 'dark' : 'light'));


  defineProps({
    title: {
      type: String,
      default: '流程预览',
    },
    modelKey: {
      type: String,
      default: '',
    },
    procInstId: {
      type: String,
      default: '',
    }
  });
  const isFitView = ref<boolean>(false);
  const fitViewScaleRate = ref(1);
  const defaultZoom = ref<number>(1);
  const presetViewer = ref<any>();
  const bpmnViewer = shallowRef();

  const modelName = ref('');

  const processInstanceId = ref('');
  const processModelKey = ref('');
  const { width, height } = useElementSize(presetViewer)


  const sizeTimer = ref(false);

  watch(height,
      (newValues, oldValues) => {
        if(!sizeTimer.value){
          sizeTimer.value = true;
          debugger;
          setTimeout(() => {
            processFitViewer();
            sizeTimer.value = false;
          }, 100);
        }
      },
      {
        immediate: false // 如果需要在组件实例化时立即执行，则设置为true
      }
  );

  function processFitContainer() {
    const canvas = bpmnViewer.value?.get('canvas');

    if (isFitView.value) {
      isFitView.value = false;
      canvas.zoom('fit-viewport', { x: 0, y: 0 });
      defaultZoom.value = canvas.zoom();
    } else {
      isFitView.value = true;
      defaultZoom.value = 1;
      canvas.zoom('fit-viewport', { x: 0, y: 0 });
      canvas.zoom(defaultZoom.value);
    }
  }
  function processFitViewer() {
    isFitView.value = true;
    try {
      const canvas = bpmnViewer.value?.get('canvas');

      canvas.zoom(defaultZoom.value);
      canvas.zoom('fit-viewport', {x: 0, y: 0});
      defaultZoom.value = canvas.zoom();
    } catch (e) {
    } finally {
    }
  }

  function processZoomIn(zoomStep = 0.1) {
    let newZoom = Math.floor(defaultZoom.value * 100 + zoomStep * 100) / 100;
    if (newZoom > 4) {
      newZoom = 4;
      // throw new Error("[Process Designer Warn ]: The zoom ratio cannot be greater than 4");
    }
    defaultZoom.value = newZoom;
    bpmnViewer.value?.get('canvas').zoom(defaultZoom.value);
  }

  function processZoomOut(zoomStep = 0.1) {
    let newZoom = Math.floor(defaultZoom.value * 100 - zoomStep * 100) / 100;
    if (newZoom < 0.2) {
      newZoom = 0.2;
      // throw new Error("[Process Designer Warn ]: The zoom ratio cannot be less than 0.2");
    }
    defaultZoom.value = newZoom;
    bpmnViewer.value?.get('canvas').zoom(defaultZoom.value);
  }

  // 预览流程图时 - 鼠标滚动缩放
  function changeScale(e) {
    const scal = e.deltaY > 0 ? -0.1 : 0.1;
    if (unref(defaultZoom) < 0.2) {
      defaultZoom.value = 0.2;
    }
    if (unref(defaultZoom) > 4.0) {
      defaultZoom.value = 4.0;
    }
    defaultZoom.value = unref(defaultZoom) + scal;
    bpmnViewer.value?.get('canvas').zoom(unref(defaultZoom));

    isFitView.value = defaultZoom.value >= fitViewScaleRate.value;
  }

  async function downloadProcess({ key }) {
    await presetViewer.value?.downloadProcess(key, unref(modelName));
  }

  function handleViewerInit(v) {
    bpmnViewer.value = v;
  }

  function handleDataChange(data) {
    modelName.value = data.modelName;
    emit('data-change', data);
  }
  //
  // const [registerModal, { setModalProps, changeLoading }] = useModalInner(async (data) => {
  //   setModalProps({
  //     width: 1100,
  //     minHeight: 450,
  //   });
  //
  //   const { modelKey, procInstId } = data;
  //   processModelKey.value = modelKey;
  //   processInstanceId.value = procInstId;
  // });
  //
  // useRequest(
  //   () => {
  //     if (unref(processInstanceId)) {
  //       init('', unref(processInstanceId));
  //     }
  //     return Promise.resolve({});
  //   },
  //   {
  //     refreshOnWindowFocus: true,
  //   },
  // );

  // function handleFullscreen() {
  //   changeLoading(true);
  //   processFitViewer();
  //   setTimeout(() => {
  //     changeLoading(false);
  //   }, 200);
  // }

  function onCloseBpmnPreviewModal() {
    processModelKey.value = '';
    processInstanceId.value = '';
    modelName.value = '';
  }

  async function init(modelKey, procInstId) {
    await presetViewer.value?.reloadViewerXML(modelKey, procInstId);
  }

  defineExpose({downloadProcess})
</script>

<style lang="scss">
  @import '#/assets/bpmn/viewer/lib/style.css';
  .bpmn-viewer-container {
    .bpmn-viewer__toolbar {
      display: none;
    }
    overflow: visible;

    .bpmn-container {
      padding: 0 10px;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      overflow: visible;

      .svg-controller {
        z-index: 99;
        text-align: center;
        position: absolute;
        bottom: -5px;
        opacity: 0;
        transition: 0.8s;
        margin: auto;
        width: 100%;

        .scale-rate {
          font-size: 14px;
          line-height: 20px;
        }
      }

      .svg-container {
        height: 100%;
        cursor: move;
      }
      g.layer-djs-grid-line rect {
        fill: transparent !important;
      }
    }
  }

  .bjs-powered-by,
  .bjs-breadcrumbs {
    display: none;
  }
</style>
