<template>
  <PageWrapper dense contentFullHeight fixedHeight class="h-full">
    <div class="p-4 h-full">
      <SplitPane>
        <template #left>
          <CompanyTree class="h-full" @select="handleSelect" />
        </template>
        <template #main>
          <BasicTable @register="registerTable" class="!pt-0 !pl-0 !pr-0 !pb-0">
            <template #toolbar>
              <Authority :value="'Role:' + PerEnum.ADD">
                <a-button type="primary" @click="handleCreate">新增</a-button>
              </Authority>
            </template>
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'action'">
                <TableAction
                  :actions="[
                    {
                      auth: 'Role:' + PerEnum.UPDATE,
                      tooltip: '配置所属公司',
                      icon: 'ant-design:setting',
                      onClick: handleSettingCompany.bind(null, record),
                    },
                    {
                      auth: 'Role:' + PerEnum.UPDATE,
                      tooltip: '修改',
                      icon: 'clarity:note-edit-line',
                      onClick: handleEdit.bind(null, record),
                    },
                    {
                      auth: 'Role:' + PerEnum.DELETE,
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

              <template v-else-if="column.key === 'companies'">
                <div v-if="record.companies && record.companies.length > 0">
                  <Popover title="所属公司" placement="left" class="companies-details">
                    <template #content>
                      <div class="role-companies">
                        <div class="mb-2" v-if="record.companies.length > 0">
                          <Divider class="split-line" orientation="left" />
                          <Tag
                            color="blue"
                            class="company-item"
                            v-for="company in record.companies"
                          >
                            {{ company.cname }}
                          </Tag>
                        </div>
                      </div>
                    </template>
                    <div class="companies-handle">
                      <Space>
                        <!-- <Tag>所属公司</Tag>-->
                        <Badge
                          :count="record.companies.length"
                          :number-style="{ backgroundColor: '#52c41a' }"
                        />
                      </Space>
                    </div>
                  </Popover>
                </div>
                <div v-else>未设置</div>
              </template>
            </template>
          </BasicTable>
        </template>
      </SplitPane>
    </div>
    <RoleModal @register="registerModal" @success="handleSuccess" />
    <OrgSelectorModal @register="registerOrgModal" @change="handleSettingOrgSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { PerEnum } from '#/enums/perEnum';
  import {AccessControl} from '@vben/access';
  import { defineComponent, ref, unref } from 'vue';
  import { Input, Tag, Space, Badge, Popover, Affix, Divider } from 'ant-design-vue';
  import { SettingOutlined } from '@ant-design/icons-vue';
  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import { getRoleListByPage, deleteByIds, saveBatch } from '#/api/org/role';
  import { PageWrapper } from '@/components/Page';
  import CompanyTree from '@/views/components/leftTree/CompanyTree.vue';
  import { message } from 'ant-design-vue';
  import { useModal } from '@/components/Modal';
  import RoleModal from './RoleModal.vue';
  import OrgSelectorModal from '@/components/Selector/src/OrgSelectorModal.vue';

  import { columns, searchFormSchema } from './role.data';
  import { OrgSelectType } from '@/components/Selector/src/types';
  import SplitPane from '@/views/components/splitPane/index.vue';


  export default defineComponent({
    name: 'RoleManagement',
    components: {
      Popover,
      Badge,
      Divider,
      BasicTable,
      PageWrapper,
      CompanyTree,
      RoleModal,
      OrgSelectorModal,
      TableAction,
      Input,
      Tag,
      Affix,
      Space,
      Search: Input.Search,
      SettingOutlined,
      SplitPane,
      Authority,
    },
    setup() {
      const [registerModal, { openModal }] = useModal();
      // 人员选择弹窗
      const [registerOrgModal, { openModal: openOrgSelector, setModalProps: setOrgModalProps }] =
        useModal();

      const currentRole = ref<Recordable>({});
      const currentNode = ref<Recordable>({});

      const [registerTable, { reload, setProps }] = useTable({
        title: '列表',
        api: getRoleListByPage,
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
        searchInfo: { roleType: 0 },
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
        },
      });

      function handleCreate() {
        const companyId = currentNode.value.id;
        openModal(true, {
          record: { companyId: companyId },
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      // 人员选择弹窗
      function handleSettingCompany(record: Recordable) {
        const selectedList =
          record.companies &&
          record.companies.map((item) => {
            return { id: item.id, shortName: item.cname };
          });
        // 加载已选择的数据
        currentRole.value = record;
        openOrgSelector(true, {
          selectorProps: {
            multiple: true,
            selectType: OrgSelectType.COMPANY,
            selectedList: selectedList,
          },
        });
        let title = `选择公司`;

        setOrgModalProps({
          title,
          bodyStyle: { padding: '0px', margin: '0px' },
          width: 850,
          height: 450,
          showOkBtn: true,
          showCancelBtn: true,
        });
      }

      function handleDelete(record: Recordable) {
        if (record.children && record.children.length > 0) {
          createMessage.warning('有子节点，不能删除！');
          return;
        }
        deleteByIds({ id: record.id }).then((res) => {
          reload();
        });
      }

      function handleSuccess() {
        setTimeout(() => {
          reload();
        }, 200);
      }

      // 人员选择后回调
      function handleSettingOrgSuccess(items: any[]) {
        const companyIds = items.map((item) => {
          return item.id;
        });
        const data = { roleId: unref(currentRole).id, companyIds: companyIds };

        saveBatch(data).then((res) => {
          reload();
        });
      }

      function handleSelect(node: any) {
        currentNode.value = node;
        const searchInfo = { searchInfo: { roleType: 0, companyId: node ? node.id : '' } };
        setProps(searchInfo);
        reload(searchInfo);
      }

      return {
        registerTable,
        registerModal,
        registerOrgModal,
        handleSettingCompany,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleSettingOrgSuccess,
        handleSelect,
        PerEnum,
      };
    },
  });
</script>

<style lang="less">
  .companies-details {
    > .ant-tag {
      margin-right: 4px;
      cursor: pointer;
    }
  }

  .role-companies {
    width: 300px;
    max-height: 400px;
    overflow: auto;

    .split-line {
      height: 1px;
      background-color: #7cb305;
      margin: 0 0 2px;
    }

    .company-item {
      margin-bottom: 5px;
    }
  }
</style>
