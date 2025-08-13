<template>
  <div class="x-card">
    <div class="x-title">
      <div class="font-bold">
        <NotificationOutlined class="mr-2 text-[#2d93f9]" />
        <span>公示公告</span>
      </div>
      <div>
<!--        <Button type="link" size="small" @click="handleToMore()">更多</Button>-->
      </div>
    </div>
    <div class="flex-1 p-2 flex flex-col justify-between items-stretch overflow-y-auto">
      <List item-layout="horizontal" :data-source="dataList">
        <template #renderItem="{ item }">
          <ListItem class="custom-list-item">
            <template #actions>
              <span class="">{{ formatToDateTime(item.publishTime || new Date(), 'YYYY-MM-DD HH:mm') }}</span>
            </template>
            <div class="content">
              <TypographyLink class="overflow-hidden" @click="handleShowDetail(item)" :title="item.title">
                <span v-if="item.categoryName" :style="{ color: item.style || 'initial' }">
                  [{{ item.categoryName }}]
                </span>
                &nbsp;
                <span v-if="item.noticeNo">
                  {{ item.noticeNo }}
                  -
                </span>
                <span class="">
                  {{ item.title }}
                </span>
              </TypographyLink>
            </div>
          </ListItem>
        </template>
      </List>
    </div>
    <NoticePreviewModal ref="noticePreviewModalRef" />
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { List, TypographyLink } from 'ant-design-vue';
  import { formatToDateTime } from '#/utils/dateUtil';
  import { getNoticeListByPage } from '#/api/portal/cms/notice';
  import NoticePreviewModal from "./NoticePreviewModal.vue";
  import {NotificationOutlined} from "@ant-design/icons-vue";

  const ListItem = List.Item;
  // const go = useGo();

  const dataList = ref([]);

  onMounted(() => {
    fetchData();
  });

  async function fetchData() {
    const res = await getNoticeListByPage({entity: {}, query: { pageSize: 5, pageNum: 1 }});
    dataList.value = res.rows;
  }

  function handleShowDetail(item) {
    openNoticePreviewModal(true, {
      isTemp: true,
      record: {id: item.id},
    });

    setNoticePreviewModalProps({
      title: `预览 - ${item.title || '无标题'}`,
      bodyStyle: { padding: '0px', margin: '0px' },
      width: 1000,
      showOkBtn: false,
      showCancelBtn: true,
      centered: true,
      cancelText: '关闭',
    });
  }

  function toMore() {

  }
</script>
<style lang="scss">
@use '../index.scss';
.custom-list-item {
  padding-left: 0 !important;
  padding-right: 0 !important;

  .content {
    overflow: hidden;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ant-list-item-action {
    margin-left: 4px;
    margin-inline-start: 0!important;
  }

  .ant-list-item-meta-title {
    a {
      overflow: hidden; /*溢出的部分隐藏*/
      white-space: nowrap; /*文本不换行*/
      text-overflow: ellipsis;
      width: 100%;
    }
  }
}
</style>
