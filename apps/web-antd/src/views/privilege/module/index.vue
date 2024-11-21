<script lang="ts" setup>
import {nextTick} from 'vue';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import {Page, useVbenModal} from '@vben/common-ui';
import {Button, Image, Tag, Tooltip, Popconfirm, message} from 'ant-design-vue';
import {useVbenVxeGrid} from '#/adapter/vxe-table';
// import {deleteByIds, getAppListByPage} from '#/api/base/app';
import { getModules } from '#/api/privilege/module';
// import AppInputModal from './AppInputModal.vue';
// import AppSecretKeyModal from './AppSecretKeyModal.vue';
import {AccessControl} from '@vben/access';
import {listColumns, searchFormSchema} from "#/views/privilege/module/module.data";
import {PerEnum} from "#/enums/perEnum";
import { IconifyIcon } from '@vben/icons';

import {
  SquareEditOutline,
  DeleteOutline,
  CloudSecurityOutline,
  QuestionMarkCircleOutline,
} from '@vben/icons';

// const [AppModal, modalApi] = useVbenModal({
//   connectedComponent: AppInputModal,
//   centered: true,
// });
//
// const [SecretKeyModal, secretKeyModalApi] = useVbenModal({
//   connectedComponent: AppSecretKeyModal,
//   centered: true,
//   showConfirmButton	: false,
// });

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

const gridOptions: VxeGridProps = {
  /*checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },*/
  columns: listColumns,
  columnConfig: {resizable: true},
  height: 'auto',
  keepSource: true,
  border: false,
  pagerConfig: {
    enabled: false,
  },
  rowConfig: {
    keyField: 'id',
  },
  treeConfig: {
    parentField: 'pid',
    rowField: 'id',
    transform: true,
  },
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        const resp = await getModules({
          ...formValues,
        })
        return { items: resp };
      },
      // 默认请求接口后展开全部 不需要可以删除这段
      querySuccess: () => {
        nextTick(() => {
          expandAll();
        });
      },
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({formOptions, gridOptions});

function expandAll() {
  gridApi.grid?.setAllTreeExpand(true);
}

function handleAdd() {
  /*modalApi.setData({});
  modalApi.open();
  modalApi.setState({
    title: '新建'
  });*/
}

function handleEdit(record: any) {
  /*modalApi.setData(record);
  modalApi.open();
  modalApi.setState({
    title: '修改'
  });*/
}

function handleViewSecretKey(record: any) {
  /*secretKeyModalApi.setData(record);
  secretKeyModalApi.open();
  secretKeyModalApi.setState({
    title: '查看密钥',
  });*/
}

async function handleDelete(record: any) {
  try {
    /*const result = await deleteByIds([record.id]);
    const {success, msg} = result;
    if (success) {
      message.success(msg);
      await gridApi.reload();
    } else{
      message.error(msg);
    }*/
  } catch (e) {
    message.error(e);
  }
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
          <Tooltip title="编辑">
            <Button type="link" @click="handleEdit(row)">
              <template #icon>
                <SquareEditOutline class="size-4 mx-auto"/>
              </template>
            </Button>
          </Tooltip>
        </AccessControl>

        <AccessControl :codes="['App:'+PerEnum.UPDATE]" type="code">
          <Tooltip title="密钥">
            <Button type="link" @click="handleViewSecretKey(row)">
              <template #icon>
                <CloudSecurityOutline class="size-4 mx-auto"/>
              </template>
            </Button>
          </Tooltip>
        </AccessControl>

        <AccessControl :codes="['App:'+PerEnum.UPDATE]" type="code">
          <Popconfirm placement="left" title="确定要删除吗？" @confirm="handleDelete(row)" :ok-button-props="{danger: true}">
            <template #title >
              <div class="w-32">
                确定要删除吗？
              </div>
            </template>
            <template #icon>
              <QuestionMarkCircleOutline class="text-red-500 size-6"/>
            </template>
            <Button type="link" danger>
              <template #icon>
                <DeleteOutline class="size-4 mx-auto"/>
              </template>
            </Button>
          </Popconfirm>
        </AccessControl>
      </template>

      <template #name="{ row }">
        <div class="flex flex-row items-center gap-1">
          <IconifyIcon :icon="row.image || 'ant-design:ellipsis-outlined'" class="size-5" height="20" width="20"/>
          <span>{{row.name}}</span>
        </div>
      </template>
      <template #pvs="{ row }">
        <div class="flex flex-row items-center gap-1">
          <Tag v-for="item in row.pvs" :key="item.id" color="green">{{item.name}}</Tag>
        </div>
      </template>

      <template #status="{ row }">
        <Tag v-if="row.status===1" color="green">启用</Tag>
        <Tag v-else color="red">禁用</Tag>
      </template>

      <template #showStatus="{ row }">
        <Tag v-if="row.showStatus===1" color="green">开启</Tag>
        <Tag v-else>关闭</Tag>
      </template>
    </Grid>
<!--    <AppModal @onSuccess="gridApi.reload()"/>
    <SecretKeyModal @onSuccess="gridApi.reload()"/>-->
  </Page>
</template>
