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
      <CompanyTree @select="handleSelect" class="h-full" />
    </template>
    <BasicTable
        table-title="列表"
        tableTitleHelp="点击单元格给角色设置人员"
        class="matrix-list !pt-0 !pl-0 !pr-0 !pb-0 !h-full"
    >
      <template #name="{row}">
        <Tooltip placement="top" :mouseEnterDelay="0.3">
          <template #title> {{ row.name }} -【{{ row.code }}】 </template>
          {{ row.name }} -【{{ row.code }}】
        </Tooltip>
      </template>
      <template #customColumn="{row, column}">
        <div class="personal-items" :roleid="column.id" :rolename="column.name">
          <Space v-if="row[column.params.id] && row[column.params.id].length > 0">
            <Tag v-for="item in row[column.params.id]"
                :personalname="item.personalName"
                :personalcode="item.personalCode"
                class="personal-item"
                color="processing"
            >
              {{ item.personalName }}
              <Popconfirm
                  v-access:code="PerPrefix + PerEnum.DELETE"
                  title="确定要删除吗？"
                  @confirm="handleDeletePersonal(item.rspId, column.params.id, row.id)"
                  :okButtonProps="{danger: true}"
              >
                <CloseOutlined class="delete-btn" />
              </Popconfirm>
            </Tag>
          </Space>
          <div class="empty" v-else>设置人员</div>
        </div>
      </template>
    </BasicTable>
    <PersonalSelectorModal
        ref="personalSelectorModalRef"
        @change="handleSettingPersonalSuccess"
    />
  </ColPage>
</template>
<script lang="ts" setup>
  import { PerEnum } from '#/enums/perEnum';
  import { ref, unref, nextTick, onMounted } from 'vue';
  import { Tag, Space, message, Popconfirm, Tooltip } from 'ant-design-vue';
  import { CloseOutlined } from '@ant-design/icons-vue';
  import type { Recordable } from '@vben/types';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {VxeGridProps, VxeGridListeners} from '#/adapter/vxe-table';
  import PersonalSelectorModal from '#/components/selector/personal-selector/PersonalSelectorModal.vue';

  // import PersonalSelectorModal from '@/components/Selector/src/PersonalSelectorModal.vue';
  import CompanyTree from '#/views/components/leftTree/CompanyTree.vue';
  import { getMatrixRoleList } from '#/api/org/role';
  import {
    saveOrUpdateRoleScope,
    deleteMatrixPersonalById,
    getMatrixPersonal,
    getDeptMatrixList, getCompanyMatrixList,
  } from '#/api/flowsetting/rolePersonal';
  import { baseColumns, searchFormSchema } from './deptMatrix.data';
  import {ColPage} from '@vben/common-ui';
  import {useAccess} from "@vben/access";
  import {useVbenVxeGrid} from "#/adapter/vxe-table";

  const {hasAccessByCodes}  = useAccess();
  const PerPrefix = 'DeptMatrixRolePersonal:';
  const personalSelectorModalRef = ref(), exportMatrixRoleExcelModalRef = ref();

  // 人员选择弹窗
/*  const [
    registerPersonalModal,
    { openModal: openPersonalSelector, setModalProps: setPersonalModalProps },
  ] = useModal();*/
  // const { hasPermission } = usePermission();

  const currentRole = ref<Recordable<any>>({});
  const currentRow = ref<Recordable<any>>({});
  const currentNode = ref<Recordable<any>>({});

  const columns = ref([...baseColumns]);

  onMounted(() => {
    nextTick(() => {
      loadMatrixColumn();
    });
  });

  /*const [
    registerTable,
    { reload, setProps, setTableData, setColumns, setLoading, updateTableDataRecord },
  ] = useTable({
    title: '',
    size: 'small',
    api: getDeptMatrixList,
    columns: baseColumns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      showAdvancedButton: false,
      showResetButton: false,
      autoSubmitOnEnter: true,
    },
    immediate: false,
    expandRowByClick: false,
    useSearchForm: true,
    showIndexColumn: false,
    showTableSetting: false,
    bordered: true,
    pagination: false,
    rowKey: 'id',
    canResize: true,
    resizeHeightOffset: -12,
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
    columns: unref(columns),
    // columns: baseColumns,
    columnConfig: {resizable: true},
    height: 'auto',
    keepSource: true,
    border: false,
    stripe: true,
    pagerConfig: {
      enabled: false,
    },
    mouseConfig: {
      selected: true
    },
    rowConfig: {
      keyField: 'id',
      isHover: true,
    },
    treeConfig: {
      parentField: 'pid',
      rowField: 'id',
      transform: true,
    },
    proxyConfig: {
      ajax: {
        query: async ({page}, formValues) => {
          return await getDeptMatrixList(formValues);
        },
      },
      querySuccess: async (params) => {
        await loadMatrixColumn();
        // await handleScrollTag();
      }
    },
  };

  const gridEvents: VxeGridListeners = {
    cellClick: ({row, column, $event}) => {
      if (column.field === 'name'
          || $event?.target?.closest('.delete-btn')
          || $event?.target?.closest('.personal-item')) {
        return;
      }

      if (!hasAccessByCodes([PerPrefix + PerEnum.UPDATE])) {
        message.warn('无操作权限，请联系管理员！');
        return;
      }

      const personals = row[column.field]

      currentRole.value = column.params;
      currentRow.value = row;
      personalSelectorModalRef.value.open();
      personalSelectorModalRef.value.setData(personals);
    }
  };

  const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions, gridEvents});

  function resetColumns(cols: any) {
    debugger;
    columns.value = [
      ...columns.value,
      ...cols,
    ];
  }

  // 人员选择后回调
  async function handleSettingPersonalSuccess(selectedPersonal) {
    tableApi.setLoading(true);
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
    tableApi.setLoading(false);
  }

  async function reloadRolePersonal(roleId, orgId) {
    const {setRow, getRowById} = tableApi.grid;
    const res = await getMatrixPersonal({ orgId: orgId, roleId: roleId, orgType: 2 });
    await nextTick();
    const row = getRowById(orgId);
    const newRow = {...row}
    newRow[roleId] = res;
    await setRow(row, newRow)
  }

  // 加载矩阵列
  async function loadMatrixColumn() {
    const res = await getMatrixRoleList({ roleType: 2 });
    const {loadColumn} = tableApi.grid;
    const columns = res.map((item) => {
      return {
        params: item,
        title: item.name,
        field: 'customColumn_' + item.id,
        helpMessage: item.name + '【' + item.sn + '】',
        minWidth: 180,
        width: 180,
        align: 'left',
        slots: { default: 'customColumn' }
      };
    });
    columns.unshift({
      title: '部门名称',
      field: 'name',
      align: 'left',
      minWidth: 300,
      resizable: true,
      fixed: true,
      treeNode: true,
      slots: {default: 'name'}
    });
    await loadColumn(columns);
  }

  async function handleDeletePersonal(id, roleId, orgId) {
    tableApi.setLoading(true);
    const res = await deleteMatrixPersonalById({ id: id });

    const { success, msg } = res;
    if (success) {
      message.success(msg);
      reloadRolePersonal(roleId, orgId);
    } else {
      message.error(msg);
    }
    return Promise.resolve(true);
  }

  async function handleSelect(node: any) {
    currentNode.value = node;
    if (!node) {
      const {loadData} = tableApi.grid;
      loadData([]);
      return;
    }
    try {
      tableApi.reload({companyId: node.id});
    } finally {
    }
  }
</script>

<style lang="scss">
  .personal-items {
    height: 100%;
    position: relative;
    overflow: hidden;
    text-indent: 2px;
    .ant-space {
      gap: 2px 6px !important;
    }
    .ant-space-align-center {
      flex-flow: wrap;

      .ant-space-item {
        margin: 2px 0;
      }
    }
  }

  .matrix-list {
    .ant-table-content {
      .ant-table-tbody {
        tr {
          td:nth-child(n + 2) {
            padding: 0 !important;
          }
        }
      }
    }

    .ant-table-tbody > tr > td:nth-child(n + 2) {
      position: relative;
      &:hover {
        .personal-items {
          .empty {
            color: #666;
          }
        }
        &:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          background: rgba(100, 100, 100, 0.1);
          cursor: pointer;
        }
      }
      .personal-items {
        cursor: pointer;
        .ant-space-item {
          z-index: 1;
        }
        .empty {
          text-align: center;
          color: transparent;
        }
      }
    }

    .ant-table-row {
      td {
        padding: 0;
      }
    }
  }
</style>
