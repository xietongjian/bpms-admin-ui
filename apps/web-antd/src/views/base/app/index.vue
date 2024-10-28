<script lang="ts" setup>
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import {Page, useVbenModal} from '@vben/common-ui';
import {Button, Image, Tag} from 'ant-design-vue';
import {useVbenVxeGrid} from '#/adapter/vxe-table';
import {getAppListByPage} from '#/api/base/app';
import AppInputModal from './AppInputModal.vue';
import {AccessControl} from '@vben/access';
import {listColumns, searchFormSchema} from "#/views/base/app/app.data";
import {PerEnum} from "#/enums/perEnum";

const [AppModal, modalApi] = useVbenModal({
  connectedComponent: AppInputModal,
  centered: true,
});

interface RowType {
  id: string;
  name: string;
  sn: string;
  url: string;
  indexUrl: string;
  orderNo: number;
  status: 1 | 0;
  platformEnabled: 1 | 0;
  note: string;
}

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  actionWrapperClass: 'col-span-2 col-start-2 text-left ml-4',
  resetButtonOptions: {
    show: false,
  },
  schema: searchFormSchema,
};

const gridOptions: VxeGridProps<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: listColumns,
  columnConfig: {resizable: true},
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  pagerConfig: {
    autoHidden: true,
  },
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        return await getAppListByPage({
          query: {
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

const [Grid, gridApi] = useVbenVxeGrid({formOptions, gridOptions});

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
    <Grid table-title="列表">
      <template #toolbar-tools>
        <AccessControl :codes="['App:'+PerEnum.ADD]" type="code">
          <Button type="primary" @click="handleAdd">新建</Button>
        </AccessControl>
      </template>

      <template #action="{row}">
        <AccessControl :codes="['App:'+PerEnum.UPDATE]" type="code">
          <Button type="link" @click="handleEdit(row)">编辑</Button>
        </AccessControl>
      </template>

      <template #image="{ row }">
        <Image :src="row.image" height="30" width="30"/>
      </template>

      <template #status="{ row }">
        <Tag v-if="row.status===1" color="green">启用</Tag>
        <Tag v-else color="red">禁用</Tag>
      </template>

      <template #platformEnabled="{ row }">
        <Tag v-if="row.platformEnabled===1" color="green">开启</Tag>
        <Tag v-else>关闭</Tag>
      </template>
    </Grid>
    <AppModal @onSuccess="gridApi.reload()"/>
  </Page>
</template>
