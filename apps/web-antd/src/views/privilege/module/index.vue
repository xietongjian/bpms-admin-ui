<script lang="ts" setup>
import {nextTick} from 'vue';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import {Page, useVbenModal} from '@vben/common-ui';
import {Button, Image, Space, Tag, Tooltip, Popconfirm, message} from 'ant-design-vue';
import {useVbenVxeGrid} from '#/adapter/vxe-table';
import type { Recordable } from '@vben/types';
import { TableAction } from '#/components/table-action';

import { getModules } from '#/api/privilege/module';
import { useAccess } from '@vben/access';

import {listColumns, searchFormSchema} from "#/views/privilege/module/module.data";
import {PerEnum} from "#/enums/perEnum";
import { IconifyIcon } from '@vben/icons';

const PerPrefix = "Module:";
const {hasAccessByCodes} = useAccess();
const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  actionWrapperClass: 'col-span-2 col-start-2 text-left ml-4',
  resetButtonOptions: {
    show: false,
  },
  schema: searchFormSchema,
};

const gridOptions: VxeGridProps = {
  columns: listColumns,
  columnConfig: {resizable: true},
  height: 'auto',
  keepSource: true,
  border: false,
  pagerConfig: {
    enabled: false,
  },
  rowConfig: {
    keyField: 'id',
  },
  treeConfig: {
    parentField: 'pid',
    rowField: 'id',
    transform: true,
  },
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        const resp = await getModules({
          ...formValues,
        })
        return resp;
      },
      // 默认请求接口后展开全部 不需要可以删除这段
      querySuccess: () => {
        nextTick(() => {
          expandAll();
        });
      },
    },
  },
};

const [BasicTable, gridApi] = useVbenVxeGrid({formOptions, gridOptions});

function expandAll() {
  gridApi.grid?.setAllTreeExpand(true);
}

function handleAdd() {
  /*modalApi.setData({});
  modalApi.open();
  modalApi.setState({
    title: '新建'
  });*/
}

function handleEdit(record: Recordable) {
  /*modalApi.setData(record);
  modalApi.open();
  modalApi.setState({
    title: '修改'
  });*/
}

function handleViewSecretKey(record: Recordable) {
  /*secretKeyModalApi.setData(record);
  secretKeyModalApi.open();
  secretKeyModalApi.setState({
    title: '查看密钥',
  });*/
}

async function handleDelete(record: Recordable) {
  try {
    /*const result = await deleteByIds([record.id]);
    const {success, msg} = result;
    if (success) {
      message.success(msg);
      await gridApi.reload();
    } else{
      message.error(msg);
    }*/
  } catch (e) {
    message.error(e);
  }
}

function handleCreateChild(record: Recordable, e) {
  e.stopPropagation();
  setModalProps({ title: '新增【' + record.name + '】的子菜单' });
  record = {
    pid: record.id,
    status: 1,
    showStatus: 1,
  };
  openModal(true, {
    record,
    isUpdate: true,
  });
}

function handleEditPValue(record: Recordable, e) {
  e.stopPropagation();
  openPvalueModal(true, {
    record,
    isUpdate: true,
  });
}

function createActions(record: Recordable): any[] {
  return [
    {
      auth: [PerPrefix + PerEnum.ADD],
      tooltip: '添加子菜单',
      icon: 'ant-design:plus-outlined',
      onClick: handleCreateChild.bind(null, record),
    },
    {
      auth: [PerPrefix + PerEnum.AUTH],
      tooltip: '设置权限值',
      icon: 'ant-design:setting-outlined',
      onClick: handleEditPValue.bind(null, record),
    },
    {
      auth: [PerPrefix + PerEnum.UPDATE],
      tooltip: '修改',
      icon: 'clarity:note-edit-line',
      onClick: handleEdit.bind(null, record),
    },
    {
      auth: [PerPrefix + PerEnum.DELETE],
      tooltip: '删除',
      icon: 'ant-design:delete-outlined',
      color: 'error',
      onClick: (e) => {
        e.stopPropagation();
      },
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
    <BasicTable table-title="列表">
      <template #toolbar-tools>
        <Space>
          <Button v-if="hasAccessByCodes[PerPrefix + PerEnum.ADD]" type="primary" @click="handleAdd">新建</Button>
        </Space>
      </template>

      <template #action="{record}">
        <TableAction :actions="createActions(record)" />
      </template>

      <template #name="{ row }">
        <div class="flex flex-row items-center gap-1">
          <IconifyIcon :icon="row.image || 'ant-design:ellipsis-outlined'" class="size-5" height="20" width="20"/>
          <span>{{row.name}}</span>
        </div>
      </template>
      <template #pvs="{ row }">
        <div class="flex flex-row items-center gap-1">
          <Tag v-for="item in row.pvs" :key="item.id" color="green">{{item.name}}</Tag>
        </div>
      </template>

      <template #status="{ row }">
        <Tag v-if="row.status===1" color="green">启用</Tag>
        <Tag v-else color="red">禁用</Tag>
      </template>

      <template #showStatus="{ row }">
        <Tag v-if="row.showStatus===1" color="green">开启</Tag>
        <Tag v-else>关闭</Tag>
      </template>
    </BasicTable>
    <ModuleModal ref="moduleModalRef" @register="registerModal" @success="handleSuccess" />
    <PValueSettingModal ref="pValueSettingModalRef" @register="registerPValueModal" @success="handleSuccess" />
  </Page>
</template>
