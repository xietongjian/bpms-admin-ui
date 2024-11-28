
<script lang="ts" setup>
import { ref, defineOptions } from 'vue';

import { getAppPrivilegeValues, deleteByIds } from '#/api/privilege/appPrivilegeValue';
import { PerEnum } from '#/enums/perEnum';
import type { Recordable } from '@vben/types';
import { columns } from './appPrivilegeValue.data';
import AppPrivilegeValueModal from './app-privilege-value-modal.vue';
import { TableAction } from '#/components/table-action';
import {useVbenVxeGrid, VxeGridProps} from "#/adapter/vxe-table";
import {Page} from "@vben/common-ui";
import { useAccess } from '@vben/access';

const PerPrefix = "AppPrivilegeValue:";
const appPrivilegeValueModalRef = ref();
const { hasAccessByCodes } = useAccess();


const gridOptions: VxeGridProps<any> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  pagerConfig: {
    enabled: false,
  },
  columns,
  columnConfig: {resizable: true},
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        return await getAppPrivilegeValues();
      },
    },
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({gridOptions});

function handleCreate() {
  appPrivilegeValueModalRef.value.setData({});
  appPrivilegeValueModalRef.value.open();
}

function handleEdit(record: Recordable) {
  appPrivilegeValueModalRef.value.setData(record);
  appPrivilegeValueModalRef.value.open();
}

function handleDelete(record: Recordable) {
  deleteByIds([record.id]).then((res) => {
    tableApi.reload();
  });
  console.log(record);
}

function handleSuccess() {
  setTimeout(() => {
    tableApi.reload();
  }, 200);
}

function createActions(record: Recordable) {
  return [
    {
      auth: PerPrefix + PerEnum.UPDATE,
      tooltip: '修改',
      icon: 'clarity:note-edit-line',
      onClick: handleEdit.bind(null, record),
    },
    {
      auth: PerPrefix + PerEnum.DELETE,
      tooltip: '删除',
      icon: 'ant-design:delete-outlined',
      color: 'error',
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, record),
      },
    },
  ];
}
</script>

<template>
  <Page auto-content-height>
    <BasicTable >
      <template #toolbar>
        <a-button v-if="hasAccessByCodes[PerPrefix + PerEnum.ADD]" type="primary" @click="handleCreate"> 新增 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction :actions="createActions(record)" />
        </template>
      </template>
    </BasicTable>

    <AppPrivilegeValueModal ref="appPrivilegeValueModalRef" @success="handleSuccess" />
  </Page>
</template>
