<script lang="ts" setup>
import {ref} from 'vue';
import type {VxeGridProps} from '#/adapter/vxe-table';
import {useVbenVxeGrid} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import {Page} from "@vben/common-ui";

import {PerEnum} from '#/enums/perEnum';
import {columns, searchFormSchema} from './jobGradeType.data';
import JobGradeTypeModal from './JobGradeTypeModal.vue';
import {deleteById, getJobGradeTypes} from '#/api/org/jobGradeType';
import type {Recordable} from '@vben/types';
import {TableAction} from '#/components/table-action';
import {Button, message, Tag} from 'ant-design-vue';

const PerPrefix = "JobGradeType:";

const jobGradeTypeModalRef = ref();

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

const gridOptions: VxeGridProps<any> = {
  pagerConfig: {
    enabled: false,
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
      query: async ({}, formValues) => {
        return await getJobGradeTypes(formValues);
      },
    },
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});


function handleCreate() {
  jobGradeTypeModalRef.value.setData({});
  jobGradeTypeModalRef.value.open();
  jobGradeTypeModalRef.value.setState({
    title: '新增',
  });
}

function handleEdit(record: Recordable<any>) {
  jobGradeTypeModalRef.value.setData(record);
  jobGradeTypeModalRef.value.open();
  jobGradeTypeModalRef.value.setState({
    title: '修改',
  });
}

async function handleDelete(record: Recordable<any>) {
  const {success, msg} = await deleteById([record.id]);
  if(success){
    tableApi.reload();
    message.success(msg);
  } else {
    message.error(msg);
  }
}

function handleSuccess() {
  tableApi.reload();
}

function createActions(record: Recordable<any>) {
  return [
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
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, record),
        placement: 'left',
        okButtonProps: {danger: true}
      },
    },
  ]
}
</script>
<template>
  <Page auto-content-height>
    <BasicTable>
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix + PerEnum.ADD" type="primary" @click="handleCreate"> 新增</Button>
      </template>

      <template #status="{ row }">
        <Tag v-if="row.status === 1" color="green">启用</Tag>
        <Tag v-else color="red">停用</Tag>
      </template>
      <template #action="{ row }">
        <TableAction :actions="createActions(row)" />
      </template>
    </BasicTable>
    <JobGradeTypeModal ref="jobGradeTypeModalRef" @success="handleSuccess"/>
  </Page>
</template>
