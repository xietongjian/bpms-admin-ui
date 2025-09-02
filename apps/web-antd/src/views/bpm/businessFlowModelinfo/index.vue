<template>
  <ColPage
      :left-max-width="50"
      :left-min-width="10"
      :left-width="20"
      :split-handle="false"
      :split-line="false"
      :resizable="true"
      :left-collapsible="false"
      :auto-content-height="true"
      content-class="h-full">
    <template #left>
      <BpmFrameWorkTree
          ref="frameWorkTree"
          class="w-3/10 xl:3/10"
          type="3"
          :draggable="false"
          :max-level="4"
          @select="handleDetails"
      >
        <template #actions="{ node }">
          <Tooltip
              v-if="
              node.extra?.type === '3' && hasAccessByCodes([PerPrefix + PerEnum.UPDATE])
            "
              title="关联流程"
              placement="bottom"
          >
            <PlusOutlined
                class="m-2"
                style="color: #536dfe; cursor: pointer"
                @click="handleModelInfoSelector(node)"
            />
          </Tooltip>
          <Tooltip
              v-if="
              node.extra?.type === '4' && hasAccessByCodes([PerPrefix + PerEnum.UPDATE])
            "
              title="删除流程"
              placement="bottom"
          >
            <DeleteOutlined
                class="m-2"
                style="color: #ed6f6f; cursor: pointer"
                @click="handleDelete(node)"
            />
          </Tooltip>
        </template>
      </BpmFrameWorkTree>
    </template>
    <div class="ml-2 h-full bg-card" v-loading="previewLoading">
      <div v-if="selectedNode?.id" class="flex h-full">
        <div class="content-container w-full">
          <BpmnViewer
              v-if="showXml"
              ref="viewerRef"
              :show-download="selectedNode.extra.type === '3'"
              :file-name="selectedNode.name"
              :theme="isDark ? 'dark' : 'light'"
              translate-prefix="bpmn.information."
          />
          <IntegralDesigner
              v-else
              ref="framePageRef"
              translate-prefix="logicflow.base."
              :editable="false"
              :theme="isDark ? 'dark' : 'light'"
          />
          <div style="line-height: 200px; text-align: center">
            <Spin tip="加载中..."/>
          </div>
        </div>
        <div
            class="ml-2 p-2 base-info-box"
            :class="{ 'base-info-box-collapse': infoCollapsed }"
            style="padding-top: 10px; overflow-y: scroll"
        >
          <Tooltip :title="infoCollapsed ? '展开' : '收起'" @click="infoCollapsed = !infoCollapsed">
            <span style="cursor: pointer" class="font-bold text-md">
              <MenuFoldOutlined v-show="infoCollapsed"/>
              <MenuUnfoldOutlined v-show="!infoCollapsed"/>
              基本信息
            </span>
          </Tooltip>

          <Descriptions
              class="mt-2 p-4"
              v-if="!infoCollapsed"
              size="middle"
              :bordered="false"
              :column="1"
          >
            <DescriptionsItem
                v-for="item in detailsSchema"
                :label="item.label">{{ selectedNodeInfo[item.fieldName] }}
            </DescriptionsItem>
          </Descriptions>
        </div>
      </div>

      <div v-else class="p-4 h-full">
        <Empty description="请选择左侧体系/架构进行预览！"/>
      </div>
    </div>

    <FlowModelSelectorModal ref="modelInfoSelectorModalRef" @change="handleChange"/>
  </ColPage>
</template>

<script lang="ts" setup>
import {computed, createVNode, nextTick, ref, shallowRef} from 'vue';

import type {Recordable} from '@vben/types';

import {ColPage} from '@vben/common-ui';
// import { useModal } from '@/components/Modal';
// import ModelInfoSelectorModal from '#/components/Selector/src/ModelInfoSelectorModal.vue';
import FlowModelSelectorModal from '#/components/selector/flow-model-selector/SelectorModal.vue';

import {message, Empty, Descriptions, DescriptionsItem, Modal, Spin, Tooltip} from 'ant-design-vue';
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue';
import {BpmnViewer} from '#/assets/bpmn/viewer/lib/bpmn-viewer';
import {IntegralDesigner} from '#/assets/logicflow/lf-designer';
// import { Description } from '@/components/Description';
import {detailSystemViewSchema, detailViewSchema} from '#/views/bpm/framework/framework.data';
import {detailSchema, flowDetailSchema} from '#/views/bpm/businessFlow/businessFlowApply.data';
import {deleteByIds, saveOrUpdate} from '#/api/bpm/businessFlowModelinfo';
import {getBusinessFlowById} from '#/api/bpm/businessFlowApply';
import {getById} from '#/api/bpm/framework';
import {getBpmnFlowById} from '#/api/bpm/businessflow';
import BpmFrameWorkTree from '#/views/bpm/components/BpmFrameWorkTree.vue';
import {usePreferences} from '@vben/preferences';
import {useAccess} from "@vben/access";

import {PerEnum} from '#/enums/perEnum';
// import { usePermission } from '@/hooks/web/usePermission';
// import { useDarkModeTheme } from '@/hooks/setting/useDarkModeTheme';

const {isDark} = usePreferences();
const PerPrefix = 'BusinessFlowModelinfo:';
// const { createMessage } = useMessage();
// const { hasPermission } = usePermission();
const {hasAccessByCodes} = useAccess();

const modelInfoSelectorModalRef = ref();
const pageLoading = ref(false);
const frameWorkTree = shallowRef<any>();
const framePageRef = shallowRef<any>();
const viewerRef = shallowRef<any>();

const businessFlowId = ref('');
const selectedBindTarget = ref<Recordable<any>>({});

const selectedNode = ref<Recordable<any>>({});
const showXml = ref(false);
const previewLoading = ref(false);
const infoCollapsed = ref(true);
// 基本信息
const selectedNodeInfo = ref<Record<string, any>>({});
const detailsSchema = computed(() => {
  if (!selectedNode.value.extra) {
    return [];
  }
  if (selectedNode.value.extra.type === '1') return detailSystemViewSchema;
  if (selectedNode.value.extra.type === '2') return detailViewSchema;
  if (selectedNode.value.extra.type === '3') return detailSchema;
  if (selectedNode.value.extra.type === '4') return flowDetailSchema;
  return [];
});

/*  const [
    registerModelInfoSelectorModal,
    { openModal: openModelInfoSelectorModal, setModalProps: setModelInfoSelectorModalProps },
  ] = useModal();*/

// 关联弹窗处理
function handleModelInfoSelector(record: Recordable<any>) {
  businessFlowId.value = record.id;
  selectedBindTarget.value = record;
  modelInfoSelectorModalRef.value.setData({
    record: record,
    multiple: true,
    selectorProps: {
      selectedList: [],
      multiple: true,
    },
  });
  modelInfoSelectorModalRef.value.setState({
    title: '关联流程',
  });
  modelInfoSelectorModalRef.value.open();
}

// 流程关联
async function handleChange(items: any[]) {
  try {
    pageLoading.value = true;
    let modelInfoIds: string[] = [];
    if (items) {
      modelInfoIds = items.map((item) => item.id);
    }
    const saveData = {
      businessFlowId: businessFlowId.value,
      modelInfoIds,
    };
    const {success, msg} = await saveOrUpdate(saveData);

    // await frameWorkTree.value?.fetch();
    await frameWorkTree.value?.handleReload(selectedBindTarget.value);
  } catch (e) {
    console.error(e);
  } finally {
    pageLoading.value = false;
  }
}

// 移除关联
function handleDelete(node: Recordable<any>) {
  Modal.confirm({
    icon: createVNode(ExclamationCircleOutlined),
    okText: '确定',
    cancelText: '取消',
    okButtonProps: {danger: true},
    content: `确定要发布【${node.name}】流程吗？`,
    onOk: async () => {
      try {
        pageLoading.value = true;
        const {success, msg} = await deleteByIds([node.id]);
        if (success) {
          message.success('删除成功！');
          selectedNode.value = {};
        } else {
          message.error(msg);
        }
        // await frameWorkTree.value?.fetch();
        await frameWorkTree.value?.handleDelete(node);
      } catch (e) {
        console.error(e);
      } finally {
        pageLoading.value = false;
      }
    },
  });
}

// 详情
async function handleDetails(node: Recordable<any>) {
  try {
    if (selectedNode.value.id === node.id) {
      return;
    }
    selectedNode.value = node;
    previewLoading.value = true;

    if (node.extra.type === '3') {
      showXml.value = true;
      const res = await getBusinessFlowById({id: node.id});
      selectedNodeInfo.value = res || {};
      await nextTick();
      if (!res?.diagramsInfoXml) {
        viewerRef.value?.getModeler().clear();
      } else {
        viewerRef.value?.createNewProcess(res?.diagramsInfoXml);
      }
      return;
    }
    if (node.extra.type === '4') {
      showXml.value = true;
      const res = await getBpmnFlowById(node.id);
      selectedNodeInfo.value = res || {};
      await nextTick();
      if (!res?.modelEditorXml) {
        viewerRef.value?.getModeler().clear();
      } else {
        viewerRef.value?.createNewProcess(res?.modelEditorXml);
      }
      return;
    }
    showXml.value = false;
    const res = await getById({id: node.id});
    selectedNodeInfo.value = res || {};
    await nextTick();
    const graphData = JSON.parse(res.diagramsInfoXml || '{}');
    setTimeout(() => {
      try {
        framePageRef.value?.importNewData(graphData);
      } catch (e) {
        console.error(e);
      }
    }, 20);
  } finally {
    previewLoading.value = false;
  }
}
</script>

<style lang="scss">
@import '#/assets/logicflow/style.css';
@import '#/assets/hilight-js/index.css';
@import '#/assets/bpmn/viewer/lib/style.css';
</style>
<style lang="scss" scoped>
.content-container {
  height: 100%;
  width: 100%;
  min-width: 70%;
  position: relative;
  overflow: hidden;
  padding: 10px;
}

.base-info-box-collapse {
  width: 40px;
  text-align: center;
}
</style>
