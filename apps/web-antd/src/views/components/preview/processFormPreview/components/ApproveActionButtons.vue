 <template>
   <!--
   position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #e1edff;
    border-top: 3px solid #1890ff;
    padding: 10px 20px;
    z-index: 999999;

    .approve-ctrl-btns {
      margin: 10px 0 0;
    }-->
  <div class="ml-2 mt-2" v-loading="approveActionLoading">
    <div v-if="authPoints && authPoints.length > 0" class="relative">
      <BasicForm />
      <Spin :spinning="authPoints.length <= 0">
        <Space class="approve-ctrl-btns" >
          <!-- "[\"addsign\", \"claim\", \"turn_do\", \"refuse\", \"approve\", \"turn_read\", \"reject\", \"revoke\"]" -->
          <!-- ["approve", "claim", "turn_do", "addsign", "reject", "revoke", "turn_read", "delegate" ] -->
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
            <Button danger v-if="item.sn === 'reject'" :title="item.name" @click="doBackToStep" >
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
    <div v-else class="w-full"> 无操作权限 </div>
  </div>

  <ApproveSelectorPersonalModal
    ref="approveSelectorPersonalModalRef"
    @success="closeFormModal"
  />
  <ApproveCustomApproveSettingModal
    ref="approveCustomApproveSettingRef"
    @saveForm="handleSaveForm"
    @success="closeFormModal"
  />
  <ApproveBackToStepModal
    ref="approveBackToStepModalRef"
    @success="closeFormModal" />
</template>
<script lang="ts" setup>
  import { ref, defineProps, defineEmits, nextTick, defineExpose } from 'vue';
  import { Space, Spin, Button, message, Upload, TypographyLink } from 'ant-design-vue';
  import {EditOutlined, PaperClipOutlined, CloseOutlined, LoadingOutlined, FileOutlined} from '@ant-design/icons-vue'
  import ApproveSelectorPersonalModal from './ApproveSelectorPersonalModal.vue';
  import ApproveCustomApproveSettingModal from './ApproveCustomApproveSettingModal.vue';
  import ApproveBackToStepModal from './ApproveBackToStepModal.vue';
  import {useVbenForm} from '#/adapter/form';
  import {formatFileSize} from '#/utils/index'
  import { EllipsisText } from '@vben/common-ui';
  import type { UploadChangeParam, UploadProps } from 'ant-design-vue';

  import {
    complete,
    stopProcess,
    unClaimTask,
    claimTask,
    holdTask,
    getCustomApproveSettings,
  } from '#/api/flowoperation/processTask';
  import {approveMsgSchemas} from "#/views/process/components/action.data";

  const approveSelectorPersonalModalRef = ref(),
      approveCustomApproveSettingRef = ref(),
      approveBackToStepModalRef = ref();
  const approveActionLoading = ref(false);

  const emit = defineEmits(['success', 'changeLoading', 'approveSaveForm']);
  const props = defineProps({
    authPoints: {
      type: Array,
      default: [],
    },
    params: {
      type: Object,
      default: {},
    },
  })

  // 人员选择弹窗
  /*const [
    registerApproveSelectorPersonalModal,
    {
      openModal: openApproveSelectorPersonalSelector,
      setModalProps: setApproveSelectorPersonalModalProps,
    },
  ] = useModal();*/
/*  const [registerApproveMsgForm, {resetFields, setFieldsValue, getFieldsValue, validateFields }] = useForm({
      labelWidth: 0,
      schemas: approveMsgSchemas,
      className: 'approve-msg-form',
      showActionButtonGroup: false
  });*/

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      formItemClass: 'pb-2 [&_.text-destructive]:left-3 [&_.text-destructive]:bottom-[20px]',
      hideLabel: true,
      hideRequiredMark: true,
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: approveMsgSchemas,
    wrapperClass: 'grid-cols-1',
  });

  // 自定义审批配置弹窗
/*  const [
    registerCustomApproveSettingModal,
    {
      openModal: openCustomApproveSettingModal,
      setModalProps: setCustomApproveSettingModalProps,
    },
  ] = useModal();

  const [
    registerApproveBackToStepModal,
    { openModal: openApproveBackToStepModal, setModalProps: setApproveBackToStepModalProps },
  ] = useModal();*/

  const approveMsg = ref<string>('');

  // 审批操作处理
  async function doApprove() {
    const { modelKey, bizId, taskId, procInstId } = props.params;
    const {valid} = await formApi.validate();
    if(!valid){
      return;
    }
    const { approveMsg, signImg, attachmentList } = await formApi.getValues();
    const commentAttachmentList = attachmentList.filter(item => item.status === "done" && !!item.response?.data).map(item => {
      return {
        fileName: item.name,
        fileSize: item.size,
        filePath: item.response.data,
        fileType: item.name.split('.').pop().toUpperCase()
      }
    });

    const approveParams = {
      taskId: taskId,
      processInstanceId: procInstId,
      message: approveMsg,
      signatureImg: signImg,
      commentAttachmentList
    };

    emit('changeLoading', true);
    approveActionLoading.value = true;
    // 审批前查询当前节点是否有自定义审批配置项
    // 如果有则弹出自定义审批配置弹窗
    const {data, success, msg} = await getCustomApproveSettings({ taskId: taskId });

    if (data && Object.keys(data).length > 0) {
      // data.nextUser
      // data.flow_to
      // 弹出自定义审批配置页面
      //FIXME
      approveCustomApproveSettingRef.value.setData({
        selectorProps: {
          taskId,
          procInstId,
          approveSettings: data, // flow_to, next_user
          message,
        }
      });
      approveCustomApproveSettingRef.value.open();
      /*openCustomApproveSettingModal(true, {
        selectorProps: {
          taskId,
          procInstId,
          approveSettings: data, // flow_to, next_user
          message,
        },
      });
      setCustomApproveSettingModalProps({
        width: 800,
      });*/
    } else {
      const approveComplete = async () => {
        // 组装审批的数据
        const {success, msg, data} = await complete(approveParams);

        if (success) {
            message.success(msg);
            emit('success');
        } else {
            message.error(msg);
        }
        approveActionLoading.value = false;
      };
      // 如果没有自定义审批配置则直接进行审批操作

      // 审批前判断是否需要编辑表单
      emit('approveSaveForm', async (validRes) => {
        // 保存数据成功后
        if (validRes.success) {
          await approveComplete();
        } else {
          console.error(validRes.msg);
          validRes.msg && message.error(validRes.msg);
        }
        approveActionLoading.value = false;
      });
    }
  }

  function handleSaveForm(callback){
      emit('approveSaveForm', (res)=>{
        approveActionLoading.value = false;
        callback(res);
      });
  }
  async function doStop() {
    const { modelKey, bizId, taskId, procInstId } = props.params;
    emit('changeLoading', true);
    const {data, msg, success} = await stopProcess({ taskId: taskId, processInstanceId: procInstId, message: approveMsg.value });
    if (success) {
      message.success(msg);
      emit('success');
    } else {
      message.error(msg);
    }
  }

  async function doUnClaimTask() {
    const { modelKey, bizId, taskId, procInstId } = props.params;
    emit('changeLoading', true);
    const {success, msg, data} = await unClaimTask({ taskId: taskId, processInstanceId: procInstId, message: approveMsg.value });
    if (success) {
      message.success(msg);
      emit('success');
    } else {
      message.error(msg);
    }
  }
  async function doClaimTask() {
    const { modelKey, bizId, taskId, procInstId } = props.params;

    emit('changeLoading', true);
    const {success, msg, data} = await claimTask({ taskId: taskId, processInstanceId: procInstId, message: approveMsg.value });
    if (success) {
      message.success(msg);
      emit('success');
    } else {
      message.error(msg);
    }
  }
  async function doHoldTask() {
    const { modelKey, bizId, taskId, procInstId } = props.params;
    emit('changeLoading', true);
    const {success, msg, data} = await holdTask({ taskId: taskId, processInstanceId: procInstId, message: approveMsg.value });
    if (success) {
      message.success(msg);
      emit('success');
    } else {
      message.error(msg);
    }
  }

  // 拒绝操作
  async function doRefuseTask(){
    const { modelKey, bizId, taskId, procInstId } = props.params;

    emit('changeLoading', true);
    const { approveMsg } = await formApi.getValues();
    const {data, msg, success} = await stopProcess({ taskId: taskId, processInstanceId: procInstId, message: approveMsg.value });
    if (success) {
      message.success(msg);
      emit('success');
    } else {
      message.error(msg);
    }
  }
  async function doBackToStep() {
    const { modelKey, bizId, taskId, procInstId } = props.params;
    const { approveMsg: message } = await formApi.getValues();
      approveBackToStepModalRef.value.setData({
          taskId,
          procInstId,
          message,
      });
      approveBackToStepModalRef.value.open();

    /*openApproveBackToStepModal(true, {
      selectorProps: {
        taskId,
        procInstId,
        message,
      },
    });
    setApproveBackToStepModalProps({
      width: 800,
    });*/
  }

  async function doApproveSelectPersonal(actionType, multiple) {
    const { modelKey, bizId, taskId, procInstId } = props.params;
    const { approveMsg } = await formApi.getValues();
      approveSelectorPersonalModalRef.value.setData({
          multiple,
          actionType,
          taskId,
          procInstId,
          approveMsg,
      });
      approveSelectorPersonalModalRef.value.open();

    /*openApproveSelectorPersonalSelector(true, {
      selectorProps: {
        multiple,
        actionType,
        taskId,
        procInstId,
        message,
      },
    });
    setApproveSelectorPersonalModalProps({
      width: 800,
    });*/
  }

  function closeFormModal() {
    setFieldsValue({approveMsg: ''});
    emit('success');
  }

  function resetApproveMsg() {
    nextTick(() => {
      resetFields();
    });
  }

  defineExpose({resetApproveMsg, getFormValues: formApi.getValues, setFormValues: formApi.setValues});

</script>
<style lang="scss">
.approve-files{
  .ant-upload-select{
    position: absolute;
    right: 12px;
    bottom: 48px;
    z-index: 10;

  }
  .ant-upload-list{
    &::before{
      display: none;
    }
    display: flex;
    flex-wrap: wrap;
    .ant-upload-list-item-container{
      border-radius: 4px;
      padding: 4px;
      height: auto!important;
      //min-height: 40px!important;
    }
  }

}
</style>
