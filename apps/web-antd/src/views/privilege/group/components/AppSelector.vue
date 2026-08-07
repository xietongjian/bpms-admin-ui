<template>
  <div class="app-selector">
    <Table
      size="small"
      bordered
      :data-source="appList"
      :columns="appSelectorColumns as any"
      row-key="sn"
      :scroll="{ y: 360 }"
      :row-selection="rowSelection"
      :pagination="false"
    >
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Table } from 'ant-design-vue';
import { appSelectorColumns } from './setDataAcl.data';
import { getApps } from '#/api/privilege/dataAcl';

const props = defineProps({
  selectedKeys: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(['change']);
const appList = ref([]);
const selectedRowKeys = ref<string[]>([]);
const selectData = ref<any[]>([]);
const rowSelection: any = {
  selectedRowKeys,
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
  getApps().then((res) => {
    appList.value = res;
  });
});

function selectChange(_selectedRowKeys: any, selectedRows: any) {
  selectedRowKeys.value = _selectedRowKeys;
  if (selectedRows) {
    selectData.value = selectedRows;
  }
  emit('change', _selectedRowKeys, selectedRows);
}
</script>

<style lang="scss" scoped>
.app-selector {
  height: 440px;
}
</style>
