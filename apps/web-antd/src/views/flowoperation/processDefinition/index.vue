<template>
  <PageWrapper v-loading="loadingRef" dense contentFullHeight fixedHeight contentClass="flex">
    <FlowCategoryTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="process-definition w-3/4 xl:w-4/5">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                tooltip: '流程图预览',
                icon: 'ant-design:partition-outlined',
                onClick: handlePreview.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
      <template #expandedRowRender="{ record, index, indent, expanded }">
        <BasicTable @register="registerSubTable">
          <template #bodyCell="{ column, record: itemRecord }">
            <template v-if="column.key === 'action'">
              <TableAction
                :actions="[
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
                    auth: 'ProcessDefinition:' + PerEnum.UPDATE,
                    icon: 'ant-design:pause-circle-outlined',
                    color: 'error',
                    tooltip: '挂起',
                    ifShow: itemRecord.suspensionState === 1,
                    popConfirm: {
                      title: '是否确认挂起',
                      confirm: handleSuspend.bind(null, record, itemRecord),
                    },
                  },
                  {
                    auth: 'ProcessDefinition:' + PerEnum.UPDATE,
                    icon: 'ant-design:play-circle-outlined',
                    color: 'success',
                    tooltip: '激活',
                    ifShow: itemRecord.suspensionState === 2,
                    popConfirm: {
                      title: '是否确认激活',
                      confirm: handleActivate.bind(null, record, itemRecord),
                    },
                  },
                ]"
              />
            </template>
          </template>
        </BasicTable>
      </template>
    </BasicTable>

    <BpmnPreviewModal @register="registerBpmnPreviewModal" />
    <CodePreviewModal @register="registerCodePreviewModal" :minHeight="200" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PerEnum } from '@/enums/perEnum';
  import { ref, unref, nextTick } from 'vue';

  import { BasicTable, useTable, TableAction } from '@/components/Table';

  import { getModelInfoPageList, stopBpmn } from '#/api/flowable/bpmn/modelInfo';
  import { PageWrapper } from '@/components/Page';
  import FlowCategoryTree from '@/views/components/leftTree/FlowCategoryTree.vue';

  import { useModal } from '@/components/Modal';
  import BpmnPreviewModal from '@/views/components/preview/bpmnPreview/index.vue';
  import { getAll } from '#/api/base/app';
  import {
    findHisProcessDefinitionPagerModel,
    suspendProcessDefinition,
    activateProcessDefinition,
    loadXmlByProcessDefinitionId,
  } from '#/api/flowoperation/processDefinition';
  import { columns, hisDefinitionColumns, searchFormSchema } from './processDefinition.data';
  import CodePreviewModal from '@/views/components/preview/codePreview/index.vue';
  import { useLoading } from '@/components/Loading';
  import {message, Button} from 'ant-design-vue'

  const [
    registerBpmnPreviewModal,
    { openModal: openBpmnPreviewModal, setModalProps: setBpmnPreviewProps },
  ] = useModal();
  const [
    registerCodePreviewModal,
    { openModal: openCodePreviewModal, setModalProps: setCodePreviewModalProps },
  ] = useModal();
  const currentModelInfo = ref<Recordable>({});
  const expandedRowKeys = ref([]);
  const currentCategory = ref<Recordable>({});
  const loadingRef = ref(false);
  const subTableLoading = ref(false);
  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '加载中...',
  });

  const [registerTable, { getForm, reload, setLoading }] = useTable({
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
  });

  const [
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
  });

  nextTick(() => {
    const { updateSchema } = getForm();
    getAll().then((res) => {
      updateSchema([
        {
          field: 'appSn',
          componentProps: { options: res, labelField: 'id' },
        },
      ]);
    });
  });

  function handlePreview(record: Recordable, e) {
    e.stopPropagation();
    openBpmnPreviewModal(true, {
      modelKey: record.modelKey,
    });
    setBpmnPreviewProps({
      centered: true,
      useWrapper: false,
      showOkBtn: false,
      cancelText: '关闭',
    });
  }

  function handleDefPreview(record: Recordable) {
    openBpmnPreviewModal(true, {
      modelKey: record.key,
    });
    setBpmnPreviewProps({
      title: `预览-${record.name}`,
      centered: true,
      useWrapper: false,
      showOkBtn: false,
      cancelText: '关闭',
    });
  }

  function handlePreviewXml(record: Recordable, e) {
    e.stopPropagation();
    openFullLoading();
    loadXmlByProcessDefinitionId({ processDefinitionId: record.id })
      .then((res) => {
        openCodePreviewModal(true, {
          record: { code: res, type: 'xml' },
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
      })
      .finally(() => {
        closeFullLoading();
      });
  }

  function handleSuspend(record: Recordable, itemRecord: Recordable) {
    setLoading(true);
    suspendProcessDefinition({ id: itemRecord.id })
      .then((res) => {
        const { success, msg } = res.data;
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

  function handleActivate(record: Recordable, itemRecord: Recordable) {
    setLoading(true);
    activateProcessDefinition({ id: itemRecord.id })
      .then((res) => {
        const { success, msg } = res.data;
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

  function handleStop(record: Recordable) {
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
    let searchInfo = { categoryCode: node ? node.code : '' };
    reload({ searchInfo });
  }
</script>

<style lang="less">
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
