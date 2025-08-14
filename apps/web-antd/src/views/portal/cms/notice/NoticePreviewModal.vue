<template>
  <BasicModal class="w-1/2">
    <div class="notice-wrapper">
      <div v-if="noticeTitle" class="notice-red-title" v-html="noticeTitle.titleSvg"></div>

      <h1 class="notice-title">{{ noticeInfo?.title }}</h1>

      <div>
        发布部门：{{ noticeInfo.deptName }} 发布单位：{{ noticeInfo.companyName }} 签发人：{{
          noticeInfo.signerName
        }}
      </div>

      <div class="notice-content" v-html="noticeInfo.content"></div>

      <div class="notice-footer">
        <div class="">{{ noticeInfo.subjectName }}</div>
        <div class="mt-2">{{ formatToDate(noticeInfo.publishTime, 'YYYY年MM月DD日') }}</div>
        <img class="notice-signatureImg" :src="noticeSubject.signatureImg" />
      </div>

      <div class="notice-files">
        附件：
        <div v-for="item in noticeFiles">
          {{ item.name }}
        </div>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineExpose } from 'vue';
  // import { BasicModal, useModalInner } from '#/components/Modal';
  import { getNoticeById } from '#/api/portal/cms/notice';
  import { getNoticeTitleById } from '#/api/portal/cms/noticeTitle';
  import { getNoticeSubjectById } from '#/api/portal/cms/noticeSubject';
  import { formatToDate } from '#/utils/dateUtil';
  // import {getAllCommonFile} from "#/api/portal/cms/commonFile";
  import {useVbenDrawer, useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';

  import {formSchema} from "#/views/portal/cms/banner/banner.data";
  const noticeInfo = ref({});
  const noticeFiles = ref({});
  const noticeTitle = ref({});
  const noticeSubject = ref({});


  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          // formApi.setValues(values);
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      // await formApi.submitForm();
      // handleSubmit();
    },
  });

  /*const [registerNoticePreviewModal, { setModalProps }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });

    // 临时预览，未保存的时候预览
    if (data.isTemp) {
      noticeInfo.value = data.record;
    } else {
      // 根据公文ID进行预览
      // 获取公文数据
      noticeInfo.value = await getNoticeById({ id: data.record.id });
      debugger;
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

  /*export default defineComponent({
    name: 'NoticePreviewModal',
    components: { BasicModal },
    emits: ['success', 'register'],
    setup(_, { emit }) {


      return {
        registerNoticePreviewModal,
        noticeInfo,
        noticeTitle,
        noticeFiles,
        noticeSubject,
        formatToDate,
      };
    },
  });*/
  defineExpose(drawerApi)
</script>

<style lang="less" scoped>
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
