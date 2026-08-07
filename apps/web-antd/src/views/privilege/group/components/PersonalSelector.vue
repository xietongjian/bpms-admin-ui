<template>
  <div class="personal-selector">
    <div class="mb-2">
      <TreeSelect
        v-model:value="deptId"
        show-search
        style="width: 280px"
        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
        placeholder="请选择部门搜索"
        allow-clear
        :tree-default-expanded-keys="defaultExpandKeys"
        :tree-data="deptTreeData"
        tree-node-filter-prop="name"
        @change="handleSearch"
      >
      </TreeSelect>
      <a-input-search
        v-model:value="keyword"
        placeholder="请输入名称/工号"
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
      :data-source="personalList"
      :columns="userSelectorColumns as any"
      row-key="code"
      :scroll="{ y: 360 }"
      :row-selection="rowSelection"
      :pagination="pagination"
      @change="handleChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'name'">
          <EmpInfo :no="record.code" :name="record.name">
            <Badge>
              <template #count>
                <WomanOutlined v-if="record.sex === 2" style="color: #f5222d; font-size: 12px" title="女" />
                <ManOutlined v-else-if="record.sex === 1" style="color: #1890ff; font-size: 12px" title="男" />
                <QuestionCircleOutlined v-else style="color: #808080; font-size: 12px" title="保密" />
              </template>
              <Avatar :src="record.headImg">
                <template #icon>
                  <UserOutlined />
                </template>
              </Avatar>
            </Badge>
            {{ record.name }}
          </EmpInfo>
        </template>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, reactive } from 'vue';
import { Table, Badge, Avatar, TreeSelect } from 'ant-design-vue';
import {
  WomanOutlined,
  ManOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';
import { userSelectorColumns } from './setDataAcl.data';
import { getPersonalPagerModel } from '#/api/privilege/dataAcl';
import { EmpInfo } from '#/views/components/EmpInfo';
import { getOrgTree } from '#/api/org/dept';
import { forEach } from '#/utils/helper/treeHelper';

const props = defineProps({
  selectedKeys: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(['change']);
const loading = ref(false);
const keyword = ref('');
const deptId = ref();
const personalList = ref([]);
const deptTreeData = ref<any[]>([]);
const defaultExpandKeys = ref<any[]>([]);
const selectedRowKeys = ref<string[]>([]);
const selectedRows = ref<any[]>([]);
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
  getOrgTreeData();
});

function loadData() {
  loading.value = true;
  getPersonalPagerModel({
    keyword: keyword.value,
    deptId: deptId.value,
    pageNum: pagination.current,
    pageSize: pagination.pageSize,
  })
    .then((res: any) => {
      personalList.value = res.rows;
      pagination.total = res.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

async function getOrgTreeData() {
  const res = await getOrgTree();
  const expandKeys: any[] = [];
  forEach(res, (item: any) => {
    item.disabled = item.sourceType == '1';
    if (item.sourceType === '1') {
      expandKeys.push(item.id);
    }
  });
  defaultExpandKeys.value = expandKeys;
  deptTreeData.value = res;
}

function onSelectChange(_selectedRowKeys: any, _selectRows: any) {
  selectedRowKeys.value = _selectedRowKeys;
}

function onSelect(record: any, selected: boolean) {
  if (selected) {
    selectedRows.value.push(record);
  }
  if (!selected) {
    const delIndex = selectedRows.value.findIndex((val: any) => {
      return val.id === record.id;
    });
    selectedRows.value.splice(delIndex, 1);
  }
  emit('change', selectedRowKeys.value, selectedRows.value);
}

function onSelectAll(selected: boolean, _selectRows: any, changeRows: any) {
  if (selected) {
    selectedRows.value = selectedRows.value.concat(changeRows);
  }
  if (!selected) {
    let _selectedRows = JSON.parse(JSON.stringify(selectedRows.value));
    const delIndex: any[] = [];
    _selectedRows.forEach((item: any, index: number) => {
      changeRows.forEach((val: any) => {
        if (item.id === val.id) {
          delIndex.push(index);
        }
      });
    });
    delIndex.forEach((item: number) => {
      delete _selectedRows[item];
    });
    _selectedRows = _selectedRows.filter((item: any) => {
      return item !== undefined;
    });
    selectedRows.value = _selectedRows;
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
