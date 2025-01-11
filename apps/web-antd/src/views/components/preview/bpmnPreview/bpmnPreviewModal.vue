<template>
  <BasicModal ref="bpmnContainerRef" class="aaaaaaaaaaaa w-[1000px] h-full">
    <template #title>
      流程图 - {{modelName??'-'}}
      <LoadingOutlined v-if="modelName === ''" />
    </template>
    <BpmnPreviewContainer
      :modelKey="modelKey"
      :procInstId="procInstId"
      ref="bpmnPreviewContainerRef"
      @data-change="handleDataChange"
    />
    <template #prepend-footer>
      <Dropdown>
        <template #overlay>
          <Menu @click="handleDownloadClick">
            <MenuItem key="png">PNG</MenuItem>
            <MenuItem key="svg">SVG</MenuItem>
            <MenuItem key="bpmn">BPMN</MenuItem>
            <MenuItem key="xml">XML</MenuItem>
          </Menu>
        </template>
        <Button type="primary" :loading="exportLoading">
          导出流程图
          <DownOutlined />
        </Button>
      </Dropdown>
    </template>
  </BasicModal>
</template>

<script lang="ts" setup>
import {computed, ref, unref, shallowRef, defineExpose, nextTick} from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import { BpmnPresetViewer } from '#/assets/bpmn/viewer/lib/bpmn-viewer.js';
  // import ApproveHistoryTimeLine from '#/views/components/process/ApproveHistoryTimeLine.vue';
  import BpmnPreviewContainer from './bpmnPreviewContainer.vue';
  import { Button, Space, Dropdown, Menu } from 'ant-design-vue';

  // import { useRequest } from '@vben/hooks';
  import {
    LoadingOutlined,
    CompressOutlined,
    ExpandOutlined,
    MinusOutlined,
    PlusOutlined,
    DownOutlined,
  } from '@ant-design/icons-vue';
  const bpmnPreviewContainerRef = ref();
  const modelKey = ref('');
  const procInstId = ref('');
  const MenuItem = Menu.Item;

  const bpmnContainerRef = ref(null);


  const [BasicModal, modalApi] = useVbenModal({
    // centered: true,
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          modelKey.value = values.modelKey;
          procInstId.value = values.procInstId;
          modalApi.setState({loading: false, confirmLoading: false});
        }
      } else {
        modelName.value = '';
      }
    },
    showConfirmButton: false,
    cancelText: '关闭',
  });
  const presetViewer = ref<ComponentInstance<typeof BpmnPresetViewer>>();
  const bpmnViewer = shallowRef();


  const exportLoading = ref<boolean>(false);
  const modelName = ref('');

  const processInstanceId = ref('');
  const processModelKey = ref('');

  /*const destroyModeler = () => {
  bpmnViewer.value?.clear();
}*/

  function handleDataChange(data) {
    modelName.value = data.modelName;
    // setTimeout(() => {
    //   processFitViewer();
    // });
  }

  async function handleDownloadClick({ key }) {
    exportLoading.value = true;
    await bpmnPreviewContainerRef.value?.downloadProcess(key, unref(modelName));
    exportLoading.value = false;
  }

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

/*  useRequest(
    () => {
      if (unref(processInstanceId)) {
        init('', unref(processInstanceId));
      }
      return Promise.resolve({});
    },
    {
      refreshOnWindowFocus: true,
    },
  );*/

  const getTitle = computed(() => '流程图-' + modelName.value);

  function handleFullscreen() {
    changeLoading(true);
    processFitViewer();
    setTimeout(() => {
      changeLoading(false);
    }, 200);
  }

  function onCloseBpmnPreviewModal() {
    processModelKey.value = '';
    processInstanceId.value = '';
    modelName.value = '';
  }

  async function init(modelKey, procInstId) {
    await presetViewer.value?.reloadViewerXML(modelKey, procInstId);
  }

  defineExpose(modalApi)
</script>

<style lang="less">
  .bpmn-viewer-container {
    .bpmn-viewer__toolbar {
      display: none;
    }
    overflow: visible;
    .ant-modal {
      .ant-modal-content {
        .ant-modal-body {
          .scroll-container {
            overflow: visible;
            padding: 0;
          }

          .scrollbar__wrap {
            overflow: visible;
          }

          &:hover {
            .svg-controller {
              bottom: 5px;
              opacity: 1;
              z-index: 9;
            }
          }
        }
      }
    }

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
