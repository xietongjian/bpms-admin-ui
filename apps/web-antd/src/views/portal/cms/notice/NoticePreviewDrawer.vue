<template>
  <BasicDrawer class="w-1/2">
    <div class="notice-wrapper">
      <h1 class="notice-title">{{ noticeInfo?.title || '无标题' }}</h1>
      <div>
        <Row>
          <Col class="text-left" :span="8"
            >发布人：{{ noticeInfo.deptName || userInfo.realName || '-' }}</Col
          >
          <Col :span="8"
            >发布时间：{{
              noticeInfo.publishTime || formatToDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
            }}</Col
          >
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
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  // import { BasicDrawer, useDrawerInner } from '#/components/Drawer';
  import { getNoticeById } from '#/api/portal/cms/notice';
  import { getNoticeTitleById } from '#/api/portal/cms/noticeTitle';
  import { getNoticeSubjectById } from '#/api/portal/cms/noticeSubject';
  import { formatToDate } from '#/utils/dateUtil';
  // import {getAllCommonFile} from "#/api/portal/cms/commonFile";
  // import { useUserStore } from '#/store/modules/user';
  import { Row, Col } from 'ant-design-vue';
  import {useVbenModal, useVbenDrawer} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  const noticeInfo = ref({});
  const noticeFiles = ref({});
  const noticeTitle = ref({});
  const noticeSubject = ref({});
  // const userStore = useUserStore();
  // const { userInfo } = userStore;
  // console.log(userInfo);


  const [BasicDrawer, drawerApi] = useVbenDrawer({
    onCancel() {
      drawerApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = drawerApi.getData<Record<string, any>>();
        if (values) {
          const params = JSON.stringify(JSON.parse(values.params), null, 2)
          formApi.setValues({...values, params, requestArr: [values.method || '', values.url || '']});
          drawerApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      handleSubmit();
    },
  });


  /*const [registerNoticePreviewDrawer, { setDrawerProps }] = useDrawerInner(async (data) => {
    setDrawerProps({ confirmLoading: false });

    // 临时预览，未保存的时候预览
    if (data.isTemp) {
      noticeInfo.value = data.record;
      if (unref(noticeInfo).titleId) {
        // 获取套头数据
        noticeTitle.value = await getNoticeTitleById(unref(noticeInfo).titleId);
      }
    } else {
      // 根据公文ID进行预览
      // 获取公文数据
      noticeInfo.value = await getNoticeById({ id: data.record.id });
      if (unref(noticeInfo).titleId) {
        // 获取套头数据
        noticeTitle.value = await getNoticeTitleById(unref(noticeInfo).titleId);
      }

      noticeSubject.value = await getNoticeSubjectById(unref(noticeInfo).subjectId);

      // 获取公文文件数据
      // noticeFiles.value = await getAllCommonFile({
      //   dataId: unref(noticeInfo).id, dataType: 'NOTICE'
      // });
    }
  });*/

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
      overflow-wrap: break-word;
      white-space: normal;
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
