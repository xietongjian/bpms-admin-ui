<script lang="ts" setup>
import { ref } from 'vue';
import type { Recordable } from '@vben/types';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';
import { Page } from '@vben/common-ui';
import { Button, Tag, message } from 'ant-design-vue';
import { PerEnum } from '#/enums/perEnum';
import { useVbenVxeGrid, VbenTableAction } from '#/adapter/vxe-table';
import { columns, searchFormSchema } from './bizLibrary.data';
import BizLibraryModal from './BizLibraryModal.vue';
import { deleteSystemById, getPagerModel } from '#/api/base/systemInfo';

const PerPrefix = 'SystemInfo:';

const bizLibraryModalRef = ref();

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  resetButtonOptions: {
    show: false,
  },
  schema: searchFormSchema,
  wrapperClass: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  actionWrapperClass: 'pl-2 !justify-end md:!justify-start',
  actionPosition: 'left',
  actionLayout: 'inline',
};

const gridOptions: VxeGridProps = {
  columns,
  columnConfig: { resizable: true },
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  showOverflow: false,
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await getPagerModel({
          pageIndex: page.currentPage - 1,
          pageSize: page.pageSize,
          entity: formValues || {},
        });
      },
    },
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({ formOptions, gridOptions });

function handleAdd() {
  bizLibraryModalRef.value.setData({});
  bizLibraryModalRef.value.open();
  bizLibraryModalRef.value.setState({
    title: '新增',
  });
}

function handleEdit(record: any) {
  bizLibraryModalRef.value.setData(record);
  bizLibraryModalRef.value.open();
  bizLibraryModalRef.value.setState({
    title: '修改',
  });
}

async function handleDelete(record: Recordable<any>) {
  try {
    const result = await deleteSystemById([record.id]);
    const { success, msg } = result;
    if (success) {
      message.success(msg);
      await tableApi.reload();
    } else {
      message.error(msg);
    }
  } catch (e: any) {
    message.error(e?.message || '删除失败');
  }
}

function createActions(row: Recordable<any>) {
  return [
    {
      auth: [PerPrefix + PerEnum.UPDATE],
      text: '修改',
      icon: 'ant-design:form-outlined',
      onClick: handleEdit.bind(null, row),
    },
    {
      auth: [PerPrefix + PerEnum.DELETE],
      text: '删除',
      icon: 'ant-design:delete-outlined',
      danger: true,
      popConfirm: {
        title: '确定删除吗？',
        confirm: handleDelete.bind(null, row),
        okText: '确定',
        cancelText: '取消',
      },
    },
  ];
}

function handleSuccess() {
  tableApi.reload();
}
</script>

<template>
  <Page auto-content-height>
    <BasicTable table-title="业务库管理">
      <template #toolbar-tools>
        <Button
          v-access:code="PerPrefix + PerEnum.ADD"
          type="primary"
          @click="handleAdd"
        >
          新增
        </Button>
      </template>

      <template #status="{ row }">
        <Tag v-if="row.status === 1" color="green">启用</Tag>
        <Tag v-else color="red">禁用</Tag>
      </template>

      <template #action="{ row }">
        <VbenTableAction align="center" :actions="createActions(row)" />
      </template>
    </BasicTable>
    <BizLibraryModal ref="bizLibraryModalRef" @onSuccess="handleSuccess" />
  </Page>
</template>
