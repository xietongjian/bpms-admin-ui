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
            <Tooltip placement="bottom">
              <template #title>
                <span>只有状态为【待发布】的数据才能发布</span>
              </template>
              <span>
              <Authority :value="'Biz:' + PerEnum.PUBLISH">
                <Popconfirm
                    v-if="hasAccessByCodes([PerPrefix + PerEnum.PUBLISH])"
                    :title="`确定要发布【${currentModelInfo.name}】流程吗？`"
                    :disabled="!showPublishBtn"
                    type="primary"
                    @confirm="handlePublish"
                >
                  <Button type="primary">发布</Button>
                </Popconfirm>
              </Authority>
            </span>
            </Tooltip>
            <Tooltip
                v-if="hasAccessByCodes([PerPrefix + PerEnum.PUBLISH])"
                placement="bottom">
              <template #title>
                <span>只有状态为【待发布/已发布】的数据才能停用</span>
              </template>
              <Popconfirm
                  color="error"
                  type="danger"
                  :title="`确定要停用【${currentModelInfo.name}】流程吗？`"
                  :disabled="!showStopBtn"
                  @confirm="handleStop"
              >
                <Button type="primary" danger>停用</Button>
              </Popconfirm>
            </Tooltip>
            <template
                v-if="hasAccessByCodes([PerPrefix + PerEnum.ADD])"
            >
              <Dropdown placement="bottom">
                <template #overlay>
                  <Menu @click="handleCreate">
                    <MenuItem key="bizNoForm">
                      <template #icon>
                        <PartitionOutlined :style="{ fontSize: '26px', color: 'purple' }" />
                      </template>
                      <div style="width: 200px">
                        <TypographyText strong>无表单流程</TypographyText>
                        <br />
                        <TypographyText type="secondary">
                          流程不包含表单，适用于服务编排流程
                        </TypographyText>
                      </div>
                    </MenuItem>
                    <MenuItem key="biz">
                      <template #icon>
                        <ProfileOutlined :style="{ fontSize: '26px', color: '#2db7f5' }" />
                      </template>
                      <div style="width: 200px">
                        <TypographyText strong>有表单流程</TypographyText>
                        <br />
                        <TypographyText type="secondary">
                          流程默认绑定表单，适用于需要用户参与查看表单数据的流程
                        </TypographyText>
                      </div>
                    </MenuItem>
                  </Menu>
                </template>
                <Button type="primary">
                  新建
                  <DownOutlined />
                </Button>
              </Dropdown>
              <Button type="primary" @click="handleCopy">复制</Button>
            </template>
          </div>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <TableAction :actions="createActions(record)" />
          </template>
          <template v-if="column.key === 'name'">
            <Badge>
              <template #count>
                <Tooltip :title="record.formType===1 ? '有表单流程' : '无表单流程'" placement="top" :mouseEnterDelay="0.3">
                  <ProfileOutlined v-if="record.formType === 1" style="color: #2db7f5; font-size: 12px" />
                  <PartitionOutlined v-else style="color: purple; font-size: 12px" />
                </Tooltip>
              </template>
              <Avatar :src="record.modelIcon">
                <template #icon>
                  <PictureFilled />
                </template>
              </Avatar>
            </Badge>
            <Tooltip placement="top" :mouseEnterDelay="0.3">
              <template #title>
                {{ record.name }}
              </template>
              &nbsp;{{ record.name }}
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
              <template #title> {{ record.appName }}【{{ record.appSn }}】</template>
              {{ record.appName }}
            </Tooltip>
          </template>
        </template>
      </BasicTable>
    </div>

    <CopyModelInfoModal ref="copyModelInfoModalRef" @register="registerCopyModal" @success="handleSuccess" formType="biz" />
    <BpmnPreviewModal ref="bpmnPreviewModalRef" @register="registerBpmnPreviewModal" @success="handleSuccess" />
    <BizBpmnDesignerModal ref="bizBpmnDesignerModalRef"
      @register="registerBpmnDesignerModal"
      @success="handleBpmnDesignerModalSuccess"
    />
    <BizNoFormBpmnDesignerModal ref="bizNoFormBpmnDesignerModalRef"
      @register="registerNoFormBpmnDesignerModal"
      @success="handleBpmnDesignerModalSuccess"
    />
  </Page>
</template>
<script lang="ts" setup>
  import { nextTick, ref, unref, watch } from 'vue';
  import {useAccess} from '@vben/access';
  import type {Recordable} from '@vben/types';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {VxeGridProps} from '#/adapter/vxe-table';

  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {ColPage, Page} from '@vben/common-ui';
  import {TableAction} from '#/components/table-action';

  import { deployForm, getPagerModel, stopForm } from '#/api/form/bizForm';
  import FlowCategoryTree from '#/views/components/leftTree/FlowCategoryTree.vue';
  import {
    PictureFilled,
    DownOutlined,
    PartitionOutlined,
    ProfileOutlined,
  } from '@ant-design/icons-vue';
  import CopyModelInfoModal from '#/views/form/components/CopyModelInfoModal.vue';
  import {BpmnPreviewModal} from '#/views/components/preview';
  import { Avatar, message, Popconfirm, Button, Badge, Tooltip, Dropdown, Menu, TypographyText } from 'ant-design-vue';
  import { getAll } from '#/api/base/app';
  import { columns, searchFormSchema } from './modelInfo.data';
  import { PerEnum } from '#/enums/perEnum';
  import BizBpmnDesignerModal from '#/views/form/components/BizBpmnDesignerModal.vue';
  import BizNoFormBpmnDesignerModal from '#/views/form/components/BizNoFormBpmnDesignerModal.vue';
  import {getCustomPagerModel} from "#/api/form/customForm";
  const {hasAccessByCodes} = useAccess();

  const MenuItem = Menu.Item;
  const PerPrefix = 'Biz:';

  // const [registerCopyModal, { openModal: openCopyModal, setModalProps: setCopyModalProps }] =
  //   useModal();
  // const [
  //   registerBpmnDesignerModal,
  //   { openModal: openBpmnDesignerModal, setModalProps: setBpmnDesignerModalProps },
  // ] = useModal();
  // const [
  //   registerNoFormBpmnDesignerModal,
  //   { openModal: openNoFormBpmnDesignerModal, setModalProps: setNoFormBpmnDesignerModalProps },
  // ] = useModal();

  // const [
  //   registerBpmnPreviewModal,
  //   { openModal: openBpmnPreviewModal, setModalProps: setBpmnPreviewProps },
  // ] = useModal();
  // const { message } = useMessage();

  const currentModelInfo = ref<Recordable>({});
  const currentCategory = ref<Recordable>({});
  const loadingRef = ref(false);
  const showPublishBtn = ref(false);
  const showStopBtn = ref(false);

  /*const [registerTable, { getForm, reload, getSelectRows, clearSelectedRowKeys }] = useTable({
    title: '列表',
    api: getPagerModel,
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
          return await getPagerModel({
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
  nextTick(() => {
    /*const { updateSchema } = getForm();
    getAll().then((res) => {
      updateSchema([
        {
          field: 'appSn',
          componentProps: { options: res, labelField: 'id' },
        },
      ]);
    });*/
  });

  function handleCreate(e) {
    //custom/biz/bizNoForm
    if (e.key === 'biz') {
      // 业务流程 - 有表单
      openBpmnDesignerModal(true, {
        modelKey: '',
        modelId: '',
        formType: e.key,
        categoryCode: unref(currentCategory)?.code,
      });
      setDesignerModalProps(setBpmnDesignerModalProps);
    } else if (e.key === 'bizNoForm') {
      // 业务流程 - 无表单
      openNoFormBpmnDesignerModal(true, {
        modelKey: '',
        modelId: '',
        formType: e.key,
        categoryCode: unref(currentCategory)?.code,
      });
      setDesignerModalProps(setNoFormBpmnDesignerModalProps);
    }
  }

  function setDesignerModalProps(callback) {
    callback({
      title: `添加表单`,
      bodyStyle: { padding: '0px', margin: '0px' },
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

  function createActions(record: Recordable): ActionItem[] {
    return [
      {
        auth: 'Biz:' + PerEnum.UPDATE,
        icon: 'clarity:note-edit-line',
        tooltip: '编辑',
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
    const { modelKey, modelId, categoryCode, formType } = record;
    const query = {
      modelKey,
      modelId,
      categoryCode,
      formType: formType === 1 ? 'biz' : 'bizNoForm',
    };
    if(formType === 1){
      openBpmnDesignerModal(true, { ...query });
    }else{
      openNoFormBpmnDesignerModal(true, { ...query });
    }
    setDesignerModalProps(
      formType === 1 ? setBpmnDesignerModalProps : setNoFormBpmnDesignerModalProps
    );
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
          tableApi.reload();
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
    tableApi.reload();
  }

  function changePublishStopBtnShow(status) {
    showPublishBtn.value = status === 2;
    showStopBtn.value = status === 3 || status === 2;
  }

  function clickRow() {
    const selectedRows = getSelectRows();
    if (selectedRows.length > 0) {
      changePublishStopBtnShow(selectedRows[0].status);
      currentModelInfo.value = selectedRows[0];
    } else {
      changePublishStopBtnShow(0);
      currentModelInfo.value = {};
    }
  }

  function fetchSuccess() {
    clearSelectedRowKeys();
    const selectedRows = getSelectRows();
    if (selectedRows && selectedRows.length > 0) {
      currentModelInfo.value = selectedRows[0];
    } else {
      currentModelInfo.value = {};
    }
  }

  function changeSelection({ rows }) {
    if (!rows[0]) {
      return;
    }
    currentModelInfo.value = rows[0];
    changePublishStopBtnShow(rows[0].status);
  }

  async function handleSelect(node: any) {
    const { setFieldsValue } = getForm();

    currentCategory.value = node;
    await setFieldsValue({ categoryCode: node ? node.code : '' });
    tableApi.reload();
  }

  function handleBpmnDesignerModalSuccess() {
    setTimeout(() => {
      tableApi.reload();
    }, 500);
  }
</script>

<style lang="less" scoped>
  .modelInfo-roles {
    > span {
      margin-right: 4px;
    }
  }
</style>
