<template>
  <Page dense contentFullHeight fixedHeight contentClass="flex">
    <JobGradeTypeList class="w-1/4 xl:w-1/5" @select="handleSelect"/>
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5">
      <template #toolbar>
        <Authority :value="'JobGrade:' + PerEnum.ADD">
          <a-button type="primary" @click="handleCreate">新增</a-button>
        </Authority>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
              :actions="[
              {
                auth: 'JobGrade:' + PerEnum.UPDATE,
                tooltip: '修改',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                auth: 'JobGrade:' + PerEnum.DELETE,
                tooltip: '删除',
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  confirm: handleDelete.bind(null, record),
                  placement: 'left',
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <JobGradeModal @register="registerModal" @success="handleSuccess"/>
  </Page>
</template>
<script lang="ts" setup>
import {PerEnum} from '#/enums/perEnum';
import {useAccess} from '@vben/access';
import {ref, unref} from 'vue';
import type {VbenFormProps} from '@vben/common-ui';
import type {VxeGridProps} from '#/adapter/vxe-table';

import {useVbenVxeGrid} from '#/adapter/vxe-table';
import {getJobGrades, deleteById} from '#/api/org/jobGrade';
import {Page, useVbenModal} from '@vben/common-ui';
// import JobGradeTypeList from '@/views/components/leftTree/JobGradeTypeList.vue';
import JobGradeModal from './JobGradeModal.vue';
import {columns, searchFormSchema} from './jobGrade.data';
import {message} from 'ant-design-vue';
import {getJobGradeTypes} from "#/api/org/jobGradeType";
import type {Recordable} from '@vben/types';

const PerPrefix = 'JobGrade:';
const {hasAccessByCodes} = useAccess();

// const [registerModal, {openModal, setModalProps}] = useModal();
const currentTreeNode = ref<Recordable>({});

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
    createMessage.warning('请选择分类！', 2);
    return;
  }
  setModalProps({title: '新增职级'});
  openModal(true, {
    record: {typeId: unref(currentTreeNode).id, typeCode: unref(currentTreeNode).code},
    isUpdate: true,
  });
}

function handleEdit(record: Recordable) {
  setModalProps({title: '修改职级'});
  openModal(true, {
    record,
    isUpdate: true,
  });
}

function handleDelete(record: Recordable) {
  deleteById([record.id]).then(() => {
    reload();
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
  reload({searchInfo});
}
</script>
