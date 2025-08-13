<template>
  <Page auto-content-height>
    <BasicTable>
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix + PerEnum.ADD" type="primary" @click="handleCreate"> 新增 </Button>
      </template>
      <template #typeRender="{ row }">
        {{ allBoardTypesMap[row.type] }}
      </template>
      <template #type="{row}">
        {{ row.type }}
      </template>
      <template #action="{row}">
        <TableAction
            :actions="createActions(row)"
        />
      </template>

      <!--      <template #createdByRender="{ record }">
        <EmpInfo :no="record.createdByNo" :name="record.createdBy" />
      </template>
      <template #updatedByRender="{ record }">
        <EmpInfo :no="record.updatedByNo" :name="record.updatedBy" />
      </template>-->
    </BasicTable>
    <BoardModal ref="boardModalRef" @success="handleSuccess" />
  </Page>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import type {Recordable} from '@vben/types';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {VxeGridProps} from '#/adapter/vxe-table';

  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {ColPage} from '@vben/common-ui';
  import {TableAction} from '#/components/table-action';
  // import { BasicTable, useTable, TableAction } from '#/components/Table';
  // import { useModal } from '#/components/Modal';
  import { columns, searchFormSchema } from './board.data';
  import BoardModal from './BoardModal.vue';
  import { EmpInfo } from '#/views/components/EmpInfo';
  import { getBoardListByPage, deleteByIds, getBoardTypes } from '#/api/portal/cms/board';
  import { PerEnum } from '#/enums/perEnum';
  import { Button } from 'ant-design-vue';
  import {Page} from '@vben/common-ui';
  const PerPrefix = 'Board:';
  // const [registerModal, { openModal }] = useModal();
  const allBoardTypesMap = ref({});


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
    columns,
    columnConfig: {resizable: true},
    height: 'auto',
    keepSource: true,
    border: false,
    stripe: true,
    proxyConfig: {
      ajax: {
        query: async ({page}, formValues) => {
          return await getBoardListByPage({
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

  /*const [registerTable, { getForm, reload }] = useTable({
    title: '列表',
    api: getBoardListByPage,
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
  });*/

  onMounted(async () => {
    const { updateSchema } = getForm();

    const allBoardTypes = await getBoardTypes();

    allBoardTypes.forEach((item) => {
      allBoardTypesMap.value[item.value] = item.label;
    });

    await updateSchema({
      fieldName: 'type',
      component: 'Select',
      componentProps: {
        options: allBoardTypes,
        onChange: (e) => {
          reload({ searchInfo: { type: e } });
        },
      },
    });
  });

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
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

  /*export default defineComponent({
    name: 'Board',
    components: { BasicTable, TableAction, BoardModal, Authority, EmpInfo },
    setup() {


      return {
        PerEnum,
        registerTable,
        registerModal,
        allBoardTypesMap,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });*/
</script>
