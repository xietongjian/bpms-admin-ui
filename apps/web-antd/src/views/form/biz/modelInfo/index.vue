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
            <div v-access:code="PerPrefix+PerEnum.PUBLISH">
              <Tooltip placement="bottom">
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
            </div>

            <div v-access:code="PerPrefix+PerEnum.PUBLISH">
              <Tooltip placement="bottom">
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
            </div>

            <div v-access:code="PerPrefix+PerEnum.ADD">
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
            </div>
            <Button v-access:code="PerPrefix+PerEnum.ADD" type="primary" @click="handleCopy">复制</Button>
          </div>
        </template>
        <template #name="{row}">
          <Badge>
            <template #count>
              <div>
                  <Tooltip :title="row.formType === 1 ? '有表单流程' : '无表单流程'" placement="top" :mouseEnterDelay="0.3">
                      <ProfileOutlined v-if="row.formType === 1" style="color: #2db7f5; font-size: 12px" />
                      <PartitionOutlined v-else style="color: purple; font-size: 12px" />
                  </Tooltip>
              </div>
            </template>
            <Avatar :src="row.modelIcon">
              <template #icon>
                <PictureFilled />
              </template>
            </Avatar>
          </Badge>
          <Tooltip placement="top" :mouseEnterDelay="0.3">
            <template #title>
              {{ row.name }}
            </template>
            &nbsp;{{ row.name }}
          </Tooltip>
        </template>
        <template #action="{row}">
          <TableAction :actions="createActions(row)" />
        </template>
        <template #statusName="{row}">
          <BpmnModelStatus :status="row.status" :status-name="row.statusName"/>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
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

    <CopyModelInfoModal ref="copyModelInfoModalRef" @success="handleSuccess" formType="biz" />
    <BpmnPreviewModal ref="bpmnPreviewModalRef" @success="handleSuccess" />
    <BizBpmnDesignerModal ref="bizBpmnDesignerModalRef" @success="handleBpmnDesignerModalSuccess"/>
    <BizNoFormBpmnDesignerModal ref="bizNoFormBpmnDesignerModalRef" @success="handleBpmnDesignerModalSuccess"/>
  </ColPage>
</template>
<script lang="ts" setup>
  import { ref, unref, watch } from 'vue';
  import type {Recordable} from '@vben/types';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {VxeGridProps, VxeGridListeners} from '#/adapter/vxe-table';

  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {ColPage} from '@vben/common-ui';
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
  import { columns, searchFormSchema } from './modelInfo.data';
  import { PerEnum } from '#/enums/perEnum';
  import BizBpmnDesignerModal from '#/views/form/components/BizBpmnDesignerModal.vue';
  import BizNoFormBpmnDesignerModal from '#/views/form/components/BizNoFormBpmnDesignerModal.vue';
  import BpmnModelStatus from "#/views/components/common/widgets/BpmnModelStatus.vue";

  const MenuItem = Menu.Item;
  const PerPrefix = 'Biz:';
  const bizBpmnDesignerModalRef = ref(),
      bizNoFormBpmnDesignerModalRef = ref(),
      copyModelInfoModalRef = ref(),
      bpmnPreviewModalRef = ref();

  const currentModelInfo = ref<Recordable<any>>({});
  const currentCategory = ref<Recordable<any>>({});
  const loadingRef = ref(false);
  const showPublishBtn = ref(false);
  const showStopBtn = ref(false);

  const formOptions: VbenFormProps = {
    showCollapseButton: false,
    submitOnEnter: true,
    commonConfig: {
      labelWidth: 60,
    },
    // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
    wrapperClass: 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
    actionWrapperClass: 'pl-2 !justify-end md:!justify-start',
    actionPosition: 'left',
    actionLayout: 'inline',
    resetButtonOptions: {
      show: false,
    },
    schema: searchFormSchema,
  };

  const gridOptions: VxeGridProps<any> = {
    columns,
    columnConfig: {resizable: true},
    height: 'auto',
    border: false,
    keepSource: true,
    autoResize: false,
    stripe: true,
    round: false,
    showOverflow: false,
    radioConfig: {
      highlight: true,
      labelField: 'name',
      trigger: 'row',
    },
    proxyConfig: {
      ajax: {
        query: async ({page}, formValues) => {
          currentModelInfo.value = {};
          formValues.categoryCode = unref(currentCategory)?.code;
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

  function handleCreate (e) {
    debugger;
    if (!unref(currentCategory).code) {
      message.warning('请选择分类！', 2);
      return;
    }
    //custom/biz/bizNoForm
    if (e.key === 'biz') {
      // 业务流程 - 有表单
      bizBpmnDesignerModalRef.value.setData({
        modelKey: '',
        modelId: '',
        formType: e.key,
        categoryCode: unref(currentCategory)?.code,
      });
      bizBpmnDesignerModalRef.value.open();
    } else if (e.key === 'bizNoForm') {
      // 业务流程 - 无表单
      bizNoFormBpmnDesignerModalRef.value.setData({
        modelKey: '',
        modelId: '',
        formType: e.key,
        categoryCode: unref(currentCategory)?.code,
      });
      bizNoFormBpmnDesignerModalRef.value.open();
    }
  }

  function createActions(record: Recordable<any>) {
    return [
      {
        auth: [PerPrefix + PerEnum.UPDATE],
        icon: 'ant-design:form-outlined',
        tooltip: '编辑',
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
    bpmnPreviewModalRef.value.setData({modelKey}).open();
  }

  function handleEdit(record: Recordable<any>) {
    const { modelKey, modelId, categoryCode, formType } = record;
    const query = {
      modelKey,
      modelId,
      categoryCode,
      formType: formType === 1 ? 'biz' : 'bizNoForm',
    };
    if(formType === 1){
      bizBpmnDesignerModalRef.value.setData({
        ...query
      });
      bizBpmnDesignerModalRef.value.open();
    }else{
      bizNoFormBpmnDesignerModalRef.value.setData({
        ...query
      });
      bizNoFormBpmnDesignerModalRef.value.open();
    }
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

  function handlePublish(record: Recordable<any>) {
    if (record.modelKey) {
      publish(record.modelKey);
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

  function changePublishStopBtnShow(status) {
    showPublishBtn.value = status === 2;
    showStopBtn.value = status === 3 || status === 2;
  }

  function clickRow(row: Recordable<any>) {
    if (row) {
      changePublishStopBtnShow(row.status);
      currentModelInfo.value = row;
    } else {
      changePublishStopBtnShow(0);
      currentModelInfo.value = {};
    }
    /*const selectedRows = getSelectRows();
    if (selectedRows.length > 0) {
      changePublishStopBtnShow(selectedRows[0].status);
      currentModelInfo.value = selectedRows[0];
    } else {
      changePublishStopBtnShow(0);
      currentModelInfo.value = {};
    }*/
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
    tableApi.reload();
  }

  function handleBpmnDesignerModalSuccess() {
    tableApi.query();
  }
</script>

<style lang="scss" scoped>
  .modelInfo-roles {
    > span {
      margin-right: 4px;
    }
  }
</style>
