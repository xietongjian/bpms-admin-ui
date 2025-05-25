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
      <FlowCategoryTree @select="handleSelect"/>
    </template>
    <div class="bg-card h-full">
      <BasicTable >
        <template #toolbar-tools>
          <div class="flex flex-row gap-2">
            <Dropdown v-access:code="PerPrefix+PerEnum.ADD" >
              <template #overlay>
                <Menu @click="handleCreate">
                  <MenuItem key="0">
                    <template #icon>
                      <InsertRowAboveOutlined style="color: #108ee9"/>
                    </template>
                    决策表
                  </MenuItem>
                  <MenuItem key="1">
                    <template #icon>
                      <ClusterOutlined style="color: purple"/>
                    </template>
                    决策服务
                  </MenuItem>
                </Menu>
              </template>
              <Button type="primary">
                新增
                <DownOutlined/>
              </Button>
            </Dropdown>

            <Tooltip placement="bottom">
              <template #title>
                <span>只有状态为【待发布】的数据才能发布</span>
              </template>
              <span>
            <Popconfirm
                :title="`确定要发布决策引擎【${currentModelInfo.name}】吗？`"
                @confirm="handlePublish"
                type="primary"
                :disabled="!showPublishBtn"
            >
              <Button type="primary">发布</Button>
            </Popconfirm>
          </span>
            </Tooltip>
            <Tooltip placement="bottom">
              <template #title>
                <span>只有状态为【待发布/已发布】的数据才能停用</span>
              </template>
              <span>
            <Popconfirm
                :title="`确定要停用决策引擎【${currentModelInfo.name}】吗？`"
                @confirm="handleStop"
                color="error"
                type="danger"
                :disabled="!showStopBtn"
            >
              <Button type="primary" danger>停用</Button>
            </Popconfirm>
          </span>
            </Tooltip>

          </div>
        </template>
        <template #action="{row}">
          <TableAction :stopButtonPropagation="true" :actions="createActions(row, column)"/>
        </template>
        <template #name="{row}">
          <!-- 0决策表1决策服务 -->
          <Tooltip :title="row.dmnType == 0 ? '决策表' : row.dmnType == 1 ? '决策服务' : ''">
            <InsertRowAboveOutlined v-if="row.dmnType == 0" style="color: #108ee9"/>
            <ClusterOutlined v-else-if="row.dmnType == 1" style="color: purple"/>
          </Tooltip>
          {{ row.name }}
        </template>
        <template #status="{row}">
          <Tag :color="row.status == 2 ? '#2db7f5' : row.status == 3 ? '#87d068' : row.status == 4 ? '#f50' : 'gray'">{{ row.statusName }}</Tag>
        </template>
      </BasicTable>
    </div>
    <DmnDesignerModal
        ref="dmnDesignerModalRef"
        @success="handleSuccess"/>
    <CodePreviewModal
        ref="codePreviewModalRef"
        :minHeight="200"
        @success="handleSuccess"
    />
    <DmnSimulatorModal
        ref="dmnSimulatorModalRef"
        :minHeight="200"/>
    <DmnPreviewModal
        ref="dmnPreviewModalRef"
        :minHeight="200"/>
  </ColPage>
</template>
<script lang="ts" setup>
import {ref, unref, watch, nextTick} from 'vue';
import {PerEnum} from '#/enums/perEnum';
import type {Recordable} from '@vben/types';
import type {VbenFormProps} from '@vben/common-ui';
import type {VxeGridProps, VxeGridListeners} from '#/adapter/vxe-table';
import {useVbenVxeGrid} from '#/adapter/vxe-table';
import {ColPage, Page, useVbenModal} from '@vben/common-ui';
import {TableAction} from '#/components/table-action';

import {Tag, Button, Popconfirm, Tooltip, message} from 'ant-design-vue';

import {
  getDmnPagerModel,
  deleteByIds,
  publishDmn,
  stopDmn,
  getByModelId,
} from '#/api/flowable/dmn/modelInfo';

import FlowCategoryTree from '#/views/components/leftTree/FlowCategoryTree.vue';

import DmnDesignerModal from './DmnDesignerModal.vue';
import DmnSimulatorModal from './DmnSimulatorModal.vue';
import DmnPreviewModal from '#/views/components/preview/dmnPreview/index.vue';
import CodePreviewModal from '#/views/components/preview/codePreview/index.vue';
import {Dropdown, Menu} from 'ant-design-vue';

import {columns, searchFormSchema} from './modelInfo.data';

import {InsertRowAboveOutlined, ClusterOutlined, DownOutlined} from '@ant-design/icons-vue';

const PerPrefix = 'Dmn:';

const dmnDesignerModalRef = ref(),
    codePreviewModalRef = ref(),
    dmnSimulatorModalRef = ref(),
    dmnPreviewModalRef = ref();

const MenuItem = Menu.Item;

const currentModelInfo = ref<Recordable>({});
const currentCategory = ref<Recordable>({});
const loadingRef = ref(false);
const showPublishBtn = ref(false);
const showStopBtn = ref(false);

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  actionWrapperClass: 'col-span-2 col-start-3 text-left ml-2',
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
        formValues.categoryCode = currentCategory.value?.code
        return await getDmnPagerModel({
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
      if (!v.modelKey) {
        showPublishBtn.value = false;
        showStopBtn.value = false;
      }
    },
);

/**
 * key: 0决策表1决策服务
 * @param key
 */
function handleCreate({key}) {
  if (!unref(currentCategory).code) {
    message.warning('请选择分类！', 2);
    return;
  }
  dmnDesignerModalRef.value.setData({
    categoryCode: unref(currentCategory).code,
    dmnType: key
  });
  dmnDesignerModalRef.value.open();
  dmnDesignerModalRef.value.setState({
    title: `新建决策`,
  });

  /*openDmnDesignerModal(true, {
    isUpdate: false,
    record: {categoryCode: unref(currentCategory).code, dmnType: key},
  });

  setDmnDesignerModalProps({
    title: `新建决策`,
    bodyStyle: {padding: '0px', margin: '0px'},
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

async function handleViewXml(record: Recordable<any>, e) {
  e.stopPropagation();
  const res = await getByModelId({modelId: record.modelId});
  codePreviewModalRef.value.setData({code: res.modelXml, type: 'xml'});
  codePreviewModalRef.value.open();
  codePreviewModalRef.value.setState({
    title: `查看【${record.name}】的XML`,
  });
}

function handleSimulate(record: Recordable, e) {
  e.stopPropagation();
  dmnSimulatorModalRef.value.setData({

  });
  dmnSimulatorModalRef.value.open();
  dmnSimulatorModalRef.value.setState({
    title: `模拟决策【${record.name}】`,
  });
  openDmnSimulatorModal(true, {
    record,
    isUpdate: false,
  });
  setDmnSimulatorModalProps({
    width: 900,
    height: 400,
    minHeight: 200,
    title: `模拟决策【${record.name}】`,
    showOkBtn: false,
    cancelText: '关闭',
  });
}

function handlePreview(record: Recordable, e) {
  e.stopPropagation();

  openDmnPreviewModal(true, {
    ...record,
    isUpdate: false,
  });
  setDmnPreviewModalProps({
    width: 900,
    height: 400,
    minHeight: 400,
    title: `预览决策【${record.name}】`,
    showOkBtn: false,
    cancelText: '关闭',
  });
}

function createActions(record: Recordable<any>){
  const {status} = record;
  let actions = [
    /*{
    icon: 'ant-design:play-square-outlined',
    tooltip: '模拟',
    label: '',
    onClick: handleSimulate.bind(null, record),
  },*/
    {
      icon: 'ant-design:eye-outlined',
      tooltip: '预览',
      label: '',
      onClick: handlePreview.bind(null, record),
    },
    {
      auth: [PerPrefix + PerEnum.UPDATE],
      icon: 'clarity:note-edit-line',
      tooltip: '编辑决策',
      label: '',
      onClick: handleEditDmn.bind(null, record),
    },
    /*{
    auth:'Dmn:'+PerEnum.UPDATE,
    icon: 'clarity:note-edit-line',
    tooltip: '编辑决策1',
    label: '',
    onClick: handleEditDmn1.bind(null, record),
  },*/
    {
      icon: 'ant-design:code-outlined',
      tooltip: '查看XML',
      label: '',
      onClick: handleViewXml.bind(null, record),
    },
    /*{
    icon: 'ant-design:delete-outlined',
    danger: true,
    tooltip: '删除',
    label: '',
    popConfirm: {
      title: '是否确认删除',
      confirm: handleDelete.bind(null, record),
    },
    ifShow: status === 4
  },*/
  ];
  return actions;
}

// FIXME 删除决策引擎的接口暂未实现
async function handleDelete(record: Recordable<any>) {
  const {success, msg} = await deleteByIds([record.id]);
  if (success) {
    tableApi.reload();
    message.success(msg);
  }
}

async function publish(modelId) {
  loadingRef.value = true;
  const {success, msg} = await publishDmn(modelId);
  if (success) {
    message.success(msg, 2);
    tableApi.reload();
  } else {
    message.error(msg, 2);
  }

}

async function stop(id) {
  loadingRef.value = true;
  const {success, msg} = await stopDmn(id);
  if (success) {
    message.success(msg, 2);
    handleSuccess();
  } else {
    message.error(msg, 2);
  }
}

async function handlePublish(record: Recordable<any>) {
  loadingRef.value = true;
  if (record.modelId) {
    return publish(record.modelId);
  } else {
    const selectedRow = tableApi.grid.getRadioRecord();
    if (!selectedRow) {
      message.warn('请选择行！');
      return;
    }
    return publish(selectedRow.modelId);
  }
}

async function handleStop(record: Recordable<any>) {
  loadingRef.value = true;
  if (record.modelId) {
    return stop(record.id);
  } else {
    const selectedRow = tableApi.grid.getRadioRecord();
    if (!selectedRow) {
      message.warn('请选择行！');
      return;
    }
    return stop(selectedRow.id);
  }
}

function handleEditDmn(record: Recordable<any>) {
  dmnDesignerModalRef.value.setData({modelId: record.modelId, id: record.id, dmnType: record.dmnType});
  dmnDesignerModalRef.value.open();
  dmnDesignerModalRef.value.setState({
    title: `编辑决策`,
  });
}

function handleEditDmn1(record: Recordable<any>) {
  // go({name: 'DmnDesigner', query: {modelId: record.modelId, id: record.id}});
  // go("/flowable/dmn/designer?modelId=" + record.modelId + "&id=" + record.id);
}

function handleSuccess() {
  let searchInfo = {categoryCode: unref(currentCategory).code || ''};
  tableApi.reload({searchInfo});
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

function handleSelect(node: any) {
  currentCategory.value = node;
  let searchInfo = {categoryCode: node ? node.code : ''};
  tableApi.reload(searchInfo);
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

/*function clickRow(e) {
  const selectedRows = getSelectRows();
  if (selectedRows && selectedRows.length > 0) {
    changePublishStopBtnShow(e.status);
    currentModelInfo.value = e;
  } else {
    currentModelInfo.value = {};
  }
}*/
function clickRow(row: Recordable<any>) {
  if (row) {
    changePublishStopBtnShow(row.status);
    currentModelInfo.value = row;
  } else {
    changePublishStopBtnShow(0);
    currentModelInfo.value = {};
  }
}

function changeSelection({keys, rows}) {
  if (!rows[0]) {
    return;
  }
  currentModelInfo.value = rows[0];
  changePublishStopBtnShow(rows[0].status);
}
</script>
