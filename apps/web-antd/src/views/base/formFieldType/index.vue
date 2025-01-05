<template>
  <Page auto-content-height>
    <BasicTable>
      <template #toolbar-tools >
        <Button v-if="hasAccessByCodes([PerPrefix + PerEnum.ADD])" type="primary" @click="handleCreate">新增</Button>
      </template>
      <template #action="{ row }">
        <TableAction :actions="createActions(row)" />
      </template>
    </BasicTable>
    <FormFieldTypeModal ref="formFieldTypeModalRef" @success="handleSuccess" />
  </Page>
</template>
<script lang="ts" setup>
import {PerEnum} from '#/enums/perEnum';
import {useAccess} from '@vben/access';
import {ref, unref} from 'vue';
import type {VbenFormProps} from '@vben/common-ui';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {Recordable} from '@vben/types';
import { TableAction } from '#/components/table-action';
import {message, Button} from 'ant-design-vue';
import {ColPage, Page} from '@vben/common-ui';

  import { getListByPage } from '#/api/base/formFieldType';
  import { columns, searchFormSchema } from './formFieldType.data';
  import FormFieldTypeModal from './FormFieldTypeModal.vue';
import {useVbenVxeGrid} from "#/adapter/vxe-table";

const formFieldTypeModalRef = ref();
const PerPrefix = 'FormFieldType:';
const {hasAccessByCodes} = useAccess();

  /*const [registerTable, { reload }] = useTable({
    title: '列表',
    titleHelpMessage: '自定义表单控件存储在数据库对应的数据类型',
    api: getListByPage,
    columns,
    formConfig: {
      labelWidth: 100,
      schemas: searchFormSchema,
      showAdvancedButton: false,
      showResetButton: false,
      autoSubmitOnEnter: true,
    },
    canColDrag: true,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: true,
    actionColumn: {
      width: 100,
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
  actionWrapperClass: 'col-span-2 col-start-2 text-left ml-4',
  resetButtonOptions: {
    show: false,
  },
  schema: searchFormSchema,
};

const gridOptions: VxeGridProps = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns,
  columnConfig: {resizable: true},
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        return await getListByPage({
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

function createActions (row: Recordable<any>) {
  return [
    {
      auth: [PerPrefix + PerEnum.UPDATE],
      tooltip: '编辑',
      icon: 'clarity:note-edit-line',
      onClick: handleEdit.bind(null, row),
    },
  ];
}

  function handleCreate() {
    formFieldTypeModalRef.value.setData({});
    formFieldTypeModalRef.value.open();
    formFieldTypeModalRef.value.setState({
      title: '新建'
    });
  }

  function handleEdit(record: Recordable<any>) {
    formFieldTypeModalRef.value.setData(record);
    formFieldTypeModalRef.value.open();
    formFieldTypeModalRef.value.setState({
      title: '编辑'
    });
  }

  function handleSuccess() {
    tableApi.reload();
  }
</script>
