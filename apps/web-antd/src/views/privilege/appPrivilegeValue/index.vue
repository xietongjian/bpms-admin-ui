<template>
  <Page auto-content-height>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <Authority :value="'AppPrivilegeValue:' + PerEnum.ADD">
          <a-button type="primary" @click="handleCreate"> 新增 </a-button>
        </Authority>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'AppPrivilegeValue:' + PerEnum.UPDATE,
                tooltip: '修改',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                auth: 'AppPrivilegeValue:' + PerEnum.DELETE,
                tooltip: '删除',
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>

    <AppModal @register="registerModal" @success="handleSuccess" />
  </Page>
</template>
<script lang="ts" setup>
  import { defineOptions } from 'vue';

  import { PerEnum } from '#/enums/perEnum';

  import { columns } from './appPrivilegeValue.data';
  import AppModal from './app-privilege-value-modal.vue';
  import {AccessControl} from '@vben/access';
  import {useVbenVxeGrid, VxeGridProps} from "#/adapter/vxe-table";
  import {getAppPrivilegeValues, deleteByIds} from "#/api/privilege/appPrivilegeValue";
  import type {VbenFormProps} from '@vben/common-ui';
  import {Page, useVbenModal} from '@vben/common-ui';

  defineOptions({
    name: 'AppPrivilegeValue',
  });

  const [registerModal, { openModal }] = useModal();


  const gridOptions: VxeGridProps<any> = {
    checkboxConfig: {
      highlight: true,
      labelField: 'name',
    },
    columns,
    columnConfig: {resizable: true},
    pagerConfig: {
      enabled: false
    },
    height: 'auto',
    keepSource: true,
    border: false,
    stripe: true,
    proxyConfig: {
      ajax: {
        query: async ({page}, formValues) => {
          return await getAppPrivilegeValues({
            entity: formValues || {},
          });
        },
      },
    },
  };

  const [BasicTable, tableApi] = useVbenVxeGrid({gridOptions});

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

  function handleDelete(record: Recordable) {
    debugger;
    deleteByIds([record.id]).then((res) => {
      console.log(res);
      reload();
    });
    console.log(record);
  }

  function handleSuccess() {
    setTimeout(() => {
      reload();
    }, 200);
  }
</script>
