<template>
  <PageWrapper dense contentFullHeight fixedHeight class="h-full">
    <div class="p-4 h-full">
      <SplitPane>
        <template #left>
          <BasicTree
            title="类型"
            treeWrapperClassName="h-[calc(100%-35px)] overflow-auto"
            :clickRowToExpand="false"
            :treeData="treeData"
            @select="handleSelect"
          />
        </template>
        <template #main>
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
        </template>
      </SplitPane>
    </div>
    <RoleModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { PerEnum } from '#/enums/perEnum';
  import {AccessControl} from '@vben/access';
  import { defineComponent, ref, unref, onMounted } from 'vue';
  import { Input, Tag, Space } from 'ant-design-vue';
  import { SettingOutlined } from '@ant-design/icons-vue';
  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import { getRoleListByPage, deleteByIds, saveBatch, getMatrixRolePageList } from '#/api/org/role';
  import { BasicTree, TreeItem } from '@/components/Tree';
  import { PageWrapper } from '@/components/Page';
  import CompanyTree from '@/views/components/leftTree/CompanyTree.vue';
  import { message } from 'ant-design-vue';
  import { useModal } from '@/components/Modal';
  import RoleModal from './RoleModal.vue';
  import OrgSelectorModal from '@/components/Selector/src/OrgSelectorModal.vue';
  import SplitPane from '@/views/components/splitPane/index.vue';

  import { columns, searchFormSchema } from './role.data';


  export default defineComponent({
    name: 'RoleManagement',
    components: {
      BasicTree,
      BasicTable,
      PageWrapper,
      CompanyTree,
      RoleModal,
      OrgSelectorModal,
      TableAction,
      Input,
      Tag,
      Space,
      Search: Input.Search,
      SettingOutlined,
      SplitPane,
      Authority,
    },
    setup() {
      const [registerModal, { openModal }] = useModal();

      const currentRole = ref<Recordable>({});
      const currentNode = ref<Recordable>({});
      const treeData = ref<TreeItem[]>([]);

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

      const [registerTable, { reload, setProps }] = useTable({
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
      });

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

        setProps(searchInfo);
        reload(searchInfo);
      }

      return {
        treeData,
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleSelect,
        PerEnum,
      };
    },
  });
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
