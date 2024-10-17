<script lang="ts" setup>
import type { VxeGridListeners, VxeGridProps } from '#/adapter/vxe-table';
import type {
    VbenFormSchema as FormSchema,
    VbenFormProps,
} from '@vben/common-ui';
import { Page, useVbenModal } from '@vben/common-ui';
import {Button, Card, message, Tag} from 'ant-design-vue';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {getAppListByPage} from '#/api/base/app';
import AppForm from './app-form.vue';
import { AccessControl, useAccess } from '@vben/access';

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
  actionWrapperClass: 'col-span-2 col-start-2 text-left ml-4',
  resetButtonOptions:{
    show: false,
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
    { field: 'sn', align: 'left', title: '标识' },
    { field: 'url', align: 'left', title: 'URL' },
    { field: 'indexUrl', align: 'left', title: '首页地址' },
    { field: 'status', title: '状态', slots: { default: 'status' }, width: 100  },

    { field: 'platformEnabled', title: '开启平台推送', slots: { default: 'platformEnabled' }, width: 100  },
    { field: 'orderNo', align: 'right', title: '排序', width: 100  },
    { field: 'note', align: 'left', title: '备注' },
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
  stripe: true,
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
      <template #toolbar-actions>
        <AccessControl :codes="['App:1']" type="code">
          <Button class="mr-2" @click="handleAdd" type="primary">新建</Button>
        </AccessControl>
      </template>
<!--      <template #toolbar-tools>
        <Button type="primary" @click="handleAdd">
          新建
        </Button>
      </template>-->
      <template #action="{row}">
        <Button type="link" @click="handleEdit(row)">编辑</Button>
      </template>

      <template #status="{ row }">
        <Tag v-if="row.status===1" color="success">启用</Tag>
        <Tag v-else>禁用</Tag>
      </template>

      <template #platformEnabled="{ row }">
        <Tag v-if="row.platformEnabled===1" color="success">开启</Tag>
        <Tag v-else>关闭</Tag>
      </template>
    </Grid>
  </Page>
  <AppModal />
</template>
