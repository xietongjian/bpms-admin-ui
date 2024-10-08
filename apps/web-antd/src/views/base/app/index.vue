<script lang="ts" setup>
import type { VbenFormProps, VxeGridProps } from '#/adapter';
import { Page, useVbenModal } from '@vben/common-ui';
import { Button, Card, message } from 'ant-design-vue';
import { useVbenVxeGrid } from '#/adapter';
import {getAppListByPage} from '#/api/base/app';
import AppForm from './app-form.vue';

const [AppModal, modalApi] = useVbenModal({
  connectedComponent: AppForm,
  centered: true,
  onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      gridApi.reload();
    }
  },
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
    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: '操作',
      width: 120,
    },
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
          query:{
            pageNum: page.currentPage,
            pageSize: page.pageSize,
          },
          entity: formValues || {},
        }).then(res => {
          res.items = res.rows;
          return Promise.resolve(res);
        });
      },
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });

function handleAdd() {
  modalApi.setData({});
  modalApi.open();
  modalApi.setState({
    title: '新建'
  });
}
function handleEdit(record: any) {
  modalApi.setData(record);
  modalApi.open();
  modalApi.setState({
    title: '修改'
  });
}

</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-tools>
        <Button type="primary" @click="handleAdd">
          新建
        </Button>
      </template>
      <template #action="{row}">
        <Button type="link" @click="handleEdit(row)">编辑</Button>
      </template>
    </Grid>
  </Page>
  <AppModal />
</template>
