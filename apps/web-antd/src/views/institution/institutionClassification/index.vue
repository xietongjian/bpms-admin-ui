<script setup lang="ts">
import {ref} from 'vue';
import {PerEnum} from '#/enums/perEnum';
import type {Recordable} from '@vben/types';
import {Page} from '@vben/common-ui';
import {TableAction} from '#/components/table-action';

import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import {message, Button} from 'ant-design-vue';

import {
  InstitutionalClassificationColumns,
  InstitutionalClassificationSearchForm,
} from '#/views/institution/institutionClassification/schema.data';
import {
  deleteClassificationById,
  getInstitutionClassification,
} from '#/api/institution/institution';
import ClassificationModal from './ClassificationModal.vue';
import {useVbenVxeGrid} from "#/adapter/vxe-table";

const PerPrefix = "InstitutionClassification:";

defineOptions({name: 'InstitutionClassification'});

const classificationModalRef = ref();

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  submitOnChange: false,
  commonConfig: {
    labelWidth: 60,
  },
  schema: InstitutionalClassificationSearchForm,
  wrapperClass: 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
  actionWrapperClass: 'pl-2 !justify-end md:!justify-start',
  actionPosition: 'left',
  actionLayout: 'inline',
};

const gridOptions: VxeGridProps = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: InstitutionalClassificationColumns,
  columnConfig: {resizable: true},
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
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        return await getInstitutionClassification(formValues).then(res => {
          return Promise.resolve(res);
        });
      },
    },
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

function handleCreate() {
  classificationModalRef.value.setData({});
  classificationModalRef.value.setState({title: '新增制度分类'});
  classificationModalRef.value.open();
}

function handleCreateChild(record: Recordable<any>) {
  classificationModalRef.value.setData({ pid: record.id });
  classificationModalRef.value.setState({title: '新增【' + record.name + '】的子分类'});
  classificationModalRef.value.open();
}

function handleEdit(record: Recordable<any>) {
  classificationModalRef.value.setData(record);
  classificationModalRef.value.setState({title: '修改制度分类'});
  classificationModalRef.value.open();
}

async function handleDelete(record: Recordable<any>) {
  if (record.children && record.children.length > 0) {
    message.warning('有子分类，不能删除！');
    return Promise.reject();
  }
  return deleteClassificationById(record.id).then(() => tableApi.reload());
}

const getTableActions = (record: Recordable<any>) => [
  {
    auth: [PerPrefix + PerEnum.ADD],
    tooltip: '添加子分类',
    icon: 'ant-design:plus-outlined',
    onClick: () => handleCreateChild(record),
  },
  {
    auth: [PerPrefix + PerEnum.UPDATE],
    tooltip: '修改',
    icon: 'ant-design:form-outlined',
    onClick: () => handleEdit(record),
  },
  {
    auth: [PerPrefix + PerEnum.DELETE],
    tooltip: '删除',
    icon: 'ant-design:delete-outlined',
    danger: true,
    onClick: (e) => e.stopPropagation(),
    popConfirm: {
      title: '是否确认删除',
      confirm: () => handleDelete(record),
      placement: 'left',
      okButtonProps: {
        danger: true
      }
    },
  },
];

function handleSuccess() {
  tableApi.reload()
}

</script>

<template>
  <Page auto-content-height>
    <BasicTable>
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix + PerEnum.ADD" type="primary" @click="handleCreate">新增</Button>
      </template>
      <template #action="{ row }">
        <TableAction :actions="getTableActions(row)"/>
      </template>
    </BasicTable>

    <ClassificationModal ref="classificationModalRef" @success="handleSuccess"/>
  </Page>
</template>
