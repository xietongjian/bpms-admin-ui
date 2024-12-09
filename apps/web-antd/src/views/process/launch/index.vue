<script lang="ts" setup>
import { nextTick, ref, unref } from 'vue';

import { Page } from '@vben/common-ui';

import {
  DeleteOutlined,
  PartitionOutlined,
  PictureFilled,
} from '@ant-design/icons-vue';
import {
  Avatar,
  Col,
  Divider,
  Empty,
  Input,
  List,
  Popconfirm,
  Row,
  Space,
  Spin,
  Tooltip,
  Tree,
  TypographyLink,
} from 'ant-design-vue';

import { getFlowCategories } from '#/api/base/category';
import {
  getDraftPageList,
  getMyCommonlyList,
  getPagerModelModelInfo,
} from '#/api/process/process';
import { Pane, Splitpanes } from '#/components/splitpanes';
import { forEach, listToTree } from '#/utils/helper/treeHelper';
import { groupBy } from '#/utils/index';

const showModel = ref(true);

const ListItem = List.Item;
const ListItemMeta = List.Item.Meta;
const treeData = ref<any[]>([]);
const allCategoriesList = ref<any[]>([]);
const allCategoryMap = ref([]);
const dataList = ref<any[]>([]);
const modelList = ref([]);
const searchTxt = ref<string>('');
const dataListLoading = ref<boolean>(false);
const basicTreeRef = ref<any>(null);
const currentCategory = ref<any>({});
const InputSearch = Input.Search;
// const [AppModal, modalApi] = useVbenModal({
//   connectedComponent: null,//AppInputModal,
//   centered: true,
// });
const pager = ref({
  pageNum: 1,
  pageSize: 9999,
  total: 0,
});

const pagination = {
  onChange: (page: number) => {
    pagination.current = page;
    pager.value.pageNum = page;
    fetchModelByPage();
  },
  pageSize: unref(pager).pageSize,
  hideOnSinglePage: true,
  size: 'small',
  current: 1,
};

function fetchModelByPage() {
  showModel.value = true;
  dataList.value = [];
  modelList.value = [];
  if (unref(currentCategory)) {
    if (unref(currentCategory).code === 'draftList') {
      showModel.value = false;
      // 查询草稿数据
      dataListLoading.value = true;
      getDraftPageList({
        categoryCode: unref(currentCategory).code,
        ...unref(pager),
        keyword: unref(searchTxt),
      })
        .then((res) => {
          const { rows, total } = res;
          dataList.value = rows;
          pagination.total = total;
          pager.value.total = total;
        })
        .finally(() => {
          dataListLoading.value = false;
        });
    } else if (unref(currentCategory).code === 'myCommonlyList') {
      showModel.value = false;
      // 查询我的常用流程
      dataListLoading.value = true;
      getMyCommonlyList()
        .then((res) => {
          dataList.value = res;
          pagination.total = res.length;
          pager.value.total = res.length;
        })
        .finally(() => {
          dataListLoading.value = false;
        });
    } else {
      showModel.value = true;
      // 查询模板数据
      dataListLoading.value = true;
      getPagerModelModelInfo({
        categoryCode: unref(currentCategory).code,
        ...unref(pager),
        keyword: unref(searchTxt),
      })
        .then((res) => {
          const { rows, total } = res;
          const result = groupBy(rows, 'categoryCode');
          modelList.value = result;
          pagination.total = total;
          pager.value.total = total;
        })
        .finally(() => {
          dataListLoading.value = false;
        });
    }
  } else {
    pagination.total = 0;
    pager.value.total = 0;
    dataList.value = [];
  }
}

const selectNodeId = ref([]);
const categoryTreeRef = ref(null);
fetch();
fetchModelByPage();

async function fetch() {
  // treeLoading.value = true;
  const categories = await getFlowCategories();
  allCategoriesList.value = JSON.parse(JSON.stringify(categories));
  // 所有的类别根据sn属性转换成map对象
  const tempAllCategoryMap = {};
  categories.forEach((item) => {
    item.key = item.id;
    item.title = item.name;
    tempAllCategoryMap[item.code] = item;
  });
  allCategoryMap.value = tempAllCategoryMap;
  const tempTreeData = listToTree(categories, {
    id: 'id',
    children: 'children',
    pid: 'pid',
  });
  forEach(
    tempTreeData,
    (node) => {
      if (node.children.length === 0) {
        delete node.children;
      }
    },
    { id: 'id', children: 'children', pid: 'pid' },
  );

  tempTreeData.unshift({
    code: 'draftList',
    key: 'draftList',
    title: '我的草稿',
    pid: '',
  });
  tempTreeData.unshift({
    code: 'myCommonlyList',
    key: 'myCommonlyList',
    title: '常用流程',
    pid: '',
  });

  treeData.value = tempTreeData;
  nextTick(() => {
    // 加载后展开节层级
    if (unref(treeData).length < 10) {
      unref(basicTreeRef)?.filterByLevel(1);
    }
  });
}
function onSearch() {
  fetchModelByPage();
}

function handleSelect(keys: string, e) {
  const node = e.selectedNodes[0];
  currentCategory.value = node || {};
  pager.value.pageNum = 1;
  pagination.current = 1;
  searchTxt.value = '';
  fetchModelByPage();
}
</script>

<template>
  <Page auto-content-height content-class="h-full">
    <Splitpanes
      class="default-theme h-full [&_.splitpanes__splitter]:!w-[10px]"
    >
      <Pane class="bg-transparent" min-size="20" size="30">
        <div class="bg-card flex h-full w-full flex-col">
          <div
            class="flex-center h-[50px] w-full border-b border-solid border-gray-200/50 p-4"
          >
            <h1 style="font-size: 16px">流程分类</h1>
          </div>
          <div
            class="h-full flex-1 overflow-y-auto overflow-x-hidden pb-2 pt-2"
          >
            <Tree
              v-bind="$attrs"
              v-if="treeData.length > 0"
              v-model:selected-keys="selectNodeId"
              :class="$attrs.class"
              :field-names="{ title: 'title', key: 'key' }"
              :show-line="false"
              :tree-data="treeData"
              :virtual="false"
              block-node
              default-expand-all
              @select="handleSelect"
            />
            <div v-else class="mt-5">
              <Empty
                :image="Empty.PRESENTED_IMAGE_SIMPLE"
                description="无数据"
              />
            </div>
          </div>
        </div>
      </Pane>
      <Pane class="ml-2 bg-transparent" min-size="20" size="70">
        <div class="flex h-full w-full flex-col gap-4 p-0">
          <div class="flex-center bg-card flex h-[50px] w-full flex-row p-4">
            <div class="w-[300px]">
              <h1 style="font-size: 16px">流程名称（共{{ pager.total }}条）</h1>
            </div>
            <div class="flex-1" style="padding: 6px">
              <InputSearch
                v-model:value="searchTxt"
                :allow-clear="true"
                enter-button
                placeholder="搜索流程模板"
                @search="onSearch"
              />
            </div>
          </div>
          <div class="bg-card m flex-1 overflow-y-auto overflow-x-hidden !p-4">
            <Spin v-if="showModel" :spinning="dataListLoading">
              <div class="m-h-[500px]">
                <template v-if="modelList && Object.keys(modelList).length > 0">
                  <div v-for="(values, key) of modelList" :key="key">
                    <Divider orientation="left" orientation-margin="0px">
                      <h1 style="font-size: 16px; font-weight: bold">
                        {{ allCategoryMap[key]?.name }}
                      </h1>
                    </Divider>
                    <Row :gutter="[16, 8]" align="top">
                      <Col v-for="item in values" :span="8">
                        <Space>
                          <Avatar :src="item.modelIcon" class="model-icon">
                            <template #icon>
                              <PictureFilled />
                            </template>
                          </Avatar>
                          <Tooltip placement="top" title="流程图预览">
                            <PartitionOutlined
                              class="flow-diagram-icon"
                              @click="
                                showFlowDiagram(item.name, item.modelKey, '')
                              "
                            />
                          </Tooltip>
                          <TypographyLink @click="handleLaunch(item)">
                            {{ item.name }}
                          </TypographyLink>
                        </Space>
                      </Col>
                    </Row>
                  </div>
                </template>
                <div v-else>
                  <Empty v-if="!dataListLoading" description="暂无流程模板" />
                </div>
              </div>
            </Spin>

            <List
              v-else
              :data-source="dataList"
              :loading="dataListLoading"
              :pagination="pagination"
              class="model-list"
              size="small"
            >
              <template #renderItem="{ item }">
                <ListItem key="item.id" class="list">
                  <template #actions>
                    <span>{{ item.categoryName }}</span>
                  </template>
                  <ListItemMeta>
                    <template #title>
                      <Space>
                        <Popconfirm
                          v-if="item.businessKey"
                          cancel-text="取消"
                          ok-text="确定"
                          title="确定要删除吗？"
                          type="link"
                          @confirm="handleDelFormDraftById(item.id)"
                        >
                          <DeleteOutlined style="color: red" />
                        </Popconfirm>

                        <Avatar :src="item.modelIcon" class="model-icon">
                          <template #icon>
                            <PictureFilled />
                          </template>
                        </Avatar>

                        <Tooltip placement="top" title="流程图预览">
                          <PartitionOutlined
                            class="flow-diagram-icon"
                            @click="
                              showFlowDiagram(item.name, item.modelKey, '')
                            "
                          />
                        </Tooltip>
                        <TypographyLink @click="handleLaunch(item)">
                          {{ item.name }}
                        </TypographyLink>
                      </Space>
                    </template>
                  </ListItemMeta>
                </ListItem>
              </template>
            </List>
          </div>
        </div>
      </Pane>
    </Splitpanes>
  </Page>
</template>
