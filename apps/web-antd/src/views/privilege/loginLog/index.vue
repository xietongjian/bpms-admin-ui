<script lang="ts" setup>
import {ref} from 'vue';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import type {Recordable} from '@vben/types';

import {Page} from '@vben/common-ui';
import {Button, message, Modal} from 'ant-design-vue';
import {TableAction} from '#/components/table-action';

import {columns, searchFormSchema} from './loginLog.data';
import LoginLogModal from './LoginLogModal.vue';
import {getLoginLogListByPage, deleteByIds} from '#/api/privilege/loginLog';
import {PerEnum} from "#/enums/perEnum";
import {useVbenVxeGrid} from "#/adapter/vxe-table";

const [modal, contextHolder] = Modal.useModal();

const loginLogModalRef = ref();
const PerPrefix = "LoginLog:";

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
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
    labelField: 'ip',
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
        return getLoginLogListByPage({
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

function createActions(row: Recordable<any>): any[] {
  return [
    {
      tooltip: '删除',
      auth: [PerPrefix + PerEnum.DELETE],
      icon: 'ant-design:delete-outlined',
      danger: true,
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, row),
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
    <BasicTable>
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix+PerEnum.DELETE"
                type="primary" danger
                @click="handleDeleteAll"> 删除</Button>
      </template>
      <template #action="{ row }">
        <TableAction :actions="createActions(row)"/>
      </template>
    </BasicTable>
    <LoginLogModal ref="loginLogModalRef"/>
    <contextHolder />
  </Page>
</template>
