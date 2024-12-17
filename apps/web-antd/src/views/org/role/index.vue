<template>
  <Page auto-content-height>
    <div class="flex flex-row gap-2 h-full">
      <div class="w-[260px] h-full bg-card flex flex-col">
        <CompanyTree class="h-full" @select="handleSelect" />
      </div>
      <div class="flex-1 h-full">
        <BasicTable >
          <template #toolbar-tools>
            <Button v-if="hasAccessByCodes([PerPrefix + PerEnum.ADD])" class="ml-2" type="primary" @click="handleCreate">新增</Button>
          </template>
          <template #action="{row}">
            <TableAction :actions="createActions(row)"/>
          </template>
          <template #companies="{row}">
            <div v-if="row.companies && row.companies.length > 0">
              <Popover title="所属公司" placement="left" class="companies-details">
                <template #content>
                  <div class="role-companies">
                    <div class="mb-2" v-if="row.companies.length > 0">
                      <Divider class="split-line" orientation="left" />
                      <Tag
                          color="blue"
                          class="company-item"
                          v-for="company in row.companies"
                      >
                        {{ company.cname }}
                      </Tag>
                    </div>
                  </div>
                </template>
                <div class="companies-handle">
                  <Space>
                    <!-- <Tag>所属公司</Tag>-->
                    <Badge :count="row.companies.length" :number-style="{ backgroundColor: '#52c41a' }"/>
                  </Space>
                </div>
              </Popover>
            </div>
            <div v-else>未设置</div>
          </template>
        </BasicTable>
      </div>
    </div>
    <RoleModal ref="roleModalRef" @register="registerModal" @success="handleSuccess" />
    <OrgSelectorModal @register="registerOrgModal" @change="handleSettingOrgSuccess" />
  </Page>
</template>
<script lang="ts" setup>
  import { PerEnum } from '#/enums/perEnum';
  import {useAccess} from '@vben/access';
  import type{Recordable} from '@vben/types';
  import { defineComponent, ref, unref } from 'vue';
  import { Input, Tag, Space, Badge, Popover, message, Affix, Divider } from 'ant-design-vue';
  import { SettingOutlined } from '@ant-design/icons-vue';
  import {useVbenVxeGrid, type VxeGridProps} from '#/adapter/vxe-table';
  import { getRoleListByPage, deleteByIds, saveBatch } from '#/api/org/role';
  import type {VbenFormProps} from '@vben/common-ui';
  import { TableAction } from '#/components/table-action';

  // import { PageWrapper } from '@/components/Page';
  import {Page, useVbenModal} from '@vben/common-ui';
  import CompanyTree from '#/views/components/leftTree/CompanyTree.vue';
  // import { useModal } from '@/components/Modal';
  import RoleModal from './RoleModal.vue';
  // import OrgSelectorModal from '@/components/Selector/src/OrgSelectorModal.vue';

  import { columns, searchFormSchema } from './role.data';
  import {getCompanies} from "#/api/org/company";
  // import { OrgSelectType } from '@/components/Selector/src/types';
  // import SplitPane from '@/views/components/splitPane/index.vue';

  // const [registerModal, { openModal }] = useModal();
  // 人员选择弹窗
  // const [registerOrgModal, { openModal: openOrgSelector, setModalProps: setOrgModalProps }] =
  //   useModal();

  const currentRole = ref<Recordable>({});
  const currentNode = ref<Recordable>({});

  const PerPrefix = 'Role:';
  const {hasAccessByCodes} = useAccess();

  /*const [registerTable, { reload, setProps }] = useTable({
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
    rowConfig: {
      keyField: 'id',
    },
    height: 'auto',
    keepSource: true,
    border: false,
    stripe: true,
    proxyConfig: {
      ajax: {
        query: async ({page}, formValues) => {

          return await getRoleListByPage({
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

  function createActions(record: Recordable<any>) {
    return [
      {
        auth: [PerPrefix + PerEnum.UPDATE],
        tooltip: '配置所属公司',
        icon: 'ant-design:setting',
        onClick: handleSettingCompany.bind(null, record),
      },
      {
        auth: [PerPrefix + PerEnum.UPDATE],
        tooltip: '修改',
        icon: 'clarity:note-edit-line',
        onClick: handleEdit.bind(null, record),
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
          confirm: handleDelete.bind(null, record),
          placement: 'left',
          okButtonProps: {danger: true}
        },
      },
    ];
  }

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
      message.warning('有子节点，不能删除！');
      return;
    }
    deleteByIds({ id: record.id }).then((res) => {
      tableApi.reload();
    });
  }

  function handleSuccess() {
    setTimeout(() => {
      tableApi.reload();
    }, 200);
  }

  // 人员选择后回调
  function handleSettingOrgSuccess(items: any[]) {
    const companyIds = items.map((item) => {
      return item.id;
    });
    const data = { roleId: unref(currentRole).id, companyIds: companyIds };

    saveBatch(data).then((res) => {
      tableApi.reload();
    });
  }

  function handleSelect(node: any) {
    currentNode.value = node;
    const searchInfo = { searchInfo: { roleType: 0, companyId: node ? node.id : '' } };
    // setProps(searchInfo);
    tableApi.reload(searchInfo);
  }

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
