<template>
  <Page auto-content-height contentFullHeight fixedHeight contentClass="flex">
    <BasicTable >
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增 </a-button>
      </template>
      <template #action="{ row }">
        <TableAction :actions="createActions(row)"/>
      </template>
    </BasicTable>
    <FlowProcessModal ref="flowProcessModalRef" @success="handleSuccess" />
  </Page>
</template>
<script lang="ts" setup>
  import { nextTick, ref } from 'vue';
  import type { Recordable } from '@vben/types';
  import type {VbenFormProps} from '@vben/common-ui';

  // import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getFlowProcess, deleteByIds } from '#/api/bpm/flowprocess';
  import {Page} from '@vben/common-ui';
  import { columns } from './flowprocess.data';
  import FlowProcessModal from './FlowProcessModal.vue';
  import {message} from 'ant-design-vue';
  import type {VxeGridProps} from '#/adapter/vxe-table';
  import {TableAction} from '#/components/table-action';
  import {searchFormSchema} from "#/views/org/positionSeq/positionSeq.data";
  import {getPositionSeqs} from "#/api/org/positionSeq";
  import {useVbenVxeGrid} from "#/adapter/vxe-table";

  const flowProcessModalRef = ref();

  // const [registerModal, { openModal, setModalProps }] = useModal();
  /*const [registerTable, { reload, expandAll }] = useTable({
    title: '流程体系列表',
    api: getFlowProcess,
    columns,
    isTreeTable: true,
    formConfig: {
      labelWidth: 120,
      showAdvancedButton: false,
      showResetButton: false,
      autoSubmitOnEnter: false,
    },
    expandRowByClick: true,
    canColDrag: true,
    useSearchForm: false,
    pagination: false,
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: false,
    },
  });*/


  const formOptions: VbenFormProps = {
    showCollapseButton: false,
    submitOnEnter: true,
    commonConfig: {
      labelWidth: 60,
    },
    actionWrapperClass: 'col-span-2 col-start-2 text-left ml-2',
    resetButtonOptions: {
      show: false,
    },
    schema: searchFormSchema,
  };

  const gridOptions: VxeGridProps<any> = {
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
          return await getFlowProcess({
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

  nextTick(() => {
    // setTimeout(() => {
    //   expandAll();
    // }, 1000);
  });

  function handleCreate() {
    flowProcessModalRef.value.setData({});
    flowProcessModalRef.value.setState({ title: '新增流程体系' });
    flowProcessModalRef.value.open();
  }

  function handleEdit(record: Recordable<any>, e) {
    e.stopPropagation();
    // setModalProps({ title: '修改流程体系' });
    // openModal(true, {
    //   record,
    //   isUpdate: true,
    // });
    flowProcessModalRef.value.setData(record);
    flowProcessModalRef.value.setState({ title: '修改流程体系' });
    flowProcessModalRef.value.open();
  }

  function createActions(record: Recordable<any>) {
    return [
      {
        tooltip: '添加子体系',
        icon: 'ant-design:plus-outlined',
        onClick: handleCreateChild.bind(null, record),
      },
      {
        tooltip: '修改',
        icon: 'clarity:note-edit-line',
        onClick: handleEdit.bind(null, record),
      },
      {
        tooltip: '删除',
        icon: 'ant-design:delete-outlined',
        danger: true,
        onClick: (e) => {
          e.stopPropagation();
        },
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
          okButtonProps: {
            danger: true
          }
        },
      },
    ];
  }

  function handleCreateChild(record: Recordable<any>, e) {
    e.stopPropagation();
    flowProcessModalRef.value.setData({ pid: record.id });
    flowProcessModalRef.value.setState({ title: '新增【' + record.name + '】的子体系' });
    flowProcessModalRef.value.open();

  }

  async function handleDelete(record: Recordable<any>) {
    if (record.children && record.children.length > 0) {
      message.warning('有子节点，不能删除！');
      return;
    }
    const {success, msg, data} = await deleteByIds([record.id]);
    if(success){
      tableApi.reload();
      message.success(msg);
    } else {
      message.error(msg);
    }
  }

  function doSearch() {
    tableApi.reload();
  }

  async function handleSuccess() {
    await tableApi.reload();
    // setTimeout(() => {
    //   expandAll();
    // }, 100);
  }
</script>
