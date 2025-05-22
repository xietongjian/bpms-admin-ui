<script lang="ts" setup>
import {ref} from 'vue';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import type {Recordable} from '@vben/types';

import {Page} from '@vben/common-ui';
import {Button, Tag, Space, Avatar, message} from 'ant-design-vue';
import {useVbenVxeGrid} from '#/adapter/vxe-table';
import {getAccountPageList, deleteByIds} from '#/api/privilege/account';
import {columns, searchFormSchema} from './account.data';
import {UserOutlined} from '@ant-design/icons-vue';
import AccountModal from './account-modal.vue';
import PasswordModal from './PasswordModal.vue';
import SetGroupModal from './SetGroupModal.vue';
import {PerEnum} from "#/enums/perEnum";
import {TableAction} from '#/components/table-action';
import {EmpInfo} from "#/views/components/EmpInfo";

const passwordModalRef = ref(), setGroupModalRef = ref(),accountModalRef = ref();

const PerPrefix = 'Account:';

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  actionWrapperClass: 'col-span-2 col-start-2 text-left ml-2',
  resetButtonOptions: {
    show: false,
  },
  schema: searchFormSchema,
};

const gridOptions: VxeGridProps<any> = {
  columns,
  showOverflow: false,
  columnConfig: {resizable: true},
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        return await getAccountPageList({
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
  accountModalRef.value.setData({});
  accountModalRef.value.open();
  accountModalRef.value.setState({
    title: '新建'
  });
}

function handleEdit(record: any) {
  accountModalRef.value.setData(record);
  accountModalRef.value.open();
  accountModalRef.value.setState({
    title: '修改'
  });
}

async function handleDelete(record: any) {
  try {
    const result = await deleteByIds([record.id]);
    const {success, msg} = result;
    if (success) {
      message.success(msg);
      await tableApi.reload();
    } else {
      message.error(msg);
    }
  } catch (e) {
    message.error(e.message);
  }
}

function createActions(record: any) {
  return [
    {
      auth: [PerPrefix + PerEnum.AUTH],
      tooltip: '分配组',
      icon: 'ant-design:usergroup-add',
      onClick: handleSetGroup.bind(null, record),
    },
    {
      auth: [PerPrefix + PerEnum.UPDATE],
      tooltip: '设置密码',
      icon: 'ant-design:setting-outlined',
      onClick: handleSetPassword.bind(null, record),
    },
    {
      auth: [PerPrefix + PerEnum.UPDATE],
      tooltip: '修改',
      icon: 'clarity:note-edit-line',
      onClick: handleEdit.bind(null, record),
    },
    {
      auth: [PerPrefix + PerEnum.DELETE],
      tooltip: '删除',
      icon: 'ant-design:delete-outlined',
      danger: true,
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, record),
        placement: 'left',
        okButtonProps: { danger: true },
      },
    },
  ];
}

function handleSetPassword(record: Recordable<any>) {
  passwordModalRef.value.setData(record);
  passwordModalRef.value.open();
  passwordModalRef.value.setState({
    title: `给账号【${record.realName}(${record.username})】设置密码`
  });
}

function handleSetGroup(record: Recordable<any>) {
  setGroupModalRef.value.setData(record);
  setGroupModalRef.value.open();
  setGroupModalRef.value.setState({
    title: '给账号【' + record.realName + '(' + record.username + ')】设置组'
  });
}

function handlePasswordSuccess() {
  tableApi.reload();
}

function handleSetGroupSuccess() {
  handlePasswordSuccess();
}

function previewImageHandle(headImg) {
  if (headImg) {
    previewImage.value = headImg;
    previewImageVisible.value = true;
  }
}
</script>

<template>
  <Page auto-content-height>
    <BasicTable table-title="列表">
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix+PerEnum.ADD" type="primary" @click="handleAdd">新建</Button>
      </template>
      <template #image="{ row }">
        <Avatar :src="row.image" @click="previewImageHandle(row.image)">
          <template #icon>
            <UserOutlined/>
          </template>
        </Avatar>
      </template>

      <template #groups="{ row }">
        <div class="max-h-50 overflow-y-auto" v-if="row.groups">
          <Tag class="my-1" color="green" v-for="item in row.groups">
            {{ item.name }}
          </Tag>
        </div>
      </template>
      <template #sex="{ row }">
        <Tag v-if="~~row.sex === 1" color="#10AEFF">男</Tag>
        <Tag v-else color="#FB7373">女</Tag>
      </template>
      <template #type="{ row }">
        <Tag v-if="~~row.type === 1" color="#10AEFF">管理员</Tag>
        <Tag v-else>普通用户</Tag>
      </template>

      <template #action="{row}">
        <TableAction :actions="createActions(row)"/>
      </template>

    </BasicTable>
    <AccountModal ref="accountModalRef" @onSuccess="tableApi.reload()"/>
    <PasswordModal ref="passwordModalRef" @success="handlePasswordSuccess"/>
    <SetGroupModal ref="setGroupModalRef" @success="handleSetGroupSuccess"/>
  </Page>
</template>
