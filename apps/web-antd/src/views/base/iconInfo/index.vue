<template>
  <Page auto-content-height>
    <div class="p-4 h-full">
      <Splitpanes class="default-theme h-full !bg-card">
        <Pane class="!bg-card" min-size="10" size="20">
          <Tree
              :loading="treeLoading"
              title="图标分类"
              treeWrapperClassName="h-[calc(100%-35px)] overflow-auto h-full"
              :clickRowToExpand="false"
              :treeData="iconCategoryTreeData"
              @select="handleSelect"
              ref="basicTreeRef"
              :field-names="{ title: 'name' }"
              :actionList="treeActionList"
          >
            <template #headerTitle>
              <Row align="middle" class="w-full">
                <Col span="12"> 图标分类</Col>
                <Col span="12" class="text-right">
                  <Button size="small" @click="handleCreateCategory" type="primary"
                  >新增分类
                  </Button
                  >
                </Col>
              </Row>
            </template>
          </Tree>
        </Pane>
        <Pane class="flex flex-col ml-2 !bg-card p-2" min-size="20" size="80">
          <div class="h-10">
            aaa
          </div>
          <div class="flex-1">
            <List :grid="{ xs: 4, sm: 6, md: 6, lg: 8, xl: 8, xxl: 10 }" :pagination="pagination" :data-source="listData">
              <template #renderItem="{ item }">
                <ListItem>
                  <div class="flex items-center flex-col size-[80px] p-1 border-rounded border-[1px] border-solid border-gray-400 outline-px outline-solid outline-gray-300 hover:outline-blue-500">
                    <Avatar
                        :src="item.icon"
                        square
                        class="size-[60px] cursor-pointer object-contain"
                        @click="previewImageHandle(item.icon)"
                    >
                      <template #icon>
                        <UserOutlined/>
                      </template>
                    </Avatar>
                    <div class="ml-2 text-center">
                      <div class="text-sm">{{ item.name }}</div>
                      <div class="text-xs text-gray-400">{{ item.sn }}</div>
                    </div>
                  </div>
                </ListItem>
              </template>
            </List>
          </div>

<!--          <BasicTable @register="registerTable" class="!p-0">
            <template #toolbar>
              <Authority :value="'IconInfo:' + PerEnum.ADD">
                <a-button type="primary" @click="handleCreate">新增</a-button>
              </Authority>
            </template>
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'name'">
                <Avatar
                    :src="record.icon"
                    class="w-[50px] h-[50px] cursor-pointer object-contain"
                    @click="previewImageHandle(record.icon)"
                >
                  <template #icon>
                    <UserOutlined/>
                  </template>
                </Avatar>
              </template>
              <template v-if="column.key === 'categoryId'">
                {{ iconCategoryDataMap[record.categoryId]?.name || '-' }}
              </template>
              <template v-if="column.key === 'action'">
                <TableAction
                    :actions="[
                    {
                      auth: 'IconInfo:' + PerEnum.UPDATE,
                      tooltip: '修改',
                      icon: 'clarity:note-edit-line',
                      onClick: handleEdit.bind(null, record),
                    },
                    {
                      auth: 'IconInfo:' + PerEnum.DELETE,
                      tooltip: '删除',
                      icon: 'ant-design:delete-outlined',
                      color: 'error',
                      popConfirm: {
                        placement: 'left',
                        title: '是否确认删除',
                        confirm: handleDeleteIconInfo.bind(null, record),
                      },
                    },
                  ]"
                />
              </template>
            </template>
          </BasicTable>-->
        </Pane>
      </Splitpanes>
    </div>
    <IconInfoModal ref="iconInfoModalRef" @register="registerIconInfoDrawer" @success="handleSuccess"/>
    <IconCategoryModal ref="iconCategoryModalRef" @register="registerIconCategoryModal" @success="handleCategorySuccess"/>
    <div class="w-0 h-0 overflow-hidden">
      <Image
          :width="0"
          :height="0"
          :src="previewImage"
          :preview="{ visible: previewImageVisible, onVisibleChange: previewImageVisibleChange }"
      />
    </div>
  </Page>
</template>
<script lang="ts" setup>
import {ref, h, unref, onMounted} from 'vue';
import {
  getIconInfoListByPage,
  getIconCategoryListData,
  deleteIconCategoryById,
  deleteIconInfoById,
} from '#/api/base/iconInfo';
import {Page} from '@vben/common-ui';
import type {Recordable} from '@vben/types';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';

import {Splitpanes, Pane} from '#/components/splitpanes';
import {listToTree} from '#/utils/helper/treeHelper';

import {columns, searchFormSchema} from './iconInfo.data';

import {PerEnum} from "#/enums/perEnum";
import {useVbenVxeGrid} from '#/adapter/vxe-table';
import {TableAction} from '#/components/table-action';

import {useAccess} from '@vben/access';

import IconInfoModal from './IconInfoModal.vue';
import IconCategoryModal from './IconCategoryModal.vue';

import {DeleteOutlined, PlusOutlined, EditOutlined, UserOutlined} from '@ant-design/icons-vue';
import {message, Popconfirm, Card, Button, Image, Row, Col, Tooltip, Avatar, Tree, List} from 'ant-design-vue';

const ListItem = List.Item;
const listData = ref([]);
const previewImage = ref<string>('');
const previewImageVisible = ref<boolean>(false);
const iconInfoModalRef = ref();
const iconCategoryModalRef = ref();
const treeLoading = ref(true);

const pagination = {
  onChange: (page: number) => {
    fetchIconInfoList({pageNum: page});
  },
  pageSize: 50,
  total: 0,
};

const iconCategoryDataMap = ref<any>({});
const iconCategoryTreeData = ref<any[]>([]);

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
        }),
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
              orderNo: node.orderNo,
            });
          },
        }),
      ]);
    },
  },
  {
    render: (node) => {
      return h(
          Popconfirm,
          {
            title: '确定要删除分类吗？',
            onConfirm: () => {
              handleDeleteCategory(node);
            },
          },
          [
            h(Tooltip, {placement: 'top', title: '删除'}, [
              h(DeleteOutlined, {
                onClick: (e) => {
                  e.stopPropagation();
                },
                class: 'ml-2',
                style: {color: 'red'},
              }),
            ]),
          ],
      );
    },
  },
];

async function fetchIconInfoList(params){
  const {total, rows} = await getIconInfoListByPage({
    query: {pageSize: pagination.pageSize, pageNum: params.pageNum},
    entity: {keyword: params.keyword}
  });
  pagination.total = total;
  listData.value = rows;
}

onMounted(async() => {
  fetchIconInfoList({pageNum: 1});
});

const currentNode = ref(undefined);
/*const [registerTable, {reload, getForm}] = useTable({
  title: '列表',
  api: getIconInfoListByPage,
  columns,
  formConfig: {
    labelWidth: 100,
    schemas: searchFormSchema,
    showAdvancedButton: false,
    showResetButton: false,
    autoSubmitOnEnter: true,
  },
  canColDrag: true,
  useSearchForm: true,
  bordered: true,
  showIndexColumn: true,
  actionColumn: {
    width: 140,
    title: '操作',
    dataIndex: 'action',
  },
});*/

initIconCategoryTree();

function handleCreateCategory(node: any) {
  openIconCategoryModal(true, {
    isUpdate: false,
    record: {pid: node?.id},
  });
  setIconCategoryModalProps({title: '新增分类', centered: true});
}

function handleUpdateCategory(node: any) {
  openIconCategoryModal(true, {
    isUpdate: true,
    record: node,
  });
  setIconCategoryModalProps({title: '修改分类', centered: true});
}

function previewImageHandle(previewImg) {
  if (previewImg) {
    previewImage.value = previewImg;
    previewImageVisible.value = true;
  }
}

function previewImageVisibleChange(visible, prevVisible) {
  previewImageVisible.value = visible;
}

async function handleDeleteCategory(node: any) {
  // openFullLoading();
  try {
    const {success, msg} = await deleteIconCategoryById(node.id);
    if (success) {
      message.success(msg);
      initIconCategoryTree();
    } else {
      message.error(msg);
    }
  } finally {
    // closeFullLoading();
  }
}

function handleCreate() {
  openIconInfoDrawer(true, {
    isUpdate: false,
    record: {categoryId: unref(currentNode)?.id},
  });
  setIconInfoDrawerProps({title: `新建接口`});
}

function handleEdit(record: Recordable) {
  openIconInfoDrawer(true, {
    record,
    isUpdate: true,
  });
  setIconInfoDrawerProps({title: `编辑-${record.name}`});
}

function handleDeleteIconInfo(record: Recordable) {
  deleteIconInfoById(record.id).then(() => {
    reload();
  });
}

async function initIconCategoryTree() {
  treeLoading.value = true;
  const res = await getIconCategoryListData();
  const tempCategoryMap = {};
  res.forEach((item) => {
    tempCategoryMap[item.id] = item;
    item.title = item.name;
  });
  iconCategoryDataMap.value = tempCategoryMap;

  const treeData = listToTree(res);
  iconCategoryTreeData.value = treeData;
  treeLoading.value = false;
}

function handleSuccess() {
  setTimeout(() => {
    const {getFieldsValue} = getForm();
    const values = getFieldsValue();
    reload({searchInfo: {categoryId: unref(currentNode)?.id, ...values}});
  }, 200);
}

function handleCategorySuccess() {
  initIconCategoryTree();
}

async function handleSelect(node: any, e: any) {
  const selectedNode = e.selectedNodes[0];
  if (selectedNode) {
    currentNode.value = selectedNode;
    const {getFieldsValue} = getForm();
    const values = getFieldsValue();
    await reload({searchInfo: {categoryId: selectedNode.id, ...values}});
  } else {
    currentNode.value = undefined;
    await reload();
  }
}
</script>
