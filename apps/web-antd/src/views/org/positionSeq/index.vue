<script lang="ts" setup>
import { defineComponent } from 'vue';
import { PerEnum } from '#/enums/perEnum';
import {AccessControl, useAccess} from '@vben/access';
import type {VbenFormProps} from '@vben/common-ui';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type { Recordable } from '@vben/types';
import { TableAction } from '#/components/table-action';
import {Button, Image, Tag, Tooltip, Popconfirm, message} from 'ant-design-vue';

import {useVbenVxeGrid} from '#/adapter/vxe-table';
  // import { useModal } from '@/components/Modal';
  import { columns, searchFormSchema } from './positionSeq.data';
  import PositionSeqModal from './PositionSeqModal.vue';
  import { getPositionSeqs, deleteByIds } from '#/api/org/positionSeq';
import {listColumns} from "#/views/base/app/app.data";
import {getAppListByPage} from "#/api/base/app";
import {Page} from "@vben/common-ui";


const {hasAccessByCodes} = useAccess();

  const PerPrefix = 'PositionSeq:';
// const [registerModal, { openModal, setModalProps }] = useModal();
/*const [registerTable, { reload }] = useTable({
  title: '列表',
  api: getPositionSeqs,
  columns,
  formConfig: {
    labelWidth: 120,
    schemas: searchFormSchema,
    showAdvancedButton: false,
    showResetButton: false,
    autoSubmitOnEnter: true,
  },
  isTreeTable: true,
  expandRowByClick: true,
  canColDrag: true,
  pagination: false,
  useSearchForm: true,
  bordered: true,
  showIndexColumn: false,
  actionColumn: {
    width: 120,
    title: '操作',
    dataIndex: 'action',
  },
});*/


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
        return await getPositionSeqs({
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


function handleCreate() {
  openModal(true, {
    isUpdate: false,
  });
  setModalProps({
    title: '新增岗位序列',
  });
}

function handleEdit(record: Recordable, e) {
  e.stopPropagation();
  openModal(true, {
    record,
    isUpdate: true,
  });
  setModalProps({
    title: '修改岗位序列',
  });
}

function handleCreateChild(record: Recordable, e) {
  e.stopPropagation();
  setModalProps({
    title: '新增【' + record.name + '】的子序列',
  });
  record = { pid: record.id, status: 1 };
  openModal(true, {
    record,
    isUpdate: true,
  });
}

function handleDelete(record: Recordable<any>) {
  if (record.children && record.children.length > 0) {
    createMessage.warning('有子节点，不能删除！');
    return;
  }
  deleteByIds([record.id]).then((res) => {
    tableApi.reload();
  });
}

function doSearch() {
  tableApi.reload();
}

function handleSuccess() {
  setTimeout(() => {
    tableApi.reload();
  }, 200);
}

function createActions(record: Recordable<any>) {
  return [
    {
      auth: [PerPrefix + PerEnum.ADD],
      tooltip: '添加子序列',
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
        okButtonProps: { danger: true },
      },
    },
  ];
}
</script>
<template>
  <Page auto-content-height>
    <BasicTable @register="registerTable">
      <template #toolbar-tools>
        <a-button v-if="hasAccessByCodes([PerPrefix + PerEnum.ADD])" type="primary" @click="handleCreate"> 新增</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
              :actions="createActions(record)"
          />
        </template>
      </template>
    </BasicTable>
    <PositionSeqModal @register="registerModal" @success="handleSuccess" />
  </Page>
</template>
