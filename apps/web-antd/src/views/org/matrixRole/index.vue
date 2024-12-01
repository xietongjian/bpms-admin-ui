<template>
  <Page auto-content-height >
    <div class="flex flex-row gap-2 h-full">
      <div class="w-[260px] h-full bg-card flex flex-col">
        <Tree
          title="类型"
          treeWrapperClassName="h-[calc(100%-35px)] overflow-auto"
          :clickRowToExpand="false"
          :treeData="treeData"
          @select="handleSelect"
        />
      </div>
      <div class="flex-1 h-full">
        <BasicTable @register="registerTable" class="!pt-0 !pl-0 !pr-0 !pb-0">
          <template #toolbar>
            <Authority :value="'MatrixRole:' + PerEnum.ADD">
              <a-button type="primary" @click="handleCreate">新增</a-button>
            </Authority>
          </template>
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <TableAction
                :actions="[
                    {
                      auth: 'MatrixRole:' + PerEnum.UPDATE,
                      tooltip: '修改',
                      icon: 'clarity:note-edit-line',
                      onClick: handleEdit.bind(null, record),
                    },
                    {
                      auth: 'MatrixRole:' + PerEnum.DELETE,
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

            <template v-else-if="column.key === 'type'">
              <Tag v-if="record.type === 1" color="processing">公司矩阵角色</Tag>
              <Tag v-else-if="record.type === 2" color="cyan">部门矩阵角色</Tag>
            </template>
          </template>
        </BasicTable>

      </div>

    </div>
    <RoleModal @register="registerModal" @success="handleSuccess" />
  </Page>
</template>
<script lang="ts" setup>
  import { PerEnum } from '#/enums/perEnum';
  import {useAccess} from '@vben/access';
  import type {VxeGridProps} from '#/adapter/vxe-table';
  import { defineComponent, ref, unref, onMounted } from 'vue';
  import { Input, Tree, Tag, Space, Button, message } from 'ant-design-vue';
  import type { Recordable } from '@vben/types';
  import type {VbenFormProps} from '@vben/common-ui';
  import { SettingOutlined } from '@ant-design/icons-vue';
  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import { getRoleListByPage, deleteByIds, saveBatch, getMatrixRolePageList } from '#/api/org/role';
  // import { BasicTree, TreeItem } from '@/components/Tree';
  import {Page} from '@vben/common-ui';
  import CompanyTree from '#/views/components/leftTree/CompanyTree.vue';
  import RoleModal from './RoleModal.vue';
  // import OrgSelectorModal from '@/components/Selector/src/OrgSelectorModal.vue';

  import { columns, searchFormSchema } from './role.data';
  import {listColumns} from "#/views/base/app/app.data";

  // const [registerModal, { openModal }] = useModal();

  const currentRole = ref<Recordable>({});
  const currentNode = ref<Recordable>({});
  const treeData = ref<any[]>([]);

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
    openModal(true, {
      record: { type: type },
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
    /*if(record.children&&record.children.length>0){
    createMessage.warning("有子节点，不能删除！")
    return;
  }*/
    deleteByIds({ id: record.id }).then((res) => {
      reload();
    });
  }

  function handleSuccess() {
    setTimeout(() => {
      reload();
    }, 200);
  }

  function handleSelect(node: any, e) {
    const searchInfo = { searchInfo: { type: -1 } };
    if (e.selectedNodes && e.selectedNodes.length > 0) {
      currentNode.value = e.selectedNodes[0];
      searchInfo.searchInfo.type = currentNode.value.id;
    } else {
      currentNode.value = {};
    }

    // setProps(searchInfo);
    tableApi.reload(searchInfo);
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
