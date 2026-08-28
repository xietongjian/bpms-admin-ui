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
      <BasicTable>
        <template #action="{ row }">
          <TableAction :actions="createActions(row)"/>
        </template>
      </BasicTable>

      <ModelInfoModal ref="modelInfoModalRef" @success="handleSuccess"/>
      <BpmnPreviewModal ref="bpmnPreviewModalRef" @success="handleSuccess"/>
    </div>
  </ColPage>
</template>
<script lang="ts" setup>
import {PerEnum} from '#/enums/perEnum';
import type {VbenFormProps} from '@vben/common-ui';
import type {VxeGridProps, VxeGridListeners} from '#/adapter/vxe-table';
import {BpmnPreviewModal} from '#/views/components/preview';

import {useVbenVxeGrid} from '#/adapter/vxe-table';
import type {Recordable} from '@vben/types';
import {ColPage, Page} from '@vben/common-ui';
import {TableAction} from '#/components/table-action';
import {ref, nextTick} from 'vue';
import {
  getModelInfoPageList,
  deleteByIds,
  publishBpmn,
  stopBpmn,
} from '#/api/flowable/bpmn/modelInfo';
import FlowCategoryTree from '#/views/components/leftTree/FlowCategoryTree.vue';
import ModelInfoModal from '#/views/flowable/bpmn/modelInfo/ModelInfoModal.vue';
import {columns, searchFormSchema} from './modelInfo.data';
import {message} from 'ant-design-vue'

const PerPrefix = 'Bpmn:';
const currentCategory = ref<Recordable<any>>({});
const loadingRef = ref(false);
const modelInfoModalRef = ref(),
    bpmnPreviewModalRef = ref();

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
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
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

const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

function createActions(record: Recordable<any>) {
  const {status} = record;
  return [
    {
      icon: 'ant-design:partition-outlined',
      tooltip: '流程图预览',
      onClick: handlePreview.bind(null, record),
    },
    {
      auth: [PerPrefix + PerEnum.PUBLISH],
      icon: 'ant-design:play-circle-filled',
      tooltip: '发布',
      popConfirm: {
        title: '确认发布吗?',
        placement: 'left',
        confirm: handlePublish.bind(null, record),
      },
      ifShow: status === 2,
    },
    {
      auth: [PerPrefix + PerEnum.PUBLISH],
      icon: 'ant-design:stop-twotone',
      tooltip: '停用',
      danger: true,
      popConfirm: {
        title: '确认停用吗?',
        confirm: handleStop.bind(null, record),
        placement: 'left',
      },
      ifShow: status === 3 || status === 2,
    },
    {
      auth: [PerPrefix + PerEnum.UPDATE],
      icon: 'ant-design:form-outlined',
      tooltip: '修改',
      onClick: handleEdit.bind(null, record),
    },
    {
      auth: [PerPrefix + PerEnum.DELETE],
      icon: 'ant-design:delete-outlined',
      danger: true,
      tooltip: '删除',
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, record),
      },
    },
  ];
}

function handlePreview(record: Recordable<any>) {
  bpmnPreviewModalRef.value.setData({modelKey: record.modelKey});
  bpmnPreviewModalRef.value.open();
}

function handleEdit(record: Recordable<any>) {
  modelInfoModalRef.value.setData({
    record,
    isUpdate: true,
  });
  modelInfoModalRef.value.open();
}

function handleDelete(record: Recordable<any>) {
  deleteByIds([record.id]).then((res) => {
    tableApi.reload();
  });
}

function handlePublish(record: Recordable<any>) {
  loadingRef.value = true;
  publishBpmn(record.modelId)
      .then((res) => {
        tableApi.reload();
        message.success('发布成功！', 2);
      })
      .finally(() => {
        loadingRef.value = false;
      });
}

async function handleStop(record: Recordable<any>) {
  loadingRef.value = true;
  try {
    const {success, msg} = await stopBpmn(record.modelId);
    if (success) {
      tableApi.reload();
      message.success(msg);
    }
  } catch (e) {
    console.error(e);
  } finally {
    loadingRef.value = false;
  }
}

function handleSuccess() {
  tableApi.reload();
}

function handleSelect(node: any) {
  currentCategory.value = node;
  let searchInfo = {categoryCode: node ? node.code : ''};
  tableApi.reload({searchInfo});
}
</script>

<style lang="scss" scoped>
.modelInfo-roles {
  > span {
    margin-right: 4px;
  }
}
</style>