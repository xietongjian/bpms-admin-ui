<template>
  <BasicModal class="w-[800px]">
    <div class="h-full">
      <div class="notice-wrapper">
        <h1 class="notice-title">{{ noticeInfo?.title || '无标题' }}</h1>
        <div>
          <Row>
            <Col class="text-left" :span="8">
              发布人：{{ noticeInfo.deptName || userInfo.realName || '-' }}
            </Col>
            <Col :span="8">
              发布时间：{{
                noticeInfo.publishTime || formatToDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
              }}
            </Col>
            <Col class="text-right" :span="8">阅读量：{{ noticeInfo.visitCount || 0 }}</Col>
          </Row>
        </div>
        <div v-if="noticeTitle" class="notice-red-title" v-html="noticeTitle.titleSvg"></div>

        <div>
          {{ noticeInfo.noticeNo }}
        </div>

        <h1 class="notice-title">{{ noticeInfo?.title }}</h1>

        <div class="notice-content" v-html="noticeInfo.content"></div>

        <div class="notice-footer">
          <div class="">{{ noticeInfo.subjectName }}</div>
          <div class="mt-2">{{ formatToDate(noticeInfo.publishTime, 'YYYY年MM月DD日') }}</div>
          <img
            v-if="noticeSubject && noticeSubject.signatureImg"
            class="notice-signatureImg"
            :src="noticeSubject.signatureImg"
          />
        </div>

        <div v-if="noticeFiles && noticeFiles.length > 0" class="notice-files">
          附件：
          <div v-for="item in noticeFiles">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref, defineExpose } from 'vue';
  import { getNoticeById } from '#/api/portal/cms/notice';
  import { getNoticeTitleById } from '#/api/portal/cms/noticeTitle';
  import { getNoticeSubjectById } from '#/api/portal/cms/noticeSubject';
  import { formatToDate } from '#/utils/dateUtil';
  import { Row, Col } from 'ant-design-vue';
  import { useUserStore } from '@vben/stores';
  import {useVbenModal} from '@vben/common-ui';
  const userStore = useUserStore();

  const noticeInfo = ref({});
  const noticeFiles = ref({});
  const noticeTitle = ref({});
  const noticeSubject = ref({});
  const { userInfo } = userStore;
  console.log(userInfo);

  const [BasicModal, modalApi] = useVbenModal({
    showConfirmButton: false,
    cancelText: '关闭',
    onOpenChange: async (isOpen) => {
      if (!isOpen) {
        return null;
      }
      modalApi.setState({loading: true, confirmLoading: true});

      const values = modalApi.getData<Record<string, any>>();
      // 根据公文ID进行预览
      // 获取公文数据
      noticeInfo.value = await getNoticeById({ id: values.id });
      if (unref(noticeInfo).titleId) {
        // 获取套头数据
        noticeTitle.value = await getNoticeTitleById(unref(noticeInfo).titleId);
      }

      noticeSubject.value = await getNoticeSubjectById(unref(noticeInfo).subjectId);
      modalApi.setState({loading: false, confirmLoading: false});
    },
  });

  defineExpose(modalApi);
</script>

<style lang="less" scoped>
  .notice-wrapper {
    width: 720px;
    margin: auto;
    .notice-red-title {
      width: 800px;
      height: 80px;
      margin: auto;
    }
    .notice-title {
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }
    .notice-content {
      margin: auto;
      text-align: justify-all;
    }
    .notice-footer {
      clear: both;
      position: relative;
      float: right;
      text-align: center;
      margin-top: 80px;
      height: 150px;
      .notice-signatureImg {
        position: relative;
        top: -120px;
        width: 200px;
        height: 200px;
      }
    }
    .notice-files {
      clear: both;
    }
  }
</style>
