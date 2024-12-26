<template>
  <Page auto-content-height>
    <div class="flex flex-row h-full gap-2">
      <div class="w-60 h-full">
        <FlowCategoryTree @select="handleSelect" />
      </div>

      <BasicTable
          class="flex-1"
          @row-click="clickRow"
          @selection-change="changeSelection"
          @fetch-success="fetchSuccess"
      >
        <template #toolbar-tools >
          <div class="flex flex-row gap-2">
            <Tooltip
                v-if="hasAccessByCodes([PerPrefix + PerEnum.PUBLISH])"
                placement="bottom">
              <template #title>
                <span>只有状态为【待发布】的数据才能发布</span>
              </template>
              <Popconfirm
                  :title="`确定要发布【${currentModelInfo.name}】流程吗？`"
                  @confirm="handlePublish"
                  type="primary"
                  :disabled="!showPublishBtn"
              >
                <Button type="primary">发布</Button>
              </Popconfirm>
            </Tooltip>
            <Tooltip
                v-if="hasAccessByCodes([PerPrefix + PerEnum.PUBLISH])"
                placement="bottom">
              <template #title>
                <span>只有状态为【待发布/已发布】的数据才能停用</span>
              </template>
              <template >
                <Popconfirm
                    :title="`确定要停用【${currentModelInfo.name}】流程吗？`"
                    @confirm="handleStop"
                    color="error"
                    type="danger"
                    :disabled="!showStopBtn"
                >
                  <Button type="primary" danger>停用</Button>
                </Popconfirm>
              </template>
            </Tooltip>
            <template v-if="hasAccessByCodes([PerPrefix + PerEnum.ADD])">
              <Button type="primary" @click="handleCreate"> 新增</Button>
              <Button type="primary" @click="handleCopy"> 复制</Button>
            </template>
          </div>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <TableAction :stopButtonPropagation="true" :actions="createActions(record, column)" />
          </template>
          <template v-if="column.key === 'name'">
            <Avatar :src="record.modelIcon">
              <template #icon>
                <PictureFilled />
              </template>
            </Avatar>
            <Tooltip placement="top" :mouseEnterDelay="0.3">
              <template #title>
                {{ record.name }}
              </template>
              {{ record.name }}
            </Tooltip>
          </template>
          <template v-if="column.key === 'modelKey'">
            <Tooltip placement="top" :mouseEnterDelay="0.3">
              <template #title>
                {{ record.modelKey }}
              </template>
              {{ record.modelKey }}
            </Tooltip>
          </template>
          <template v-if="column.key === 'appName'">
            <span v-if="!record.appName">未设置</span>
            <Tooltip v-else placement="top" :mouseEnterDelay="0.3">
              <template #title> {{ record.appName }}【{{ record.appSn }}】 </template>
              {{ record.appName }}
            </Tooltip>
          </template>
        </template>
      </BasicTable>
    </div>
    <CopyModelInfoModal ref="copyModelInfoModalRef" @register="registerCopyModal" @success="handleSuccess" formType="custom" />
    <TaskFormDesignerModal ref="taskFormDesignerModalRef"
      @register="registerTaskFormModal"
      @success="handleTaskFormSuccess"
      :closeFunc="handleCloseFunc"
    />
    <BpmnPreviewModal ref="bpmnPreviewModalRef" @register="registerBpmnPreviewModal" @success="handleSuccess" />
    <BpmnDesignerModal ref="bpmnDesignerModalRef"
      @register="registerBpmnDesignerModal"
      @success="handleBpmnDesignerModalSuccess"
    />
  </Page>
</template>
<script lang="ts" setup>
  import { PerEnum } from '#/enums/perEnum';
  import { ref, unref, watch } from 'vue';
  import {useAccess} from '@vben/access';
  import type {Recordable} from '@vben/types';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {VxeGridProps} from '#/adapter/vxe-table';

  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {ColPage, Page} from '@vben/common-ui';
  import {TableAction} from '#/components/table-action';

  import { getModelInfoByModelKey } from '#/api/flowable/bpmn/modelInfo';
  import { getCustomPagerModel, deleteByIds, deployForm, stopForm } from '#/api/form/customForm';
  import { deleteFormById, getTaskFormInfoByModelKey } from '#/api/form/customTaskForm';
  import FlowCategoryTree from '#/views/components/leftTree/FlowCategoryTree.vue';
  import { PictureFilled } from '@ant-design/icons-vue';

  import CopyModelInfoModal from '#/views/form/components/CopyModelInfoModal.vue';
  import {BpmnPreviewModal} from '#/views/components/preview';
  import TaskFormDesignerModal from '#/views/form/components/TaskFormDesignerModal.vue';
  import BpmnDesignerModal from '#/views/form/components/BpmnDesignerModal.vue';
  import { Avatar, Button, Popconfirm, Tooltip, message } from 'ant-design-vue';
  import { columns, searchFormSchema } from './modelInfo.data';
  import {listColumns} from "#/views/base/app/app.data";
  import {getAppListByPage} from "#/api/base/app";
  // import { useMessage } from '@/hooks/web/useMessage';

  const PerPrefix = 'Custom:';

  const {hasAccessByCodes} = useAccess();


  const bpmnDesignerModalRef = ref();
  // const [registerCopyModal, { openModal: openCopyModal, setModalProps: setCopyModalProps }] =
  //   useModal();
  // const [
  //   registerBpmnPreviewModal,
  //   { openModal: openBpmnPreviewModal, setModalProps: setBpmnPreviewProps },
  // ] = useModal();
  // const [registerTaskFormModal, { openModal: openTaskFormModal, setModalProps: setTaskFormProps }] =
  //   useModal();
  // const [
  //   registerBpmnDesignerModal,
  //   { openModal: openBpmnDesignerModal, setModalProps: setBpmnDesignerModalProps },
  // ] = useModal();

  const formTableLoading = ref(false);
  const taskFormData = ref<object>({});

  const expandedRowKeys = ref([]);
  const currentModelInfo = ref<Recordable>({});
  const currentCategory = ref<Recordable>({});
  const loadingRef = ref(false);
  const showPublishBtn = ref(false);
  const showStopBtn = ref(false);
/*
  const [
    registerTable,
    { reload, getForm, updateTableDataRecord, getSelectRows, clearSelectedRowKeys },
  ] = useTable({
    title: '列表',
    api: getCustomPagerModel,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      showAdvancedButton: false,
      showResetButton: false,
      autoSubmitOnEnter: true,
    },
    clearSelectOnPageChange: true,
    rowSelection: { type: 'radio', columnWidth: 40 },
    afterFetch: (t) => {
      if (unref(currentModelInfo) && unref(currentModelInfo).modelKey) {
        reloadTaskForm(unref(currentModelInfo).modelKey);
      }
    },
    useSearchForm: true,
    showIndexColumn: false,
    bordered: true,
    rowKey: 'id',
    actionColumn: {
      width: 100,
      align: 'left',
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
    actionWrapperClass: 'col-span-2 col-start-3 text-left ml-4',
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

  const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});


  watch(
    () => unref(currentModelInfo),
    (v) => {
      if (!v.modelKey) {
        showPublishBtn.value = false;
        showStopBtn.value = false;
      }
    },
  );

  function reloadTaskForm(modelKey) {
    formTableLoading.value = true;
    taskFormData.value[unref(currentModelInfo).id] = [];
    getTaskFormInfoByModelKey({ modelKey: modelKey })
      .then((res) => {
        taskFormData.value[unref(currentModelInfo).id] = res;
      })
      .finally(() => {
        formTableLoading.value = false;
      });
  }

  function handleCreate() {
    if (!unref(currentCategory).code) {
      message.warning('请选择分类！', 2);
      return;
    }

    bpmnDesignerModalRef.value.setData({
      modelKey: '',
      modelId: '',
      formType: 'custom',
      categoryCode: unref(currentCategory).code,
    });
    bpmnDesignerModalRef.value.open();
    bpmnDesignerModalRef.value.setState({

    });

    /*openBpmnDesignerModal(true, {
      modelKey: '',
      modelId: '',
      formType: 'custom',
      categoryCode: unref(currentCategory).code,
    });*/
    /*setBpmnDesignerModalProps({
      title: `添加表单`,
      bodyStyle: { padding: '0px', margin: '0px' },
      defaultFullscreen: true,
      maskClosable: false,
      centered: true,
      keyboard: false,
      showOkBtn: false,
      showCancelBtn: false,
      draggable: false,
      canFullscreen: false,
      closable: false,
      destroyOnClose: true,
    });*/
  }

  function handleCloseFunc() {
    // 避免页面抖动
    setTimeout(() => {
      // 关闭时刷新子表单
      reloadTaskForm(unref(currentModelInfo).modelKey);
      // 关闭表单编辑弹窗时刷新单条数据
      getModelInfoByModelKey({ modelKey: unref(currentModelInfo).modelKey }).then((res) => {
        updateTableDataRecord(unref(currentModelInfo).id, {
          ...unref(currentModelInfo),
          showStatus: res.showStatus,
          status: res.status,
          statusName: res.statusName,
        });
        // 关闭后展开当前行
        expandedRowKeys.value = [unref(currentModelInfo).id];
      });
    }, 200);

    return Promise.resolve(true);
  }

  function createActions(record: Recordable, column: BasicColumn): ActionItem[] {
    let actions: ActionItem[] = [
      {
        auth: 'Custom:' + PerEnum.UPDATE,
        icon: 'clarity:note-edit-line',
        tooltip: '修改',
        label: '',
        onClick: handleEdit.bind(null, record),
      },
      {
        icon: 'ant-design:partition-outlined',
        tooltip: '流程图预览',
        label: '',
        onClick: handlePreview.bind(null, record),
      },
    ];
    return actions;
  }

  function handlePreview(record: Recordable) {
    openBpmnPreviewModal(true, {
      modelKey: record.modelKey,
    });
    setBpmnPreviewProps({
      title: `预览-${record.name}`,
      centered: true,
      useWrapper: false,
      showOkBtn: false,
      cancelText: '关闭',
    });
  }

  function handleEdit(record: Recordable) {
    const { modelKey, modelId, categoryCode } = record;
    const query = { modelKey, modelId, categoryCode, formType: 'custom' };
    openBpmnDesignerModal(true, { ...query });
    setBpmnDesignerModalProps({
      title: `添加表单`,
      bodyStyle: { padding: '0px', margin: '0px' },
      defaultFullscreen: true,
      maskClosable: false,
      keyboard: false,
      centered: true,
      showOkBtn: false,
      showCancelBtn: false,
      draggable: false,
      canFullscreen: false,
      closable: false,
      destroyOnClose: true,
    });
  }

  // 复制
  function handleCopy() {
    const selectedRows = getSelectRows();
    if (selectedRows && selectedRows.length <= 0) {
      message.warn('请选择行！');
      return;
    }
    openCopyModal(true, {
      record: selectedRows[0],
    });
    setCopyModalProps({
      title: '复制【' + selectedRows[0].name + '】表单、流程',
      width: 600,
    });
  }

  function publish(modelKey) {
    loadingRef.value = true;
    deployForm(modelKey)
      .then((res) => {
        const { data } = res;
        if (data.success) {
          message.success(data.msg, 2);
          reload();
        } else {
          message.error(data.msg, 2);
        }
      })
      .finally(() => {
        loadingRef.value = false;
      });
  }

  function stop(modelKey) {
    loadingRef.value = true;
    stopForm(modelKey)
      .then((res) => {
        const { data } = res;
        if (data.success) {
          message.success(data.msg, 2);
          tableApi.reload();
        } else {
          message.error(data.msg, 2);
        }
      })
      .finally(() => {
        loadingRef.value = false;
      });
  }

  function handlePublish(record: Recordable) {
    if (record.modelKey) {
      publish(record.modelKey);
    } else {
      const selectedRows = getSelectRows();
      if (selectedRows && selectedRows.length <= 0) {
        message.warn('请选择行！');
        return;
      }
      publish(selectedRows[0].modelKey);
    }
  }

  function handleStop(record: Recordable) {
    if (record.modelKey) {
      stop(record.modelKey);
    } else {
      const selectedRows = getSelectRows();
      if (selectedRows && selectedRows.length <= 0) {
        message.warn('请选择行！');
        return;
      }
      stop(selectedRows[0].modelKey);
    }
  }

  function handleSuccess() {
    setTimeout(() => {
      tableApi.reload();
    }, 500);
  }

  function handleBpmnDesignerModalSuccess() {
    setTimeout(() => {
      tableApi.reload();
    }, 500);
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
    const selectedRows = getSelectRows();
    if (selectedRows.length > 0) {
      changePublishStopBtnShow(selectedRows[0].status);
      currentModelInfo.value = selectedRows[0];
    } else {
      changePublishStopBtnShow(0);
      currentModelInfo.value = {};
    }
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

  async function handleSelect(node: any) {
    currentCategory.value = node;
    // const { setFieldsValue } = getForm();
    // await setFieldsValue({ categoryCode: node ? node.code : '' });
    tableApi.reload();
  }

  function handleTaskFormSuccess() {
    tableApi.reload();
  }
</script>

<style lang="less">
  .custom-task-table {
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
</style>

<style lang="less" scoped>
  .modelInfo-roles {
    > span {
      margin-right: 4px;
    }
  }
</style>
