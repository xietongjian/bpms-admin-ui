<template>
  <BasicModal class="w-[800px]">
    <BasicTable class="m-0">
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
      <template #action="{ row }">
        <template v-if="isUpdate">
          <TableAction
              :actions="[
              {
                auth: 'Group:' + PerEnum.DELETE,
                tooltip: '移除',
                icon: 'ant-design:delete-outlined',
                danger: true,
                popConfirm: {
                  title: '是否确认移除',
                  confirm: handleDelete.bind(null, row),
                  placement: 'left',
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <SetAccountModal ref="setAccountModalRef" @success="reloadTable"/>
  </BasicModal>
</template>
<script lang="ts" setup>
  import {ref, computed, unref, defineEmits, defineExpose} from 'vue';
  import type {VbenFormProps} from '@vben/common-ui';
  import type { VxeGridProps } from '#/adapter/vxe-table';
  import {message} from 'ant-design-vue';
  import {useVbenModal} from '@vben/common-ui';
  import {
    groupUserListColumns,
    searchGroupAccountListFormSchema,
  } from './group.data';
  import {delGroupUsers, getUserGroupVoListByPager} from '#/api/privilege/group';
  import {PerEnum} from '#/enums/perEnum';
  import SetAccountModal from './SetAccountModal.vue';
  import {useVbenVxeGrid} from "#/adapter/vxe-table";

  const emit = defineEmits(['success']);

  const isUpdate = ref(true);
  const currentGroup = ref<any>(null);
  const setAccountModalRef = ref();

  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const data = modalApi.getData<Record<string, any>>() || {};
        isUpdate.value = data.isUpdate ?? true;
        currentGroup.value = data.record;

        if (data.record) {
          modalApi.setState({
            title: '查看【' + data.record.name + '(' + data.record.sn + ')】已分配的用户',
          });
        }
        // delay reload to ensure grid is mounted inside modal
        setTimeout(() => {
          tableApi.query();
        }, 100);
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
    checkboxConfig: {
      highlight: true,
      labelField: 'name',
    },
    columnConfig: {resizable: true},
    showOverflow: false,
    height: 'auto',
    keepSource: true,
    border: false,
    stripe: true,
    proxyConfig: {
      ajax: {
        query: async ({page}, formValues) => {
          if (!currentGroup.value?.id) {
            return { rows: [], total: 0 };
          }
          return getUserGroupVoListByPager({
            query: {
              pageNum: page.currentPage,
              pageSize: page.pageSize,
            },
            entity: { ...formValues, groupId: currentGroup.value.id } || {},
          });
        },
      },
    },
  };

  const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

  const batchDeleteBtnDisabled = computed(() => {
    const rows = tableApi.grid?.getCheckboxRecords?.() || [];
    return rows.length <= 0;
  });

  function reloadTable() {
    tableApi.query();
  }

  function handleAddUser() {
    setAccountModalRef.value.setData({
      groupId: currentGroup.value.id,
    });
    setAccountModalRef.value.open();
  }

  function handleDelete(record: any) {
    delGroupUsers({groupId: record.groupId, idList: [record.id]}).then(() => {
      reloadTable();
    });
  }

  async function handleBatchDeleteUser() {
    const selectedRows = tableApi.grid?.getCheckboxRecords?.() || [];
    if (selectedRows && selectedRows.length > 0) {
      const idList = selectedRows.map((item: any) => item.id);
      return delGroupUsers({groupId: currentGroup.value.id, idList}).then(() => {
        reloadTable();
        return Promise.resolve();
      });
    } else {
      message.warning('请选择要移除的用户');
      return Promise.resolve();
    }
  }

  defineExpose(modalApi);
</script>
