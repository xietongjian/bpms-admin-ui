<template>
  <BasicDrawer content-class="py-0">
    <template #extra>
      <div>
        <Button
          @click="handleFullScreen"
          type="text"
          shape="circle"
          :icon="h(isFullScreen ? ShrinkOutlined : ArrowsAltOutlined)"
          class="mr-2" />
      </div>
    </template>
    <div class="h-full w-full flex flex-row">
      <div ref="allInfoId" class="h-full flex-1">
        <Tabs v-model:activeKey="activeViewKey" size="small" class="h-full" tabBarStyle="">
          <TabPane key="viewForm" tab="查看表单">
            <ProcessStatus
                class="text-lg absolute right-0 top-0"
                :status="'SPZ'"
                :status-name="'审批中'"
                type="icon"/>
            <div id="applyInfoId" class="w-full h-full">
              <Collapse size="small" collapsible="header" default-active-key="1" class="mb-2">
                <CollapsePanel key="1" header="基本信息">
                  <ProcessHeaderInfo :proc-inst-id="procInstInfo.procInstId"/>
                </CollapsePanel>
              </Collapse>

              <Collapse size="small" collapsible="header" default-active-key="1" class="mb-2">
                <CollapsePanel key="1" header="表单信息">
                  <ProcessFormInfo
                      :procInstId="procInstInfo?.procInstId"
                      :bizId="procInstInfo?.businessKey"
                      :taskId="procInstInfo?.taskId"
                      :modelKey="procInstInfo?.modelKey" />
                </CollapsePanel>
              </Collapse>

              <Collapse size="small" collapsible="header" default-active-key="1">
                <CollapsePanel key="1" header="审批信息">
                  <ProcessApproveHistoryInfo
                      :procInstId="procInstInfo?.procInstId"
                  />
                </CollapsePanel>
              </Collapse>
<!--
              <CollapseContainer>
                <template #title>
                  <div style="font-weight: bold; width: 200px">表单信息</div>
                </template>
                <div
                  v-if="formGeneratePropsInfo.modelKey"
                  class="generate-form-container"
                  style="height: auto"
                >
                  <GenerateForm
                    class="generateForm"
                    id="generateFormId"
                    ref="generateFormRef"
                    :edit="showOperation"
                    :data="jsonData"
                    :print-read="printRead"
                    style="min-height: 200px"
                  />
                  <div v-if="showErrorMsg" class="show-error-tip">{{ errorMsg }}</div>
                </div>
              </CollapseContainer>-->

              <div v-if="currentApproverList.length > 0" class="mt-2 desc-wrap">
                <CurrentApprover :approverList="currentApproverList" ></CurrentApprover>
              </div>
            </div>
          </TabPane>
          <TabPane key="viewFlow" tab="查看流程图">
            <div class="form-bpmn-container1 h-full">
              <BpmnPreviewContainer
                  :modelKey="procInstInfo.modelKey"
                  :procInstId="procInstInfo.procInstId"
                  ref="bpmnPreviewContainerRef"
              />
            </div>
          </TabPane>
          <template #rightExtra>
            <!-- 转阅按钮的显示逻辑 -->
            <Space>
              <Dropdown>
                <template #overlay>
                  <Menu @click="handlePrintClick">
                    <MenuItem key="printAll">打印全部</MenuItem>
                    <MenuItem key="printApplyInfo">打印申请单</MenuItem>
                    <MenuItem key="printApplyForm">打印表单</MenuItem>
                  </Menu>
                </template>
                <Button type="default" :loading="printBtnLoading">
                  打印表单
                  <DownOutlined />
                </Button>
              </Dropdown>
              <!-- 撤回功能逻辑 -->
              <Popconfirm
                v-if="processViewType === 'launched' && revokeVisible"
                :title="`确定要撤回流程吗？`"
                @confirm="handleRevoke" type="error" >
                <Button type="primary">
                  {{ revokeAuthPointer.name }}
                </Button>
              </Popconfirm>

              <ReminderAction
                  :proc-inst-id="procInstInfo?.procInstId"
                  :send-to-personal-list="currentApproverList" />

              <Button v-if="turnReadAuthPointer != null" @click="handleTurnRead" type="default">{{turnReadAuthPointer.name}}</Button>
            </Space>
          </template>
        </Tabs>
      </div>

      <div class="w-[400px]" v-if="procInstInfo?.showOperation && isFullScreen">
        <ApproveActionButtons
          ref="rightApproveActionButtonsRef"
          v-if="procInstInfo?.showOperation"
          @change-loading="changeModalLoading"
          :authPoints="flowBaseInfo?.authPoints"
          :params="params"
          @approve-save-form="approveSaveFormData"
          @success="handleCloseModal"
        />
      </div>
    </div>

    <ApproveSelectorPersonalModal
      @register="registerApproveSelectorPersonalModal"
      @success="loadCommentList"
    />
    <template #footer v-if="procInstInfo?.showOperation && !isFullScreen">
      <div class="flex-1 pb-2 pr-4">
        <ApproveActionButtons
          ref="footerApproveActionButtonsRef"
          v-if="procInstInfo?.showOperation"
          @change-loading="changeModalLoading"
          :authPoints="flowBaseInfo?.authPoints"
          :params="params"
          @approve-save-form="approveSaveFormData"
          @success="handleCloseModal"
        />
      </div>
    </template>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { h, ref, unref, reactive, onMounted, watch, computed, defineEmits, defineExpose, nextTick, shallowRef } from 'vue';
  import {useVbenModal, useVbenDrawer} from '@vben/common-ui';

  import {
    Button,
    Dropdown,
    Menu,
    Space,
    Descriptions,
    Collapse,
    message,
    Tabs,
    Textarea,
    Popconfirm,
    CollapsePanel
  } from 'ant-design-vue';

  import ApproveActionButtons from '#/views/components/preview/processFormPreview/components/ApproveActionButtons.vue';
  import { getCommentInfosByProcessInstanceId } from '#/api/flowable/bpmn/modelInfo';
  import {
    getBizInfoVoByModelKey,
    getCustomFormInfoVoByModelKeyAndBusinessKey,
    getProdModelInfoByModelKeyAndProcInstId,
    getCurrTaskApplyersByProcessInstanceId, saveOrUpdateReadInfo,
  } from '#/api/flowoperation/processTask';
  import CurrentApprover from '#/views/components/process/CurrentApprover.vue';
  import ProcessHeaderInfo from './components/ProcessHeaderInfo.vue';
  import { getBizDataInfoByBusinessKeyAndModelKey } from '#/api/form/bizForm';
  import printJS from 'print-js';
  import {
    DownOutlined,
    ArrowsAltOutlined,
    ShrinkOutlined,
  } from '@ant-design/icons-vue';
  import { updateCustomFormData } from '#/api/process/customForm';

  import {checkRevokeProcess, revokeProcess} from "#/api/process/process";
  import ApproveSelectorPersonalModal from '#/views/components/preview/processFormPreview/components/ApproveSelectorPersonalModal.vue';
  import { useUserStore } from '@vben/stores';
  import BpmnPreviewContainer from "#/views/components/preview/bpmnPreview/bpmnPreviewContainer.vue";
  import ProcessFormInfo from "#/views/components/preview/processFormPreview/components/ProcessFormInfo.vue";
  import ProcessApproveHistoryInfo from "#/views/components/preview/processFormPreview/components/ProcessApproveHistoryInfo.vue";
  import {ReminderAction, ProcessStatus} from "#/views/components/common";

  const reminderAuthPointer = ref(null);
  const turnReadAuthPointer = ref(null);
  const revokeAuthPointer = ref(null);
  const revokeVisible = ref<boolean>(false);

  const isFullScreen = ref(false);

  const userStore = useUserStore();

  const currentApproverList = ref([]);

  const MenuItem = Menu.Item;

  const emit = defineEmits(['reload', 'visible-change', 'on-close']);

  const TabPane = Tabs.TabPane;
  const rightApproveActionButtonsRef = ref();
  const footerApproveActionButtonsRef = ref();
  const activeViewKey = ref('viewForm');
  const historyList = ref([]);
  const approvalHistoryLoading = ref(false);
  const flowBaseInfo = ref({});
  const formType = ref(0);
  const params = ref({});
  const showOperation = ref(false);
  const formEditable = ref(false);
  const showBizFormData = ref(true);
  const jsonData = ref({});
  const generateFormRef = ref(null);
  const showErrorMsg = ref(false);
  const printRead = ref(false);
  const printBtnLoading = ref(false);
  const errorMsg = ref();
  const allInfoId = ref();
  const editFormFields = ref([]);
  const requiredFormFields = ref([]);
  const processViewType = ref('view');
  ///////////////////////////////////////
  const procInstInfo = ref({});

  watch(activeViewKey, (val) => {
    if (val === 'viewFlow') {
      setTimeout(() => {
        // processFitViewer();
      }, 500);
    }
  });

  const formGeneratePropsInfo = reactive({
    modelKey: '',
    businessKey: '',
    taskId: '',
    procInstId: '',
  });

  const [BasicDrawer, drawerApi] = useVbenDrawer({
    class: 'w-[1000px]',
    draggable: true,
    footer: false,
    footerClass: 'justify-start p-0',
    showCancelButton: false,
    showConfirmButton: false,
    onCancel() {
      drawerApi.close();
    },

    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = drawerApi.getData<Record<string, any>>();
        procInstInfo.value = values;
        showOperation.value = values?.showOperation

        if (values) {
          // formApi.setValues(values);
          drawerApi.setState({footer: values?.showOperation, loading: false, confirmLoading: false});
          // 初始化数据
          initData();
        }
      } else {
        emit('on-close');
      }
    },
    onConfirm() {
      // await formApi.submitForm();
      // handleSubmit();
    },
  });

  async function handleFullScreen() {
    drawerApi.setState({
      class: unref(isFullScreen) ? 'w-[1000px]': 'w-full',
    });

    if(showOperation.value){
      if(isFullScreen.value){
        const values = await rightApproveActionButtonsRef.value.getFormValues();
        isFullScreen.value = !isFullScreen.value;
        setTimeout(() => {
          footerApproveActionButtonsRef.value.setFormValues(values);
        }, 10);
      } else {
        const values = await footerApproveActionButtonsRef.value.getFormValues();
        isFullScreen.value = !isFullScreen.value;
        setTimeout(() => {
          rightApproveActionButtonsRef.value.setFormValues(values);
        }, 10);
      }
    }else {
      isFullScreen.value = !isFullScreen.value;
    }
  }

  async function initData(){
    // 设置任务为已读
    const {taskId, modelKey, procInstId, businessKey} = procInstInfo.value;
    try {
      params.value = { procInstId, taskId, modelKey, bizId: businessKey };

      // 设置任务为已读
      taskId && saveOrUpdateReadInfo({taskId, status: 1});
      // 查询流程基本信息
      flowBaseInfo.value = await getProdModelInfoByModelKeyAndProcInstId({
        modelKey,
        procInstId,
        taskId,
      });
      formType.value = flowBaseInfo.value?.formType;
      // 判断转阅按钮
      checkAuthPointer(flowBaseInfo.value?.authPoints);
    } catch (e) {
      flowBaseInfo.value = {};
      console.error('查询流程基本信息异常！' + e);
    }
  }

  /*const [registerModal, { setModalProps, changeLoading, closeModal }] = useModalInner(
    async (data) => {
      activeViewKey.value = 'viewForm';
      reminderMsg.value = '';
      setModalProps({
        width: 1100,
        minHeight: 500,
      });
      approvalHistoryLoading.value = true;
      const {
        viewType,
        allowsOperation,
        processInstanceId: procInstId,
        businessKey: bizId,
        taskId,
        processDefinitionKey: modelKey,
      } = data.record;
      viewType ? (processViewType.value = viewType) : (processViewType.value = 'view');

      // 是否有操作按钮
      if (allowsOperation === true) {
        showOperation.value = true;
      } else {
        showOperation.value = false;
      }

      params.value = { procInstId, bizId, taskId, modelKey };

      formGeneratePropsInfo.modelKey = modelKey;
      formGeneratePropsInfo.businessKey = bizId;
      formGeneratePropsInfo.taskId = taskId;
      formGeneratePropsInfo.procInstId = procInstId;

      try {
        // 设置任务为已读
        taskId && saveOrUpdateReadInfo({taskId, status: 1});
        // 查询流程基本信息
        const flowBaseInfoTemp = await getProdModelInfoByModelKeyAndProcInstId({
          modelKey,
          procInstId,
          taskId,
        });
        flowBaseInfo.value = flowBaseInfoTemp;
        formType.value = flowBaseInfoTemp.formType;
        // 判断转阅按钮
        checkAuthPointer(flowBaseInfoTemp.authPoints);
      } catch (e) {
        flowBaseInfo.value = {};
        console.error('查询流程基本信息异常！' + e);
      }

      loadCommentList();
      try {
        getStartHeadInfoVo();
        fetch();
        await nextTick();
        setTimeout(() => {
          processFitContainer();
        }, 500);
        approveActionButtonsRef.value?.resetApproveMsg();
        if(!showOperation.value) {
          loadCurrTaskApplyersByBusinessKey();
        } else {
          currentApproverList.value = [];
        }
      } catch (e) {
        console.error(e);
      } finally {
        changeLoading(false);
      }
    },
  );*/

  const currentApproverListLoading = ref(false);

  function loadCommentList() {
    const {procInstId} = unref(params);
    approvalHistoryLoading.value = true;

    getCommentInfosByProcessInstanceId({procInstId})
      .then((res) => {
        historyList.value = res;
      })
      .finally(() => {
        approvalHistoryLoading.value = false;
      });
  }

  function checkAuthPointer(authPoints) {
    const {procInstId} = unref(procInstInfo);
    if (authPoints) {
      setTimeout(() => {
        authPoints.forEach(item => {
          if (item.sn === 'turn_read') {
            turnReadAuthPointer.value = item;
          }
          if (item.sn === 'revoke') {
            revokeAuthPointer.value = item;
          }
          // 催办
          if (item.sn === 'reminder') {
            reminderAuthPointer.value = item;
          }
        });

        // 有撤回权限才进行检测
        revokeAuthPointer.value && checkRevokeProcess({processInstanceId: procInstId}).then(res => {
          if (res.success) {
            revokeVisible.value = res.data;
          } else {
            console.error("调用检测用户是否可以撤回的接口异常！");
          }
        });
      }, 50);
    }
  }

  /**
   * 撤回操作
   */
  async function handleRevoke() {
    const { procInstId, taskId } = unref(params);
    try {
      const {msg, success} = await revokeProcess({processInstanceId: procInstId, taskId});
      if (success) {
        message.success(msg);
        checkAuthPointer(flowBaseInfo.value?.authPoints);
        loadCommentList();
        if (!showOperation.value) {
          loadCurrTaskApplyersByBusinessKey();
        } else {
          currentApproverList.value = [];
        }
      } else {
        message.error(msg);
      }
    } catch (e) {
      console.error(e);
      message.error('撤回流程异常！' + e.message);
    }
  }

  function handleTurnRead(){
    const actionType = 'reviewTask';
    const multiple = true;
    const { procInstId, bizId, taskId, modelKey } = unref(params);
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

  async function loadCurrTaskApplyersByBusinessKey() {
    const { procInstId, bizId, taskId, modelKey } = unref(params);

    // 查询当前待办人
    currentApproverListLoading.value = true;
    procInstId && getCurrTaskApplyersByProcessInstanceId({procInstId}).then(res=>{
      currentApproverList.value = res||[];
      if(res){
        const { username } = userStore.getUserInfo;
        // 判断当前登录人是否在当前待办人列表里面
        const haveApprovePrivilege = res.some(item=>item.code === username);
        console.log('是否有权限审批', haveApprovePrivilege);
        // if(!haveApprovePrivilege){
        //   goBack('');
        // }
      } else {
        // goBack('');
      }
    }).finally(()=>{
      currentApproverListLoading.value = false;
    });
  }


  function handlePrintClick({ key }) {
    if (key === 'printAll') {
      handlePrintAllInfo('');
    } else if (key === 'printApplyInfo') {
      handlePrintAllInfo('applyInfoId');
    } else if (key === 'printApplyForm') {
      handlePrintAllInfo('generateFormId');
    }
  }

  function changeModalLoading(loading) {
    // changeLoading(loading);
  }

  function doPrint({ header, printable }) {
    printJS({
      printable: printable,
      type: 'html',
      header: header,
      documentTitle: header,
      headerStyle: 'text-align: center; padding-bottom: 20px;',
      maxWidth: 1500,
      targetStyles: ['*'],
    });
  }

  function handlePrintAllInfo(printable) {
    if (!printable) {
      printable = unref(allInfoId);
    }
    const { procInstName, name } = unref(flowBaseInfo);
    printRead.value = true;
    printBtnLoading.value = true;
    setTimeout(() => {
      doPrint({ header: procInstName || name, printable: printable });
    }, 800);
    setTimeout(() => {
      printRead.value = false;
      printBtnLoading.value = false;
    }, 1500);
  }

  /**
   * 加载业务表单结构及表单数据数据
   */
  function loadBizFormAndData() {
    const { procInstId, bizId, taskId, modelKey } = unref(params);
    getBizInfoVoByModelKey({
      modelKey,
      bizId: bizId === '0' ? '' : bizId,
      procInstId: procInstId === '0' ? '' : procInstId,
    }).then((res) => {
      const result = res.data;
      if (result.success) {
        if (result.data) {
          jsonData.value = JSON.parse(result.data.formJson);
          nextTick(() => {
            generateFormRef.value.refresh();
          });
          getBizDataInfoByBusinessKeyAndModelKey({
            modelKey,
            businessKey: bizId === '0' ? '' : bizId,
          }).then((formDataRes) => {
            nextTick(() => {
              if (formDataRes) {
                const { formData } = formDataRes;
                if (formData) {
                  generateFormRef.value.setData(JSON.parse(formData));
                } else {
                  showErrorMsg.value = true;
                  errorMsg.value = '该业务表单未存储表单数据，请确认！';
                }
              } else {
                showErrorMsg.value = true;
                errorMsg.value = '该业务表单未存储表单数据，请确认！';
              }
            });
          });
        } else {
          showErrorMsg.value = true;
          errorMsg.value = '未获取到表单结构数据，请确认！';
        }
      } else {
        message.error(result.msg);
      }
    });
  }

  /**
   * 加载自定义表单结构和数据
   */
  function loadCustomFormAndData() {
    const { procInstId, bizId, taskId, modelKey } = unref(params);
    showBizFormData.value = true;
    // 渲染自定义表单数据
    getCustomFormInfoVoByModelKeyAndBusinessKey({
      modelKey,
      businessKey: bizId === '0' ? '' : bizId,
      procInstId: procInstId === '0' ? '' : procInstId,
      taskId,
    }).then((res) => {
      const result = res.data;
      if (result.success) {
        const { formDatas, formInfo, itemList, activityFormItems } = result.data;
        jsonData.value = JSON.parse(formInfo.formJson);
        nextTick(() => {
          generateFormRef.value.refresh();
          generateFormRef.value.setData(formDatas);
          setFormPermission(activityFormItems, itemList);
        });
      } else {
        showErrorMsg.value = true;
        errorMsg.value = result.msg;
      }
    });
  }

  function setFormPermission(activityFormItems, itemList) {
    // if(path.indexOf('/process/approve') !== -1){
    //   // 如果是审批页，获取当前节点可编辑的项
    // }
    if (activityFormItems && activityFormItems.length > 0) {
      // if (path.indexOf('/process/launch') !== -1 || path.indexOf('/process/approve') !== -1) {
      //   formIsEdit.value = true;
      // }
      // operateType HIDE(0, "隐藏"), SHOW(1, "仅可见"), EDIT(2, "可编辑");
      const hideItems = activityFormItems.filter((item) => item.operateType === 0);
      const editItems = activityFormItems.filter(
        (item) => item.operateType === 2 || item.operateType === 3,
      );
      const requiredItems = activityFormItems.filter((item) => item.operateType === 3);
      if (hideItems) {
        const hideFields = hideItems.map((item) => item.fieldName);
        nextTick(() => {
          generateFormRef.value.hide(hideFields);
        });
      }

      // if (path.indexOf('/process/approve') !== -1) {
      //   // 如果是审批页，获取当前节点可编辑的项
      // }

      // 如果是发起页面不作操作
      const allItems = itemList.map((item) => item.makModel);

      // 如果是审批页，获取当前节点可编辑的项
      // 先把所有的字段设置成不可编辑
      // const allKeys = activityFormItems.map(item => item.fieldName);
      generateFormRef.value.disabled(allItems, true);

      if ((editItems && editItems.length > 0) || (requiredItems && requiredItems.length > 0)) {
        const editFields = editItems.map((item) => item.fieldName);
        const requiredFields = requiredItems.map((item) => item.fieldName);
        const requiredFieldLabels = requiredItems.map((item) => item.labelName);
        // 如果审批页面则不设置可编辑状态
        if (showOperation.value) {
          // 如果是审批页，获取当前节点可编辑的项
          editFormFields.value = [...editFields, ...requiredFields];

          generateFormRef.value.disabled([...editFields, ...requiredFields], false);
          // editFormFields.value = editFields;
          if (requiredFields && requiredFields.length > 0) {
            requiredFormFields.value = requiredFields;
            requiredItems.forEach(itm => {
              // 如果有必填项则设置必填
              generateFormRef.value.setOptions(itm.fieldName, {
                required: true,
              });
              generateFormRef.value.setRules(itm.fieldName, [
                {
                  required: true,
                  message: `请输入${itm.labelName}`,
                },
              ]);
            });
          }
        }
      }
    }
  }

  function fetch() {
    showErrorMsg.value = false;
    jsonData.value = {};
    if (formType.value === 1) {
      loadBizFormAndData();
    } else {
      loadCustomFormAndData();
    }
  }

  function handleCloseModal() {
    closeModal();
    emit('reload');
  }

  function validEventExists(eventName) {
    return unref(jsonData).config.eventScript.some((item) => item.name === eventName);
  }

  function getFormData(validate) {
    // 1草稿；2已发起流程
    // const validStatus = status == '2';
    return unref(generateFormRef)
      .getData(validate)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((e) => {
        if (typeof e === 'string') {
          formValidateMsg(e);
        }
        return Promise.reject(e);
      });
  }

  // 表单验证错误提示
  function formValidateMsg(msg) {
    message.warn(msg);
    const isError = document.querySelector('.fm-form .is-error');
    if (isError) {
      isError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function approveSaveFormData(callback) {
    debugger;
    return saveFormData()
      .then((res) => {
        console.log('》》》》》》》》》》》》》》》》》》》》保存表单数据结果：', res);
        callback(res);
      })
      .catch((e) => {
        callback(e);
        console.log('保存数据结果异常：', e);
      });
  }

  function saveFormData() {
    const { procInstId, bizId, taskId, modelKey } = unref(params);
    if (editFormFields.value.length === 0) {
      return Promise.resolve({
        success: true,
        msg: '没有可编辑的项，不需要保存数据！',
        code: '100',
      });
    }
    // 判断表单类型
    if (formType.value === 0) {
      return getFormData(true)
        .then((res) => {
          const formData = { defaultFormDataVo: { code: bizId }, makFormDataVo: res };
          const data = { dataJson: {}, procInstId: '', modelKey: '' };
          // 只保存可编辑的字段
          let tempFormData = {};
          editFormFields.value.forEach((item) => {
            tempFormData[item] = res[item];
          });
          formData.makFormDataVo = tempFormData;
          data.dataJson = JSON.stringify(formData);
          data.procInstId = procInstId;
          data.modelKey = modelKey;
          data.taskId = taskId;
          return updateCustomFormData(data).then((res) => {
            return Promise.resolve(res.data);
          });
        })
        .catch((e) => {
          return Promise.reject('表单验证失败' + e);
        });
    } else {
      // 如果是业务表单，则调用业务表单里面的方法-这里需指定方法名
      return getFormData(true)
        .then((res) => {
          const formData = { defaultFormDataVo: { bizId: bizId }, makFormDataVo: {} };
          const data = { dataJson: {}, procInstId: '', modelKey: '' };
          // 只保存可编辑的字段
          let tempFormData = {};
          editFormFields.value.forEach((item) => {
            tempFormData[item] = res[item];
          });
          formData.makFormDataVo = tempFormData;
          data.dataJson = formData;
          data.procInstId = procInstId;
          data.modelKey = modelKey;

          // 判断是否有doSaveForm事件
          const eventExists = validEventExists('doSaveForm');
          if (!eventExists) {
            message.error('未找到动作【doSaveForm】');
            return Promise.reject(
              "未找到动作【doSaveForm】。\n提示：\n1、请在表单中添加【doSaveForm】动作；\n2、该动作需要返回【Promise.resolve({success: true, msg: '保存成功', code: '100'})】对象。",
            );
          }
          const doSaveResult = unref(generateFormRef).triggerEvent('doSaveForm', data);
          if (doSaveResult instanceof Promise) {
            return doSaveResult;
          } else {
            return Promise.reject(
              "调用自定义表单中的动作，需要返回【Promise.resolve({success: true, msg: '提交成功', code: ''})】",
            );
          }
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    }
  }

  defineExpose(drawerApi)
</script>

<style lang="scss">
  .process-form-full-modal {
    .ant-modal {
      top: 0;
      padding-bottom: 0;
      margin: 0;
      .ant-modal-body {
        flex: 1;
        .scroll-container {
          padding-top: 0;
          padding-bottom: 0;
        }
      }
    }
    .ant-modal-content {
      display: flex;
      flex-direction: column;
    }

    .ant-modal-footer {
      padding: 6px 16px;
      margin-top: 0;
    }
  }
  .generate-form-container {
    position: relative;
    .show-error-tip {
      z-index: 9;
      width: 100%;
      top: 0;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      font-size: 24px;
      color: #ffbb00;
      text-align: center;
      line-height: 140px;
      &:after {
        width: 100%;
        top: 0;
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.1);
        height: 100%;
        z-index: 9999;
        -webkit-filter: blur(20px);
        filter: blur(20px);
        transform: scale(0.95);
        -webkit-transform: scale(0.95);
      }
    }
  }
</style>

<style lang="scss">

/* 设置Tabs组件的高度以适应父容器 */
.ant-tabs {
  height: 100%;
}

/* 如果需要调整标签栏的高度，可以通过修改下面的类 */
.ant-tabs-top .ant-tabs-nav {
  /* 根据需要调整标签栏的高度 */
  height: 50px;
}

/* 调整内容区域的高度 */
.ant-tabs-content {
  height: calc(100% - 10px);
  //padding-top: 50px; /* 与标签栏的高度相匹配 */
  overflow-y: auto;
}
</style>
