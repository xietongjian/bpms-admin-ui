<template>
  <div class="md:flex gap-4">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <div
        v-loading="loading"
        class="w-full p-4 !mt-2 !bg-gradient-to-r rounded-md"
        :class="{
          '!from-cyan-400/80 !to-cyan-600/80 ': index === 0,
          '!from-indigo-400/80 !to-indigo-600/80 ': index === 1,
          '!from-purple-400/80 !to-purple-600/80 ': index === 2,
          '!from-rose-400/80 !to-rose-600/80 ': index === 3,
        }"
      >
        <router-link :to="item.path">
          <div class="text-center text-xm font-bold color-white">
            {{ item.title }}
          </div>
          <div class="py-1 px-4 text-center">
            <CountTo prefix="" :startVal="1" :endVal="item.value" class="text-3xl color-white" />
            <!-- <Icon :icon="item.icon" :size="40" />-->
          </div>
        </router-link>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { onUnmounted, onMounted, ref, watch, watchEffect } from 'vue';
  // import { CountTo } from '@/components/CountTo/index';
  import { CountTo } from '@vben/common-ui';


  // import Icon from '@/components/Icon/Icon.vue';
  import { Card } from 'ant-design-vue';
  // import { useRequest } from '@vben/hooks';
  import { useWindowFocus } from '@vueuse/core'


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

  const focused = useWindowFocus()

  watch(focused, (isFocused) => {
    if (isFocused){
      getProcInstTaskCount();
    }
    else {

    }
  })

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

  onUnmounted(() => {
    // close();
  });

  onMounted(() => {
    getProcInstTaskCount();
  });

  async function getProcInstTaskCount() {
    countProcInstTask().then((res) => {
      countData.value = res;
    });
  }

/*  useRequest(getProcInstTaskCount, {
    refreshOnWindowFocus: true,
  });*/

  const growCardList = countData;
</script>
