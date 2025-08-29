<template>
  <ColPage
      :left-max-width="50"
      :left-min-width="10"
      :left-width="15"
      :split-handle="false"
      :split-line="false"
      :resizable="true"
      :left-collapsible="false"
      :auto-content-height="true"
      content-class="h-full">
    <template #left >
      <BpmFrameWorkTree
          ref="basicTreeRef"
          draggable
          :max-level="2"
          @select="handleSelect"
          @dragstart="validateDrag"
          @drop="handleDrop"
      >
        <template #header>
<!--          <Authority :value="'ProcessFramework:' + PerEnum.ADD">-->
            <Tooltip title="新增公司架构">
              <Button type="primary" size="small" @click="handleCreateSystem">
                <PlusOutlined />
              </Button>
            </Tooltip>
<!--          </Authority>-->
<!--          <Authority :value="'ProcessFramework:' + PerEnum.ADD">-->
            <Tooltip title="下载架构导入模板">
              <Button class="ml-2" type="primary" size="small" @click="handleDownloadTemplate">
                <DownloadOutlined />
              </Button>
            </Tooltip>
<!--          </Authority>-->
        </template>

        <template #actions="{ node }">
          <Authority :value="'ProcessFramework:' + PerEnum.ADD">
            <Tooltip :title="node.extra.type === '1' ? '新增架构' : '新增子架构'">
              <PlusOutlined
                  class="mr-2"
                  style="color: #536dfe; cursor: pointer"
                  @click.stop="handleCreateChild(node)"
              />
            </Tooltip>
          </Authority>
          <Dropdown trigger="hover" v-if="validatePermission(node)">
            <Button type="link" size="small">
              <MoreOutlined class="icon-more" />
            </Button>
            <template #overlay>
              <Menu>
                <Authority v-if="node.extra.type === '1'" :value="'ProcessFramework:' + PerEnum.ADD">
                  <MenuItem>
                    <span @click.stop="handleUploadFramework(node)">
                      <PlusOutlined class="mr-2" style="color: #536dfe; cursor: pointer" />
                      <span>批量导入</span>
                    </span>
                  </MenuItem>
                </Authority>
                <Authority :value="'ProcessFramework:' + PerEnum.UPDATE">
                  <MenuItem>
                    <span @click.stop="handleEditFramework(node)">
                      <FormOutlined class="mr-2" style="color: #536dfe; cursor: pointer" />
                      <span>编辑</span>
                    </span>
                  </MenuItem>
                </Authority>
                <Authority :value="'ProcessFramework:' + PerEnum.DELETE">
                  <MenuItem>
                    <span @click="handleDeleteFramework(node)">
                      <DeleteOutlined class="mr-2" style="color: #ed6f6f; cursor: pointer" />
                      <span>删除</span>
                    </span>
                  </MenuItem>
                </Authority>
              </Menu>
            </template>
          </Dropdown>
        </template>
      </BpmFrameWorkTree>
    </template>
    <div class="ml-2 h-full">
      <div class="shrink-0 h-full" v-loading="previewLoading">
        <div v-if="!frameworkInfo.id" class="p-4 h-full bg-card">
          <Empty description="请选择左侧体系/架构进行预览！" />
        </div>
        <div v-if="frameworkInfo.id" class="flex h-full">
          <div class="content-container w-full bg-card">
            <IntegralDesigner
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
              class="bg-card ml-2 p-2 base-info-box overflow-y-auto"
              :class="{ 'base-info-box-collapse': collapseBaseInfo }"
              style="padding-top: 10px; overflow-y: scroll"
          >
            <Tooltip :title="collapseBaseInfo ? '展开' : '收起'" @click="handleCollapseBaseInfo">
            <span style="cursor: pointer" class="font-bold text-md">
              <MenuFoldOutlined v-show="collapseBaseInfo" /><!-- 左箭头 -->
              <MenuUnfoldOutlined v-show="!collapseBaseInfo" /><!-- 右箭头 -->
              基本信息
            </span>
            </Tooltip>

            <Descriptions
                class="mt-2 p-4"
                v-if="!collapseBaseInfo"
                size="middle"
                :bordered="false"
                :column="1"
                :data="frameworkInfo"
                :schema="frameworkInfo.type === '1' ? detailSystemViewSchema : detailViewSchema"
            >
              <DescriptionsItem
                  v-if="frameworkInfo.type === '1'"
                  v-for="item in detailSystemViewSchema"
                  :label="item.label">{{ frameworkInfo[item.fieldName] }}</DescriptionsItem>
              <DescriptionsItem
                  v-else
                  v-for="item in detailViewSchema"
                  :label="item.label">{{ frameworkInfo[item.fieldName] }}</DescriptionsItem>
            </Descriptions>
          </div>
        </div>
      </div>
    </div>

    <FrameworkDesignerModal
        ref="frameworkDesignerModalRef"
        @success="handleFrameworkDesignerModalSuccess"
    />

    <FrameworkUploadModal
        ref="frameworkUploadModalRef"
        @success="reloadFrameworkTree"
    />
  </ColPage>
</template>

<script lang="ts" setup>
  // import { Authority } from '@/components/Authority';
  import { createVNode, nextTick, ref, shallowRef, unref } from 'vue';
  import { Button, Descriptions, Dropdown, Empty, Menu, message, MenuItem, Modal, Spin, Tooltip } from 'ant-design-vue';
  import type { Recordable } from '@vben/types';

  import {
    DeleteOutlined,
    DownloadOutlined,
    ExclamationCircleOutlined,
    FormOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MoreOutlined,
    PlusOutlined,
  } from '@ant-design/icons-vue';
  import {
    deleteByIds,
    downloadFrameWorkTemplate,
    getById,
    moveFramework,
  } from '#/api/bpm/framework';
  import {ColPage} from '@vben/common-ui';

  // import { Description } from '@/components/Description';
  import { detailSystemViewSchema, detailViewSchema } from './framework.data';
  import { PerEnum } from '#/enums/perEnum';
  import { downloadByUrl } from '#/utils/file/download';
  import FrameworkDesignerModal from '#/views/bpm/framework/FrameworkDesignerModal.vue';
  import { IntegralDesigner } from '#/assets/logicflow/lf-designer';
  import BpmFrameWorkTree from '#/views/bpm/components/BpmFrameWorkTree.vue';
  import FrameworkUploadModal from '#/views/bpm/framework/FrameworkUploadModal.vue';
  import { usePreferences } from '@vben/preferences';
  import {useAccess} from "@vben/access";

  const { isDark } = usePreferences();

  const DescriptionsItem = Descriptions.Item;
  const PerPrefix = 'ProcessFramework:';

  const frameworkDesignerModalRef = ref(),
  frameworkUploadModalRef = ref();

  const {hasAccessByCodes}  = useAccess();
  const frameworkInfo = ref<Record<string, any>>({});
  const treeLoading = ref<boolean>(false);
  const collapseBaseInfo = ref(false);
  const previewLoading = ref(false);

  const selectedNode = ref<Recordable<any>>({});
  const currentNode = shallowRef<Recordable<any>>();
  const basicTreeRef = shallowRef<any>();
  const framePageRef = shallowRef<any>();

  // const [
  //   registerFrameworkDesignerModal,
  //   { openModal: openFrameworkDesignerModal, setModalProps: setFrameworkDesignerModalProps },
  // ] = useModal();
  // const [registerFrameworkUploadModal, { openModal: openFrameworkUploadModal }] = useModal();

  async function handleFrameworkDesignerModalSuccess(data) {
    if (data.id) {
      await basicTreeRef.value?.fetch();
      currentNode.value = basicTreeRef.value?.findTreeNode((item) => item.id === data.id);
      basicTreeRef.value?.handleSelect(data);
      doPreview();
    }
  }
  // 创建体系
  function handleCreateSystem() {
    // openFrameworkDesignerModal(true, { type: 'system' });

    frameworkDesignerModalRef.value.setData({ type: 'system' }).open();
    setModalBaseProps();
  }
  // 模板下载
  function handleDownloadTemplate() {
    downloadFrameWorkTemplate().then((res) => {
      downloadByUrl({
        url: URL.createObjectURL(res.data),
        fileName: '架构导入模板.xlsx',
      });
    });
  }

  function setModalBaseProps() {
    // setFrameworkDesignerModalProps({
    //   title: `创建体系`,
    //   bodyStyle: { padding: '0px', margin: '0px' },
    //   defaultFullscreen: true,
    //   maskClosable: false,
    //   centered: true,
    //   showOkBtn: false,
    //   showCancelBtn: false,
    //   draggable: false,
    //   canFullscreen: false,
    //   closable: false,
    //   destroyOnClose: true,
    // });
  }

  function validatePermission(node) {
    return (
      (hasAccessByCodes([PerPrefix + PerEnum.ADD]) && node.extra?.type === '1') ||
      hasAccessByCodes([PerPrefix + PerEnum.UPDATE]) ||
      hasAccessByCodes([PerPrefix + PerEnum.DELETE])
    );
  }

  function handleEditFramework(record: Recordable) {
    if (!hasAccessByCodes(PerPrefix + PerEnum.UPDATE)) {
      message.warn('无操作权限，请联系管理员！');
      return;
    }
    const type = record.type === '1' ? 'system' : 'framework';
    // openFrameworkDesignerModal(true, { type, id: record.id });
    frameworkDesignerModalRef.value.setData({ type, id: record.id }).open();
    setModalBaseProps();
  }

  function handleUploadFramework(node) {
    // openFrameworkUploadModal(true, node);
    frameworkUploadModalRef.value.setData(node).open();
  }

  function handleCreateChild(record: Recordable) {
    if (!hasAccessByCodes(PerPrefix + PerEnum.ADD, false)) {
      message.warn('无操作权限，请联系管理员！');
      return;
    }
    // openFrameworkDesignerModal(true, { type: 'framework', pid: record.id });
    frameworkDesignerModalRef.value.setData({ type: 'framework', pid: record.id }).open();

    setModalBaseProps();
  }

  function handleDeleteFramework(record: Recordable) {
    if (!hasAccessByCodes(PerPrefix + PerEnum.DELETE, false)) {
      message.warn('无操作权限，请联系管理员！');
      return;
    }
    Modal.confirm({
      icon: createVNode(ExclamationCircleOutlined),
      okText: '确定',
      cancelText: '取消',
      okButtonProps: { danger: true },
      content: `确定要删除【${record.name}】流程吗？`,
      onOk: async () => {
        try {
          const { success, msg, data } = await deleteByIds([record.id]);
          if (success) {
            message.success(msg);
            // await basicTreeRef.value.fetch();
            await basicTreeRef.value?.handleDelete(record);
          } else {
            message.error(msg);
          }
        } catch (e) {
          console.error(e);
        }
      },
    });
  }

  function handleSelect(node) {
    debugger;
    if (selectedNode.value.id === node.id) {
      return;
    }
    currentNode.value = node;
    doPreview();
  }

  function validateDrag({ node, event }) {
    if (node.extra.type !== '2') {
      event.preventDefault?.();
    }
  }
  async function handleDrop({ node, dragNode, dropPosition }) {
    treeLoading.value = true;
    try {
      // 设置相关请求参数
      const id: string = dragNode.id;
      let pid: string;
      // s1: 拖到根节点，不管层级一律作为子级
      if (node.extra.type === '1') {
        pid = node.id;
      } else {
        // s2: 非根节点子级，直接设置当前节点 id
        if (dropPosition === 'inside') {
          pid = node.id;
        }
        // s3: 非根节点平级，共享父级节点
        else {
          pid = node.parentId;
        }
      }

      if (dragNode.parentId === pid) {
        return;
      }

      await moveFramework({ id, pid });
      await basicTreeRef.value.fetch();

      treeLoading.value = false;
    } catch (e) {
      treeLoading.value = false;
    }
  }

  function doPreview() {
    previewLoading.value = true;
    debugger;
    getById({ id: currentNode.value?.id })
      .then((res) => {
        frameworkInfo.value = res;
        // loadShowHeader(res.frameworkId);
        nextTick(() => {
          loadSvgXml(res.diagramsInfoXml);
        });
        collapseBaseInfo.value = true;
      })
      .finally(() => {
        previewLoading.value = false;
      });
  }

  function loadSvgXml(xml: string) {
    let graphData = {};
    try {
      graphData = JSON.parse(xml || '{}');
    } catch (e) {
      console.error(e);
    }
    setTimeout(() => {
      try {
        // framePageRef.value?.provideInstance?.resetZoom();
        framePageRef.value?.importNewData(graphData);
        // framePageRef.value?.provideInstance?.translateCenter();
      } catch (e) {
        console.error(e);
      }
    }, 20);
  }

  async function reloadFrameworkTree() {
    // 可能存在重复导入，导致覆盖其他体系下架构问题，所以需要刷新整棵树
    // await basicTreeRef.value?.handleReload(node);
    // await basicTreeRef.value?.handleOpen(node);
    await basicTreeRef.value?.fetch();
  }

  function handleCollapseBaseInfo() {
    collapseBaseInfo.value = !unref(collapseBaseInfo);
  }
</script>

<style lang="less">
  .role-companies {
    .company-item {
      margin-bottom: 5px;
    }
  }
  .custom-wrapper-content {
    .ant-page-header-content {
      padding-top: 0;
    }
  }
</style>
<style lang="less" scoped>
  .base-info-box {
    width: 600px;
    transition: width 0.25s;
  }

  .base-info-box-collapse {
    width: 50px;
    text-align: center;
  }

  .custom-wrapper-content:hover .base-info-ctrl-box {
    opacity: 1;
  }

  .base-info-ctrl-box {
    transition: opacity 0.5s;
    opacity: 0.5;
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: -23px;
    height: 30px;
  }

  .base-info-ctrl {
    width: 80px;
    margin: auto;
    border-radius: 25px;
    cursor: pointer;
    background: #536dfe;
    color: white;
    line-height: 16px;
    height: 30px;
  }

  .base-info.show {
  }

  .base-info.hide {
    height: 0;
    margin-top: 0;
  }

  .base-info {
    max-height: 175px;
    height: 175px;
    margin-top: 10px;
    transition: height 0.2s ease;
    position: relative;
  }

  .content-container {
    height: 100%;
    position: relative;
    overflow: hidden;
    padding: 10px;
    .svg-controller {
      text-align: center;
      position: absolute;
      top: -60px;
      opacity: 0;
      transition: 0.8s;
      margin: auto;
      width: 100%;
    }
    &:hover {
      .svg-controller {
        top: 8px;
        opacity: 1;
      }
    }
    .svg-container {
      height: 100%;
      cursor: move;
    }
  }

  .step-form-content {
    padding: 24px;
    //background-color: @component-background;
  }

  .step-form-form {
    width: 750px;
    margin: 0 auto;
  }
</style>
