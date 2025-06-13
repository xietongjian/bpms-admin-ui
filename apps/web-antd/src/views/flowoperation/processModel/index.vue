<template>
  <Page auto-content-height v-loading="loadingRef" dense contentFullHeight fixedHeight contentClass="flex">
    <FlowCategoryTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5">
      <template #toolbar>
        <Button type="primary" @click="handleCreate"> 新增 </Button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction :actions="createActions(record, column)" />
        </template>
      </template>
    </BasicTable>

    <BpmnPreviewModal @success="handleSuccess" />
  </Page>
</template>
<script lang="ts" setup>
  import { ref, unref, nextTick } from 'vue';

  import type {Recordable} from '@vben/types';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {VxeGridProps, VxeGridListeners} from '#/adapter/vxe-table';

  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {ColPage, Page} from '@vben/common-ui';
  import {TableAction} from '#/components/table-action';


  import {
    getModelInfoPageList,
    deleteByIds,
    publishBpmn,
    stopBpmn,
  } from '#/api/flowable/bpmn/modelInfo';
  // import { PageWrapper } from '@/components/Page';
  import FlowCategoryTree from '#/views/components/leftTree/FlowCategoryTree.vue';

  import {BpmnPreviewModal} from '#/views/components/preview';
  import { getAll } from '#/api/base/app';
  import { columns, searchFormSchema } from './modelInfo.data';
  import {Button, message} from 'ant-design-vue'

  const currentCategory = ref<Recordable<any>>({});
  const loadingRef = ref(false);

  const [registerTable, { getForm, reload }] = useTable({
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
    searchInfo: { modelType: 0 },
    useSearchForm: true,
    showIndexColumn: false,
    bordered: true,
    actionColumn: {
      width: 210,
      align: 'left',
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  nextTick(() => {
    const { updateSchema } = tableApi.formApi;
    getAll().then((res) => {
      updateSchema([
        {
          fieldName: 'appSn',
          componentProps: { options: res, labelField: 'id' },
        },
      ]);
    });
  });

  function handleCreate() {
    if (!unref(currentCategory).code) {
      message.warning('请选择分类！', 2);
      return;
    }
    openModal(true, {
      record: { categoryCode: unref(currentCategory).code },
      isUpdate: true,
    });
  }

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
        icon: 'ant-design:stop-twotone',
        tooltip: '停用',
        label: '',
        popConfirm: {
          title: '确认停用吗?',
          confirm: handleStop.bind(null, record),
          okButtonProps: {
            danger: true,
          },
        },
        ifShow: status === 3 || status === 2,
      },
      {
        icon: 'clarity:note-edit-line',
        tooltip: '修改',
        label: '',
        onClick: handleEdit.bind(null, record),
      },
      {
        icon: 'ant-design:delete-outlined',
        danger: true,
        tooltip: '删除',
        label: '',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
          okButtonProps: { danger: true },
        },
      },
    ];
    return actions;
  }

  function handlePreview(record: Recordable<any>) {
    openBpmnPreviewModal(true, {
      modelKey: record.modelKey,
    });
    ssetBpmnPreviewProps({
      title: `预览-${record.name}`,
      bodyStyle: { padding: '0px', margin: '0px' },
      showOkBtn: false,
      showCancelBtn: true,
      centered: true,
      cancelText: '关闭',
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
    let searchInfo = { categoryCode: node ? node.code : '' };
    reload({ searchInfo });
  }
</script>

<style lang="scss" scoped>
  .modelInfo-roles {
    > span {
      margin-right: 4px;
    }
  }
</style>
