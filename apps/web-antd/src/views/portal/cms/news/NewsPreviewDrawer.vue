<template>
  <BasicDrawer class="w-3/5">
    <div class="w-full flex flex-col">
      <h1 class="w-full text-2xl text-center p-4">{{ newsInfo?.title }}</h1>
      <div class="w-full grid grid-cols-2 md:grid-cols-4 px-4 items-center gap-4 text-center text-secondary-foreground/50">
        <div>发布部门：{{ newsInfo?.deptName || '-' }} </div>
        <div>发布单位：{{ newsInfo?.companyName || '-' }}</div>
        <div>
          发布时间：{{
            newsInfo && newsInfo.publishTime ? formatToDate(newsInfo?.publishTime) : '-'
          }}
        </div>
        <div>评论数：{{ newsInfo?.commentCount || 0 }}</div>
      </div>

      <div class="my-4 border-t-2 border-primary/50" ></div>

      <div class="w-full min-h-100 overflow-x-auto p-2 [&_*]:!text-card-foreground break-all [&_*]:!wrap-break-word"
           v-html="newsInfo?.content"></div>

      <!--
      <div class="notice-files">
        评论：
        <div v-for="item in articleComments">
          {{item.commenter}}：{{item.comment}}
        </div>
      </div>
      -->
    </div>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, defineExpose } from 'vue';
  import { formatToDate } from '#/utils/dateUtil';
  import { getNewsById } from '#/api/portal/cms/news';
  import {useVbenDrawer} from '@vben/common-ui';

  const newsInfo = ref({});
  const [BasicDrawer, drawerApi] = useVbenDrawer({
    showConfirmButton: false,
    destroyOnClose: true,
    cancelText: '关闭',
    onCancel() {
      drawerApi.close();
    },
    async onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = drawerApi.getData<Record<string, any>>();
        if (values) {
          // 临时预览，未保存的时候预览
          if (values.isTemp) {
            newsInfo.value = values;
          } else {
            // 根据新闻ID进行预览
            // 获取新闻数据
            const res = await getNewsById({ id: values.id });
            newsInfo.value = res;
            // articleComments.value = await getAllArticleComment({dataId: data.record.id, dataType: 'NEWS'});
          }
          drawerApi.setState({loading: false, confirmLoading: false});
        }
      }
    }
  });

  defineExpose(drawerApi);
</script>
