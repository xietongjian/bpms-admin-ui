<template>
  <Page auto-content-height
    v-loading="loadingRef"
    dense
    fixed-height
    contentFullHeight
    contentClass="flex"
    class="custom-wrapper-content"
  >
    <BpmFrameWorkTree
      ref="frameWorkTree"
      class="w-3/10 xl:3/10"
      type="3"
      draggable
      :max-level="3"
      :allow-drop="allowDrop"
      @dragstart="validateDrag"
      @drop="handleDrop"
      @select="handleDetail"
    >
      <template #actions="{ node }">
        <Tooltip
          v-if="node.extra?.type === '2' && hasAccessByCodes([PerPrefix + PerEnum.ADD])"
          title="流程建模"
          placement="bottom"
        >
          <PlusOutlined
            class="m-2"
            style="color: #536dfe; cursor: pointer"
            @click="handleCreate(node)"
          />
        </Tooltip>
        <Tooltip
          v-if="node.extra?.type === '3' && hasAccessByCodes([PerPrefix + PerEnum.UPDATE])"
          title="修改"
          placement="bottom"
        >
          <Icon
            icon="ant-design:form-outlined"
            class="m-2"
            style="color: #536dfe; cursor: pointer"
            @click="handleEditFlow(node)"
          />
        </Tooltip>
        <Dropdown trigger="hover" v-if="getDropdownMenu(node).length">
          <Button type="link" size="small">
            <MoreOutlined class="icon-more" />
          </Button>
          <template #overlay>
            <Menu>
              <MenuItem v-for="i in getDropdownMenu(node)" :key="i.ev">
                <span @click="i.clickFunc">
                  <Icon :icon="i.icon" :color="i.color" class="mr-2" style="{ cursor: pointer }" />
                  <span>{{ i.label }}</span>
                </span>
              </MenuItem>
            </Menu>
          </template>
        </Dropdown>
      </template>
    </BpmFrameWorkTree>

    <div class="w-7/10 xl:w-7/10 m-4 ml-2 shrink-0" v-loading="previewLoading">
      <div v-if="selectedNode?.id" class="flex h-full">
        <div class="content-container w-full bg-white">
          <BpmnViewer
            v-if="showXml"
            ref="viewerRef"
            show-download
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
            <Spin tip="加载中..." />
          </div>
        </div>
        <div
          class="bg-white ml-2 p-2 base-info-box overflow-y-auto"
          :class="{ 'base-info-box-collapse': infoCollapsed }"
          style="padding-top: 10px; overflow-y: scroll"
        >
          <Tooltip :title="infoCollapsed ? '展开' : '收起'" @click="infoCollapsed = !infoCollapsed">
            <span style="cursor: pointer" class="font-bold text-md">
              <MenuFoldOutlined v-show="infoCollapsed" />
              <MenuUnfoldOutlined v-show="!infoCollapsed" />
              基本信息
            </span>
          </Tooltip>

          <Description
            class="mt-2 p-4"
            v-if="!infoCollapsed && selectedNode.extra.type !== '3'"
            size="middle"
            :bordered="false"
            :column="1"
            :data="frameworkInfo"
            :schema="frameworkInfo.type === '1' ? detailSystemViewSchema : detailViewSchema"
          />
          <Description
            class="mt-2 p-4"
            v-if="!infoCollapsed && selectedNode.extra.type === '3'"
            size="middle"
            :bordered="false"
            :column="1"
            :data="businessInfo"
            :schema="detailSchema"
          />
        </div>
      </div>

      <div v-else class="p-4 h-full bg-white">
        <Empty description="请选择左侧体系/架构进行预览！" />
      </div>
    </div>

    <!--  权限设置  -->
    <AuthSettingModal
        ref="authSettingModalRef"
        @success="handleRequestSuccess" />
    <!--  编辑与新建  -->
    <BusinessFlowApplyFormModal
        ref="businessFlowApplyFormModalRef"
        @success="handleRequestSuccess" />
  </Page>
</template>

<script lang="ts" setup>
  import { createVNode, nextTick, ref, shallowRef } from 'vue';
  import type { ComponentInstance } from 'vue';
  import BusinessFlowApplyFormModal from './BusinessFlowApplyFormModal.vue';
  import AuthSettingModal from './AuthSettingModal.vue';
  import { deleteBusinessFlowById, moveBusinessFlowToFrame } from '#/api/bpm/businessflow';
  import { getBusinessFlowById, publishProcess } from '#/api/bpm/businessFlowApply';
  import {Page} from '@vben/common-ui';
  import { BpmnViewer } from '#/assets/bpmn/viewer/lib/bpmn-viewer';
  import { IntegralDesigner } from '#/assets/logicflow/lf-designer';
  import { getById } from '#/api/bpm/framework';
  import { Button, Dropdown, Descriptions, Empty, Menu, MenuItem, Modal, Spin, Tooltip, message } from 'ant-design-vue';
  import { detailSystemViewSchema, detailViewSchema } from '#/views/bpm/framework/framework.data';
  import {useRouter} from 'vue-router';

  // import { Description } from '@/components/Description';
  import {
    ExclamationCircleOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MoreOutlined,
    PlusOutlined,
  } from '@ant-design/icons-vue';
  import { detailSchema } from '#/views/bpm/businessFlow/businessFlowApply.data';
  import BpmFrameWorkTree from '#/views/bpm/components/BpmFrameWorkTree.vue';
  // import Icon from '@/components/Icon/Icon.vue';
  import { usePreferences } from '@vben/preferences';
  import {useAccess} from "@vben/access";
  import type {Recordable} from '@vben/types';
  import {PerEnum} from "#/enums/perEnum";

  const PerPrefix = "BusinessFlow:";

  const { isDark } = usePreferences();
  // const go = useGo();
  const {hasAccessByCodes}  = useAccess();
  const router = useRouter();

  const frameWorkTree = shallowRef<ComponentInstance<typeof BpmFrameWorkTree>>();
  const framePageRef = shallowRef<ComponentInstance<typeof IntegralDesigner>>();
  const viewerRef = shallowRef<ComponentInstance<typeof BpmnViewer>>();

  const selectedNode = ref<Recordable<any>>({});
  const currentCategory = ref<Recordable<any>>({});
  const infoCollapsed = ref(true);
  const frameworkInfo = ref<Record<string, any>>({});
  const businessInfo = ref<Record<string, any>>({});
  const loadingRef = ref(false);
  const showXml = ref(false);
  const previewLoading = ref(false);

  const authSettingModalRef = ref(),
      businessFlowApplyFormModalRef = ref();

/*  const [
    registerAuthSettingModal,
    { openModal: openAuthSettingModal, setModalProps: setAuthSettingModalProps },
  ] = useModal();

  const [
    registerBusinessFlowApplyFormModal,
    {
      openModal: openBusinessFlowApplyFormModal,
      setModalProps: setBusinessFlowApplyFormModalProps,
    },
  ] = useModal();*/

  function getDropdownMenu(node) {
    if (node.extra?.type !== '3') {
      return [];
    }
    const menus: any[] = [];
    if (hasAccessByCodes([PerPrefix + PerEnum.AUTH])) {
      menus.push({
        icon: 'ant-design:setting-outlined',
        color: '#536dfe',
        clickFunc: () => handleAuthSetting(node),
        label: '授权',
      });
    }
    if (hasAccessByCodes([PerPrefix + PerEnum.PUBLISH]) && node.extra?.status !== 1) {
      menus.push({
        icon: 'ant-design:file-done-outlined',
        color: '#d4b106',
        clickFunc: () => handlePublish(node),
        label: '发布',
      });
    }
    if (hasAccessByCodes([PerPrefix + PerEnum.DELETE])) {
      menus.push({
        icon: 'ant-design:file-done-outlined',
        color: '#ED6F6F',
        clickFunc: () => handleDeleteFlow(node),
        label: '删除',
      });
    }
    return menus;
  }

  function handleCreate(node) {
    currentCategory.value = node;
    businessFlowApplyFormModalRef.value.setData({
      frameworkId: node.id
    });
    businessFlowApplyFormModalRef.value.setState({});
    businessFlowApplyFormModalRef.value.open();
    // openBusinessFlowApplyFormModal(true, { frameworkId: node.id });
    // setModalBaseProps();
  }

  function setModalBaseProps() {
    /*setBusinessFlowApplyFormModalProps({
      title: `创建`,
      bodyStyle: { padding: '0px', margin: '0px' },
      defaultFullscreen: true,
      maskClosable: false,
      centered: true,
      showOkBtn: false,
      showCancelBtn: false,
      draggable: false,
      canFullscreen: false,
      closable: false,
      destroyOnClose: true,
    });*/
  }

  function handleAuthSetting(record: Recordable<any>) {
    businessFlowApplyFormModalRef.value.setData(record);
    businessFlowApplyFormModalRef.value.setState({
      title: '设置【' + record.name + '】的查阅权限',
    });
    businessFlowApplyFormModalRef.value.open();

    // openAuthSettingModal(true, {
    //   record: record,
    // });
    // setAuthSettingModalProps({
    //   title: '设置【' + record.name + '】的查阅权限',
    //   width: 800,
    // });
  }

  // 拖拽验证
  function validateDrag({ node, event }) {
    if (node.extra.type !== '3') {
      event.preventDefault?.();
      return;
    }
  }
  // 拖拽放置验证
  function allowDrop({ dropPosition, node }) {
    if (dropPosition === 'inside') {
      return node?.extra?.type === '2';
    }
    const parentNode = frameWorkTree.value?.findTreeNode((n) => n.id === node.parentId);
    return parentNode && parentNode.extra?.type === '2';
  }

  async function handleDrop({ node, dragNode, dropPosition }) {
    // 设置相关请求参数
    const id: string = dragNode.id;
    let pid: string;
    // s1: 非根节点子级，直接设置当前节点 id
    if (dropPosition === 'inside') {
      pid = node.id;
    }
    // s2: 非根节点平级，共享父级节点
    else {
      pid = node.parentId;
    }

    if (!pid) {
      return;
    }

    await moveBusinessFlowToFrame(pid, id);
    await frameWorkTree.value.fetch();
  }

  // 详情
  async function handleDetail(node: Recordable<any>) {
    try {
      if (selectedNode.value.id === node.id) {
        return;
      }
      selectedNode.value = node;
      previewLoading.value = true;
      if (node.extra.type === '3') {
        showXml.value = true;
        const res = await getBusinessFlowById({ id: node.id });
        businessInfo.value = res || {};
        await nextTick();
        viewerRef.value?.getModeler().clear();
        if (res?.diagramsInfoXml) {
          viewerRef.value?.createNewProcess(res?.diagramsInfoXml);
        }
        return;
      }
      showXml.value = false;
      const res = await getById({ id: node.id });
      frameworkInfo.value = res || {};
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
  const commonModalProps = {
    // title: '警告！',
    icon: createVNode(ExclamationCircleOutlined),
    okText: '确定',
    cancelText: '取消',
    okButtonProps: { danger: true },
  };
  // 发布
  function handlePublish(node) {
    Modal.confirm({
      ...commonModalProps,
      content: `确定要发布【${node.name}】流程吗？`,
      onOk: async () => {
        try {
          const { success, msg, data } = await publishProcess({ id: node.id });
          if (success) {
            message.success(msg);
            // handleRequestSuccess();
            await frameWorkTree.value?.handleUpdate(node, {
              extra: { ...node.extra, status: true },
            });
          } else {
            message.error(msg);
          }
        } catch (e) {
          console.error(e);
        }
      },
    });
  }
  // 编辑流程
  function handleEditFlow(record: Recordable<any>) {
    router.push({ name: 'BusinessFlowForm', query: { dataType: 'flow', id: record.id } });
  }
  // 删除流程
  function handleDeleteFlow(record: Recordable<any>) {
    Modal.confirm({
      ...commonModalProps,
      content: `确定要删除【${record.name}】流程吗？`,
      onOk: async () => {
        try {
          await deleteBusinessFlowById(record);
          // frameWorkTree.value?.fetch();
          await frameWorkTree.value?.handleDelete(record);
          selectedNode.value = {};
        } catch (e) {
          console.error(e);
        }
      },
    });
  }

  // 请求成功，刷新数据
  function handleRequestSuccess() {
    frameWorkTree.value?.fetch();
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
