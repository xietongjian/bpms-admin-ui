<template>
  <BasicModal
    wrapClassName="export-matrix-role-modal"
    v-bind="$attrs"
    :title="t('component.excel.exportModalTitle')"
  >
    <BasicTable @register="registerRolesTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'"> </template>
      </template>
    </BasicTable>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, defineEmits } from 'vue';
  // import { BasicModal, useModalInner } from '@/components/Modal';
  import type {VxeGridProps, VxeGridListeners} from '#/adapter/vxe-table';

  import {useVbenModal, VbenFormProps} from '@vben/common-ui';
  import {useVbenVxeGrid} from "#/adapter/vxe-table";

  // import { FormSchema } from '@/components/Form/index';
  // import { BasicTable, useTable, BasicColumn } from '@/components/Table';
  // import { useMessage } from '@/hooks/web/useMessage';
  // import { useI18n } from '@/hooks/web/useI18n';
  import {message} from 'ant-design-vue';
  import {getCompanyMatrixList} from "#/api/flowsetting/rolePersonal";

  const emit = defineEmits(['success', 'register']);

/*  const formOptions: VbenFormProps = {
    showCollapseButton: false,
    submitOnEnter: true,
    commonConfig: {
      labelWidth: 60,
    },
    actionWrapperClass: 'col-span-3 col-start-3 text-left ml-4',
    resetButtonOptions: {
      show: false,
    },
    schema: searchFormSchema,
  };*/

  const columns: any[] = [
    {
      title: '名称',
      dataIndex: 'name',
      align: 'left',
    },
    {
      title: '标识',
      dataIndex: 'sn',
      width: 180,
      align: 'left',
    },
    {
      title: '备注',
      dataIndex: 'note',
      align: 'left',
    },
  ];

  const gridOptions: VxeGridProps<any> = {
    showHeaderOverflow: true,
    showOverflow: false,
    columns,
    columnConfig: {resizable: true},
    height: 'auto',
    border: false,
    stripe: true,
    pagerConfig: {
      enabled: false,
    },
    rowConfig: {
      keyField: 'id',
      isHover: true,
    },
    treeConfig: {
      parentField: 'pid',
      rowField: 'id',
      transform: true,
    },
    proxyConfig: {
      ajax: {
        query: async ({page}, formValues) => {
          return await getCompanyMatrixList(formValues);
        },
        querySuccess: async (params) => {
          // await loadMatrixColumn();
          // await handleScrollTag();
        }
      },
    },
  };

  const [BasicTable, tableApi] = useVbenVxeGrid({gridOptions});

  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          // formApi.setValues(values);
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      // handleSubmit();
    },
  });

  const searchFormSchema = [
    {
      field: 'keyword',
      label: '关键字',
      component: 'Input',
      componentProps: {
        placeholder: '请输入名称/标识',
        allowClear: true,
      },
      labelWidth: 60,
      colProps: { span: 18 },
    },
  ];
  const { t } = useI18n();

  const fileName = ref('');
  const [registerRolesTable, { reload, setTableData, getSelectRows }] = useTable({
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
  });
  const [registerModal, { closeModal }] = useModalInner((data) => {
    const { roles, exportFileName } = data;
    fileName.value = exportFileName;
    // 展示用于导出的数据列
    setTableData(roles);
  });

  async function handleOk() {
    const selectedRows = getSelectRows();
    if (selectedRows.length <= 0) {
      message.warn('请选择要导出的角色！');
      return;
    }
    emit('success', {
      selectedRows,
    });
  }
</script>

<style lang="scss">
  .export-matrix-role-modal {
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
