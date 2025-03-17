<template>
  <Page auto-content-height>
    <BasicTable
      ref="companyMatrixTable"
      @register="registerTable"
      @row-click="handleRowClick"
      @fetch-success="handleScrollTag"
      titleHelpMessage="点击单元格给角色设置人员"
      defaultExpandLevel="1"
      class="matrix-list !h-full"
    >
      <template #toolbar>
        <!--        <Authority :value="'App:'+PerEnum.ADD">

        </Authority>-->
        <Button :loading="exportLoading" type="link" @click="handleOpenExportModal"
          >导出模板</Button
        >
        <ImpExcel @success="loadDataSuccess" dateFormat="xlsx">
          <Button>
            <template #icon>
              <ImportOutlined />
            </template>
            导入Excel
          </Button>
        </ImpExcel>
      </template>
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
                <Authority :value="'CompanyMatrixRolePersonal:' + PerEnum.DELETE">
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
    <PersonalSelectorModal
      @register="registerPersonalModal"
      @change="handleSettingPersonalSuccess"
    />
    <ExportMatrixRoleExcelModal
      @register="registerExportMatrixRoleExcelModal"
      @success="defaultHeader"
    />
  </Page>
</template>
<script lang="ts" setup>
import {PerEnum} from '#/enums/perEnum';
import type { Recordable } from '@vben/types';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';

import {useAccess} from "@vben/access";
  import { ref, unref, nextTick, onMounted, h } from 'vue';
  import { Button, Tag, Space, Popconfirm, Tooltip, message } from 'ant-design-vue';
  import { ImportOutlined, CloseOutlined, DownloadOutlined } from '@ant-design/icons-vue';
import { TableAction } from '#/components/table-action';

  // import PersonalSelectorModal from '#/components/Selector/src/PersonalSelectorModal.vue';
  // import ExportMatrixRoleExcelModal from '#/views/flowsetting/components/ExportMatrixRoleExcelModal.vue';
import {Page} from '@vben/common-ui';
import {getMatrixRoleList, getRoleListByPage} from '#/api/org/role';
  import {
    saveOrUpdateRoleScope,
    deleteMatrixPersonalById,
    getMatrixPersonal,
    getCompanyMatrixList,
  } from '#/api/flowsetting/rolePersonal';
  import { baseColumns, searchFormSchema } from './companyMatrix.data';
  // import { jsonToSheetXlsx, ImpExcel, ExcelData } from '@/components/Excel';
  import { treeToList } from '#/utils/helper/treeHelper';
import {columns} from "#/views/flowsetting/rolePersonal/rolePersonal.data";
import {useVbenVxeGrid} from "#/adapter/vxe-table";

const {hasAccessByCodes}  = useAccess();
// const PerPrefix = "App:";

  // 人员选择弹窗
  // const [
  //   registerPersonalModal,
  //   { openModal: openPersonalSelector, setModalProps: setPersonalModalProps },
  // ] = useModal();

/*  const [
    registerExportMatrixRoleExcelModal,
    {
      closeModal: closeExportMatrixRoleExcelModal,
      openModal: openExportMatrixRoleExcelModal,
      setModalProps: setExportMatrixRoleExcelModalProps,
    },
  ] = useModal();*/
  // const { hasPermission } = usePermission();
  const currentRole = ref<Recordable<any>>({});
  const currentRow = ref<Recordable<any>>({});
  const currentNode = ref<Recordable<any>>({});
  const exportLoading = ref(false);
  const companyMatrixTable = ref();
  const matrixRoles = ref([]);

  onMounted(() => {
    nextTick(() => {
      // loadMatrixColumn();
    });
  });

  /*const [
    registerTable,
    {
      reload,
      getForm,
      setProps,
      setTableData,
      setColumns,
      setLoading,
      updateTableDataRecord,
      getDataSource,
    },
  ] = useTable({
    title: '列表',
    size: 'small',
    api: getCompanyMatrixList,
    columns: baseColumns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      showAdvancedButton: false,
      showResetButton: false,
      autoSubmitOnEnter: true,
    },
    immediate: true,
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
  columns: baseColumns,
  columnConfig: {resizable: true},
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        return await getCompanyMatrixList({
          query: {
            pageNum: page.currentPage,
            pageSize: page.pageSize,
          },
          entity: formValues || {},
        });
      },
      querySuccess: (params) => {
        loadMatrixColumn();
      }
    },
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});


  // 人员选择后回调
  function handleSettingPersonalSuccess(selectedPersonal) {
    setLoading(true);
    const personals = selectedPersonal.map((item) => item.code);
    const data = {
      orgId: unref(currentRow).id,
      orgType: 1,
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
            message.success(data.msg);
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
    getMatrixPersonal({ orgId: orgId, roleId: roleId, orgType: 1 }).then((res) => {
      nextTick(() => {
        const rolePersonal = {};
        rolePersonal[roleId] = res;
        updateTableDataRecord(orgId, rolePersonal);
      });
    });
  }

  // 加载矩阵列
  async function loadMatrixColumn() {
    const res = await getMatrixRoleList({ roleType: 1 });
    const {refreshColumn, loadColumn, getTableColumn, getColumns} = tableApi.grid;
    debugger;
    matrixRoles.value = res;
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
      title: '公司名称',
      dataIndex: 'name',
      align: 'left',
      minWidth: 300,
      width: 300,
      resizable: true,
      fixed: true,
      treeNode: true
    });
    loadColumn(columns);
  }

  function handleDeletePersonal(id, roleId, orgId) {
    setLoading(true);
    deleteMatrixPersonalById({ id: id })
      .then((res) => {
        const { data } = res;
        if (data.success) {
          message.success(data.msg);
          reloadRolePersonal(roleId, orgId);
        } else {
          message.error(data.msg);
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
        message.warn('无操作权限，请联系管理员！');
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
        title: `设置公司【${record.name}】->角色【${roleName}】下的人员`,
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

  function handleOpenExportModal() {
    // exportLoading.value = true;
    if (matrixRoles.value.length > 0) {
      openExportMatrixRoleExcelModal(true, {
        roles: matrixRoles.value,
        fileName: '公司矩阵角色',
      });
      setExportMatrixRoleExcelModalProps({
        width: 800,
        okText: '下载模板',
        okButtonProps: {
          icon: h(DownloadOutlined),
        },
      });
    } else {
      message.warn('无矩阵角色数据！');
    }
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
      const saveDataList = [];
      ok: for (let i = 0; i < results.length; i++) {
        let item = results[i];
        let orgId = item['公司ID'];
        let roleSn = '',
          roleId = '';
        for (let j = 0; j < header.length; j++) {
          let head = header[j];
          if (head != '公司ID' && head != '公司名称') {
            let saveData = { orgType: 1, orgId: orgId, roleVo: { roleId: '', personalCodes: [] } };
            roleSn = head.match(/(?<=_\()\S+(?=\))/gi);
            if (roleSn) {
              try {
                roleId = matrixRoles.value.find((itm) => itm.sn === roleSn[0]).id;
                saveData.roleVo.roleId = roleId;
                let personalListStr = item[head];
                // 角色下有人才加进数组
                if (personalListStr) {
                  let personalList = personalListStr.split(';');
                  if (personalList) {
                    for (let personal of personalList) {
                      let per = personal.split(':');
                      if (per[0] && per[0].trim()) {
                        saveData.roleVo.personalCodes.push(per[0].trim());
                      }
                    }
                  }
                  saveDataList.push(saveData);
                }
              } catch (e) {
                break ok;
              }
            }
          }
        }
      }
      if (saveDataList.length === 0) {
        message.error('未找到角色数据！');
        return;
      }

      // 开始调用插入接口
      if (saveDataList && saveDataList.length > 0) {
        setLoading(true);
        for (let index = 0; index < saveDataList.length; index++) {
          let saveData = saveDataList[index];
          const res = await saveOrUpdateRoleScope(saveData);
          const { data } = res;
          if (data.success) {
            // 根据角色ID和组织（部门）ID刷新某个单元格的数据
            reloadRolePersonal(saveData.roleVo.roleId, saveData.orgId);
          }
          if (index === saveDataList.length - 1) {
            setLoading(false);
            message.success('导入成功！');
          }
        }
      }
    }
  }

  // 横向查找
  async function handleScrollTag() {
    const form = getForm();
    const values = await form.validate();
    setTimeout(() => {
      if (values.roleKeyword) {
        const thList = companyMatrixTable.value.$el.querySelectorAll('.ant-table-thead th');
        for (let i = 0; i < thList.length; i++) {
          if (thList[i].textContent.indexOf(values.roleKeyword) != -1) {
            companyMatrixTable.value.$el.querySelector('.ant-table-body').scrollLeft =
              thList[i].offsetLeft - thList[0].offsetWidth;
            companyMatrixTable.value.$el.querySelector('.ant-table-header').scrollLeft =
              thList[i].offsetLeft - thList[0].offsetWidth;
            thList[i].classList.add('word-light');
            setTimeout(() => {
              thList[i].classList.remove('word-light');
            }, 500);
            break;
          }
        }
      }
    }, 100);
  }

  /**
   * 组装导出的Excel数据
   * @param roles
   */
  function genExcelData(roles) {
    const companies = getDataSource();
    const companiesList = treeToList(companies);
    const data = companiesList.map((item) => {
      const company = { companyId: item.id, companyName: item.name };
      roles.forEach((itm) => {
        const personals = item[itm.id];
        company[itm.sn] = '';
        if (personals) {
          company[itm.sn] = personals
            .map((it) => it.personalCode + ':' + it.personalName)
            .join('; ');
        }
      });
      return company;
    });

    const headerExt = {};
    const headerOrderField = [];
    roles.forEach((item) => {
      headerExt[item.sn] = item.name + '_(' + item.sn + ')';
      headerOrderField.push(item.sn);
    });

    return { data, headerExt, headerOrderField };
  }

  function defaultHeader(params) {
    setExportMatrixRoleExcelModalProps({
      loading: true,
      loadingTip: '正在下载...',
      confirmLoading: true,
    });
    const { selectedRows } = params;
    const { data, headerExt, headerOrderField } = genExcelData(selectedRows);

    jsonToSheetXlsx({
      data,
      filename: '公司矩阵角色.xlsx',
      header: {
        companyId: '公司ID',
        companyName: '公司名称',
        ...headerExt,
      },
      json2sheetOpts: {
        // 指定顺序
        header: ['companyId', 'companyName', ...headerOrderField],
      },
      write2excelOpts: {},
    });
    setTimeout(() => {
      setExportMatrixRoleExcelModalProps({
        loading: false,
        confirmLoading: false,
      });
      closeExportMatrixRoleExcelModal();
    }, 1000);
  }
</script>

<style lang="scss">
  .word-light {
    transition:
      transform 0.5s,
      background-color 0.5s !important;
    color: red !important;
    font-weight: bold !important;
  }
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
