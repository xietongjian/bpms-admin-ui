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
    <template #left>
      <div class="h-full bg-card overflow-y-auto">
        <BasicTree
          ref="basicTreeRef"
          title="流程模板"
          :show-search="true"
          :show-toolbar="true"
          :tree-data="treeData"
          class="h-full flex flex-col"
          size="small"
          @select="handleSelect"
          :height="treeHeight"
        />
<!--        <BasicTree
            title="表单分类"
            toolbar
            search
            treeWrapperClassName="h-[calc(100%-35px)] overflow-auto"
            :clickRowToExpand="false"
            :treeData="treeData"
            block-node
            ref="basicTreeRef"
            @select="handleSelect"
        >
          <template #title="{ name, sourceType }">
            &lt;!&ndash; 如果是分类则不可点击 &ndash;&gt;
            <span v-if="sourceType === '1'" style="color: gray">{{ name }}</span>
            <span v-else style="color: #1890ff">{{ name }}</span>
          </template>
        </BasicTree>-->
      </div>
    </template>
    <BasicTable class="ml-2">
      <template #toolbar-tools>
        <Button type="primary" @click="handleExport"> 导出Excel</Button>
      </template>

      <template #action="{row}">
        <TableAction :actions="createActions(row)"/>
      </template>
    </BasicTable>
    <BpmnPreviewModal ref="bpmnPreviewModalRef" />
    <ProcessFormPreviewDrawer ref="processFormPreviewDrawerRef" />
  </ColPage>
</template>
<script lang="ts" setup>
import {ref, unref, watch, nextTick, onMounted, computed} from 'vue';
import {TableAction} from '#/components/table-action';
import type {Recordable} from '@vben/types';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import {PerEnum} from "#/enums/perEnum";
import {BasicTree} from "#/components/tree";

import {ColPage, Page} from '@vben/common-ui';
import {useElementSize} from "@vueuse/core";

import {baseColumns, searchFormSchema} from './formCount.data';
import {
  getCustomColumnsByFormId,
  getFormTree,
  exportExcel,
  //exportExcelByCode,
  getPagerModelCustomData,
} from '#/api/report/formCount';
import {forEach} from '#/utils/helper/treeHelper';
import {useVbenVxeGrid} from '#/adapter/vxe-table';
import {Button, Image, Tag, message, Tree} from 'ant-design-vue';

import {BpmnPreviewModal, ProcessFormPreviewDrawer} from '#/views/components/preview';
const basicTreeRef = ref<any>(null);

// import {downloadBlob} from "#/utils/file/download";
const { height } = useElementSize(basicTreeRef);

const treeHeight = computed(() => {
  return height.value - 70;
})

const bpmnPreviewModalRef = ref(),
    processFormPreviewDrawerRef = ref();
const treeData = ref<any[]>([]);
const treeLoading = ref<boolean>(false);
const currentModelInfo = ref<Recordable<any>>({});
const currentNode = ref<Recordable<any>>({});
const showPublishBtn = ref(false);
const showStopBtn = ref(false);

const formOptions: VbenFormProps = {
  showCollapseButton: true,
  collapsedRows: 1,
  compact: true,
  collapsed: true,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 80,
  },
  resetButtonOptions: {
    show: true,
  },
  schema: searchFormSchema,
  fieldMappingTime: [['dateRange', ['startTime', 'endTime'], 'YYYY-MM-DD HH:mm:ss']],
};

const gridOptions: VxeGridProps = {
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
        formValues.formId = unref(currentNode).id;

        if(!formValues.formId){
          // message.warn('请先选择左侧表单！')
          return null;
        }
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

function createActions(row: Recordable<any>) {
  return [
    {
      label: '',
      tooltip: '查看表单',
      icon: 'ant-design:pic-right-outlined',
      onClick: handleViewForm.bind(null, row),
    },
    {
      icon: 'ant-design:partition-outlined',
      tooltip: '流程图预览',
      onClick: handlePreview.bind(null, row),
    },
  ];
}

async function fetch() {
  treeLoading.value = true;
  const res = await getFormTree();

  treeData.value = res as unknown as any[];
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
        {id: 'id', children: 'children', pid: 'pid'},
    );
    // 加载后展开节层级
    if (categoryKeys) {
      // unref(basicTreeRef).setExpandedKeys(categoryKeys);
    }
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
  record.procInstId = record.proc_inst_id;
  record.businessKey = record.code;
  record.modelKey = record.model_key;
  record.viewFormTitle = record.title;
  processFormPreviewDrawerRef.value.setData(record).open();
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
  const {validate} = getForm();
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

function changeSelection({keys, rows}) {
  if (!rows[0]) {
    return;
  }
  currentModelInfo.value = rows[0];
  changePublishStopBtnShow(rows[0].status);
}

async function handleSelect(node: any, e) {
  if (!node) {
    return;
  }
  if (node.sourceType === '1') {
    message.warning('请选择表单');
    return;
  }
  currentNode.value = node;

  // 查询表单的列数据
  const res = await getCustomColumnsByFormId({formId: node.id});
  if(res){
    let columns = res.map((item) => {
      return {
        title: item.column_comment,
        field: item.column_name,
        minWidth: 200,
        width: 200,
        resizable: true,
        align: 'left',
      };
    });
    columns.push(  {
      field: 'action',
      fixed: 'right',
      slots: {default: 'action'},
      title: '操作',
      width: 120,
    });
    await tableApi.grid.reloadColumn(columns);
    tableApi.reload();
  }
}

</script>

<style lang="scss" scoped>
.modelInfo-roles {
  > span {
    margin-right: 4px;
  }
}
</style>
