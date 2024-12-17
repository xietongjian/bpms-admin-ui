<template>
  <PageWrapper v-loading="loadingRef" dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction :actions="createActions(record, column)" />
        </template>
      </template>
    </BasicTable>

    <BpmnPreviewModal @register="registerBpmnPreviewModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref, nextTick } from 'vue';

  import { BasicTable, useTable, TableAction, BasicColumn, ActionItem } from '@/components/Table';

  import { PageWrapper } from '@/components/Page';

  import { useModal } from '@/components/Modal';
  import BpmnPreviewModal from '@/views/components/preview/bpmnPreview/index.vue';
  import { columns, searchFormSchema } from './modelCount.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useGo } from '@/hooks/web/usePage';
  import { getModelPagerModel } from '@/api/report/modelCount';
  import { getAllFormType } from '@/api/form/form';

  const { createMessage } = useMessage();

  const go = useGo();
  const [registerModal, { openModal }] = useModal();
  const [
    registerBpmnPreviewModal,
    { openModal: openBpmnPreviewModal, setModalProps: setBpmnPreviewProps },
  ] = useModal();
  const loadingRef = ref(false);

  const [registerTable, { getForm, reload }] = useTable({
    title: '列表',
    api: getModelPagerModel,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      showAdvancedButton: false,
      showResetButton: false,
      autoSubmitOnEnter: true,
      submitFunc: doSearchFunc,
    },
    useSearchForm: true,
    showIndexColumn: false,
    bordered: true,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
    },
  });

  nextTick(() => {
    const { updateSchema } = getForm();

    getAllFormType().then((res) => {
      updateSchema([
        {
          field: 'formType',
          componentProps: { options: res },
        },
      ]);
    });
  });

  /**
   *  自定义搜索功能
   **/
  async function doSearchFunc() {
    const { validate, setProps } = getForm();
    try {
      const values = await validate();
      setProps({
        submitButtonOptions: {
          loading: true,
        },
      });
      await reload(values);
    } catch (error) {
    } finally {
      setProps({
        submitButtonOptions: {
          loading: false,
        },
      });
    }
  }

  function createActions(record: Recordable, column: BasicColumn): ActionItem[] {
    let actions: ActionItem[] = [
      {
        icon: 'ant-design:partition-outlined',
        tooltip: '流程图预览',
        label: '',
        onClick: handlePreview.bind(null, record),
      },
    ];
    return actions;
  }

  function handlePreview(record: Recordable) {
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

  function handleSuccess() {
    reload();
  }
</script>

<style lang="less" scoped>
  .modelInfo-roles {
    > span {
      margin-right: 4px;
    }
  }
</style>
