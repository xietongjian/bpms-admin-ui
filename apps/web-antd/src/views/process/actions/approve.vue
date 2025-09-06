<template>
  <Page class="!m-4 process-main " >
    <template #title>
      <ProcessBackButton/>
      {{flowBaseInfo.procInstName||flowBaseInfo.name||'-'}}
      <BaseActionButtons :form-type="flowBaseInfo.formType" />
    </template>
    <template #extra>
      <!--<action-buttons @doLaunch="doLaunch"/>-->
      <view-action-buttons @refreshApproveHistory="refreshApproveHistory" :authPoints="flowBaseInfo?.authPoints" />

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
    <FormContainer ref="formContainer" :form-type="flowBaseInfo.formType"/>

    <div v-if="currentApproverList.length > 0" class="mt-2 desc-wrap">
      <CurrentApprover :approverList="currentApproverList" ></CurrentApprover>
    </div>

    <div class="mt-2 mb-2 desc-wrap">
      <ApprovalHistory ref="approvalHistoryRef" ></ApprovalHistory>
    </div>

    <ApproveActionButtons @approveValid="validFormEditData" @approveSaveForm="approveSaveFormData" :authPoints="flowBaseInfo.authPoints" />
  </Page>
</template>
<script lang="ts" setup>
  import { defineComponent, ref, unref, onMounted, nextTick } from 'vue';
  import {ColPage, Page} from '@vben/common-ui';

  import { Tag, Affix } from 'ant-design-vue';
  // import { useRouter } from 'vue-router';
  import { LeftOutlined } from '@ant-design/icons-vue';
  import FramePage from '#/views/components/iframe/index.vue';
  import FormContainer from '#/views/process/components/FormContainer.vue';

  import ProcessBackButton from '#/views/process/components/ProcessBackButton.vue';
  import ApprovalHistory from '#/views/process/components/ApprovalHistory.vue';
  import CurrentApprover from '#/views/process/components/CurrentApprover.vue';

  import {
    getProdModelInfoByModelKeyAndProcInstId,
    getCurrTaskApplyersByBusinessKey
  } from "#/api/process/process";
  // import {useUserStore} from "@/store/modules/user";
  import {EmpInfo} from '#/views/components/EmpInfo';
  // import { useMessage } from '@/hooks/web/useMessage';
  // import {useRequest} from "@vben/hooks";

  const flowBaseInfo = ref({});
  const formContainer = ref();
  // const go = useGo();
  const approvalHistoryRef = ref();
  const userStore = useUserStore();
  const currentApproverList = ref([]);
  const currentApproverListLoading = ref(false);
  // const { createMessage } = useMessage();

  const { currentRoute } = useRouter();
  // approve/:modelKey/:procInstId/:bizId/:taskId/:showPost
  const { params: { modelKey, procInstId, taskId, bizId } } = unref(currentRoute);

  // 跳转到查看页面
  function goBack(backRoute){
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace('/process/approve/', '/process/view/');
    window.location.replace(newUrl);
  }

  async function loadCurrTaskApplyersByBusinessKey(){
    // 查询当前待办人
    currentApproverListLoading.value = true;
    getCurrTaskApplyersByBusinessKey({bizId: bizId}).then(res=>{
      console.log('查询当前待办人：', res, userStore.getUserInfo);
      currentApproverList.value = res||[];
      if(res){
        const { username } = userStore.getUserInfo;
        // 判断当前登录人是否在当前待办人列表里面
        const haveApprovePrivilege = res.some(item=>item.code === username);
        console.log('是否有权限审批', haveApprovePrivilege);
        if(!haveApprovePrivilege){
          goBack('');
        }
      } else {
        goBack('');
      }
    }).finally(()=>{
      currentApproverListLoading.value = false;
    });
  }

  useRequest(loadCurrTaskApplyersByBusinessKey, {
    refreshOnWindowFocus: true,
  });

  // 查询流程基本信息
  getProdModelInfoByModelKeyAndProcInstId({modelKey, procInstId, taskId}).then(res=>{
    flowBaseInfo.value = res;
  });

  onMounted(()=>{
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

  function approveSaveFormData(callback){
    return unref(formContainer).saveFormData().then(res=>{
      console.log('》》》》》》》》》》》》》》》》》》》》保存表单数据结果：', res);
      callback(res);
    }).catch(e => {
      callback(e);
      console.log('保存数据结果异常：', e);
    })
  }

  function validFormEditData(callback){
    unref(formContainer).getFormData(true).then(res=>{
      // 返回需要保存的数据
      callback({success: true});
    }).catch((e)=>{
      callback({success: false});
    });
  }
</script>

<style lang="scss">
  //@import '../index.less';
</style>
