<template>
  <BasicModal v-bind="$attrs" @register="registerModal" wrap-class-name="process-form-full-modal ">
    <div>
      <div ref="allInfoId">
        <Tabs v-model:activeKey="activeViewKey" size="small">
          <TabPane key="viewForm" tab="查看表单">
            <div id="applyInfoId" class="w-full">
              <CollapseContainer>
                <template #title>
                  <div style="font-weight: bold; width: 200px">基本信息</div>
                </template>
                <Description @register="registerDescription" />
              </CollapseContainer>
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
              </CollapseContainer>
            </div>
          </TabPane>
          <TabPane key="viewFlow" tab="查看流程图">
            <div class="form-bpmn-container">
              <div class="containers" ref="container">
                <BpmnPresetViewer
                  v-if="formGeneratePropsInfo.procInstId || formGeneratePropsInfo.modelKey"
                  ref="presetViewer"
                  :theme="getTheme"
                  local="zh_CN"
                  translate-prefix="bpmn.information."
                  :procInstId="formGeneratePropsInfo.procInstId"
                  :modelKey="formGeneratePropsInfo.modelKey"
                  @viewer-init="handleViewerInit"
                />
                <div class="svg-controller">
                  <div class="scale-rate">
                    {{ Math.floor(defaultZoom * 10 * 10) + '%' }}
                  </div>
                  <Space>
                    <Button
                      title="缩小"
                      shape="circle"
                      size="small"
                      @click="processZoomOut()"
                      type="primary"
                    >
                      <MinusOutlined />
                    </Button>
                    <Button
                      :title="isFitView ? '按窗口大小显示' : '实际大小'"
                      shape="circle"
                      size="small"
                      @click="processFitContainer()"
                      type="primary"
                    >
                      <CompressOutlined v-if="isFitView" />
                      <ExpandOutlined v-else />
                    </Button>
                    <Button
                      title="放大"
                      shape="circle"
                      size="small"
                      @click="processZoomIn()"
                      type="primary"
                    >
                      <PlusOutlined />
                    </Button>
                  </Space>
                </div>
              </div>
            </div>
          </TabPane>
          <template #rightExtra>
            <!-- 转阅按钮的显示逻辑 -->
            <Space>
              <!-- 撤回功能逻辑 -->
              <Popconfirm
                v-if="processViewType === 'launched' && revokeVisible"
                :title="`确定要撤回流程吗？`"
                @confirm="handleRevoke" type="error" >
                <Button type="primary">
                  {{ revokeAuthPointer.name }}
                </Button>
              </Popconfirm>

              <Popconfirm
                v-if="
                  processViewType === 'launched' &&
                  currentApproverList &&
                  currentApproverList.length > 0
                "
                ok-text="确定"
                cancel-text="关闭"
                @confirm="handleReminder"
              >
                <template #title >
                  <div class="!text-md font-thin w-full flex flex-row gap-1">
                    向
                    <EmpInfo :zIndex="2001" v-for="item in currentApproverList" :no="item.code" :name="item.name" >
                      <span class="text-blue-500 flex flex-row gap-1">
                      {{item.name}}
                      </span>
                    </EmpInfo>
                    发送催办消息
                  </div>
                </template>
                <template #description>
                  <Textarea
                    v-model:value="reminderMsg"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    class="w-80"
                    placeholder="请输入催办信息"
                  />
                </template>
                <Button v-if="reminderAuthPointer != null" type="primary">{{reminderAuthPointer.name}}</Button>
              </Popconfirm>
              <Button v-if="turnReadAuthPointer != null" @click="handleTurnRead" type="default">{{turnReadAuthPointer.name}}</Button>
            </Space>
          </template>
        </Tabs>

        <CollapseContainer>
          <template #title>
            <div style="font-weight: bold; width: 200px">审批记录</div>
          </template>
          <ApproveHistoryList :historyList="historyList" :loading="approvalHistoryLoading" />
        </CollapseContainer>

        <div v-if="currentApproverList.length > 0" class="mt-2 desc-wrap">
          <CurrentApprover :approverList="currentApproverList" ></CurrentApprover>
        </div>
      </div>

      <div v-if="showOperation" class="h-[120px]"></div>

      <ApproveActionButtons
        ref="approveActionButtonsRef"
        v-if="showOperation"
        @change-loading="changeModalLoading"
        :authPoints="flowBaseInfo?.authPoints"
        :params="params"
        @approve-save-form="approveSaveFormData"
        @success="handleCloseModal"
      />
    </div>

    <template #insertFooter>
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
    </template>
    <ApproveSelectorPersonalModal
      @register="registerApproveSelectorPersonalModal"
      @success="loadCommentList"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref, reactive, onMounted, watch, computed, defineEmits, defineExpose, nextTick, shallowRef } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';

  import { Button, Dropdown, Menu, Space, Descriptions, Collapse, message,Tabs, Textarea, Popconfirm } from 'ant-design-vue';
  // import { CollapseContainer } from '@/components/Container';
  // import { Description, useDescription } from '@/components/Description/index';

  import ApproveActionButtons from './components/ApproveActionButtons.vue';
  import { getCommentInfosByProcessInstanceId } from '#/api/flowable/bpmn/modelInfo';
  import {
    getBizInfoVoByModelKey,
    getCustomFormInfoVoByModelKeyAndBusinessKey,
    getProdModelInfoByModelKeyAndProcInstId,
    getCurrTaskApplyersByProcessInstanceId, saveOrUpdateReadInfo,
  } from '#/api/flowoperation/processTask';
  import { GenerateForm } from '/public/static/form-making';
  import ApproveHistoryList from '#/views/components/process/ApproveHistoryList.vue';
  import CurrentApprover from '#/views/components/process/CurrentApprover.vue';
  import { getBizDataInfoByBusinessKeyAndModelKey } from '#/api/form/bizForm';
  import { getStartHeadInfoVoByProcessInstanceId } from '#/api/flowoperation/processInst';
  import { formBaseDataSchema } from './processForm.data';
  import printJS from 'print-js';
  import {
    CompressOutlined,
    DownOutlined,
    ExpandOutlined,
    MinusOutlined,
    PlusOutlined,
  } from '@ant-design/icons-vue';
  import { BpmnPresetViewer } from '#/assets/bpmn/viewer/lib/bpmn-viewer.js';
  // import { useDarkModeTheme } from '@/hooks/setting/useDarkModeTheme';
  import { updateCustomFormData } from '#/api/process/customForm';
  // import {useUserStore} from "@/store/modules/user";
  // import {useRequest} from "@vben/hooks";
  // import { useModal } from '@/components/Modal';
  import {checkRevokeProcess, revokeProcess, reminderTask} from "#/api/process/process";
  import ApproveSelectorPersonalModal from './components/ApproveSelectorPersonalModal.vue';
  import {EmpInfo} from '#/views/components/EmpInfo';
  import { useUserStore } from '@vben/stores';
  import { usePreferences } from '@vben/preferences';

  // 人员选择弹窗
  // const [registerApproveSelectorPersonalModal, { openModal: openApproveSelectorPersonalSelector, setModalProps: setApproveSelectorPersonalModalProps }] = useModal();
  const { isDark } = usePreferences();
  const getTheme = computed(() => (isDark.value ? 'dark' : 'light'));

  const reminderAuthPointer = ref(null);
  const turnReadAuthPointer = ref(null);
  const revokeAuthPointer = ref(null);
  const revokeVisible = ref<boolean>(false);

  const userStore = useUserStore();

  const currentApproverList = ref([]);

  const presetViewer = ref<any>();
  const MenuItem = Menu.Item;

  const emit = defineEmits(['reload', 'visible-change']);

  const TabPane = Tabs.TabPane;
  const bpmnViewer = shallowRef();

  // const getTheme = computed(() => (isDark.value ? 'dark' : 'light'));
  const defaultZoom = ref<number>(1);
  const isFitView = ref<boolean>(false);
  const approveActionButtonsRef = ref();
  const activeViewKey = ref('viewForm');
  const historyList = ref([]);
  const approvalHistoryLoading = ref(false);
  const baseFormInfo = ref({});
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
  const reminderMsg = ref('');
  const processViewType = ref('view');

  watch(activeViewKey, (val) => {
    if (val === 'viewFlow') {
      setTimeout(() => {
        processFitViewer();
      }, 500);
    }
  });

  const formGeneratePropsInfo = reactive({
    modelKey: '',
    businessKey: '',
    taskId: '',
    procInstId: '',
  });

  // const [registerDescription] = useDescription({
  //   data: baseFormInfo,
  //   bordered: false,
  //   schema: formBaseDataSchema,
  // });


  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          // formApi.setValues(values);
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      // await formApi.submitForm();
      // handleSubmit();
    },
  });

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
        revokeAuthPointer.value && checkRevokeProcess({processInstanceId: formGeneratePropsInfo.procInstId}).then(res => {
          if (res.success) {
            revokeVisible.value = res.data;
          } else {
            console.error("调用检测用户是否可以撤回的接口异常！");
          }
        });
      }, 50);
    }
  }

  // 催办
  async function handleReminder() {
    const {procInstId} = unref(params);
    const {success, msg} = await reminderTask({
      processInstanceId: procInstId,
      message: reminderMsg.value,
    });
    if (success) {
      reminderMsg.value = '';
      message.success(msg);
    } else {
      message.error(msg);
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

  /*useRequest(loadCurrTaskApplyersByBusinessKey, {
    refreshOnWindowFocus: true,
  });*/

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
    changeLoading(loading);
  }

  function handleViewerInit(v) {
    bpmnViewer.value = v;
  }

  function processFitContainer() {
    const canvas = bpmnViewer.value?.get('canvas');

    if (isFitView.value) {
      isFitView.value = false;
      canvas?.zoom('fit-viewport', { x: 0, y: 0 });
      defaultZoom.value = canvas?.zoom();
    } else {
      isFitView.value = true;
      defaultZoom.value = 1;
      canvas?.zoom('fit-viewport', { x: 0, y: 0 });
      canvas?.zoom(defaultZoom.value);
    }
  }
  function processFitViewer() {
    setTimeout(() => {
      isFitView.value = true;
      const canvas = bpmnViewer.value?.get('canvas');
      canvas.zoom(defaultZoom.value);
      canvas.zoom('fit-viewport', { x: 0, y: 0 });
      defaultZoom.value = canvas.zoom();
    }, 100);
  }

  function processZoomIn(zoomStep = 0.1) {
    let newZoom = Math.floor(defaultZoom.value * 100 + zoomStep * 100) / 100;
    if (newZoom > 4) {
      newZoom = 4;
      // throw new Error("[Process Designer Warn ]: The zoom ratio cannot be greater than 4");
    }
    defaultZoom.value = newZoom;
    bpmnViewer.value?.get('canvas').zoom(defaultZoom.value);
  }

  function processZoomOut(zoomStep = 0.1) {
    let newZoom = Math.floor(defaultZoom.value * 100 - zoomStep * 100) / 100;
    if (newZoom < 0.2) {
      newZoom = 0.2;
      // throw new Error("[Process Designer Warn ]: The zoom ratio cannot be less than 0.2");
    }
    defaultZoom.value = newZoom;
    bpmnViewer.value?.get('canvas').zoom(defaultZoom.value);
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
   * 获取流程头信息
   */
  function getStartHeadInfoVo() {
    const { procInstId } = unref(params);
    getStartHeadInfoVoByProcessInstanceId({ procInstId }).then((res) => {
      const { starterInfo, createTime } = res;
      baseFormInfo.value = {
        personalCode: starterInfo?.userCode,
        personalName: starterInfo?.userName,
        positionName: starterInfo?.positionName,
        companyName: starterInfo?.companyName,
        deptName: starterInfo?.deptName,
        phoneNumber: starterInfo?.mobile,
        launchTime: createTime,
      };
    });
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

  defineExpose(modalApi)
</script>

<style lang="less">
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

<style lang="less">
  //@import '@/assets/bpmn/viewer/lib/style.css';
  .form-bpmn-container {
    padding: 0;
    position: relative;
    width: 100%;
    height: 400px;
    overflow: visible;
    .containers {
      &:hover {
        .svg-controller {
          top: 0px;
          opacity: 1;
          z-index: 9;
        }
      }
    }

    .svg-controller {
      z-index: 9999;
      text-align: center;
      position: absolute;
      top: -20px;
      opacity: 0;
      transition: 0.8s;
      margin: auto;
      width: 100%;

      .scale-rate {
        font-size: 14px;
        line-height: 20px;
      }
    }

    .svg-container {
      height: 100%;
      cursor: move;
    }
    g.layer-djs-grid-line rect {
      fill: transparent !important;
    }
    .bpmn-viewer__toolbar {
      .arco-btn-group {
        display: none;
      }
    }
  }
  .bjs-powered-by,
  .bjs-breadcrumbs {
    display: none;
  }
</style>
