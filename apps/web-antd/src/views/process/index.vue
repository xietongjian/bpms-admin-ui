<template>
  <PageWrapper class="!m-4 process-list-container">
    <template #title>
      <PartitionOutlined />&nbsp;&nbsp;流程中心
    </template>
    <template #extra>
      <div v-if="currentTabKey !== 'launch'">
        <Button type="primary" @click="toLaunch"> 发起流程 </Button>
      </div>
    </template>
    <Tabs class="process-list-tabs" :tabBarGutter="40" :activeKey="currentTabKey" @change="handleChangeProcessTabs">
      <TabPane key="todo"  >
        <template #tab>
          <Badge :count="11" :offset="[15, -2]" size="default">
            <span >待办</span>
          </Badge>
        </template>
        <Todo ref="todoRef" />
      </TabPane>

      <TabPane key="have-down" tab="已办" >
        <HaveDown ref="haveDownRef" />
      </TabPane>

      <TabPane key="launched" tab="已发" >
        <Launched ref="launchedRef" />
      </TabPane>

      <TabPane key="launch" tab="发起" >
        <Launch />
      </TabPane>
    </Tabs>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref, unref, computed, nextTick } from 'vue';
  // import { PageWrapper } from '@/components/Page';
  import { Tabs, Badge } from 'ant-design-vue';

  // import { useProcessStore } from '@/store/modules/process';
  import { PartitionOutlined } from '@ant-design/icons-vue';

  import { useRouter } from 'vue-router';
  import Todo from './todo/index.vue';
  import Launched from './launched/index.vue';
  import HaveDown from '#/views/process/haveDown/index.vue';
  import Launch from './launch/index.vue';

  const TabPane = Tabs.TabPane;

  // const processStore = useProcessStore();

  // const todoTaskCount = computed(() => processStore.getTodoTaskCount);
  const currentTabKey = ref("todo");
  const { currentRoute } = useRouter();
  const todoRef = ref();
  const haveDownRef = ref();
  const launchedRef = ref();

  const { params:{ currentKey } } = unref(currentRoute);
  currentTabKey.value = currentKey;

  function handleChangeProcessTabs(e){
    currentTabKey.value = e;
    nextTick(()=>{
      switch (e){
        case 'todo':
          unref(todoRef).reloadData();
          break;
        case 'have-down':
          unref(haveDownRef).reloadData();
          break;
        case 'launched':
          unref(launchedRef).reloadData();
          break;
        case 'launch':
          // processStore.reloadTodoTaskCount();
          break;
      }

      history.replaceState('', '', '#/process/' + e)
    });
  }

  function toLaunch() {
    currentTabKey.value = "launch";
    history.replaceState('', '', '#/process/launch')
  }
</script>
<style lang="scss">
/*.process-list-container{
  .vben-page-wrapper-content{
    margin: 0;
  }
  .process-list-tabs{
    .ant-tabs-nav{
      margin-bottom: 8px;
    }
  }
  >.ant-page-header{
    padding-bottom: 6px;
    padding-top: 6px;
  }
  .vben-basic-table-form-container{
    padding: 0!important;
  }
  .ant-tabs-nav{
    padding-left: 20px;
    background: white;
  }
}
.process{
  .vben-basic-table-form-container{
    .ant-form{
      margin-bottom:0;
    }
  }
}*/
</style>

