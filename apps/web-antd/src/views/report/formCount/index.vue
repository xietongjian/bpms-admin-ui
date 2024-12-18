<template>
  <Page auto-content-height content-class="h-full">
    <div class="p-4 h-full">
      <Splitpanes class="default-theme h-full" >
        <Pane class="bg-transparent" min-size="20" size="30">
          <BasicTree
            title="表单分类"
            toolbar
            search
            treeWrapperClassName="h-[calc(100%-35px)] overflow-auto"
            :clickRowToExpand="false"
            :treeData="treeData"
            ref="basicTreeRef"
            @select="handleSelect"
          >
            <template #title="{ name, sourceType }">
              <!-- 如果是分类则不可点击 -->
              <span v-if="sourceType === '1'" style="color: gray">{{ name }}</span>
              <span v-else style="color: #1890ff">{{ name }}</span>
            </template>
          </BasicTree>
        </Pane>
        <Pane class="ml-2 bg-transparent" min-size="20" size="70">
          <BasicTable
            @register="registerTable"
            @row-click="clickRow"
            @selection-change="changeSelection"
            @fetch-success="fetchSuccess"
            class="!pt-0 !pl-0 !pr-0 !pb-0"
          >
            <template #toolbar>
              <a-button type="primary" @click="handleExport"> 导出Excel </a-button>
            </template>

            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'action'">
                <TableAction
                  :actions="[
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
                  ]"
                />
              </template>
            </template>
          </BasicTable>
        </Pane>
      </Splitpanes>
    </div>
    <BpmnPreviewModal ref="bpmnPreviewModalRef" @register="registerBpmnPreviewModal" />
    <ProcessFormModal @register="registerProcessFormModal" />
  </Page>
</template>
<script lang="ts" setup>
  import { ref, unref, watch, nextTick, onMounted } from 'vue';
  import { TableAction } from '#/components/table-action';
  import type { Recordable } from '@vben/types';
  import type {VxeGridProps} from '#/adapter/vxe-table';
  import type {VbenFormProps} from '@vben/common-ui';
  import {PerEnum} from "#/enums/perEnum";

  import {Page} from '@vben/common-ui';

  import { baseColumns, searchFormSchema } from './formCount.data';
  import { BasicTree, TreeActionType, TreeItem } from '@/components/Tree';
  import {
    getCustomColumnsByFormId,
    getFormTree,
    exportExcel,
    //exportExcelByCode,
    getPagerModelCustomData,
  } from '#/api/report/formCount';
  import { forEach } from '#/utils/helper/treeHelper';
  import { Splitpanes, Pane } from '#/components/splitpanes';
  // import BpmnPreviewModal from '#/views/components/preview/bpmnPreview/index.vue';
  import {BpmnPreviewModal} from '#/views/components/preview';
  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {listColumns} from "#/views/base/app/app.data";
  import {getAppListByPage} from "#/api/base/app";
  import {Button, Image, Tag, message} from 'ant-design-vue';

  // import ProcessFormModal from '../../flowoperation/processTask/ProcessFormModal.vue';
  // import {downloadBlob} from "#/utils/file/download";


/*  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '下载中...',
  });
  const [
    registerProcessFormModal,
    { openModal: openProcessFormModal, setModalProps: setProcessFormModalProps },
  ] = useModal();
  const [
    registerBpmnPreviewModal,
    { openModal: openBpmnPreviewModal, setModalProps: setBpmnPreviewProps },
  ] = useModal();*/
  const bpmnPreviewModalRef = ref();
  const treeData = ref<TreeItem[]>([]);
  const treeLoading = ref<boolean>(false);
  const basicTreeRef = ref<any>(null);
  const currentModelInfo = ref<Recordable<any>>({});
  const currentNode = ref<Recordable<any>>({});
  const loadingRef = ref(false);
  const showPublishBtn = ref(false);
  const showStopBtn = ref(false);

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
          return await getPagerModelCustomData({
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


  /**
   *  自定义搜索功能
   **/
  async function doSearchFunc() {
    const { setProps } = getForm();
    if (!unref(currentNode).id) {
      message.warning('请选择表单！');
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
    fetch();
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

  function handlePreview(record: Recordable<any>) {
    bpmnPreviewModalRef.value.setData({
      modelKey: record.model_key,
      procInstId: record.proc_inst_id,
    });
    bpmnPreviewModalRef.value.open();
    /*
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
    });*/
  }

  async function handleExport() {
    openFullLoading();
    const { validate } = getForm();
    const values = await validate();
    values.code = unref(currentNode).code;
    exportExcelByCode(values)
      .then((res) => {
        downloadBlob(res, '人员节点统计.xlsx');
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

  function handleSelect(node: any, e) {
    if (!e.selectedNodes[0]) {
      return;
    }
    const selectedNode = e.selectedNodes[0];
    if (selectedNode.sourceType === '1') {
      message.warning('请选择表单');
      return;
    }
    setLoading(true);
    // 查询表单的列数据
    getCustomColumnsByFormId({ formId: selectedNode.id })
      .then((res) => {
        let columns = res.map((item) => {
          return {
            title: item.column_comment,
            dataIndex: item.column_name,
            minWidth: 200,
            width: 200,
            resizable: true,
            align: 'left',
          };
        });
        setColumns(columns);
        getFormData();
        setLoading(false);
      })
      .catch((e) => {
        setColumns([]);
        setLoading(false);
      });
    currentNode.value = selectedNode;
  }

  function getFormData() {
    const { validate } = getForm();
    const values = validate();
    values.formId = unref(currentNode).id;
    setProps({ searchInfo: values });
    tableApi.reload();
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
