<script lang="ts" setup>
import {PerEnum} from '#/enums/perEnum';
import {ref, unref} from 'vue';
import type {VxeGridProps} from '#/adapter/vxe-table';

import {useVbenVxeGrid} from '#/adapter/vxe-table';
import {getPagerModel, deleteById} from '#/api/org/positionInfo';

import PositionInfoModal from './PositionInfoModal.vue';
import {Button, Popconfirm, message, Tag} from 'ant-design-vue';
import type {VbenFormProps} from '@vben/common-ui';
import {ColPage} from '@vben/common-ui';
import {TableAction} from '#/components/table-action';
import PositionSeqTree from '#/views/components/leftTree/PositionSeqTree.vue';
import {columns, searchFormSchema} from './positionInfo.data';
import type {Recordable} from '@vben/types';

const PerPrefix = "PositionInfo:";
const positionInfoModalRef = ref();

// const [registerModal, { openModal, setModalProps }] = useModal();
const currentTreeNode = ref<Recordable<any>>({});

/*const [registerTable, { reload, setProps }] = useTable({
  title: '列表',
  api: getPagerModel,
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
  bordered: true,
  showIndexColumn: false,
  actionColumn: {
    width: 100,
    title: '操作',
    dataIndex: 'action',
  },
});*/


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
  columns,
  columnConfig: {resizable: true},
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        formValues.positionSeqId = currentTreeNode.value?.id;
        return await getPagerModel({
          query: {
            pageNum: page.currentPage,
            pageSize: page.pageSize,
          },
          entity: formValues,
        });
      },
    },
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});


function handleCreate() {
  if (!unref(currentTreeNode).id) {
    message.warning('请选择岗位序列！', 2);
    return;
  }
  const record = {
    positionSeqId: unref(currentTreeNode).id,
    positionSeqCode: unref(currentTreeNode).code,
  };
  positionInfoModalRef.value.setData(record);
  positionInfoModalRef.value.open();
  positionInfoModalRef.value.setState({
    title: '新增岗位',
  });
}

function handleEdit(record: Recordable<any>) {
  positionInfoModalRef.value.setData(record);
  positionInfoModalRef.value.open();
  positionInfoModalRef.value.setState({
    title: '修改岗位',
  });
}

function handleDelete(record: Recordable<any>) {
  deleteById([record.id]).then(() => {
    tableApi.reload();
  });
}

function handleSuccess() {
  setTimeout(() => {
    handleSelect(currentTreeNode.value);
  }, 200);
}

function handleSelect(node: any) {
  currentTreeNode.value = node;
  tableApi.reload();
}

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
        confirm: handleDelete.bind(null, record),
        placement: 'left',
        okButtonProps: {danger: true},
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
      :split-handle="false"
      :split-line="false"
      :resizable="true"
      :left-collapsible="false"
      :auto-content-height="true"
      content-class="h-full">
    <template #left>
      <PositionSeqTree @select="handleSelect"/>
    </template>
    <BasicTable table-title="岗位管理" class="ml-2">
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix+PerEnum.ADD" type="primary" @click="handleCreate">新增</Button>
      </template>

      <template #action="{row}">
        <TableAction :actions="createActions(row)" />
      </template>
      <template #status="{ row }">
        <Tag v-if="row.status === 1" color="success">启用</Tag>
        <Tag v-else color="error">停用</Tag>
      </template>
    </BasicTable>
    <PositionInfoModal ref="positionInfoModalRef" @success="handleSuccess"/>
  </ColPage>
</template>
