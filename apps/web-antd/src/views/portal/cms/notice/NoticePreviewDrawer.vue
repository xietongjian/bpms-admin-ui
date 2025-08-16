<template>
  <BasicDrawer class="w-3/5 ">
    <div class="w-full relative">
      <h1 class="w-full text-2xl text-center p-2">{{ noticeInfo?.title || '无标题' }}</h1>
      <div class="w-full grid grid-cols-2 md:grid-cols-3 p-4 items-center gap-4 text-center text-secondary-foreground/50">
        <div>
          发布人：{{ noticeInfo.deptName || userInfo.realName || '-' }}
        </div>
        <div>
          发布时间：{{
            noticeInfo.publishTime || formatToDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
          }}
        </div>
        <div>
          阅读量：{{ noticeInfo.visitCount || 0 }}
        </div>
      </div>

      <div v-if="noticeTitle" class="notice-red-title" v-html="noticeTitle.titleSvg"></div>

      <div class="text-center">
        {{ noticeInfo.noticeNo }}
      </div>

<!--      <h1 class="w-full text-2xl text-center p-4">{{ noticeInfo?.title }}</h1>-->

      <div class="w-full min-h-100 overflow-x-auto p-2 [&_*]:!text-card-foreground"
           v-html="noticeInfo.content">
      </div>

      <div v-if="noticeInfo && noticeInfo?.attachments?.length > 0"
           class="my-4"
      >
        附件：
        <div class="flex flex-wrap gap-3 mt-2">
          <div class="min-w-50" v-for="item in noticeInfo?.attachments">
            <a :href="item.filePath" target="_blank" >{{ item.fileName }}</a>
          </div>
        </div>
      </div>

      <div class="clear-both relative flex justify-end text-center mt-4">
        <div class="text-center">
          <div class="relative top-[110px] text-nowrap text-xl">
            <div class="">{{ noticeInfo.subjectName }}</div>
            <div v-if="noticeInfo.publishTime" class="mt-2">{{ formatToDate(noticeInfo.publishTime, 'YYYY年MM月DD日') }}</div>
          </div>
          <img
              v-if="noticeSubject && noticeSubject.signatureImg"
              class="m-auto -top-30 size-40 object-contain z-9 opacity-80"
              :src="noticeSubject.signatureImg"
          />
        </div>
      </div>

    </div>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, unref, defineExpose } from 'vue';
  import { getNoticeById } from '#/api/portal/cms/notice';
  import { getNoticeTitleById } from '#/api/portal/cms/noticeTitle';
  import { getNoticeSubjectById } from '#/api/portal/cms/noticeSubject';
  import { formatToDate } from '#/utils/dateUtil';
  // import {getAllCommonFile} from "#/api/portal/cms/commonFile";
  // import { useUserStore } from '#/store/modules/user';
  import {useVbenDrawer} from '@vben/common-ui';
  const noticeInfo = ref({});
  const noticeFiles = ref({});
  const noticeTitle = ref({});
  const noticeSubject = ref({});
  const userInfo = ref({});
  // const userStore = useUserStore();
  // const { userInfo } = userStore;

  const [BasicDrawer, drawerApi] = useVbenDrawer({
    showConfirmButton: false,
    closeOnClickModal: true,
    closeOnPressEscape: true,
    destroyOnClose: true,
    cancelText: '关闭',
    onCancel() {
      drawerApi.close();
    },
    async onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = drawerApi.getData<Record<string, any>>();
        if (values) {
          drawerApi.setState({loading: true, confirmLoading: true});

          // const params = JSON.stringify(JSON.parse(values.params), null, 2)
          // formApi.setValues({...values, params, requestArr: [values.method || '', values.url || '']});
          // 临时预览，未保存的时候预览
          if (values.isTemp) {
            noticeInfo.value = values;
            if (unref(noticeInfo).titleId) {
              // 获取套头数据
              noticeTitle.value = await getNoticeTitleById(unref(noticeInfo).titleId);
            }
          } else {
            // 根据公文ID进行预览
            // 获取公文数据
            noticeInfo.value = await getNoticeById({ id: values.id });
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

        }
        drawerApi.setState({loading: false, confirmLoading: false});
      }
    },
    onConfirm() {
      // handleSubmit();
    },
  });
  defineExpose(drawerApi)
</script>
