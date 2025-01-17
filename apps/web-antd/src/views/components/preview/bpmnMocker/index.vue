<template>
  <BasicModal
    wrapClassName="bpmn-viewer-container "
    v-bind="$attrs"
    @cancel="onCloseBpmnPreviewModal"
  >
    <template #title>
      {{ getTitle }}
      <LoadingOutlined v-if="modelName === ''"/>
    </template>
    <div class="bpmn-container">
      <div class="containers" ref="container">
        <BpmnMocker
          ref="bpmnMockerRef"
          :theme="getTheme"
          local="zh_CN"
          translate-prefix="bpmn.information."
        />
      </div>
    </div>
  </BasicModal>
</template>

<script lang="ts" setup>
import {ComponentInstance, computed, nextTick, ref} from 'vue';
import {LoadingOutlined,} from '@ant-design/icons-vue';
import {BpmnMocker, BpmnPresetViewer} from '#/assets/bpmn/viewer/lib/bpmn-viewer.js';
import '#/assets/bpmn/viewer/lib/bpmn-viewer.css';
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
        // baseFormApi.setValues(values);
        modalApi.setState({loading: false, confirmLoading: false});
        await nextTick();
        const {modelKey, procInstId, formData} = values;
        const flowData = {
          modelKey,
          dataJson: JSON.stringify(formData),
          procInstId,
          userCode: userStore?.getUserInfo?.userNo
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
    // await baseFormApi.submitForm();
    // handleSubmit();
  },
});


const bpmnMockerRef = ref<ComponentInstance<typeof BpmnPresetViewer>>();

const modelName = ref('');

const processInstanceId = ref('');
const processModelKey = ref('');
/*
const [registerModal, {setModalProps, changeLoading}] = useModalInner(async (data) => {
  changeLoading(true);
  setModalProps({
    width: 1100,
    minHeight: 450,
  });

  await nextTick();
  const {modelKey, procInstId, formData} = data;
  const flowData = {
    modelKey,
    dataJson: JSON.stringify(formData),
    procInstId,
    userCode: userStore?.getUserInfo?.userNo
  };

  const modelInfo = await getBpmnByModelKey({modelKey});

  modelName.value = modelInfo.name;
  bpmnMockerRef.value?.createNewProcess(modelInfo?.modelEditorXml);

  try {
    const sequenceFlows = await getCustomFlowSequenceFlows(flowData);

    bpmnMockerRef.value?.setSequenceFlows(sequenceFlows);
  } catch (e) {
    changeLoading(false);
  } finally {
    changeLoading(false);
  }
});*/

const getTitle = computed(() => '流程图-' + modelName.value);

function onCloseBpmnPreviewModal() {
  processModelKey.value = '';
  processInstanceId.value = '';
  modelName.value = '';
}

</script>

<style lang="scss">
//@import '#/assets/bpmn/viewer/lib/style.css';

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
}

.bjs-powered-by,
.bjs-breadcrumbs {
  display: none;
}
</style>
