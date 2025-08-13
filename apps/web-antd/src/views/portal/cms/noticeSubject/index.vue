<template>
  <Page auto-content-height>
    <BasicTable >
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix + PerEnum.ADD" type="primary" @click="handleCreate"> 新增</Button>
      </template>
      <template #signatureImg="{row}">
        <TableImg :size="60" :showBadge="false" :simpleShow="true" :imgList="[row.signatureImg]" />
      </template>
      <template #action="{row}">
        <TableAction :actions="createActions(row)" />
      </template>

      <!--      <template #logoRender="{ record }">
        <div class="banner-list-preview">
          <TableImg :showBadge="false" :simpleShow="true" :imgList="[record.logo]"/>
        </div>
      </template>-->
      <!--      <template #signerNameRender="{ record }">
        <EmpInfo :no="record.signerNo" :name="record.signerName" />
      </template>

      <template #createdByRender="{ record }">
        <EmpInfo :no="record.createdByNo" :name="record.createdBy" />
      </template>
      <template #updatedByRender="{ record }">
        <EmpInfo :no="record.updatedByNo" :name="record.updatedBy" />
      </template>-->
    </BasicTable>
    <NoticeSubjectModal ref="noticeSubjectModalRef" @success="handleSuccess" />
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
  // import { BasicTable, useTable, TableAction, TableImg } from '#/components/Table';
  // import { useModal } from '#/components/Modal';
  import { columns, searchFormSchema } from './noticeSubject.data';
  import NoticeSubjectModal from './NoticeSubjectModal.vue';
  import { deleteByIds, getAllNoticeSubject } from '#/api/portal/cms/noticeSubject';
  import { EmpInfo } from '#/views/components/EmpInfo';
  import { PerEnum } from '#/enums/perEnum';
  import {Button} from 'ant-design-vue';
  import {Page} from '@vben/common-ui';
  import {listColumns} from "#/views/base/app/app.data";
  import {getAppListByPage} from "#/api/base/app";


  const PerPrefix = 'NoticeSubject:';

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
          return await getAllNoticeSubject({
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

  /*const [registerTable, { reload }] = useTable({
    title: '列表',
    api: getAllNoticeSubject,
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
    pagination: false,
    actionColumn: {
      width: 100,
      title: '操作',
      field: 'action',
      fixed: 'right',
    },
  });*/

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
    setModalProps({
      width: 800,
      maskClosable: false,
    });
  }

  function createActions(record: Recordable) {
    return [
      {
        auth: [PerPrefix + PerEnum.ADD],
        tooltip: '添加子分类',
        icon: 'ant-design:plus-outlined',
        onClick: handleCreateChild.bind(null, record),
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

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
    setModalProps({
      width: 800,
      maskClosable: false,
    });
  }

  function handleDelete(record: Recordable) {
    deleteByIds([record.id]).then(() => {
      reload();
    });
  }

  function handleSuccess() {
    reload();
  }

  function handleCreateChild(record: Recordable, e) {
    e.stopPropagation();
    setModalProps({
      title: '新增【' + record.title + '】的子主体',
      width: 800,
      maskClosable: false,
    });
    record = {
      pid: record.id,
      status: true,
    };
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

</script>
