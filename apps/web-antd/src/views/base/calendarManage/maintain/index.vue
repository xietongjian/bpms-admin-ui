<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';
import { ColPage, useVbenModal } from '@vben/common-ui';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { useVbenForm } from '@vben/common-ui';
import { message, Button, Modal as AntdModal } from 'ant-design-vue';
import { getCalendarTypePage, getCalendarYearPage, deleteCalendarYear, updateYearCalendar } from '#/api/base/calendarManage/calendarMaintainApi';

const typeLoading = ref(false);
const calendarTypes = ref<any[]>([]);
const selectedType = ref<any>();

const [YearForm, yearFormApi] = useVbenForm({
  commonConfig: { labelWidth: 80 },
  schema: [
    { component: 'Input', fieldName: 'id', componentProps: { hidden: true } },
    { component: 'Input', fieldName: 'typeCode', componentProps: { hidden: true } },
    { component: 'Input', fieldName: 'year', label: '年份', rules: 'required', componentProps: { placeholder: '请输入年份' } },
    { component: 'Input', fieldName: 'name', label: '名称', componentProps: { placeholder: '请输入名称' } },
  ],
});

const [YearModal, yearModalApi] = useVbenModal({
  showCancelButton: false, showConfirmButton: true, confirmText: '确定',
  onOpenChange: async (isOpen) => {
    if (isOpen) {
      const data = yearModalApi.getData<{ isUpdate: boolean; record: any; currentType: any }>();
      await yearFormApi.resetForm();
      if (data?.record) yearFormApi.setValues(data.record);
      if (data?.currentType) yearFormApi.setValues({ typeCode: data.currentType.type });
    }
  },
  onConfirm: async () => {
    const { valid } = await yearFormApi.validate();
    if (!valid) return;
    const values = yearFormApi.getValues();
    yearModalApi.setState({ confirmLoading: true });
    try {
      await updateYearCalendar(values);
      message.success('保存成功');
      yearModalApi.close();
      reload();
    } catch { } finally { yearModalApi.setState({ confirmLoading: false }); }
  },
});

const [RuleForm, ruleFormApi] = useVbenForm({
  commonConfig: { labelWidth: 80 },
  schema: [
    { component: 'Input', fieldName: 'id', componentProps: { hidden: true } },
    { component: 'DatePicker', fieldName: 'date', label: '日期', componentProps: { style: { width: '100%' } } },
    { component: 'Select', fieldName: 'type', label: '类型',
      componentProps: {
        options: [{ label: '工作日', value: 'WORKDAY' }, { label: '休息日', value: 'RESTDAY' }, { label: '节假日', value: 'HOLIDAY' }],
      },
    },
    { component: 'Input', fieldName: 'remark', label: '备注' },
  ],
});

const [RuleModal, ruleModalApi] = useVbenModal({
  showCancelButton: false, showConfirmButton: true, confirmText: '确定',
  onConfirm: async () => { ruleModalApi.close(); },
});

const formOptions: VbenFormProps = {
  showCollapseButton: false, submitOnEnter: true, commonConfig: { labelWidth: 60 },
  wrapperClass: 'grid grid-cols-1 md:grid-cols-2', actionWrapperClass: 'pl-2',
  schema: [
    { component: 'Input', fieldName: 'keyword', label: '关键字', componentProps: { placeholder: '请输入关键字', allowClear: true } },
  ],
};

const gridOptions: VxeGridProps = {
  columns: [
    { type: 'seq', width: 60, align: 'center' },
    { field: 'year', title: '年份', align: 'left', width: 120 },
    { field: 'name', title: '名称', align: 'left', minWidth: 150 },
    { field: 'typeName', title: '类型', align: 'left', width: 150 },
    { field: 'createTime', title: '创建时间', width: 180, align: 'center' },
    { cellRender: { name: 'VbenTableAction' }, field: 'action', fixed: 'right', title: '操作', width: 200 },
  ],
  columnConfig: { resizable: true }, height: 'auto', keepSource: true, border: false, stripe: true, showOverflow: false,
  proxyConfig: { ajax: { query: async ({ page }, formValues) => {
    return await getCalendarYearPage({ ...formValues, typeCode: selectedType.value?.type, pageNum: page.currentPage, pageSize: page.pageSize });
  } } },
};

const [BasicTable, { reload }] = useVbenVxeGrid({ formOptions, gridOptions });

async function fetchCalendarTypes() {
  typeLoading.value = true;
  try {
    const res = await getCalendarTypePage({ pageNum: 1, pageSize: 999 });
    calendarTypes.value = res?.rows || res?.result?.items || [];
    if (calendarTypes.value.length > 0) {
      selectedType.value = calendarTypes.value[0];
      await reload();
    }
  } finally { typeLoading.value = false; }
}

async function handleTypeSelect(item: any) { selectedType.value = item; await reload(); }
function handleCreate() { yearModalApi.setData({ isUpdate: false, currentType: selectedType.value }); yearModalApi.open(); }
function handleEdit(record: any) { yearModalApi.setData({ isUpdate: true, record, currentType: selectedType.value }); yearModalApi.open(); }
function handleRule(record: any) { ruleModalApi.setData({ record }); ruleModalApi.open(); }
async function handleDelete(record: any) { await deleteCalendarYear(record.id); message.success('删除成功'); await reload(); }

onMounted(() => { fetchCalendarTypes(); });
</script>

<template>
  <ColPage left-width="240px">
    <template #left>
      <div class="p-3">
        <div class="font-semibold h-8 leading-8 mb-2">日历类型</div>
        <div v-if="typeLoading" class="text-center py-4 text-gray-400">加载中...</div>
        <div v-for="item in calendarTypes" :key="item.id"
             class="flex items-center justify-between min-h-[40px] mb-2 px-3 cursor-pointer border border-transparent rounded transition-all"
             :class="{'border-blue-300 bg-blue-50 text-blue-500': selectedType?.id === item.id}"
             @click="handleTypeSelect(item)">
          <span>{{ item.name }}</span>
          <span class="text-gray-400 text-xs">{{ item.type }}</span>
        </div>
      </div>
    </template>
    <template #right>
      <BasicTable table-title="日历维护" @create="handleCreate">
        <template #action="{ row }">
          <VbenTableAction :actions="[
            { label: '编辑', icon: 'clarity:note-edit-line', onClick: () => handleEdit(row) },
            { label: '规则', icon: 'ant-design:calendar-outlined', onClick: () => handleRule(row) },
            { label: '删除', icon: 'ant-design:delete-outlined', color: 'error', popConfirm: { title: '是否确认删除', confirm: () => handleDelete(row) } },
          ]" />
        </template>
      </BasicTable>
    </template>
  </ColPage>
  <YearModal><YearForm /></YearModal>
  <RuleModal><RuleForm /></RuleModal>
</template>
