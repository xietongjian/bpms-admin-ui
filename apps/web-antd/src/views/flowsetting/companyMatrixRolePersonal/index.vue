<template>
  <Page auto-content-height>
    <BasicTable
      table-title="列表"
      ref="companyMatrixTable"
      tableTitleHelp="点击单元格给角色设置人员"
      class="matrix-list"
    >
      <template #toolbar-tools>
        <!--        <Authority :value="'App:'+PerEnum.ADD">
        </Authority>-->
        <Button :loading="exportLoading" type="link" @click="handleOpenExportModal" >导出模板</Button>
<!--        <ImpExcel @success="loadDataSuccess" dateFormat="xlsx">
          <Button>
            <template #icon>
              <ImportOutlined />
            </template>
            导入Excel
          </Button>
        </ImpExcel>-->
      </template>

      <template #name="{row}">
        <Tooltip placement="top" :mouseEnterDelay="0.3">
          <template #title> {{ row.name }} -【{{ row.code }}】 </template>
          {{ row.name }} -【{{ row.code }}】
        </Tooltip>
      </template>

      <template #customColumn="{row, column}">
        <div class="personal-items" :roleid="column.params.id" :rolename="column.name">
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
    <ExportMatrixRoleExcelModal
      ref="exportMatrixRoleExcelModalRef"
      @success="defaultHeader"
    />
  </Page>
</template>
<script lang="ts" setup>
import {PerEnum} from '#/enums/perEnum';
import type { Recordable } from '@vben/types';
import type {VxeGridProps, VxeGridListeners} from '#/adapter/vxe-table';

import type {VbenFormProps} from '@vben/common-ui';
import PersonalSelectorModal from '#/components/selector/personal-selector/PersonalSelectorModal.vue';
import {useVbenVxeGrid} from "#/adapter/vxe-table";

import {useAccess} from "@vben/access";
  import { ref, unref, nextTick, onMounted, h } from 'vue';
  import { Button, Tag, Space, Popconfirm, Tooltip, message } from 'ant-design-vue';
  import { ImportOutlined, CloseOutlined, DownloadOutlined } from '@ant-design/icons-vue';

  // import PersonalSelectorModal from '#/components/Selector/src/PersonalSelectorModal.vue';
  import ExportMatrixRoleExcelModal from '#/views/flowsetting/components/ExportMatrixRoleExcelModal.vue';
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

const {hasAccessByCodes}  = useAccess();

const PerPrefix = 'CompanyMatrixRolePersonal:';

const personalSelectorModalRef = ref(), exportMatrixRoleExcelModalRef = ref();

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
  const currentRole = ref<Recordable<any>>({});
  const currentRow = ref<Recordable<any>>({});
  const exportLoading = ref(false);
  const companyMatrixTable = ref();
  const matrixRoles = ref([]);

  onMounted(() => {
    nextTick(() => {
      loadMatrixColumn();
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
  actionWrapperClass: 'col-span-3 col-start-3 text-left ml-4',
  resetButtonOptions: {
    show: false,
  },
  schema: searchFormSchema,
};

const gridOptions: VxeGridProps<any> = {
  showHeaderOverflow: true,
  showOverflow: false,
  columns: baseColumns,
  columnConfig: {resizable: true},
  height: 'auto',
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
        return await getCompanyMatrixList(formValues);
      },
      querySuccess: async (params) => {
        await loadMatrixColumn();
        await handleScrollTag();
      }
    },
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
  // 人员选择后回调
  async function handleSettingPersonalSuccess(selectedPersonal) {
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
    const {success, msg} = await saveOrUpdateRoleScope(data);
    if (success) {
      message.success(msg);
      // 根据角色ID和组织（部门）ID刷新某个单元格的数据
      await reloadRolePersonal(unref(currentRole).id, unref(currentRow).id);
    }
  }

  async function reloadRolePersonal(roleId, orgId) {
    const {setRow, getRowById} = tableApi.grid;
    const res = await getMatrixPersonal({ orgId: orgId, roleId: roleId, orgType: 1 });
    await nextTick();
    const row = getRowById(orgId);
    const newRow = {...row}
    newRow[roleId] = res;
    await setRow(row, newRow)
  }

  // 加载矩阵列
  async function loadMatrixColumn() {
    const res = await getMatrixRoleList({ roleType: 1 });
    const {loadColumn} = tableApi.grid;
    matrixRoles.value = res;
    const columns = res.map((item) => {
      return {
        params: item,
        title: item.name,
        field: 'customColumn_' + item.id,
        helpMessage: item.name + '【' + item.sn + '】',
        minWidth: 200,
        align: 'left',
        slots: { default: 'customColumn'}
      };
    });
    columns.unshift({
      title: '公司名称',
      field: 'name',
      align: 'left',
      minWidth: 300,
      resizable: true,
      fixed: 'left',
      treeNode: true,
      slots: { default: 'name'}
    });
    await loadColumn(columns);
  }

  async function handleDeletePersonal(id, roleId, orgId) {
    setLoading(true);
    const res = await deleteMatrixPersonalById({ id: id });
    const { success, msg } = res;
    if (success) {
      message.success(msg);
      reloadRolePersonal(roleId, orgId);
    } else {
      message.error(msg);
    }
    setLoading(false);
    return Promise.resolve(true);
  }

  function handleOpenExportModal() {
    // exportLoading.value = true;
    if (matrixRoles.value.length > 0) {
      exportMatrixRoleExcelModalRef.value.setData({
        roles: matrixRoles.value,
        fileName: '公司矩阵角色',
      });
      exportMatrixRoleExcelModalRef.value.setState({
        title: '下载模板'
      });

      exportMatrixRoleExcelModalRef.value.open();

      /*openExportMatrixRoleExcelModal(true, {
        roles: matrixRoles.value,
        fileName: '公司矩阵角色',
      });
      setExportMatrixRoleExcelModalProps({
        width: 800,
        okText: '下载模板',
        okButtonProps: {
          icon: h(DownloadOutlined),
        },
      });*/
    } else {
      message.warn('无矩阵角色数据！');
    }
  }

  /**
   * 导入数据
   * @param excelDataList
   */
  async function loadDataSuccess(excelDataList: any[]) {
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

  function setLoading(loading) {

  }

  // 横向查找
  async function handleScrollTag() {
    const form = tableApi.formApi;

    const {scrollToColumn, getColumns} = tableApi.grid;

    const values = await form.getValues();
    if (values.roleKeyword) {
      const columns = getColumns();
      const col = columns.find(item => {
        return item.title.indexOf(values.roleKeyword) !== -1;
      });
      if(!col){
        return;
      }
      col.headerClassName = 'word-light';
      await scrollToColumn(col);
    }
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
    //height: 100%;
    //position: relative;
    //overflow: hidden;
    text-indent: 2px;
    white-space: normal !important;
    word-break: break-all;
    overflow-wrap: break-word;
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
