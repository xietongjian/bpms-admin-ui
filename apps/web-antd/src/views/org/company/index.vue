<script lang="ts" setup>
import {ref} from "vue";
import {Button, message, Tag} from "ant-design-vue";

import {useVbenVxeGrid} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import type { Recordable } from '@vben/types';
import type {VxeGridProps} from '#/adapter/vxe-table';
import {Page} from '@vben/common-ui';
import { TableAction } from '#/components/table-action';

import {deleteByIds, getCompaniesListData} from '#/api/org/company';
import {columns, searchFormSchema} from './company.data';
import CompanyModal from './company-modal.vue';
import {PerEnum} from '#/enums/perEnum';

const PerPrefix = 'Company:';
const companyModalRef = ref();

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
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns,
  showOverflow: true,
  columnConfig: {resizable: true},
  pagerConfig: {
    enabled: false,
  },
  rowConfig: {
    keyField: 'id',
    isHover: true,
  },
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  proxyConfig: {
    ajax: {
      query: async ({}, formValues) => {
        return await getCompaniesListData({
          entity: formValues || {},
        });
      },
    },
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

function handleCreate() {
  companyModalRef.value.setData({});
  companyModalRef.value.open();
  companyModalRef.value.setState({
    title: '新增公司'
  });
}

function handleEdit(record: Recordable<any>, e) {
  e.stopPropagation();
  companyModalRef.value.setData(record);
  companyModalRef.value.open();
  companyModalRef.value.setState({
    title: '修改公司'
  });
}

function handleCreateChild(record: Recordable<any>, e) {
  e.stopPropagation();
  companyModalRef.value.setData({pid: record.id, status: 1});
  companyModalRef.value.open();
  companyModalRef.value.setState({
    title: `新增【${record.cname}】的子公司`
  });
}

async function handleDelete(record: Recordable<any>) {
  if (record.children && record.children.length > 0) {
    message.warning('有子节点，不能删除！');
    return;
  }
  const {success, msg} = await deleteByIds([record.id]);
  if(success){
    message.success(msg);
    tableApi.reload();
  }
}
function handleSuccess() {
  tableApi.reload();
}

function createActions(record: Recordable<any>) {
  return [
    {
      auth: [PerPrefix + PerEnum.ADD],
      tooltip: '添加子公司',
      icon: 'ant-design:plus-outlined',
      onClick: handleCreateChild.bind(null, record),
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
      danger: true,
      onClick: (e) => {
        e.stopPropagation();
      },
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, record),
        placement: 'left',
        okButtonProps: {
          danger: true
        }
      },
    },
  ];
}
</script>

<template>
  <Page auto-content-height>
    <BasicTable >
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix+PerEnum.ADD" type="primary" @click="handleCreate"> 新增</Button>
      </template>
      <template #action="{ row }">
        <TableAction :actions="createActions(row)" />
      </template>
      <template #typeId="{ row }">
        {{row.typeId}}
      </template>
      <template #status="{ row }">
        <Tag v-if="row.status === 1" color="green">启用</Tag>
        <Tag v-else color="red">禁用</Tag>
      </template>
    </BasicTable>
    <CompanyModal ref="companyModalRef" @success="handleSuccess"/>
  </Page>
</template>
