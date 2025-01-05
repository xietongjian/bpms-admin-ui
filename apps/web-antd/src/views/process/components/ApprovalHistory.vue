<template>
  <CollapseContainer :canExpand="true">
    <template #title>
      <div class="font-bold">审批记录</div>
    </template>
    <div>
      <List
        :loading="approvalHistoryLoading"
        item-layout="horizontal"
        :dataSource="historyList"
      >
        <template #renderItem="{ item }">
          <ListItem v-if="item.type !=='SPJS'">
            <ListItemMeta>
              <template #description>
                <div v-if="item.type!=='SPJS'" v-html="getFormatCode(item.message||'无')"></div>
              </template>
              <template #title>
                <Row type="flex">
                  <Col flex="1 1 200px">
                    <Space>
                      <span class="font-bold">
                        {{ item.personalName }}
                        <span style="font-weight:normal; color: gray;" v-if="item.activityName">
                          （{{ item.activityName }}）
                        </span>
                      </span>
                      <Tag :color="item.type==='BH'||item.type==='LCZZ'?'error':'success'">
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
                  <div v-if="item.type==='SPJS'">
                    <Avatar style="background-color: #87d068">
                      <template #icon>
                        <CheckOutlined/>
                      </template>
                    </Avatar>
                  </div>

                  <EmpInfo v-else :no="item.personalCode" :name="item.personalName">
                    <Avatar v-if="item.personalHeadImg" :src="item.personalHeadImg">
                      {{ item.personalName }}
                    </Avatar>
                    <Avatar v-else style="background-color: #87d068">
                      <template #icon>
                        <UserOutlined/>
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
                  <div v-if="item.type==='SPJS'">
                    <Avatar style="background-color: #87d068">
                      <template #icon>
                        <CheckOutlined/>
                      </template>
                    </Avatar>
                  </div>
                  <div v-if="item.type==='LCZZ'">
                    <Avatar style="background-color: #ff4d4f">
                      <template #icon>
                        <StopOutlined/>
                      </template>
                    </Avatar>
                  </div>
                </div>
              </template>
              <template #title>
                <Row type="flex">
                  <Col flex="1 1 200px">
                    <Space>
                      <Tag :color="item.type==='LCZZ'?'error':'success'">
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
    </div>
  </CollapseContainer>
</template>
<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {CheckOutlined, StopOutlined, UserOutlined} from '@ant-design/icons-vue';
import {Avatar, Col, List, Row, Space, Tag} from 'ant-design-vue';
import {CollapseContainer} from '@/components/Container/index';
import {EmpInfo} from '#/views/components/EmpInfo';

import {getCommentInfosByProcessInstanceId} from "@/api/process/process";
import {getFormatCode} from "@/utils";

const props = defineProps({
  procInstId: {
    default: '',
    type: String,
  }
});
const ListItem = List.Item;
const ListItemMeta = List.Item.Meta;


const historyList = ref([]);
const approvalHistoryLoading = ref(false);


function fetch() {
  approvalHistoryLoading.value = true;
  if(!props.procInstId){
    approvalHistoryLoading.value = false;
    return;
  }
  getCommentInfosByProcessInstanceId({procInstId: props.procInstId}).then(res => {
    if (!res) {
      console.warn('未找到流程审批信息');
      return;
    }
    const result = [];
    for (let i = 0; i < res.length; i++) {
      let item = res[i];
      result.push(item);
      if (item.type === 'LCZZ') {
        break;
      }
      if (item.type === 'SPJS') {
        break;
      }
    }
    historyList.value = result;
  }).finally(() => {
    approvalHistoryLoading.value = false;
  })
}

onMounted(() => {
  fetch();
})
</script>
