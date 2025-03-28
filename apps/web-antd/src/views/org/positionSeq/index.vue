<script lang="ts" setup>
import {PerEnum} from '#/enums/perEnum';
import {ref} from 'vue';
import type {VbenFormProps} from '@vben/common-ui';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {Recordable} from '@vben/types';
import {TableAction} from '#/components/table-action';
import {Button, message} from 'ant-design-vue';

import {useVbenVxeGrid} from '#/adapter/vxe-table';
// import { useModal } from '@/components/Modal';
import {columns, searchFormSchema} from './positionSeq.data';
import PositionSeqModal from './PositionSeqModal.vue';
import {getPositionSeqs, deleteByIds} from '#/api/org/positionSeq';

import {Page} from "@vben/common-ui";

const PerPrefix = 'PositionSeq:';

const positionSeqModalRef = ref();
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
  positionSeqModalRef.value.setData({});
  positionSeqModalRef.value.setState({
    title: '新增岗位序列',
  });
  positionSeqModalRef.value.open();
}

function handleEdit(record: Recordable<any>, e) {
  e.stopPropagation();
  positionSeqModalRef.value.setData(record);
  positionSeqModalRef.value.setState({
    title: '修改岗位序列',
  });
  positionSeqModalRef.value.open();
}

function handleCreateChild(record: Recordable<any>, e) {
  e.stopPropagation();
  record = {pid: record.id, status: 1};
  positionSeqModalRef.value.setData(record);
  positionSeqModalRef.value.setState({
    title: '新增【' + record.name + '】的子序列',
  });
  positionSeqModalRef.value.open();
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
  } else {
    message.error(msg);
  }
  return Promise.resolve();
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
        okButtonProps: {danger: true},
      },
    },
  ];
}
</script>
<template>
  <Page auto-content-height>
    <BasicTable>
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix + PerEnum.ADD" type="primary" @click="handleCreate"> 新增</Button>
      </template>
      <template #action="{ row }">
        <TableAction :actions="createActions(row)"/>
      </template>
    </BasicTable>
    <PositionSeqModal ref="positionSeqModalRef" @success="handleSuccess"/>
  </Page>
</template>
