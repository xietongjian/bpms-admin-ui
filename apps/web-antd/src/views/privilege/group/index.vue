<script lang="ts" setup>
import {ref} from 'vue';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import type {Recordable} from '@vben/types';
import {Page} from '@vben/common-ui';
import {Button, Space, Image, Tag, message, Popconfirm, TypographyLink} from 'ant-design-vue';
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
const groupAccountListModalRef = ref(), setAclModalRef = ref(), groupModalRef = ref();

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
  groupAccountListModalRef.value.setData({...record, isUpdate: true});
  groupAccountListModalRef.value.open();
  setAclModalRef.value.setState({
    title: '查看【' + record.name + '(' + record.sn + ')】已分配的用户'
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
      icon: 'ant-design:usergroup-add',
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

function handleViewUsers(record: Recordable<any>) {
  groupAccountListModalRef.value.setData({...record, isUpdate: false});
  groupAccountListModalRef.value.open();
  setAclModalRef.value.setState({
    title: '设置【' + record.name + '(' + record.sn + ')】的用户'
  });
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

      <template #users="{ row }">
        <TypographyLink href="javascript:void(0)"  @click="handleViewUsers(row)">
          查看用户
        </TypographyLink>
      </template>

      <template #status="{ row }">
        <Tag v-if="row.status===1" color="green">启用</Tag>
        <Tag v-else color="red">禁用</Tag>
      </template>
    </BasicTable>
    <GroupModal ref="groupModalRef" @onSuccess="tableApi.reload()"/>
<!--    <SetAccountModal ref="setAccountModalRef" @success="handleSetAccountSuccess" />-->
    <SetAclModal ref="setAclModalRef" />
    <GroupAccountListModal ref="groupAccountListModalRef" />
  </Page>
</template>
