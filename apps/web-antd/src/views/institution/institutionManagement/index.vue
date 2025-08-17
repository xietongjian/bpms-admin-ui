<script setup lang="ts">
import {ref} from 'vue';
import {ColPage, Page} from '@vben/common-ui';
import type {VbenFormProps} from '@vben/common-ui';
import type {VxeGridProps} from '#/adapter/vxe-table';

import type {Recordable} from '@vben/types';

import {useVbenVxeGrid} from '#/adapter/vxe-table';
import InstitutionCategoryTree from '../components/institutionCategoryTree.vue';
import InstitutionModal from '#/views/institution/institutionManagement/InstitutionModal.vue';
import {deleteInstitutionById, getInstitutionTableData} from '#/api/institution/institution';
import {InstitutionColumns, InstitutionSearchForm} from './schema.data';
import {Space, Tag, Button, message} from 'ant-design-vue';
import {PerEnum} from "#/enums/perEnum";
import {getGroupListByPage} from "#/api/privilege/group";
import {TableAction} from '#/components/table-action';

defineOptions({name: 'InstitutionManagement'});
const PerPrefix = "InstitutionManagement:";

const currentNode = ref<Recordable<any>>({});
const institutionModalRef = ref();

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  wrapperClass: 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
  actionWrapperClass: 'pl-2 !justify-end md:!justify-start',
  actionPosition: 'left',
  actionLayout: 'inline',
  resetButtonOptions: {
    show: false,
  },
  schema: InstitutionSearchForm,
};

const gridOptions: VxeGridProps<any> = {
  columns: InstitutionColumns,
  columnConfig: {resizable: true},
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        formValues.categoryId = currentNode.value.id;
        return getGroupListByPage({
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

async function handleSelect(node: any) {
  currentNode.value = node;

  await tableApi.reload();
}

function handleCreate() {
  if (!currentNode.value.id) {
    return message.warn('请选择制度分类');
  }
  let record = {categoryId: currentNode.value.id};

  institutionModalRef.value.setData(record);
  institutionModalRef.value.setState({
    title: `新增制度`
  });
  institutionModalRef.value.open();
  /*
  openEditModal(true, {isUpdate: false, record});
  setEditModalProps({
    title: `新增制度`,
    bodyStyle: {padding: '0px', margin: '0px'},
    width: 900,
    height: 400,
  });*/
}

function handleEdit(record: Recordable<any>) {
  institutionModalRef.value.setData(record);
  institutionModalRef.value.setState({
    title: `修改制度`,
  });
  institutionModalRef.value.open();
  /*openEditModal(true, {record, isUpdate: true});
  setEditModalProps({
    title: `修改制度`,
    bodyStyle: {padding: '0px', margin: '0px'},
    width: 900,
    height: 420,
  });*/
}

function handleDelete(institution: Recordable<any>) {
  deleteInstitutionById(institution.id).then(() => tableApi.reload());
}

function handleSuccess() {
  tableApi.reload()
}

function createActions(record) {
  return [
    {
      auth: [PerPrefix + PerEnum.UPDATE],
      tooltip: '修改',
      icon: 'ant-design:form-outlined',
      onClick: handleEdit.bind(null, record),
    },
    {
      auth: [PerPrefix + PerEnum.DELETE],
      tooltip: '删除',
      icon: 'ant-design:delete-outlined',
      danger: true,
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, record),
        okButtonProps: {
          danger: true
        },
      },
    },
  ];
}
</script>

<template>
  <ColPage
      :left-max-width="50"
      :left-min-width="10"
      :left-width="15"
      :split-handle="true"
      :split-line="true"
      :resizable="true"
      :left-collapsible="true"
      :auto-content-height="true"
      content-class="h-full">
    <template #left>
      <div class="h-full bg-card">
        <InstitutionCategoryTree class="w-full" @select="handleSelect"/>
      </div>
    </template>

    <BasicTable class="w-full">
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix + PerEnum.ADD" type="primary" @click="handleCreate">新增</Button>
      </template>

      <template #deptRangeData="{row}">
        <Space class="flex-wrap">
          <Tag color="processing" v-for="(item, idx) of row.deptRangeData" :key="idx">{{
              item.name
            }}
          </Tag>
        </Space>
      </template>
      <template #positionRangeData="{row}">
        <Space class="flex-wrap">
          <Tag color="processing" v-for="(item, idx) of row.positionRangeData" :key="idx">{{
              item.name
            }}
          </Tag>
        </Space>
      </template>

      <template #action="{row}">
        <TableAction :actions="createActions(row)"/>
      </template>
    </BasicTable>

    <InstitutionModal ref="institutionModalRef" @success="handleSuccess"/>
  </ColPage>
</template>
