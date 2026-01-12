<template>
  <BasicModal>
    <BasicTable>
      <template #toolbar-tools>
      </template>
      <template #action="{ row }">
        <TableAction
            :actions="[
              {
                auth: 'Group:' + PerEnum.ADD,
                tooltip: row.added ? '已添加' : '选择',
                icon: 'ant-design:plus-outlined',
                onClick: handleAdd.bind(null, row),
                disabled: row.added,
              },
            ]"
        />
      </template>
      <template #image="{ row }">
        <Avatar :src="row.image">
          <template #icon>
            <UserOutlined/>
          </template>
        </Avatar>
      </template>
      <template #type="{ row }">
        <Tag v-if="~~row.type === 1" color="#10AEFF">管理员</Tag>
        <Tag v-else>普通用户</Tag>
      </template>
    </BasicTable>
  </BasicModal>
</template>
<script lang="ts" setup>
import {defineEmits, defineExpose, ref} from 'vue';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import {columns, searchFormSchema, setAccountFormSchema} from './group.data';
import {addUserGroups, getGroupListByPage} from '#/api/privilege/group';
import {useVbenForm} from "#/adapter/form";
import {useVbenModal} from '@vben/common-ui';
import {TableAction} from '#/components/table-action';

import {
  accountListColumns,
  searchUserFormSchema,
} from './group.data';
import {getAccountPageList, getAllList} from '#/api/privilege/account';
import {addGroupUsers, getUserGroupByGroupIdAndUserIdList} from '#/api/privilege/group';
import {PerEnum} from "#/enums/perEnum";
import {Avatar, Tag, message} from "ant-design-vue";
import {UserOutlined} from "@ant-design/icons-vue";
import {useVbenVxeGrid} from "#/adapter/vxe-table";


const emit = defineEmits(['success', 'register']);

const isUpdate = ref(true);
const currentGroup = ref<any>(null);


const [BasicModal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      modalApi.setState({loading: true, confirmLoading: true});

      const values = modalApi.getData<Record<string, any>>();
      if (values) {
        // const users = values.users?.map(item => {
        //   return item.id
        // });

        // setTimeout(() => {
        //   formApi.setValues({...values, users});
        //   modalApi.setState({loading: false, confirmLoading: false});
        // }, 500)
      }
    }
  },
  onConfirm() {
    // await baseFormApi.submitForm();
    handleSubmit();
  },
});

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
  schema: searchUserFormSchema,
};

const gridOptions: VxeGridProps = {
  columns: accountListColumns,
  columnConfig: {resizable: true},
  showOverflow: false,
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        return getAccountPageList({
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


/*const [registerTable, { reload, getForm, getSelectRows, setSelectedRows }] = useTable({
  title: '用户列表',
  size: 'small',
  scroll: {y: 350},
  api: getAccountPageList,
  columns: accountListColumns,
  formConfig: {
    labelWidth: 120,
    schemas: searchUserFormSchema,
    showAdvancedButton: false,
    showResetButton: false,
    autoSubmitOnEnter: true,
  },
  canColDrag: true,
  useSearchForm: true,
  bordered: true,
  showIndexColumn: false,
  rowSelection: {
    type: 'checkbox',
    onChange: () => {
      const noAdded = getSelectRows().filter(item => !item.added);
      setModalProps({
        okButtonProps: {
          disabled: noAdded <= 0,
        }
      });
    },
    getCheckboxProps: (record) => {
      return {
        disabled: record.disabled,
      };
    }
  },
  immediate: false,
  actionColumn: {
    width: 160,
    title: '操作',
    dataIndex: 'action',
  },
  afterFetch: async (data) => {
    setSelectedRows([]);
    if(data){
      const userIdList = [];
      data.forEach(item => {
        item.added = true;
        userIdList.push(item.id);
      });
      let addedUsers = [];
      // 渲染已添加的数据
      const groupUsers = await getUserGroupByGroupIdAndUserIdList({groupId: currentGroup.value.id, userIdList});
      if(groupUsers){
        addedUsers = groupUsers.map(item => item.userId);
      }
      data.forEach(item => {
        const disabled = addedUsers.includes(item.id);
        item.added = disabled;
        item.disabled = disabled;

      });
    }
  },
});*/

function handleCreate() {
  // openModal(true, {
  //   isUpdate: false,
  // });
}

function handleOpenChange() {
  emit('success')
}

const [registerModal, {setModalProps, closeModal}] = useModalInner(async (data) => {
  setModalProps({
    confirmLoading: false,
    title: '给组【' + data.record.name + '(' + data.record.sn + ')】添加用户',
  });
  currentGroup.value = data.record;
  reload();
});

async function handleSubmit() {
  const selectedRows = getSelectRows();
  if (selectedRows && selectedRows.length > 0) {
    try {
      setModalProps({confirmLoading: true, loading: true});
      const users = selectedRows.map(item => {
        return {id: item.id, userNo: item.userNo};
      })
      const {success, msg} = await addGroupUsers({groupId: currentGroup.value.id, users});
      if (success) {
        selectedRows.forEach(item => {
          item.added = true;
        })
        message.success(msg);
        setSelectedRows([]);
      } else {
        message.error(msg);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setModalProps({confirmLoading: false, loading: false});
    }
  } else {
    message.warning('请选择用户');
  }
}

async function handleAdd(record: Recordable) {
  if (currentGroup.value) {
    try {
      setModalProps({confirmLoading: true, loading: true});
      await addGroupUsers({groupId: currentGroup.value.id, users: [{id: record.id, userNo: record.userNo}]}).then(res => {
        if (res.success) {
          record.added = true;
          message.success(res.msg);
        } else {
          message.error(res.msg);
        }
      });
    } catch (e) {
      console.error(e);
    } finally {
      setModalProps({confirmLoading: false, loading: false});
    }
  } else {
    message.error('未知的角色！');
  }
}
defineExpose(modalApi)
</script>
