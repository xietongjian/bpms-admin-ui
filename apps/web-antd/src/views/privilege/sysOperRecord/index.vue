<script lang="ts" setup>
import {ref} from 'vue';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import type {Recordable} from '@vben/types';

import {columns, searchFormSchema} from './sysOperRecord.data';
import LoginLogModal from './SysOperRecordModal.vue';
import {getListByPage, deleteByIds} from '#/api/privilege/sysOperRecord';
import {useAccess} from '@vben/access';
import {PerEnum} from "#/enums/perEnum";
import {TableAction} from '#/components/table-action';


import {Page} from '@vben/common-ui';
import {useVbenVxeGrid} from "#/adapter/vxe-table";
import {Button, message, Modal} from "ant-design-vue";

const {hasAccessByCodes} = useAccess();
const [modal, contextHolder] = Modal.useModal();

const loginLogModalRef = ref();
const PerPrefix = 'SysOperRecord:';

/*const { createMessage, createConfirm } = useMessage();
const [registerModal, { openModal, setModalProps }] = useModal();
const [registerTable, { reload, getSelectRows }] = useTable({
  title: '列表',
  api: getListByPage,
  columns,
  formConfig: {
    labelWidth: 120,
    schemas: searchFormSchema,
    showAdvancedButton: false,
    showResetButton: false,
    autoSubmitOnEnter: true,
    fieldMapToTime: [['dateRange', ['startTime', 'endTime'], 'YYYY-MM-DD']],
  },
  rowSelection: {
    type: 'checkbox',
    columnWidth: 30,
  },
  canColDrag: true,
  useSearchForm: true,
  bordered: true,
  showIndexColumn: false,
  actionColumn: {
    width: 60,
    title: '操作',
    dataIndex: 'action',
    fixed: false,
  },
});*/


const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  wrapperClass: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
  resetButtonOptions: {
    show: false,
  },
  fieldMappingTime: [['dateRange', ['startTimeStr', 'endTimeStr'], 'YYYY-MM-DD']],
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
        return await getListByPage({
          query: {
            pageNum: page.currentPage,
            pageSize: page.pageSize,
          },
          entity: formValues || {},
        }).then(res => {
          return Promise.resolve(res);
        });
      },
    },
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

function createActions(row: Recordable<any>) {
  return [
    {
      tooltip: '详情',
      icon: 'ant-design:file-search-outlined',
      onClick: handleDetail.bind(null, record),
    },
    {
      tooltip: '删除',
      auth: [PerPrefix + PerEnum.DELETE],
      icon: 'ant-design:delete-outlined',
      danger: true,
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

function handleCreate() {
  loginLogModalRef.value.setData({});
  loginLogModalRef.value.open();
}

function handleDetail(record: Recordable<any>) {
  loginLogModalRef.value.setData(record);
  loginLogModalRef.value.open();
  loginLogModalRef.value.setState({
    title: '查看详情',
  });
}

function handleDelete(record: Recordable<any>) {
  const {success, msg} = await deleteByIds([record.id]);
  if (success) {
    message.success(msg);
    tableApi.reload();
  }else {
    message.error(msg);
  }
}

function handleDeleteAll() {
  const selectedRows = tableApi.grid.getCheckboxRecords();
  if (selectedRows && selectedRows.length <= 0) {
    message.warn('请选择行！');
    return;
  }
  modal.confirm({
    iconType: 'warning',
    title: '提示',
    content: '确定要删除所选行吗？',
    okButtonProps: {
      danger: true
    },
    onOk: async () => {
      const ids = selectedRows.map((item) => item.id);
      const {success, msg} = await deleteByIds(ids);
      if(success){
        message.success(msg);
        tableApi.reload();
      }else {
        message.error(msg);
      }
    },
  });
}

function handleSuccess() {
  tableApi.reload();
}

</script>
<template>
  <Page auto-content-height>
    <BasicTable>
      <template #toolbar-tools>
        <Button v-if="hasAccessByCodes([PerPrefix+PerEnum.DELETE])" type="danger" @click="handleDeleteAll"> 删除</Button>
      </template>
      <template #action="{ row }">>
        <TableAction :actions="createActions(row)" />
      </template>
    </BasicTable>
    <LoginLogModal ref="loginLogModalRef" @success="handleSuccess"/>
    <contextHolder />
  </Page>
</template>
