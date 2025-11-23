<script lang="ts" setup>
import { nextTick, ref, unref, shallowRef, onMounted } from 'vue';
import { Page, ColPage } from '@vben/common-ui';
import type {Recordable} from '@vben/types';
import { saveCommonlyProcess,cancelCommonlyProcess } from '#/api/process/process';
import {
  DeleteOutlined,
  PartitionOutlined,
  PictureFilled,
} from '@ant-design/icons-vue';
import {
  Avatar,
  Divider,
  Empty,
  Input,
  List,
  Popconfirm,
  Space,
  Tooltip,
  Tree,
  TypographyLink,
  message
} from 'ant-design-vue';
import {BpmnPreviewModal, ProcessFormPreviewDrawer} from '#/views/components/preview';
import ProcessFormLaunchModal from '#/views/process/actions/LaunchModal.vue';

import { getFlowCategories, getCategoriesByLoginUser } from '#/api/base/category';
import {
  delFormDraftById,
  getDraftPageList,
  getMyCommonlyList,
  getPagerModelModelInfo,
} from '#/api/process/process';
import { forEach, listToTree } from '#/utils/helper/treeHelper';
import { groupBy } from '#/utils/index';
import { useRouter } from 'vue-router';
import {changeURLPar} from "#/utils/domUtils";

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
const router = useRouter();

const bpmnPreviewModalRef = ref(),
    processFormPreviewDrawerRef = shallowRef(),
    processFormLaunchModalRef = ref();

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

async function fetchModelByPage() {
  showModel.value = true;
  dataList.value = [];
  modelList.value = [];
  if (unref(currentCategory)) {
    if (unref(currentCategory).code === 'draftList') {
      showModel.value = false;
      // 查询草稿数据
      dataListLoading.value = true;
      try {
        const params = {
          entity: {
            keyword: unref(searchTxt)
          },
          query: {
            ...unref(pager)
          }
        };
        const res = await getDraftPageList(params);
        const {rows, total} = res;
        dataList.value = rows;
        pagination.total = total;
        pager.value.total = total;
      } catch (e) {
        console.error(e);
      } finally {
        dataListLoading.value = false;
      }

    } else if (unref(currentCategory).code === 'myCommonlyList') {
      showModel.value = false;
      // 查询我的常用流程
      dataListLoading.value = true;
      try {
        const params = {
          entity: {
            keyword: unref(searchTxt)
          },
          query: {
            ...unref(pager)
          }
        };
        const res = await getMyCommonlyList(params);
        dataList.value = res;
        pagination.total = res.length;
        pager.value.total = res.length;
      } catch (e) {
        console.error(e);
      } finally {
        dataListLoading.value = false;
      }
    } else {
      showModel.value = true;
      // 查询模板数据
      dataListLoading.value = true;
      try {
        const params = {
          entity: {
            categoryCode: unref(currentCategory).code,
            keyword: unref(searchTxt),
          },
          query: {
            ...unref(pager)
          }
        }
        const res = await getPagerModelModelInfo(params);
        const { rows, total } = res;
        const result = groupBy(rows, 'categoryCode');
        modelList.value = result;
        pagination.total = total;
        pager.value.total = total;
      } catch (e) {
        console.error(e);
      } finally {
        dataListLoading.value = false;
      }
    }
  } else {
    pagination.total = 0;
    pager.value.total = 0;
    dataList.value = [];
  }
}

const selectNodeId = ref([]);
const categoryTreeRef = ref(null);

onMounted(() => {
  const { currentRoute } = useRouter();
  const {
    query: { modelKey },
  } = unref(currentRoute);

  fetch();
  fetchModelByPage();
  if(modelKey){
    handleLaunch({modelKey});
    return;
  }
})

async function fetch() {
  // treeLoading.value = true;
  const categories = await getCategoriesByLoginUser();
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

function handleBpmnPreview(modelKey, procInstId) {
  bpmnPreviewModalRef.value.setData({modelKey, procInstId});
  bpmnPreviewModalRef.value.open();
}

function handleLaunch(record: Recordable<any>) {
  processFormLaunchModalRef.value.setData({
    modelKey: record.modelKey,
    businessKey: record.businessKey || '',
    viewType: 'launch',
  });
  processFormLaunchModalRef.value.setState({title: `查看流程【${record.name}】的表单`});
  processFormLaunchModalRef.value.open();

  changeLaunchUrl(record.modelKey, record.businessKey || '');
}

function changeLaunchUrl(modelKey, businessKey) {
  let newUrl = changeURLPar(window.location.href, 'modelKey', modelKey);
  newUrl = changeURLPar(newUrl, 'viewType', 'launch');
  newUrl = changeURLPar(newUrl, 'businessKey', businessKey);
  window.history.replaceState({ path: newUrl }, '', newUrl);
}

async function handleDelFormDraftById(id) {
  const {success, msg} = await delFormDraftById({ id });
  if(success){
    if (success) {
      message.success(msg);
      fetchModelByPage();
    } else {
      message.error(msg);
    }
  }
}

function handleLaunchSuccess() {
  changeLaunchUrl('', '');
  router.push({ name: 'Launched' });
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
    </template>

    <div class="flex h-full w-full flex-col p-0 pl-2">
      <div class="flex-center bg-card flex h-[50px] w-full flex-row p-4 mb-2">
        <div class="w-[300px]">
          <h1 style="font-size: 16px">流程名称（共{{ pager.total }}条）</h1>
        </div>
        <div class="flex-1 p-2">
          <InputSearch
            v-model:value="searchTxt"
            :allow-clear="true"
            enter-button
            placeholder="搜索流程模板"
            @search="onSearch"
          />
        </div>
      </div>
      <div v-loading="dataListLoading" class="w-full overflow-y-auto bg-card flex-1 p-4">
        <div v-if="showModel" class="m-h-[500px] h-full">
          <div v-if="modelList && Object.keys(modelList).length > 0">
            <div v-for="(values, key) of modelList" :key="key">
              <Divider orientation="left" orientation-margin="0px">
                <h1 class="text-sm font-bold">
                  {{ allCategoryMap[key]?.name }}
                </h1>
              </Divider>
              <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                <div v-for="item in values" class="hover:bg-primary/5 rounded-sm hover:shadow-sm p-1 gap-1 flex items-center justify-start text-nowrap overflow-hidden">
                  <Avatar :src="item.modelIcon" class="model-icon bg-primary/20 grow-0 shrink-0">
                    <template #icon>
                      <PictureFilled />
                    </template>
                  </Avatar>
                  <Tooltip placement="top" title="流程图预览" >
                    <PartitionOutlined
                      class="text-primary grow-0 shrink-0"
                      @click="handleBpmnPreview(item.modelKey, '')"
                    />
                  </Tooltip>
                  <TypographyLink :title="item.name" class="flex-1 text-nowrap overflow-hidden text-ellipsis" @click="handleLaunch(item)">
                    {{ item.name }}
                  </TypographyLink>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <Empty v-if="!dataListLoading" description="暂无流程模板" />
          </div>
        </div>

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
                      <DeleteOutlined class="text-red-800" />
                    </Popconfirm>

                    <Avatar :src="item.modelIcon" class="model-icon">
                      <template #icon>
                        <PictureFilled />
                      </template>
                    </Avatar>

                    <Tooltip placement="top" title="流程图预览">
                      <PartitionOutlined
                        class="cursor-pointer"
                        @click="handleBpmnPreview(item.modelKey)"
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
      <BpmnPreviewModal ref="bpmnPreviewModalRef" />
      <ProcessFormPreviewDrawer ref="processFormPreviewDrawerRef" />
      <ProcessFormLaunchModal ref="processFormLaunchModalRef" @success="handleLaunchSuccess" />
    </div>
  </ColPage>
</template>
