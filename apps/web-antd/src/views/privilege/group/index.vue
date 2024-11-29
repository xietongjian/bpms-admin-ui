<script lang="ts" setup>
import {ref} from 'vue';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import {Page, useVbenModal} from '@vben/common-ui';
import {Button, Space, Image, Tag, message} from 'ant-design-vue';
import {useVbenVxeGrid} from '#/adapter/vxe-table';
import {getGroupListByPage, deleteByIds} from '#/api/privilege/group';
import {TableAction} from '#/components/table-action';
import type {Recordable} from '@vben/types';
import groupModal from './group-modal.vue';
import { useAccess } from '@vben/access';

import {columns, searchFormSchema} from "./group.data";
import SetAclModal from './SetAclModal.vue';
import SetAccountModal from './SetAccountModal.vue';

import {PerEnum} from "#/enums/perEnum";

const PerPrefix = "Group:";
const setAccountModalRef = ref();
const setAclModalRef = ref();
const { hasAccessByCodes } = useAccess();

const [GroupModal, modalApi] = useVbenModal({
  connectedComponent: groupModal,
  centered: true,
});

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
  schema: searchFormSchema(),
};

const gridOptions: VxeGridProps<any> = {
  columns,
  columnConfig: {resizable: true},
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        return getGroupListByPage({
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


function handleAcl(record: Recordable) {
  openSetAclModal(true, {
    record,
    isUpdate: true,
  });
  setModalProps({
    title: '给组【' + record.name + '(' + record.sn + ')】设置权限',
    width: 900,
    showOkBtn: false,
    cancelText: '关闭',
    centered: true,
    minHeight: 400,
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
function handleAddUser(record: Recordable) {
  openSetAccountModal(true, {
    record,
    isUpdate: true,
  });
  setAccountModalProps({
    width: 700,
  });
}
function createActions(record: Recordable): any[] {
  return [
    {
      auth: [PerPrefix + PerEnum.AUTH],
      tooltip: '分配权限',
      icon: 'ant-design:safety',
      onClick: handleAcl.bind(null, record),
    },
    {
      auth: [PerPrefix + PerEnum.AUTH],
      tooltip: '分配用户',
      icon: 'ant-design:usergroup-add',
      onClick: handleAddUser.bind(null, record),
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
      },
    },
  ];
}
function handleSetAccountSuccess() {
  setTimeout(() => {
    reload();
  }, 200);
}
</script>

<template>
  <Page auto-content-height>
    <BasicTable table-title="列表">
      <template #toolbar-tools>
        <Space>
          <Button v-if="hasAccessByCodes[PerPrefix + PerEnum.ADD]" type="primary" @click="handleAdd">新建</Button>
        </Space>
      </template>

      <template #action="{record}">
        <TableAction
            :actions="createActions(record)"
        />
      </template>

      <template #image="{ row }">
        <Image :src="row.image" class="w-[20px] h-[20px]" :height="40" :width="40"/>
      </template>

      <template #status="{ row }">
        <Tag v-if="row.status===1" color="green">启用</Tag>
        <Tag v-else color="red">禁用</Tag>
      </template>

      <template #users="{ row }">
        <div v-if="row.users">
          <Tag v-for="item in row.users" :key="item.id" color="green">
            {{ item.realName }}
          </Tag>
        </div>
        <Tag v-else>-</Tag>
      </template>
    </BasicTable>
    <GroupModal @onSuccess="tableApi.reload()"/>
    <SetAccountModal ref="setAccountModalRef" @success="handleSetAccountSuccess" />
    <SetAclModal ref="setAclModalRef" />
  </Page>
</template>

<!--
<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <Authority :value="'Group:' + PerEnum.ADD">
          <a-button type="primary" @click="handleCreate"> 新增</a-button>
        </Authority>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'Group:' + PerEnum.AUTH,
                tooltip: '分配权限',
                icon: 'ant-design:safety',
                onClick: handleAcl.bind(null, record),
              },
              {
                auth: 'Group:' + PerEnum.AUTH,
                tooltip: '分配用户',
                icon: 'ant-design:usergroup-add',
                onClick: handleAddUser.bind(null, record),
              },
              {
                auth: 'Group:' + PerEnum.UPDATE,
                tooltip: '修改',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                auth: 'Group:' + PerEnum.DELETE,
                tooltip: '删除',
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  confirm: handleDelete.bind(null, record),
                  placement: 'left',
                },
              },
            ]"
          />
        </template>
        <template v-if="column.key === 'users'">
          <Space>
            <Tag color="green" v-for="item in record.users">
              {{ item.realName }}
            </Tag>
          </Space>
        </template>
      </template>
    </BasicTable>

    <GroupModal @register="registerModal" @success="handleSuccess" />
    <SetAccountModal @register="registerSetAccountModal" @success="handleSetAccountSuccess" />
    <SetAclModal @register="registerSetAclModal" />
  </div>
</template>
<script lang="ts" setup>
  import { defineOptions } from 'vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getGroupListByPage, deleteByIds } from '@/api/privilege/group';
  import { Tag, Space } from 'ant-design-vue';
  import { columns, searchFormSchema } from './group.data';
  import GroupModal from './group-modal.vue';
  import SetAccountModal from './SetAccountModal.vue';
  import SetAclModal from './SetAclModal.vue';

  import { useModal } from '@/components/Modal';
  import { Authority } from '@/components/Authority';
  import { PerEnum } from '@/enums/perEnum';

  defineOptions({
    name: 'Group',
  });

  const [registerModal, { openModal }] = useModal();
  const [
    registerSetAccountModal,
    { openModal: openSetAccountModal, setModalProps: setAccountModalProps },
  ] = useModal();
  const [registerSetAclModal, { openModal: openSetAclModal, setModalProps }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '列表',
    api: getGroupListByPage,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      showAdvancedButton: false,
      showResetButton: false,
      autoSubmitOnEnter: true,
    },
    canColDrag: true,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: false,
    rowSelection: false,
    actionColumn: {
      width: 160,
      title: '操作',
      dataIndex: 'action',
    },
  });

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleAcl(record: Recordable) {
    openSetAclModal(true, {
      record,
      isUpdate: true,
    });
    setModalProps({
      title: '给组【' + record.name + '(' + record.sn + ')】设置权限',
      width: 900,
      showOkBtn: false,
      cancelText: '关闭',
      centered: true,
      minHeight: 400,
    });
  }

  function handleAddUser(record: Recordable) {
    openSetAccountModal(true, {
      record,
      isUpdate: true,
    });
    setAccountModalProps({
      width: 700,
    });
  }

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleDelete(record: Recordable) {
    deleteByIds([record.id]).then((res) => {
      reload();
    });
  }

  function handleSuccess() {
    setTimeout(() => {
      reload();
    }, 200);
  }

  function handleSetAccountSuccess() {
    setTimeout(() => {
      reload();
    }, 200);
  }

  function handleSetAclSuccess() {
    setTimeout(() => {
      reload();
    }, 300);
  }
</script>
-->
