<template>
  <BasicModal
    wrapClassName="export-form-data-modal"
    v-bind="$attrs"
    :title="t('component.excel.exportModalTitle')"
    @ok="handleOk"
    @register="registerModal"
  >
    <BasicTable @register="registerFormDataTable">

    </BasicTable>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, defineEmits, defineExpose, defineProps } from 'vue';
  import {useVbenModal, VbenFormProps} from '@vben/common-ui';
  import {message} from 'ant-design-vue';
  import {useVbenForm} from '#/adapter/form';
  import type {VxeGridProps, VxeGridListeners} from '#/adapter/vxe-table';
  import type {VbenFormSchema as FormSchema} from '@vben/common-ui';

  // import { BasicModal, useModalInner } from '@/components/Modal';
  // import { FormSchema } from '@/components/Form/index';
  // import { BasicTable, useTable, BasicColumn } from '@/components/Table';
  import {Table} from 'ant-design-vue';
  import {getModelInfoPageList} from "#/api/flowable/bpmn/modelInfo";
  import {useVbenVxeGrid} from "#/adapter/vxe-table";

  // import { useMessage } from '@/hooks/web/useMessage';
  // import { useI18n } from '@/hooks/web/useI18n';

  const emit = defineEmits(['success', 'register']);

  const columns: VxeGridProps['columns'] = [
    {
      title: '名称',
      field: 'name',
      align: 'left',
    },
    {
      title: '标识',
      field: 'sn',
      width: 180,
      align: 'left',
    },
  ];

  const searchFormSchema: FormSchema[] = [
    {
      fieldName: 'formCode',
      label: '选择模板',
      component: 'ModelInfoSelector',
      require: true,
      componentProps: {
        multiple: false,
        title: '选择流程模板',
      },
      labelWidth: 60,
      colProps: { span: 18 },
    },
  ];
  // const { t } = useI18n();

  // const { createMessage } = useMessage();


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


  /*const [registerFormDataTable, { reload, setTableData, getSelectRows }] = useTable({
    id: 'exportFormDataTable',
    title: '',
    columns,
    formConfig: {
      labelWidth: 100,
      schemas: searchFormSchema,
      showAdvancedButton: false,
      showResetButton: false,
      autoSubmitOnEnter: true,
    },
    useSearchForm: true,
    bordered: true,
    showIndexColumn: true,
    pagination: false,
    scroll: { y: 400 },
    rowSelection: {
      type: 'checkbox',
    },
    rowKey: 'sn',
    defSort: {
      field: 'name',
      order: 'ascend',
    },
  });*/

  const [BasicModal, modalApi] = useVbenModal({
    fullscreenButton: false,
    // onCancel: handleCancel,
    // onConfirm: handleConfirm,
    onOpenChange: async (isOpen) => {
      if (!isOpen) {
        return null;
      }
      modalApi.setState({loading: true, confirmLoading: true});
      const values = modalApi.getData();
      // await formApi.setValues(values);
      tableApi.setTableData([]);
      modalApi.setState({loading: false, confirmLoading: false});
    },
  });

/*  const [registerModal, { closeModal }] = useModalInner((data) => {
    // 展示用于导出的数据列
    setTableData([]);
  });*/

  async function handleOk() {
    const selectedRows = getSelectRows();
    if (selectedRows.length <= 0) {
      message.warn('请选择要导出的数据！');
      return;
    }
    emit('success', {
      selectedRows,
    });
  }
</script>

<style lang="scss">
  .export-form-data-modal {
    .ant-modal-body {
      .scroll-container {
        padding: 0;
      }
    }
    .vben-basic-table-form-container {
      padding: 0;
    }
  }
</style>
