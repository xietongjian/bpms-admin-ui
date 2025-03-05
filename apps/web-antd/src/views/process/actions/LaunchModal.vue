<template>
  <BasicModal v-bind="$attrs" @register="registerModal">
    <template #title>
      <Row>
        <Col span="16">
          <Space>
            <span class="launch-header-title">{{
              flowBaseInfo?.procInstName || flowBaseInfo?.name
            }}</span>
            <BaseActionButtons
              :form-type="flowBaseInfo.formType"
              :modelKey="processBaseInfo.modelKey"
              :bizId="processBaseInfo.bizId"
              :procInstId="processBaseInfo.procInstId"
              :taskId="processBaseInfo.taskId"
            />
          </Space>
        </Col>
        <Col span="8" class="text-right">
<!--          <action-buttons
            ref="actionButtonsRef"
            @do-close="handleClose"
            @do-launch="doLaunch"
            @do-save="doSave"
            @do-simulation="doSimulation"
          />-->
          <Space>
            <!--    <a-button @click="doSimulation" > 模拟 </a-button>-->
            <Button type="primary" @click="doLaunch" :loading="submitLoading"> 提交</Button>
            <!--    <a-button @click="doSave" :loading="loading" > 存草稿 </a-button>-->
            <!--    <PopConfirmButton v-if="canStop" type="error" title="确定要作废该流程吗？" @confirm="doStop"  > 作废 </PopConfirmButton>-->
            <Button @click="doBack"> 取消</Button>
          </Space>
        </Col>
      </Row>
    </template>
    <Affix :offset-top="0" style="width: 100%" @change="handleAffixChange">
      <div class="bg-white launch-header" :class="{ affixed: launchHeaderAfixed }">
        <div v-show="!launchHeaderAfixed" class="p-2 launch-header-desc" style="padding-top: 0">
          <Tag>归属部门：{{ flowBaseInfo.ownDeptName || '-' }}</Tag>
          <Tag>
            流程BP：
            <EmpInfo :no="flowBaseInfo.processDockingNo" :name="flowBaseInfo.processDockingName">
              {{ flowBaseInfo.processDockingName || '-' }}
            </EmpInfo>
          </Tag>
        </div>
      </div>
    </Affix>
    <FormContainer
      ref="formContainerRef"
      :form-type="flowBaseInfo.formType"
      :modelKey="processBaseInfo.modelKey"
      :bizId="processBaseInfo.bizId"
      :procInstId="processBaseInfo.procInstId"
      :taskId="processBaseInfo.taskId"
      :view-type="processBaseInfo.viewType || 'launch'"
    />

    <div class="mt-2 desc-wrap" v-if="approvalHistoryVisible">
      <ApprovalHistory ref="approvalHistoryRef" />
    </div>

    <!--    <BpmnSimulatorModal @register="registerBpmnSimulatorModal" />-->
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref, onMounted, nextTick } from 'vue';
  import { Space, Tag, Row, Col, Modal, Affix, message } from 'ant-design-vue';
  // import { useUserStore } from '@/store/modules/user';
  import FormContainer from '#/views/process/components/FormContainer.vue';
  // import BpmnSimulatorModal from '#/views/components/preview/bpmnSimulator/index.vue';

  // import ActionButtons from '#/views/process/components/ActionButtons.vue';
  import BaseActionButtons from '#/views/process/components/BaseActionButtons.vue';

  // import { useLoading } from '@/components/Loading';
  import {
    getProdModelInfoByModelKeyAndProcInstId,
    startCustomFormProcess,
  } from '#/api/process/process';
  import {useVbenModal} from '@vben/common-ui';

  // import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  // import { useMessage } from '@/hooks/web/useMessage';
  import ApprovalHistory from '#/views/process/components/ApprovalHistory.vue';
  import {EmpInfo} from '#/views/components/EmpInfo';
  import { updateCustomFormData } from '#/api/process/customForm';
  // import { useGo } from '@/hooks/web/usePage';

  // const go = useGo();
  const flowBaseInfo = ref({});
  const processBaseInfo = ref({});
  const formContainerRef = ref();
  const launchHeaderAfixed = ref(false);
  const submitLoading = ref(false);
  const actionButtonsRef = ref();
  // const [openFullLoading, closeFullLoading] = useLoading({
  //   tip: '提交中...',
  // });
  // const { message } = useMessage();
  const approvalHistoryVisible = ref(false);
  // launch/:modelKey/:procInstId/:bizId/:taskId/:formType
  // const userStore = useUserStore();
  /*const [
    registerBpmnSimulatorModal,
    { openModal: openBpmnSimulatorModal, setModalProps: setBpmnSimulatorProps },
  ] = useModal();*/

  function changeSubmitLoading(loading){
    modalApi.setState({loading: loading, confirmLoading: loading});
    submitLoading.value = loading;
  }

  /*const [registerModal, { setModalProps, closeModal, changeLoading }] = useModalInner(async (data) => {
    processBaseInfo.value = {
      formType: data.formType,
      modelKey: data.modelKey,
      procInstId: data.procInstId,
      bizId: data.bizId,
      taskId: data.taskId,
      viewType: data.viewType || 'view'
    };
    approvalHistoryVisible.value = !!data.procInstId;
    initData();

    setModalProps({
      confirmLoading: false,
      title: `发起XXX审批`,
    });
  });*/


  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          processBaseInfo.value = {
            formType: values.formType,
            modelKey: values.modelKey,
            procInstId: values.procInstId,
            bizId: values.bizId,
            taskId: values.taskId,
            viewType: values.viewType || 'view'
          };
          approvalHistoryVisible.value = !!values.procInstId;
          initData();
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      // await baseFormApi.submitForm();
      // handleSubmit();
    },
  });

  const approvalHistoryRef = ref<HTMLElement | null>(null);

  function getUrlValue(val) {
    return val == '0' ? '' : val;
  }

  function handleClose() {
    modalApi.close();
  }

  let closePage = () => {
    if (
      navigator.userAgent.indexOf('Firefox') != -1 ||
      navigator.userAgent.indexOf('Chrome') != -1
    ) {
      window.location.href = 'about:blank';
      window.close();
    } else {
      window.opener = null;
      window.open('', '_self');
      window.close();
    }
  };

  function initData() {
    const {modelKey, procInstId, bizId} = unref(processBaseInfo);
    getProdModelInfoByModelKeyAndProcInstId({ modelKey, procInstId: procInstId || '' }).then(
      (res) => {
        flowBaseInfo.value = res;
        processBaseInfo.value.formType = res.formType;
        // 加载表单数据
        unref(formContainerRef).fetchFormData(unref(processBaseInfo));
      },
    );

    // alert(JSON.stringify(userStore.getUserInfo));
    nextTick(() => {
      window['currentUser'] = userStore.getUserInfo;
      window['procInstId'] = procInstId;
      window['modelKey'] = modelKey;
      window['bizId'] = bizId;
      window['onSubmitSuccess'] = (res) => {
        countDown(res, () => {
          closePage();
          window.close();
        });
      };
      window['onSaveSuccess'] = (res) => {
        countDown(res, () => {
          closePage();
          window.close();
        });
      };
      window['onSubmitFail'] = (res) => {
        message.error((res && res.msg) || '提交表单失败，请稍后再试！');
      };
      window['onSaveFail'] = (res) => {
        message.error((res && res.msg) || '保存数据失败，请稍后再试！');
      };
    });
  }

  // 自动关闭弹窗
  const countDown = (res, onClose) => {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: '提示！',
      content: `${(res && res.msg) || '操作成功！'}\n请在我发起的流程里面查看, ${secondsToGo} 秒后自动关闭。`,
      afterClose: onClose,
    });
    const interval = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `${(res && res.msg) || '操作成功！'}\n请在我发起的流程里面查看, ${secondsToGo} 秒后自动关闭。`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
      modal.destroy();
    }, secondsToGo * 1000);
  };

  // 提交/保存业务流程数据
  async function startBizProcess(formData, status) {
    // 验证完成，直接触发。。。
    // 是业务表单，则执行业务保存方法
    // 触发表单内部事件进行保存数据
    // 判断是否存在动作

    const doSubmitResult = unref(formContainerRef).triggerEvent('doSubmitForm', {
      type: status == '2' ? 'SUBMIT' : 'SAVE',
      data: formData,
    });
    if (typeof doSubmitResult === 'undefined') {
      message.error('未找到动作【doSubmitForm】');
      closeSubmitLoading();
      // return Promise.reject('未找到动作【doSubmitForm】。\n提示：\n1、请在表单中添加【doSubmitForm】动作；\n2、该动作需要返回【Promise.resolve({success: true, msg: \'提交成功\', code: \'100\'})】对象。')
    } else if (doSubmitResult instanceof Promise) {
      doSubmitResult
        .then((res) => {
          if (res.success) {
            countDown(res, () => {
              // 发起流程成功后关闭
              closeSubmitLoading();
              // go("/process/launched");
              // window.close();
            });
          } else {
            message.error(res.msg);
            closeSubmitLoading();
          }
        })
        .catch((e) => {
          console.error('调用表单动作【doSubmitForm】出现异常！原因：\n', e);
          message.error(e.msg || '提交表单异常！');
          closeSubmitLoading();
        });
    } else {
      closeSubmitLoading();
      return Promise.reject(
        "调用自定义表单中的动作，需要返回【Promise.resolve({success: true, msg: '提交成功', code: ''})】",
      );
    }
  }

  // 关闭加载状态
  function closeSubmitLoading() {
    closeFullLoading();
  }

  // 如果有配置流程标题，则根据数据解析流程标题
  function genProcessNameExp(form) {
    let processNameExp = flowBaseInfo.value.processNameExp;
    if (processNameExp) {
      // 遍历变量对象，并使用eval执行替换
      Object.keys(form).forEach(function (key) {
        // 使用正则表达式匹配模板中的EL表达式
        let pattern = new RegExp('\\\$\\\{form\.' + key + '\\\}', 'g');
        // 执行替换
        processNameExp = processNameExp.replace(pattern, form[key]);
      });
      return processNameExp;
    }
    return '';
  }

  // 提交/保存自定义流程数据
  async function startCustomProcess(formData, status) {
    // 组装提交流程的数据结构
    const dataJson = { defaultFormDataVo: { code: getUrlValue(bizId) }, makFormDataVo: formData };
    const data = {
      dataJson: JSON.stringify(dataJson),
      formDraftStatus: status,
      modelKey: modelKey,
      processNameExp: genProcessNameExp(formData),
    };

    // return false;
    // 启动流程
    return startCustomFormProcess(data);
      /*.then((res) => {
        if (res.success) {
          countDown(res, () => {
            // 发起流程成功后关闭
            // go("/process/launched");
            closeSubmitLoading();
          });
        } else {
          message.error(res.msg);
          closeSubmitLoading();
        }
      })
      .catch((e) => {
        closeSubmitLoading();
      });*/
  }

  // 提交流程
  async function doSubmit(status) {
    try {
      changeSubmitLoading(true);
      console.log('获取表单类型：', unref(flowBaseInfo).formType);
      // 是否进行表单数据验证
      const validate = status === '2';
      const formData = await unref(formContainerRef).getFormData(validate);

      let res = null;
      // 数据获取成功后，判断表单类型，0自定义/1业务表单
      if (unref(flowBaseInfo).formType === 0) {
        res = await startCustomProcess(formData, status);
      } else if (unref(flowBaseInfo).formType === 1) {
        res = await startBizProcess(formData, status);
      } else {
        message.error('未知的表单类型！');
      }
      if(res){
        if (res.success) {
          changeSubmitLoading(false);
          message.success(res.msg);
          // 发起流程成功后关闭
          modalApi.close();
          // 关闭后跳转到我发起的流程页面
          // go({name: 'Launched'});
        } else {
          message.error(res.msg);
          changeSubmitLoading(false);
        }
      } else {
        message.error('提交表单失败！');
        changeSubmitLoading(false);
      }
    }catch (e){
      changeSubmitLoading(false);
    }
  }

  function doBack() {
    modalApi.close();
  }

  async function doSimulation() {
    unref(actionButtonsRef).setActionLoading(true);
    openFullLoading();
    await unref(formContainerRef)
      .getFormData(true)
      .then((res) => {
        openBpmnSimulatorModal(true, {
          modelKey: modelKey,
          formData: res,
          // procInstId: (!procInstId||procInstId==='0')?'':procInstId,    // 参数空时传过来的是0
          isUpdate: true,
        });
        setBpmnSimulatorProps({
          title: '模拟',
          bodyStyle: { padding: '0px', margin: '0px' },
          width: 900,
          height: 450,
          showOkBtn: false,
          showCancelBtn: true,
          cancelText: '关闭',
        });
      })
      .finally(() => {
        closeFullLoading();
        unref(actionButtonsRef).setActionLoading(false);
      });

    // 调用子组件内部的方法进行提交
    // unref(formContainerRef).submitFlowForm(status).then(res=>{
    //   setTimeout(()=>{
    //     closeFullLoading();
    //     saveBtnLoading.value = false;
    //   }, 100);
    // });
  }

  function handleAffixChange(affixed) {
    launchHeaderAfixed.value = affixed;
  }

  function doLaunch() {
    doSubmit('2');
  }

  function doSave() {
    doSubmit('1');
  }

  /*
    export default defineComponent({
      components: {
        BasicModal,
        EmpInfo,
        FormContainer,
        // BpmnSimulatorModal,
        Tag, Row, Col,
        FramePage,
        PageWrapper,Affix, Space,
        ActionButtons,
        BaseActionButtons,
        ProcessBackButton,
        ApprovalHistory
      },
      setup() {

        return {
          launchHeaderAfixed,
          handleAffixChange,
          registerBpmnSimulatorModal,
          formContainerRef,
          doSimulation: ()=>{ doSimulation() },
          doLaunch: ()=>{ doSubmit('2') },
          doSave: ()=>{ doSubmit('1') },
          flowBaseInfo,
          approvalHistoryVisible,
          approvalHistoryRef,
          actionButtonsRef,

        };
      },
    });*/
</script>

<style lang="scss">
  //@import '../index.scss';

  .process-launch {
    overflow: visible;

    .launch-header {
      &.affixed {
        //border-bottom: 1px solid var(--border-color);
        border-bottom: 2px solid #1890ff;

        launch-header-desc {
          display: none;
        }
      }

      width: 100%;
      padding: 16px;

      .launch-header-title {
        font-size: 20px;
        font-weight: bold;
      }

      .launch-header-desc {
        display: block;
        margin-top: 8px;
      }
    }
  }

  .content-container {
    height: auto;
  }

  .content-container,
  body,
  html {
    overflow: visible;
  }
</style>
