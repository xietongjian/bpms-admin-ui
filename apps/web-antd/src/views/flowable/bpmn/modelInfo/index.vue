<template>
  <PageWrapper v-loading="loadingRef" dense contentFullHeight fixedHeight contentClass="flex">
    <FlowCategoryTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction :actions="createActions(record, column)" />
        </template>
      </template>
    </BasicTable>

    <ModelInfoModal @register="registerModal" @success="handleSuccess" />
    <BpmnPreviewModal @register="registerBpmnPreviewModal" @success="handleSuccess" />
    <CodePreviewModal @register="registerCodePreviewModal" :minHeight="200" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PerEnum } from '@/enums/perEnum';
  import { ref, nextTick } from 'vue';

  import { BasicTable, useTable, TableAction, BasicColumn, ActionItem } from '@/components/Table';

  import {
    getModelInfoPageList,
    deleteByIds,
    publishBpmn,
    stopBpmn,
    getBpmnByModelKey,
  } from '@/api/flowable/bpmn/modelInfo';
  import { PageWrapper } from '@/components/Page';
  import FlowCategoryTree from '@/views/components/leftTree/FlowCategoryTree.vue';
  import { useModal } from '@/components/Modal';
  import ModelInfoModal from './ModelInfoModal.vue';
  import BpmnPreviewModal from '@/views/components/preview/bpmnPreview/index.vue';
  import CodePreviewModal from '@/views/components/preview/codePreview/index.vue';
  import { getAll } from '@/api/base/app';
  import { columns, searchFormSchema } from './modelInfo.data';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();

  const [registerModal, { openModal }] = useModal();

  const [
    registerBpmnPreviewModal,
    { openModal: openBpmnPreviewModal, setModalProps: setBpmnPreviewProps },
  ] = useModal();
  const [
    registerCodePreviewModal,
    { openModal: openCodePreviewModal, setModalProps: setCodePreviewModalProps },
  ] = useModal();

  const currentCategory = ref<Recordable>({});
  const loadingRef = ref(false);

  const [registerTable, { getForm, reload }] = useTable({
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

  function createActions(record: Recordable, column: BasicColumn): ActionItem[] {
    const { status } = record;
    let actions: ActionItem[] = [
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
        auth: 'Bpmn:' + PerEnum.PUBLISH,
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
        auth: 'Bpmn:' + PerEnum.PUBLISH,
        icon: 'ant-design:stop-twotone',
        tooltip: '停用',
        label: '',
        color: 'error',
        popConfirm: {
          title: '确认停用吗?',
          confirm: handleStop.bind(null, record),
          placement: 'left',
        },
        ifShow: status === 3 || status === 2,
      },
      {
        auth: 'Bpmn:' + PerEnum.UPDATE,
        icon: 'clarity:note-edit-line',
        tooltip: '修改',
        label: '',
        onClick: handleEdit.bind(null, record),
        ifShow: false,
      },
      {
        auth: 'Bpmn:' + PerEnum.DELETE,
        icon: 'ant-design:delete-outlined',
        color: 'error',
        tooltip: '删除',
        label: '',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
        },
        ifShow: false,
      },
    ];
    return actions;
  }

  function handlePreview(record: Recordable<any>) {
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

  function handlePreviewXml(record: Recordable, e) {
    e.stopPropagation();
    getBpmnByModelKey({ modelKey: record.modelKey }).then((res) => {
      openCodePreviewModal(true, {
        record: { code: res.modelXml, type: 'xml' },
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
      reload();
    });
  }

  function handlePublish(record: Recordable<any>) {
    loadingRef.value = true;
    publishBpmn(record.modelId)
      .then((res) => {
        reload();
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
        reload();
      })
      .finally(() => {
        loadingRef.value = false;
      });
  }

  function handleSuccess() {
    reload();
  }

  function handleSelect(node: any) {
    currentCategory.value = node;
    let searchInfo = { categoryCode: node ? node.code : '' };
    reload({ searchInfo });
  }
</script>

<style lang="less" scoped>
  .modelInfo-roles {
    > span {
      margin-right: 4px;
    }
  }
</style>
