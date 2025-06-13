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
      <div class="flex flex-col bg-card h-full p-2">
        <div class="h-10 flex flex-row justify-between border border-solid border-b-px border-x-0 border-t-0">
          <span>图标分类</span>
          <Button v-access:code="PerPrefix+PerEnum.ADD"
                  size="small"
                  @click="handleCreateCategory"
                  type="primary">
            新增
          </Button>
        </div>
        <div>
          <Tree
            :loading="treeLoading"
            title="图标分类"
            treeWrapperClassName="h-[calc(100%-35px)] overflow-auto h-full"
            :clickRowToExpand="false"
            :treeData="iconCategoryTreeData"
            @select="handleSelect"
            ref="basicTreeRef"
            block-node
            :field-names="{ title: 'name' }"
            :actionList="treeActionList"
          >
            <template #title="node">
              <div class="w-full flex flex-row justify-between group">
                <span>{{ node.name }}</span>
                <span class="group-hover:block hidden text-right">
                      <Button @click.stop
                              size="small"
                              type="link"
                              :icon="h(EditOutlined)"
                              @click="handleUpdateCategory(node)"/>
                      <Popconfirm
                        title="确定要删除吗？"
                        ok-text="确认"
                        cancel-text="取消"
                        @confirm="handleDeleteCategory(node)"
                        :okButtonProps="{danger: true}"
                      >
                        <Button @click.stop
                                size="small"
                                type="link"
                                :icon="h(DeleteOutlined)"
                                danger/>
                      </Popconfirm>
                    </span>
              </div>
            </template>
          </Tree>
        </div>
      </div>
    </template>
    <div class="h-full flex flex-col ml-2 !bg-card p-0 p-2" min-size="20" size="80">
      <div class="h-12 flex flex-row justify-between items-center">
        <InputSearch class="w-[50%]"
                     v-model:value="searchTxt"
                     :allow-clear="true"
                     enter-button
                     placeholder="搜索图标"
                     @search="onSearch"
        />
        <div>
          <Button v-access:code="PerPrefix+PerEnum.ADD" type="primary" @click="handleCreate">新建</Button>
        </div>
      </div>

      <div class="flex-1 w-full overflow-y-auto border border-x-0">
        <Spin :spinning="dataLoading">
          <div class="flex flex-row w-full flex-wrap min-h-[300px]">
            <div v-if="listData && listData.length > 0" v-for="item in listData"
                 class="group relative flex flex-col items-center w-[80px] h-[100px] p-1">
              <div
                class="rounded-md hover:outline-rounded hover:outline hover:outline-solid hover:outline-blue-500 h-[60px] w-[60px] p-1">
                <Avatar
                  :src="item.icon"
                  shape="square"
                  class="w-full !leading-[62px] h-full items-center cursor-pointer object-contain"
                  @click="previewImageHandle(item.icon)"
                >
                  <template #icon>
                    <PictureOutlined class="text-4xl"/>
                  </template>
                </Avatar>
              </div>
              <div class="text-center w-full">
                <div
                  class="text-sm w-full overflow-ellipsis overflow-hidden whitespace-nowrap overflow-hidden whitespace-nowrap text-overflow-ellipsis"
                  :title="item.name">{{ item.name }}
                </div>
                <div class="text-xs text-gray-400">{{ item.sn }}</div>
              </div>
              <!-- v-if="hasAccessByCodes([PerPrefix + PerEnum.UPDATE, PerPrefix + PerEnum.DELETE])" -->
              <div
                  v-access:code="[PerPrefix + PerEnum.UPDATE, PerPrefix + PerEnum.DELETE]"
                class="group-hover:block hidden absolute top-1 right-3 cursor-pointer">
                <Dropdown>
                  <a class="w-[20px] h-[20px] bg-blue-500/80 rounded-full flex items-center justify-center"
                     @click.prevent>
                    <EllipsisOutlined style="color: white;"/>
                  </a>
                  <template #overlay>
                    <Menu>
                      <MenuItem v-access:code="PerPrefix+PerEnum.UPDATE" >
                        <a href="javascript:;" @click="handleEdit(item)">编辑</a>
                      </MenuItem>
                      <MenuItem v-access:code="PerPrefix+PerEnum.DELETE" >
                        <Popconfirm
                          title="确定要删除吗？"
                          ok-text="确认"
                          cancel-text="取消"
                          @confirm="handleDeleteIconInfo(item)"
                          :okButtonProps="{danger: true}"
                        >
                          <a href="javascript:;">删除</a>
                        </Popconfirm>
                      </MenuItem>
                    </Menu>
                  </template>
                </Dropdown>
              </div>
            </div>
            <div v-else class="text-center w-full">
              <Empty/>
            </div>
          </div>
        </Spin>
      </div>

      <div class="h-12 text-center flex flex-col justify-center">
        <Pagination size="small"
                    :pagination="pagination"
                    :defaultPageSize="100"
                    @change="onChange"
                    @showSizeChange="onShowSizeChange"
                    :pageSizeOptions="['50', '100', '200', '300', '500', '1000']"
                    :total="pagination.total"/>
      </div>
    </div>
    <IconInfoModal ref="iconInfoModalRef" @success="handleSuccess"/>
    <IconCategoryModal ref="iconCategoryModalRef" @success="handleCategorySuccess"/>
    <div class="w-0 h-0 overflow-hidden">
      <Image
        :width="0"
        :height="0"
        :src="previewImage"
        :preview="{ visible: previewImageVisible, onVisibleChange: previewImageVisibleChange }"
      />
    </div>
  </ColPage>
</template>
<script lang="ts" setup>
import {h, onMounted, ref} from 'vue';
import {
  deleteIconCategoryById,
  deleteIconInfoById,
  getIconCategoryListData,
  getIconInfoListByPage,
} from '#/api/base/iconInfo';
import {ColPage, Page} from '@vben/common-ui';
import type {Recordable} from '@vben/types';

import {listToTree} from '#/utils/helper/treeHelper';
import {PerEnum} from "#/enums/perEnum";

import IconInfoModal from './IconInfoModal.vue';
import IconCategoryModal from './IconCategoryModal.vue';

import {DeleteOutlined, EditOutlined, EllipsisOutlined, PictureOutlined, PlusOutlined} from '@ant-design/icons-vue';
import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Empty,
  Image,
  Input,
  Menu,
  message,
  Pagination,
  Popconfirm,
  Row,
  Spin,
  Tooltip,
  Tree
} from 'ant-design-vue';

const PerPrefix = "IconInfo:";

const MenuItem = Menu.Item;

const InputSearch = Input.Search;
const searchTxt = ref('');
const listData = ref([]);
const previewImage = ref<string>('');
const previewImageVisible = ref<boolean>(false);
const iconInfoModalRef = ref();
const iconCategoryModalRef = ref();
const treeLoading = ref(true);
const dataLoading = ref(false);
const iconCategoryDataMap = ref<any>({});
const iconCategoryTreeData = ref<any[]>([]);


const pagination = ref({
  current: 1,
  pageSize: 50,
  total: 0,
});

function onChange(page: number) {
  pagination.value.current = page;
  fetchIconInfoList();
}

function onShowSizeChange(current: number, pageSize: number) {
  pagination.value.pageSize = pageSize;
  pagination.value.current = 1;
}

function onSearch(e) {
  pagination.value.current = 1;
  fetchIconInfoList();
}


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

async function fetchIconInfoList() {
  dataLoading.value = true;
  try {
    const {total, rows} = await getIconInfoListByPage({
      query: {pageSize: pagination.value.pageSize, pageNum: pagination.value.current},
      entity: {keyword: searchTxt.value, categoryId: currentNode.value?.id}
    });
    pagination.value.total = total;
    listData.value = rows;
  } catch (e) {
    console.error(e);
  } finally {
    dataLoading.value = false;
  }

}

onMounted(async () => {
  pagination.value.current = 1;
  fetchIconInfoList();
});

const currentNode = ref(undefined);

initIconCategoryTree();

function handleCreateCategory(node: any) {
  iconCategoryModalRef.value.setData({pid: node?.id});
  iconCategoryModalRef.value.open();
  iconCategoryModalRef.value.setState({
    title: '新增分类'
  });
}

function handleUpdateCategory(node: any) {
  iconCategoryModalRef.value.setData(node);
  iconCategoryModalRef.value.open();
  iconCategoryModalRef.value.setState({
    title: '修改分类'
  });
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
  iconInfoModalRef.value.setData({});
  iconInfoModalRef.value.open();
  iconInfoModalRef.value.setState({
    title: '新建图标'
  });
}

function handleEdit(record: Recordable<any>) {
  iconInfoModalRef.value.setData(record);
  iconInfoModalRef.value.open();
  iconInfoModalRef.value.setState({
    title: '编辑图标'
  });
}

async function handleDeleteIconInfo(record: Recordable<any>) {
  const {success, msg} = await deleteIconInfoById(record.id);
  if (success) {
    message.success(msg)
    fetchIconInfoList();
  }
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
    fetchIconInfoList();
  }, 200);
}

function handleCategorySuccess() {
  initIconCategoryTree();
}

function handleSelect(node: any, e: any) {
  const selectedNode = e.selectedNodes[0];
  if (selectedNode) {
    currentNode.value = selectedNode;
  } else {
    currentNode.value = undefined;
  }
  fetchIconInfoList();
}
</script>
