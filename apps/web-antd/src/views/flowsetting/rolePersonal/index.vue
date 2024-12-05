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
            class="role-personal !pt-0 !pl-0 !pr-0 !pb-0 !h-full"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'action'">
                <TableAction
                  :actions="[
                    {
                      auth: 'RolePersonal:' + PerEnum.ADD,
                      tooltip: '添加人员',
                      icon: 'ant-design:user-add',
                      onClick: handleAddPersonal.bind(null, record),
                    },
                  ]"
                />
              </template>
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
                <template #bodyCell="{ column, record: rcd }">
                  <template v-if="column.key === 'action'">
                    <TableAction
                      :actions="[
                        {
                          auth: 'RolePersonal:' + PerEnum.DELETE,
                          icon: 'ant-design:delete-outlined',
                          color: 'error',
                          tooltip: '删除',
                          popConfirm: {
                            title: '是否确认删除',
                            confirm: handleDeletePersonal.bind(null, rcd),
                          },
                        },
                      ]"
                    />
                  </template>

                  <template v-else-if="column.key === 'personalName'">
                    <EmpInfo :no="rcd.personalCode" :name="rcd.personalName" />
                  </template>
                </template>
              </BasicTable>
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
  import { ref, unref, nextTick, onMounted } from 'vue';
  import { useForm } from '@/components/Form/index';

  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import PersonalSelectorModal from '@/components/Selector/src/PersonalSelectorModal.vue';

  import { PageWrapper } from '@/components/Page';
  import CompanyTree from '@/views/components/leftTree/CompanyTree.vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useModal } from '@/components/Modal';
  import SplitPane from '@/views/components/splitPane/index.vue';
  import { EmpInfo } from '@/components/EmpInfo';

  import {
    companyRoleFormSchema,
    columns,
    personalColumns,
    searchFormSchema,
  } from './rolePersonal.data';
  import { getRoleListByPage, deleteByIds } from '@/api/org/role';
  import {
    deleteById,
    getPersonalsByRoleIdAndOrgId,
    saveOrUpdate,
  } from '@/api/flowsetting/rolePersonal';

  const { createMessage } = useMessage();

  // 人员选择弹窗
  const [
    registerPersonalModal,
    { openModal: openPersonalSelector, setModalProps: setPersonalModalProps },
  ] = useModal();

  const currentRole = ref<Recordable>({});
  const expandedRowKeys = ref([]);
  const searchPersonTxt = ref<object>({});

  const rolePersonalData = ref<object>({});

  const [registerForm, { resetSchema, setFieldsValue, updateSchema, resetFields, validate }] =
    useForm({
      schemas: companyRoleFormSchema,
      showActionButtonGroup: false,
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    });

  onMounted(() => {
    nextTick(() => {});
  });

  const currentNode = ref<Recordable>({});
  const personalTableLoading = ref(false);
  const roleLoading = ref(false);
  const [registerTable, { reload, setProps, setTableData, setPagination, setLoading }] = useTable({
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
  });

  // 人员选择后回调
  function handleSettingPersonalSuccess(selectedPersonal) {
    if (!selectedPersonal || selectedPersonal.length <= 0) {
      return;
    }
    setLoading(true);
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
        const { data } = result;
        if (data.success) {
          createMessage.success(data.msg, 2);
        } else {
          createMessage.error(data.msg, 2);
        }
      } else {
        createMessage.error('未指定公司，添加失败！', 2);
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
        personal: { keyword: keyword || '' },
      }).then((res) => {
        rolePersonalData.value[orgId + '_' + roleId] = res;
        personalTableLoading.value = false;
      });
    } else {
      createMessage.warning('未选择公司');
    }
  }

  // 人员选择弹窗
  function handleAddPersonal(record: Recordable, e) {
    e.stopPropagation();
    if (!unref(currentNode).id) {
      createMessage.warning('未选择公司');
      return;
    }
    currentRole.value = record;
    openPersonalSelector(true, {
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

  function handleDeletePersonal(record: Recordable) {
    deleteById(record.id)
      .then(() => {
        reloadRolePersonal(unref(currentRole).id, '');
      })
      .finally(() => {});
  }

  async function handleSelect(node: any) {
    roleLoading.value = true;
    currentNode.value = node;
    rolePersonalData.value = {};
    expandedRowKeys.value = [];
    if (!node) {
      setTableData([]);
      setPagination({ total: 0, current: 1 });
      return;
    }
    try {
      setProps({
        searchInfo: { companyId: node.id },
      });
      reload();
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

<style lang="less">
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
