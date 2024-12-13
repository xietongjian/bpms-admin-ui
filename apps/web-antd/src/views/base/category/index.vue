<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <Authority :value="'Category:' + PerEnum.ADD">
          <a-button type="primary" @click="handleCreate"> 新增</a-button>
        </Authority>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'Category:' + PerEnum.ADD,
                tooltip: '添加子分类',
                icon: 'ant-design:plus-outlined',
                onClick: handleCreateChild.bind(null, record),
              },
              {
                auth: 'Category:' + PerEnum.UPDATE,
                tooltip: '修改',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                auth: 'Category:' + PerEnum.DELETE,
                tooltip: '删除',
                icon: 'ant-design:delete-outlined',
                color: 'error',
                onClick: (e) => {
                  e.stopPropagation();
                },
                popConfirm: {
                  title: '是否确认删除',
                  confirm: handleDelete.bind(null, record),
                  placement: 'left',
                },
              },
            ]"
          />
        </template>
        <template v-else-if="column.key === 'cName'">
          {{ companiesMap[record.companyId]?.shortName }}
        </template>
      </template>
    </BasicTable>
    <CategoryModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { PerEnum } from '@/enums/perEnum';
  import { Authority } from '@/components/Authority';
  import { ref, onMounted } from 'vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getCategories, deleteByIds } from '#/api/base/category';
  import { columns, searchFormSchema } from './category.data';
  import CategoryModal from './CategoryModal.vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useModal } from '@/components/Modal';
  import { getCompanies } from '#/api/org/company';
  import { treeToList } from '@/utils/helper/treeHelper';

  const { createMessage } = useMessage();

  const companiesMap = ref([]);
  const [registerModal, { openModal, setModalProps }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '列表',
    api: getCategories,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      showAdvancedButton: false,
      showResetButton: false,
      autoSubmitOnEnter: true,
    },
    expandRowByClick: true,
    canColDrag: true,
    pagination: false,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      fixed: false,
    },
  });

  onMounted(() => {
    getCompanies().then((res) => {
      const data = treeToList(res);
      data.forEach((item) => {
        companiesMap.value[item.id] = item;
      });
    });
  });

  function handleCreate(e) {
    setModalProps({ title: '新增流程分类' });
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable, e) {
    e.stopPropagation();
    setModalProps({ title: '修改流程分类' });
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleCreateChild(record: Recordable, e) {
    e.stopPropagation();
    setModalProps({ title: '新增【' + record.name + '】的子分类' });
    record = {
      pid: record.id,
      frontShow: 1,
    };
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleDelete(record: Recordable, e) {
    e.stopPropagation();
    if (record.children && record.children.length > 0) {
      createMessage.warning('有子节点，不能删除！');
      return;
    }
    deleteByIds([record.id]).then((res) => {
      reload();
    });
  }

  function doSearch() {
    reload();
  }

  function handleSuccess() {
    setTimeout(() => {
      reload();
    }, 200);
  }
</script>
