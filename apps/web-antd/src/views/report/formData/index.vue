<template>
  <Page auto-content-height>
    <BasicTable
        @row-click="clickRow"
        @selection-change="changeSelection"
        @fetch-success="fetchSuccess"
    >
      <template #toolbar>
        <Button type="primary" @click="handleLaunch"> 发起表单 </Button>
        <Button type="default" @click="handleExport"> 导出Excel </Button>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
              :actions="createActions(record)"
          />
        </template>
      </template>
    </BasicTable>
    <BpmnPreviewModal ref="bpmnPreviewModalRef" @register="registerBpmnPreviewModal" />
    <ProcessFormPreviewDrawer ref="processFormPreviewDrawerRef" @register="registerProcessFormModal" />
    <LaunchModal ref="launchModalRef" @register="registerLaunchModal" @success="handleSuccess" />

  </Page>
</template>
<script lang="ts" setup>
  import { ref, unref, watch, nextTick, onMounted } from 'vue';
  import type { Recordable } from '@vben/types';
  import type {VxeGridProps, VxeGridListeners} from '#/adapter/vxe-table';
  import type {VbenFormProps} from '@vben/common-ui';
  import {PerEnum} from "#/enums/perEnum";
  import {TableAction} from '#/components/table-action';

  import {Page} from '@vben/common-ui';
  import { useRouter } from 'vue-router';
  import { Avatar, Button, Popconfirm, Tooltip, message } from 'ant-design-vue';

  import { baseColumns, searchFormSchema } from './formCount.data';
  // import { BasicTree, TreeActionType, TreeItem } from '@/components/Tree';
  import {
    // getCustomColumnsByFormCode,
    getCustomColumnsByFormId,
    getFormTree,
    exportExcel,
    getPagerModelCustomData,
    exportExcelByCode,
  } from '#/api/report/formCount';
  import { forEach } from '#/utils/helper/treeHelper';
  import {BpmnPreviewModal, ProcessFormPreviewDrawer} from '#/views/components/preview';
  import {downloadBlob} from "#/utils/file/download";
  import LaunchModal from '#/views/process/actions/LaunchModal.vue';
  import {columns} from "#/views/form/custom/modelInfo/modelInfo.data";
  import {getCustomPagerModel} from "#/api/form/customForm";
  import {useVbenVxeGrid} from "#/adapter/vxe-table";

  const { currentRoute } = useRouter();

  const bpmnPreviewModalRef = ref(),
      processFormPreviewDrawerRef = ref();
/*
  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '下载中...',
  });
  const [
    registerProcessFormModal,
    { openModal: openProcessFormModal, setModalProps: setProcessFormModalProps },
  ] = useModal();
  const [
    registerBpmnPreviewModal,
    { openModal: openBpmnPreviewModal, setModalProps: setBpmnPreviewProps },
  ] = useModal();
  const [registerLaunchModal, {openModal: openLaunchModal, setModalProps: setLaunchModalProps}] = useModal();

*/

  const treeData = ref<any[]>([]);
  const treeLoading = ref<boolean>(false);
  const basicTreeRef = ref<any>(null);
  const currentModelInfo = ref<Recordable<any>>({});
  const currentNode = ref<Recordable<any>>({});
  const loadingRef = ref(false);
  const showPublishBtn = ref(false);
  const showStopBtn = ref(false);
  const formCode = ref('');

  /*const [
    registerTable,
    {
      getForm,
      reload,
      setProps,
      setTableData,
      setColumns,
      setLoading,
      getSelectRows,
      setSelectedRowKeys,
      clearSelectedRowKeys,
    },
  ] = useTable({
    title: '列表',
    api: getPagerModelCustomData,
    immediate: false,
    columns: baseColumns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      showAdvancedButton: false,
      showResetButton: false,
      autoSubmitOnEnter: true,
      submitFunc: doSearchFunc,
      fieldMapToTime: [['dateRange', ['startTime', 'endTime'], 'YYYY-MM-DD']],
    },
    useSearchForm: true,
    showIndexColumn: true,
    bordered: true,
    rowKey: 'id',
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
    wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    actionWrapperClass: 'col-span-2 col-start-2 text-left ml-4',
    resetButtonOptions: {
      show: false,
    },
    schema: searchFormSchema,
  };

  const gridOptions: VxeGridProps = {
    columns: baseColumns,
    columnConfig: {resizable: true},
    height: 'auto',
    maxHeight: '100%',
    border: false,
    keepSource: true,
    autoResize: false,
    stripe: true,
    round: false,
    radioConfig: {
      highlight: true,
      labelField: 'name',
      trigger: 'row',
    },
    proxyConfig: {
      ajax: {
        query: async ({page}, formValues) => {
          currentModelInfo.value = {};
          return await getCustomPagerModel({
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

  const gridEvents: VxeGridListeners = {
    radioChange: ({row}) => {
      // clickRow(row);
    }
  };

  const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions, gridEvents});


  function handleLaunch() {
    if(!formCode.value){
      message.warning('表单标识不能为空！');
      return;
    }
    openLaunchModal(true, {
      modelKey: formCode.value,
      viewType: 'launch',
    });
    setLaunchModalProps({
      title: '发起审批',
      bodyStyle: {padding: '0px', margin: '0px'},
      defaultFullscreen: true,
      maskClosable: false,
      centered: true,
      showOkBtn: false,
      showCancelBtn: false,
      draggable: false,
      canFullscreen: false,
      closable: false,
      destroyOnClose: true,
    });
  }

  function createActions(record: Recordable<any>) {
    return [
      {
        label: '',
        tooltip: '查看表单',
        icon: 'ant-design:pic-right-outlined',
        onClick: handleViewForm.bind(null, record),
      },
      {
        icon: 'ant-design:partition-outlined',
        tooltip: '流程图预览',
        onClick: handlePreview.bind(null, record),
      },
    ];
  }

  /**
   *  自定义搜索功能
   **/
  async function doSearchFunc() {
    const { setProps } = tableApi.formApi;
    if (!formCode.value) {
      message.warning('表单标识不能为空！');
      return;
    }
    try {
      await setProps({
        submitButtonOptions: {
          loading: true,
        },
      });
      getFormData();
    } catch (error) {
    } finally {
      setProps({
        submitButtonOptions: {
          loading: false,
        },
      });
    }
  }

  function fetch() {
    treeLoading.value = true;
    getFormTree()
      .then((res) => {
        treeData.value = res as unknown as TreeItem[];
        // 设置展开的树形节点，将所有非表单的节点全部展开
        nextTick(() => {
          let categoryKeys = [];
          res &&
            forEach(
              res,
              (node) => {
                // 此设置是为了跟人员的code属性保持一致，作为已选择项的唯一判定标准
                if (node.sourceType === '1') {
                  categoryKeys.push(node.id);
                }
              },
              { id: 'id', children: 'children', pid: 'pid' },
            );
          // 加载后展开节层级
          if (categoryKeys) {
            unref(basicTreeRef).setExpandedKeys(categoryKeys);
          }
        });
      })
      .finally(() => {
        treeLoading.value = false;
      });
  }

  onMounted(() => {
    debugger;
    const { path } = unref(currentRoute);
    formCode.value = path.substring(path.lastIndexOf('/') + 1);
    fetchFormData();
  });
  watch(
    () => unref(currentModelInfo),
    (v) => {
      if (!v.modelKey) {
        showPublishBtn.value = false;
        showStopBtn.value = false;
      }
    },
  );

  function handleViewForm(record: Recordable<any>) {
    record.processInstanceId = record.proc_inst_id;
    record.businessKey = record.code;
    record.processDefinitionKey = record.model_key;

    processFormPreviewDrawerRef.value.setData(record);
    processFormPreviewDrawerRef.value.setState({
      title: `查看流程【${record.title}】的表单`
    });
    processFormPreviewDrawerRef.value.open();
  }

  function handlePreview(record: Recordable<any>) {
    bpmnPreviewModalRef.value.setData({
      modelKey: record.model_key,
      procInstId: record.proc_inst_id,
    });
    bpmnPreviewModalRef.value.open();
  }

  async function handleExport() {
    openFullLoading();
    const { validate } = getForm();
    const values = await validate();
    values.code = formCode.value;

    exportExcelByCode(values)
      .then((res) => {
        downloadBlob(res, '流程表单统计.xlsx');
      })
      .finally(() => {
        setTimeout(() => {
          closeFullLoading();
        }, 500);
      });
  }

  function handleSuccess() {
    tableApi.reload();
  }

  function changePublishStopBtnShow(status) {
    if (status === 2) {
      showPublishBtn.value = true;
    } else {
      showPublishBtn.value = false;
    }
    if (status === 3 || status === 2) {
      showStopBtn.value = true;
    } else {
      showStopBtn.value = false;
    }
  }

  function clickRow(e) {
    changePublishStopBtnShow(e.status);
    currentModelInfo.value = e;
    setSelectedRowKeys(e.id);
  }

  function fetchSuccess(e) {
    clearSelectedRowKeys();
    const selectedRows = getSelectRows();
    if (selectedRows && selectedRows.length > 0) {
      currentModelInfo.value = selectedRows[0];
    } else {
      currentModelInfo.value = {};
    }
  }

  function changeSelection({ keys, rows }) {
    if (!rows[0]) {
      return;
    }
    currentModelInfo.value = rows[0];
    changePublishStopBtnShow(rows[0].status);
  }

  function fetchFormData() {
    if (!formCode.value) {
      return;
    }
    openFullLoading();
    // 查询表单的列数据
    getCustomColumnsByFormCode({ formCode: formCode.value })
      .then((res) => {
        let columns = res.map((item) => {
          return {
            title: item.column_comment,
            dataIndex: item.column_name,
            minWidth: 200,
            width: 200,
            resizable: true,
            align: 'left',
            columnDetail: item,
          };
        });
        setColumns(columns);
        getFormData();
        closeFullLoading();
      })
      .catch((e) => {
        setColumns([]);
        closeFullLoading();
      });
  }

  function getFormData() {
    const { validate } = tableApi.formApi;
    const values = validate();
    // values.formId = formCode.value;
    values.code = formCode.value;
    setProps({ searchInfo: values });
    tableApi.reload();
    return;
  }
</script>

<style lang="scss" scoped>
  .modelInfo-roles {
    > span {
      margin-right: 4px;
    }
  }
</style>
