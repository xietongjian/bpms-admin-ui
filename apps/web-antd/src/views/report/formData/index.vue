<template>
  <Page auto-content-height>
    <div class="p-4 h-full">
      <BasicTable
        @register="registerTable"
        @row-click="clickRow"
        @selection-change="changeSelection"
        @fetch-success="fetchSuccess"
        class="!pt-0 !pl-0 !pr-0 !pb-0"
      >
        <template #toolbar>
          <a-button type="primary" @click="handleLaunch"> 发起表单 </a-button>
          <a-button type="default" @click="handleExport"> 导出Excel </a-button>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <TableAction
              :actions="createActions(record)"
            />
          </template>
        </template>
      </BasicTable>
    </div>
    <BpmnPreviewModal ref="bpmnPreviewModalRef" @register="registerBpmnPreviewModal" />
    <ProcessFormModal @register="registerProcessFormModal" />
    <LaunchModal @register="registerLaunchModal" @success="handleSuccess" />

  </Page>
</template>
<script lang="ts" setup>
  import { ref, unref, watch, nextTick, onMounted } from 'vue';
  import type { Recordable } from '@vben/types';
  import type {VxeGridProps} from '#/adapter/vxe-table';
  import type {VbenFormProps} from '@vben/common-ui';
  import {PerEnum} from "#/enums/perEnum";

  import {Page} from '@vben/common-ui';
  import { useRouter } from 'vue-router';

  import { baseColumns, searchFormSchema } from './formCount.data';
  // import { BasicTree, TreeActionType, TreeItem } from '@/components/Tree';
  import {
    getCustomColumnsByFormCode,
    getCustomColumnsByFormId,
    getFormTree,
    exportExcel,
    getPagerModelCustomData, exportExcelByCode,
  } from '#/api/report/formCount';
  import { forEach } from '#/utils/helper/treeHelper';
  import {BpmnPreviewModal} from '#/views/components/preview';
  import ProcessFormModal from '../../flowoperation/processTask/ProcessFormModal.vue';
  import {downloadBlob} from "#/utils/file/download";
  import LaunchModal from '#/views/process/actions/LaunchModal.vue';

  const { currentRoute } = useRouter();

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

  const [
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
  });

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

  function createActions(record: Recordable) {
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
    const { setProps } = getForm();
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

  function handleViewForm(record: Recordable) {
    record.processInstanceId = record.proc_inst_id;
    record.businessKey = record.code;
    record.processDefinitionKey = record.model_key;

    openProcessFormModal(true, {
      record,
    });
    setProcessFormModalProps({
      width: 1000,
      title: `查看流程【${record.title}】的表单`,
      showOkBtn: false,
      centered: true,
      cancelText: '关闭',
      maskClosable: true,
    });
  }

  function handlePreview(record: Recordable) {
    openBpmnPreviewModal(true, {
      modelKey: record.model_key,
      procInstId: record.proc_inst_id,
    });
    setBpmnPreviewProps({
      title: `预览-${record.title}`,
      centered: true,
      useWrapper: false,
      showOkBtn: false,
      cancelText: '关闭',
    });
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
    reload();
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
    const { validate } = getForm();
    const values = validate();
    // values.formId = formCode.value;
    values.code = formCode.value;
    setProps({ searchInfo: values });
    reload();
    return;
  }
</script>

<style lang="less" scoped>
  .modelInfo-roles {
    > span {
      margin-right: 4px;
    }
  }
</style>
