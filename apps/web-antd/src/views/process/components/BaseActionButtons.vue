<template>
  <div>
    <Space>
<!--      <Button title="打印" @click="handlePrintProcess">
        <template #icon>
          <PrinterOutlined/>
        </template>
      </Button>-->
      <Button title="查看流程图" @click="showFlowDiagram">
        <template #icon>
          <ApartmentOutlined/>
        </template>
      </Button>
    </Space>
    <BpmnPreviewModal @register="registerBpmnPreviewModal"/>
    <!--    <PrintPreviewModal @register="registerPrintPreviewModal" />-->
  </div>
</template>
<script lang="ts" setup>
  import {ApartmentOutlined, PrinterOutlined} from '@ant-design/icons-vue';
  import {Button, Space} from 'ant-design-vue';
  import {useRouter} from 'vue-router';
  import {useModal} from '@/components/Modal';
  import BpmnPreviewModal from '#/views/components/preview/bpmnPreview/index.vue';
  // import PrintPreviewModal from '#/views/components/preview/printPreview/index.vue';
  import {useGo} from '@/hooks/web/usePage';

  const props = defineProps({
    formType: {
      type: Number,
      default: 0,
    },
    modelKey: {
      type: String,
      default: '',
    },
    bizId: {
      type: String,
      default: '',
    },
    procInstId: {
      type: String,
      default: '',
    },
    taskId: {
      type: String,
      default: '',
    },
  });
  const {currentRoute} = useRouter();
  const go = useGo();
  // const {params: {modelKey, procInstId, bizId, taskId}} = unref(currentRoute);

  const [registerBpmnPreviewModal, {
    openModal: openBpmnPreviewModal,
    setModalProps: setBpmnPreviewProps
  }] = useModal();
  const [registerPrintPreviewModal, {
    openModal: openPrintPreviewModal,
    setModalProps: setPrintPreviewProps
  }] = useModal();

  function showFlowDiagram() {
    openBpmnPreviewModal(true, {
      name: '',
      modelKey: props.modelKey,
      procInstId: (!props.procInstId || props.procInstId === '0') ? '' : props.procInstId,    // 参数空时传过来的是0
    });
    setBpmnPreviewProps({
      centered: true,
      useWrapper: false,
      showOkBtn: false,
      cancelText: '关闭'
    });
  }

  function handleCloseFunc() {
    return Promise.resolve(true);
  }

  function handlePrintProcess() {
    go(`/process/print/${props.modelKey}/${props.procInstId}/${props.bizId}/${props.taskId}/0`);
  }
</script>
