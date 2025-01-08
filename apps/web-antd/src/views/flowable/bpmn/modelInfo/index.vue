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
      <FlowCategoryTree class="h-full" @select="handleSelect"/>
    </template>
    <div class="bg-card h-full">
      <BasicTable>
        <template #action="{ row }">
          <TableAction :actions="createActions(row)"/>
        </template>
      </BasicTable>

      <ModelInfoModal ref="modelInfoModalRef" @register="registerModal" @success="handleSuccess"/>
      <BpmnPreviewModal ref="bpmnPreviewModalRef" @register="registerBpmnPreviewModal" @success="handleSuccess"/>
      <CodePreviewModal ref="codePreviewModalRef" @register="registerCodePreviewModal" :minHeight="200"/>
    </div>
  </ColPage>
</template>
<script lang="ts" setup>
import {PerEnum} from '#/enums/perEnum';
import {useAccess} from '@vben/access';
import type {VbenFormProps} from '@vben/common-ui';
import type {VxeGridProps, VxeGridListeners} from '#/adapter/vxe-table';
import {BpmnPreviewModal} from '#/views/components/preview';

import {useVbenVxeGrid} from '#/adapter/vxe-table';
import type {Recordable} from '@vben/types';
import {ColPage, Page} from '@vben/common-ui';
import {TableAction} from '#/components/table-action';
import {ref, nextTick} from 'vue';

// import { BasicTable, useTable, TableAction, BasicColumn, ActionItem } from '@/components/Table';

import {
  getModelInfoPageList,
  deleteByIds,
  publishBpmn,
  stopBpmn,
  getBpmnByModelKey,
} from '#/api/flowable/bpmn/modelInfo';
// import { PageWrapper } from '@/components/Page';
import FlowCategoryTree from '#/views/components/leftTree/FlowCategoryTree.vue';
// import { useModal } from '@/components/Modal';
import ModelInfoModal from './ModelInfoModal.vue';
// import BpmnPreviewModal from '#/views/components/preview/bpmnPreview/index.vue';
import CodePreviewModal from '#/views/components/preview/codePreview/index.vue';
import {columns, searchFormSchema} from './modelInfo.data';
import {getCustomPagerModel} from "#/api/form/customForm";
// import { useMessage } from '@/hooks/web/useMessage';

// const { createMessage } = useMessage();

// const [registerModal, { openModal }] = useModal();

/*  const [
    registerBpmnPreviewModal,
    { openModal: openBpmnPreviewModal, setModalProps: setBpmnPreviewProps },
  ] = useModal();
  const [
    registerCodePreviewModal,
    { openModal: openCodePreviewModal, setModalProps: setCodePreviewModalProps },
  ] = useModal();*/

const currentCategory = ref<Recordable<any>>({});
const loadingRef = ref(false);
const PerPrefix = 'Bpmn:';
const modelInfoModalRef = ref(),
    bpmnPreviewModalRef = ref();
const codePreviewModalRef = ref();

/*const [registerTable, { getForm, reload }] = useTable({
  title: '列表',
  api: getModelInfoPageList,
  columns,
  formConfig: {
    labelWidth: 120,
    schemas: searchFormSchema,
    showAdvancedButton: false,
    showResetButton: false,
    autoSubmitOnEnter: true,
  },
  searchInfo: { modelType: 0 },
  useSearchForm: true,
  showIndexColumn: false,
  bordered: true,
  actionColumn: {
    width: 158,
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
  actionWrapperClass: 'col-span-2 col-start-2 text-left ml-4',
  resetButtonOptions: {
    show: false,
  },
  schema: searchFormSchema,
};

const gridOptions: VxeGridProps = {
  columns,
  columnConfig: {resizable: true},
  height: 'auto',
  maxHeight: '100%',
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
      },
      okButtonProps: {
        danger: true,
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
  /*openBpmnPreviewModal(true, {
    modelKey: record.modelKey,
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
  const {modelXml} = await getBpmnByModelKey({modelKey: record.modelKey});

  debugger;
  codePreviewModalRef.value.setData({code: modelXml});
  codePreviewModalRef.value.open();
  codePreviewModalRef.value.setState({
    title: `查看【${record.name}】的XML`,
  });

  /*getBpmnByModelKey({modelKey: record.modelKey}).then((res) => {
    openCodePreviewModal(true, {
      record: {code: res.modelXml, type: 'xml'},
      isUpdate: false,
    });
    setCodePreviewModalProps({
      width: 900,
      height: 400,
      minHeight: 200,
      title: `查看【${record.name}】的XML`,
      showOkBtn: false,
      cancelText: '关闭',
    });
  });*/
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
        createMessage.success('发布成功！', 2);
      })
      .finally(() => {
        loadingRef.value = false;
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
  tableApi.reload({searchInfo});
}
</script>

<style lang="less" scoped>
.modelInfo-roles {
  > span {
    margin-right: 4px;
  }
}
</style>
