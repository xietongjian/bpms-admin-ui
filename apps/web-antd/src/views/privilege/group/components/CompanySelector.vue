<template>
  <div class="company-selector">
    <Table
      size="small"
      bordered
      :data-source="companyList"
      :columns="companySelectorColumns as any"
      row-key="id"
      :scroll="{ y: 420 }"
      :row-selection="rowSelection"
      :pagination="false"
    >
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Table } from 'ant-design-vue';
import { companySelectorColumns } from './setDataAcl.data';
import { getCompanyTree } from '#/api/privilege/dataAcl';

const props = defineProps({
  selectedKeys: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(['change']);
const companyList = ref([]);
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
  getCompanyTree().then((res) => {
    companyList.value = res;
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
.company-selector {
  height: 460px;
}
</style>
