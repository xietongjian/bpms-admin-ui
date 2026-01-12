<template>
  <BasicModal class="w-[800px]">
    <BasicTable @register="registerTable" class="m-0">
      <template v-if="isUpdate" #toolbar>
        <Authority :value="'Group:' + PerEnum.DELETE">
          <PopConfirmButton :disabled="batchDeleteBtnDisabled" :title="`确定要批量移除已选用户吗？`" @confirm="handleBatchDeleteUser" type="error" >
            批量移除
          </PopConfirmButton>
        </Authority>
        <Authority :value="'Group:' + PerEnum.ADD">
          <a-button type="primary" @click="handleAddUser"> 添加 </a-button>
        </Authority>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="isUpdate && column.key === 'action'">
          <TableAction
              :actions="[
              {
                auth: 'Group:' + PerEnum.DELETE,
                tooltip: '移除',
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认移除',
                  confirm: handleDelete.bind(null, record),
                  placement: 'left',
                  okButtonProps: {
                    danger: true
                  }
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <SetAccountModal ref="setAccountModalRef"/>
  </BasicModal>
</template>
<script lang="ts" setup>
  import {ref, computed, unref, defineEmits} from 'vue';
  import type {VbenFormProps} from '@vben/common-ui';
  import type { VxeGridProps } from '#/adapter/vxe-table';
  import {message} from 'ant-design-vue';
  import {useVbenModal} from '@vben/common-ui';
  import {
    groupUserListColumns,
    searchGroupAccountListFormSchema,
  } from './group.data';
  import {addUserGroups, delGroupUsers, getGroupListByPage, getUserGroupVoListByPager} from '#/api/privilege/group';
  import {PerEnum} from '#/enums/perEnum';
  import SetAccountModal from './SetAccountModal.vue';
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
        const values = modalApi.getData<Record<string, any>>();
        currentGroup.value = values;
        // if (values) {
        //   formApi.setValues(values);
        //   modalApi.setState({loading: false, confirmLoading: false});
        // }
      }
    },
    onConfirm() {
      // handleSubmit();
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
    schema: searchGroupAccountListFormSchema,
  };

  const gridOptions: VxeGridProps = {
    columns: groupUserListColumns,
    columnConfig: {resizable: true},
    showOverflow: false,
    height: 'auto',
    keepSource: true,
    border: false,
    stripe: true,
    proxyConfig: {
      ajax: {
        query: async ({page}, formValues) => {
          formValues.groupId = currentGroup.value.id;
          return getUserGroupVoListByPager({
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

  const [registerTable, {reload, getSelectRows, setSelectedRows}] = useTable({
    title: '列表',
    size: 'small',
    scroll: {y: 350},
    api: getUserGroupVoListByPager,
    columns: groupUserListColumns,
    formConfig: {
      labelWidth: 120,
      schemas: searchGroupAccountListFormSchema,
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
    },
    immediate: false,
    actionColumn: {
      width: 160,
      title: '操作',
      dataIndex: 'action',
    },
    beforeFetch: (values) => {
      setSelectedRows([]);
      values.groupId = currentGroup.value.id;
      return values;
    },
  });

  const batchDeleteBtnDisabled = computed(() => {
    return getSelectRows().length <= 0;
  });

  function handleAddUser() {
    openSetAccountModal(true, {
      isUpdate: false,
      record: currentGroup.value
    });
    setAccountModalProps({
      width: 900,
      title: '添加人员',
      showOkBtn: true,
      okText: '批量保存',
      centered: true,
    });
  }

  const [registerModal, {setModalProps, closeModal}] = useModalInner(async (data) => {
    setModalProps({
      confirmLoading: false,
      title: '查看【' + data.record.name + '(' + data.record.sn + ')】已分配的用户',
    });
    isUpdate.value = data.isUpdate;

    currentGroup.value = data.record;
    reload();
  });

  let getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));

  function handleSetAccountSuccess(){
    reload();
  }

  function handleDelete(record: any) {
    delGroupUsers({groupId: record.groupId, idList: [record.id]}).then((res) => {
      reload();
    });
  }

  async function handleBatchDeleteUser() {
    const selectedRows = getSelectRows();
    if(selectedRows && selectedRows.length > 0){
      const idList = selectedRows.map(item => item.id);
      return delGroupUsers({groupId: currentGroup.value.id, idList}).then((res) => {
        reload();
        return Promise.resolve();
      });
    } else {
      createMessage.warning('请选择要移除的用户');
      return Promise.resolve();
    }
  }
</script>
