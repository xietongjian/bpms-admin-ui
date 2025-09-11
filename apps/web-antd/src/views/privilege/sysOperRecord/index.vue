<script lang="ts" setup>
import {ref} from 'vue';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import type {Recordable} from '@vben/types';

import {columns, searchFormSchema} from './sysOperRecord.data';
import LoginLogModal from './SysOperRecordModal.vue';
import {getListByPage, deleteByIds} from '#/api/privilege/sysOperRecord';
import {PerEnum} from "#/enums/perEnum";
import {TableAction} from '#/components/table-action';


import {Page} from '@vben/common-ui';
import {useVbenVxeGrid} from "#/adapter/vxe-table";
import {Button, message, Modal} from "ant-design-vue";

const [modal, contextHolder] = Modal.useModal();

const loginLogModalRef = ref();
const PerPrefix = 'SysOperRecord:';

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  wrapperClass: 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
  actionWrapperClass: 'pl-2 !justify-end md:!justify-start',
  actionPosition: 'left',
  actionLayout: 'inline',
  resetButtonOptions: {
    show: false,
  },
  fieldMappingTime: [['dateRange', ['startTimeStr', 'endTimeStr'], 'YYYY-MM-DD']],
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
      onClick: handleDetail.bind(null, row),
    },
    {
      tooltip: '删除',
      auth: [PerPrefix + PerEnum.DELETE],
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

function handleDetail(record: Recordable<any>) {
  loginLogModalRef.value.setData(record);
  loginLogModalRef.value.open();
  loginLogModalRef.value.setState({
    title: '查看详情',
  });
}

async function handleDelete(record: Recordable<any>) {
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
    <BasicTable table-title="操作日志列表">
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix+PerEnum.DELETE" type="danger" @click="handleDeleteAll"> 删除</Button>
      </template>
      <template #action="{ row }">>
        <TableAction :actions="createActions(row)" />
      </template>
    </BasicTable>
    <LoginLogModal ref="loginLogModalRef" @success="handleSuccess"/>
    <contextHolder />
  </Page>
</template>
