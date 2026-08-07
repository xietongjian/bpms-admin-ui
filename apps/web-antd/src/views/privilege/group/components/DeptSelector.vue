<template>
  <div class="dept-selector">
    <div class="mb-2">
      <a-input-search
        v-model:value="keyword"
        placeholder="请输入名称/编码"
        enter-button="搜索"
        style="width: 320px"
        allow-clear
        @clear="handleSearch"
        @search="handleSearch"
      />
    </div>
    <Table
      size="small"
      bordered
      :key="tableKey"
      :data-source="deptList"
      :columns="departmentSelectorColumns as any"
      :default-expand-all-rows="expandAllFlag"
      :default-expanded-row-keys="expandedRowKeys"
      :expand-icon="customExpandIcon"
      row-key="id"
      :scroll="{ y: 420 }"
      :row-selection="rowSelection"
      :pagination="false"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'name'">
          <span :style="{ color: record.sourceType == 1 ? '#531dab' : '#333' }">{{ text }}</span>
        </template>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, h, nextTick } from 'vue';
import { Table } from 'ant-design-vue';
import { departmentSelectorColumns } from './setDataAcl.data';
import { getOrgTree } from '#/api/privilege/dataAcl';
import { PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons-vue';

let sourceTreeData: any[] = [];

const props = defineProps({
  selectedKeys: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(['change']);
const deptList = ref<any>([]);
const keyword = ref('');
const tableKey = ref(0);
const selectedRowKeys = ref<string[]>([]);
const expandedRowKeys = ref<string[]>([]);
const expandAllFlag = ref(false);
const selectData = ref<any[]>([]);
const rowSelection: any = {
  selectedRowKeys,
  checkStrictly: true,
  onChange: selectChange,
};

watch(
  () => props.selectedKeys,
  (val) => {
    selectedRowKeys.value = val as string[];
  },
  { immediate: true },
);

onMounted(() => {
  getOrgTree().then((res: any) => {
    deptList.value = res;
    sourceTreeData = JSON.parse(JSON.stringify(res));
    nextTick(() => {
      expandedRowKeys.value = (res || []).map((item: any) => item.id);
      tableKey.value += 1;
    });
  });
});

function selectChange(_selectedRowKeys: any, selectedRows: any) {
  selectedRowKeys.value = _selectedRowKeys;
  if (selectedRows) {
    selectData.value = selectedRows;
  }
  emit('change', _selectedRowKeys, selectedRows);
}

function customExpandIcon(props: any) {
  const { record, expanded, onExpand } = props;
  if (record.children && record.children.length === 0) {
    return null;
  }
  const type = expanded ? MinusSquareOutlined : PlusSquareOutlined;
  return h(
    'span',
    { onClick: (e: any) => onExpand(record, e), style: { cursor: 'pointer', marginRight: '5px' } },
    h(type),
  );
}

function handleSearch() {
  const __sourceTreeData = JSON.parse(JSON.stringify(sourceTreeData));
  deptList.value = filterTreeDataFunctional(__sourceTreeData, keyword.value);
  tableKey.value += 1;
}

function filterTreeDataFunctional(treeData: any[], keyword: string) {
  if (!keyword || keyword.trim() === '') {
    expandAllFlag.value = false;
    return treeData;
  }
  const searchTerm = keyword.toLowerCase();
  const filterNodes = (nodes: any[]): any[] => {
    return nodes
      .map((node) => ({ ...node }))
      .filter((node) => {
        if (node.children && node.children.length > 0) {
          node.children = filterNodes(node.children);
        }
        const nameMatch = node.name && node.name.toLowerCase().includes(searchTerm);
        const hasMatchingChildren = node.children && node.children.length > 0;
        return nameMatch || hasMatchingChildren;
      });
  };
  expandAllFlag.value = true;
  return filterNodes(treeData);
}
</script>

<style lang="scss" scoped>
.dept-selector {
  height: 460px;
}
</style>
