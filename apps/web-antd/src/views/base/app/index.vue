<script lang="ts" setup>
import {ref} from 'vue';
import type { Recordable } from '@vben/types';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import {PerEnum} from "#/enums/perEnum";

import {Page} from '@vben/common-ui';
import {Button, Image, Tag, message} from 'ant-design-vue';

import {useVbenVxeGrid} from '#/adapter/vxe-table';
import { TableAction } from '#/components/table-action';

import {listColumns, searchFormSchema} from "#/views/base/app/app.data";
import AppModal from './app-modal.vue';
import AppSecretKeyModal from './app-secret-key-modal.vue';
import {deleteByIds, getAppListByPage} from '#/api/base/app';

const PerPrefix = "App:";


const appModalRef = ref();
const appSecretKeyModalRef = ref();

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  wrapperClass: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  actionWrapperClass: 'pl-2 !justify-end md:!justify-start',
  actionPosition: 'left',
  actionLayout: 'inline',
  resetButtonOptions: {
    show: false,
  },
  schema: searchFormSchema,
};

const gridOptions: VxeGridProps = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: listColumns,
  columnConfig: {resizable: true},
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  showOverflow: false,
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        return await getAppListByPage({
          query: {
            pageNum: page.currentPage,
            pageSize: page.pageSize,
          },
          entity: formValues || {},
        });
      },
    },
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

function handleAdd() {
  appModalRef.value.setData({});
  appModalRef.value.open();
  appModalRef.value.setState({
    title: '新建'
  });
}

function handleEdit(record: any) {
  appModalRef.value.setData(record);
  appModalRef.value.open();
  appModalRef.value.setState({
    title: '修改'
  });
}

function handleViewSecretKey(record: any) {
  appSecretKeyModalRef.value.setData(record);
  appSecretKeyModalRef.value.open();
  appSecretKeyModalRef.value.setState({
    title: '查看密钥',
  });
}

async function handleDelete(record: any) {
  try {
    const result = await deleteByIds([record.id]);
    const {success, msg} = result;
    if (success) {
      message.success(msg);
      await tableApi.reload();
    } else{
      message.error(msg);
    }
  } catch (e) {
    message.error(e.message);
  }
}
function createActions(row: Recordable<any>) {
  return [
    {
      auth: [PerPrefix + PerEnum.QUERY],
      tooltip: '查看密钥',
      icon: 'ant-design:key-outlined',
      onClick: handleViewSecretKey.bind(null, row),
    },
    {
      label: '',
      type: 'link',
      tooltip: '编辑',
      icon: 'ant-design:form-outlined',
      size: 'small',
      auth: [PerPrefix + PerEnum.UPDATE],
      onClick: handleEdit.bind(null, row),
    },
    {
      label: '',
      icon: 'ant-design:delete-outlined',
      danger: true,
      auth: [PerPrefix + PerEnum.UPDATE],
      tooltip: '删除',
      popConfirm: {
        title: '确定删除吗？',
        confirm: handleDelete.bind(null, row),
        placement: 'left',
        okButtonProps: {danger: true}
      },
    },
  ];
}
</script>

<template>
  <Page auto-content-height>
    <BasicTable table-title="列表">
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix+PerEnum.ADD" type="primary" @click="handleAdd">新建</Button>
      </template>

      <template #image="{ row }">
        <Image :src="row.image" height="30" width="30"/>
      </template>

      <template #status="{ row }">
        <Tag v-if="row.status===1" color="green">启用</Tag>
        <Tag v-else color="red">禁用</Tag>
      </template>

      <template #platformEnabled="{ row }">
        <Tag v-if="row.platformEnabled===1" color="green">开启</Tag>
        <Tag v-else>关闭</Tag>
      </template>

      <template #action="{ row }">
        <TableAction :actions="createActions(row)"/>
      </template>
    </BasicTable>
    <AppModal ref="appModalRef" @onSuccess="tableApi.reload()"/>
    <AppSecretKeyModal ref="appSecretKeyModalRef" @onSuccess="tableApi.reload()"/>
  </Page>
</template>
