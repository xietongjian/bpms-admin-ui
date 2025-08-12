<template>
  <div class="h-full border flex flex-col flex-start items-stretch justify-between rounded-lg overflow-hidden">
    <div class="!h-10 flex items-center flex-nowrap justify-between px-2 bg-white/10 border-b border-b-1">
      <div class="font-bold">
        <AuditOutlined class="mr-2 text-[#2d93f9]" />
        <span>办件中心</span>
      </div>
      <div>
        <Button type="link" size="small" @click="handleToMore()">更多</Button>
      </div>
    </div>
    <div class="flex-1 p-2 flex flex-col justify-between items-stretch overflow-hidden">
      <div class="h-10">
        <Tabs v-model:activeKey="activeKey" @change="key => onTabChange(key)" size="small" class="[&_.ant-tabs-nav]:!mb-0">
          <TabPane v-for="pane in tabList" :key="pane.key" >
            <template #tab>
              <Badge v-if="pane.key==='todo'" :count="todoPageData.total" :offset="[3, -3]" :number-style="{fontSize: '10px'}" size="small" :showZero="false">
                {{ pane.tab }}
              </Badge>
              <span v-else>{{pane.tab}}</span>
            </template>
          </TabPane>
        </Tabs>
      </div>
      <div class="flex-1 h-full overflow-y-auto [&_.ant-list-item-meta-avatar]:!me-1">
        <div class="flex" v-if="activeKey === 'todo'">
          <List class="flex-1" size="small" :loading="todoLoading"
                item-layout="horizontal"
                :pagination="todoPagination"
                :data-source="todoPageData.rows">
            <template #renderItem="{ item }">
              <ListItem class="bg-secondary-foreground/5 hover:bg-secondary-foreground/10">
                <ListItemMeta>
                  <template #description>
                    <Space class="font-size-[12px] [&_*]:font-size-[12px]">
                      <span>
                        <EmpInfo :no="item.startPersonCode" :name="item.startPersonName" >
                          <TypographyLink>
                            {{item.startPersonName}}
                          </TypographyLink>
                        </EmpInfo>
                        发起，
                        任务接收时间
                      </span>
                      <span>{{ item.createTime }}</span>
                    </Space>
                  </template>
                  <template #title>
                    <TypographyLink @click="handleViewForm(item, 'todo')">
                      {{item.formName}}
                    </TypographyLink>
                  </template>
                  <template #avatar>
                    <Tooltip :title="item.processStatusName">
                      <Badge v-if="item.processStatus === 'applying'" color="blue" />
                      <Badge v-else-if="item.processStatus === 'end'" color="gray" />
                      <Badge v-else-if="item.processStatus === 'zz'" color="red" />
                      <Badge v-else color="gray" />
                    </Tooltip>
                  </template>
                </ListItemMeta>
              </ListItem>
            </template>
          </List>
        </div>
        <div class="flex-1" v-else-if="activeKey === 'haveDown'">
          <List :loading="haveDownLoading" size="small"
                item-layout="horizontal"
                :pagination="haveDownPagination"
                :data-source="haveDownPageData.rows">
            <template #renderItem="{ item }">
              <ListItem class="bg-gray-300/20 hover:bg-gray-300/40">
                <ListItemMeta>
                  <template #description>
                    <Space class="font-size-[12px] [&_*]:font-size-[12px]">
                  <span>
                    <EmpInfo :no="item.startPersonCode" :name="item.startPersonName" >
                      <TypographyLink>
                        {{item.startPersonName}}
                      </TypographyLink>
                    </EmpInfo>
                    发起
                  </span>
                      <span>{{ item.createTime }}</span>
                    </Space>
                  </template>
                  <template #title>
                    <TypographyLink @click="handleViewForm(item, 'haveDown')">
                      {{item.formName}}
                    </TypographyLink>
                  </template>
                  <template #avatar>
                    <Tooltip :title="item.processStatusName">
                      <Badge v-if="item.processStatus === 'applying'" color="blue" />
                      <Badge v-else-if="item.processStatus === 'end'" color="gray" />
                      <Badge v-else-if="item.processStatus === 'zz'" color="red" />
                      <Badge v-else color="gray" />
                    </Tooltip>
                  </template>
                </ListItemMeta>
              </ListItem>
            </template>
          </List>
        </div>
        <div class="flex-1" v-else-if="activeKey === 'launched'">
          <List :loading="launchedLoading" size="small"
                item-layout="horizontal"
                :pagination="launchedPagination"
                :data-source="launchedPageData.rows">
            <template #renderItem="{ item }">
              <ListItem class="bg-gray-300/20 hover:bg-gray-300/40">
                <ListItemMeta>
                  <template #description>
                    <div class="font-size-[12px] [&_*]:font-size-[12px]">
                      <div v-if="item.endTime">
                        待办人：
                        <template v-for="itm in item.currentAssignees" >
                          <EmpInfo v-if="itm.type === 'user'" :no="itm.code" :name="itm.name" />
                          <Popover v-else :title="'角色信息'">
                            <template #content>
                              <div>名称：{{itm.name}}</div>
                              <div>标识：{{itm.code}}</div>
                            </template>
                            {{itm.name}}
                          </Popover>
                        </template>
                      </div>
                      <div v-if="!item.endTime">
                        发起时间：{{ item.startTime }}
                      </div>
                      <div v-else>
                        审批时间：{{ item.startTime }} - {{ item.endTime }}
                      </div>
                    </div>
                  </template>
                  <template #title>
                    <TypographyLink @click="handleViewForm(item, 'launched')">
                      {{item.formName}}
                    </TypographyLink>
                  </template>
                  <template #avatar>
                    <Tooltip :title="item.processStatusName">
                      <Badge v-if="item.processStatus === 'applying'" color="blue" />
                      <Badge v-else-if="item.processStatus === 'end'" color="gray" />
                      <Badge v-else-if="item.processStatus === 'zz'" color="red" />
                      <Badge v-else color="gray" />
                    </Tooltip>
                  </template>
                </ListItemMeta>
              </ListItem>
            </template>
          </List>
        </div>
      </div>
    </div>
    <ProcessFormPreviewDrawer ref="processFormPreviewDrawerRef" @onClose="handleProcessFormVisibleChange"/>
    <!--    <ProcessFormModal
            @register="registerProcessFormModal"
            @visible-change="handleProcessFormVisibleChange"
        />-->
  </div>
</template>
<script lang="ts" setup>
import {ref, onMounted, shallowRef} from 'vue';
import {Card, List, Button, Tabs, Space, Badge, TypographyLink, Popover} from 'ant-design-vue';
import {EmpInfo} from '#/views/components/EmpInfo';
import {
  findMyProcessinstancesPagerModel,
  getAppingTasksPagerModel,
  getApplyedTasksPagerModel,
} from "#/api/process/process";
import {AuditOutlined} from "@ant-design/icons-vue";
import type {Recordable} from '@vben/types';
import {ProcessFormPreviewDrawer} from '#/views/components/preview';
import {useRouter} from 'vue-router';
const TabPane = Tabs.TabPane;

const router = useRouter();

const processFormPreviewDrawerRef = shallowRef();

const ListItem = List.Item;
const ListItemMeta = List.Item.Meta;
const todoLoading = ref(true);
const launchedLoading = ref(true);
const haveDownLoading = ref(true);
const todoPagination = {
  onChange: (page: number) => {
    fetchTodoData(page);
  },
  size: 'small',
  total: 0,
  pageSize: 10,
  hideOnSinglePage: true,
};
const haveDownPagination = {
  onChange: (page: number) => {
    fetchHaveDownData(page);
  },
  size: 'small',
  total: 0,
  pageSize: 10,
  hideOnSinglePage: true,
};
const launchedPagination = {
  onChange: (page: number) => {
    fetchLaunchedData(page);
  },
  size: 'small',
  total: 0,
  pageSize: 10,
  hideOnSinglePage: true,
};

const todoPageData = ref({});
const haveDownPageData = ref({});
const launchedPageData = ref({});

onMounted(() => {
  fetchTodoData(1, 10);
  fetchLaunchedData(1, 0);
  fetchHaveDownData(1, 0);
});

// const [
//   registerProcessFormModal,
//   { openModal: openProcessFormModal, setModalProps: setProcessFormModalProps },
// ] = useModal();

function handleProcessFormVisibleChange() {
  if (activeKey.value === 'todo') {
    setTimeout(() => {
      fetchTodoData(1);
    }, 2);
  }
}

/*  function handleViewForm(record: Recordable<any>) {
    record.allowsOperation = activeKey.value === 'todo';
    openProcessFormModal(true, {
      record,
    });
    setProcessFormModalProps({
      width: 1000,
      title: `查看流程【${record.formName}】的表单`,
      showOkBtn: false,
      centered: true,
      cancelText: '关闭',
      maskClosable: true,
    });
  }*/

function handleViewForm(record: Recordable<any>) {
  processFormPreviewDrawerRef.value.setData({
    ...record,
    procInstId: record.processInstanceId,
    modelKey: record.processDefinitionKey,
    showOperation: activeKey.value === 'todo',
  });
  processFormPreviewDrawerRef.value.setState({title: `查看流程【${record.formName}】的表单`});
  processFormPreviewDrawerRef.value.open();
}

function handleToMore() {
  if (activeKey.value === 'todo') {
    router.push({name: 'Todo'});
  } else if (activeKey.value === 'haveDown') {
    router.push({name: 'HaveDown'});
  } else if (activeKey.value === 'launched') {
    router.push({name: 'Launched'});
  }
}

async function fetchTodoData(pageNum = 1, pageSize = 10) {
  todoLoading.value = true;

  try {
    const params = {
      query: {pageSize: pageSize, pageNum: pageNum},
      entity: {}
    }
    const res = await getAppingTasksPagerModel(params);
    todoPageData.value = res;
    todoPagination.total = res.total;
  } catch (e) {
  } finally {
    todoLoading.value = false;
  }
}

async function fetchHaveDownData(pageNum = 1, pageSize = 10) {
  haveDownLoading.value = true;

  try {
    const params = {
      query: {pageSize: pageSize, pageNum: pageNum},
      entity: {}
    }
    const res = await getApplyedTasksPagerModel(params);
    haveDownPageData.value = res;
    haveDownPagination.total = res.total;
  } catch (e) {
  } finally {
    haveDownLoading.value = false;
  }
}

async function fetchLaunchedData(pageNum = 1, pageSize = 10) {
  launchedLoading.value = true;

  try {
    const params = {
      query: {pageSize: pageSize, pageNum: pageNum},
      entity: {}
    }
    const res = await findMyProcessinstancesPagerModel(params);
    launchedPageData.value = res;
    launchedPagination.total = res.total;
  } catch (e) {
  } finally {
    launchedLoading.value = false;
  }
}

const activeKey = ref('todo');
const tabList = [
  {
    key: 'todo',
    tab: '待办',
  },
  {
    key: 'launched',
    tab: '已发',
  },
  {
    key: 'haveDown',
    tab: '已办',
  },
  {
    key: 'launch',
    tab: '发起',
  },
];
const onTabChange = (value: string) => {
  if (value === 'todo') {
    fetchTodoData();
  } else if (value === 'launched') {
    fetchLaunchedData();
  } else if (value === 'haveDown') {
    fetchHaveDownData();
  }
  if (value === 'launch') {
    router.push({name: 'Launch'});
    return;
  }
  activeKey.value = value;
};

</script>

<style lang="scss" scoped>
@use '../index.scss';
</style>
