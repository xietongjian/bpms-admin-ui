<script lang="ts" setup>
import type { VbenFormProps, VxeGridProps } from '#/adapter';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, Card, message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter';
import {getAppListByPage} from '#/api/base/app';
import AppForm from './app-form.vue';

const [AppModal, dragModalApi] = useVbenModal({
  connectedComponent: AppForm,
  centered: true,
});


interface RowType {
  category: string;
  color: string;
  id: string;
  price: string;
  productName: string;
  releaseDate: string;
}

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  commonConfig: {
    labelWidth: 60,
  },
  schema: [
    {
      component: 'Input',
      fieldName: 'keyword',
      label: '关键字',
    },
  ],
};

const gridOptions: VxeGridProps<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { field: 'name',  align: 'left', title: '名称'},
    { field: 'sn', title: '标识' },
    { field: 'url', title: 'URL' },
    { field: 'indexUrl', title: '首页地址' },
    { field: 'status', title: '状态', width: 100  },
    { field: 'platformEnabled', title: '推送状态', width: 100  },
    { field: 'orderNo', title: '排序', width: 100  },
    { field: 'note', title: '备注' },
  ],
  height: 'auto',
  keepSource: true,
  border: false,
  pagerConfig: {
  },
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await getAppListByPage({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        }).then(res => {
          res.items = res.rows;
          return Promise.resolve(res);
        });
      },
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });

function openDragModal() {
  dragModalApi.open();
  dragModalApi.setState({
    title: '新建应用'
  });
}

</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-tools>
        <Button type="primary" @click="openDragModal">
          新建
        </Button>
      </template>
    </Grid>
  </Page>
  <AppModal />
</template>
