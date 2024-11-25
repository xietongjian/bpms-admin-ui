<template>
  <div v-if="growCardList" class="grid grid-cols-2 gap-4">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <Card
        size="small"
        :loading="loading"
        class="w-full"
      >
        <router-link :to="item.path">
          <div class="py-4 px-4 flex justify-between items-center">
            <div class="text-2xl">
              <VbenCountToAnimator :duration="3000" :end-val="item.value" :start-val="1" />
              <div class="text-xs text-gray-500">{{item.title}}</div>
            </div>
            <IconifyIcon :icon="item.icon || 'ant-design:ellipsis-outlined'" class="size-5" height="20" width="20"/>
          </div>
        </router-link>
      </Card>
    </template>
  </div>
  <div v-else class="w-full text-center bg-card">
    <Empty />
  </div>
</template>
<script lang="ts" setup>
  import { onUnmounted, ref, watchEffect, onMounted } from 'vue';
  import { VbenCountToAnimator } from '@vben/common-ui';
  import { IconifyIcon } from '@vben/icons';

  import { Card, Empty } from 'ant-design-vue';
  // import { useRequest } from '@vben/hooks';
  import { countProcInstTask } from '#/api/report/flowCount';

  const loading = ref(false);
  // const state = reactive({
  //   server: 'ws://'+location.host+'/webSocket/admin',
  //   sendValue: '',
  //   // recordList: [] as { id: number; time: number; res: string }[],
  // });
  const countData = ref();
  // const { status, data, send, close, open } = useWebSocket(state.server, {
  //   autoReconnect: true,
  //   heartbeat: true
  // });

  watchEffect(() => {
    /*if (data.value) {
    try {
      // const res = genCountData(JSON.parse(data.value));
      // countData.value = res;
    } catch (error) {
      console.error("接收数据格式错误")
    }
  }*/
  });

  function genCountData(res) {
    const countData: any = [];
    for (let itm in res) {
      switch (itm) {
        case 'countRunProcInst':
          countData.push({
            path: '/flowoperation/processInst',
            title: '运行的流程实例',
            icon: 'ant-design:bars-outlined',
            value: res[itm],
            color: 'green',
          });
          break;
        case 'countHisProcInst':
          countData.push({
            path: '/flowoperation/processInst',
            title: '历史流程实例',
            icon: 'total-sales|svg',
            value: res[itm],
            color: 'green',
          });
          break;
        case 'countAppingTask':
          countData.push({
            path: '/flowoperation/processTask',
            title: '当前任务总数',
            icon: 'download-count|svg',
            value: res[itm],
            color: 'green',
          });
          break;
        case 'countApplyedTask':
          countData.push({
            path: '/flowoperation/processTask',
            title: '历史任务数',
            icon: 'transaction|svg',
            value: res[itm],
            color: 'green',
          });
          break;
      }
    }
    return countData;
  }

  async function getProcInstTaskCount() {
    countProcInstTask().then((res) => {
      countData.value = res;
    });
  }

  onMounted(() => {
    getProcInstTaskCount();
  });

  /*useRequest(getProcInstTaskCount, {
    pollingInterval: 10000,
    pollingWhenHidden: false,
  });*/

  const growCardList = countData;
</script>
