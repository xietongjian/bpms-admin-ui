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
      <div class="h-full bg-card">
        <CompanyTree @select="handleSelect" class="h-full"/>
      </div>
    </template>
    <BasicTable
        class="role-personal !pt-0 !pl-0 !pr-0 !pb-0 !h-full"
    >
      <template #action="{row}">
        <TableAction
            :actions="createMainActions(row)"
        />
      </template>
      <template #expandedRowRender="{ record, index, indent, expanded }">
        <BasicTable
            size="small"
            :columns="personalColumns"
            :useSearchForm="false"
            :immediate="false"
            :showIndexColumn="true"
            :showTableSetting="false"
            :bordered="true"
            :pagination="false"
            :emptyDataIsShowTable="false"
            :inset="true"
            :scroll="{ y: 200 }"
            rowKey="id"
            :canResize="false"
            :searchInfo="{ roleId: record.id }"
            :loading="personalTableLoading"
            :dataSource="rolePersonalData[currentNode?.id + '_' + record.id]"
        >
          <template #action="{row}">
            <TableAction
                :actions="createActions(row)"
            />
          </template>

          <template #personalName="{row: rcd}">
            <EmpInfo :no="rcd.personalCode" :name="rcd.personalName"/>
          </template>
        </BasicTable>
      </template>
    </BasicTable>

    <PersonalSelectorModal
        ref="personalSelectorModalRef"
        @change="handleSettingPersonalSuccess"
    />
  </ColPage>
</template>
<script lang="ts" setup>
import {PerEnum} from "#/enums/perEnum";
import {ref, unref, nextTick, onMounted} from 'vue';
import type {Recordable} from '@vben/types';
import type {VxeGridProps} from '#/adapter/vxe-table';
import PersonalSelectorModal from '#/components/selector/personal-selector/PersonalSelectorModal.vue';

// import { BasicTable, useTable, TableAction } from '@/components/Table';
// import PersonalSelectorModal from '#/components/Selector/src/FlowModelSelectorModal.vue';
import {TableAction} from '#/components/table-action';

import {ColPage} from '@vben/common-ui';
import CompanyTree from '#/views/components/leftTree/CompanyTree.vue';

import {EmpInfo} from '#/views/components/EmpInfo';
import {message} from 'ant-design-vue'

import {
  companyRoleFormSchema,
  columns,
  personalColumns,
  searchFormSchema,
} from './rolePersonal.data';
import {getRoleListByPage, deleteByIds} from '#/api/org/role';
import {
  deleteById,
  getPersonalsByRoleIdAndOrgId,
  saveOrUpdate,
} from '#/api/flowsetting/rolePersonal';
import {useVbenVxeGrid} from "#/adapter/vxe-table";
import {listColumns} from "#/views/base/app/app.data";
import {getAppListByPage} from "#/api/base/app";
import type {VbenFormProps} from '@vben/common-ui';

const PerPrefix = 'RolePersonal:';

const personalSelectorModalRef = ref(), exportMatrixRoleExcelModalRef = ref();

// 人员选择弹窗
// const [
//   registerPersonalModal,
//   { openModal: openPersonalSelector, setModalProps: setPersonalModalProps },
// ] = useModal();

const currentRole = ref<Recordable<any>>({});
const expandedRowKeys = ref([]);
const searchPersonTxt = ref<object>({});

const rolePersonalData = ref<object>({});

onMounted(() => {
  nextTick(() => {
  });
});

const currentNode = ref<Recordable<any>>({});
const personalTableLoading = ref(false);
const roleLoading = ref(false);

/*const [registerTable, { reload, setProps, setTableData, setPagination, setLoading }] = useTable({
  title: '',
  size: 'small',
  api: getRoleListByPage,
  columns,
  formConfig: {
    labelWidth: 120,
    schemas: searchFormSchema,
    showAdvancedButton: false,
    showResetButton: false,
    autoSubmitOnEnter: true,
  },
  immediate: false,
  expandRowByClick: true,
  useSearchForm: true,
  showIndexColumn: true,
  showTableSetting: false,
  bordered: false,
  expandedRowKeys: expandedRowKeys,
  onExpand: (expanded, record) => {
    if (expanded) {
      expandedRowKeys.value = [record.id];
      currentRole.value = record;
      searchPersonTxt.value[record.id] = '';
      reloadRolePersonal(record.id, searchPersonTxt.value[record.id]);
    } else {
      expandedRowKeys.value = [];
    }
  },
  rowKey: 'id',
  actionColumn: {
    width: 80,
    align: 'center',
    title: '操作',
    dataIndex: 'action',
  },
});*/

function createMainActions(row) {
  return [
    {
      auth: [PerPrefix + PerEnum.ADD],
      tooltip: '添加人员',
      icon: 'ant-design:user-add',
      onClick: handleAddPersonal.bind(null, row),
    },
  ];
}

function createActions(row) {
  return [
    {
      auth: [PerPrefix + PerEnum.DELETE],
      icon: 'ant-design:delete-outlined',
      danger: true,
      tooltip: '删除',
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDeletePersonal.bind(null, row),
        okButtonProps: {danger: true},
      },
    },
  ];
}

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
        formValues.companyId = currentNode.value?.id;
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


// 人员选择后回调
function handleSettingPersonalSuccess(selectedPersonal) {
  if (!selectedPersonal || selectedPersonal.length <= 0) {
    return;
  }
  // setLoading(true);
  const personals = selectedPersonal.map((item) => item.code);
  const data = {
    orgId: unref(currentNode).id,
    orgType: 1,
    roleVo: {
      roleId: unref(currentRole).id,
      personalCodes: personals,
    },
  };
  setTimeout(() => {
    saveOrUpdate(data)
        .then((res) => {
          expandedRowKeys.value = [unref(currentRole).id];
          reloadRolePersonal(unref(currentRole).id, searchPersonTxt.value[unref(currentRole).id]);
        })
        .finally(() => {
          setLoading(false);
        });
  }, 500);
}

async function handleSubmit() {
  try {
    roleLoading.value = true;
    const values = await validate();
    const roles = [];
    for (const key in values) {
      roles.push({
        roleId: key,
        personalCodes: values[key]
            ? values[key].map((item) => {
              return item.code;
            })
            : [],
      });
    }
    if (unref(currentNode).id) {
      const companyRoles = {
        orgId: unref(currentNode).id,
        orgType: unref(currentNode).sourceType,
        roleVos: roles,
      };

      const result = await saveOrUpdate(companyRoles);
      const {data} = result;
      if (data.success) {
        message.success(data.msg, 2);
      } else {
        message.error(data.msg, 2);
      }
    } else {
      message.error('未指定公司，添加失败！', 2);
    }
  } finally {
    roleLoading.value = false;
  }
}

function reloadRolePersonal(roleId, keyword) {
  const orgId = unref(currentNode).id;
  if (orgId) {
    personalTableLoading.value = true;
    getPersonalsByRoleIdAndOrgId({
      orgId: orgId,
      roleId: roleId,
      personal: {keyword: keyword || ''},
    }).then((res) => {
      rolePersonalData.value[orgId + '_' + roleId] = res;
      personalTableLoading.value = false;
    });
  } else {
    message.warning('未选择公司');
  }
}

// 人员选择弹窗
function handleAddPersonal(record: Recordable, e) {
  e.stopPropagation();
  if (!unref(currentNode).id) {
    message.warning('未选择公司');
    return;
  }
  currentRole.value = record;

  personalSelectorModalRef.value.setData([]);
  personalSelectorModalRef.value.setState({
    title: `设置角色【${record.name}】下的人员`
  });
  personalSelectorModalRef.value.open();

  /*openPersonalSelector(true, {
    selectorProps: {
      multiple: true,
      selectedList: [],
    },
  });

  setPersonalModalProps({
    title: `设置角色【${record.name}】下的人员`,
    bodyStyle: { padding: '0px', margin: '0px' },
    width: 850,
    showOkBtn: true,
    showCancelBtn: true,
  });*/
}

async function handleDelete(record: Recordable<any>) {
  if (record.children && record.children.length > 0) {
    message.warning('有子节点，不能删除！');
    return;
  }
  deleteByIds({id: record.id}).then((res) => {
    reload();
  });
}

async function handleDeletePersonal(record: Recordable<any>) {
  const {success, msg} = await deleteById(record.id);
  if (success) {
    reloadRolePersonal(unref(currentRole).id, '');
  }
}

async function handleSelect(node: any) {
  const {loadData} = tableApi.grid;
  roleLoading.value = true;
  currentNode.value = node;
  rolePersonalData.value = {};
  expandedRowKeys.value = [];
  if (!node) {
    loadData([]);
    // setPagination({ total: 0, current: 1 });
    return;
  }
  try {
    // setProps({
    //   searchInfo: { companyId: node.id },
    // });
    // reload();
    tableApi.reload();
  } finally {
    roleLoading.value = false;
  }
}

function handleSuccess() {
  reload();
}

function onSearchPerson(roleId, val) {
  reloadRolePersonal(roleId, val);
}
</script>

<style lang="scss">
.role-personal {
  .ant-table-expanded-row {
    .ant-table-cell {
      .vben-basic-table {
        .ant-table {
          margin: 0 !important;
        }
      }
    }
  }
}

.role-companies {
  .ant-space-align-center {
    flex-flow: wrap;

    .company-item {
      margin: 2px 0;
    }
  }
}
</style>
