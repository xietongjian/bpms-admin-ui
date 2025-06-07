<template>
  <ColPage
      :left-max-width="50"
      :left-min-width="10"
      :left-width="20"
      :split-handle="false"
      :left-collapsed-width="5"
      :split-line="false"
      :resizable="true"
      :left-collapsible="true"
      :auto-content-height="true"
      content-class="h-full">
    <template #left>
      <div class="h-full bg-card mr-2" >
        <FlowCategoryTree class="h-full" @select="handleSelect"/>
      </div>
    </template>
    <div class="bg-card h-full">
      <BasicTable @register="registerTable">
        <template #action="{row}">
          <TableAction :actions="createMainActions(row)"/>
        </template>
        <template #expandedRowRender="{row}">
          <SubTable @register="registerSubTable">
            <template #action="{row: subRow}">
              <TableAction
                  :actions="createSubActions(row, subRow)"
              />
            </template>
          </SubTable>
        </template>
      </BasicTable>

      <BpmnPreviewModal ref="bpmnPreviewModalRef" @register="registerBpmnPreviewModal"/>
      <CodePreviewModal ref="codePreviewModalRef" @register="registerCodePreviewModal" :minHeight="200"/>

    </div>
  </ColPage>
</template>
<script lang="ts" setup>
import {ref, unref, nextTick} from 'vue';

import {PerEnum} from '#/enums/perEnum';
import type {Recordable} from '@vben/types';
import type {VbenFormProps} from '@vben/common-ui';
import type {VxeGridProps, VxeGridListeners} from '#/adapter/vxe-table';

import {useVbenVxeGrid} from '#/adapter/vxe-table';
import {ColPage, Page} from '@vben/common-ui';

import {TableAction} from '#/components/table-action';

import {getBpmnByModelKey, getModelInfoPageList, stopBpmn} from '#/api/flowable/bpmn/modelInfo';
import FlowCategoryTree from '#/views/components/leftTree/FlowCategoryTree.vue';

import {BpmnPreviewModal} from '#/views/components/preview';
import {
  findHisProcessDefinitionPagerModel,
  suspendProcessDefinition,
  activateProcessDefinition,
  loadXmlByProcessDefinitionId,
} from '#/api/flowoperation/processDefinition';
import {columns, hisDefinitionColumns, searchFormSchema} from './processDefinition.data';
import CodePreviewModal from '#/views/components/preview/codePreview/index.vue';
// import { useLoading } from '@/components/Loading';
import {message, Button} from 'ant-design-vue'

/*  const [
    registerBpmnPreviewModal,
    { openModal: openBpmnPreviewModal, setModalProps: setBpmnPreviewProps },
  ] = useModal();
  const [
    registerCodePreviewModal,
    { openModal: openCodePreviewModal, setModalProps: setCodePreviewModalProps },
  ] = useModal();*/
const currentModelInfo = ref<Recordable<any>>({});
const expandedRowKeys = ref([]);
const currentCategory = ref<Recordable<any>>({});
const loadingRef = ref(false);
const subTableLoading = ref(false);

const PerPrefix = 'ProcessDefinition:';

const bpmnPreviewModalRef = ref(),
codePreviewModalRef = ref();

/*  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '加载中...',
  });*/

/*const [registerTable, { getForm, reload, setLoading }] = useTable({
  title: '',
  size: 'small',
  api: getModelInfoPageList,
  columns,
  formConfig: {
    labelWidth: 120,
    schemas: searchFormSchema,
    showAdvancedButton: false,
    showResetButton: false,
    autoSubmitOnEnter: true,
  },
  expandRowByClick: true,
  searchInfo: { modelType: 0 },
  useSearchForm: true,
  showIndexColumn: true,
  showTableSetting: false,
  bordered: false,
  expandedRowKeys: expandedRowKeys,
  onExpand: (expanded, record) => {
    if (expanded) {
      expandedRowKeys.value = [record.id];
      currentModelInfo.value = record;
      setTimeout(() => {
        setSubTableProps({
          searchInfo: {
            key: record.modelKey,
          },
        });
        reloadSubTable();
      }, 300);
    } else {
      expandedRowKeys.value = [];
    }
  },
  rowKey: 'id',
  canResize: true,
  resizeHeightOffset: -12,
  actionColumn: {
    width: 80,
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
        return await getModelInfoPageList({
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

function createMainActions(row: Recordable<any>) {
  return [
    {
      tooltip: '流程图预览',
      icon: 'ant-design:partition-outlined',
      onClick: handlePreview.bind(null, row),
    },
  ];
}

function createSubActions(record: Recordable<any>, itemRecord: Recordable<any>) {
  return [
    {
      tooltip: '流程图预览',
      icon: 'ant-design:partition-outlined',
      onClick: handleDefPreview.bind(null, itemRecord),
    },
    {
      tooltip: '查看XML',
      icon: 'ant-design:code-outlined',
      onClick: handlePreviewXml.bind(null, itemRecord),
    },
    {
      auth: PerPrefix + PerEnum.UPDATE,
      icon: 'ant-design:pause-circle-outlined',
      danger: true,
      tooltip: '挂起',
      ifShow: itemRecord.suspensionState === 1,
      popConfirm: {
        title: '是否确认挂起',
        confirm: handleSuspend.bind(null, record, itemRecord),
        okButtonProps: { danger: true },
      },
    },
    {
      auth: PerPrefix + PerEnum.UPDATE,
      icon: 'ant-design:play-circle-outlined',
      color: 'success',
      tooltip: '激活',
      ifShow: itemRecord.suspensionState === 2,
      popConfirm: {
        title: '是否确认激活',
        confirm: handleActivate.bind(null, record, itemRecord),
      },
    },
  ];
}

/*const [
  registerSubTable,
  { reload: reloadSubTable, setProps: setSubTableProps, updateTableDataRecord },
] = useTable({
  immediate: false,
  api: findHisProcessDefinitionPagerModel,
  columns: hisDefinitionColumns,
  useSearchForm: false,
  showIndexColumn: true,
  showTableSetting: false,
  bordered: false,
  canResize: false,
  rowKey: 'id',
  maxHeight: 200,
  scroll: { y: 200 },
});*/

const subGridOptions: VxeGridProps = {
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
        return await findHisProcessDefinitionPagerModel({
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
const [SubTable, subTableApi] = useVbenVxeGrid({gridOptions: subGridOptions});


nextTick(() => {
  const {updateSchema} = tableApi.formApi;
  /*getAll().then((res) => {
    updateSchema && updateSchema([
      {
        fieldName: 'appSn',
        componentProps: {options: res, labelField: 'id'},
      },
    ]);
  });*/
});

function handlePreview(record: Recordable<any>, e) {
  bpmnPreviewModalRef.value.setData({modelKey: record.modelKey});
  bpmnPreviewModalRef.value.open();
  /*e.stopPropagation();
  openBpmnPreviewModal(true, {
    modelKey: record.modelKey,
  });
  setBpmnPreviewProps({
    centered: true,
    useWrapper: false,
    showOkBtn: false,
    cancelText: '关闭',
  });*/
}

function handleDefPreview(record: Recordable<any>) {
  bpmnPreviewModalRef.value.setData({
    modelKey: record.key,
  });
  bpmnPreviewModalRef.value.open();
  /*openBpmnPreviewModal(true, {
    modelKey: record.key,
  });
  setBpmnPreviewProps({
    title: `预览-${record.name}`,
    centered: true,
    useWrapper: false,
    showOkBtn: false,
    cancelText: '关闭',
  });*/
}

async function handlePreviewXml(record: Recordable<any>, e) {
  e.stopPropagation();
  const modelXml = await loadXmlByProcessDefinitionId({processDefinitionId: record.id});
  codePreviewModalRef.value.setData({code: modelXml});
  codePreviewModalRef.value.open();
  codePreviewModalRef.value.setState({
    title: `查看【${record.name}】的XML`,
  });
}

function handleSuspend(record: Recordable<any>, itemRecord: Recordable<any>) {
  setLoading(true);
  suspendProcessDefinition({id: itemRecord.id})
      .then((res) => {
        const {success, msg} = res.data;
        if (success) {
          message.success(msg, 2);
          itemRecord.suspensionState = itemRecord.suspensionState === 1 ? 2 : 1;
          updateTableDataRecord(itemRecord.id, itemRecord);
          //reloadSubTable()
        } else {
          message.error(msg, 2);
        }
      })
      .finally(() => {
        setLoading(false);
      });
}

function handleActivate(record: Recordable<any>, itemRecord: Recordable<any>) {
  setLoading(true);
  activateProcessDefinition({id: itemRecord.id})
      .then((res) => {
        const {success, msg} = res.data;
        if (success) {
          itemRecord.suspensionState = itemRecord.suspensionState === 1 ? 2 : 1;
          updateTableDataRecord(itemRecord.id, itemRecord);
          message.success(msg, 2);
        } else {
          message.error(msg, 2);
        }
      })
      .finally(() => {
        setLoading(false);
      });
}

function handleStop(record: Recordable<any>) {
  loadingRef.value = true;
  stopBpmn(record.modelId)
      .then((res) => {
        tableApi.reload();
      })
      .finally(() => {
        loadingRef.value = false;
      });
}

function handleSuccess() {
  tableApi.reload();
}

function handleSelect(node: any) {
  currentCategory.value = node;
  let searchInfo = {categoryCode: node ? node.code : ''};
  reload({searchInfo});
}
</script>

<style lang="scss">
.process-definition {
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
