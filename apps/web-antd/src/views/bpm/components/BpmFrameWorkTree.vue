<template>
  <div class="bg-card overflow-hidden" v-loading="treeLoading">
    <div class="h-full n-naive-framework-tree">
      <div title="流程体系/架构" toolbar :search="false" :expandAll="expandAll">
        <slot name="header"></slot>
      </div>
      <div
          wrapperClassName="h-[calc(100%-56px)] overflow-y-auto"
          :spinning="treeLoading"
          tip="加载中..."
      >
        <Tree
            block-node
            :expandedKeys="expandedKeys"
            :selectedKeys="selectedKeys"
            :treeData="treeData"
            @select="handleClick"
            :on-load="asyncLoadData"
            :draggable="draggable"
            :node-props="nodeProps"
            :render-prefix="renderIcon"
            :render-suffix="renderActions"
            :allow-drop="allowDrop"
            block-line
            key-field="id"
            label-field="name"
            @dragstart="$emit('dragstart', $event)"
            @drop="$emit('drop', $event)"
        >
<!--          <template #empty>
            <Empty :image="Empty.PRESENTED_IMAGE_SIMPLE" class="!mt-4"/>
          </template>-->
        </Tree>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, defineEmits, onMounted, ref, h} from 'vue';
import type {PropType} from 'vue';
import {Empty, Spin, Tree} from 'ant-design-vue';
// import { createTheme, NConfigProvider, NTree, treeDark } from 'naive-ui';
// import TreeHeader from '@/components/Tree/src/components/TreeHeader.vue';
import {findNode, getAllParentKeys} from '#/utils/helper/treeHelper';
import {
  getChildrenBpmnFlow,
  getChildrenTreeNodes,
  getOneTwoLeftTreeNodes,
} from '#/api/bpm/businessflow';
import {ApartmentOutlined, NodeExpandOutlined, RetweetOutlined} from '@ant-design/icons-vue';
import {isArray} from '#/utils/is';
import {usePreferences} from '@vben/preferences';

defineOptions({name: 'BpmFrameWorkTree'});

const {isDark} = usePreferences();

const prop = defineProps({
  draggable: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  maxLevel: {
    type: Number as PropType<number>,
    default: 2,
  },
  type: {
    type: String as PropType<string>,
    default: '2',
  },
  allowDrop: {
    type: Function as PropType<Function>,
    default: undefined,
  },
});
const emit = defineEmits(['select', 'contextmenu', 'bind', 'unbind', 'dragstart', 'drop']);
const slot = defineSlots<{
  actions(props: { node: any }): any;
}>();

const treeTheme = computed(() => {
  // return isDark.value ? createTheme([treeDark]) : undefined;
  return undefined;
});

const treeData = ref<any[]>([]);
const treeLoading = ref<boolean>(false);
const expandedKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>([]);

function expandAll(expandAll: boolean) {
  expandedKeys.value = expandAll ? getAllParentKeys(treeData.value) : ([] as string[]);
}

// 节点事件配置
let lastClickTimer: any = null;
const clearClickTimer = () => {
  clearTimeout(lastClickTimer);
  lastClickTimer = null;
};

function handleClick(selectedKeys, e) {
  // selectedKeys, e:{selected: bool, selectedNodes, node, event}
  clearClickTimer();
  lastClickTimer = setTimeout(() => {
    clearClickTimer();
    emit('select', e.node);
  }, 200);
}

const nodeProps = ({option}) => {
  return {
    onClick() {
      clearClickTimer();
      lastClickTimer = setTimeout(() => {
        clearClickTimer();
        emit('select', option);
      }, 200);
    },
    onDblclick() {
      if (lastClickTimer) {
        clearClickTimer();
      }
      emit('dblclick', option);
      emit('select', option);
      // 1. 如果是子节点，则不处理
      if (option.isLeaf) {
        return;
      }
      // 2. children 不是 array 且不为叶子节点的时候，加载子节点数据并展开
      if (!option.isLeaf && !isArray(option.children)) {
        asyncLoadData(option).then(() => expandedKeys.value.push(option.id));
        return;
      }
      // 未展开时直接展开
      const idx = expandedKeys.value.indexOf(option.id);
      if (idx === -1) {
        expandedKeys.value.push(option.id);
      } else {
        expandedKeys.value.splice(idx, 1);
      }
    },
    onContextmenu() {
      emit('contextmenu', option);
    },
  };
};

// 渲染节点前置图标
function renderIcon({option}) {
  const type = option.extra.type;
  if (type === '1') {
    return h(ApartmentOutlined, {style: {color: '#d4b106'}});
  }
  if (type === '2') {
    return h(ApartmentOutlined, {style: {color: '#1890ff'}});
  }
  if (type === '3') {
    return h(RetweetOutlined, {style: {color: option.extra.status ? '#1890ff' : '#d4b106'}});
  }
  if (type === '4') {
    return h(NodeExpandOutlined, {style: {color: '#1890ff'}});
  }
}

// 渲染操作按钮
function renderActions({option}) {
  return slot.actions({node: option});
}

// 初始数据加载
async function fetch() {
  try {
    treeLoading.value = true;
    const res = await getOneTwoLeftTreeNodes();
    treeData.value = res;
    expandedKeys.value = getAllParentKeys(res);
  } catch (e) {
    console.error(e);
  } finally {
    treeLoading.value = false;
  }
}

// 异步数据加载
function asyncLoadData(treeNode) {
  return new Promise((resolve) => {
    const id = treeNode.id;
    const type = treeNode.extra.type * 1;
    // 1. 查询流程建模的绑定流程
    if (type === 3 && prop.maxLevel > 3) {
      getChildrenBpmnFlow(id)
          .then((children) => {
            if (children?.length) {
              children.forEach((i) => (i.isLeaf = true));
              treeNode.isLeaf = false;
              treeNode.children = children;
            } else {
              treeNode.children = [];
              treeNode.isLeaf = true;
            }
            resolve();
          })
          .catch(() => resolve());
      return;
    }
    // 2. 查询下级子节点及业务流程
    if (type < 3) {
      getChildrenTreeNodes(prop.type, id)
          .then((res = []) => {
            const children = res.filter((i) => {
              const level = i.extra.type * 1;
              if (i.extra.isLeaf === 'true') {
                i.isLeaf = true;
                return level <= prop.maxLevel;
              }
              if (prop.maxLevel === 3) {
                i.isLeaf = level === 3;
                return level <= prop.maxLevel;
              }
              i.isLeaf = level === 4;
              return level <= prop.maxLevel;
            });
            if (children.length) {
              // children.forEach((i) => (i.isLeaf = i.extra.isLeaf === 'true'));
              treeNode.isLeaf = false;
              treeNode.children = children;
            } else {
              treeNode.children = [];
              treeNode.isLeaf = true;
            }
            resolve();
          })
          .catch(() => resolve());
      return;
    }
    // 3. 其他情况下，默认是子节点
    treeNode.children = [];
    treeNode.isLeaf = true;
    resolve();
  });
}

// 查找指定节点对象
function findTreeNode(finder) {
  return findNode(treeData.value, finder);
}

// 更新指定节点子数据
async function handleReload(node) {
  const id = node.id;
  const type = node.extra.type * 1;
  // 大于指定level直接退出
  if (type > prop.maxLevel) return;
  try {
    if (type === 3) {
      const children = await getChildrenBpmnFlow(id);
      if (children?.length) {
        children.forEach((i) => (i.isLeaf = true));
        node.children = children;
      }
      const target = findTreeNode((n) => n.id === node.id);
      target.children = children;
      target.isLeaf = !children?.length;
      return;
    }
    if (type < 3) {
      const res = await getChildrenTreeNodes(prop.type, id);
      const children = res.filter((i) => {
        const level = i.extra.type * 1;
        if (i.extra.isLeaf === 'true') {
          i.isLeaf = true;
          return level <= prop.maxLevel;
        }
        if (prop.maxLevel === 3) {
          i.isLeaf = level === 3;
          return level <= prop.maxLevel;
        }
        i.isLeaf = level === 4;
        return level <= prop.maxLevel;
      });
      const target = findNode(treeData.value, (n) => n.id === node.id);
      target.children = children;
      target.isLeaf = !children?.length;
    }
  } catch (e) {
    console.error(e);
  }
}

// 更新指定数据
function handleUpdate(node, data = {}) {
  for (const dataKey in data) {
    node[dataKey] = data[dataKey];
  }
}

// 删除指定数据
function handleDelete(node) {
  if (!node || !node.parentId) return;
  const parent = findNode(treeData.value, (n) => n.id === node.parentId);
  if (parent && parent.children) {
    parent.children = parent.children.filter((n) => n.id !== node.id);
  }
  if (!parent.children.length) {
    parent.isLeaf = true;
  }
}

function handleOpen(node) {
  if (node.isLeaf || (Array.isArray(node.chidren) && node.children.length === 0)) {
    return;
  }
  if (!node.children) {
    return handleReload(node);
  }
  const idx = expandedKeys.value.findIndex((id) => id === node.id);
  if (idx === -1) {
    expandedKeys.value.push(node.id);
  }
}

function handleSelect(node, toggle = false) {
  if (toggle) {
    selectedKeys.value = selectedKeys.value.includes(node.id) ? [] : [node.id];
    return;
  }
  selectedKeys.value = [node.id];
}

onMounted(() => fetch());

defineExpose({
  fetch,
  findTreeNode,
  handleSelect,
  handleReload,
  handleOpen,
  handleUpdate,
  handleDelete,
});
</script>
