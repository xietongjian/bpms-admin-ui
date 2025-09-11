
<script lang="ts" setup>
import { ref, defineOptions } from 'vue';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import { getAppPrivilegeValues, deleteByIds } from '#/api/privilege/appPrivilegeValue';
import { PerEnum } from '#/enums/perEnum';
import type { Recordable } from '@vben/types';
import { columns } from './appPrivilegeValue.data';
import AppPrivilegeValueModal from './app-privilege-value-modal.vue';
import { TableAction } from '#/components/table-action';
import {useVbenVxeGrid} from "#/adapter/vxe-table";
import {Page} from "@vben/common-ui";
import { useAccess } from '@vben/access';
import {Button} from 'ant-design-vue';

const PerPrefix = "AppPrivilegeValue:";
const appPrivilegeValueModalRef = ref();


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
  // toolbarConfig: {
  //   custom: true,
  //   refresh: { code: 'query' },
  //   zoom: true,
  // },
};

const [BasicTable, tableApi] = useVbenVxeGrid({gridOptions});

function handleCreate() {
  appPrivilegeValueModalRef.value.setData({});
  appPrivilegeValueModalRef.value.open();
  appPrivilegeValueModalRef.value.setState({title: '新增'});
}

function handleEdit(record: Recordable<any>) {
  appPrivilegeValueModalRef.value.setData(record);
  appPrivilegeValueModalRef.value.open();
  appPrivilegeValueModalRef.value.setState({title: '修改'});
}

function handleDelete(record: Recordable<any>) {
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

function createActions(record: Recordable<any>) {
  return [
    {
      auth: [PerPrefix + PerEnum.UPDATE],
      tooltip: '修改',
      icon: 'ant-design:form-outlined',
      onClick: handleEdit.bind(null, record),
    },
    {
      auth: [PerPrefix + PerEnum.DELETE],
      tooltip: '删除',
      icon: 'ant-design:delete-outlined',
      danger: true,
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, record),
        okButtonProps: { danger: true },
      },
    },
  ];
}
</script>

<template>
  <Page auto-content-height>
    <BasicTable table-title="权限值列表" >
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix+PerEnum.ADD" type="primary" @click="handleCreate"> 新增 </Button>
      </template>

      <template #action="{ row }">
        <TableAction :actions="createActions(row)" />
      </template>
    </BasicTable>

    <AppPrivilegeValueModal ref="appPrivilegeValueModalRef" @success="handleSuccess" />
  </Page>
</template>
