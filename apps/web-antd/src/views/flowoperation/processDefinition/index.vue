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
      <BasicTable >
        <template #action="{row}">
          <TableAction :actions="createMainActions(row)"/>
        </template>
        <template #name="{row}">
          {{row.name}}
        </template>
        <template #statusName="{row}">
          <Tag v-if="row.status === 2" color="#2db7f5">{{row.statusName}}</Tag>
          <Tag v-else-if="row.status === 3" color="#87d068">{{row.statusName}}</Tag>
          <Tag v-else-if="row.status === 4" color="#f50">{{row.statusName}}</Tag>
          <Tag v-else color="gray">{{row.statusName}}</Tag>
        </template>
        <template #expandContent="{ row }">
          <SubBasicTable
              :gridOptions="createSubGridOptions(row)"
              @page-change="({ currentPage, pageSize }) => handlePageChange(row, currentPage, pageSize)"
          >
            <template #statusName="{row}">
              <Tag v-if="row.suspensionState === 2" color="red">挂起</Tag>
              <Tag v-else-if="row.suspensionState === 1" color="green">激活</Tag>
              <Tag v-else color="gray">未知</Tag>
            </template>
            <template #action="{row: subRow}">
              <TableAction
                  :actions="createSubActions(row, subRow)"
              />
            </template>
          </SubBasicTable>
        </template>
      </BasicTable>

      <BpmnPreviewModal ref="bpmnPreviewModalRef" />
      <CodePreviewModal ref="codePreviewModalRef" :minHeight="200"/>

    </div>
  </ColPage>
</template>
<script lang="ts" setup>
import {ref, reactive} from 'vue';

import {PerEnum} from '#/enums/perEnum';
import type {Recordable} from '@vben/types';
import type {VbenFormProps} from '@vben/common-ui';
import type {VxeGridProps, VxeGridListeners} from '#/adapter/vxe-table';
import {useVbenVxeGrid} from '#/adapter/vxe-table';
import {ColPage} from '@vben/common-ui';
import {TableAction} from '#/components/table-action';
import {getModelInfoPageList} from '#/api/flowable/bpmn/modelInfo';
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
import {message, Tag} from 'ant-design-vue'

const currentModelInfo = ref<Recordable<any>>({});
const currentCategory = ref<Recordable<any>>({});

const PerPrefix = 'ProcessDefinition:';
const loading = reactive<any>({});

const bpmnPreviewModalRef = ref(),
    codePreviewModalRef = ref();

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
  expandConfig: {
    trigger: 'row',
    lazy: true,
    toggleMethod: ({row, expanded}) => {
      if (expanded) {
        tableApi.grid.reloadRowExpand(row);
      }
      return true;
    },
    loadMethod: ({row}) => {
      return loadSubData(row, 1, 10); // 首次展开加载第一页
    },
  },
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        currentModelInfo.value = {};
        formValues.categoryCode = currentCategory.value.code;
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

const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});
const expandData = reactive<any>({});
// 加载子表数据
const loadSubData = async (row, currentPage, pageSize) => {
  loading[row.id] = true;
  try {
    const res = await findHisProcessDefinitionPagerModel({
      query: {
        pageNum: currentPage,
        pageSize: pageSize,
      },
      entity: {key: row.modelKey}
    });// mockApi(row.id, currentPage, pageSize); // 模拟异步请求
    expandData[row.id] = {
      list: res.rows,
      currentPage,
      pageSize,
      total: res.total,
      loaded: true // 标记已加载过
    };
  } catch (e){
    console.error(e);
  } finally {
    loading[row.id] = false;
  }
};

// 子表分页切换
const handlePageChange = (row, currentPage, pageSize) => {
  debugger;
  loadSubData(row, currentPage, pageSize);
};
const subGridOptions: VxeGridProps = {
  columns: hisDefinitionColumns,
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
    enabled: false,
    /*ajax: {
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
    },*/
  },
};

const createSubGridOptions = (row: Recordable<any>) => {
  return {
    columns: hisDefinitionColumns,
    columnConfig: {resizable: true},
    loading: loading[row.id],
    data: expandData[row.id]?.list || [],
    toolbarConfig: {enabled: false},
    pagerConfig: {
      currentPage: expandData[row.id]?.currentPage || 1,
      pageSize: expandData[row.id]?.pageSize || 10,
      total: expandData[row.id]?.total || 0,
      align: 'center'
    }
  };
}

const [SubBasicTable, subTableApi] = useVbenVxeGrid({gridOptions: subGridOptions});

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
      auth: [PerPrefix + PerEnum.UPDATE],
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
      auth: [PerPrefix + PerEnum.UPDATE],
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

function handlePreview(record: Recordable<any>, e) {
  bpmnPreviewModalRef.value.setData({modelKey: record.modelKey});
  bpmnPreviewModalRef.value.open();
}

function handleDefPreview(record: Recordable<any>) {
  bpmnPreviewModalRef.value.setData({
    modelKey: record.key,
  });
  bpmnPreviewModalRef.value.open();
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

async function handleSuspend(record: Recordable<any>, itemRecord: Recordable<any>) {
  const {success, msg} = await suspendProcessDefinition({id: itemRecord.id});
  if (success) {
    message.success(msg, 2);
    itemRecord.suspensionState = itemRecord.suspensionState === 1 ? 2 : 1;
  } else {
    message.error(msg, 2);
  }
}

async function handleActivate(record: Recordable<any>, itemRecord: Recordable<any>) {
  const {success, msg} = await activateProcessDefinition({id: itemRecord.id});
  if (success) {
    message.success(msg, 2);
    itemRecord.suspensionState = itemRecord.suspensionState === 1 ? 2 : 1;
  } else {
    message.error(msg, 2);
  }
}

function handleSelect(node: any) {
  currentCategory.value = node;
  tableApi.reload();
}
</script>

