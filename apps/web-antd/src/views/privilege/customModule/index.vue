<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <Authority :value="'Module:' + PerEnum.ADD">
          <a-button type="primary" @click="handleCreate"> 新增 </a-button>
        </Authority>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction :actions="createActions(record, column)" />
        </template>

        <template v-if="column.key === 'pvs'">
          <Space class="flex-wrap">
            <Tag color="processing" v-for="item of record.pvs">{{ item.name }}</Tag>
          </Space>
        </template>
      </template>
    </BasicTable>

    <ModuleModal @register="registerModal" @success="handleSuccess" />
    <PValueSettingModal @register="registerPValueModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { nextTick } from 'vue';
  import { BasicTable, useTable, TableAction, BasicColumn, ActionItem } from '@/components/Table';
  import { getModules, deleteByIds } from '@/api/privilege/module';
  import { useMessage } from '@/hooks/web/useMessage';
  import { columns, searchFormSchema } from './module.data';
  import ModuleModal from './ModuleModal.vue';
  import PValueSettingModal from './PValueSettingModal.vue';
  import { useModal } from '@/components/Modal';
  import { Authority } from '@/components/Authority';
  import { PerEnum } from '@/enums/perEnum';
  import { Tag, Space } from 'ant-design-vue';

  const { createMessage } = useMessage();

  const [registerModal, { openModal, setModalProps }] = useModal();
  const [registerPValueModal, { openModal: openPvalueModal }] = useModal();
  const [registerTable, { reload, expandAll }] = useTable({
    title: '列表',
    size: 'small',
    api: getModules,
    columns,
    isTreeTable: true,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      showAdvancedButton: false,
      showResetButton: false,
      autoSubmitOnEnter: true,
    },
    searchInfo: { menuType: 2 },
    canColDrag: false,
    useSearchForm: true,
    pagination: false,
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 170,
      title: '操作',
      dataIndex: 'action',
    },
  });

  function handleCreate(record: Recordable) {
    setModalProps({ title: '新增菜单', centered: true });
    openModal(true, {
      record,
      isUpdate: false,
    });
  }

  function handleCreateChild(record: Recordable, e) {
    e.stopPropagation();
    setModalProps({ title: '新增【' + record.name + '】的子菜单' });
    record = {
      pid: record.id,
      status: 1,
      showStatus: 1,
    };
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleEditPValue(record: Recordable, e) {
    e.stopPropagation();
    openPvalueModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleEdit(record: Recordable, e) {
    e.stopPropagation();
    setModalProps({ title: '修改菜单', centered: true });
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleDelete(record: Recordable) {
    if (record.children && record.children.length > 0) {
      createMessage.warning('有子节点，不能删除！');
      return;
    }
    deleteByIds([record.id]).then(() => {
      reload();
    });
  }

  async function handleSuccess() {
    setTimeout(() => {
      reload();
    }, 200);
  }

  function createActions(record: Recordable, column: BasicColumn): ActionItem[] {
    let actions: ActionItem[] = [
      {
        auth: 'Module:' + PerEnum.ADD,
        tooltip: '添加子菜单',
        icon: 'ant-design:plus-outlined',
        onClick: handleCreateChild.bind(null, record),
        ifShow: record.component === 'LAYOUT',
      },
      /*{
        auth: 'Module:' + PerEnum.AUTH,
        tooltip: '设置权限值',
        icon: 'ant-design:setting-outlined',
        onClick: handleEditPValue.bind(null, record),
      },*/
      {
        auth: 'Module:' + PerEnum.UPDATE,
        tooltip: '修改',
        icon: 'clarity:note-edit-line',
        onClick: handleEdit.bind(null, record),
      },
      {
        auth: 'Module:' + PerEnum.DELETE,
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
    ];
    return actions;
  }

  function onFetchSuccess() {
    // 演示默认展开所有表项
    nextTick(expandAll);
  }
</script>
