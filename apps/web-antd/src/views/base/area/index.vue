<script lang="ts" setup>
import {ref} from 'vue';
import {message, Button} from 'ant-design-vue';
import {PerEnum} from '#/enums/perEnum';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import type {Recordable} from '@vben/types';
import {getAreasListData, deleteById} from '#/api/base/area';
import {columns, searchFormSchema} from './area.data';
import AreaModal from './AreaModal.vue';
import {Page} from "@vben/common-ui";
import {useVbenVxeGrid} from "#/adapter/vxe-table";
import {TableAction} from '#/components/table-action';

const areaModalRef = ref();
const PerPrefix = 'Area:';

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  resetButtonOptions: {
    show: false,
  },
  schema: searchFormSchema,
  wrapperClass: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  actionWrapperClass: 'pl-2 !justify-end md:!justify-start',
  actionPosition: 'left',
  actionLayout: 'inline',
};

const gridOptions: VxeGridProps = {
  columns,
  showOverflow: true,
  columnConfig: {resizable: true},
  pagerConfig: {
    enabled: false,
  },
  rowConfig: {
    keyField: 'code',
    isHover: true,
  },
  treeConfig: {
    parentField: 'pcode',
    rowField: 'code',
    transform: true,
  },
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        return await getAreasListData(formValues);
      },
    },
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

function createActions(row: Recordable<any>) {
  return [
    {
      auth: [PerPrefix + PerEnum.ADD],
      tooltip: '添加子节点',
      icon: 'ant-design:plus-outlined',
      onClick: handleCreateChild.bind(null, row),
    },
    {
      auth: [PerPrefix + PerEnum.UPDATE],
      tooltip: '修改',
      icon: 'ant-design:form-outlined',
      onClick: handleEdit.bind(null, row),
    },
    {
      auth: [PerPrefix + PerEnum.DELETE],
      tooltip: '删除',
      icon: 'ant-design:delete-outlined',
      onClick: (e) => {
        e.stopPropagation();
      },
      danger: true,
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, row),
        placement: 'left',
        okButtonProps: {
          danger: true,
        }
      },
    },
  ];
}

function handleCreate() {
  areaModalRef.value.setData({});
  areaModalRef.value.open();
  areaModalRef.value.setState({
    title: '新增区域'
  });
}

function handleEdit(record: Recordable<any>, e) {
  e.stopPropagation();
  areaModalRef.value.setData(record);
  areaModalRef.value.open();
  areaModalRef.value.setState({
    title: '修改区域'
  });
}

function handleCreateChild(record: Recordable<any>, e) {
  e.stopPropagation();
  areaModalRef.value.setData({pcode: record.code});
  areaModalRef.value.open();
  areaModalRef.value.setState({
    title: '新增【' + record.name + '】的子区域'
  });
}

async function handleDelete(record: Recordable<any>, e) {
  e.stopPropagation();
  if (record.children && record.children.length > 0) {
    message.warning('有子节点，不能删除！');
    return;
  }
  const {success, msg} = await deleteById(record.code);
  if (success) {
    message.success(msg);
    tableApi.reload();
  } else {
    message.error(msg);
  }
}

function handleSuccess() {
  tableApi.reload();
}
</script>

<template>
  <Page auto-content-height>
    <BasicTable table-title="区域列表">
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix+PerEnum.ADD" type="primary" @click="handleCreate">新增</Button>
      </template>
      <template #action="{ row }">
        <TableAction :actions="createActions(row)"/>
      </template>
    </BasicTable>
    <AreaModal ref="areaModalRef" @success="handleSuccess"/>
  </Page>
</template>
