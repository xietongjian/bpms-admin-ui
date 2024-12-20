<script lang="ts" setup>
import {PerEnum} from '#/enums/perEnum';
import {ref, unref} from 'vue';
import type {VxeGridProps} from '#/adapter/vxe-table';

import {useVbenVxeGrid} from '#/adapter/vxe-table';
import {getPagerModel, deleteById} from '#/api/org/positionInfo';

import PositionInfoModal from './PositionInfoModal.vue';
import {Button, Popconfirm, message} from 'ant-design-vue';
import type {VbenFormProps} from '@vben/common-ui';
import {ColPage} from '@vben/common-ui';
import {useAccess} from '@vben/access';
import {TableAction} from '#/components/table-action';

import {columns, searchFormSchema} from './positionInfo.data';
import type {Recordable} from '@vben/types';

const PerPrefix = "PositionInfo:";
const positionInfoModalRef = ref();
const {hasAccessByCodes} = useAccess();

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
  actionWrapperClass: 'col-span-2 col-start-2 text-left ml-4',
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
        return await getPagerModel({
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
  let searchInfo = {positionSeqId: node ? node.id : ''};
  setProps({searchInfo: searchInfo});
  tableApi.reload({searchInfo});
}

function createActions(record: Recordable) {
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
      :split-handle="true"
      :split-line="true"
      :resizable="true"
      :left-collapsible="true"
      :auto-content-height="true"
      content-class="h-full">
    <template #left>
      <PositionSeqTree class="w-1/4 xl:w-1/5" @select="handleSelect"/>
    </template>
    <BasicTable>
      <template #toolbar-tools>
        <Button v-if="hasAccessByCodes([PerPrefix + PerEnum.ADD])" type="primary" @click="handleCreate">新增</Button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
              :actions="createActions(record)"
          />
        </template>
      </template>
    </BasicTable>
    <PositionInfoModal ref="persitionInfoModalRef" @success="handleSuccess"/>
  </ColPage>
</template>
