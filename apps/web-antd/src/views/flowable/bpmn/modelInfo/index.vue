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
      <CodePreviewModal ref="codePreviewModalRef" :minHeight="200"/>
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
  getBpmnByModelKey,
} from '#/api/flowable/bpmn/modelInfo';
import FlowCategoryTree from '#/views/components/leftTree/FlowCategoryTree.vue';
import ModelInfoModal from './ModelInfoModal.vue';
import CodePreviewModal from '#/views/components/preview/codePreview/index.vue';
import {columns, searchFormSchema} from './modelInfo.data';
import {message} from 'ant-design-vue'

const PerPrefix = 'Bpmn:';
const currentCategory = ref<Recordable<any>>({});
const loadingRef = ref(false);
const modelInfoModalRef = ref(),
    bpmnPreviewModalRef = ref(),
    codePreviewModalRef = ref();

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
        // currentModelInfo.value = {};
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


nextTick(() => {
  // const {updateSchema} = tableApi.formApi;
  /*getAll().then((res) => {
    updateSchema([
      {
        fieldName: 'appSn',
        componentProps: {options: res, labelField: 'id'},
      },
    ]);
  });*/
});

function createActions(record: Recordable<any>) {
  const {status} = record;
  return [
    {
      icon: 'ant-design:partition-outlined',
      tooltip: '流程图预览',
      label: '',
      onClick: handlePreview.bind(null, record),
    },
    {
      icon: 'ant-design:code-outlined',
      tooltip: '查看XML',
      label: '',
      onClick: handlePreviewXml.bind(null, record),
    },
    {
      auth: [PerPrefix + PerEnum.PUBLISH],
      icon: 'ant-design:play-circle-filled',
      tooltip: '发布',
      label: '',
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
      label: '',
      danger: true,
      popConfirm: {
        title: '确认停用吗?',
        confirm: handleStop.bind(null, record),
        placement: 'left',
        okButtonProps: {
          danger: true,
        },
      },
      ifShow: status === 3 || status === 2,
    },
    {
      auth: [PerPrefix + PerEnum.UPDATE],
      icon: 'clarity:note-edit-line',
      tooltip: '修改',
      label: '',
      onClick: handleEdit.bind(null, record),
      ifShow: false,
    },
    {
      auth: [PerPrefix + PerEnum.DELETE],
      icon: 'ant-design:delete-outlined',
      danger: true,
      tooltip: '删除',
      label: '',
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, record),
      },
      ifShow: false,
      okButtonProps: {
        danger: true,
      }
    },
  ];
}

function handlePreview(record: Recordable<any>) {
  bpmnPreviewModalRef.value.setData({modelKey: record.modelKey});
  bpmnPreviewModalRef.value.open();
}

async function handlePreviewXml(record: Recordable<any>, e) {
  // e.stopPropagation();
  const {modelXml} = await getBpmnByModelKey({modelKey: record.modelKey});
  codePreviewModalRef.value.setData({code: modelXml});
  codePreviewModalRef.value.open();
  codePreviewModalRef.value.setState({
    title: `查看【${record.name}】的XML`,
  });
}

function handleEdit(record: Recordable<any>) {
  openModal(true, {
    record,
    isUpdate: true,
  });
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
