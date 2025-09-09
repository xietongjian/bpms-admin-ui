<template>
  <BasicModal class="w-full" >
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
            <Button @click="doSimulation" > 模拟 </Button>
            <Button type="primary" @click="doLaunch" :loading="submitLoading"> 提交</Button>
            <!--    <a-button @click="doSave" :loading="loading" > 存草稿 </a-button>-->
            <!--    <PopConfirmButton v-if="canStop" type="error" title="确定要作废该流程吗？" @confirm="doStop"  > 作废 </PopConfirmButton>-->
            <Button @click="doBack"> 取消</Button>
          </Space>
        </Col>
      </Row>
    </template>
    <Affix :offset-top="0" style="width: 100%" @change="handleAffixChange">
      <div class="launch-header" :class="{ affixed: launchHeaderAfixed }">
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

    <BpmnMocker ref="bpmnMockerRef" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref, onMounted, defineExpose, nextTick } from 'vue';
  import { Space, Button, Tag, Row, Col, Modal, Affix, message } from 'ant-design-vue';
  import FormContainer from '#/views/process/components/FormContainer.vue';
  // import BpmnSimulatorModal from '#/views/components/preview/bpmnSimulator/index.vue';

  // import ActionButtons from '#/views/process/components/ActionButtons.vue';
  import BaseActionButtons from '#/views/process/components/BaseActionButtons.vue';
  import {
    getProdModelInfoByModelKeyAndProcInstId,
    startCustomFormProcess,
  } from '#/api/process/process';
  import {useVbenModal} from '@vben/common-ui';
  import ApprovalHistory from '#/views/process/components/ApprovalHistory.vue';
  import {EmpInfo} from '#/views/components/EmpInfo';
  import { useUserStore } from '@vben/stores';
  import {changeURLPar} from "#/utils/domUtils";
  import BpmnMocker from '#/views/components/preview/bpmnMocker/index.vue';


  const emit = defineEmits(['success'])
  const userStore = useUserStore();

  const flowBaseInfo = ref({});
  const processBaseInfo = ref({});
  const formContainerRef = ref(), bpmnMockerRef = ref();
  const launchHeaderAfixed = ref(false);
  const submitLoading = ref(false);
  const actionButtonsRef = ref();
  const approvalHistoryVisible = ref(false);
  // launch/:modelKey/:procInstId/:bizId/:taskId/:formType
  // const userStore = useUserStore();

  function changeSubmitLoading(loading){
    modalApi.setState({loading: loading, confirmLoading: loading});
    submitLoading.value = loading;
  }

  function changeLaunchUrl(modelKey, businessKey) {
    let newUrl = changeURLPar(window.location.href, 'modelKey', modelKey);
    newUrl = changeURLPar(newUrl, 'viewType', 'launch');
    newUrl = changeURLPar(newUrl, 'businessKey', businessKey);
    window.history.replaceState({ path: newUrl }, '', newUrl);
  }

  const [BasicModal, modalApi] = useVbenModal({
    draggable: false,
    closable: false,
    footer: false,
    fullscreen: true,
    fullscreenButton: false,
    onCancel() {
      changeLaunchUrl('', '');
      modalApi.close();
    },
    async onOpenChange(isOpen: boolean) {
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
          await initData();
          modalApi.setState({loading: false, confirmLoading: false});
        }
      } else {
        changeLaunchUrl('', '');
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

  async function initData() {
    const {modelKey, procInstId, bizId} = unref(processBaseInfo);
    getProdModelInfoByModelKeyAndProcInstId({ modelKey, procInstId: procInstId || '' }).then(
      (res) => {
        flowBaseInfo.value = res;
        processBaseInfo.value.formType = res.formType;
        // 加载表单数据
        unref(formContainerRef).fetchFormData(unref(processBaseInfo));
      },
    );

    await nextTick();
    setWindowProperties({modelKey, procInstId, bizId});
  }

  function setWindowProperties(properties){
    const {modelKey, procInstId, bizId} = properties;
    window['currentUser'] = userStore.userInfo;
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
    modalApi.setState({loading: false, confirmLoading: false});
  }
  // 打开加载状态
  function openFullLoading() {
    modalApi.setState({loading: true, confirmLoading: true});
  }
  // 打开加载状态
  function closeFullLoading() {
    modalApi.setState({loading: false, confirmLoading: false});
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
    const dataJson = { defaultFormDataVo: { code: unref(processBaseInfo).bizId }, makFormDataVo: formData };
    const data = {
      dataJson: JSON.stringify(dataJson),
      formDraftStatus: status,
      modelKey: unref(processBaseInfo).modelKey,
      processNameExp: genProcessNameExp(formData),
    };

    // 启动流程
    return startCustomFormProcess(data);
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
        return;
      }
      const {success, msg, data} = res;
      if (success) {
        changeSubmitLoading(false);
        message.success(msg);
        // 发起流程成功后关闭
        modalApi.close();
        // 关闭后跳转到我发起的流程页面
        // go({name: 'Launched'});
        // 关闭后跳转到我发起的流程页面
        emit('success');
      } else {
        message.error(msg);
        console.error('表单发起失败，原因：' + msg);
        changeSubmitLoading(false);
      }
    } catch (e){
      console.error(e);
    } finally {
      changeSubmitLoading(false);
    }
  }

  function doBack() {
    modalApi.close();
  }

  async function doSimulation() {
    //unref(actionButtonsRef).setActionLoading(true);


    openFullLoading();
    await unref(formContainerRef)
      .getFormData(true)
      .then((res) => {
        bpmnMockerRef.value.setData({
            modelKey: unref(processBaseInfo).modelKey,
            formData: res
        }).open();
        /*openBpmnSimulatorModal(true, {
          modelKey: modelKey,
          formData: res,
          // procInstId: (!procInstId||procInstId==='0')?'':procInstId,    // 参数空时传过来的是0
          isUpdate: true,
        });
        setBpmnSimulatorProps({
          title: '模拟',
          draggable: false,
          bodyStyle: { padding: '0px', margin: '0px' },
          width: 900,
          height: 450,
          showOkBtn: false,
          showCancelBtn: true,
          cancelText: '关闭',
        });*/
      })
      .finally(() => {
        closeFullLoading();
        //unref(actionButtonsRef).setActionLoading(false);
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

  defineExpose(modalApi)

</script>

<style lang="scss">

</style>
