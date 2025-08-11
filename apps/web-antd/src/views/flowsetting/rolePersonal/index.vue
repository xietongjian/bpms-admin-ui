<template>
  <ColPage
      :left-max-width="50"
      :left-min-width="10"
      :left-width="15"
      :split-handle="false"
      :split-line="false"
      :resizable="true"
      :left-collapsible="false"
      :auto-content-height="true"
      content-class="h-full">
    <template #left>
      <div class="h-full bg-card">
        <CompanyTree @select="handleSelect" class="h-full"/>
      </div>
    </template>
    <BasicTable class="ml-2">
      <template #action="{row}">
        <TableAction :actions="createMainActions(row)"/>
      </template>
      <template #name="{ row }">
        {{ row.name }}
      </template>
      <template #expandContent="{ row }">
        <SubBasicTable
            height="300"
            :gridOptions="{
              size: 'mini',
              keepSource: true,
              border: false,
              stripe: true,
              pagerConfig: {enabled: false},
              columns: personalColumns,
              data: row.rolePersonal}"
        >
          <template #action="{row: rcd}">
            <TableAction :actions="createActions(row, rcd)"/>
          </template>

          <template #personalName="{row: rcd}">
            <EmpInfo :no="rcd.personalCode" :name="rcd.personalName"/>
          </template>
        </SubBasicTable>
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
import {ref, unref, h} from 'vue';
import type {Recordable} from '@vben/types';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import PersonalSelectorModal from '#/components/selector/personal-selector/PersonalSelectorModal.vue';
import {TableAction} from '#/components/table-action';
import {ColPage} from '@vben/common-ui';
import CompanyTree from '#/views/components/leftTree/CompanyTree.vue';
import {EmpInfo} from '#/views/components/EmpInfo';
import {message} from 'ant-design-vue'

import {
  columns,
  personalColumns,
  searchFormSchema,
} from './rolePersonal.data';
import {getRoleListByPage} from '#/api/org/role';
import {
  deleteById,
  getPersonalsByRoleIdAndOrgId,
  saveOrUpdate,
} from '#/api/flowsetting/rolePersonal';
import {useVbenVxeGrid} from "#/adapter/vxe-table";

const PerPrefix = 'RolePersonal:';

const personalSelectorModalRef = ref();

const currentRole = ref<Recordable<any>>({});
const expandedRowKeys = ref([]);

const currentNode = ref<Recordable<any>>({});

function createMainActions(row: Recordable<any>) {
  return [
    {
      auth: [PerPrefix + PerEnum.ADD],
      tooltip: '添加人员',
      icon: 'ant-design:user-add',
      onClick: handleAddPersonal.bind(null, row),
    },
  ];
}

function createActions(mainRow, row) {
  return [
    {
      auth: [PerPrefix + PerEnum.DELETE],
      icon: 'ant-design:delete-outlined',
      danger: true,
      tooltip: '删除',
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDeletePersonal.bind(null, mainRow, row),
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
  wrapperClass: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  actionWrapperClass: 'pl-2 !justify-end md:!justify-start',
  actionPosition: 'left',
  actionLayout: 'inline',
  resetButtonOptions: {
    show: false,
  },
  schema: searchFormSchema,
};

const gridOptions: VxeGridProps = {
  columns,
  columnConfig: {resizable: true},
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  radioConfig: {
    highlight: true,
    labelField: 'name',
    trigger: 'row',
  },
  expandConfig: {
    trigger: 'row',
    lazy: true,
    loadMethod: ({row}) => {
      return getPersonalsByRoleIdAndOrgId({
        orgId: unref(currentNode).id,
        roleId: row.id,
        personal: {keyword: ''},
      }).then((res) => {
        row.rolePersonal = res;
        return Promise.resolve(row);
      }).catch(e => {
        console.error(e);
        return Promise.reject("加载人员失败！");
      });
    },
    toggleMethod: ({row, expanded}) => {
      if (expanded) {
        tableApi.grid.reloadRowExpand(row);
      }
      return true;
    }
  },
  proxyConfig: {
    autoLoad: false,
    ajax: {
      query: async ({page}, formValues) => {
        formValues.companyId = currentNode.value?.id;
        if (!formValues.companyId) {
          message.warning('请选择公司！')
          return Promise.resolve([]);
        }
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

const [SubBasicTable] = useVbenVxeGrid();

// 人员选择后回调
async function handleSettingPersonalSuccess(selectedPersonal: Array) {
  if (!selectedPersonal || selectedPersonal.length <= 0) {
    return;
  }
  const personals = selectedPersonal.map((item: any) => item.code);
  const data = {
    orgId: unref(currentNode).id,
    orgType: 1,
    roleVo: {
      roleId: unref(currentRole).id,
      personalCodes: personals,
    },
  };
  const {success, msg} = await saveOrUpdate(data);
  if (success) {
    message.success(msg);
    tableApi.grid.reloadRowExpand(currentRole.value);
  }
}

// 人员选择弹窗
function handleAddPersonal(record: Recordable<any>, e) {
  e.stopPropagation();
  if (!unref(currentNode).id) {
    message.warning('未选择公司');
    return;
  }
  currentRole.value = record;

  personalSelectorModalRef.value.setData({
    multiple: true,
  });
  personalSelectorModalRef.value.setState({
    title: `设置角色【${record.name}】下的人员`,
  });
  personalSelectorModalRef.value.open();
}

async function handleDeletePersonal(mainRow: Recordable<any>, record: Recordable<any>) {
  const {success, msg} = await deleteById(record.id);
  if (success) {
    message.success(msg);
    tableApi.grid.reloadRowExpand(mainRow);
  }
}

async function handleSelect(node: any) {
  currentNode.value = node;
  tableApi.reload();
}

function onSearchPerson(roleId, val) {
  reloadRolePersonal(roleId, val);
}
</script>
