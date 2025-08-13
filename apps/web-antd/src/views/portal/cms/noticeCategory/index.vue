<template>
  <Page auto-content-height>
    <BasicTable >
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix + PerEnum.ADD" type="primary" @click="handleCreate"> 新增 </Button>
      </template>
      <template #action="{row}">
        <TableAction
            :actions="createActions(row)"
        />
      </template>
      <template #signerNameRender="{ row }">
        <EmpInfo :no="row.signerNo" :name="row.signerName" />
      </template>
      <template #createdByRender="{ row }">
        <EmpInfo :no="row.createdByNo" :name="row.createdBy" />
      </template>
      <template #nameRender="{ row }">
        <span class="color-block" :style="{ background: row.style }"> &nbsp; </span>
        &nbsp;
        <span>{{ row.name }}</span>
      </template>
      <template #updatedByRender="{ row }">
        <EmpInfo :no="row.updatedByNo" :name="row.updatedBy" />
      </template>
    </BasicTable>
    <NoticeCategoryModal ref="noticeCategoryModalRef" @success="handleSuccess" />
  </Page>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import type {Recordable} from '@vben/types';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {VxeGridProps} from '#/adapter/vxe-table';

  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {ColPage} from '@vben/common-ui';
  import {TableAction} from '#/components/table-action';
  // import { BasicTable, useTable, TableAction } from '#/components/Table';
  // import { useModal } from '#/components/Modal';
  import { columns, searchFormSchema } from './noticeCategory.data';
  import NoticeCategoryModal from './NoticeCategoryModal.vue';
  import { getAllNoticeCategory, deleteByIds } from '#/api/portal/cms/noticeCategory';
  import { EmpInfo } from '#/views/components/EmpInfo';
  import { findPath, findPathAll } from '#/utils/helper/treeHelper';
  import { PerEnum } from '#/enums/perEnum';
  import {Button} from 'ant-design-vue';
  import {Page} from '@vben/common-ui';
  import {listColumns} from "#/views/base/app/app.data";
  import {getAppListByPage} from "#/api/base/app";


  const PerPrefix = 'NoticeCategory:';

  // const [registerModal, { openModal, setModalProps }] = useModal();


  const formOptions: VbenFormProps = {
    showCollapseButton: false,
    submitOnEnter: true,
    commonConfig: {
      labelWidth: 60,
    },
    wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
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
    columns: listColumns,
    columnConfig: {resizable: true},
    height: 'auto',
    keepSource: true,
    border: false,
    stripe: true,
    proxyConfig: {
      ajax: {
        query: async ({page}, formValues) => {
          return await getAllNoticeCategory({
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

  function createActions(record: Recordable<any>) {
    return [
      {
        auth: [PerPrefix + PerEnum.ADD],
        tooltip: '添加子分类',
        icon: 'ant-design:plus-outlined',
        onClick: handleCreateChild.bind(null, record),
        ifShow: handleAddChildBtnIfShow.bind(null, record),
      },
      {
        auth: [PerPrefix + PerEnum.UPDATE],
        tooltip: '修改',
        icon: 'clarity:note-edit-line',
        onClick: handleEdit.bind(null, record),
      },
      {
        auth: [PerPrefix + PerEnum.DELETE],
        tooltip: '删除',
        icon: 'ant-design:delete-outlined',
        color: 'error',
        popConfirm: {
          title: '是否确认删除',
          placement: 'left',
          confirm: handleDelete.bind(null, record),
          okButtonProps: {
            danger: true
          }
        },
      },
    ];
  }
  /*const [registerTable, { reload, getDataSource }] = useTable({
    title: '列表',
    api: getAllNoticeCategory,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      showAdvancedButton: false,
      showResetButton: false,
      autoSubmitOnEnter: true,
    },
    canColDrag: true,
    useSearchForm: true,
    bordered: false,
    showIndexColumn: false,
    actionColumn: {
      width: 100,
      title: '操作',
      field: 'action',
      fixed: 'right',
    },
    pagination: false,
  });*/

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
    setModalProps({
      width: 650,
    });
  }

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
    setModalProps({
      width: 650,
    });
  }

  function handleDelete(record: Recordable) {
    deleteByIds([record.id]).then(() => {
      reload();
    });
  }

  function handleAddChildBtnIfShow(record: Recordable) {
    const path = findPath(
        getDataSource(),
        (node) => {
          return node.id === record.id;
        },
        { id: 'id', children: 'children', pid: 'pid' },
    );
    if (path.length > 2) {
      return false;
    }
    return true;
  }

  function handleSuccess() {
    reload();
  }

  function handleCreateChild(record: Recordable, e) {
    e.stopPropagation();
    setModalProps({
      title: '新增【' + record.name + '】的子分类',
      width: 650,
    });
    record = {
      pid: record.id,
      frontShow: 1,
      status: true,
    };
    openModal(true, {
      record,
      isUpdate: true,
    });
  }


  /*export default defineComponent({
    name: 'NoticeCategory',
    components: { BasicTable, TableAction, NoticeCategoryModal, Authority, EmpInfo },
    setup() {

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleAddChildBtnIfShow,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleCreateChild,
        PerEnum,
      };
    },
  });*/
</script>

<style lang="less" scoped>
  .color-block {
    width: 20px;
    height: 20px;
    display: inline-block;
  }
</style>
