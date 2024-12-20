<script lang="ts" setup>
  import { PerEnum } from '#/enums/perEnum';
  import {useAccess} from '@vben/access';
  import { ref, unref } from 'vue';
  import type { Recordable } from '@vben/types';
  import {Button, message} from 'ant-design-vue';
  import {useVbenVxeGrid, type VxeGridProps} from '#/adapter/vxe-table';
  import { deleteByIds, getDepts } from '#/api/org/dept';
  import CompanyTree from '#/views/components/leftTree/CompanyTree.vue';
  // import { useModal } from '@/components/Modal';
  import DeptModal from './DeptModal.vue';
  // import SplitPane from '@/views/components/splitPane/index.vue';
  import { columns, searchFormSchema } from './dept.data';
  import { EmpInfo } from '#/views/components/EmpInfo';
  import {ColPage} from '@vben/common-ui';
  import type {VbenFormProps} from '@vben/common-ui';
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
    pagerConfig: {
      enabled: false,
    },
    treeConfig: {
      parentField: 'pid',
      rowField: 'id',
      transform: true,
    },
    rowConfig: {
      isHover: true,
    },
    columns,
    columnConfig: {resizable: true},
    height: 'auto',
    keepSource: true,
    border: false,
    stripe: true,
    showOverflow: true,
    proxyConfig: {
      ajax: {
        query: async ({page}, formValues) => {
          return await getDepts(formValues || {});
        },
      },
    },
  };

  const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

  function handleCreate() {
    const record = { companyId: unref(currentNode)?.id };
    deptModalRef.value.setData(record);
    deptModalRef.value.open();
    deptModalRef.value.setState({
      title: '新增部门'
    });
  }

  function handleEdit(record: Recordable<any>) {
    deptModalRef.value.setData(record);
    deptModalRef.value.open();
    deptModalRef.value.setState({
      title: '修改部门'
    });
  }

  function handleCreateChild(record: Recordable<any>) {
    record = { companyId: unref(currentNode)?.id, pid: record.id };
    deptModalRef.value.setData(record);
    deptModalRef.value.open();
    deptModalRef.value.setState({
      title: '新增【' + record.name + '】的子部门'
    });
  }

  function handleDelete(record: Recordable<any>) {
    if (record.children && record.children.length > 0) {
      message.warning('有子节点，不能删除！');
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
      tableApi.reload({ companyId: unref(currentNode).id });
    } else {
      tableApi.setDatas([]);
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
  <ColPage
    :left-max-width="50"
    :left-min-width="10"
    :left-width="15"
    :split-handle="true"
    :split-line="true"
    :resizable="true"
    :left-collapsible="true"
    :auto-content-height="true"
    content-class="h-full">
    <template #left>
      <CompanyTree @select="handleSelect" />
    </template>
    <BasicTable class="!pt-0 !pl-0 !pr-0 !pb-0">
      <template #toolbar>
        <Button v-if="hasAccessByCodes([PerPrefix + PerEnum.ADD])" type="primary" @click="handleCreate">新增</Button>
      </template>
      <template #action="{ row }">
        <TableAction
          :stopButtonPropagation="true"
          :actions="createActions(row)"
        />
      </template>
      <template #superiorName="{ row }">
        <EmpInfo :no="row.superiorCode" :name="row.superiorName" />
      </template>

      <template #leaderName="{ row }">
        <EmpInfo :no="row.leaderCode" :name="row.leaderName" />
      </template>
    </BasicTable>
    <DeptModal ref="deptModalRef" @success="handleSuccess" />
  </ColPage>
</template>
