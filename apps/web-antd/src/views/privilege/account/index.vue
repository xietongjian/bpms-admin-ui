<script lang="ts" setup>
import {ref} from 'vue';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import {Page, useVbenModal} from '@vben/common-ui';
import {Button, Image, Tag, Space, Avatar, Tooltip, Popconfirm, message} from 'ant-design-vue';
import {useVbenVxeGrid} from '#/adapter/vxe-table';
import {getAccountPageList, deleteByIds} from '#/api/privilege/account';
import type {Recordable} from '@vben/types';
import {columns, searchFormSchema} from './account.data';
import {UserOutlined} from '@ant-design/icons-vue';
import AccountModal from './account-modal.vue';
import PasswordModal from './PasswordModal.vue';
import SetGroupModal from './SetGroupModal.vue';
import {useAccess} from '@vben/access';
import {PerEnum} from "#/enums/perEnum";
import {TableAction} from '#/components/table-action';

const passwordModalRef = ref();
const setGroupModalRef = ref();
const accountModalRef = ref();
const {hasAccessByCodes} = useAccess();
const PerPrefix = 'Account:';

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

const gridOptions: VxeGridProps<any> = {
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
      color: 'error',
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, record),
        placement: 'left',
      },
    },
  ];
}

function handleSetPassword(record: Recordable) {
  passwordModalRef.value.setData(record);
  passwordModalRef.value.open();
}

function handleSetGroup(record: Recordable) {
  setGroupModalRef.value.setData(record);
  setGroupModalRef.value.open();
/*  openSetGroupModal(true, {
    record,
    isUpdate: true,
  });*/
}

function handlePasswordSuccess() {
  // reload();
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

function previewImageVisibleChange(visible, prevVisible) {
  previewImageVisible.value = visible;
}
</script>

<template>
  <Page auto-content-height>
    <BasicTable table-title="列表">
      <template #toolbar-tools>
        <Button v-if="hasAccessByCodes([PerPrefix+PerEnum.ADD])" type="primary" @click="handleAdd">新建</Button>
      </template>
      <template #image="{ row }">
        <Avatar :src="row.image" @click="previewImageHandle(row.image)">
          <template #icon>
            <UserOutlined/>
          </template>
        </Avatar>
      </template>

      <template #groups="{ row }">
        <Space>
          <Tag color="green" v-for="item in row.groups">
            {{ item.name }}
          </Tag>
        </Space>
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


<!--
<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <Authority :value="'Account:' + PerEnum.ADD">
          <a-button type="primary" @click="handleCreate"> 新增 </a-button>
        </Authority>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'Account:' + PerEnum.AUTH,
                tooltip: '分配组',
                icon: 'ant-design:usergroup-add',
                onClick: handleSetGroup.bind(null, record),
              },
              {
                auth: 'Account:' + PerEnum.UPDATE,
                tooltip: '设置密码',
                icon: 'ant-design:setting-outlined',
                onClick: handleSetPassword.bind(null, record),
              },
              {
                auth: 'Account:' + PerEnum.UPDATE,
                tooltip: '修改',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                auth: 'Account:' + PerEnum.DELETE,
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

        <template v-else-if="column.key === 'image'">
          <Avatar :src="record.image" @click="previewImageHandle(record.image)">
            <template #icon>
              <UserOutlined />
            </template>
          </Avatar>
        </template>

        <template v-else-if="column.key === 'groups'">
          <Space>
            <Tag color="green" v-for="item in record.groups">
              {{ item.name }}
            </Tag>
          </Space>
        </template>
        <template v-if="column.key === 'sex'">
          <Tag v-if="~~record.sex === 1" color="#10AEFF">男</Tag>
          <Tag v-else color="#FB7373">女</Tag>
        </template>
        <template v-if="column.key === 'type'">
          <Tag v-if="~~record.type === 1" color="#10AEFF">管理员</Tag>
          <Tag v-else >普通用户</Tag>
        </template>
      </template>
    </BasicTable>
    <div style="width: 0; height: 0; overflow: hidden">
      <Image
        :width="0"
        :height="0"
        :src="previewImage"
        :preview="{ visible: previewImageVisible, onVisibleChange: previewImageVisibleChange }"
      />
    </div>

    <AccountModal @register="registerModal" @success="handleSuccess" />
    <PasswordModal @register="registerPasswordModal" @success="handlePasswordSuccess" />
    <SetGroupModal @register="registerSetGroupModal" @success="handleSetGroupSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';

  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getAccountPageList, deleteByIds } from '@/api/privilege/account';
  import { UserOutlined } from '@ant-design/icons-vue';

  import { useModal } from '@/components/Modal';
  import AccountModal from './account-modal.vue';
  import PasswordModal from './PasswordModal.vue';
  import SetGroupModal from './SetGroupModal.vue';

  import { columns, searchFormSchema } from './account.data';
  import { Avatar, Image, Tag, Space } from 'ant-design-vue';
  import { Authority } from '@/components/Authority';
  import { PerEnum } from '@/enums/perEnum';

  const [registerModal, { openModal }] = useModal();
  const [registerPasswordModal, { openModal: openPasswordModal }] = useModal();
  const [registerSetGroupModal, { openModal: openSetGroupModal }] = useModal();

  const previewImage = ref<string>('');
  const previewImageVisible = ref<boolean>(false);

  const [registerTable, { reload }] = useTable({
    title: '列表',
    api: getAccountPageList,
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

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleSetPassword(record: Recordable) {
    openPasswordModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleSetGroup(record: Recordable) {
    openSetGroupModal(true, {
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

  function handlePasswordSuccess() {
    reload();
  }

  function handleSetGroupSuccess() {
    reload();
  }

  function previewImageHandle(headImg) {
    if (headImg) {
      previewImage.value = headImg;
      previewImageVisible.value = true;
    }
  }

  function previewImageVisibleChange(visible, prevVisible) {
    previewImageVisible.value = visible;
  }
</script>
-->
