<template>
  <Page auto-content-height>
    <BasicTable>
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix+PerEnum.ADD" type="primary" @click="handleCreate"> 新增</Button>
      </template>
      <template #action="{ row }">
        <TableAction :actions="createActions(row)"/>
      </template>
    </BasicTable>
    <DicTypeModal ref="dicTypeModalRef" @success="handleSuccess" />
  </Page>
</template>
<script lang="ts" setup>
  import { PerEnum } from '#/enums/perEnum';
  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import type {VbenFormProps} from '@vben/common-ui';
  import type { Recordable } from '@vben/types';
  import type {VxeGridProps} from '#/adapter/vxe-table';
  import {Page} from '@vben/common-ui';
  import { TableAction } from '#/components/table-action';
  import {Button, message, Tag} from "ant-design-vue";
  import {getDicTypes, deleteByIds, getDicTypeList} from '#/api/base/dicType';
  import { columns, searchFormSchema } from './dicType.data';
  import {ref} from "vue";
  import DicTypeModal from './DicTypeModal.vue';

  const PerPrefix = 'DicType:';
  const dicTypeModalRef = ref();


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

  const gridOptions: VxeGridProps<any> = {
    checkboxConfig: {
      highlight: true,
      labelField: 'name',
    },
    columns,
    showOverflow: true,
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
          return await getDicTypeList(formValues);
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
        danger: true,
        onClick: (e) => {
          e.stopPropagation();
        },
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
          placement: 'left',
          okButtonProps: {
            danger: true,
          }
        },
      },
    ];
  }

  function handleCreate() {
    dicTypeModalRef.value.setData({});
    dicTypeModalRef.value.open();
    dicTypeModalRef.value.setState({ title: '新增字典分类' });
  }

  function handleEdit(record: Recordable<any>, e) {
    e.stopPropagation();
    dicTypeModalRef.value.setData(record);
    dicTypeModalRef.value.open();
    dicTypeModalRef.value.setState({ title: '修改字典分类' });
  }

  function handleCreateChild(record: Recordable<any>, e) {
    e.stopPropagation();
    dicTypeModalRef.value.setData({ pid: record.id });
    dicTypeModalRef.value.open();
    dicTypeModalRef.value.setState({ title: `新增【${record.name}】的子分类` });
  }

  function handleDelete(record: Recordable<any>) {
    if (record.children && record.children.length > 0) {
      message.warning('有子节点，不能删除！');
      return;
    }
    deleteByIds([record.id]).then((res) => {
      tableApi.reload();
    });
  }

  function handleSuccess() {
    tableApi.reload();
  }
</script>
