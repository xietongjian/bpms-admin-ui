<template>
  <div class="personal-selector">
    <div class="mb-2">
      <TreeSelect
        v-model:value="categoryCode"
        show-search
        style="width: 280px"
        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
        placeholder="请选择分类搜索"
        allow-clear
        :tree-default-expanded-keys="defaultExpandKeys"
        :tree-data="treeData"
        tree-node-filter-prop="name"
        @change="handleSearch"
      >
      </TreeSelect>
      <a-input-search
        v-model:value="keyword"
        placeholder="请输入关键字"
        enter-button="搜索"
        style="width: 320px; margin-left: 12px"
        allow-clear
        @clear="handleSearch"
        @search="handleSearch"
      />
    </div>
    <Table
      size="small"
      bordered
      :loading="loading"
      :data-source="dataReportList"
      :columns="dataReportSelectorColumns as any"
      row-key="id"
      :scroll="{ y: 360 }"
      :row-selection="rowSelection"
      :pagination="pagination"
      @change="handleChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'name'">
          {{ record.name }}
        </template>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, reactive } from 'vue';
import { Table, TreeSelect } from 'ant-design-vue';
import { dataReportSelectorColumns } from './setDataAcl.data';
import { getReportDesignerPagerModel } from '#/api/report/formReportDesigner';
import { getFlowCategories } from '#/api/base/category';

const props = defineProps({
  selectedKeys: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(['change']);
const loading = ref(false);
const keyword = ref('');
const categoryCode = ref();
const dataReportList = ref([]);
const treeData = ref<any>([]);
const defaultExpandKeys = ref<any[]>([]);
const selectedRowKeys = ref<string[]>([]);
const selectedRows = ref<any>([]);
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
  pageSizeOptions: ['20', '50', '100'],
});
const rowSelection: any = {
  selectedRowKeys,
  onChange: onSelectChange,
  onSelect: onSelect,
  onSelectAll: onSelectAll,
};

watch(
  () => props.selectedKeys,
  (val) => {
    selectedRowKeys.value = val as string[];
  },
  { immediate: true },
);

onMounted(() => {
  loadData();
  getCategoryTreeData();
});

function loadData() {
  loading.value = true;
  getReportDesignerPagerModel({
    status: 1,
    keyword: keyword.value,
    categoryCode: categoryCode.value,
    pageNum: pagination.current,
    pageSize: pagination.pageSize,
  })
    .then((res: any) => {
      dataReportList.value = res.rows;
      pagination.total = res.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

async function getCategoryTreeData() {
  const res = await getFlowCategories();
  defaultExpandKeys.value = [];
  treeData.value = res;
}

function onSelectChange(_selectedRowKeys: any, _selectRows: any) {
  updateSelection(_selectedRowKeys, _selectRows);
}

function updateSelection(keys: any, rows: any) {
  selectedRowKeys.value = keys;
  selectedRows.value = rows;
  emit('change', keys, rows);
}

function onSelect(record: any, selected: boolean) {
  const newKeys = [...selectedRowKeys.value];
  const newRows = [...selectedRows.value];
  if (selected) {
    newKeys.push(record.id);
    newRows.push(record);
  } else {
    const index = newKeys.indexOf(record.id);
    if (index !== -1) {
      newKeys.splice(index, 1);
      newRows.splice(index, 1);
    }
  }
  updateSelection(newKeys, newRows);
}

function onSelectAll(selected: boolean, _selectRows: any, changeRows: any) {
  if (selected) {
    const existingIds = new Set(selectedRowKeys.value);
    const newRows = changeRows.filter((row: any) => !existingIds.has(row.id));
    const newKeys = [...selectedRowKeys.value, ...newRows.map((row: any) => row.id)];
    const newRowsList = [...selectedRows.value, ...newRows];
    updateSelection(newKeys, newRowsList);
  } else {
    const removeIds = new Set(changeRows.map((row: any) => row.id));
    const newKeys = selectedRowKeys.value.filter((id: any) => !removeIds.has(id));
    const newRows = selectedRows.value.filter((row: any) => !removeIds.has(row.id));
    updateSelection(newKeys, newRows);
  }
}

function handleChange(page: any) {
  pagination.current = page.current;
  pagination.pageSize = page.pageSize;
  loadData();
}

function handleSearch() {
  pagination.current = 1;
  loadData();
}
</script>

<style lang="scss" scoped>
.personal-selector {
  height: 440px;
}
</style>
