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
      <div class="h-full bg-card p-2">
        <Tree
          title="类型"
          treeWrapperClassName="h-[calc(100%-35px)] overflow-auto"
          :clickRowToExpand="false"
          :treeData="treeData"
          @select="handleSelect"
        />
      </div>
    </template>
    <div class="h-full">
      <BasicTable class="!pt-0 !pl-0 !pr-0 !pb-0">
        <template #toolbar-tools>
          <Button v-access:code="PerPrefix + PerEnum.ADD" type="primary" @click="handleCreate">新增</Button>
        </template>

        <template #action="{ row }">
          <TableAction :actions="createActions(row)" />
        </template>
        <template #type="{ row }">
          <Tag v-if="row.type === 1" color="processing">公司矩阵角色</Tag>
          <Tag v-else-if="row.type === 2" color="cyan">部门矩阵角色</Tag>
        </template>
      </BasicTable>
    </div>
    <RoleModal ref="roleModalRef" @success="handleSuccess" />
  </ColPage>
</template>
<script lang="ts" setup>
  import { PerEnum } from '#/enums/perEnum';
  import {useAccess} from '@vben/access';
  import type {VxeGridProps} from '#/adapter/vxe-table';
  import { defineComponent, ref, unref, onMounted } from 'vue';
  import { Tree, Tag, Button, message } from 'ant-design-vue';
  import type { Recordable } from '@vben/types';
  import type {VbenFormProps} from '@vben/common-ui';
  import { SettingOutlined } from '@ant-design/icons-vue';
  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import { getRoleListByPage, deleteByIds, saveBatch, getMatrixRolePageList } from '#/api/org/role';
  // import { BasicTree, TreeItem } from '@/components/Tree';
  import {ColPage, Page} from '@vben/common-ui';
  import CompanyTree from '#/views/components/leftTree/CompanyTree.vue';
  import RoleModal from './RoleModal.vue';
  // import OrgSelectorModal from '@/components/Selector/src/OrgSelectorModal.vue';
  import { TableAction } from '#/components/table-action';

  import { columns, searchFormSchema } from './role.data';
  import {listColumns} from "#/views/base/app/app.data";

  // const [registerModal, { openModal }] = useModal();
  const roleModalRef = ref();

  const currentRole = ref<Recordable<any>>({});
  const currentNode = ref<Recordable<any>>({});
  const treeData = ref<any[]>([]);
  const PerPrefix = 'MatrixRole:';

  function createActions(row: Recordable<any>) {
    return [
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
        danger: true,
        onClick: (e) => {
          e.stopPropagation();
        },
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, row),
          placement: 'left',
          okButtonProps: { danger: true },
        },
      },
    ];
  }

  onMounted(() => {
    treeData.value = [
      {
        id: 1,
        key: 1,
        pid: '',
        name: '公司矩阵角色',
        title: '公司矩阵角色',
      },
      {
        id: 2,
        key: 2,
        pid: '',
        name: '部门矩阵角色',
        title: '部门矩阵角色',
      },
    ];
  });

  /*const [registerTable, { reload, setProps }] = useTable({
    title: '列表',
    api: getMatrixRolePageList,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      showAdvancedButton: false,
      showResetButton: false,
      autoSubmitOnEnter: true,
    },
    size: 'small',
    useSearchForm: true,
    showIndexColumn: false,
    bordered: true,
    rowKey: 'id',
    searchInfo: { type: -1 },
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
    },
  });*/


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
    columns,
    columnConfig: {resizable: true},
    height: 'auto',
    keepSource: true,
    border: false,
    stripe: true,
    proxyConfig: {
      ajax: {
        query: async ({page}, formValues) => {
          formValues.type = currentNode.value?.id;
          return await getMatrixRolePageList({
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

  function handleCreate() {
    const type = currentNode.value.id;
    roleModalRef.value.setData({type});
    roleModalRef.value.open();
    roleModalRef.value.setState({
      title: '新增角色'
    });
  }

  function handleEdit(record: Recordable<any>) {
    roleModalRef.value.setData(record);
    roleModalRef.value.open();
    roleModalRef.value.setState({
      title: '编辑角色'
    });
  }

  function handleDelete(record: Recordable<any>) {
    /*if(record.children&&record.children.length>0){
    createMessage.warning("有子节点，不能删除！")
    return;
  }*/
    deleteByIds({ id: record.id }).then((res) => {
      tableApi.reload();
    });
  }

  function handleSuccess() {
    setTimeout(() => {
      tableApi.reload();
    }, 200);
  }

  function handleSelect(node: any, e) {
    if (e.selectedNodes && e.selectedNodes.length > 0) {
      currentNode.value = e.selectedNodes[0];
    } else {
      currentNode.value = {};
    }
    tableApi.reload();
  }

</script>

<style lang="less">
  .role-companies {
    .ant-space-align-center {
      flex-flow: wrap;

      .company-item {
        margin: 2px 0;
      }
    }
  }
</style>
