<script lang="ts" setup>
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import {Page, useVbenModal} from '@vben/common-ui';
import {Button, Image, Tag, Tooltip, Popconfirm, message} from 'ant-design-vue';
import {useVbenVxeGrid} from '#/adapter/vxe-table';
import {deleteByIds, getAppListByPage} from '#/api/base/app';
import AppInputModal from './AppInputModal.vue';
import AppSecretKeyModal from './AppSecretKeyModal.vue';
import {AccessControl} from '@vben/access';
import {listColumns, searchFormSchema} from "#/views/base/app/app.data";
import {PerEnum} from "#/enums/perEnum";
import {
  SquareEditOutline,
  DeleteOutline,
  CloudSecurityOutline,
  QuestionMarkCircleOutline,
} from '@vben/icons';

const [AppModal, modalApi] = useVbenModal({
  connectedComponent: AppInputModal,
  centered: true,
});

const [SecretKeyModal, secretKeyModalApi] = useVbenModal({
  connectedComponent: AppSecretKeyModal,
  centered: true,
  showConfirmButton	: false,
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
          return Promise.resolve(res);
        });
      },
    },
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

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

function handleViewSecretKey(record: any) {
  secretKeyModalApi.setData(record);
  secretKeyModalApi.open();
  secretKeyModalApi.setState({
    title: '查看密钥',
  });
}

async function handleDelete(record: any) {
  try {
    const result = await deleteByIds([record.id]);
    const {success, msg} = result;
    if (success) {
      message.success(msg);
      await tableApi.reload();
    } else{
      message.error(msg);
    }
  } catch (e) {
    message.error(e.message);
  }
}
</script>

<template>
  <Page auto-content-height>
    <BasicTable table-title="列表">
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
          <Popconfirm @confirm="handleDelete(row)" :ok-button-props="{danger: true}">
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
    </BasicTable>
    <AppModal @onSuccess="tableApi.reload()"/>
    <SecretKeyModal @onSuccess="tableApi.reload()"/>
  </Page>
</template>
