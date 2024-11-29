<template>
  <div>
    <Space>
      <!-- 撤回功能逻辑 -->
      <PopConfirmButton v-if="revokeVisible" :title="`确定要撤回流程吗？`" @confirm="handleRevoke" type="error" >
        {{ revokeAuthPointer.name }}
      </PopConfirmButton>

      <a-button v-if="fetchBackVisible" @click="handleFetchBack" type="primary">取回</a-button>

      <!-- 转阅按钮的显示逻辑 -->
      <a-button v-if="turnReadAuthPointer!=null" @click="handleTurnRead" type="default">{{turnReadAuthPointer.name}}</a-button>
    </Space>
    <FetchBackMessageModal @register="registerFetchBackMessageModal" @success="handleSuccess"/>

    <ApproveSelectorPersonalModal
        @register="registerApproveSelectorPersonalModal"
        @success="handleSuccess"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, onMounted, nextTick } from 'vue';
  import { Button, Space } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { useModal } from '@/components/Modal';
  import FetchBackMessageModal from './FetchBackMessageModal.vue';
  import { useGo } from '@/hooks/web/usePage';
  import {checkFetchBack, checkRevokeProcess, revokeProcess} from "@/api/process/process";
  import ApproveSelectorPersonalModal from './ApproveSelectorPersonalModal.vue';
  import { PopConfirmButton } from '@/components/Button';
  import {useMessage} from "@/hooks/web/useMessage";
  import { Loading, useLoading } from '@/components/Loading';

  export default defineComponent({
    name: 'ViewActionButtons',
    components: {
      Button,PopConfirmButton,
      Space,
      FetchBackMessageModal,
      ApproveSelectorPersonalModal
    },
    props: {
      authPoints: {
        type: Array,
        default: []
      }
    },
    emits: [
      'refreshApproveHistory'
    ],
    setup(props, {emit}) {
      const { currentRoute } = useRouter();
      const go = useGo();
      const { params: {modelKey, procInstId, bizId, taskId} } = unref(currentRoute);
      const fetchBackVisible = ref<boolean>(false);
      const revokeVisible = ref<boolean>(false);
      const turnReadAuthPointer = ref(null);
      const revokeAuthPointer = ref(null);
      const { createMessage } = useMessage();
      const [openFullLoading, closeFullLoading] = useLoading({
        tip: '处理中...',
      });
      // 人员选择弹窗
      const [registerApproveSelectorPersonalModal, { openModal: openApproveSelectorPersonalSelector, setModalProps: setApproveSelectorPersonalModalProps }] = useModal();

      const [registerFetchBackMessageModal, { openModal: openFetchBackMessageModal, setModalProps: setFetchBackMessageProps }] = useModal();

      onMounted(()=>{
        // 判断任务是否可以取回
        if(taskId !== '0'){
          checkFetchBack({taskId}).then(res=>{
            if(res.data.success){
              fetchBackVisible.value = res.data.data;
            }else{
              console.error("调用检测用户是否可以取回审批记录的接口异常！");
            }
          });
        }

        if(props.authPoints){
          setTimeout(()=>{
            props.authPoints.forEach(item=>{
              if(item.sn === 'turn_read'){
                turnReadAuthPointer.value = item;
              }
              if(item.sn === 'revoke'){
                revokeAuthPointer.value = item;
              }
            });

            // 有撤回权限才进行检测
            revokeAuthPointer && checkRevokeProcess({processInstanceId: procInstId}).then(res=>{
              if(res.data.success){
                revokeVisible.value = res.data.data;
              }else{
                console.error("调用检测用户是否可以撤回的接口异常！");
              }
            });
          }, 500);
        }
      })

      function handleFetchBack(){
        openFetchBackMessageModal(true, {
          modelKey: modelKey,
          taskId: taskId,
        });
        setFetchBackMessageProps({
          width: 800, height: 300,
          showCancelBtn: true,
          cancelText: '取消'
        });
      }

      /**
       * 撤回操作
       */
      function handleRevoke(){
        openFullLoading();
        revokeProcess({processInstanceId: procInstId, taskId}).then(res=>{
          const {msg, success} = res.data;
          if(success){
            createMessage.success(msg);
            setTimeout(() => {
              closeFullLoading();
              go("/process/todo");
            }, 500)
          }else{
            createMessage.error(msg);
            closeFullLoading();
          }
        }).catch(e => {
          console.error(e);
          closeFullLoading();
        });
      }

      function handleSuccess() {
        emit('refreshApproveHistory');
      }

      function handleTurnRead(){
        const actionType = 'reviewTask';
        const multiple = true;

        openApproveSelectorPersonalSelector(true, {
          selectorProps: {
            multiple,
            actionType,
            taskId,
            procInstId,
            message: ''
          }
        });
        setApproveSelectorPersonalModalProps({
          width: 800,
        });
      }

      return {
        handleSuccess,
        handleFetchBack,
        handleTurnRead,
        fetchBackVisible,
        revokeVisible,
        handleRevoke,
        turnReadAuthPointer,
        revokeAuthPointer,
        registerFetchBackMessageModal,
        registerApproveSelectorPersonalModal,
      };
    },
  });
</script>
