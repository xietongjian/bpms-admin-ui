<template>
  <Page auto-content-height contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              tooltip: '添加子体系',
              icon: 'ant-design:plus-outlined',
              onClick: handleCreateChild.bind(null, record),
            },
            {
              tooltip: '修改',
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              tooltip: '删除',
              icon: 'ant-design:delete-outlined',
              color: 'error',
              onClick: (e) => {
                e.stopPropagation();
              },
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <FlowProcessModal @register="registerModal" @success="handleSuccess" />
  </Page>
</template>
<script lang="ts" setup>
  import { nextTick } from 'vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getFlowProcess, deleteByIds } from '#/api/bpm/flowprocess';
  import {Page} from '@vben/common-ui';
  import { columns } from './flowprocess.data';
  import FlowProcessModal from './FlowProcessModal.vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useModal } from '@/components/Modal';

  const { createMessage } = useMessage();

  const [registerModal, { openModal, setModalProps }] = useModal();
  const [registerTable, { reload, expandAll }] = useTable({
    title: '流程体系列表',
    api: getFlowProcess,
    columns,
    isTreeTable: true,
    formConfig: {
      labelWidth: 120,
      showAdvancedButton: false,
      showResetButton: false,
      autoSubmitOnEnter: false,
    },
    expandRowByClick: true,
    canColDrag: true,
    useSearchForm: false,
    pagination: false,
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: false,
    },
  });
  nextTick(() => {
    setTimeout(() => {
      expandAll();
    }, 1000);
  });

  function handleCreate() {
    setModalProps({ title: '新增流程体系' });
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable, e) {
    e.stopPropagation();
    setModalProps({ title: '修改流程体系' });
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleCreateChild(record: Recordable, e) {
    e.stopPropagation();
    setModalProps({ title: '新增【' + record.name + '】的子体系' });
    record = { pid: record.id };
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleDelete(record: Recordable) {
    if (record.children && record.children.length > 0) {
      message.warning('有子节点，不能删除！');
      return;
    }
    deleteByIds([record.id]).then((res) => {
      reload();
    });
  }

  function doSearch() {
    reload();
  }

  async function handleSuccess() {
    await reload();
    setTimeout(() => {
      expandAll();
    }, 100);
  }
</script>
