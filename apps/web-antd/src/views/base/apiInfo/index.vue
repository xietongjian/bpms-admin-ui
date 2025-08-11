<script lang="ts" setup>
import {h, ref, unref,computed} from 'vue';
import type {Recordable} from '@vben/types';
import type {VxeGridProps} from '#/adapter/vxe-table';
import {useVbenVxeGrid} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import {ColPage} from '@vben/common-ui';
import {PerEnum} from "#/enums/perEnum";

import {
  deleteApiCategoryById,
  deleteApiInfoById,
  getApiCategoryListData,
  getApiInfoListByPage
} from '#/api/base/apiInfo';
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons-vue";
import {Button, Row, message, Popconfirm, Tooltip, Tree} from "ant-design-vue";
import {TableAction} from '#/components/table-action';
import {listToTree} from "#/utils/helper/treeHelper";
import { BasicTree } from '#/components/tree';

import ApiCategoryModal from "./api-category-modal.vue";
import ApiInfoDrawer from "./api-info-drawer.vue";
import {columns, searchFormSchema} from "./apiInfo.data";
import {useElementSize} from "@vueuse/core";
const basicTreeRef = ref(null);

const selectNodeIds = ref([]);
const treeLoading = ref(true);
const { height } = useElementSize(basicTreeRef);

const treeHeight = computed(() => {
  return height.value - 70;
})
const PerPrefix = "ApiInfo:";

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

const gridOptions: VxeGridProps<any> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns,
  columnConfig: {resizable: true},
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
      query: async ({page}, formValues) => {
        formValues.categoryId = currentNode.value.id;
        return await getApiInfoListByPage({
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

const apiCategoryDataMap = ref<any>({});
const apiCategoryTreeData = ref<any[]>([]);
const apiCategoryModalRef = ref();
const apiInfoDrawerRef = ref();
/*
const [registerApiCategoryModal, {
  openModal: openApiCategoryModal,
  setModalProps: setApiCategoryModalProps
}] = useModal();
*/

const treeActionList: any[] = [
  {
    render: (node) => {
      return h(Tooltip, {placement: 'top', title: '新建子分类'}, [
        h(PlusOutlined, {
          class: 'ml-2',
          onClick: (e) => {
            e.stopPropagation();
            handleCreateCategory(node);
          },
        })
      ]);
    },
  },
  {
    render: (node) => {
      return h(Tooltip, {placement: 'top', title: '编辑'}, [
        h(EditOutlined, {
          class: 'ml-2',
          onClick: (e) => {
            e.stopPropagation();
            handleUpdateCategory({
              id: node.id,
              pid: node.pid,
              name: node.title,
              orderNo: node.orderNo
            });
          },
        })
      ]);
    },
  },
  {
    render: (node) => {
      return h(Popconfirm, {
        title: '确定要删除分类吗？',
        onConfirm: () => {
          handleDeleteCategory(node);
        }
      }, [
        h(Tooltip, {placement: 'top', title: '删除'}, [
          h(DeleteOutlined, {
            onClick: (e) => {
              e.stopPropagation();
            }, class: 'ml-2', style: {color: 'red'}
          })
        ])
      ])
    },
  },
];

const currentNode = ref(undefined);
initApiCategoryTree();

function handleCreateCategory(node: any) {
  unref(apiCategoryModalRef).setData({pid: node?.id});
  unref(apiCategoryModalRef).open();
  unref(apiCategoryModalRef).setState({
    title: "新增分类",
  });
}

function handleUpdateCategory(node: any) {
  unref(apiCategoryModalRef).setData(node);
  unref(apiCategoryModalRef).open();
  unref(apiCategoryModalRef).setState({
    title: "修改分类",
  });
}

async function handleDeleteCategory(node: any) {
  // openFullLoading();
  try {
    const {success, msg} = await deleteApiCategoryById(node.id);
    if (success) {
      message.success(msg);
      initApiCategoryTree();
    } else {
      message.error(msg);
    }
  } finally {
    // closeFullLoading();
  }
}

function handleCreate() {
  debugger;
  apiInfoDrawerRef.value.setData({categoryId: unref(currentNode)?.id});
  apiInfoDrawerRef.value.setState({
    title: "新增接口",
  });
  apiInfoDrawerRef.value.open();
}

function handleEdit(record: Recordable<any>) {
  apiInfoDrawerRef.value.setData(record);
  apiInfoDrawerRef.value.open();
  apiInfoDrawerRef.value.setState({
    title: `编辑-${record.name}`,
  });
}

function handleDeleteApiInfo(record: Recordable<any>) {
  deleteApiInfoById(record.id).then(() => {
    tableApi.reload();
  });
}

async function initApiCategoryTree() {
  treeLoading.value = true;
  const res = await getApiCategoryListData();
  const tempCategoryMap = {};
  res.forEach(item => {
    tempCategoryMap[item.id] = item;
    item.title = item.name;
  })
  apiCategoryDataMap.value = tempCategoryMap;

  const treeData = listToTree(res);
  apiCategoryTreeData.value = treeData;
  treeLoading.value = false;
}

function handleSuccess() {
  tableApi.reload();
}

function handleCategorySuccess() {
  initApiCategoryTree();
}

async function handleSelect(node: any) {
  if (node) {
    currentNode.value = node;
  } else {
    currentNode.value = undefined;
  }
  await tableApi.reload();
}

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
      danger: true,
      popConfirm: {
        placement: 'left',
        title: '是否确认删除',
        confirm: handleDeleteApiInfo.bind(null, record),
        okButtonProps: {danger: true}
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
      <div class="h-full bg-card">
        <BasicTree
            ref="basicTreeRef"
            title="接口"
            :show-search="true"
            class="h-full flex flex-col"
            size="small"
            @select="handleSelect"
            :height="treeHeight"
            :field-names="{children:'children', title:'name', key:'id' }"
            :tree-data="apiCategoryTreeData"
        >
          <template #headerTitle>
            <Row align="middle" class="w-full">
              <Col span="12">
                接口分类
              </Col>
              <Col span="12" class="text-right">
                <Button size="small" @click="handleCreateCategory" type="primary">新增分类</Button>
              </Col>
            </Row>
          </template>
        </BasicTree>

<!--        <Tree
            v-bind="$attrs"
            v-if="apiCategoryTreeData.length > 0"
            v-model:selected-keys="selectNodeIds"
            :class="$attrs.class"
            :field-names="{ title: 'title', key: 'key' }"
            :show-line="{ showLeafIcon: false }"
            :tree-data="apiCategoryTreeData"
            block-node
            :virtual="false"
            default-expand-all
            @select="handleSelect"
        >
          <template #headerTitle>
            <Row align="middle" class="w-full">
              <Col span="12">
                接口分类
              </Col>
              <Col span="12" class="text-right">
                <Button size="small" @click="handleCreateCategory" type="primary">新增分类</Button>
              </Col>
            </Row>
          </template>
        </Tree>-->
      </div>
    </template>
    <BasicTable >
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix+PerEnum.ADD" type="primary" @click="handleCreate">
          新增
        </Button>
      </template>
      <template #categoryId="{ row }">
        {{ apiCategoryDataMap[row.categoryId]?.name || '-' }}
      </template>
      <template #action="{ row }">
        <TableAction :actions="createActions(row)" />
      </template>
    </BasicTable>
    <ApiInfoDrawer ref="apiInfoDrawerRef" @success="handleSuccess"/>
    <ApiCategoryModal ref="apiCategoryModalRef" @success="handleCategorySuccess"/>
  </ColPage>
</template>
