<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';
import { Page } from '@vben/common-ui';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getApiList } from '#/api/base/apiInfo';

const formOptions: VbenFormProps = {
  showCollapseButton: false, submitOnEnter: true, commonConfig: { labelWidth: 60 },
  wrapperClass: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3', actionWrapperClass: 'pl-2',
  schema: [
    { component: 'Input', fieldName: 'keyword', label: '关键字', componentProps: { placeholder: '请输入关键字', allowClear: true } },
  ],
};

const gridOptions: VxeGridProps = {
  columns: [
    { type: 'seq', width: 60, align: 'center' },
    { field: 'name', title: '接口名称', align: 'left', minWidth: 200 },
    { field: 'url', title: '接口地址', align: 'left', minWidth: 250 },
    { field: 'method', title: '请求方式', align: 'center', width: 100 },
    { field: 'moduleName', title: '所属模块', align: 'left', width: 150 },
    { field: 'createTime', title: '创建时间', width: 180, align: 'center' },
  ],
  columnConfig: { resizable: true }, height: 'auto', keepSource: true, border: false, stripe: true, showOverflow: false,
  proxyConfig: { ajax: { query: async ({ page }, formValues) => {
    const params: any = { ...formValues, pageSize: page.pageSize, pageNum: page.currentPage };
    return await getApiList(params);
  } } },
};

const [BasicTable] = useVbenVxeGrid({ formOptions, gridOptions });
</script>

<template>
  <Page auto-content-height>
    <BasicTable table-title="接口文档管理" />
  </Page>
</template>
