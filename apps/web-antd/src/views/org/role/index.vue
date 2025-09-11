<script lang="ts" setup>
import { PerEnum } from '#/enums/perEnum';
import type{Recordable} from '@vben/types';
import { defineComponent, ref, unref } from 'vue';
import { Input, Tag, Space, Button, Badge, Popover, message, Affix, Divider } from 'ant-design-vue';
import { SettingOutlined } from '@ant-design/icons-vue';
import {useVbenVxeGrid, type VxeGridProps} from '#/adapter/vxe-table';
import { getRoleListByPage, deleteByIds, saveBatch } from '#/api/org/role';
import type {VbenFormProps} from '@vben/common-ui';
import { TableAction } from '#/components/table-action';

// import { PageWrapper } from '@/components/Page';
import {ColPage} from '@vben/common-ui';
import CompanyTree from '#/views/components/leftTree/CompanyTree.vue';
// import { useModal } from '@/components/Modal';
import RoleModal from './RoleModal.vue';
// import OrgSelectorModal from '@/components/Selector/src/OrgSelectorModal.vue';

import { columns, searchFormSchema } from './role.data';
import {getCompanies} from "#/api/org/company";
import {saveOrUpdateRoleScope} from "#/api/flowsetting/rolePersonal";
import OrgSelectorModal from "#/components/selector/org-selector/org-selector-modal.vue";

// import { OrgSelectType } from '@/components/Selector/src/types';
// import SplitPane from '#/views/components/splitPane/index.vue';

// const [registerModal, { openModal }] = useModal();
// 人员选择弹窗
// const [registerOrgModal, { openModal: openOrgSelector, setModalProps: setOrgModalProps }] =
//   useModal();
const roleModalRef = ref(), orgSelectorModalRef = ref();
const currentRole = ref<Recordable<any>>({});
const currentNode = ref<Recordable<any>>({});

const PerPrefix = 'Role:';

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
  wrapperClass: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  actionWrapperClass: 'pl-2 !justify-end md:!justify-start',
  actionPosition: 'left',
  actionLayout: 'inline',
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
        // roleType: 0, companyId: node ? node.id : ''
        const {id} = currentNode.value;
        formValues.companyId = id;
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
      icon: 'ant-design:form-outlined',
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

  roleModalRef.value.setData({
    companyId
  });
  roleModalRef.value.setState({
    title: '添加角色'
  });
  roleModalRef.value.open();
}

function handleEdit(record: Recordable<any>) {
  roleModalRef.value.setData(record);
  roleModalRef.value.setState({
    title: '编辑'
  });
  roleModalRef.value.open();
}

async function handleSettingPersonalSuccess(selectedPersonal) {
  // tableApi.setLoading(true);
  const personals = selectedPersonal.map((item) => item.code);
  const data = {
    orgId: unref(currentRow).id,
    orgType: 2,
    roleVo: {
      roleId: unref(currentRole).id,
      personalCodes: personals,
    },
  };
  const {success, msg} = await saveOrUpdateRoleScope(data);
  if (success) {
    message.success(msg);
    // 根据角色ID和组织（部门）ID刷新某个单元格的数据
    await reloadRolePersonal(unref(currentRole).id, unref(currentRow).id);
  }
  //tableApi.setLoading(false);
}

// 人员选择弹窗
function handleSettingCompany(record: Recordable<any>) {
  const selectedList =
      record.companies &&
      record.companies.map((item) => {
        return { id: item.id, shortName: item.cname };
      });
  // 加载已选择的数据
  currentRole.value = record;

  orgSelectorModalRef.value.setData({
    selectedList,
    multiSelect: true,
    selectType: 'company'
  });
  orgSelectorModalRef.value.open();

  /*openOrgSelector(true, {
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
  });*/
}

async function handleDelete(record: Recordable<any>) {
  if (record.children && record.children.length > 0) {
    message.warning('有子节点，不能删除！');
    return;
  }
  await deleteByIds({ id: record.id });
  tableApi.reload();
}

function handleSuccess() {
  tableApi.reload();
}

// 人员选择后回调
function handleSettingOrgSuccess(items: any[]) {
  const companyIds = items.map((item) => {
    return item.id;
  });
  const data = { roleId: unref(currentRole).id, companyIds: companyIds };

  saveBatch(data).then((res) => {
    tableApi.reload();
    message.success(res.msg);
  });
}

function handleSelect(node: any) {
  currentNode.value = node;
  tableApi.reload();
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
      <CompanyTree class="h-full" @select="handleSelect" />
    </template>
    <div class="flex-1 h-full">
      <BasicTable table-title="角色管理" >
        <template #toolbar-tools>
          <Button v-access:code="PerPrefix+PerEnum.ADD" class="ml-2" type="primary" @click="handleCreate">新增</Button>
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
    <RoleModal ref="roleModalRef" @success="handleSuccess" />
    <OrgSelectorModal ref="orgSelectorModalRef" @change="handleSettingOrgSuccess" />
  </ColPage>
</template>

<style lang="scss">
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
