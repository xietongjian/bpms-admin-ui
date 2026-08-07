<script lang="ts" setup>
import { ref, nextTick } from 'vue';
import type { Recordable } from '@vben/types';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';
import { Page } from '@vben/common-ui';
import { Button, message } from 'ant-design-vue';
import { PerEnum } from '#/enums/perEnum';
import { useVbenVxeGrid, VbenTableAction } from '#/adapter/vxe-table';
import { TableAction } from '#/components/table-action';
import { columns, searchFormSchema } from './serviceErrorLog.data';
import ErrorInfoModal from './ErrorInfoModal.vue';
import { BpmnPreviewModal } from '#/views/components/preview';
import { getPageList, tryAgain } from '#/api/flowoperation/serviceErrorLog';
import { getAll } from '#/api/base/app';

const PerPrefix = 'ServiceErrorLog:';

const errorInfoModalRef = ref();
const bpmnPreviewModalRef = ref();
const loadingRef = ref(false);
const modelKeyOptions = ref<string[]>([]);

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 80,
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
        const params: any = {
          pageIndex: page.currentPage - 1,
          pageSize: page.pageSize,
          entity: { ...formValues },
        };

        // 处理日期范围
        if (formValues?._dateRange && formValues._dateRange.length === 2) {
          params.entity.startTime = formValues._dateRange[0] + ' 00:00:00';
          params.entity.endTime = formValues._dateRange[1] + ' 23:59:59';
          delete params.entity._dateRange;
        }

        // 处理 modelKey
        if (params.entity.modelKey && params.entity.modelKey.length > 0) {
          const key = params.entity.modelKey[0]?.modelKey || params.entity.modelKey;
          if (typeof key === 'string') {
            params.entity.modelKey = key;
          }
        }

        return await getPageList(params);
      },
    },
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({ formOptions, gridOptions });

nextTick(() => {
  getAll().then((res) => {
    if (res && Array.isArray(res)) {
      modelKeyOptions.value = res.map((item: any) => item.id || item.sn);
    }
  });
});

function handleView(record: Recordable<any>) {
  errorInfoModalRef.value.setData(record);
  errorInfoModalRef.value.open();
  errorInfoModalRef.value.setState({
    title: '查看详情',
  });
}

async function handleTry(record: Recordable<any>) {
  try {
    const { msg, success } = await tryAgain({ id: record.id });
    if (success) {
      message.success(msg || '重新执行成功');
      tableApi.reload();
    } else {
      message.error(msg);
    }
  } catch (e: any) {
    message.error(e?.message || '重新执行失败');
  }
}

function handleProcess(record: Recordable<any>) {
  if (!record.processInstanceId) {
    message.error('流程Id不存在');
    return;
  }
  if (!record.modelKey) {
    message.error('modelKey不存在');
    return;
  }
  bpmnPreviewModalRef.value.setData({
    modelKey: record.modelKey,
    procInstId: record.processInstanceId,
  });
  bpmnPreviewModalRef.value.open();
  bpmnPreviewModalRef.value.setState({
    title: `预览-${record.processName}`,
    centered: true,
    showOkBtn: false,
    cancelText: '关闭',
  });
}

function createActions(row: Recordable<any>) {
  return [
    {
      icon: 'ant-design:redo-outlined',
      tooltip: '重新执行',
      color: 'error',
      popConfirm: {
        title: '是否确认重新执行',
        confirm: handleTry.bind(null, row),
      },
    },
    {
      icon: 'ant-design:file-search-outlined',
      tooltip: '查看详情',
      onClick: handleView.bind(null, row),
    },
    {
      icon: 'ant-design:partition-outlined',
      tooltip: '流程图预览',
      onClick: handleProcess.bind(null, row),
    },
  ];
}
</script>

<template>
  <Page auto-content-height>
    <BasicTable table-title="错误日志">
      <template #action="{ row }">
        <TableAction :actions="createActions(row)" />
      </template>
    </BasicTable>
    <ErrorInfoModal ref="errorInfoModalRef" />
    <BpmnPreviewModal ref="bpmnPreviewModalRef" />
  </Page>
</template>
