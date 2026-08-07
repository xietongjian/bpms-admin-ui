<script lang="ts" setup>
import { h, ref, unref, computed } from 'vue';
import type { Recordable } from '@vben/types';
import type { VxeGridProps } from '#/adapter/vxe-table';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';
import { ColPage } from '@vben/common-ui';
import { PerEnum } from '#/enums/perEnum';

import {
  getDocManagePageList,
  getDocCateListData,
  deleteDocManageById,
  deleteDocCateById,
  updateDocManageStatus,
} from '#/api/base/docManage';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue';
import { Button, Row, Col, Tag, message, Popconfirm, Tooltip } from 'ant-design-vue';
import { TableAction } from '#/components/table-action';
import { listToTree } from '#/utils/helper/treeHelper';
import { BasicTree } from '#/components/tree';
import { useElementSize } from '@vueuse/core';

import DocManageDrawer from './DocManageDrawer.vue';
import DocCateModal from './DocCateModal.vue';
import { columns, searchFormSchema } from './docManage.data';

const basicTreeRef = ref(null);
const treeLoading = ref(true);
const { height } = useElementSize(basicTreeRef);

const treeHeight = computed(() => {
  return height.value - 70;
});

const PerPrefix = 'DocManage:';

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
    labelField: 'title',
  },
  columns,
  columnConfig: { resizable: true },
  pagerConfig: {
    enabled: true,
  },
  rowConfig: {
    keyField: 'id',
  },
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        formValues.docCateId = currentNode.value?.id;
        return await getDocManagePageList({
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

const [BasicTable, tableApi] = useVbenVxeGrid({ formOptions, gridOptions });

const docCateDataMap = ref<any>({});
const cateTreeData = ref<any[]>([]);
const docManageDrawerRef = ref();
const docCateModalRef = ref();

const treeActionList: any[] = [
  {
    render: (node: any) => {
      return h(Tooltip, { placement: 'top', title: '新建子分类' }, [
        h(PlusOutlined, {
          class: 'ml-2',
          onClick: (e) => {
            e.stopPropagation();
            handleCreateCategory(node);
          },
        }),
      ]);
    },
  },
  {
    render: (node: any) => {
      return h(Tooltip, { placement: 'top', title: '编辑分类' }, [
        h(EditOutlined, {
          class: 'ml-2',
          onClick: (e) => {
            e.stopPropagation();
            handleUpdateCategory({
              id: node.id,
              pid: node.pid,
              cateName: node.title,
              orderNo: node.orderNo,
            });
          },
        }),
      ]);
    },
  },
  {
    render: (node: any) => {
      return h(
        Popconfirm,
        {
          title: '确定要删除该分类吗？',
          onConfirm: () => {
            handleDeleteCategory(node);
          },
          okButtonProps: {
            danger: true,
          },
        },
        [
          h(Tooltip, { placement: 'top', title: '删除分类' }, [
            h(DeleteOutlined, {
              onClick: (e) => {
                e.stopPropagation();
              },
              class: 'ml-2',
              style: { color: 'red' },
            }),
          ]),
        ],
      );
    },
  },
];

const currentNode = ref<any>(undefined);
initDocCateTree();

function handleCreateCategory(node: any) {
  unref(docCateModalRef).setData({ isUpdate: false, record: { pid: node?.id } });
  unref(docCateModalRef).open();
}

function handleUpdateCategory(node: any) {
  unref(docCateModalRef).setData({ isUpdate: true, record: node });
  unref(docCateModalRef).open();
}

async function handleDeleteCategory(node: any) {
  try {
    const { success, msg } = await deleteDocCateById({ id: node.id });
    if (success) {
      message.success(msg);
      await initDocCateTree();
    } else {
      message.error(msg);
    }
  } finally {
    // noop
  }
}

function handleCreate() {
  unref(docManageDrawerRef).setData({
    isUpdate: false,
    record: { docCateId: (unref(currentNode) as any)?.id },
  });
  unref(docManageDrawerRef).open();
}

function handleEdit(record: Recordable<any>) {
  unref(docManageDrawerRef).setData({
    isUpdate: true,
    record,
  });
  unref(docManageDrawerRef).open();
}

async function handleUpdateDocManageStatus(record: Recordable<any>) {
  const res = await updateDocManageStatus({
    id: record.id,
    status: record.status === 1 ? 0 : 1,
  });
  if (res.success) {
    message.success(res.msg);
    await tableApi.reload();
  } else {
    message.error(res.msg);
  }
}

function handleDoPreview(record: Recordable<any>) {
  const url = `/#/helper/docs?docId=${record.id}`;
  window.open(url);
}

async function handleDeleteDocManage(record: Recordable<any>) {
  const res = await deleteDocManageById({ id: record.id });
  if (res.success) {
    message.success(res.msg);
    await tableApi.reload();
  } else {
    message.error(res.msg);
  }
}

async function initDocCateTree() {
  treeLoading.value = true;
  const res = await getDocCateListData();
  const tempCategoryMap: Record<string, any> = {};
  res.forEach((item: any) => {
    tempCategoryMap[item.id] = item;
    item.title = item.cateName;
  });
  docCateDataMap.value = tempCategoryMap;

  const treeData = listToTree(res);
  cateTreeData.value = treeData;
  treeLoading.value = false;
}

function handleSuccess() {
  tableApi.reload();
}

function handleCategorySuccess() {
  initDocCateTree();
}

async function handleSelect(node: any) {
  if (node) {
    currentNode.value = node;
  } else {
    currentNode.value = undefined;
  }
  await tableApi.reload();
}

function createActions(record: Recordable<any>): any[] {
  return [
    {
      tooltip: '预览',
      icon: 'ant-design:eye-outlined',
      onClick: handleDoPreview.bind(null, record),
    },
    {
      auth: [PerPrefix + PerEnum.UPDATE],
      tooltip: '编辑',
      icon: 'clarity:note-edit-line',
      onClick: handleEdit.bind(null, record),
    },
    {
      tooltip: record.status === 1 ? '禁用' : '启用',
      icon:
        record.status === 1
          ? 'ant-design:stop-outline'
          : 'ant-design:play-circle-outline',
      danger: record.status === 1 ? true : false,
      popConfirm: {
        placement: 'left',
        title:
          record.status === 1 ? '确定要禁用吗？' : '确定要启用吗？',
        confirm: handleUpdateDocManageStatus.bind(null, record),
      },
    },
    {
      auth: [PerPrefix + PerEnum.DELETE],
      tooltip: '删除',
      icon: 'ant-design:delete-outlined',
      danger: true,
      popConfirm: {
        placement: 'left',
        title: '是否确认删除',
        confirm: handleDeleteDocManage.bind(null, record),
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
    content-class="h-full"
  >
    <template #left>
      <div class="h-full bg-card">
        <BasicTree
          ref="basicTreeRef"
          :loading="treeLoading"
          title="文档分类"
          :show-search="true"
          class="h-full flex flex-col"
          size="small"
          @select="handleSelect"
          :height="treeHeight"
          :field-names="{ children: 'children', title: 'cateName', key: 'id' }"
          :tree-data="cateTreeData"
          :action-list="treeActionList"
        >
          <template #headerTitle>
            <Row align="middle" class="w-full">
              <Col span="12"> 文档分类 </Col>
              <Col span="12" class="text-right">
                <Button size="small" @click="handleCreateCategory" type="primary"
                  >新增分类</Button
                >
              </Col>
            </Row>
          </template>
        </BasicTree>
      </div>
    </template>
    <BasicTable table-title="文档列表">
      <template #toolbar-tools>
        <Button
          v-access:code="PerPrefix + PerEnum.ADD"
          type="primary"
          @click="handleCreate"
        >
          新增
        </Button>
      </template>
      <template #docCateId="{ row }">
        {{ docCateDataMap[row.docCateId]?.cateName || '-' }}
      </template>
      <template #status="{ row }">
        <Tag :color="row.status === 1 ? 'green' : 'red'">{{ row.status === 1 ? '启用' : '禁用' }}</Tag>
      </template>
      <template #action="{ row }">
        <TableAction :actions="createActions(row)" />
      </template>
    </BasicTable>
    <DocManageDrawer ref="docManageDrawerRef" @success="handleSuccess" />
    <DocCateModal ref="docCateModalRef" @success="handleCategorySuccess" />
  </ColPage>
</template>
