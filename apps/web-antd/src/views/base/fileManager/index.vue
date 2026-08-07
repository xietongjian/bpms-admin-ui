<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { Recordable } from '@vben/types';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';
import { Page } from '@vben/common-ui';
import { Button, Modal, Tag, message } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import { PerEnum } from '#/enums/perEnum';
import { useVbenVxeGrid, VbenTableAction } from '#/adapter/vxe-table';
import { columns, searchFormSchema } from './fileManager.data';
import { batchDeleteFileByIdList, deleteFileById, getFlowFileList } from '#/api/base/fileManager';
import { downloadFile } from '#/api/sys/download';

const PerPrefix = 'FileManager:';

// 选中的 key
const selectedRowKeys = ref<string[]>([]);
const selectedRows = ref<Recordable[]>([]);

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 90,
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
  checkboxConfig: {
    highlight: true,
    labelField: 'fileName',
  },
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        const { uploadTime, ...restParams } = formValues || {};
        const params: any = {
          pageIndex: page.currentPage - 1,
          pageSize: page.pageSize,
          entity: { ...restParams },
        };
        if (uploadTime && uploadTime.length === 2) {
          params.entity.uploadTimeStart = uploadTime[0];
          params.entity.uploadTimeEnd = uploadTime[1];
        }
        return await getFlowFileList(params);
      },
    },
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({ formOptions, gridOptions });

// 选择配置
const checkboxConfig = computed(() => ({
  checkMethod: ({ row }: { row: Recordable }) => true,
}));

function handleSelectionChange(params: { records: Recordable[]; reserves: Recordable[] }) {
  selectedRowKeys.value = params.records.map((item: any) => item.id);
  selectedRows.value = params.records;
}

function handleDownload(record: Recordable<any>) {
  downloadFile({
    path: record.filePath,
    name: record.fileName,
  });
}

async function handleDelete(record: Recordable<any>) {
  try {
    const result = await deleteFileById({ id: record.id });
    const { success, msg } = result;
    if (success) {
      message.success(msg || '删除成功！');
      await tableApi.reload();
    } else {
      message.error(msg);
    }
  } catch (e: any) {
    message.error(e?.message || '删除失败');
  }
}

function handleBatchDelete() {
  const ids = selectedRowKeys.value;
  if (ids.length === 0) {
    message.warning('请选择删除项');
    return;
  }
  Modal.confirm({
    title: '警告！',
    icon: createVNode(ExclamationCircleOutlined),
    content: '确定要删除选中项吗？',
    okText: '确定',
    cancelText: '取消',
    okButtonProps: {
      danger: true,
    },
    onOk() {
      return batchDeleteFileByIdList(ids).then((res: any) => {
        const { success, msg } = res || {};
        if (success) {
          message.success(msg || '删除成功！');
          selectedRowKeys.value = [];
          selectedRows.value = [];
          tableApi.reload();
        } else {
          message.error(msg);
        }
      });
    },
  });
}

function formatFileSize(size: number): string {
  if (!size) return '-';
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
}

function createActions(row: Recordable<any>) {
  return [
    {
      auth: [PerPrefix + PerEnum.QUERY],
      text: '下载',
      icon: 'ant-design:cloud-download-outlined',
      onClick: handleDownload.bind(null, row),
    },
    {
      auth: [PerPrefix + PerEnum.DELETE],
      text: '删除',
      icon: 'ant-design:delete-outlined',
      danger: true,
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, row),
        placement: 'left',
      },
    },
  ];
}
</script>

<template>
  <Page auto-content-height>
    <BasicTable
      table-title="文件管理列表"
      @checkbox-change="handleSelectionChange"
      @checkbox-all="handleSelectionChange"
    >
      <template #toolbar-tools>
        <Button
          v-access:code="PerPrefix + PerEnum.DELETE"
          danger
          @click="handleBatchDelete"
        >
          批量删除
        </Button>
      </template>

      <template #fileSize="{ row }">
        {{ formatFileSize(row.fileSize) }}
      </template>

      <template #fileStatus="{ row }">
        <Tag v-if="row.fileStatus === '0' || row.fileStatus === 0" color="green">
          正常
        </Tag>
        <Tag v-else color="red">删除</Tag>
      </template>

      <template #action="{ row }">
        <VbenTableAction align="center" :actions="createActions(row)" />
      </template>
    </BasicTable>
  </Page>
</template>
