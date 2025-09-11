<template>
  <Page auto-content-height>
    <BasicTable table-title="常用系统管理">
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix+PerEnum.ADD" type="primary" @click="handleCreate">新增</Button>
      </template>
      <template #action="{ row }">
        <TableAction :actions="createActions(row)"/>
      </template>
      <template #imgUrl="{row}">
        <div class="!h-16 flex flex-col items-center justify-center">
          <div v-if="row.imgUrl">
            <Image :src="row.imgUrl" class="w-full !h-16 object-contain" />
          </div>
          <span v-else class="">暂无图片</span>
        </div>
      </template>
    </BasicTable>

    <SystemInfoModal ref="systemInfoModalRef" @success="handleSuccess"/>
  </Page>
</template>
<script lang="ts" setup>
import {ref} from 'vue';
import type {Recordable} from '@vben/types';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import {PerEnum} from "#/enums/perEnum";
import {getPagerModel, deleteSystemById} from '#/api/base/systemInfo';
import { Button, message, Image} from 'ant-design-vue';
import {columns, searchFormSchema} from './systemInfo.data';
import SystemInfoModal from './SystemInfoModal.vue';
import {TableAction} from '#/components/table-action';
import {useVbenVxeGrid} from "#/adapter/vxe-table";
import {Page} from "@vben/common-ui";

const PerPrefix = "SystemInfo:";
const systemInfoModalRef = ref();

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

const gridOptions: VxeGridProps = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns,
  rowConfig: {
    isHover: true
  },
  columnConfig: {resizable: true},
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  showOverflow: false,
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        return await getPagerModel({
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

function createActions(record: Recordable<any>) {
  return [
    {
      auth: [PerPrefix + PerEnum.UPDATE],
      tooltip: '修改',
      icon: 'ant-design:form-outlined',
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
        okButtonProps: {danger: true},
      },
    },
  ];
}

function handleCreate() {
  systemInfoModalRef.value.setData();
  systemInfoModalRef.value.open();
  systemInfoModalRef.value.setState({
    title: '创建'
  });
}

function handleEdit(record: Recordable<any>) {
  systemInfoModalRef.value.setData(record);
  systemInfoModalRef.value.open();
  systemInfoModalRef.value.setState({
    title: '编辑'
  });
}

async function handleDelete(record: Recordable<any>) {
  const {success, msg} = await deleteSystemById([record.id]);
  if (success) {
    message.success(msg);
    tableApi.reload();
  }
}

function handleSuccess() {
  tableApi.reload();
}

</script>
