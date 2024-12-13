<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <Authority :value="'PlatformConfig:' + PerEnum.ADD">
          <a-button type="primary" @click="handleCreate">新增</a-button>
        </Authority>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'PlatformConfig:' + PerEnum.UPDATE,
                tooltip: '修改',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                auth: 'PlatformConfig:' + PerEnum.DELETE,
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
        <template v-else-if="column.key === 'appKey'">
          <a @click="doCopyContent(record.appKey)"><CopyOutlined /></a>
          {{ record.appKey }}
        </template>

        <template v-else-if="column.key === 'appSecret'">
          <a @click="doCopyContent(record.appSecret)"><CopyOutlined /></a>
          {{ record.appSecret }}
        </template>
        <template v-else-if="column.key === 'agentId'">
          <a @click="doCopyContent(record.agentId)"><CopyOutlined /></a>
          {{ record.agentId }}
        </template>
        <template v-else-if="column.key === 'corpId'">
          <a @click="doCopyContent(record.corpId)"><CopyOutlined /></a>
          {{ record.corpId }}
        </template>
      </template>
    </BasicTable>
    <PlatformConfigModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { PerEnum } from '@/enums/perEnum';
  import { Authority } from '@/components/Authority';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getPlatformConfigListByPage, deleteByIds } from '#/api/base/platformConfig';
  import PlatformConfigModal from './PlatformConfigModal.vue';
  import { columns, searchFormSchema } from './platformConfig.data';
  import { useModal } from '@/components/Modal';
  import { copyText } from '@/utils/copyTextToClipboard';
  import { CopyOutlined } from '@ant-design/icons-vue';

  const [registerModal, { openModal, setModalProps }] = useModal();

  const [registerTable, { reload }] = useTable({
    title: '列表',
    api: getPlatformConfigListByPage,
    columns,
    formConfig: {
      labelWidth: 100,
      schemas: searchFormSchema,
      showAdvancedButton: false,
      showResetButton: false,
      autoSubmitOnEnter: true,
    },
    canColDrag: true,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: true,
    actionColumn: {
      width: 140,
      title: '操作',
      dataIndex: 'action',
    },
  });

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
    setModalProps({
      width: 600,
    });
  }

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
    setModalProps({
      width: 600,
    });
  }

  function handleDelete(record: Recordable) {
    deleteByIds([record.id]).then(() => {
      reload();
    });
  }

  function handleSuccess() {
    setTimeout(() => {
      reload();
    }, 200);
  }

  function handleCloseFunc() {
    setTimeout(() => {
      reload();
    }, 200);
    return Promise.resolve(true);
  }

  function doCopyContent(content) {
    copyText(content);
  }
</script>
