<script lang="ts" setup>
import { ref } from 'vue';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';
import { Page } from '@vben/common-ui';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { columns } from './data';
import { getFrontNewsPagerList } from '#/api/portal/cms/news';
import NewsPreviewModal from '#/views/dashboard/workbench/components/NewsPreviewModal.vue';

const newsPreviewModalRef = ref<any>();

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  wrapperClass: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  actionWrapperClass: 'pl-2',
  schema: [
    {
      component: 'Input',
      fieldName: 'keyword',
      label: '关键字',
      componentProps: {
        placeholder: '请输入名称/编码',
        allowClear: true,
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'dateRange',
      label: '时间范围',
      componentProps: {
        type: 'range',
        format: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD',
        style: { width: '100%' },
      },
    },
  ],
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
        const entity = { ...formValues };
        if (
          entity.dateRange &&
          Array.isArray(entity.dateRange) &&
          entity.dateRange.length === 2
        ) {
          const [start, end] = entity.dateRange;
          entity.publishTimeStart =
            typeof start === 'string' ? start.substring(0, 10) : start;
          entity.publishTimeEnd =
            typeof end === 'string' ? end.substring(0, 10) : end;
        }
        delete entity.dateRange;
        return await getFrontNewsPagerList({
          query: {
            pageNum: page.currentPage,
            pageSize: page.pageSize,
          },
          entity,
        });
      },
    },
  },
};

const [BasicTable] = useVbenVxeGrid({ formOptions, gridOptions });

function showNewsDetail(record: any) {
  newsPreviewModalRef.value?.setData({
    isTemp: false,
    record,
  });
  newsPreviewModalRef.value?.setState({
    title: `预览 - ${record.title}`,
  });
  newsPreviewModalRef.value?.open();
}
</script>

<template>
  <Page auto-content-height>
    <BasicTable table-title="新闻列表">
      <template #title="{ row }">
        <a class="text-blue-500 hover:text-blue-600 hover:underline cursor-pointer" @click="showNewsDetail(row)">
          {{ row.title }}
        </a>
      </template>
    </BasicTable>
    <NewsPreviewModal ref="newsPreviewModalRef" />
  </Page>
</template>
