<template>
  <Card size="small" v-bind="$attrs">
    <template #title>
      <SwapOutlined class="mr-1 color-[#2d93f9]" />业务入口<span class="font-size-[14px] text-gray-400">(跨平台统一入口)</span>
    </template>
    <template #extra>
      <Button type="link" @click="handleMore" size="small">更多</Button>
    </template>

    <Spin :spinning="mySystemListLoading">
      <div class="min-h-[200px]">
        <Row :gutter="[10, 10]">
          <Col v-if="mySystemList.length > 0" span="12" v-for="item in mySystemList" :key="item" >
            <div
              class="handle min-h-[80px] rounded-md p-1 bg-blue-200/30 hover:bg-blue-200/60 w-full text-left flex items-center flex-row cursor-pointer position-relative"
            >
              <a :href="item.url" target="_blank">
                <Avatar :alt="item.name" v-if="item.imgUrl" :size="40" :src="item.imgUrl" />
                <Avatar v-else :alt="item.name" :size="40">
                  <template #icon>
                    <PictureOutlined />
                  </template>
                </Avatar>
              </a>
              <a :href="item.url" target="_blank" class="flex-1 color-[#2d93f9]">
                <div class="font-size-[14px] font-weight-[900] line-height-[20px] flex-1 text-lg">
                  <Tooltip placement="top" :title="item.name">
                    <div class="line-clamp-1 font-bold color-gray-900/80">{{ item.name }}</div>
                  </Tooltip>
                  <div class="font-size-[12px] line-height-[20px] color-gray-700">{{ item.description }}</div>
                </div>
              </a>
            </div>
          </Col>
          <Col v-else span="24">
            <Empty description="点击更多添加业务入口" />
          </Col>
        </Row>
      </div>
    </Spin>
    <MySystemSettingModal ref="mySystemSettingModalRef" @closeFunc="reloadMySystem"/>
  </Card>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import {Card, Spin, Row, Empty, Button, Col, Avatar, Tooltip} from 'ant-design-vue';
  import MySystemSettingModal from './MySystemSettingModal.vue';
  import {getMySystemList} from "#/api/base/systemInfo";
  import {SwapOutlined, PictureOutlined} from "@ant-design/icons-vue";

  const mySystemList = ref([]);
  const mySystemListLoading = ref(true);
  const mySystemSettingModalRef = ref();

  function handleMore() {
    mySystemSettingModalRef.value.open();
    mySystemSettingModalRef.value.setState({
      title: `设置业务入口`,
    });
  }

  loadMySystem();

  async function loadMySystem() {
    mySystemListLoading.value = true;
    try {
      mySystemList.value = await getMySystemList();
    } finally {
      mySystemListLoading.value = false;
    }
  }
  function reloadMySystem() {
    loadMySystem();
    return Promise.resolve(true);
  }
</script>
