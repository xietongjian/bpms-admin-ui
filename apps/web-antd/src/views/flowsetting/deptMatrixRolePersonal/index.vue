<template>
  <PageWrapper dense contentFullHeight fixedHeight class="h-full">
    <div class="p-4 h-full">
      <SplitPane>
        <template #left>
          <CompanyTree @select="handleSelect" class="h-full" />
        </template>
        <template #main>
          <BasicTable
            @register="registerTable"
            @row-click="handleRowClick"
            titleHelpMessage="点击单元格给角色设置人员"
            class="matrix-list !pt-0 !pl-0 !pr-0 !pb-0 !h-full"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'name'">
                <Tooltip placement="top" :mouseEnterDelay="0.3">
                  <template #title> {{ record.name }} -【{{ record.code }}】 </template>
                  {{ record.name }} -【{{ record.code }}】
                </Tooltip>
              </template>

              <template v-if="column.key.indexOf('customColumn_') !== -1">
                <div class="personal-items" :roleid="column.id" :rolename="column.name">
                  <Space v-if="record[column.id] && record[column.id].length > 0">
                    <Tag
                      v-for="item in record[column.id]"
                      :personalname="item.personalName"
                      :personalcode="item.personalCode"
                      class="personal-item"
                      color="processing"
                    >
                      {{ item.personalName }}
                      <Authority :value="'DeptMatrixRolePersonal:' + PerEnum.DELETE">
                        <Popconfirm
                          title="确定要删除吗？"
                          @confirm="handleDeletePersonal(item.rspId, column.id, record.id)"
                        >
                          <CloseOutlined class="delete-btn" />
                        </Popconfirm>
                      </Authority>
                    </Tag>
                  </Space>
                  <div class="empty" v-else>设置人员</div>
                </div>
              </template>
            </template>
          </BasicTable>
        </template>
      </SplitPane>
    </div>
    <PersonalSelectorModal
      @register="registerPersonalModal"
      @change="handleSettingPersonalSuccess"
    />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PerEnum } from '@/enums/perEnum';
  import { Authority } from '@/components/Authority';
  import { ref, unref, nextTick, onMounted } from 'vue';
  import { Tag, Space, Popconfirm, Tooltip } from 'ant-design-vue';
  import { CloseOutlined } from '@ant-design/icons-vue';
  import { BasicTable, useTable } from '@/components/Table';
  import PersonalSelectorModal from '@/components/Selector/src/PersonalSelectorModal.vue';
  import CompanyTree from '@/views/components/leftTree/CompanyTree.vue';
  import { PageWrapper } from '@/components/Page';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useModal } from '@/components/Modal';
  import { getMatrixRoleList } from '@/api/org/role';
  import {
    saveOrUpdateRoleScope,
    deleteMatrixPersonalById,
    getMatrixPersonal,
    getDeptMatrixList,
  } from '@/api/flowsetting/rolePersonal';
  import { baseColumns, searchFormSchema } from './deptMatrix.data';
  import SplitPane from '@/views/components/splitPane/index.vue';
  import { usePermission } from '@/hooks/web/usePermission';

  const { createMessage } = useMessage();

  // 人员选择弹窗
  const [
    registerPersonalModal,
    { openModal: openPersonalSelector, setModalProps: setPersonalModalProps },
  ] = useModal();
  const { hasPermission } = usePermission();

  const currentRole = ref<Recordable>({});
  const currentRow = ref<Recordable>({});
  const currentNode = ref<Recordable>({});

  onMounted(() => {
    nextTick(() => {
      loadMatrixColumn();
    });
  });

  const [
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
  });

  // 人员选择后回调
  function handleSettingPersonalSuccess(selectedPersonal) {
    setLoading(true);
    const personals = selectedPersonal.map((item) => item.code);
    const data = {
      orgId: unref(currentRow).id,
      orgType: 2,
      roleVo: {
        roleId: unref(currentRole).id,
        personalCodes: personals,
      },
    };
    setTimeout(() => {
      saveOrUpdateRoleScope(data)
        .then((res) => {
          const { data } = res;
          if (data.success) {
            createMessage.success(data.msg);
            // 根据角色ID和组织（部门）ID刷新某个单元格的数据
            reloadRolePersonal(unref(currentRole).id, unref(currentRow).id);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }, 200);
  }

  function reloadRolePersonal(roleId, orgId) {
    // 加载当前一个单元格的时候导致表格布局错乱，暂时屏蔽
    getMatrixPersonal({ orgId: orgId, roleId: roleId, orgType: 2 }).then((res) => {
      nextTick(() => {
        const rolePersonal = {};
        rolePersonal[roleId] = res;
        updateTableDataRecord(orgId, rolePersonal);
      });
    });
  }

  // 加载矩阵列
  function loadMatrixColumn() {
    getMatrixRoleList({ roleType: 2 }).then((res) => {
      if (res) {
        const columns = res.map((item) => {
          return {
            ...item,
            title: item.name,
            dataIndex: 'customColumn_' + item.id,
            helpMessage: item.name + '【' + item.sn + '】',
            minWidth: 180,
            width: 180,
            align: 'left',
          };
        });
        columns.unshift({
          title: '部门名称',
          dataIndex: 'name',
          align: 'left',
          minWidth: 300,
          width: 300,
          resizable: true,
          fixed: true,
        });
        setColumns(columns);
      }
    });
  }

  function handleDeletePersonal(id, roleId, orgId) {
    setLoading(true);
    deleteMatrixPersonalById({ id: id })
      .then((res) => {
        const { data } = res;
        if (data.success) {
          createMessage.success(data.msg);
          reloadRolePersonal(roleId, orgId);
        } else {
          createMessage.error(data.msg);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleRowClick(record, index, event) {
    const pItemHandleEl = event.target.querySelector('.personal-items');

    const delBtn = event.target.closest('.delete-btn');
    if (delBtn) {
      event.stopPropagation();
      return;
    }

    if (pItemHandleEl) {
      const pItemEl = pItemHandleEl;
      if (!hasPermission('DeptMatrixRolePersonal:' + PerEnum.UPDATE, '')) {
        createMessage.warn('无操作权限，请联系管理员！');
        return;
      }
      // 获取当前已有的人员
      const items = pItemEl.querySelectorAll('.personal-item');
      const selectedList = [];
      if (items) {
        items.forEach((item) => {
          const name = item.getAttribute('personalname');
          const code = item.getAttribute('personalcode');
          selectedList.push({ name: name, label: name, value: code, code: code });
        });
      }

      const roleId = pItemEl.getAttribute('roleid');
      const roleName = pItemEl.getAttribute('rolename');
      currentRole.value = { id: roleId };
      currentRow.value = record;
      openPersonalSelector(true, {
        selectorProps: {
          multiple: true,
          selectedList: selectedList,
        },
      });

      setPersonalModalProps({
        title: `设置部门【${record.name}】->角色【${roleName}】下的人员`,
        bodyStyle: { padding: '0px', margin: '0px' },
        width: 850,
        showOkBtn: true,
        showCancelBtn: true,
      });
    }
  }

  async function handleSelect(node: any) {
    currentNode.value = node;
    if (!node) {
      setTableData([]);
      return;
    }
    try {
      setProps({
        searchInfo: { companyId: node.id },
      });
      reload();
    } finally {
    }
  }
</script>

<style lang="less">
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
