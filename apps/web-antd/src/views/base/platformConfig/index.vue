<template>
  <Page auto-content-height>
    <BasicTable>
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix + PerEnum.ADD" type="primary" @click="handleCreate">新增</Button>
      </template>

      <template #action="{ row }">
        <TableAction :actions="createActions(row)" />
      </template>

      <template #appKey="{ row }">
        <a @click="doCopyContent(row.appKey)">
          <CopyOutlined/>
        </a>
        {{ row.appKey }}
      </template>

      <template #appSecret="{ row }">
        <a @click="doCopyContent(row.appSecret)">
          <CopyOutlined/>
        </a>
        {{ row.appSecret }}
      </template>

      <template #agentId="{ row }">
        <a @click="doCopyContent(row.agentId)">
          <CopyOutlined/>
        </a>
        {{ row.agentId }}
      </template>

      <template #corpId="{ row }">
        <a @click="doCopyContent(row.corpId)">
          <CopyOutlined/>
        </a>
        {{ row.corpId }}
      </template>
      <template #type="{row}">
        <Tag class="text-green-500" v-if="row.type === 'weixin'">微信</Tag>
        <Tag class="text-lime-500" v-if="row.type === 'feishu'">飞书</Tag>
        <Tag class="text-blue-500" v-if="row.type === 'dingtalk'">钉钉</Tag>
      </template>
    </BasicTable>
    <PlatformConfigModal ref="platformConfigModalRef" @success="handleSuccess"/>
  </Page>
</template>
<script lang="ts" setup>
import {ref} from 'vue';

import type {Recordable} from '@vben/types';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import {PerEnum} from "#/enums/perEnum";
import {Button, Tag, message} from 'ant-design-vue';
import {TableAction} from '#/components/table-action';
import {Page} from '@vben/common-ui';
import {getPlatformConfigListByPage, deleteByIds} from '#/api/base/platformConfig';
import PlatformConfigModal from './PlatformConfigModal.vue';
import {columns, searchFormSchema} from './platformConfig.data';
import {CopyOutlined} from '@ant-design/icons-vue';
import {useVbenVxeGrid} from "#/adapter/vxe-table";
import { useClipboard } from '@vueuse/core';

const { copy } = useClipboard({ legacy: true });
const PerPrefix = "PlatformConfig:";
const platformConfigModalRef = ref();

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  wrapperClass: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  actionWrapperClass: 'pl-2 !justify-end md:!justify-start',
  actionPosition: 'left',
  actionLayout: 'inline',
  resetButtonOptions: {
    show: false,
  },
  schema: searchFormSchema,
};

const gridOptions: VxeGridProps = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns,
  columnConfig: {resizable: true},
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        return await getPlatformConfigListByPage({
          query: {
            pageNum: page.currentPage,
            pageSize: page.pageSize,
          },
          entity: formValues || {},
        });
      },
    },
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

function createActions(record: Recordable<any>) {
  return [
    {
      auth: [PerPrefix + PerEnum.UPDATE],
      tooltip: '修改',
      icon: 'ant-design:form-outlined',
      onClick: handleEdit.bind(null, record),
    },
    {
      auth: [PerPrefix + PerEnum.DELETE],
      tooltip: '删除',
      icon: 'ant-design:delete-outlined',
      danger: true,
      popConfirm: {
        placement: 'left',
        title: '是否确认删除',
        confirm: handleDelete.bind(null, record),
        okButtonProps: {
          danger: true,
        }
      },
    },
  ];
}

function handleCreate() {
  platformConfigModalRef.value.setData({});
  platformConfigModalRef.value.open();
  platformConfigModalRef.value.setState({
    title: '新建'
  });
}

function handleEdit(record: Recordable<any>) {
  platformConfigModalRef.value.setData(record);
  platformConfigModalRef.value.open();
  platformConfigModalRef.value.setState({
    title: '编辑'
  });
}

async function handleDelete(record: Recordable<any>) {
  const {success, msg} = await deleteByIds([record.id]);
  if(success) {
    message.success(msg);
    tableApi.reload();
  } else {
    message.error(msg);
  }
  return Promise.resolve(true);
}

function handleSuccess() {
  setTimeout(() => {
    tableApi.reload();
  }, 200);
}
async function doCopyContent(content: string) {
  await copy(content);
  message.success('已拷贝到剪切板！');
}
</script>
