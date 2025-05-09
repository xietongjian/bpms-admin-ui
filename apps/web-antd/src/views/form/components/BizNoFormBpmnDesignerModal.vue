<template>
  <BasicModal content-class="designer-container p-0" >
    <template #title>
      <div class="w-full">
        <Row>
          <Col span="8" class="flex items-center">
            <span v-if="!modelBaseInfo.name">新建流程</span>
            <Tooltip :zIndex="10000" v-else placement="buttom">
              <template #title>
                {{ modelBaseInfo.name }}
              </template>
              编辑流程 -
              <TypographyText @click="doCopyContent(modelBaseInfo.name)">{{
                modelBaseInfo.name
              }}</TypographyText>
              -
              <TypographyText type="secondary" @click="doCopyContent(processModelKey)">{{
                processModelKey
              }}</TypographyText>
              -
              <Tag :color="finallyStatusStyle.color">{{ finallyStatusStyle.statusName || '草稿' }}</Tag>
            </Tooltip>
          </Col>
          <Col span="8">
            <Steps
              class="designer-steps"
              @change="handleStepChange"
              v-model:current="currentStepValue"
              size="small"
              type="navigation"
              :style="{ marginBottom: '0px', paddingTop: '0' }"
            >
              <Step :disabled="stepsDisabled.settingInfo">
                <template #title>
                  <Badge color="#f50" :dot="dataStatusIsDraft.settingInfo" :offset="[5, 0]">
                    基础配置
                  </Badge>
                </template>
              </Step>
              <Step :disabled="stepsDisabled.flowVariable">
                <template #title>
                  <Badge color="#f50" :offset="[5, 0]"> 变量设置 </Badge>
                </template>
              </Step>
              <Step :disabled="stepsDisabled.bpmnDesigner">
                <template #title>
                  <Badge color="#f50" :dot="dataStatusIsDraft.bpmnDesigner" :offset="[5, 0]">
                    设计流程
                  </Badge>
                </template>
              </Step>
            </Steps>
          </Col>
          <Col span="8" style="text-align: right">
            <Space>
              <Popconfirm v-access:code="PerPrefix+PerEnum.PUBLISH" v-if="publishBtnVisibility" @confirm="handlePublish">
                <template #title>
                  <div style="max-width: 300px; word-wrap: break-word; white-space: break-spaces">
                    确定要发布【{{ modelBaseInfo.name }}】流程吗？
                  </div>
                </template>
                <Button color="success" :disabled="saveLoading">发布</Button>
              </Popconfirm>

              <Popconfirm
                v-if="designerStatus.finallyStatus === 3 && currentStepValue !== 4"
                @confirm="handleSave"
              >
                <template #title>
                  <div style="max-width: 300px; word-wrap: break-word; white-space: break-spaces">
                    该流程【{{ modelBaseInfo.name }}】已经发布，<br />修改后需要重新发布，请确认？
                  </div>
                </template>
                <Button type="primary" :disabled="saveLoading">保存</Button>
              </Popconfirm>
              <Button
                v-else-if="currentStepValue !== 4"
                type="primary"
                @click="handleSave"
                :loading="saveLoading"
              >
                保存
              </Button>

              <Button :disabled="currentStepValue === 0 || saveLoading" @click="handlePrev"
                >上一步</Button
              >
              <Button
                :disabled="currentStepValue > 1 || saveLoading"
                type="primary"
                @click="handleNext"
                >下一步</Button
              >
              <Button type="default" @click="handleClose">关闭</Button>
            </Space>
          </Col>
        </Row>
      </div>
    </template>
    <div class="w-full h-full">
      <!-- 基本配置 -->
      <div v-show="currentStepValue === 0" style="height: 100%">
        <ModelInfoSetting
          v-if="stepLoadStatus.settingInfo"
          :modelId="processModelId"
          ref="baseSettingRef"
          :form-type="formType"
          :category-code="categoryCode"
        />
      </div>

      <!-- 变量设置 -->
      <div v-show="currentStepValue === 1" style="height: 100%">
        <FlowVariableSetting
          v-if="stepLoadStatus.flowVariable"
          :modelId="processModelId"
          :modelKey="processModelKey"
          :modelName="modelBaseInfo.name"
          ref="flowVariableRef"
          :form-type="formType"
        />
      </div>

      <!-- 流程设计 -->
      <div v-show="currentStepValue === 2" style="height: 100%">
        <BpmnDesigner
          v-if="stepLoadStatus.bpmnDesigner"
          :modelId="processModelId"
          :modelKey="processModelKey"
          :modelName="processModelName"
          ref="bpmnDesignerFrameRef"
          @on-load-success="bpmnDesignerLoadSuccess"
        />
      </div>

      <!-- 发布成功提示 -->
      <div v-show="currentStepValue === 3">
        <Result status="success" title="发布成功" sub-title="流程已发布！">
          <template #extra>
            <Button key="continue" @click="handleContinueEdit"> 继续编辑 </Button>
            <Button key="back" type="primary" @click="handleClose"> 返回列表 </Button>
          </template>
        </Result>
      </div>
    </div>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { onMounted, ref, unref, computed, defineExpose } from 'vue';
  import BpmnDesigner from '#/views/components/process/BpmnDesigner.vue';
  // import { useProcessSettingStore } from '@/store/modules/processSetting';
  import {
    getByModelId,
    loadFormBpmnStatus,
    saveBpmnModel,
    validateBpmnModel,
    deployForm,
  } from '#/api/flowable/bpmn/modelInfo';
  import {
    Modal,
    Badge,
    Button,
    Space,
    Tooltip,
    Row,
    Col,
    Steps,
    Tag,
    Popconfirm,
    Result,
    message,
    TypographyText,
  } from 'ant-design-vue';
  import ModelInfoSetting from '#/views/form/components/ModelInfoSetting.vue';
  import FlowVariableSetting from '#/views/form/components/FlowVariableSetting.vue';
  import FormDesigner from '#/views/components/form/formMaking/index.vue';
  import BpmnBaseInfo from '#/views/form/components/BpmnBaseInfo.vue';

  // import { usePermission } from '@/hooks/web/usePermission';
  import { PerEnum } from '#/enums/perEnum';
  // import { useMessage } from '@/hooks/web/useMessage';

  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import { useClipboard } from '@vueuse/core';
  import { getXMLAttribute, updateXMLAttribute } from '#/utils/domUtils';
  import {useProcessSettingStore} from "#/store";
  // import { useAppStore } from '@/store/modules/app';

  const {getDesignerCurrentStepValue, setDesignerStepObj} = useProcessSettingStore();

  // const appStore = useAppStore();
  const PerPrefix = 'Biz:';

  // 0保存成功，1保存中，2保存失败
  const autoSaveStatus = ref(-1);
  const { copy } = useClipboard({ legacy: true });

  // const { bpmnDesignerAutoSaveSwitch } = appStore.getSystemConfig;

  const Step = Steps.Step;
  const emit = defineEmits(['success']);
  const currentStepValue = ref<number>(0);
  const maxStepValue = ref<number>(0);
  const publishLastStepValue = ref<number>(0);
  // const processSettingStore = useProcessSettingStore();
  // const { hasPermission } = usePermission();

  const designerStatus = ref({
    formDesignerStatus: 0,
    bpmnDesignerStatus: 0,
    settingInfoStatus: 0,
    finallyStatus: 0,
    finallyStatusName: '',
  });

  const publishBtnVisibility = computed(() => {
    const { finallyStatus } = unref(designerStatus);
    return finallyStatus === 2;
  });

  const privilegeSn = computed(() => {
    return formType.value === 'custom' ? 'Custom' : 'Biz';
  });

  const finallyStatusStyle = computed(() => {
    const { finallyStatus, finallyStatusName } = unref(designerStatus);
    let color = 'gray';
    if (~~finallyStatus === 2) {
      color = '#2db7f5';
    } else if (~~finallyStatus === 3) {
      color = '#87d068';
    } else if (~~finallyStatus === 4) {
      color = '#f50';
    } else {
      color = 'gray';
    }
    return { color, statusName: finallyStatusName };
  });

  const processModelKey = computed(() => {
    return modelKey.value;
  });

  const bpmnDesignerLoadSuccess = () => {
    // iframe.contentWindow['autoCallback'] = function (xml) {
    //   // 开启并且流程状态 不等于 已发布
    //   if (bpmnDesignerAutoSaveSwitch == 1 && unref(designerStatus).finallyStatus !== 3) {
    //     autoSaveHandle();
    //   }
    // };
  };

  // const { message, createConfirm } = useMessage();
  const modelId = ref('');
  const modelKey = ref('');
  // formType值：custom/biz/bizNoForm
  const formType = ref('');
  const categoryCode = ref('');
  const processInfoDisabled = ref<boolean>(true);
  const bpmnDesignerFrameRef = ref();
  const saveLoading = ref(false);

  const processModelId = ref<string>('');
  // const processModelKey = ref<string>('');
  const processModelName = ref<string>('');
  const modelBaseInfo = ref<Record<string, any>>({});
  const formDesignerRef = ref();
  const baseSettingRef = ref();
  const flowVariableRef = ref();

  // 是否为草稿状态
  const dataStatusIsDraft = ref({
    bpmnDesigner: false,
    settingInfo: false,
    flowVariable: false,
    finallyStatus: false,
  });
  // 是否已加载状态
  const stepLoadStatus = ref({
    bpmnDesigner: false,
    settingInfo: false,
    flowVariable: false,
  });
  // 是否要禁用状态
  const stepsDisabled = ref({
    bpmnDesigner: true,
    settingInfo: true,
    flowVariable: false,
  });

  async function initData(params) {
    // 从缓存中获取当前编辑的步骤
    const currentStep = getDesignerCurrentStepValue(params.modelId);
    currentStepValue.value = currentStep;
    saveLoading.value = false;
    maxStepValue.value = params.formType === 'bizNoForm' ? 2 : 3;

    modelKey.value = params.modelKey;
    // formType: custom/biz
    formType.value = params.formType;
    processModelId.value = params.modelId;
    modelId.value = params.modelId;
    categoryCode.value = params.categoryCode;

    // 如果是新增
    if (!params.modelId) {
      stepsDisabled.value = { bpmnDesigner: true, settingInfo: false, flowVariable: true };
    } else {
      stepsDisabled.value = { bpmnDesigner: false, settingInfo: false, flowVariable: false };
    }
    refreshStatus();
    autoSaveStatus.value = -1;
    stepLoadStatus.value = {
      settingInfo: currentStep === 0,
      flowVariable: currentStep === 1,
      bpmnDesigner: currentStep === 2,
    };
    if (params.modelId) {
      try {
        const res = await getByModelId(params.modelId);
        modelBaseInfo.value = res;
        processModelName.value = res.name;
      } catch (e) {
        console.error('通过ModelId查询modelInfo失败！');
      }
    }
    modelBaseInfo.value = {};
  }

  const [BasicModal, modalApi] = useVbenModal({
    fullscreen: true,
    fullscreenButton: false,
    draggable: false,
    closable: false,
    footer: false,
    onCancel() {
      modalApi.close();
    },
    onClosed() {
      dataStatusIsDraft.value = {
        formDesigner: false,
        bpmnDesigner: false,
        settingInfo: false,
        finallyStatus: false,
      };
      emit('success');
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        initData(values);
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

  function changeLoading(loading) {
    modalApi.setState({loading: loading, confirmLoading: loading});
  }

  function publish(modelKey) {
    changeLoading(true);
    saveLoading.value = true;
    deployForm({ modelKey, formType: unref(formType) })
      .then((res) => {
        const { data } = res;
        if (data.success) {
          message.success({ content: data.msg, style: { marginTop: '40px' } });
          publishLastStepValue.value = currentStepValue.value;
          currentStepValue.value = 3;
        } else {
          message.error({ content: data.msg, style: { marginTop: '40px' } });
        }
        saveLoading.value = false;
        refreshStatus();
      })
      .finally(() => {
        saveLoading.value = false;
        changeLoading(false);
      });
  }

  function handleContinueEdit() {
    currentStepValue.value = publishLastStepValue.value;
  }

  function handlePublish() {
    if (modelBaseInfo.value) {
      publish(unref(processModelKey));
    }
  }

  const getBpmnModelXml = () => {
    return bpmnDesignerFrameRef.value.getBpmnXml().then((res) => {
      return Promise.resolve(res);
    });
  };
  const getIssuesMap = () => {
    return bpmnDesignerFrameRef.value.getIssuesMap();
  };

  async function handleSave() {
    if (currentStepValue.value === 0) {
      saveBaseInfo();
    }
    if (currentStepValue.value === 1) {
      saveFlowVariable();
    }
    if (currentStepValue.value === 2) {
      const issues = getIssuesMap();
      const errorLen = Object.keys(issues).length;
      const {xml} = await getBpmnModelXml();
      if (errorLen > 0) {
        Modal.confirm({
          iconType: 'warning',
          title: '温馨提示',
          content: `目前流程图存在 ${errorLen} 个错误, 确定要保存吗？`,
          onOk: () => {
            saveBpmnModelInfo(xml);
          },
          onCancel: () => {
            changeLoading(false);
            saveLoading.value = false;
          },
        });
      } else {
        await saveBpmnModelInfo(xml);
      }
    }
    refreshStatus();
  }

  const saveBaseInfo = () => {
    saveLoading.value = true;
    return baseSettingRef.value
      .handleSubmit()
      .then((res) => {
        debugger;
        modelBaseInfo.value.name = res.name;
        processModelId.value = res.modelId;
        processModelName.value = res.name;
        modelId.value = res.modelId;
        modelKey.value = res.modelKey;
        refreshStatus();
        saveLoading.value = false;
        return Promise.resolve(res);
      })
      .catch((e) => {
        console.error(e);
        saveLoading.value = false;
        return Promise.reject(e);
      });
  };

  const saveFlowVariable = () => {
    saveLoading.value = true;
    return flowVariableRef.value
      .handleSubmit()
      .then((res) => {
        saveLoading.value = false;
        if (res) {
          return Promise.resolve(true);
        } else {
          return Promise.reject(false);
        }
      })
      .catch((e) => {
        console.error(e);
        saveLoading.value = false;
        return Promise.reject(false);
      });
  };

  /**
   * 流程ID和名称替换
   * @param modelXml
   */
  const validXmlModelKey = (modelXml) => {
    const processNode = getXMLAttribute(modelXml, 'process', 'id');
    if (processNode) {
      // 如果发现xml文件中modelKey与当前修改的不一致则替换
      if (processNode.value !== unref(modelKey)) {
        let resultXml = updateXMLAttribute(modelXml, 'process', 'id', unref(modelKey));
        resultXml = updateXMLAttribute(
          resultXml,
          'definitions',
          'id',
          `Definitions_${unref(modelKey)}`,
        );
        resultXml = updateXMLAttribute(
          resultXml,
          'process',
          'name',
          unref(modelBaseInfo).modelName,
        );
        modelXml = resultXml;
      }
    } else {
      const bpmnProcessNode = getXMLAttribute(modelXml, 'bpmn:process', 'id');
      // 如果发现xml文件中modelKey与当前修改的不一致则替换
      if (bpmnProcessNode && bpmnProcessNode.value !== unref(modelKey)) {
        let resultXml = updateXMLAttribute(modelXml, 'bpmn:process', 'id', unref(modelKey));
        resultXml = updateXMLAttribute(
          resultXml,
          'bpmn:definitions',
          'id',
          `Definitions_${unref(modelKey)}`,
        );
        resultXml = updateXMLAttribute(
          resultXml,
          'bpmn:process',
          'name',
          unref(modelBaseInfo).modelName,
        );
        modelXml = resultXml;
      }
    }
    return modelXml;
  };

  const saveBpmnModelInfoBase = (data) => {
    data.modelXml = validXmlModelKey(data.modelXml);

    saveBpmnModel(data)
      .then((res) => {
        if (res.success) {
          message.success({ content: '保存成功！', style: { marginTop: '40px' } });
        } else {
          message.error(res.msg);
        }
        changeLoading(false);
        saveLoading.value = false;
        refreshStatus();
      })
      .catch((e) => {
        console.error(e);
        changeLoading(false);
        saveLoading.value = false;
      });
  };

  async function saveBpmnModelInfo (xml) {
    const params = {
      modelId: unref(processModelId),
      // categoryCode: unref(categoryCode),
      modelXml: xml,
    };
    saveLoading.value = true;
    changeLoading(true);
    try {
      const {success, data, msg} = await validateBpmnModel(params);
      if (success) {
        if (data) {
          // 如果验证成功直接保存
          await saveBpmnModelInfoBase(params);
        } else {
          Modal.confirm({
            iconType: 'warning',
            title: '温馨提示',
            content: `${msg}`,
            onOk: () => {
              saveBpmnModelInfoBase(params);
            },
            onCancel: () => {
              changeLoading(false);
              saveLoading.value = false;
            },
          });
        }
      } else {
        message.error(msg);
        changeLoading(false);
        saveLoading.value = false;
      }
    } catch (e) {
      message.error('调用验证Bpmn的XML时出现异常！' + e);
    } finally {
      saveLoading.value = false;
    }
  }

  if (modelId.value) {
    // 修改可用状态
    processInfoDisabled.value = false;
  }

  function handleStepChange(current) {
    if (current === 0) {
      stepLoadStatus.value.settingInfo = true;
      stepsDisabled.value.settingInfo = false;
    }
    if (current === 1) {
      stepLoadStatus.value.flowVariable = true;
      stepsDisabled.value.flowVariable = false;
    }
    if (current === 2) {
      stepLoadStatus.value.bpmnDesigner = true;
      stepsDisabled.value.bpmnDesigner = false;
    }

    setStepStore(current);
  }

  // 设置操作步骤缓存
  function setStepStore(current) {
    if (unref(processModelId)) {
      const stepSettingObj = Object.assign({});
      stepSettingObj[`modelId_${unref(processModelId)}`] = current;
      // processSettingStore.setDesignerStepObj(stepSettingObj);
      setDesignerStepObj(stepSettingObj);
    }
  }

  function handleClose() {
    modalApi.close();

    // closeModal();
    // dataStatusIsDraft.value = {
    //   bpmnDesigner: false,
    //   settingInfo: false,
    //   finallyStatus: false,
    // };
    // emit('success');
  }

  // 加载三个步骤的状态
  function refreshStatus() {
    if (!unref(processModelId)) {
      designerStatus.value = {
        bpmnDesignerStatus: 0,
        settingInfoStatus: 0,
        finallyStatus: 0,
      };
      dataStatusIsDraft.value = {
        bpmnDesigner: true,
        settingInfo: true,
        finallyStatus: true,
      };
      return;
    }
    // 如果为草稿状态
    loadFormBpmnStatus({ modelId: unref(processModelId), formType: unref(formType) }).then(
      (res) => {
        designerStatus.value = res;
        dataStatusIsDraft.value = {
          bpmnDesigner: res.bpmnDesignerStatus === 1,
          settingInfo: res.settingInfoStatus === 1,
          finallyStatus: res.finallyStatus === 1,
        };
      },
    );
  }

  async function handleNext () {
    if (unref(designerStatus).finallyStatus === 3) {
      unref(currentStepValue) <= unref(maxStepValue) && currentStepValue.value++;
      handleStepChange(unref(currentStepValue));
      return;
    }
    if (unref(currentStepValue) === 0) {
      saveBaseInfo().then(() => {
        unref(currentStepValue) <= unref(maxStepValue) && currentStepValue.value++;
        handleStepChange(unref(currentStepValue));
      });
      return;
    }
    if (unref(currentStepValue) === 1) {
      saveFlowVariable().then(() => {
        unref(currentStepValue) <= unref(maxStepValue) && currentStepValue.value++;
        handleStepChange(unref(currentStepValue));
      });
      return;
    }
    if (unref(currentStepValue) === 2) {
      const {xml} = await getBpmnModelXml();
      await saveBpmnModelInfo(xml);
      unref(currentStepValue) <= unref(maxStepValue) && currentStepValue.value++;
      handleStepChange(unref(currentStepValue));
      return;
    }
    unref(currentStepValue) <= unref(maxStepValue) && currentStepValue.value++;
    handleStepChange(unref(currentStepValue));
  }

  const handlePrev = () => {
    // 如果已发布后 - 返回上一步则跳转到发布前的那个步骤
    if (unref(currentStepValue) === unref(maxStepValue) + 1) {
      currentStepValue.value = unref(publishLastStepValue);
    } else {
      currentStepValue.value --;
    }
    handleStepChange(unref(currentStepValue));
  };

  function handleOpenChange(flag) {
    if (!flag) {
      processModelId.value = '';
      processModelName.value = '';
      modelKey.value = '';
    }
  }

  function doCopyContent(content: string) {
    copy(content);
    message.success('已拷贝到剪切板！');
  }
  defineExpose(modalApi);
</script>
<style lang="scss">
  .form-designer {
    .ant-tabs-content {
      height: 100%;
    }
  }
  .designer-container {
    > .ant-modal {
      > .ant-modal-content {
        > .ant-modal-header {
          cursor: default !important;
        }
      }
      > div[aria-hidden='true'] {
        display: none !important;
      }
    }
    .ant-modal-content {
      .ant-modal-header {
        margin-bottom: 0;

        .designer-steps {
          .ant-steps-item-title {
            overflow: visible;
          }
        }
      }
      .ant-modal-body {
        .scroll-container {
          padding-top: 0;
        }
      }
      .scrollbar.scroll-container {
        padding: 0;
      }
      .scroll-container .scrollbar__wrap {
        margin-bottom: 0 !important;
      }
    }
  }
</style>
