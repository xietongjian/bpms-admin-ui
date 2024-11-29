<template>
  <BasicModal
    wrapClassName="export-form-data-modal"
    v-bind="$attrs"
    :title="t('component.excel.exportModalTitle')"
    @ok="handleOk"
    @register="registerModal"
  >
    <Table @register="registerFormDataTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'"> </template>
      </template>
    </Table>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, defineEmits } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { FormSchema } from '@/components/Form/index';
  import { BasicTable, useTable, BasicColumn } from '@/components/Table';
  import {Table} from 'ant-design-vue';

  import { useMessage } from '@/hooks/web/useMessage';
  import { useI18n } from '@/hooks/web/useI18n';

  const emit = defineEmits(['success', 'register']);

  const columns: BasicColumn[] = [
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
  ];

  const searchFormSchema: FormSchema[] = [
    {
      field: 'formCode',
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
  const { t } = useI18n();

  const { createMessage } = useMessage();

  const [registerFormDataTable, { reload, setTableData, getSelectRows }] = useTable({
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
  });
  const [registerModal, { closeModal }] = useModalInner((data) => {
    // 展示用于导出的数据列
    setTableData([]);
  });

  async function handleOk() {
    const selectedRows = getSelectRows();
    if (selectedRows.length <= 0) {
      createMessage.warn('请选择要导出的数据！');
      return;
    }
    emit('success', {
      selectedRows,
    });
  }
</script>

<style lang="less">
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
