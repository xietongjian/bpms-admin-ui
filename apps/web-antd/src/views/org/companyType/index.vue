<script lang="ts" setup>
import {ref} from 'vue';
import {PerEnum} from '#/enums/perEnum';
import type {VxeGridProps} from '#/adapter/vxe-table';
import {useVbenVxeGrid} from '#/adapter/vxe-table';
import {Button} from "ant-design-vue";
import type { Recordable } from '@vben/types';
import {message} from 'ant-design-vue';

import {deleteById, getCompanyTypes} from '#/api/org/companyType';
import {columns, searchFormSchema} from './companyType.data';
import CompanyTypeModal from './company-type-modal.vue';
import type {VbenFormProps} from '@vben/common-ui';
import {Page} from '@vben/common-ui';
import {useAccess} from "@vben/access";
import {TableAction} from '#/components/table-action';

const companyTypeModalRef = ref();
const PerPrefix = 'CompanyType:';
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
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
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
  columns,
  columnConfig: {resizable: true},
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        return await getCompanyTypes({
          entity: formValues || {},
        }).then(res => {
          return Promise.resolve(res);
        });
      },
    },
  },
};
const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

function handleCreate() {
  companyTypeModalRef.value.setData({});
  companyTypeModalRef.value.open();
  companyTypeModalRef.value.setState({
    title: '新增公司分类'
  });
}

function handleEdit(record: Recordable<any>) {
  companyTypeModalRef.value.setData(record);
  companyTypeModalRef.value.open();
  companyTypeModalRef.value.setState({
    title: '修改公司分类'
  });
}

function handleCreateChild(record: Recordable, e) {

  e.stopPropagation();
  setModalProps({title: '新增【' + record.name + '】的子分类'});
  record = {pid: record.id};
  openModal(true, {
    record,
    isUpdate: true,
  });
}

function handleDelete(record: Recordable) {
  if (record.children && record.children.length > 0) {
    message.warning('有子节点，不能删除！');
    return;
  }
  deleteById({id: record.id}).then((res) => {
    tableApi.reload();
  });
}

function doSearch() {
  tableApi.reload();
}

function handleSuccess() {
  tableApi.reload();

}

function createActions(record: Recordable<any>) {
  return [
    {
      auth: [PerPrefix + PerEnum.ADD],
      tooltip: '添加子分类',
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
      onClick: (e: any) => {
        e.stopPropagation();
      },
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, record),
        placement: 'left',
        okButtonProps: {
          danger: true,
        }
      },
    },
  ];
}
</script>

<template>
  <Page auto-content-height>
    <BasicTable table-title="列表">
      <template #toolbar-tools>
        <Button v-if="hasAccessByCodes([PerPrefix + PerEnum.ADD])" type="primary" @click="handleCreate"> 新增</Button>
      </template>
      <template #action="{ row }">
        <TableAction :actions="createActions(row)"/>
      </template>
    </BasicTable>
    <CompanyTypeModal ref="companyTypeModalRef" @success="handleSuccess"/>
  </Page>
</template>
