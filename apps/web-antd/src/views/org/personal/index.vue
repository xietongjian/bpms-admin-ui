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
        <OrgTree class="h-full" @select="handleSelect" />
      </div>
    </template>
    <BasicTable @register="registerTable" class="!pt-0 !pl-0 !pr-0 !pb-0">
      <template #toolbar-tools>
        <Button v-if="hasAccessByCodes([PerPrefix + PerEnum.ADD])" type="link" @click="handleExportTemplate">导出模板</Button>
        <ImpExcel v-if="hasAccessByCodes([PerPrefix + PerEnum.ADD])" @success="loadDataSuccess" dateFormat="xlsx">
          <Button>
            <template #icon>
              <ImportOutlined />
            </template>
            导入Excel
          </Button>
        </ImpExcel>

        <PopConfirmButton v-if="hasAccessByCodes([PerPrefix + PerEnum.SYNC])"
                          title="同步需要花费一定的时间，确定要同步吗？"
                          @confirm="handleSyncAll"
                          type="primary"
        >
          全量同步
        </PopConfirmButton>
        <Button v-if="hasAccessByCodes([PerPrefix + PerEnum.ADD])" type="primary" @click="handleCreate">新增</Button>
      </template>

      <template #status="{ row }">
        <Tag v-if="row.status === 1" color="green">在职</Tag>
        <Tag v-else color="red">离职</Tag>
      </template>
      <template #action="{ row }">
        <TableAction
            :actions="createActions(row)"
        />
      </template>

      <template #name="{ row }">
        <EmpInfo :no="row.code" :name="row.name">
          <Badge>
            <template #count>
              <WomanOutlined
                  v-if="row.sex === 2"
                  style="color: #f5222d; font-size: 12px"
              />
              <ManOutlined v-else style="color: #1890ff; font-size: 12px" />
            </template>
            <Avatar :src="row.headImg" @click="previewImageHandle(row.headImg)">
              <template #icon>
                <UserOutlined />
              </template>
            </Avatar>
          </Badge>
          {{ row.name }}
        </EmpInfo>
      </template>

      <template #roles="{ row }">
        <div v-if="row.roles && row.roles.length > 0" class="personal-roles">
          <Popover title="角色详情" placement="left" class="role-details">
            <template #content>
              <div
                  class="personal-roles"
                  style="width: 300px; max-height: 400px; overflow: auto"
              >
                <div
                    class="mb-2"
                    v-if="row.roles.filter((item) => item.type === 0).length > 0"
                >
                  <h3 class="mb-0">人员角色</h3>
                  <Divider
                      style="height: 1px; background-color: #7cb305; margin: 0"
                      orientation="left"
                  />
                  <Tag
                      :color="role.type === 0 ? 'green' : role.type === 1 ? 'cyan' : 'blue'"
                      class="role-item"
                      v-for="role in row.roles.filter((item) => item.type === 0)"
                  >
                    {{ (role.companyName || '') + ' - ' + role.name }}
                  </Tag>
                </div>

                <div
                    class="mb-2"
                    v-if="row.roles.filter((item) => item.type === 1).length > 0"
                >
                  <h3 class="mb-0">公司矩阵角色</h3>
                  <Divider
                      style="height: 1px; background-color: #7cb305; margin: 0"
                      orientation="left"
                  />
                  <Tag
                      :color="role.type === 0 ? 'green' : role.type === 1 ? 'cyan' : 'blue'"
                      class="role-item"
                      v-for="role in row.roles.filter((item) => item.type === 1)"
                  >
                    {{ (role.companyName || '') + ' - ' + role.name }}
                  </Tag>
                </div>

                <div
                    class="mb-2"
                    v-if="row.roles.filter((item) => item.type === 2).length > 0"
                >
                  <h3 class="mb-0">部门矩阵角色</h3>
                  <Divider
                      style="height: 1px; background-color: #7cb305; margin: 0"
                      orientation="left"
                  />
                  <Tag
                      :color="role.type === 0 ? 'green' : role.type === 1 ? 'cyan' : 'blue'"
                      class="role-item"
                      v-for="role in row.roles.filter((item) => item.type === 2)"
                  >
                    {{ (role.companyName || '') + ' - ' + role.name }}
                  </Tag>
                </div>
              </div>
            </template>
            <div>
              <Tag>角色详情</Tag>
              <Badge
                  :count="row.roles.length"
                  :number-style="{ backgroundColor: '#52c41a' }"
              />
            </div>
          </Popover>
        </div>
        <div v-else>暂无</div>
      </template>

      <template #leaderName="{ row }">
        <EmpInfo :no="row.leaderCode" :name="row.leaderName" />
      </template>
    </BasicTable>

    <Image
      :width="0"
      :height="0"
      :src="previewImage"
      :preview="{ visible: previewImageVisible, onVisibleChange: previewImageVisibleChange }"
    />
    <PersonalModal ref="personalModalRef" @success="handleSuccess" />
    <!--    <PersonalSelector @register="registerPersonalModal" @success="handleSettingLeaderSuccess" />-->
    <PersonalSelectorModal @register="registerPersonalModal" @change="handleSettingLeaderSuccess" />
  </ColPage>
</template>
<script lang="ts" setup>
  import { PerEnum } from '#/enums/perEnum';
  import { ref, unref } from 'vue';
  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import { TableAction } from '#/components/table-action';
  import type { Recordable } from '@vben/types';
  import type {VxeGridProps} from '#/adapter/vxe-table';
  import type {VbenFormProps} from '@vben/common-ui';

  import {
    getPersonalPageList,
    allocationRoles,
    deleteByIds,
    syncPersonalById,
    syncAllPersonal,
    deletePersonalRole,
    setLeaderCode,
    downloadPersonalExcelTemplate,
    importPersonalExcelByData,
  } from '#/api/org/personal';
  import {ColPage, Page} from '@vben/common-ui';
  import OrgTree from '#/views/components/leftTree/OrgTree.vue';
  import { ManOutlined, ImportOutlined, WomanOutlined, UserOutlined } from '@ant-design/icons-vue';
  import {useAccess} from '@vben/access';

  import PersonalModal from './PersonalModal.vue';
  // import PersonalSelectorModal from '#/components/Selector/src/PersonalSelectorModal.vue';
  import {
    Tag,
    Popover,
    Popconfirm,
    Button,
    Avatar,
    Badge,
    Spin,
    Space,
      message,
    Divider,
    Image,
  } from 'ant-design-vue';

  import { columns, searchFormSchema } from './personal.data';
  import { EmpInfo } from '#/views/components/EmpInfo';

  // import { PopConfirmButton } from '@/components/Button';
  // import { ImpExcel, ExcelData, jsonToSheetXlsx } from '@/components/Excel';
  import type { Recordable } from '@vben/types';

  import { saveOrUpdateRoleScope } from '#/api/flowsetting/rolePersonal';

  // import { useLoading } from '@/components/Loading';

  const PerPrefix = 'Personal:';
  const {hasAccessByCodes} = useAccess();

  const personalModalRef = ref();


  // const [registerModal, { openModal: openEditModal, setModalProps: setEditModalProps }] =
  //   useModal();
  // 人员选择弹窗
  /*const [
    registerPersonalModal,
    { openModal: openPersonalSelector, setModalProps: setPersonalModalProps },
  ] = useModal();

  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '下载中...',
  });*/
  const currentPersonal = ref<Recordable<any>>({});
  const deleteRoleLoading = ref<object>({});
  const previewImage = ref<string>('');
  const previewImageVisible = ref<boolean>(false);
  const currentNode = ref<Recordable<any>>({});

  /*const [registerTable, { reload, setLoading }] = useTable({
    title: '列表',
    api: getPersonalPageList,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      showAdvancedButton: false,
      showResetButton: false,
      autoSubmitOnEnter: true,
    },
    searchInfo: {
      showRoles: true,
    },
    size: 'small',
    useSearchForm: true,
    showIndexColumn: false,
    bordered: true,
    actionColumn: {
      width: 150,
      title: '操作',
      dataIndex: 'action',
    },
    beforeFetch: (params) => {
      let searchInfo = {};
      if (currentNode.value?.sourceType === '1') {
        searchInfo = { companyId: unref(currentNode).id };
      } else if (currentNode.value?.sourceType === '2') {
        searchInfo = { deptId: unref(currentNode).id };
      }
      return { ...params, ...searchInfo };
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
          return await getPersonalPageList({
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
    let record = {};
    if (unref(currentNode)) {
      if (unref(currentNode).sourceType === '1') {
        record = { companyId: unref(currentNode).id };
      } else if (unref(currentNode).sourceType === '2') {
        record = { companyId: unref(currentNode).companyId, deptId: unref(currentNode).id };
      }
    }
    personalModalRef.value.setData(record);
    personalModalRef.value.open();
    personalModalRef.value.setState({
      title: `新增人员`,
    });
  }

  function handleSyncAll() {
    setLoading(true);
    syncAllPersonal()
      .then((res) => {
        setLoading(false);
        const { success, msg } = res.data;
        if (success) {
          message.success(msg);
          tableApi.reload();
        } else {
          message.error(msg);
        }
      })
      .catch((e) => {
        setLoading(false);
      });
  }

  function handleEdit(record: Recordable<any>) {
    personalModalRef.value.setData(record);
    personalModalRef.value.open();
    personalModalRef.value.setState({
      title: `修改人员`,
    });
  }

  function handleSettingLeader(record: Recordable<any>) {
    currentPersonal.value = record;
    let selectedList = [];
    if (record.leaderCode && record.leaderName) {
      selectedList.push({ id: record.id, code: record.leaderCode, name: record.leaderName });
    }

    openPersonalSelector(true, {
      selectorProps: {
        multiple: false,
        selectedList: selectedList,
        // res.map((itm:any)=>{return {code: itm.personalCode, name: itm.personalName}}),
      },
    });

    setPersonalModalProps({
      title: `给【${record.name}(${record.code})】设置领导`,
      bodyStyle: { padding: '0px', margin: '0px' },
      width: 850,
      showOkBtn: true,
      showCancelBtn: true,
    });
  }

  async function handleExportTemplate() {
    if (unref(currentNode).sourceType != '1') {
      message.warn('请选择公司！');
      return;
    }
    const params = { companyId: unref(currentNode).id, sourceType: 'PERSONAL' };
    openFullLoading();
    downloadPersonalExcelTemplate({ ...params, taskFinishFlag: false }).finally(() => {
      setTimeout(() => {
        closeFullLoading();
      }, 1500);
    });
  }

  /**
   * 导入数据
   * @param excelDataList
   */
  async function loadDataSuccess(excelDataList: ExcelData[]) {
    const dataList = excelDataList[0];
    const { header, results } = dataList;
    // 验证Excel数据的正确性
    if (results) {
      const saveDataList = [] as any;
      for (let i = 0; i < results.length; i++) {
        let item = results[i];
        let companyId = item['公司id'];
        let deptId = item['部门id'];
        let companyName = item['公司名称'];
        let deptName = item['部门名称'];
        let name = item['姓名'];
        let code = item['工号'];
        let mobile = item['手机号'];
        let positionName = item['岗位名称'];
        let jobGradeName = item['职级名称'];
        //
        if (companyId && deptId && name && code && mobile) {
          saveDataList.push({
            companyId: companyId,
            deptId: deptId,
            companyName: companyName,
            deptName: deptName,
            name: name,
            code: code,
            mobile: mobile,
            positionName: positionName,
            jobGradeName: jobGradeName,
          });
        }
      }
      if (saveDataList.length === 0) {
        message.warn('未找到可导入的数据！');
        return;
      }

      // 开始调用批量插入接口
      if (saveDataList && saveDataList.length > 0) {
        setLoading(true);
        try {
          const result = await importPersonalExcelByData(saveDataList);
          if (result.success) {
            tableApi.reload();
            message.success(result.msg);
          } else {
            message.error(result.msg);
          }
        } catch (e) {
          console.error('导入数据接口异常！', e);
        } finally {
          setLoading(false);
        }
      }
    }
  }

  async function handleSettingRoleSuccess(selectedRoles: any) {
    const roles = selectedRoles.map((item) => {
      return { id: item.id };
    });
    await allocationRoles({ personalId: unref(currentPersonal).id, roles: roles });
    reloadTable();
  }

  function handleSettingLeaderSuccess(selectedPersonals: any) {
    if (selectedPersonals && selectedPersonals.length > 0) {
      setLoading(true);
      setTimeout(() => {
        setLeaderCode({ leaderCode: selectedPersonals[0].code, id: unref(currentPersonal).id })
          .then(() => {
            reloadTable();
          })
          .finally(() => {
            setLoading(false);
          });
      }, 200);
    }
  }

  function handleDelete(record: Recordable<any>) {
    deleteByIds([record.id]).then((res) => {
      tableApi.reload();
    });
  }

  function handleSync(record: Recordable<any>) {
    setLoading(true);
    syncPersonalById({ id: record.id })
      .then((res) => {
        setLoading(false);
        const { success, msg } = res.data;
        if (success) {
          message.success(msg);
          tableApi.reload();
        } else {
          message.error(msg);
        }
      })
      .catch((e) => {
        setLoading(false);
      });
  }

  function handleSuccess() {
    setTimeout(() => {
      tableApi.reload();
    }, 200);
  }

  function previewImageHandle(headImg) {
    if (headImg) {
      previewImage.value = headImg;
      previewImageVisible.value = true;
    }
  }

  function previewImageVisibleChange(visible, prevVisible) {
    previewImageVisible.value = visible;
  }

  function confirmDeleteRole(personalId: string, roleId: string) {
    deleteRoleLoading.value[personalId] = true;
    deletePersonalRole({ personalId, roleId })
      .then(() => {
        reloadTable();
      })
      .finally(() => {
        deleteRoleLoading.value[personalId] = false;
      });
  }

  function reloadTable() {
    let searchInfo = {};
    if (currentNode.value?.sourceType === '1') {
      searchInfo = { companyId: unref(currentNode).id };
    } else if (currentNode.value?.sourceType === '2') {
      searchInfo = { deptId: unref(currentNode).id };
    }
    tableApi.reload({ searchInfo });
  }

  function handleSelect(node: any) {
    currentNode.value = node;
    reloadTable();
  }

  function createActions (row: Recordable<any>) {
    return [
        {
          auth: [PerPrefix + PerEnum.UPDATE],
          tooltip: '修改',
          icon: 'clarity:note-edit-line',
          onClick: handleEdit.bind(null, row),
        },
        {
          auth: [PerPrefix + PerEnum.DELETE],
          tooltip: '删除',
          icon: 'ant-design:delete-outlined',
          danger: true,
          popConfirm: {
            title: '是否确认删除',
            confirm: handleDelete.bind(null, row),
            okButtonProps: { danger: true },
          },
        },
        {
          auth: [PerPrefix + PerEnum.SYNC],
          tooltip: '同步',
          icon: 'ant-design:cloud-sync-outlined',
          popConfirm: {
            title: '是否同步用户信息？',
            placement: 'left',
            confirm: handleSync.bind(null, row),
          },
        },
      ];
    // :dropDownActions="[
    //   {
    //     auth: 'Personal:' + PerEnum.UPDATE,
    //         label: '设置领导',
    //       icon: 'ant-design:setting-outlined',
    //       onClick: handleSettingLeader.bind(null, record),
    //   },
    // ];
  }
</script>
