<template>
  <div class="approve-history-box">
    <div
      class="ctrl-btn"
      @click="handleShowApproveHostiry"
      :title="approveHistoryVisibility ? '隐藏审批记录' : '显示审批记录'"
    >
      <MenuUnfoldOutlined v-if="approveHistoryVisibility" />
      <MenuFoldOutlined v-else />
    </div>

    <div
      class="approve-history-list"
      :class="{ close: !approveHistoryVisibility }"
      v-loading="approvalHistoryLoading"
    >
      <BasicTitle helpMessage="">审批记录</BasicTitle>
      <List :loading="approvalHistoryLoading" item-layout="horizontal" :dataSource="historyList">
        <template #renderItem="{ item }">
          <ListItem v-if="item.type !== 'SPJS'">
            <ListItemMeta>
              <template #description>
                <div v-if="item.type !== 'SPJS'" v-html="getFormatCode(item.message || '无')"></div>
              </template>
              <template #title>
                <Row type="flex">
                  <Col flex="1 1 200px">
                    <Space>
                      <span class="font-bold">
                        {{ item.personalName }}
                        <span style="font-weight: normal; color: gray" v-if="item.activityName">
                          （{{ item.activityName }}）
                        </span>
                      </span>
                      <Tag
                        :color="item.type === 'BH' || item.type === 'LCZZ' ? 'error' : 'success'"
                      >
                        <span class="font-bold">{{ item.typeName }}</span>
                      </Tag>
                    </Space>
                  </Col>
                  <Col flex="0 1 200px" class="text-right">
                    <span>{{ item.time }}</span>
                  </Col>
                </Row>
              </template>
              <template #avatar>
                <!-- 判断如果是终止或结束，则显示终止/办结图标 -->
                <div class="text-center">
                  <div v-if="item.type === 'SPJS'">
                    <Avatar style="background-color: #87d068">
                      <template #icon>
                        <CheckOutlined />
                      </template>
                    </Avatar>
                  </div>

                  <EmpInfo v-else :no="item.personalCode" :name="item.personalName">
                    <Avatar v-if="item.personalHeadImg" :src="item.personalHeadImg">
                      {{ item.personalName }}
                    </Avatar>
                    <Avatar v-else style="background-color: #87d068">
                      <template #icon>
                        <UserOutlined />
                      </template>
                    </Avatar>
                  </EmpInfo>
                </div>
              </template>
            </ListItemMeta>
          </ListItem>

          <ListItem v-if="item.type === 'LCZZ' || item.type === 'SPJS'">
            <ListItemMeta>
              <template #avatar>
                <!-- 判断如果是终止或结束，则显示终止/办结图标 -->
                <div class="text-center">
                  <div v-if="item.type === 'SPJS'">
                    <Avatar style="background-color: #87d068">
                      <template #icon>
                        <CheckOutlined />
                      </template>
                    </Avatar>
                  </div>
                  <div v-if="item.type === 'LCZZ'">
                    <Avatar style="background-color: #ff4d4f">
                      <template #icon>
                        <StopOutlined />
                      </template>
                    </Avatar>
                  </div>
                </div>
              </template>
              <template #title>
                <Row type="flex">
                  <Col flex="1 1 200px">
                    <Space>
                      <Tag :color="item.type === 'LCZZ' ? 'error' : 'success'">
                        <span class="font-bold">{{ item.typeName }}</span>
                      </Tag>
                    </Space>
                  </Col>
                </Row>
              </template>
            </ListItemMeta>
          </ListItem>
        </template>
      </List>
      <!--      <Timeline>
              <TimelineItem color="green" v-for="item in historyList" >
                <p>Solve initial network problems 1</p>
                <p>Solve initial network problems 2</p>
                <p>Solve initial network problems 3 2015-09-01</p>
              </TimelineItem>
              <TimelineItem color="#00CCFF">
                <template #dot>
                  <SmileOutlined />
                </template>
                <p>Custom color testing</p>
              </TimelineItem>
            </Timeline>-->
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, unref, watch, defineProps } from 'vue';
  import {
    UserOutlined,
    CheckOutlined,
    StopOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from '@ant-design/icons-vue';
  import { List, Avatar, Tag, Space, Row, Col, Timeline, Tooltip } from 'ant-design-vue';
  import {EmpInfo} from '#/views/components/EmpInfo';
  import { getFormatCode } from '@/utils';
  import { getCommentInfosByProcessInstanceId } from '#/api/flowable/bpmn/modelInfo';
  import { BasicTitle } from '@/components/Basic';

  const TimelineItem = Timeline.Item;

  const approveHistoryVisibility = ref(false);

  const props = defineProps({
    procInstId: {
      type: String,
      default: '',
    },
  });

  const ListItem = List.Item;
  const ListItemMeta = List.Item.Meta;

  const historyList = ref([]);
  const approvalHistoryLoading = ref(false);

  function handleShowApproveHostiry() {
    approveHistoryVisibility.value = !unref(approveHistoryVisibility);
    if (unref(approveHistoryVisibility) && unref(historyList).length <= 0) {
      if (props.procInstId) {
        approvalHistoryLoading.value = true;
        getCommentInfosByProcessInstanceId({ procInstId: props.procInstId })
          .then((res) => {
            historyList.value = res;
          })
          .finally(() => {
            approvalHistoryLoading.value = false;
          });
      }
    }
  }

  watch(
    () => props.procInstId, //监听
    () => {
      // props.procInstId;
      approveHistoryVisibility.value = false;
      historyList.value = [];
    },
  );
</script>
<style lang="scss">
  .approve-history-box {
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    background: var(--component-background-color);
    box-shadow: rgba(0, 0, 0, 0.3) -10px -4px 6px -10px;
    z-index: 999999;

    .ctrl-btn {
      z-index: 9999;
      position: absolute;
      left: -20px;
      top: 0;
      font-size: 20px;
      cursor: pointer;
    }

    &:hover {
      .ctrl-btn {
        display: block;
      }
    }

    .approve-history-list {
      max-width: 300px;
      width: 300px;
      padding-left: 20px;
      overflow-y: auto;
      height: 100%;

      &.close {
        width: 0;
        padding: 0;
        margin: 0;
      }
    }
  }
</style>
