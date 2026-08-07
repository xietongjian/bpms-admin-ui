<script lang="ts" setup>
import { ref } from 'vue';
import type { Recordable } from '@vben/types';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';
import { Page } from '@vben/common-ui';
import { Button, message } from 'ant-design-vue';
import { PerEnum } from '#/enums/perEnum';
import { useVbenVxeGrid, VbenTableAction } from '#/adapter/vxe-table';
import { calendarTypeColumns, searchFormSchema } from './calendarType.data';
import CalendarTypeModal from './CalendarTypeModal.vue';
import CalendarTypeRemarkModal from './CalendarTypeRemarkModal.vue';
import {
  deleteCalendarTypeBatch,
  deleteCalendarTypeById,
  getCalendarTypePage,
} from '#/api/base/calendarManage/calendarType.api';

const PerPrefix = 'CalendarType:';

const calendarTypeModalRef = ref();
const calendarTypeRemarkModalRef = ref();

// 选中的 key
const selectedRowKeys = ref<string[]>([]);

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  resetButtonOptions: {
    show: false,
  },
  schema: searchFormSchema,
  wrapperClass: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  actionWrapperClass: 'pl-2 !justify-end md:!justify-start',
  actionPosition: 'left',
  actionLayout: 'inline',
};

const gridOptions: VxeGridProps = {
  columns: calendarTypeColumns,
  columnConfig: { resizable: true },
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  showOverflow: false,
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await getCalendarTypePage({
          pageIndex: page.currentPage - 1,
          pageSize: page.pageSize,
          entity: formValues || {},
        });
      },
    },
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({ formOptions, gridOptions });

function handleSelectionChange(params: { records: Recordable[]; reserves: Recordable[] }) {
  selectedRowKeys.value = params.records.map((item: any) => item.id);
}

function handleAdd() {
  calendarTypeModalRef.value.setData({});
  calendarTypeModalRef.value.open();
  calendarTypeModalRef.value.setState({
    title: '新增日历类型',
  });
}

function handleEdit(record: any) {
  calendarTypeModalRef.value.setData(record);
  calendarTypeModalRef.value.open();
  calendarTypeModalRef.value.setState({
    title: '修改日历类型',
  });
}

function handleEditRemark(record: any) {
  calendarTypeRemarkModalRef.value.setData(record);
  calendarTypeRemarkModalRef.value.open();
  calendarTypeRemarkModalRef.value.setState({
    title: '修改备注',
  });
}

async function handleDelete(record: Recordable<any>) {
  try {
    const result = await deleteCalendarTypeById(record.id);
    const { success, msg } = result;
    if (success) {
      message.success(msg || '删除成功！');
      await tableApi.reload();
    } else {
      message.error(msg);
    }
  } catch (e: any) {
    message.error(e?.message || '删除失败');
  }
}

async function handleBatchDelete() {
  const ids = selectedRowKeys.value;
  if (ids.length === 0) {
    message.warning('请选择删除项');
    return;
  }
  try {
    const result = await deleteCalendarTypeBatch(ids);
    const { success, msg } = result;
    if (success) {
      message.success(msg || '批量删除成功！');
      selectedRowKeys.value = [];
      await tableApi.reload();
    } else {
      message.error(msg);
    }
  } catch (e: any) {
    message.error(e?.message || '批量删除失败');
  }
}

function createActions(row: Recordable<any>) {
  return [
    {
      auth: [PerPrefix + PerEnum.UPDATE],
      text: '修改',
      icon: 'ant-design:form-outlined',
      onClick: handleEdit.bind(null, row),
    },
    {
      auth: [PerPrefix + PerEnum.UPDATE],
      text: '修改备注',
      icon: 'ant-design:edit-outlined',
      onClick: handleEditRemark.bind(null, row),
    },
    {
      auth: [PerPrefix + PerEnum.DELETE],
      text: '删除',
      icon: 'ant-design:delete-outlined',
      danger: true,
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, row),
        placement: 'left',
      },
    },
  ];
}

function handleSuccess() {
  tableApi.reload();
}
</script>

<template>
  <Page auto-content-height>
    <BasicTable table-title="日历类型管理" @checkbox-change="handleSelectionChange" @checkbox-all="handleSelectionChange">
      <template #toolbar-tools>
        <Button
          v-access:code="PerPrefix + PerEnum.ADD"
          type="primary"
          @click="handleAdd"
        >
          新增
        </Button>
        <Button
          v-access:code="PerPrefix + PerEnum.DELETE"
          danger
          @click="handleBatchDelete"
        >
          批量删除
        </Button>
      </template>

      <template #action="{ row }">
        <VbenTableAction align="center" :actions="createActions(row)" />
      </template>
    </BasicTable>
    <CalendarTypeModal ref="calendarTypeModalRef" @onSuccess="handleSuccess" />
    <CalendarTypeRemarkModal ref="calendarTypeRemarkModalRef" @onSuccess="handleSuccess" />
  </Page>
</template>
