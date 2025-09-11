<template>
  <Page auto-content-height>
    <BasicTable table-title="版块管理">
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix + PerEnum.ADD" type="primary" @click="handleCreate"> 新增 </Button>
      </template>
      <template #typeRender="{ row }">
        {{ allBoardTypesMap[row.type] }}
      </template>
      <template #status="{row}">
        <Tag :color="row.status ? 'green' : 'red'">{{ row.status ? '启用' : '停用' }}</Tag>
      </template>
      <template #action="{row}">
        <TableAction :actions="createActions(row)" />
      </template>
    </BasicTable>
    <BoardModal ref="boardModalRef" @success="handleSuccess" />
  </Page>
</template>
<script lang="ts" setup>
import {nextTick, onMounted, ref} from 'vue';
  import type {Recordable} from '@vben/types';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {VxeGridProps} from '#/adapter/vxe-table';

  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {TableAction} from '#/components/table-action';
  import { columns, searchFormSchema } from './board.data';
  import BoardModal from './BoardModal.vue';
  import { getBoardListByPage, deleteByIds, getBoardTypes } from '#/api/portal/cms/board';
  import { PerEnum } from '#/enums/perEnum';
  import { Button, Tag, message } from 'ant-design-vue';
  import {Page} from '@vben/common-ui';

  const PerPrefix = 'Board:';
  const allBoardTypesMap = ref<any>({});
  const boardModalRef = ref();

  const formOptions: VbenFormProps = {
    showCollapseButton: false,
    submitOnEnter: true,
    commonConfig: {
      labelWidth: 60,
    },
    wrapperClass: 'grid grid-cols-2 lg:grid-cols-4',
    actionWrapperClass: 'pl-2 !justify-end md:!justify-start',
    actionPosition: 'left',
    actionLayout: 'inline',
    resetButtonOptions: {
      show: false,
    },
    schema: searchFormSchema,
    handleValuesChange: (values, fieldsChanged) => {
      if(fieldsChanged.includes('type')){
        tableApi.reload(values);
      }
    },
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
          placement: 'left',
          confirm: handleDelete.bind(null, record),
          okButtonProps: { danger: true },
        },
      },
    ];
  }

  onMounted(async () => {
    const allBoardTypes = await getBoardTypes();
    allBoardTypes.forEach((item: any) => {
      allBoardTypesMap.value[item.value] = item.label;
    });
  });

  function handleCreate() {
    boardModalRef.value.setData();
    boardModalRef.value.setState({title: '新增版块'});
    boardModalRef.value.open();
  }

  function handleEdit(record: Recordable<any>) {
    boardModalRef.value.setData(record);
    boardModalRef.value.setState({title: '编辑版块'});
    boardModalRef.value.open();
  }

  async function handleDelete(record: Recordable<any>) {
    try {
      const {success, msg} = await deleteByIds([record.id]);
      if (success) {
        message.success(msg);
        tableApi.reload();
      }
    } catch (e) {
      console.error(e);
    } finally {
    }
  }

  function handleSuccess() {
    tableApi.reload();
  }
</script>
