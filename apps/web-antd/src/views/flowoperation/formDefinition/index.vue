<script lang="ts" setup>
import { ref } from 'vue';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';
import { Page } from '@vben/common-ui';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { pageList as formPageList } from '#/api/form/customForm';

const formOptions: VbenFormProps = {
  showCollapseButton: false, submitOnEnter: true, commonConfig: { labelWidth: 60 },
  wrapperClass: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3', actionWrapperClass: 'pl-2',
  schema: [
    { component: 'Input', fieldName: 'keyword', label: '关键字', componentProps: { placeholder: '请输入表单名称', allowClear: true } },
  ],
};

const gridOptions: VxeGridProps = {
  columns: [
    { type: 'seq', width: 60, align: 'center' },
    { field: 'name', title: '表单名称', align: 'left', minWidth: 200 },
    { field: 'code', title: '表单编码', align: 'left', width: 150 },
    { field: 'version', title: '版本号', align: 'center', width: 100 },
    { field: 'updateTime', title: '更新时间', width: 180, align: 'center' },
  ],
  columnConfig: { resizable: true }, height: 'auto', keepSource: true, border: false, stripe: true, showOverflow: false,
  proxyConfig: { ajax: { query: async ({ page }, formValues) => {
    return await formPageList({ query: { pageNum: page.currentPage, pageSize: page.pageSize }, entity: formValues || {} });
  } } },
};

const [BasicTable] = useVbenVxeGrid({ formOptions, gridOptions });
</script>

<template>
  <Page auto-content-height>
    <BasicTable table-title="表单定义" />
  </Page>
</template>
