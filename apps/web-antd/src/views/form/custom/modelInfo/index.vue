<template>
  <ColPage
      :left-max-width="50"
      :left-min-width="10"
      :left-width="15"
      :split-handle="false"
      :split-line="false"
      :resizable="true"
      :left-collapsible="false"
      :auto-content-height="true"
      content-class="h-full">
    <template #left >
      <FlowCategoryTree @select="handleSelect" />
    </template>
    <div class="ml-2 h-full">
      <BasicTable >
        <template #toolbar-tools >
          <div class="flex flex-row gap-2">
            <Tooltip v-access:code="PerPrefix+PerEnum.PUBLISH"
                placement="bottom">
              <template #title>
                <span>只有状态为【待发布】的数据才能发布</span>
              </template>
              <Popconfirm
                  :title="`确定要发布【${currentModelInfo.name}】流程吗？`"
                  @confirm="handlePublish"
                  :disabled="!showPublishBtn"
              >
                <Button :disabled="!showPublishBtn" type="primary">发布</Button>
              </Popconfirm>
            </Tooltip>
            <Tooltip v-access:code="PerPrefix+PerEnum.PUBLISH" placement="bottom">
              <template #title>
                <span>只有状态为【待发布/已发布】的数据才能停用</span>
              </template>
              <Popconfirm
                  :title="`确定要停用【${currentModelInfo.name}】流程吗？`"
                  @confirm="handleStop"
                  :disabled="!showStopBtn"
                  :okButtonProps="{ danger: true }"
              >
                <Button :disabled="!showStopBtn" type="primary" danger>停用</Button>
              </Popconfirm>
            </Tooltip>
            <Button v-access:code="PerPrefix+PerEnum.ADD" type="primary" @click="handleCreate"> 新建 </Button>
            <Button v-access:code="PerPrefix+PerEnum.ADD" type="primary" @click="handleCopy"> 复制 </Button>
          </div>
        </template>
        <template #action="{ row }">
          <TableAction :stopButtonPropagation="true" :actions="createActions(row)" />
        </template>
        <template #name="{ row }">
          <Avatar :src="row.modelIcon">
            <template #icon>
              <PictureFilled />
            </template>
          </Avatar>
          {{ row.name }}
        </template>
        <template #appName="{row}">
          <span v-if="!row.appName">未设置</span>
          <Tooltip v-else placement="top" :mouseEnterDelay="0.3">
            <template #title> {{ row.appName }}【{{ row.appSn }}】 </template>
            {{ row.appName }}
          </Tooltip>
        </template>
      </BasicTable>
    </div>
    <CopyModelInfoModal ref="copyModelInfoModalRef" @success="handleSuccess" formType="custom" />
    <TaskFormDesignerModal ref="taskFormDesignerModalRef"
      @success="handleTaskFormSuccess" />
    <BpmnPreviewModal ref="bpmnPreviewModalRef" />
    <BpmnDesignerModal ref="bpmnDesignerModalRef"
      @success="handleBpmnDesignerModalSuccess"
    />
  </ColPage>
</template>
<script lang="ts" setup>
import {ref, unref, watch} from 'vue';
import {PerEnum} from '#/enums/perEnum';
import type {VbenFormProps} from '@vben/common-ui';
import type {VxeGridProps, VxeGridListeners} from '#/adapter/vxe-table';

import {useVbenVxeGrid} from '#/adapter/vxe-table';
import type {Recordable} from '@vben/types';
import {ColPage} from '@vben/common-ui';
import {TableAction} from '#/components/table-action';

import {getModelInfoByModelKey} from '#/api/flowable/bpmn/modelInfo';
import {getCustomPagerModel, deployForm, stopForm} from '#/api/form/customForm';
import {getTaskFormInfoByModelKey} from '#/api/form/customTaskForm';
import FlowCategoryTree from '#/views/components/leftTree/FlowCategoryTree.vue';
import {PictureFilled} from '@ant-design/icons-vue';

import CopyModelInfoModal from '#/views/form/components/CopyModelInfoModal.vue';
import {BpmnPreviewModal} from '#/views/components/preview';
import TaskFormDesignerModal from '#/views/form/components/TaskFormDesignerModal.vue';
import BpmnDesignerModal from '#/views/form/components/BpmnDesignerModal.vue';
import {Avatar, Button, Popconfirm, Tooltip, message} from 'ant-design-vue';
import {columns, searchFormSchema} from './modelInfo.data';

  const PerPrefix = 'Custom:';


  const bpmnDesignerModalRef = ref(),
      copyModelInfoModalRef = ref(),
      bpmnPreviewModalRef = ref();

  const formTableLoading = ref(false);
  const taskFormData = ref<object>({});

  const expandedRowKeys = ref([]);
  const currentModelInfo = ref<Recordable<any>>({});
  const currentCategory = ref<Recordable<any>>({});
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
    wrapperClass: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    actionWrapperClass: 'pl-2 !justify-end md:!justify-start',
    actionPosition: 'left',
    actionLayout: 'inline',
    resetButtonOptions: {
      show: false,
    },
    schema: searchFormSchema,
  };

  const gridOptions: VxeGridProps = {
    columns,
    columnConfig: {resizable: true},
    height: 'auto',
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
      clickRow(row);
    }
  };

  const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions, gridEvents});

  watch(
    () => unref(currentModelInfo),
    (v) => {
      if (v.modelKey) {
        showPublishBtn.value = true;
        showStopBtn.value = true;
      } else {
        showPublishBtn.value = false;
        showStopBtn.value = false;
      }
    },
  );

  function reloadTaskForm(modelKey: string) {
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

  function createActions(record: Recordable<any>) {
    return [
      {
        auth: [PerPrefix + PerEnum.UPDATE],
        icon: 'clarity:note-edit-line',
        tooltip: '修改',
        label: '',
        onClick: handleEdit.bind(null, record),
      },
      {
        icon: 'ant-design:partition-outlined',
        tooltip: '流程图预览',
        label: '',
        onClick: handleBpmnPreview.bind(null, record.modelKey),
      },
    ];
  }

  function handleBpmnPreview(modelKey: string) {
    bpmnPreviewModalRef.value.setData({modelKey});
    bpmnPreviewModalRef.value.open();
  }

  function handleEdit(record: Recordable<any>) {
    const { modelKey, modelId, categoryCode } = record;
    const query = { modelKey, modelId, categoryCode, formType: 'custom' };
    bpmnDesignerModalRef.value.setData(query);
    bpmnDesignerModalRef.value.open();

    /*openBpmnDesignerModal(true, { ...query });
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
    });*/
  }

  // 复制
  function handleCopy() {
    const selectedRow = tableApi.grid.getRadioRecord();
    if (!selectedRow) {
      message.warn('请选择行！');
      return;
    }
    copyModelInfoModalRef.value.setData(selectedRow);
    copyModelInfoModalRef.value.open();
    copyModelInfoModalRef.value.setState({
      title: '复制【' + selectedRow.name + '】表单、流程',
    });
    /*openCopyModal(true, {
      record: selectedRows[0],
    });
    setCopyModalProps({
      title: '复制【' + selectedRows[0].name + '】表单、流程',
      width: 600,
    });*/
  }

  async function publish(modelKey: string) {
    try {
      const {success, msg} = await deployForm(modelKey);
      if (success) {
        message.success(msg, 2);
        tableApi.reload();
      } else {
        message.error(msg, 2);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function stop(modelKey: string) {
    try {
      const {success, msg} = await stopForm(modelKey);
      if (success) {
        message.success(msg, 2);
        tableApi.reload();
      } else {
        message.error(msg, 2);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function handlePublish(record: Recordable<any>) {
    if (record.modelKey) {
      return publish(record.modelKey);
    } else {
      const selectedRow = tableApi.grid.getRadioRecord();

      if (!selectedRow) {
        message.warn('请选择行！');
        return;
      }
      return publish(selectedRow.modelKey);
    }
  }

  async function handleStop(record: Recordable<any>) {
    if (record.modelKey) {
      return stop(record.modelKey);
    } else {
      const selectedRow = tableApi.grid.getRadioRecord();
      if (!selectedRow) {
        message.warn('请选择行！');
        return;
      }
      return stop(selectedRow.modelKey);
    }
  }

  function handleSuccess() {
    tableApi.reload();
  }

  function handleBpmnDesignerModalSuccess() {
    const {getValues} = tableApi.formApi;
    tableApi.reload({...getValues(), categoryCode: unref(currentCategory).code});
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

  function clickRow(row: Recordable<any>) {
    if (row) {
      changePublishStopBtnShow(row.status);
      currentModelInfo.value = row;
    } else {
      changePublishStopBtnShow(0);
      currentModelInfo.value = {};
    }
  }

  function fetchSuccess(e) {
    // clearSelectedRowKeys();
    const selectedRow = tableApi.grid.getRadioRecord();
    if (!selectedRow) {
      currentModelInfo.value = selectedRow;
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
    tableApi.reload({categoryCode: node?.code});
  }

  function handleTaskFormSuccess() {
    tableApi.reload();
  }
</script>
