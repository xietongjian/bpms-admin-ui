<script lang="ts" setup>
import { ref } from 'vue';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';
import { Page } from '@vben/common-ui';
import { Tag } from 'ant-design-vue';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { columns } from './data';
import { getFrontNoticePagerList } from '#/api/portal/cms/notice';
import { getAllNoticeCategory } from '#/api/portal/cms/noticeCategory';
import NoticePreviewModal from '#/views/dashboard/workbench/components/NoticePreviewModal.vue';

const noticePreviewModalRef = ref<any>();

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
      component: 'Select',
      fieldName: 'categoryId',
      label: '分类',
      componentProps: {
        placeholder: '请选择分类',
        options: async () => {
          const categories = await getAllNoticeCategory({});
          const opts = categories.map((item: any) => ({
            label: item.name,
            value: item.id,
          }));
          opts.unshift({ label: '全部', value: '' });
          return opts;
        },
        allowClear: true,
      },
    },
    {
      component: 'Input',
      fieldName: 'keyword',
      label: '关键字',
      componentProps: {
        placeholder: '请输入标题关键字',
        allowClear: true,
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'dateRange',
      label: '发布时间',
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
        return await getFrontNoticePagerList({
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

function openPreview(record: any) {
  noticePreviewModalRef.value?.setData({ id: record.id });
  noticePreviewModalRef.value?.open();
}
</script>

<template>
  <Page auto-content-height>
    <BasicTable table-title="公告列表">
      <template #title="{ row }">
        <div class="flex items-center gap-2 cursor-pointer" @click="openPreview(row)">
          <Tag v-if="row.categoryName" color="blue">{{ row.categoryName }}</Tag>
          <span class="text-gray-400 text-xs">{{ row.noticeNo }}</span>
          <span class="text-blue-500 hover:text-blue-600 hover:underline">
            {{ row.title }}
          </span>
        </div>
      </template>
    </BasicTable>
    <NoticePreviewModal ref="noticePreviewModalRef" />
  </Page>
</template>
