<template>
  <Page auto-content-height>
    <BasicTable >
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix + PerEnum.ADD" type="primary" @click="handleCreate"> 新增</Button>
      </template>
      <template #signatureImg="{row}">
        <div class="!h-20 relative">
          <div v-if="row.signatureImg">
            <Image :src="row.signatureImg" class="w-full !h-20 object-contain" />
          </div>
          <span v-else class="">暂无图片</span>
        </div>
      </template>
      <template #action="{row}">
        <TableAction :actions="createActions(row)" />
      </template>
      <template #signerName="{ row }">
        <EmpInfo :no="row.signerNo" :name="row.signerName" />
      </template>
      <!--      <template #logoRender="{ record }">
        <div class="banner-list-preview">
          <TableImg :showBadge="false" :simpleShow="true" :imgList="[record.logo]"/>
        </div>
      </template>-->
      <!--

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
  import {TableAction} from '#/components/table-action';
  // import { BasicTable, useTable, TableAction, TableImg } from '#/components/Table';
  import { columns, searchFormSchema } from './noticeSubject.data';
  import NoticeSubjectModal from './NoticeSubjectModal.vue';
  import { deleteByIds, getAllNoticeSubject } from '#/api/portal/cms/noticeSubject';
  import { EmpInfo } from '#/views/components/EmpInfo';
  import { PerEnum } from '#/enums/perEnum';
  import {Button, Image, message} from 'ant-design-vue';
  import {Page} from '@vben/common-ui';

  const PerPrefix = 'NoticeSubject:';

  const noticeSubjectModalRef = ref();

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
    pagerConfig: {
      enabled: false,
    },
    treeConfig: {
      parentField: 'pid',
      rowField: 'id',
      transform: true,
    },
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
          return await getAllNoticeSubject(formValues);
        },
      },
    },
    showOverflow: false,
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
    noticeSubjectModalRef.value.setData({});
    noticeSubjectModalRef.value.open();
    noticeSubjectModalRef.value.setState({
      title: '新建',
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
    noticeSubjectModalRef.value.setData(record);
    noticeSubjectModalRef.value.open();
    noticeSubjectModalRef.value.setState({
      title: '编辑',
    });
  }

  async function handleDelete(record: Recordable) {
    const {success, msg} = await deleteByIds([record.id]);
    if(success){
      tableApi.reload();
      message.success(msg)
    }
  }

  function handleSuccess() {
    tableApi.reload();
  }

  function handleCreateChild(record: Recordable, e) {
    noticeSubjectModalRef.value.setData({
      pid: record.id,
      status: true,
    });
    noticeSubjectModalRef.value.open();
    noticeSubjectModalRef.value.setState({
      title: '新增【' + record.title + '】的子主体',
    });
    /*
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
    });*/
  }

</script>
