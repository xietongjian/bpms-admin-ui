 <template>
  <div class="approve-options mt-2 approve-ctrl">
    <div v-if="authPoints && authPoints.length > 0">
      <BasicForm @register="registerApproveMsgForm" />
      <Spin :spinning="authPoints.length <= 0">

      <Space class="mt-2 approve-ctrl-btns">
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

    <div v-else> 无操作权限 </div>
  </div>

  <ApproveSelectorPersonalModal
      ref="approveSelectorPersonalModalRef"
    @register="registerApproveSelectorPersonalModal"
    @success="closeFormModal"
  />
  <ApproveCustomApproveSettingModal
    ref="approveCustomApproveSettingRef"
    @register="registerCustomApproveSettingModal"
    @saveForm="handleSaveForm"
    @success="closeFormModal"
  />
  <ApproveBackToStepModal ref="approveBackToStepModalRef" @register="registerApproveBackToStepModal" @success="closeFormModal" />
</template>
<script lang="ts" setup>
  import { ref, defineProps, defineEmits, nextTick, defineExpose } from 'vue';
  import { Space, Spin, Button, message } from 'ant-design-vue';
  // import { useModal } from '@/components/Modal';
  import ApproveSelectorPersonalModal from './ApproveSelectorPersonalModal.vue';
  import ApproveCustomApproveSettingModal from './ApproveCustomApproveSettingModal.vue';
  import ApproveBackToStepModal from './ApproveBackToStepModal.vue';
  // import { BasicForm, useForm } from '@/components/Form/index';
  import {useVbenForm} from '#/adapter/form';

  import {
    complete,
    stopProcess,
    unClaimTask,
    claimTask,
    holdTask,
    getCustomApproveSettings,
  } from '#/api/flowoperation/processTask';
  // import { useMessage } from '@/hooks/web/useMessage';
  // import { ResultEnum } from '@/enums/httpEnum';
  import {approveMsgSchemas} from "#/views/process/components/action.data";

  const approveSelectorPersonalModalRef = ref(),
      approveCustomApproveSettingRef = ref(),
      approveBackToStepModalRef = ref();

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
    await validateFields();
    const { approveMsg: message } = getFieldsValue();
    emit('changeLoading', true);
    // 审批前查询当前节点是否有自定义审批配置项
    // 如果有则弹出自定义审批配置弹窗
    getCustomApproveSettings({ taskId: taskId })
      .then((res) => {
        if (res.data && Object.keys(res.data.data).length > 0) {
          // res.data.data.nextUser
          // res.data.data.flow_to
          // 弹出自定义审批配置页面
          openCustomApproveSettingModal(true, {
            selectorProps: {
              taskId,
              procInstId,
              approveSettings: res.data.data, // flow_to, next_user
              message,
            },
          });
          setCustomApproveSettingModalProps({
            width: 800,
          });
        } else {
          const approveComplete = () => {
            complete({ taskId: taskId, processInstanceId: procInstId, message })
              .then((res) => {
                const result = res.data;
                if (result.success) {
                  message.success(result.msg);
                  emit('success');
                } else {
                  message.error(result.msg);
                  emit('changeLoading', false);
                }
              })
              .catch((e) => {
                console.error(e);
                emit('changeLoading', false);
              });
          };
          // 如果没有自定义审批配置则直接进行审批操作

          // 审批前判断是否需要编辑表单
          emit('approveSaveForm', (validRes) => {
            // 保存数据成功后
            if (validRes.success) {
              approveComplete();
            } else {
              console.error(validRes.msg);
              validRes.msg && message.error(validRes.msg);
              emit('changeLoading', false);
            }
          });
        }
      })
      .catch((e) => {
        console.error(e);
        emit('changeLoading', false);
      });
  }
  function handleSaveForm(callback){
      emit('approveSaveForm', (res)=>{
        emit('changeLoading', false);
        callback(res);
      });
  }
  function doStop() {
    const { modelKey, bizId, taskId, procInstId } = props.params;
    emit('changeLoading', true);
    stopProcess({ taskId: taskId, processInstanceId: procInstId, message: approveMsg.value })
      .then((res) => {
        const result = res.data;
        if (result.code === ResultEnum.SUCCESS) {
          message.success(result.msg);
          emit('success');
        } else {
          message.error(result.msg);
        }
      })
      .finally(() => {
        emit('changeLoading', false);
      });
  }

  function doUnClaimTask() {
    const { modelKey, bizId, taskId, procInstId } = props.params;
    emit('changeLoading', true);
    unClaimTask({ taskId: taskId, processInstanceId: procInstId, message: approveMsg.value })
      .then((res) => {
        const result = res.data;
        if (result.code === ResultEnum.SUCCESS) {
          message.success(result.msg);
          emit('success');
        } else {
          message.error(result.msg);
        }
      })
      .finally(() => {
        emit('changeLoading', false);
      });
  }
  function doClaimTask() {
    const { modelKey, bizId, taskId, procInstId } = props.params;

    emit('changeLoading', true);
    claimTask({ taskId: taskId, processInstanceId: procInstId, message: approveMsg.value })
      .then((res) => {
        const result = res.data;
        if (result.code === ResultEnum.SUCCESS) {
          message.success(result.msg);
          emit('success');
        } else {
          message.error(result.msg);
        }
      })
      .catch(() => {})
      .finally(() => {
        emit('changeLoading', false);
      });
  }
  function doHoldTask() {
    const { modelKey, bizId, taskId, procInstId } = props.params;
    emit('changeLoading', true);
    holdTask({ taskId: taskId, processInstanceId: procInstId, message: approveMsg.value })
      .then((res) => {
        const result = res.data;
        if (result.code === ResultEnum.SUCCESS) {
          message.success(result.msg);
          emit('success');
        } else {
          message.error(result.msg);
        }
      })
      .catch(() => {})
      .finally(() => {
        emit('changeLoading', false);
      });
  }

  // 拒绝操作
  function doRefuseTask(){
    const { modelKey, bizId, taskId, procInstId } = props.params;

    emit('changeLoading', true);
    const { approveMsg } = getFieldsValue();
    stopProcess({ processInstanceId: procInstId, taskId: taskId, message: approveMsg||""}).then(res=>{
      const result = res.data;
      if(result.success){
        message.success(result.msg, 1, ()=>{
          emit('success');
        });
      }else{
        message.error(result.msg)
        emit('success');
      }
    }).catch(()=>{
      emit('changeLoading', false);
    }).finally(()=>{

    });
  }
  function doBackToStep() {
    const { modelKey, bizId, taskId, procInstId } = props.params;
    const { approveMsg: message } = getFieldsValue();
    openApproveBackToStepModal(true, {
      selectorProps: {
        taskId,
        procInstId,
        message,
      },
    });
    setApproveBackToStepModalProps({
      width: 800,
    });
  }

  function doApproveSelectPersonal(actionType, multiple) {
    const { modelKey, bizId, taskId, procInstId } = props.params;
    const { approveMsg: message } = getFieldsValue();
    openApproveSelectorPersonalSelector(true, {
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
    });
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

  defineExpose({resetApproveMsg});
</script>
<style lang="less">
  .approve-msg-form{
    .ant-form-item{
      margin-bottom: 0;
    }
  }

  .approve-ctrl {
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
    }
  }
</style>
