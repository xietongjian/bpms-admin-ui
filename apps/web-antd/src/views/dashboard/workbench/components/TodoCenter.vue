<template>
  <Card class="[&_.ant-list-item]:bg-secondary [&_.ant-list-item]:p-1" size="small"
        v-bind="$attrs"
        :tab-list="tabList"
        :active-tab-key="activeKey"
        @tabChange="key => onTabChange(key)"
  >
    <template #title>
      <AuditOutlined class="mr-1 color-[#2d93f9]"/>
      办件中心
    </template>
    <template #customTab="item">
      <span v-if="item.key === 'todo'">
        <Badge :count="todoPageData.total" :offset="[3, -3]" :number-style="{fontSize: '10px'}" size="small"
               :showZero="false">
          {{ item.tab }}
        </Badge>
      </span>
      <span v-if="item.key === 'launched'">
        {{ item.tab }}
      </span>
      <span v-if="item.key === 'haveDown'">
        {{ item.tab }}
      </span>
    </template>
    <template #extra>
      <Button type="link" size="small" @click="handleToMore()">更多</Button>
    </template>
    <p v-if="activeKey === 'todo'">
      <List :loading="todoLoading"
            item-layout="horizontal"
            :pagination="todoPagination"
            :data-source="todoPageData.rows">
        <template #renderItem="{ item }">
          <ListItem>
            <ListItemMeta>
              <template #description>
                <Space>
                  <span>
                    <EmpInfo :no="item.startPersonCode" :name="item.startPersonName"/>
                    发起
                  </span>
                  <span>{{ item.createTime }}</span>
                </Space>
              </template>
              <template #title>
                <TypographyLink @click="handleViewForm(item)">
                  {{ item.formName }}
                </TypographyLink>
              </template>
              <template #avatar>
                <Badge color="blue"/>
              </template>
            </ListItemMeta>
          </ListItem>
        </template>
      </List>
    </p>
    <p v-else-if="activeKey === 'haveDown'">
      <List :loading="haveDownLoading"
            item-layout="horizontal"
            :pagination="haveDownPagination"
            :data-source="haveDownPageData.rows">
        <template #renderItem="{ item }">
          <ListItem>
            <ListItemMeta>
              <template #description>
                <Space>
                  <span>
                    <EmpInfo :no="item.startPersonCode" :name="item.startPersonName"/>
                    发起
                  </span>
                  <span>{{ item.createTime }}</span>
                </Space>
              </template>
              <template #title>
                <TypographyLink @click="handleViewForm(item)">
                  {{ item.formName }}
                </TypographyLink>
              </template>
              <template #avatar>
                <Badge color="blue"/>
              </template>
            </ListItemMeta>
          </ListItem>
        </template>
      </List>
    </p>
    <p v-else-if="activeKey === 'launched'">
      <List :loading="launchedLoading"
            item-layout="horizontal"
            :pagination="launchedPagination"
            :data-source="launchedPageData.rows">
        <template #renderItem="{ item }">
          <ListItem>
            <ListItemMeta>
              <template #description>
                <span>
                  待办人：
                  <template v-for="itm in item.currentAssignees">
                    <EmpInfo v-if="itm.type === 'user'" :no="itm.code" :name="itm.name"/>
                    <Popover v-else :title="'角色信息'">
                      <template #content>
                        <div>名称：{{ itm.name }}</div>
                        <div>标识：{{ itm.code }}</div>
                      </template>
                      {{ itm.name }}
                    </Popover>
                  </template>

                </span>
                <div>发起时间：{{ item.startTime }}</div>
              </template>
              <template #title>
                <TypographyLink @click="handleViewForm(item)">
                  {{ item.formName }}
                </TypographyLink>
              </template>
              <template #avatar>
                <Badge color="blue"/>
              </template>
            </ListItemMeta>
          </ListItem>
        </template>
      </List>
    </p>
    <ProcessFormPreviewDrawer ref="processFormPreviewDrawerRef" @onClose="handleProcessFormVisibleChange"/>
    <!--    <ProcessFormModal
            @register="registerProcessFormModal"
            @visible-change="handleProcessFormVisibleChange"
        />-->
  </Card>
</template>
<script lang="ts" setup>
import {ref, onMounted, shallowRef} from 'vue';
import {Card, List, Button, Space, Badge, TypographyLink, Popover} from 'ant-design-vue';
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
    go({name: 'Launch'});
    return;
  }
  activeKey.value = value;
};

</script>
<style lang="scss" scoped>
.todo-center-card {
  .ant-list-items {
    .ant-list-item {
      padding: 10px;
      margin-bottom: 10px;
      //background: #f9f9f9;
      border-block-end: none;
    }
  }
}
</style>
