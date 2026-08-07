<script lang="ts" setup>
import { ref } from 'vue';
import { Row, Col, Divider, Spin } from 'ant-design-vue';
import { useVbenModal } from '@vben/common-ui';
import { getNewsDetailById } from '#/api/portal/cms/news';
import { formatToDate } from '#/utils/dateUtil';

const newsInfo = ref<any>(null);
const loading = ref(false);

const [BasicModal, modalApi] = useVbenModal({
  showCancelButton: true,
  showConfirmButton: false,
  cancelText: '关闭',
  centered: true,
  width: 1000,
  onOpenChange: async (isOpen) => {
    if (isOpen) {
      const data = modalApi.getData<any>();
      modalApi.setState({ loading: true, confirmLoading: true });
      loading.value = true;
      newsInfo.value = null;
      try {
        if (data?.isTemp) {
          newsInfo.value = data.record;
        } else {
          newsInfo.value = await getNewsDetailById({ id: data?.record?.id });
        }
        if (newsInfo.value?.title) {
          modalApi.setState({ title: `预览 - ${newsInfo.value.title}` });
        }
      } catch (e) {
        console.error(e);
      } finally {
        loading.value = false;
        modalApi.setState({ loading: false, confirmLoading: false });
      }
    } else {
      newsInfo.value = null;
    }
  },
});

defineExpose(modalApi);
</script>

<template>
  <BasicModal v-bind="$attrs">
    <div class="news-all-wrapper">
      <Spin :spinning="loading">
        <div v-if="newsInfo" class="news-wrapper overflow-y-auto">
          <h1 class="news-title">{{ newsInfo.title }}</h1>
          <div style="text-align: center">
            <Row>
              <Col :span="6"> 发布人：{{ newsInfo.personalName || '-' }} </Col>
              <Col :span="6"> 发布单位：{{ newsInfo.companyName || '-' }} </Col>
              <Col :span="6">
                发布时间：{{ newsInfo.publishTime || '-' }}
              </Col>
              <Col :span="6"> 点击数：{{ newsInfo.visitCount || '0' }} </Col>
            </Row>
          </div>
          <Divider style="height: 1px; background-color: #7cb305" />
          <div
            class="notice-content-wrapper mt-10"
            v-html="newsInfo.content"
          />
        </div>
        <div v-else class="text-center text-2xl opacity-50">
          没有权限或新闻已删除！
        </div>
      </Spin>
    </div>
  </BasicModal>
</template>

<style lang="less" scoped>
.news-all-wrapper {
  max-height: calc(100vh - 180px);
  min-height: 400px;
  .notice-content-wrapper {
    margin: 20px 40px;
  }
  .news-wrapper {
    margin: auto;
    .news-title {
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }
    .news-content {
      margin: auto;
      padding: 0 30px;
      overflow-wrap: break-word;
      white-space: normal;
    }
  }
}
</style>
