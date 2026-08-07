<script lang="ts" setup>
import { ref } from 'vue';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';

import { Page } from '@vben/common-ui';
import { Button, message, Tag } from 'ant-design-vue';

import { PerEnum } from '#/enums/perEnum';
import { useVbenVxeGrid, VbenTableAction } from '#/adapter/vxe-table';

import {
  deleteAccountByIdsApi,
  getAccountPageListApi,
} from '#/api/front/account';
import { columns, searchFormSchema } from './account.data';
import AccountModal from './AccountModal.vue';
import PasswordModal from './PasswordModal.vue';

const PerPrefix = 'FrontAccount:';

const accountModalRef = ref();
const passwordModalRef = ref();

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  showResetButton: false,
  schema: [
    {
      component: 'Input',
      fieldName: 'keyword',
      label: '关键字',
      componentProps: { placeholder: '请输入账号名/姓名/手机' },
    },
  ],
};

const gridOptions: VxeGridProps = {
  columns,
  toolbarConfig: {
    buttons: [
      {
        code: `${PerPrefix}${PerEnum.ADD}`,
        component: Button,
        props: { type: 'primary' },
        content: '新增',
        action: handleAdd,
      },
    ],
  },
  proxyConfig: {
    ajax: {
      query: async ({ page, formValues }) => {
        const res = await getAccountPageListApi({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...(formValues || {}),
        });
        return res;
      },
    },
  },
  rowConfig: { keyField: 'id' },
};

const [BasicTable, tableApi] = useVbenVxeGrid({ formOptions, gridOptions });

function handleAdd() {
  accountModalRef.value?.setData({});
  accountModalRef.value?.open();
  accountModalRef.value?.setState({ title: '新增', isUpdate: false });
}

function handleEdit(record: any) {
  accountModalRef.value?.setData({ record, isUpdate: true });
  accountModalRef.value?.open();
  accountModalRef.value?.setState({ title: '修改', isUpdate: true });
}

function handleSetPassword(record: any) {
  passwordModalRef.value?.setData({ record, isUpdate: true });
  passwordModalRef.value?.open();
  passwordModalRef.value?.setState({
    title: `给账号【${record.name}(${record.username})】设置密码`,
    isUpdate: true,
  });
}

async function handleDelete(record: any) {
  await deleteAccountByIdsApi([record.id]);
  message.success('删除成功');
  tableApi.reload();
}

function handleSuccess() {
  tableApi.reload();
}
</script>

<template>
  <Page>
    <BasicTable>
      <template #action="{ row }">
        <VbenTableAction
          :items="[
            {
              auth: `${PerPrefix}${PerEnum.UPDATE}`,
              label: '设置密码',
              icon: 'ant-design:setting-outlined',
              onClick: () => handleSetPassword(row),
            },
            {
              auth: `${PerPrefix}${PerEnum.UPDATE}`,
              label: '修改',
              icon: 'clarity:note-edit-line',
              onClick: () => handleEdit(row),
            },
            {
              auth: `${PerPrefix}${PerEnum.DELETE}`,
              label: '删除',
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                placement: 'left',
                okButtonProps: { danger: true },
              },
              onClick: () => handleDelete(row),
            },
          ]"
          :row="row"
        />
      </template>

      <template #enabled="{ row }">
        <Tag :color="row.enabled ? 'success' : 'error'">
          {{ row.enabled ? '启用' : '禁用' }}
        </Tag>
      </template>

      <template #accountNonExpired="{ row }">
        <Tag :color="row.accountNonExpired ? 'success' : 'error'">
          {{ row.accountNonExpired ? '未过期' : '已过期' }}
        </Tag>
      </template>

      <template #accountNonLocked="{ row }">
        <Tag :color="row.accountNonLocked ? 'success' : 'error'">
          {{ row.accountNonLocked ? '未锁定' : '已锁定' }}
        </Tag>
      </template>

      <template #credentialsNonExpired="{ row }">
        <Tag :color="row.credentialsNonExpired ? 'success' : 'error'">
          {{ row.credentialsNonExpired ? '未过期' : '已过期' }}
        </Tag>
      </template>
    </BasicTable>

    <AccountModal ref="accountModalRef" @success="handleSuccess" />
    <PasswordModal ref="passwordModalRef" />
  </Page>
</template>
