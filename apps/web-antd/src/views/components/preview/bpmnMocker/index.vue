<template>
  <BasicModal
      class="bpmn-mocker-container w-1/2 h-[600px]"
      content-class="overflow-hidden"
      @cancel="onCloseBpmnPreviewModal"
  >
    <template #title>
      {{ getTitle }}
      <LoadingOutlined v-if="modelName === ''"/>
    </template>
    <div class="containers h-full" ref="container">
      <BpmnMocker
          ref="bpmnMockerRef"
          :theme="getTheme"
          local="zh_CN"
          translate-prefix="bpmn.information."
      />
    </div>
  </BasicModal>
</template>

<script lang="ts" setup>
import {computed, nextTick, ref, defineExpose} from 'vue';
import {LoadingOutlined,} from '@ant-design/icons-vue';
import {BpmnMocker} from '#/assets/bpmn/viewer/lib/bpmn-viewer.js';
// import '#/assets/bpmn/viewer/lib/bpmn-viewer.css';
import {getBpmnByModelKey, getCustomFlowSequenceFlows} from "#/api/process/process";
import {useUserStore} from '@vben/stores';
import {useVbenModal} from '@vben/common-ui';
import {usePreferences} from '@vben/preferences';

const {isDark} = usePreferences();
const userStore = useUserStore();


const getTheme = computed(() => (isDark.value ? 'dark' : 'light'));

defineProps({
  title: {
    type: String,
    default: '流程模拟',
  },
});


const [BasicModal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  async onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const values = modalApi.getData<Record<string, any>>();
      if (values) {
        modalApi.setState({loading: false, confirmLoading: false});
        await nextTick();
        const {modelKey, procInstId, formData} = values;
        const flowData = {
          modelKey,
          dataJson: JSON.stringify(formData),
          procInstId,
          userCode: userStore?.userInfo?.userNo
        };

        const modelInfo = await getBpmnByModelKey({modelKey});

        modelName.value = modelInfo.name;
        bpmnMockerRef.value?.createNewProcess(modelInfo?.modelEditorXml);

        try {
          const sequenceFlows = await getCustomFlowSequenceFlows(flowData);

          bpmnMockerRef.value?.setSequenceFlows(sequenceFlows);
        } catch (e) {
          // changeLoading(false);
        } finally {
          // changeLoading(false);
        }
      }
    }
  },
  onConfirm() {
  },
});


const bpmnMockerRef = ref<any>();

const modelName = ref('');

const processInstanceId = ref('');
const processModelKey = ref('');

const getTitle = computed(() => '流程图-' + modelName.value);

function onCloseBpmnPreviewModal() {
  processModelKey.value = '';
  processInstanceId.value = '';
  modelName.value = '';
}

defineExpose(modalApi)
</script>

<style lang="scss">
//@import '#/assets/bpmn/viewer/lib/style.css';

.bpmn-mocker-container {
  .bpmn-viewer__toolbar {
    display: none;
  }
  overflow: visible;

  g.layer-djs-grid-line{
    opacity: 0.1;
  }

  .bjs-powered-by,
  .bjs-breadcrumbs {
    display: none;
  }
}
</style>
