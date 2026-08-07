<script lang="ts" setup>
import { ref } from 'vue';
import type { Recordable } from '@vben/types';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';
import { ColPage } from '@vben/common-ui';
import { Button, message } from 'ant-design-vue';
import { PerEnum } from '#/enums/perEnum';
import { useVbenVxeGrid, VbenTableAction } from '#/adapter/vxe-table';
import { TableAction } from '#/components/table-action';
import { assignmentColumns, searchFormSchema } from './calendarAssign.data';
import AssignCalendarModal from './AssignCalendarModal.vue';
import OrgTree from '#/views/components/leftTree/OrgTree.vue';
import {
  deleteCalendarYearOrgById,
  getCalendarYearOrgPage,
} from '#/api/base/calendarManage/calendarAssign.api';

const PerPrefix = 'CalendarAssign:';

const selectedOrg = ref<any>();
const assignCalendarModalRef = ref();

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 80,
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
  columns: assignmentColumns,
  columnConfig: { resizable: true },
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  showOverflow: false,
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        const params: any = {
          ...formValues,
          pageIndex: page.currentPage - 1,
          pageSize: page.pageSize,
        };
        if (selectedOrg.value?.id) {
          params.orgId = selectedOrg.value.id;
        }
        return await getCalendarYearOrgPage(params);
      },
    },
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({ formOptions, gridOptions });

function handleOrgSelect(node: any) {
  selectedOrg.value = node;
  if (node?.id) {
    tableApi.reload({ page: 1 } as any);
  }
}

function handleAssign() {
  assignCalendarModalRef.value.setData({
    isUpdate: false,
    currentOrg: selectedOrg.value,
  });
  assignCalendarModalRef.value.open();
}

function handleEdit(record: any) {
  assignCalendarModalRef.value.setData({
    isUpdate: true,
    record,
    currentOrg: selectedOrg.value,
  });
  assignCalendarModalRef.value.open();
}

async function handleDelete(record: Recordable<any>) {
  try {
    await deleteCalendarYearOrgById(record.id);
    message.success('删除成功');
    await tableApi.reload();
  } catch (e: any) {
    message.error(e?.message || '删除失败');
  }
}

function createActions(row: Recordable<any>) {
  return [
    {
      icon: 'ant-design:edit-outlined',
      tooltip: '编辑',
      onClick: handleEdit.bind(null, row),
    },
    {
      icon: 'ant-design:delete-outlined',
      tooltip: '删除',
      color: 'error',
      popConfirm: {
        title: '是否确认删除该分配记录',
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
  <ColPage
    :left-max-width="50"
    :left-min-width="10"
    :left-width="20"
    :split-handle="false"
    :left-collapsed-width="5"
    :split-line="false"
    :resizable="true"
    :left-collapsible="true"
    :auto-content-height="true"
    content-class="h-full"
  >
    <template #left>
      <div class="mr-2 h-full bg-card">
        <OrgTree class="h-full" :need-select-node="true" @select="handleOrgSelect" />
      </div>
    </template>
    <div class="h-full bg-card">
      <BasicTable table-title="日历分配">
        <template #toolbar-tools>
          <Button type="primary" :disabled="!selectedOrg?.id" @click="handleAssign">
            分配日历
          </Button>
        </template>

        <template #action="{ row }">
          <TableAction :actions="createActions(row)" />
        </template>
      </BasicTable>
    </div>
  </ColPage>
  <AssignCalendarModal ref="assignCalendarModalRef" @success="handleSuccess" />
</template>
