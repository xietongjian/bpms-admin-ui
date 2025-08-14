<template>
  <BasicDrawer class="w-1/2">
    <div class="notice-wrapper">
      <h1 class="notice-title">{{ newsInfo?.title }}</h1>

      <div style="text-align: center">
        <Row>
          <Col span="6"> 发布部门：{{ newsInfo?.deptName || '-' }} </Col>
          <Col span="6"> 发布单位：{{ newsInfo?.companyName || '-' }} </Col>
          <Col span="6">
            发布时间：{{
              newsInfo && newsInfo.publishTime ? formatToDate(newsInfo?.publishTime) : '-'
            }}
          </Col>
          <Col span="6"> 评论数：{{ newsInfo?.commentCount || 0 }} </Col>
        </Row>
      </div>
      <Divider style="height: 1px; background-color: #7cb305" />

      <div class="notice-content" v-html="newsInfo?.content"></div>

      <!--      <div class="notice-files">
        评论：
        <div v-for="item in articleComments">
          {{item.commenter}}：{{item.comment}}
        </div>
      </div>-->
    </div>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineExpose } from 'vue';
  import { formatToDate } from '#/utils/dateUtil';
  import { getNewsById } from '#/api/portal/cms/news';
  // import {getAllArticleComment} from "#/api/portal/cms/articleComment";
  import { Row, Col, Space, Divider } from 'ant-design-vue';
  import {useVbenDrawer} from '@vben/common-ui';

  const newsInfo = ref({});
  const articleComments = ref({});
  const noticeTitle = ref({});
  const [BasicDrawer, drawerApi] = useVbenDrawer({
    onCancel() {
      drawerApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = drawerApi.getData<Record<string, any>>();
        if (values) {
          // const params = JSON.stringify(JSON.parse(values.params), null, 2)
          // formApi.setValues({...values, params, requestArr: [values.method || '', values.url || '']});
          drawerApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      // handleSubmit();
    },
  });
  /*const [registerNoticePreviewDrawer, { setDrawerProps }] = useDrawerInner(async (data) => {
    setDrawerProps({ confirmLoading: false });

    // 临时预览，未保存的时候预览
    if (data.isTemp) {
      newsInfo.value = data.record;
    } else {
      // 根据新闻ID进行预览
      // 获取新闻数据
      newsInfo.value = await getNewsById({ id: data.record.id });
      // articleComments.value = await getAllArticleComment({dataId: data.record.id, dataType: 'NEWS'});
    }
  });*/

  /*export default defineComponent({
    name: 'NewsPreviewDrawer',
    components: { BasicDrawer, Row, Col, Divider },
    emits: ['success', 'register'],
    setup(_, { emit }) {


      return {
        registerNoticePreviewDrawer,
        newsInfo,
        noticeTitle,
        articleComments,
        formatToDate,
      };
    },
  });*/
  defineExpose(drawerApi);
</script>
<!--<style lang="less">
  .table-cell-class{
    border: 1px solid gray;
  }
</style>-->

<style lang="scss" scoped>
  .notice-wrapper {
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
