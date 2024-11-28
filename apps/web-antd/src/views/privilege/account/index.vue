<script lang="ts" setup>
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import {Page, useVbenModal} from '@vben/common-ui';
import {Button, Image, Tag, Tooltip, Popconfirm, message} from 'ant-design-vue';
import {useVbenVxeGrid} from '#/adapter/vxe-table';
import { getAccountPageList, deleteByIds } from '#/api/privilege/account';

import accountModal from './account-modal.vue';
// import AppSecretKeyModal from './app-secret-key-modal.vue';
import {AccessControl} from '@vben/access';
import {listColumns, searchFormSchema} from "#/views/base/app/app.data";
import {PerEnum} from "#/enums/perEnum";
import {
  SquareEditOutline,
  DeleteOutline,
  CloudSecurityOutline,
  QuestionMarkCircleOutline,
} from '@vben/icons';

const [AccountModal, modalApi] = useVbenModal({
  connectedComponent: accountModal,
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
  schema: searchFormSchema,
};

const gridOptions: VxeGridProps<any> = {
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
        <Image :src="row.image" class="w-[20px] h-[20px]" :height="40" :width="40"/>
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
    <AccountModal @onSuccess="tableApi.reload()"/>
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
