<template>
  <div class="x-card">
    <div class="x-title">
      <div class="font-bold">
        <StarFilled class="mr-2 text-[#2d93f9]" />
        <span>常用业务</span>
      </div>
      <div>
        <Button type="link" @click="handleToMore()" size="small">更多</Button>
      </div>
    </div>
    <div class="x-content flex-1 p-2 flex flex-row flex-wrap justify-between !overflow-y-auto">
      <div v-if="!dataLoading && dataList.length > 0"
           class="w-30 grow"
           v-for="item in dataList" :key="item">
        <TypographyLink @click="handleLaunch(item)" class="block m-2 rounded-2 hover:bg-gray-500/20">
          <div class="min-h-[60px] rounded-md p-2 w-full text-left flex items-center flex-col cursor-pointer">
            <Avatar shape="square" class="leading-[50px] bg-gray-300/0 model-icon w-[50px] h-[50px]" :src="item.modelIcon">
              <template #icon>
                <PictureFilled class="text-[28px] color-gray-500" />
              </template>
            </Avatar>
            <div class="text-md text-center mt-2 line-clamp-1">
              <Tooltip :title="item.name">
                {{ item.name }}
              </Tooltip>
            </div>
          </div>
        </TypographyLink>
      </div>
      <div v-else>
        <Empty description="暂无常用业务"/>
      </div>
    </div>

    <LaunchModal ref="launchModalRef" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue';
  import {Avatar, Tooltip, Empty, Button, Card, Col, Row, TypographyLink} from 'ant-design-vue';
  import { getMyCommonlyList } from '#/api/process/process';
  import {StarFilled, PictureFilled} from "@ant-design/icons-vue";
  import LaunchModal from '#/views/process/actions/LaunchModal.vue';
  import { useAccessStore, useUserStore } from '@vben/stores';
  import { useRouter } from 'vue-router';

  const userStore = useUserStore();

  const router = useRouter();
  const loading = ref(true);

  const launchModalRef = ref();
  const dataList = ref([]);

  onMounted(()=> {
    fetchCommonlyList();
  })

  async function fetchCommonlyList() {
    loading.value = true;
    // dataList.value = userInfo.value?.type === 1 ? await getMyCommonlyListAdmin() :  await getMyCommonlyList();
    try {
      dataList.value = await getMyCommonlyList();
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  function handleLaunch(record) {
    openLaunchModal(true, {
      modelKey: record.modelKey,
      businessKey: record.businessKey || '',
      viewType: 'launch',
    });
    setLaunchModalProps({
      title: '发起审批',
      bodyStyle: {padding: '0px', margin: '0px'},
      defaultFullscreen: true,
      maskClosable: false,
      centered: true,
      showOkBtn: false,
      showCancelBtn: false,
      draggable: false,
      canFullscreen: false,
      closable: false,
      destroyOnClose: true,
    });
  }

  function handleSuccess() {
    router.push({ name: 'Launched' });
  }

  function handleToMore() {
    router.push({ name: 'Launch' });
  }
</script>
<style lang="scss" scoped>
@use '../index.scss';
</style>
