<script lang="ts" setup>
import {ref} from 'vue';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import type {Recordable} from '@vben/types';
import {Page} from '@vben/common-ui';
import {Button, Space, Image, Tag, message, Popconfirm} from 'ant-design-vue';
import {useVbenVxeGrid} from '#/adapter/vxe-table';
import {TableAction} from '#/components/table-action';
import {getGroupListByPage, deleteByIds} from '#/api/privilege/group';
import {EmpInfo} from '#/views/components/EmpInfo';
import GroupModal from './group-modal.vue';
import {columns, searchFormSchema} from "./group.data";
import SetAclModal from './SetAclModal.vue';
import SetAccountModal from './SetAccountModal.vue';
import {PerEnum} from "#/enums/perEnum";

const PerPrefix = "Group:";
const setAccountModalRef = ref(), setAclModalRef = ref(), groupModalRef = ref();

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  wrapperClass: 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
  actionWrapperClass: 'pl-2 !justify-end md:!justify-start',
  actionPosition: 'left',
  actionLayout: 'inline',
  resetButtonOptions: {
    show: false,
  },
  schema: searchFormSchema,
};

const gridOptions: VxeGridProps<any> = {
  columns,
  columnConfig: {resizable: true},
  showOverflow: false,
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
  groupModalRef.value.setData({});
  groupModalRef.value.open();
  groupModalRef.value.setState({
    title: '新建'
  });
}

function handleEdit(record: any) {
  groupModalRef.value.setData(record);
  groupModalRef.value.open();
  groupModalRef.value.setState({
    title: '修改'
  });
}


function handleAcl(record: Recordable<any>) {
  setAclModalRef.value.setData(record);
  setAclModalRef.value.open();
  setAclModalRef.value.setState({
    title: `给组【${ record.name }(${ record.sn })】设置权限`
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
    message.error(e);
  }
}
function handleAddUser(record: Recordable<any>) {
  setAccountModalRef.value.setData(record);
  setAccountModalRef.value.open();
  setAccountModalRef.value.setState({
    title: '给组【' + record.name + '(' + record.sn + ')】分配用户'
  });
}
function createActions(record: Recordable<any>): any[] {
  return [
    {
      auth: [PerPrefix + PerEnum.AUTH],
      tooltip: '分配权限',
      icon: 'ant-design:safety-certificate-outlined',
      onClick: handleAcl.bind(null, record),
    },
    {
      auth: [PerPrefix + PerEnum.AUTH],
      tooltip: '分配用户',
      icon: 'ant-design:user-add-outlined',
      onClick: handleAddUser.bind(null, record),
    },
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
        title: '是否确认删除',
        confirm: handleDelete.bind(null, record),
        placement: 'left',
        okButtonProps: {
          danger: true
        },
      },
    },
  ];
}
function handleSetAccountSuccess() {
  setTimeout(() => {
    tableApi.reload();
  }, 200);
}
function handleRemoveGroupUser(){

}

</script>

<template>
  <Page auto-content-height>
    <BasicTable table-title="用户组管理">
      <template #toolbar-tools>
        <Space>
          <Button v-access:code="PerPrefix + PerEnum.ADD" type="primary" @click="handleAdd">新建</Button>
        </Space>
      </template>

      <template #action="{ row }">
        <TableAction :actions="createActions(row)" />
      </template>

      <template #image="{ row }">
        <Image :src="row.image" class="w-[20px] h-[20px]" :height="40" :width="40"/>
      </template>

      <template #status="{ row }">
        <Tag v-if="row.status===1" color="green">启用</Tag>
        <Tag v-else color="red">禁用</Tag>
      </template>

      <template #users="{ row }">
        <div class="max-h-50 overflow-y-auto" v-if="row.users">
          <EmpInfo v-for="item in row.users" :no="item.username" :name="item.realName" >
            <Tag class="my-1" color="green">
              {{ item.realName }}
<!--              <template #closeIcon>
                <Popconfirm title="确定要移除该用户吗?" :okButtonProps="{danger: true}" @confirm="handleRemoveGroupUser(row, item)">
                  <CloseOutlined />
                </Popconfirm>
              </template>-->
            </Tag>
          </EmpInfo>
        </div>
        <span class="text-gray-500" v-else>未分配</span>
      </template>
    </BasicTable>
    <GroupModal ref="groupModalRef" @onSuccess="tableApi.reload()"/>
    <SetAccountModal ref="setAccountModalRef" @success="handleSetAccountSuccess" />
    <SetAclModal ref="setAclModalRef" />
  </Page>
</template>
