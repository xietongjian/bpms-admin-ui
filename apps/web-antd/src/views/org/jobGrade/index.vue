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
        <JobGradeTypeList class="w-1/4 xl:w-1/5" @select="handleSelect"/>
      </div>
    </template>
    <BasicTable>
      <template #toolbar-tools>
        <Button v-if="hasAccessByCodes([PerPrefix + PerEnum.ADD])" type="primary" @click="handleCreate">新增</Button>
      </template>
      <template #action="{ row }">
        <TableAction
            :actions="createActions(row)"
        />
      </template>
    </BasicTable>
    <JobGradeModal ref="jobGradeModalRef" @success="handleSuccess"/>
  </ColPage>
</template>
<script lang="ts" setup>
import {PerEnum} from '#/enums/perEnum';
import {useAccess} from '@vben/access';
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
const {hasAccessByCodes} = useAccess();

// const [registerModal, {openModal, setModalProps}] = useModal();
const currentTreeNode = ref<Recordable<any>>({});

const jobGradeModalRef = ref();

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
  columnConfig: {resizable: true},
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        return await getJobGrades({
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

/*const [registerTable, { reload }] = useTable({
  title: '列表',
  api: getJobGrades,
  immediate: false,
  columns,
  formConfig: {
    labelWidth: 120,
    schemas: searchFormSchema,
    showAdvancedButton: false,
    showResetButton: false,
    autoSubmitOnEnter: true,
  },
  canColDrag: true,
  useSearchForm: true,
  bordered: true,
  pagination: false,
  showIndexColumn: false,
  actionColumn: {
    width: 100,
    title: '操作',
    dataIndex: 'action',
  },
});*/

function handleCreate() {
  if (!unref(currentTreeNode).code) {
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

function handleDelete(record: Recordable<any>) {
  deleteById([record.id]).then(() => {
    tableApi.reload();
  });
}

function handleSuccess() {
  setTimeout(() => {
    handleSelect(currentTreeNode.value);
  }, 200);
}

function handleSelect(node: any) {
  currentTreeNode.value = node;
  let searchInfo = {typeId: node ? node.id : ''};
  tableApi.reload({searchInfo});
}
</script>
