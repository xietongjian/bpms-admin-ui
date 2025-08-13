<template>
  <Card title="新闻动态" v-bind="$attrs" bodyStyle="padding-top:0;">
    <template #extra>
      <!--      <a-button type="link" @click="toMore" target="_blank" size="small">更多</a-button>-->
    </template>
    <List item-layout="horizontal" :data-source="newsList">
      <template #renderItem="{ item }">
        <ListItem class="custom-list-item">
          <template #actions>
            <span class="">{{ item.date }}</span>
          </template>
          <div class="content">
            <a @click="showNewsDetail(item)" :title="item.title">
              {{ item.title }}
            </a>
          </div>
        </ListItem>
      </template>
    </List>
    <NewsPreviewDrawer ref="newsPreviewDrawerRef"/>
  </Card>
</template>
<script lang="ts" setup>
import {computed, ref} from 'vue';

import {Card, List, Row, Col} from 'ant-design-vue';
// import NewsPreviewDrawer from "#/views/portal/cms/news/NewsPreviewDrawer.vue";

const ListItem = List.Item;
const ListItemMeta = List.Item.Meta;


function toMore() {
  // go("/news/list");
}

const newsList = ref([]);


const showNewsDetail = (record: any) => {
  // 预览前获取数据传入预览方法
  /*openNewsPreviewDrawer(true, {
    isTemp: false,
    record,
  });
  setNewsPreviewDrawerProps({
    title: `预览 - ${record.title}`,
    bodyStyle: {padding: '0px', margin: '0px'},
    width: 1000,
    showOkBtn: false,
    showCancelBtn: true,
    cancelText: '关闭',
  });*/
}

</script>
<style lang="scss">
@use '../index.scss';
</style>
