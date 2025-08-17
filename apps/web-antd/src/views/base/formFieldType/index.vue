<template>
  <Page auto-content-height>
    <BasicTable>
      <template #toolbar-tools >
        <Button v-access:code="PerPrefix+PerEnum.ADD" type="primary" @click="handleCreate">新增</Button>
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
import {ref, unref} from 'vue';
import type {VbenFormProps} from '@vben/common-ui';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {Recordable} from '@vben/types';
import { TableAction } from '#/components/table-action';
import {message, Button} from 'ant-design-vue';
import { Page} from '@vben/common-ui';

  import { getListByPage } from '#/api/base/formFieldType';
  import { columns, searchFormSchema } from './formFieldType.data';
  import FormFieldTypeModal from './FormFieldTypeModal.vue';
import {useVbenVxeGrid} from "#/adapter/vxe-table";

const formFieldTypeModalRef = ref();
const PerPrefix = 'FormFieldType:';

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  wrapperClass: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  actionWrapperClass: 'pl-2 !justify-end md:!justify-start',
  actionPosition: 'left',
  actionLayout: 'inline',
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
      icon: 'ant-design:form-outlined',
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
