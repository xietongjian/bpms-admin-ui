<template>
  <div class="process-print process-main w-full">
    <PageWrapper >
      <template #title>
        {{flowBaseInfo.procInstName||flowBaseInfo.name}}
      </template>
      <template #extra>
        <div class="no-print">
          <Space>
            <a-button type="primary" @click="handlePrint" >打印全部</a-button>
            <a-button type="primary" @click="handlePrintApply" >打印申请单</a-button>
            <a-button type="primary" @click="handlePrintForm" >打印表单</a-button>
            <a-button @click="doBack" >关闭</a-button>
            <!--        <a-button type="primary" >打印审批记录</a-button>-->
          </Space>
        </div>
      </template>

      <template #footer >
        <div class="p-2" style="padding-top:0;">
          <Tag>归属部门：{{flowBaseInfo.ownDeptName||'-'}}</Tag>
          <Tag>流程BP：{{flowBaseInfo.processDockingName||'-'}}</Tag>
        </div>
      </template>

      <div class="print-box form-box">
        <FormContainer ref="processFormRef" :form-type="flowBaseInfo.formType" print-read />
      </div>

      <div class="print-box approve-history-box mt-2 desc-wrap">
        <ApprovalHistory ref="approvalHistoryRef" ></ApprovalHistory>
      </div>

    </PageWrapper>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, onMounted, nextTick } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import { Divider, Card, Tag, Empty, Space, Button, Descriptions} from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { LeftOutlined } from '@ant-design/icons-vue';
  import FormContainer from '@/views/process/components/FormContainer.vue';
  import ApprovalHistory from '@/views/process/components/ApprovalHistory.vue';
  import { useGo } from '@/hooks/web/usePage';
  import {getProdModelInfoByModelKeyAndProcInstId} from "@/api/process/process";
  import { Loading, useLoading } from '@/components/Loading';

  export default defineComponent({
    components: {
      FormContainer,
      Button, Tag, Space,
      LeftOutlined,
      PageWrapper,
      [Divider.name]: Divider,
      [Card.name]: Card,
      AEmpty: Empty,
      [Descriptions.name]: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
      ApprovalHistory,
    },
    setup() {
      const flowBaseInfo = ref({});
      const processFormRef = ref<HTMLElement | null>(null);
      const framePageRef = ref<HTMLElement | null>(null);
      const go = useGo();
      const [openFullLoading, closeFullLoading] = useLoading({
        tip: '加载中...',
      });
      const { currentRoute } = useRouter();
      const { params: { modelKey, procInstId } } = unref(currentRoute);

      function doBack(){
        if(history.state.back){
          history.back();
        }else{
          openFullLoading();
          go({path: '/process/todo', isReplace: true});
        }
      }

      onMounted(()=>{
        openFullLoading();
        // 查询流程基本信息
        getProdModelInfoByModelKeyAndProcInstId({modelKey, procInstId: procInstId==='0'?'':procInstId}).then(res=>{
          flowBaseInfo.value = res;
          closeFullLoading();
        });
      });

      function handlePrintApply(){
        const approveHistoryNode = document.querySelector('.process-print .approve-history-box');
        approveHistoryNode.style.display = 'none';
        printSetting();
        // window.print();
        setTimeout(()=>{
          printSetting();
          window.print();
          approveHistoryNode.style.display = 'block';
        }, 100);
      }

      function handlePrintForm(){
        const approveHistoryNode = document.querySelector('.process-print .approve-history-box');
        approveHistoryNode.style.display = 'none';
        printFormSetting(true);
        printSetting();
        // window.print();
        setTimeout(()=>{
          printSetting();
          window.print();
          approveHistoryNode.style.display = 'block';
          printFormSetting(false);
        }, 100);
      }

      // 打印还有一种方案 - 使用iframe重新做一个专门打印的渲染页面 （打印预览页面也需要改造成打印的页面），/public/form-render/print-preview.html
      // 使用vue3的表单渲染器不存在iframe的问题
      // 最后使用这种方法打印 -- processFormRef.value.framePageRef.frameRef.contentWindow.print()
      function handlePrint(){
        printSetting();
        window.print();
      }

      function printFormSetting(hide) {
        const eleBaseInfo = document.querySelector('.process-print .form-header-base-info');
        const elePageHeader = document.querySelector('.process-print .vben-page-wrapper .ant-page-header');
        const eleContainerHeader = document.querySelector('.process-print .generate-form-container .vben-collapse-container__header');
        if (eleBaseInfo) {
          eleBaseInfo.style.display = hide ? 'none' : 'block';
        }
        if (elePageHeader) {
          elePageHeader.style.display = hide ? 'none' : 'block';
        }
        if (eleContainerHeader) {
          eleContainerHeader.style.display = hide ? 'none' : 'flex';
        }
      }

      function printSetting(){
        const noPrintNode = document.querySelectorAll('.process-print .no-print');
        // const bodyNode = document.querySelector('body');
        noPrintNode.forEach(item=>{
          item.style.display='none';
        })
        // bodyNode.style.height = 'auto';

        setTimeout(function () {
          // window.location.reload(); //重新渲染当前页面html元素
          noPrintNode.forEach(item=>{
            item.style.display='block';
          });
          // bodyNode.style.height = '100%';
        }, 100);
      }

      return {
        framePageRef,
        handlePrintApply,
        handlePrintForm,
        handlePrint,
        processFormRef,
        doBack,
        flowBaseInfo
      };
    },
  });
</script>
<style lang="less">
  .process-print{
    background: @content-bg;
    .vben-page-wrapper{
      width: 100%;margin: auto;
    }
    height: 100%;
    overflow-y: auto;
  }

</style>

<style lang="less">
  @import '../index.less';
</style>
