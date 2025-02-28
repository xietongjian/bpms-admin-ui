<template>
  <Card :loading="true" size="small" v-bind="$attrs" >
    <template #title>
      <StarFilled class="mr-1 color-[#2d93f9]" />
      常用业务
    </template>
    <template #extra>
      <a-button type="link" @click="handleToMore()" size="small">更多</a-button>
    </template>
    <div class="min-h-[200px]">
      <Row :gutter="[10, 10]">
        <Col v-if="dataList.length > 0" :span="6" v-for="item in dataList" :key="item">
          <TypographyLink @click="handleLaunch(item)">
            <div class="min-h-[60px] rounded-md p-2 w-full text-left flex items-center flex-col cursor-pointer">
              <Avatar shape="square" class="leading-[50px] bg-gray-300/30 model-icon w-[50px] h-[50px]" :src="item.modelIcon">
                <template #icon>
                  <PictureFilled class="text-[28px] color-gray-300" />
                </template>
              </Avatar>
              <div class="text-md text-center mt-2 line-clamp-1">
                <Tooltip :title="item.name">
                  {{ item.name }}
                </Tooltip>
              </div>
            </div>
          </TypographyLink>
        </Col>
        <Col v-else :span="24">
          <Empty description="暂无常用业务"/>
        </Col>
      </Row>
    </div>

    <LaunchModal ref="launchModalRef" @register="registerLaunchModal" @success="handleSuccess" />
  </Card>
</template>
<script lang="ts" setup>
  import {computed, ref} from 'vue';
  import {Avatar, Tooltip, Empty, Card, Col, Row, TypographyLink} from 'ant-design-vue';
  import { getMyCommonlyList } from '#/api/process/process';
  import {StarFilled, PictureFilled} from "@ant-design/icons-vue";
  import LaunchModal from '#/views/process/actions/LaunchModal.vue';
  import { useAccessStore, useUserStore } from '@vben/stores';
  import { useRouter } from 'vue-router';

  const userStore = useUserStore();
  const userInfo = computed(() => userStore.getUserInfo);
  // const go = useGo();
  const router = useRouter();

  const launchModalRef = ref();
  const dataList = ref([]);

  fetchCommonlyList();
  // const [registerLaunchModal, {openModal: openLaunchModal, setModalProps: setLaunchModalProps}] = useModal();

  async function fetchCommonlyList() {
    // dataList.value = userInfo.value?.type === 1 ? await getMyCommonlyListAdmin() :  await getMyCommonlyList();
    dataList.value = await getMyCommonlyList();
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
    // go({name: 'Launched'});
    router.push({ name: 'Launched' });

  }

  function handleToMore() {
    // go({ name: 'Launch' });
    router.push({ name: 'Launch' });
  }
</script>
