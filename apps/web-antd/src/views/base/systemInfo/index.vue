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
        <template v-if="column.key === 'name'">
          <Space>
            <Avatar :src="record.imgUrl" class="w-[60px] h-[60px]">
              <template #icon>
                <UserOutlined />
              </template>
            </Avatar>
            <span>
              {{record.name}}
            </span>
          </Space>
        </template>
      </template>
    </BasicTable>

    <GroupModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { defineOptions } from 'vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getPagerModel, deleteSystemById } from '#/api/base/systemInfo';
  import { Tag, Avatar, Space } from 'ant-design-vue';
  import { columns, searchFormSchema } from './systemInfo.data';
  import GroupModal from './SystemInfoModal.vue';

  import { Authority } from '@/components/Authority';
  import { PerEnum } from '@/enums/perEnum';
  import {UserOutlined} from "@ant-design/icons-vue";

  defineOptions({
    name: 'SystemInfo',
  });

  const [registerModal, { openModal }] = useModal();

  const [registerTable, { reload }] = useTable({
    title: '列表',
    api: getPagerModel,
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

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleDelete(record: Recordable) {
    deleteSystemById([record.id]).then((res) => {
      reload();
    });
  }

  function handleSuccess() {
    setTimeout(() => {
      reload();
    }, 200);
  }

</script>
