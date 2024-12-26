<template>
  <CollapseContainer v-if="approverList.length>0" :canExpand="true">
    <template #title>
      <div class="font-bold">当前待办人</div>
    </template>
    <div class="overflow-x-auto">
<!--      <AvatarGroup
        :max-count="2"
        size="large"
        :max-style="{
          color: '#f56a00',
          backgroundColor: '#fde3cf',
        }"
      >
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
        <Avatar style="background-color: #1890ff">K</Avatar>
        <Tooltip title="Ant User" placement="top">
          <Avatar style="background-color: #87d068">
            <template #icon><UserOutlined /></template>
          </Avatar>
        </Tooltip>
        <Avatar style="background-color: #1890ff">
          <template #icon><AntDesignOutlined /></template>
        </Avatar>
      </AvatarGroup>-->

      <Space>
        <div v-for="item in approverList" class="text-center w-[200px]">
          <Badge class="w-full">
            <template #count>
              <Tooltip :title="item.readStatus == 1 ? '已读' : '未读'">
                <div class="absolute !top-2">
                  <CheckCircleOutlined v-if="item.readStatus == 1" style="color: green"/>
                  <QuestionCircleOutlined v-else style="color: gray"/>
                </div>
              </Tooltip>
            </template>
            <div
              class="flex flex-row w-full items-center bg-blue-200/20 hover:bg-blue-200/50 rounded-md p-2">
              <div class="w-12 text-center">
                <EmpInfo :no="item.code" :name="item.name">
                  <Avatar v-if="item.headImg" :src="item.headImg">
                    {{ item.name }}
                  </Avatar>
                  <Avatar v-else style="background-color: #87d068">
                    <template #icon>
                      <UserOutlined/>
                    </template>
                  </Avatar>
                </EmpInfo>
                <br/>
                <span class="text-[12px] line-clamp-1">{{ item.name }}</span>
              </div>
              <div class="flex-1 text-start text-[12px]">
<!--
                接收时间: <span class="color-red-500">{{ item.createTime }}</span>
                <br/>
                -->
                停留: <span class="color-red-500">{{ item.stayTime }}</span>
              </div>
            </div>
          </Badge>
        </div>
      </Space>
    </div>
  </CollapseContainer>
</template>
<script lang="ts" setup>
  import {defineProps} from 'vue';
  import {UserOutlined, CheckCircleOutlined, QuestionCircleOutlined} from '@ant-design/icons-vue';
  import {AvatarGroup, Tooltip, Avatar, Space, Badge} from 'ant-design-vue';
  import {CollapseContainer} from '@/components/Container/index';
  import {EmpInfo} from '@/components/EmpInfo';

  const props = defineProps({
    approverList: {
      type: Array,
      default: []
    }
  });
</script>
