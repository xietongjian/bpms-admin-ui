<script lang="ts" setup>
  import { PerEnum } from '#/enums/perEnum';
  import {AccessControl} from '@vben/access';
  import { ref, unref } from 'vue';
  import type { Recordable } from '@vben/types';
  import {Button} from 'ant-design-vue';
  import {useVbenVxeGrid, type VxeGridProps} from '#/adapter/vxe-table';
  import { deleteByIds, getDepts } from '#/api/org/dept';
  import CompanyTree from '#/views/components/leftTree/CompanyTree.vue';
  import { message } from 'ant-design-vue';
  // import { useModal } from '@/components/Modal';
  import DeptModal from './DeptModal.vue';
  // import SplitPane from '@/views/components/splitPane/index.vue';
  import { columns, searchFormSchema } from './dept.data';
  import { EmpInfo } from '#/views/components/EmpInfo';
  import {Page} from '@vben/common-ui';
  import type {VbenFormProps} from '@vben/common-ui';
  import {useAccess} from "@vben/access";
  import { TableAction } from '#/components/table-action';


  const PerPrefix = 'Department:';

  const {hasAccessByCodes}  = useAccess();

  // const [registerModal, { openModal, setModalProps }] = useModal();
  const currentNode = ref<Recordable<any>>({});

  const deptModalRef = ref();

  const formOptions: VbenFormProps = {
    showCollapseButton: false,
    submitOnEnter: true,
    commonConfig: {
      labelWidth: 60,
    },
    actionWrapperClass: 'col-span-2 col-start-2 text-left ml-4',
    resetButtonOptions: {
      show: false,
    },
    schema: searchFormSchema,
  };

  const gridOptions: VxeGridProps<any> = {
    checkboxConfig: {
      highlight: true,
      labelField: 'name',
    },
    pagerConfig: {
      enabled: false,
    },
    treeConfig: {
      parentField: 'pid',
      rowField: 'id',
      transform: true,
    },
    columns,
    columnConfig: {resizable: true},
    height: 'auto',
    keepSource: true,
    border: false,
    stripe: true,
    proxyConfig: {
      ajax: {
        query: async ({page}, formValues) => {
          return await getDepts({
            entity: formValues || {},
          });
        },
      },
    },
  };

  const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

  function handleCreate() {
    setModalProps({ title: '新增部门', centered: true });
    openModal(true, {
      record: { companyId: unref(currentNode)?.id },
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable<any>) {
    setModalProps({ title: '修改部门', centered: true });
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleCreateChild(record: Recordable<any>) {
    setModalProps({ title: '新增【' + record.name + '】的子部门' });
    record = { companyId: unref(currentNode)?.id, pid: record.id };
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleDelete(record: Recordable<any>) {
    if (record.children && record.children.length > 0) {
      createMessage.warning('有子节点，不能删除！');
      return;
    }
    deleteByIds([record.id]).then((res) => {
      reloadData();
    });
  }

  function doSearch() {
    reloadData();
  }

  function reloadData() {
    if (unref(currentNode) && unref(currentNode).id) {
      reload({ searchInfo: { companyId: unref(currentNode).id } });
    } else {
      setTableData([]);
    }
  }

  function handleSuccess() {
    setTimeout(() => {
      reloadData();
    }, 200);
  }

  function handleSelect(node: Recordable<any>) {
    currentNode.value = node;
    reloadData();
  }

  function createActions(row: Recordable<any>) {
    return [
      {
        auth: [PerPrefix + PerEnum.ADD],
        tooltip: '添加子部门',
        icon: 'ant-design:plus-outlined',
        onClick: handleCreateChild.bind(null, row),
      },
      {
        auth: [PerPrefix + PerEnum.UPDATE],
        tooltip: '修改',
        icon: 'clarity:note-edit-line',
        onClick: handleEdit.bind(null, row),
      },
      {
        auth: [PerPrefix + PerEnum.DELETE],
        tooltip: '删除',
        icon: 'ant-design:delete-outlined',
        color: 'error',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, row),
          placement: 'left',
        },
      },
    ];
  }
</script>

<template>
  <Page auto-content-height>
    <div class="flex flex-row gap-2 h-full">
      <div class="w-[260px] h-full bg-card flex flex-col">
        <CompanyTree style="height: 100%" @select="handleSelect" />
      </div>
      <div class="flex-1 h-full">
        <BasicTable @register="registerTable" class="!pt-0 !pl-0 !pr-0 !pb-0">
          <template #toolbar>
            <Button v-if="hasAccessByCodes([PerPrefix + PerEnum.ADD])" type="primary" @click="handleCreate">新增</Button>
          </template>
          <template #bodyCell="{ column, row }">
            <template v-if="column.key === 'action'">
              <TableAction
                  :stopButtonPropagation="true"
                  :actions="createActions(row)"
              />
            </template>

            <template v-else-if="column.key === 'superiorName'">
              <EmpInfo :no="record.superiorCode" :name="record.superiorName" />
            </template>

            <template v-else-if="column.key === 'leaderName'">
              <EmpInfo :no="record.leaderCode" :name="record.leaderName" />
            </template>
          </template>
        </BasicTable>
      </div>
    </div>
    <DeptModal ref="deptModalRef" @register="registerModal" @success="handleSuccess" />
  </Page>
</template>
