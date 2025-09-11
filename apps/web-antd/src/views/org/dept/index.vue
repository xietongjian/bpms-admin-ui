<script lang="ts" setup>
import {ref, unref} from 'vue';

import {PerEnum} from '#/enums/perEnum';
import type {Recordable} from '@vben/types';
import type {VbenFormProps} from '@vben/common-ui';
import type {VxeGridProps} from '#/adapter/vxe-table';

import {useVbenVxeGrid} from '#/adapter/vxe-table';
import {ColPage} from '@vben/common-ui';
import {TableAction} from '#/components/table-action';

import {Button, message} from 'ant-design-vue';

import {deleteByIds, getDeptListData, getDepts} from '#/api/org/dept';
import CompanyTree from '#/views/components/leftTree/CompanyTree.vue';
import DeptModal from './DeptModal.vue';
import {columns, searchFormSchema} from './dept.data';
import {EmpInfo} from '#/views/components/EmpInfo';

const PerPrefix = 'Department:';

const currentNode = ref<Recordable<any>>({});

const deptModalRef = ref();

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

const gridOptions: VxeGridProps<any> = {
  pagerConfig: {
    enabled: false,
  },
  treeConfig: {
    parentField: 'pid',
    rowField: 'id',
    transform: true,
  },
  rowConfig: {
    isHover: true,
  },
  columns,
  columnConfig: {resizable: true},
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  showOverflow: true,
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        formValues.companyId = unref(currentNode)?.id;
        if(!formValues.companyId){
          return [];
        }
        return await getDeptListData(formValues || {});
      },
    },
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

function handleCreate() {
  const record = {companyId: unref(currentNode)?.id};
  deptModalRef.value.setData(record);
  deptModalRef.value.open();
  deptModalRef.value.setState({
    title: '新增部门'
  });
}

function handleEdit(record: Recordable<any>) {
  deptModalRef.value.setData(record);
  deptModalRef.value.open();
  deptModalRef.value.setState({
    title: '修改部门'
  });
}

function handleCreateChild(record: Recordable<any>) {
  deptModalRef.value.setData({companyId: unref(currentNode)?.id, pid: record.id});
  deptModalRef.value.setState({
    title: '新增【' + record.name + '】的子部门'
  });
  deptModalRef.value.open();
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
  tableApi.reload()
}

function handleSelect(node: Recordable<any>) {
  currentNode.value = node;
  tableApi.reload()
}

function createActions(row: Recordable<any>) {
  return [
    {
      auth: [PerPrefix + PerEnum.ADD],
      tooltip: '添加子部门',
      icon: 'ant-design:plus-outlined',
      onClick: handleCreateChild.bind(null, row),
    },
    {
      auth: [PerPrefix + PerEnum.UPDATE],
      tooltip: '修改',
      icon: 'ant-design:form-outlined',
      onClick: handleEdit.bind(null, row),
    },
    {
      auth: [PerPrefix + PerEnum.DELETE],
      tooltip: '删除',
      icon: 'ant-design:delete-outlined',
      danger: true,
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, row),
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
  <ColPage
      :left-max-width="50"
      :left-min-width="10"
      :left-width="15"
      :split-handle="false"
      :split-line="false"
      :resizable="true"
      :left-collapsible="false"
      :auto-content-height="true"
      content-class="h-full">
    <template #left>
      <CompanyTree @select="handleSelect"/>
    </template>
    <BasicTable class="ml-2" table-title="部门管理">
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix + PerEnum.ADD" type="primary" @click="handleCreate">新增</Button>
      </template>
      <template #action="{ row }">
        <TableAction
            :stopButtonPropagation="true"
            :actions="createActions(row)"
        />
      </template>
      <template #superiorName="{ row }">
        <EmpInfo :no="row.superiorCode" :name="row.superiorName"/>
      </template>

      <template #leaderName="{ row }">
        <EmpInfo :no="row.leaderCode" :name="row.leaderName"/>
      </template>
    </BasicTable>
    <DeptModal ref="deptModalRef" @success="handleSuccess"/>
  </ColPage>
</template>
