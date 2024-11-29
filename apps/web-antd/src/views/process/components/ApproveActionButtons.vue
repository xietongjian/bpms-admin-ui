<template>
  <div>
    <Affix :offset-bottom="bottom" class="approve-options-panel" >
      <div class="approve-options pt-2">
        <BasicForm @register="registerApproveMsgForm" />
        <Spin :spinning="authPoints.length <= 0">
          <Space class="mt-2" >
            <template v-for="item in authPoints">
              <Button type="primary" v-if="item.sn === 'approve'" :title="item.name" @click="doApprove" >
                {{item.name}}
              </Button>
              <Button type="primary" v-if="item.sn === 'claim'" :title="item.name" @click="doClaimTask" >
                {{item.name}}
              </Button>
              <Button type="primary" v-if="item.sn === 'hold_task'" :title="item.name" @click="doHoldTask">
                {{item.name}}
              </Button>
              <Button type="primary" v-if="item.sn === 'un_claim'" :title="item.name" @click="doUnClaimTask" >
                {{item.name}}
              </Button>
              <Button type="error" v-if="item.sn === 'stop'" :title="item.name" @click="doStop" >
                {{item.name}}
              </Button>
              <Button type="primary" v-if="item.sn === 'delegate'" :title="item.name" @click="doApproveSelectPersonal('delegateTask', false)">
                {{item.name}}
              </Button>
              <Button type="primary" v-if="item.sn === 'turn_do'" :title="item.name" @click="doApproveSelectPersonal('turnTask', false)">
                {{item.name}}
              </Button>
              <!--          <Button type="primary" v-else-if="item.sn === 'after_addsign'" :title="item.name" @click="doApproveSelectPersonal('afterAddSign', true)">
                          {{item.name}}
                        </Button>-->
              <Button type="primary" v-if="item.sn === 'addsign'" :title="item.name" @click="doApproveSelectPersonal('addsign', true)">
                {{item.name}}
              </Button>
              <Button type="error" v-if="item.sn === 'reject'" :title="item.name" @click="doBackToStep" >
                {{item.name}}
              </Button>
              <!-- 拒绝操作 -->
              <Button type="error" v-if="item.sn === 'refuse'" :title="item.name" @click="doRefuseTask" >
                {{item.name}}
              </Button>
            </template>
          </Space>
        </Spin>
      </div>

    </Affix>

    <ApproveSelectorPersonalModal
        @register="registerApproveSelectorPersonalModal"
    />
    <ApproveCustomApproveSettingModal
        ref="approveCustomApproveSettingRef"
        @register="registerCustomApproveSettingModal"
        @saveForm="handleSaveForm"
    />
    <ApproveBackToStepModal
        @register="registerApproveBackToStepModal"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { ApartmentOutlined } from '@ant-design/icons-vue';
  import { Space, Affix, Button, Spin } from 'ant-design-vue';
  import { useModal } from '@/components/Modal';
  import PersonalSelectorModal from '@/components/Selector/src/PersonalSelectorModal.vue';
  import ApproveSelectorPersonalModal from './ApproveSelectorPersonalModal.vue';
  import ApproveCustomApproveSettingModal from './ApproveCustomApproveSettingModal.vue';
  import ApproveBackToStepModal from './ApproveBackToStepModal.vue';
  import { Loading, useLoading } from '@/components/Loading';
  import { BasicForm, FormSchema, useForm } from '@/components/Form/index';

  import {
    complete,
    stopProcess,
    unClaimTask,
    claimTask, holdTask, getCustomApproveSettings,
  } from "@/api/process/process";
  import { useMessage } from '@/hooks/web/useMessage';
  import { useGo } from '@/hooks/web/usePage';
  import { useRouter } from 'vue-router';
  import {approveMsgSchemas} from "@/views/process/components/action.data";

  export default defineComponent({
    name: 'ApproveActionButtons',
    components: {
      Button,
      PersonalSelectorModal,
      ApproveCustomApproveSettingModal,
      ApproveSelectorPersonalModal,
      ApproveBackToStepModal,
      ApartmentOutlined,
      Space,
      Affix,
      Spin,
      BasicForm
    },
    props: {
      authPoints: {
        type: Array,
        default: []
      }
    },
    emits: ['approveValid', 'approveSaveForm'],
    setup(props, {emit}) {
      const approveCustomApproveSettingRef = ref();
      const [registerApproveMsgForm, { getFieldsValue, validateFields }] = useForm({
        labelWidth: 0,
        schemas: approveMsgSchemas,
        className: 'approve-msg-form',
        showActionButtonGroup: false
      });
      // 人员选择弹窗
      const [registerApproveSelectorPersonalModal, { openModal: openApproveSelectorPersonalSelector, setModalProps: setApproveSelectorPersonalModalProps }] = useModal();

      // 自定义审批配置弹窗
      const [registerCustomApproveSettingModal, { openModal: openCustomApproveSettingModal, setModalProps: setCustomApproveSettingModalProps }] = useModal();

      const [registerApproveBackToStepModal, { openModal: openApproveBackToStepModal, setModalProps: setApproveBackToStepModalProps }] = useModal();

      const [openFullLoading, closeFullLoading] = useLoading({
        tip: '处理中...',
      });
      const bottom = ref<number>(0);
      const { createMessage } = useMessage();
      const go = useGo();
      const { currentRoute } = useRouter();
      const { params: { modelKey, bizId, taskId, procInstId } } = unref(currentRoute);

      // 审批成功后跳转到查看页面
      function goBack(backRoute){
        const currentUrl = window.location.href;
        const newUrl = currentUrl.replace('/process/approve/', '/process/view/');
        window.location.replace(newUrl);
      }
      // 审批操作处理
      function doApprove(){
        openFullLoading();
        const { approveMsg } = getFieldsValue();
        // 1、审批之前先验证表单，验证必填项
        // 1.1、如果是自由审批或转办加签等其他操作，先验证数据
        // 2、保存需要修改的数据
        // 3、审批或其他操作
        emit('approveValid', (validRes)=>{
          if(!validRes.success){
            closeFullLoading();
            return;
          }
          // 审批前查询当前节点是否有自定义审批配置项
          // 如果有则弹出自定义审批配置弹窗
          getCustomApproveSettings({taskId: taskId}).then(res=>{
            if(res.data && Object.keys(res.data.data).length>0){
              // res.data.data.nextUser
              // res.data.data.flow_to
              // 弹出自定义审批配置页面
              closeFullLoading();
              openCustomApproveSettingModal(true, {
                selectorProps: {
                  taskId,
                  procInstId,
                  approveSettings: res.data.data, // flow_to, next_user
                  message: approveMsg||"",
                }
              });
              setCustomApproveSettingModalProps({
                width: 800,
                maskClosable: false,
              });
            } else {
              // 如果没有配置自定义审批，则判断有没有需要编辑的节点，有先保存数据，再审批
              // 审批前判断是否需要编辑表单
              emit('approveSaveForm', (validRes)=>{
                // 保存数据成功后
                if(validRes.success) {
                  approveComplete();
                }else{
                  closeFullLoading();
                }
              });
              // 如果没有自定义审批配置则直接进行审批操作
            }
          }).catch(e=>{
            console.error('查询当前节点是否有自定义审批配置项异常！', e);
            createMessage.error('查询当前节点是否有自定义审批配置项异常');
            closeFullLoading();
          });
          // console.log(formData, '验证并保存数据成功，开始审批。。。=======================================########');
          /*if(!validRes.success){
            closeFullLoading();
            return;
          }*/
          //approveComplete();
        });
      }

      function handleSaveForm(callback){
        emit('approveSaveForm', (res)=>{
          closeFullLoading();
          callback(res);
        });
      }

      const approveComplete = ()=>{
        openFullLoading();
        const { approveMsg } = getFieldsValue();
        complete({ taskId: taskId, processInstanceId: procInstId, message: approveMsg||""}).then(res=>{
          const result = res.data;
          if(result.success){
            createMessage.success(result.msg, 1, ()=>{
              closeFullLoading();
              goBack('/process/todo');
            });
          }else{
            closeFullLoading();
            createMessage.error(result.msg)
          }
        }).catch((e)=>{
          createMessage.error('审批异常！' + e.message)
          closeFullLoading();
        });
      }

      function doStop(){
        openFullLoading();
        const { approveMsg } = getFieldsValue();
        stopProcess({ taskId: taskId, processInstanceId: procInstId, message: approveMsg||""}).then(res=>{
          if(res.success){
            createMessage.success(res.msg, 1, ()=>{
              closeFullLoading();
              goBack('/process/todo');
            });
          }else{
            createMessage.error(res.msg)
            closeFullLoading();
          }
        }).catch(e => {
          closeFullLoading();
        }).finally(()=>{

        });
      }
      function doUnClaimTask(){
        openFullLoading();
        const { approveMsg } = getFieldsValue();
        unClaimTask({ taskId: taskId, processInstanceId: procInstId, message: approveMsg||""}).then(res=>{
          const result = res.data;
          if(result.success){
            createMessage.success(result.msg, 1, ()=>{
              closeFullLoading();
              goBack('/process/todo');
            });
          }else{
            createMessage.error(result.msg)
            closeFullLoading();
          }
        }).catch(e => {
          closeFullLoading();
        }).finally(()=>{

        });
      }
      function doClaimTask(){
        openFullLoading();
        const { approveMsg } = getFieldsValue();
        claimTask({ taskId: taskId, processInstanceId: procInstId, message: approveMsg||""}).then(res=>{
          const result = res.data;
          if(result.success){
            createMessage.success(result.msg, 1, ()=>{
              closeFullLoading();
              goBack('/process/todo');
            });
          }else{
            createMessage.error(result.msg)
            closeFullLoading();
          }
        }).catch(()=>{
          closeFullLoading();
        }).finally(()=>{

        });
      }

      // 拒绝操作
      function doRefuseTask(){
        openFullLoading();
        const { approveMsg } = getFieldsValue();
        stopProcess({ processInstanceId: procInstId, taskId: taskId, message: approveMsg||""}).then(res=>{
          const result = res.data;
          if(result.success){
            createMessage.success(result.msg, 1, ()=>{
              closeFullLoading();
              goBack('/process/todo');
            });
          }else{
            createMessage.error(result.msg)
            closeFullLoading();
          }
        }).catch(()=>{
          closeFullLoading();
        }).finally(()=>{

        });
      }

      function doHoldTask(){
        openFullLoading();
        const { approveMsg } = getFieldsValue();
        if(!approveMsg){
            createMessage.warn('请输入暂存意见！');
            closeFullLoading();
            return;
        }
        holdTask({ taskId: taskId, processInstanceId: procInstId, message: approveMsg||""}).then(res=>{
          const result = res.data;
          if(result.success){
            createMessage.success(result.msg, 1, ()=>{
              closeFullLoading();
              goBack('/process/todo');
            });
          }else{
            closeFullLoading();
            createMessage.error(result.msg)
          }
        }).catch(()=>{
          closeFullLoading();
        }).finally(()=>{

        });
      }

      function doBackToStep(){
        const { approveMsg } = getFieldsValue();
        openApproveBackToStepModal(true, {
          selectorProps: {
            taskId,
            procInstId,
            message: approveMsg||""
          }
        });
        setApproveBackToStepModalProps({
          width: 800,
        });
      }

      function doApproveSelectPersonal(actionType, multiple){
        const { approveMsg } = getFieldsValue();
        openApproveSelectorPersonalSelector(true, {
          selectorProps: {
            multiple,
            actionType,
            taskId,
            procInstId,
            message: approveMsg||""
          }
        });
        setApproveSelectorPersonalModalProps({
          width: 800,
        });
      }

      return {
        bottom,
        registerApproveMsgForm,
        doApprove,
        doStop,
        doUnClaimTask,
        doClaimTask,
        doRefuseTask,
        doHoldTask,
        doBackToStep,
        doApproveSelectPersonal,
        registerApproveSelectorPersonalModal,
        registerCustomApproveSettingModal,
        registerApproveBackToStepModal,
        approveCustomApproveSettingRef,
        handleSaveForm
      };
    },
  });
</script>
<style lang="less">
  .approve-options-panel{
    //max-width: 1200px;
    height: auto;
    min-height: 140px;
    .ant-affix{
      height: auto!important;
    }
    .approve-options{
      min-height: 140px;
      background: #e1edff;
      border-top: 4px solid #1890ff;
      padding: 10px;
    }
    .approve-msg-form{
      .ant-form-item{
        margin-bottom: 0;
      }
    }
  }

</style>
