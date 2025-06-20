<template>
  <ColPage
      :left-max-width="50"
      :left-min-width="10"
      :left-width="15"
      :split-handle="true"
      :split-line="true"
      :resizable="true"
      :left-collapsible="true"
      :auto-content-height="true"
      content-class="h-full">
    <template #left>
      <div class="h-full bg-card">
        <JobGradeTypeList class="w-full" @select="handleSelect"/>
      </div>
    </template>
    <BasicTable>
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix + PerEnum.ADD" type="primary" @click="handleCreate">新增</Button>
      </template>
      <template #action="{ row }">
        <TableAction :actions="createActions(row)" />
      </template>
    </BasicTable>
    <JobGradeModal ref="jobGradeModalRef" @success="handleSuccess"/>
  </ColPage>
</template>
<script lang="ts" setup>
import {PerEnum} from '#/enums/perEnum';
import {ref, unref} from 'vue';
import type {VbenFormProps} from '@vben/common-ui';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {Recordable} from '@vben/types';

import {useVbenVxeGrid} from '#/adapter/vxe-table';
import {getJobGrades, deleteById} from '#/api/org/jobGrade';
import {ColPage} from '@vben/common-ui';
import JobGradeTypeList from './JobGradeTypeTree.vue';
import JobGradeModal from './JobGradeModal.vue';
import {columns, searchFormSchema} from './jobGrade.data';
import {message, Button} from 'ant-design-vue';
import {getJobGradeTypes} from "#/api/org/jobGradeType";
import { TableAction } from '#/components/table-action';

const PerPrefix = 'JobGrade:';

const currentTreeNode = ref<Recordable<any>>({});

const jobGradeModalRef = ref();

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  actionWrapperClass: 'col-span-2 col-start-2 text-left ml-2',
  resetButtonOptions: {
    show: false,
  },
  schema: searchFormSchema,
};

const gridOptions: VxeGridProps = {
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
  pagerConfig: {
    enabled: false,
  },
  proxyConfig: {
    ajax: {
      query: async ({}, formValues) => {
        formValues.typeId = currentTreeNode.value ? currentTreeNode.value.id : '';
        return await getJobGrades(formValues || {});
      },
    },
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

function createActions (row: Recordable<any>) {
  return [
    {
      auth: [PerPrefix + PerEnum.UPDATE],
      tooltip: '修改',
      icon: 'clarity:note-edit-line',
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
        okButtonProps: {danger: true}
      },
    },
  ];
}

function handleCreate() {
  if (!unref(currentTreeNode) || !unref(currentTreeNode).code) {
    message.warning('请选择分类！', 2);
    return;
  }
  jobGradeModalRef.value.setData({typeId: unref(currentTreeNode).id, typeCode: unref(currentTreeNode).code});
  jobGradeModalRef.value.open();
  jobGradeModalRef.value.setState({
    title: '新增职级',
  });
}

function handleEdit(record: Recordable<any>) {
  jobGradeModalRef.value.setData(record);
  jobGradeModalRef.value.open();
  jobGradeModalRef.value.setState({
    title: '修改职级',
  });
}

async function handleDelete(record: Recordable<any>) {
  const {success, msg} = await deleteById([record.id]);
  if (success) {
    tableApi.reload();
    message.success(msg);
  } else {
    message.error(msg);
  }
}

function handleSuccess() {
  setTimeout(() => {
    handleSelect(currentTreeNode.value);
  }, 200);
}

function handleSelect(node: any) {
  currentTreeNode.value = node;
  tableApi.reload();
}
</script>
