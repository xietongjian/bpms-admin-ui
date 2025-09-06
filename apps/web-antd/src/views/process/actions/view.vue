<template>
  <PageWrapper class="!m-4 process-main" >
    <template #title>
      <ProcessBackButton/>
      {{flowBaseInfo.procInstName||flowBaseInfo.name}}
      <BaseActionButtons :form-type="flowBaseInfo?.formType" />
    </template>
    <template #extra>
      <!--<action-buttons @doLaunch="doLaunch"/>-->
      <view-action-buttons @refreshApproveHistory="refreshApproveHistory" :authPoints="flowBaseInfo.authPoints" />
    </template>

    <template #footer >
      <div class="p-2" style="padding-top:0;">
        <Tag>归属部门：{{flowBaseInfo.ownDeptName||'-'}}</Tag>
        <Tag>
          流程BP：
          <EmpInfo :no="flowBaseInfo.processDockingNo" :name="flowBaseInfo.processDockingName" >
            {{flowBaseInfo.processDockingName||'-'}}
          </EmpInfo>
        </Tag>
      </div>
    </template>
    <FormContainer :form-type="flowBaseInfo?.formType" />
    <div v-if="currentApproverList.length > 0" class="mt-2 desc-wrap">
      <CurrentApprover :approverList="currentApproverList" ></CurrentApprover>
    </div>

    <div class="mt-2 desc-wrap">
      <ApprovalHistory ref="approvalHistoryRef" ></ApprovalHistory>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { defineComponent, ref, unref, onMounted, nextTick } from 'vue';
  // import { PageWrapper } from '@/components/Page';
  import { Divider, Card, Tag, Empty, Button, Descriptions} from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { LeftOutlined } from '@ant-design/icons-vue';
  import FormContainer from '#/views/process/components/FormContainer.vue';

  import ActionButtons from '#/views/process/components/ActionButtons.vue';
  import ProcessBackButton from '#/views/process/components/ProcessBackButton.vue';
  import ApprovalHistory from '#/views/process/components/ApprovalHistory.vue';
  import CurrentApprover from '#/views/process/components/CurrentApprover.vue';

  // import { useGo } from '@/hooks/web/usePage';
  // import { useMessage } from '@/hooks/web/useMessage';
  import {getProdModelInfoByModelKeyAndProcInstId, getCurrTaskApplyersByBusinessKey} from "#/api/process/process";
  // import {useUserStore} from "@/store/modules/user";
  import {EmpInfo} from '#/views/components/EmpInfo';
  // import {isEmpty} from "@/utils/is";

  const flowBaseInfo = ref({});
  const processFormRef = ref<HTMLElement | null>(null);
  const framePageRef = ref<HTMLElement | null>(null);
  const approvalHistoryRef = ref<HTMLElement | null>(null);
  // const go = useGo();
  const { currentRoute } = useRouter();
  const { params: { modelKey, procInstId, bizId } } = unref(currentRoute);
  // const userStore = useUserStore();
  const currentApproverList = ref([]);
  const currentApproverListLoading = ref(false);
  // const { createMessage } = useMessage();


  // 查询当前待办人
  currentApproverListLoading.value = true;
  getCurrTaskApplyersByBusinessKey({bizId: bizId}).then(res=>{
    currentApproverList.value = res||[];
  }).finally(()=>{
    currentApproverListLoading.value = false;
  });

  onMounted(()=>{
    const params = {modelKey, procInstId: procInstId==='0'?'':procInstId};
    // 查询流程基本信息
    getProdModelInfoByModelKeyAndProcInstId(params).then(res=>{
      if(res){
        flowBaseInfo.value = res;
      }else{
        // createMessage.error("未找到流程定义!");
        console.error("未找到流程定义!");
      }
    });
    nextTick(()=>{
      window['currentUser'] = userStore.getUserInfo;
      window['procInstId'] = procInstId;
      window['modelKey'] = modelKey;
      window['bizId'] = bizId;
    });
  });

  function refreshApproveHistory(){
    approvalHistoryRef.value.fetch();
  }
</script>

<style lang="scss">
  //@use '../index.less';
</style>
