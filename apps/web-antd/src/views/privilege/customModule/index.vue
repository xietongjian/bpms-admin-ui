<template>
  <Page auto-content-height>
    <BasicTable table-title="自定义菜单">
      <template #toolbar-tools>
        <Space>
          <Button v-access:code="PerPrefix+PerEnum.ADD" type="primary" @click="handleAdd"> 新增 </Button>
        </Space>
      </template>
      <template #action="{ row }">
        <TableAction :actions="createActions(row)" />
      </template>
      <template #name="{ row }">
        <div class="flex flex-row items-center gap-1">
          <IconifyIcon :icon="row.image || 'ant-design:ellipsis-outlined'" class="size-5" height="20" width="20"/>
          <span>{{ row.name }}</span>
        </div>
      </template>
      <template #pvs="{ row }">
        <div class="max-h-50 overflow-y-auto">
          <Tag class="my-1" v-for="item in row.pvs" :key="item.id" color="green">{{ item.name }}</Tag>
        </div>
      </template>
      <template #status="{ row }">
        <Tag v-if="row.status===1" color="green">启用</Tag>
        <Tag v-else color="red">禁用</Tag>
      </template>
      <template #componentType="{ row }">
        <Tag v-if="row.component==='LAYOUT'" color="blue">目录</Tag>
        <Tag v-else color="green">菜单</Tag>
      </template>
      <template #showStatus="{ row }">
        <Tag v-if="row.showStatus===1" color="green">开启</Tag>
        <Tag v-else>关闭</Tag>
      </template>
    </BasicTable>
    <ModuleModal ref="moduleDrawerRef" @success="handleSuccess"/>
    <PValueSettingModal ref="pValueSettingModalRef"/>
  </Page>
</template>
<script lang="ts" setup>
import {nextTick, ref} from 'vue';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import {Page} from '@vben/common-ui';
import {Button, Space, Tag, message} from 'ant-design-vue';
import {useVbenVxeGrid} from '#/adapter/vxe-table';
import {TableAction} from '#/components/table-action';
import {getModules, deleteByIds} from '#/api/privilege/module';
import {columns, searchFormSchema} from './module.data';
import {PerEnum} from '#/enums/perEnum';
import {IconifyIcon} from '@vben/icons';
import ModuleModal from './ModuleModal.vue';
import PValueSettingModal from './PValueSettingModal.vue';

const PerPrefix = "Module:";
const moduleDrawerRef = ref(), pValueSettingModalRef = ref();
const currentRow = ref();

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  wrapperClass: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  actionWrapperClass: 'pl-2 !justify-end md:!justify-start',
  actionPosition: 'left',
  actionLayout: 'inline',
  resetButtonOptions: {
    show: false,
  },
  schema: searchFormSchema,
};

const gridOptions: VxeGridProps = {
  columns,
  columnConfig: {resizable: true},
  showOverflow: false,
  height: 'auto',
  keepSource: true,
  border: false,
  pagerConfig: {
    enabled: false,
  },
  rowConfig: {
    keyField: 'id',
  },
  treeConfig: {
    parentField: 'pid',
    rowField: 'id',
    transform: true,
  },
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        return getModules({
          ...formValues,
          menuType: 2,
        });
      },
      querySuccess: () => {
        nextTick(() => {
          expandAll();
        });
      },
    },
  },
};

const [BasicTable, gridApi] = useVbenVxeGrid({formOptions, gridOptions});

let treeExpanded = false;

function expandAll() {
  if (!treeExpanded) {
    gridApi.grid?.setAllTreeExpand(true);
    treeExpanded = true;
  }
}

function handleAdd() {
  moduleDrawerRef.value.setData({});
  moduleDrawerRef.value.open();
  moduleDrawerRef.value.setState({
    title: '新建'
  });
}

function handleEdit(record: any) {
  moduleDrawerRef.value.setData(record);
  moduleDrawerRef.value.open();
  moduleDrawerRef.value.setState({
    title: '修改'
  });
}

function handlePValueSuccess(pvs: any) {
  currentRow.value.pvs = pvs;
}

async function handleSuccess() {
  const expandRecords = gridApi.grid.getTreeExpandRecords();
  const {scrollLeft, scrollTop} = gridApi.grid.getScroll();
  await gridApi.reload();
  if (expandRecords) {
    await gridApi.grid.setTreeExpand(expandRecords, true);
    await gridApi.grid.scrollTo(scrollLeft, scrollTop);
  }
}

async function handleDelete(record: any) {
  try {
    if (record.children && record.children.length > 0) {
      message.warning('有子节点，不能删除！');
      return;
    }
    const result = await deleteByIds([record.id]);
    const {success, msg} = result;
    if (success) {
      message.success(msg);
      await handleSuccess();
    } else {
      message.error(msg);
    }
  } catch (e) {
    message.error(e);
  }
}

function handleCreateChild(record: any, e: Event) {
  const title = '新增【' + record.name + '】的子菜单';
  record = {
    pid: record.id,
    status: 1,
    showStatus: 1,
  };
  moduleDrawerRef.value.setData(record);
  moduleDrawerRef.value.setState({ title });
  moduleDrawerRef.value.open();
}

function handleEditPValue(record: any) {
  currentRow.value = record;
  pValueSettingModalRef.value.setData(record);
  pValueSettingModalRef.value.open();
}

function createActions(record: any) {
  return [
    {
      auth: [PerPrefix + PerEnum.ADD],
      tooltip: '添加子菜单',
      icon: 'ant-design:plus-outlined',
      onClick: handleCreateChild.bind(null, record),
      ifShow: record.component === 'LAYOUT',
    },
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
      onClick: (e: Event) => {
        e.stopPropagation();
      },
      popConfirm: {
        placement: 'left',
        title: '是否确认删除',
        confirm: handleDelete.bind(null, record),
      },
    },
  ];
}
</script>
