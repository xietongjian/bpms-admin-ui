<template>
  <BasicModal
    content-class="designer-container p-0"
    :footer="null"
    v-bind="$attrs"
    @register="registerModal"
    @open-change="handleOpenChange"
  >
    <template #title>
      <div class="w-full">
        <Row>
          <Col span="8" class="flex items-center">
            <span v-if="!modelBaseInfo.name">新建流程</span>
            <Tooltip v-else placement="leftBottom">
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
              <Tag :color="finallyStatusStyle.color">{{ finallyStatusStyle.statusName }}</Tag>
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
              <Step v-if="hideFormDesigner" :disabled="stepsDisabled.formDesigner">
                <template #title>
                  <Badge color="#f50" :dot="dataStatusIsDraft.formDesigner" :offset="[5, 0]">
                    流程配置
                  </Badge>
                </template>
              </Step>
              <Step v-else :disabled="stepsDisabled.formDesigner">
                <template #title>
                  <Badge color="#f50" :dot="dataStatusIsDraft.formDesigner" :offset="[5, 0]">
                    设计表单
                  </Badge>
                </template>
              </Step>
              <Step :disabled="stepsDisabled.bpmnDesigner">
                <template #title>
                  <Badge color="#f50" :dot="dataStatusIsDraft.bpmnDesigner" :offset="[5, 0]">
                    设计流程
                  </Badge>
                </template>
              </Step>
              <Step :disabled="stepsDisabled.settingInfo">
                <template #title>
                  <Badge color="#f50" :dot="dataStatusIsDraft.settingInfo" :offset="[5, 0]">
                    基础配置
                  </Badge>
                </template>
              </Step>
            </Steps>
          </Col>
          <Col span="8" style="text-align: right">
            <Space>
              <Authority :value="privilegeSn + ':' + PerEnum.PUBLISH">
                <Popconfirm v-if="publishBtnVisibility" @confirm="handlePublish">
                  <template #title>
                    <div style="max-width: 300px; word-wrap: break-word; white-space: break-spaces">
                      确定要发布【{{ modelBaseInfo.name }}】流程吗？
                    </div>
                  </template>
                  <a-button color="success" :disabled="saveLoading">发布</a-button>
                </Popconfirm>
              </Authority>

              <Tag
                v-if="
                  bpmnDesignerAutoSaveSwitch == '1' &&
                  autoSaveStatus !== -1 &&
                  currentStepValue === 1 &&
                  designerStatus.finallyStatus !== 3
                "
                :color="
                  autoSaveStatus === 1 ? 'processing' : autoSaveStatus === 0 ? 'success' : 'error'
                "
              >
                <span v-if="autoSaveStatus === 1">正在保存...</span>
                <span v-if="autoSaveStatus === 0">保存成功</span>
                <span v-if="autoSaveStatus === 2">保存失败</span>
              </Tag>

              <Popconfirm
                v-if="designerStatus.finallyStatus === 3 && currentStepValue !== 3"
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
                v-else-if="currentStepValue !== 3"
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
      <!-- 表单设计 -->
      <div v-if="hideFormDesigner" v-show="currentStepValue === 0" class="h-full">
        <BpmnBaseInfo
          :id="modelId"
          ref="formDesignerRef"
          v-if="stepLoadStatus.formDesigner"
          :form-type="formType"
          :model-key="modelKey"
          :category-code="categoryCode"
        />
      </div>
      <div v-else v-show="currentStepValue === 0" class="h-full">
        <FormDesigner
          :id="modelId"
          ref="formDesignerRef"
          v-if="stepLoadStatus.formDesigner"
          :form-type="formType"
          :model-key="modelKey"
          :category-code="categoryCode"
        />
      </div>

      <!-- 流程设计 -->
      <div v-show="currentStepValue === 1" class="h-full">
        <BpmnDesigner
          v-if="stepLoadStatus.bpmnDesigner"
          :modelId="processModelId"
          :modelKey="processModelKey"
          :modelName="processModelName"
          ref="bpmnDesignerFrameRef"
          @on-load-success="bpmnDesignerLoadSuccess"
        />
      </div>

      <!-- 基本配置 -->
      <div v-show="currentStepValue === 2" class="h-full">
        <ModelInfoSetting
          v-if="stepLoadStatus.settingInfo"
          :modelId="processModelId"
          ref="baseSettingRef"
          :form-type="formType"
        />
      </div>

      <!-- 发布成功提示 -->
      <div v-show="currentStepValue === 3">
        <Result status="success" title="发布成功" sub-title="流程已发布！">
          <template #extra>
            <a-button key="continue" @click="handleContinueEdit"> 继续编辑 </a-button>
            <a-button key="back" type="primary" @click="handleClose"> 返回列表 </a-button>
          </template>
        </Result>
      </div>
    </div>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { onMounted, ref, unref, computed, defineExpose } from 'vue';
  import BpmnDesigner from '#/views/components/process/BpmnDesigner.vue';
  import { useProcessSettingStore } from '#/store/processSetting';
  import {
    getByModelId,
    loadFormBpmnStatus,
    saveBpmnModel,
    validateBpmnModel,
    deployForm,
  } from '#/api/flowable/bpmn/modelInfo';
  import {
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
  import FormDesigner from '#/views/components/form/formMaking/index.vue';
  import BpmnBaseInfo from '#/views/form/components/BpmnBaseInfo.vue';
  import {useAccess} from '@vben/access';

  import { PerEnum } from '#/enums/perEnum';

  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  // import { copyText } from '#/utils/copyTextToClipboard';
  import { getXMLAttribute, updateXMLAttribute } from '#/utils/domUtils';
  // import { useAppStore } from '@/store/modules/app';
  const {hasAccessByCodes} = useAccess();


  // const appStore = useAppStore();

  // 0保存成功，1保存中，2保存失败
  const autoSaveStatus = ref(-1);

  // const { bpmnDesignerAutoSaveSwitch } = appStore.getSystemConfig;

  const Step = Steps.Step;
  const emit = defineEmits(['success']);
  const currentStepValue = ref<number>(0);
  const publishLastStepValue = ref<number>(0);
  const processSettingStore = useProcessSettingStore();
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

  const hideFormDesigner = computed(() => {
    return (
      privilegeSn.value === 'Biz' && !hasAccessByCodes([`${privilegeSn.value}:${PerEnum.FORM_EDIT}`])
    );
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

  // const { createMessage, createConfirm } = useMessage();
  const modelId = ref('');
  const modelKey = ref('');
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

  // 是否为草稿状态
  const dataStatusIsDraft = ref({
    formDesigner: false,
    bpmnDesigner: false,
    settingInfo: false,
    finallyStatus: false,
  });
  // 是否已加载状态
  const stepLoadStatus = ref({
    formDesigner: false,
    bpmnDesigner: false,
    settingInfo: false,
  });
  // 是否要禁用状态
  const stepsDisabled = ref({
    formDesigner: false,
    bpmnDesigner: true,
    settingInfo: true,
  });

  /*const [registerModal, { changeLoading, closeModal }] = useModalInner(async (data) => {
    // 从缓存中获取当前编辑的步骤
    const currentStep = processSettingStore.getDesignerCurrentStepValue(data.modelId);
    currentStepValue.value = currentStep;
    saveLoading.value = false;

    modelKey.value = data.modelKey;
    // formType: custom/biz
    formType.value = data.formType;
    processModelId.value = data.modelId;
    modelId.value = data.modelId;
    categoryCode.value = data.categoryCode;

    // 如果是新增
    if (!data.modelId) {
      stepsDisabled.value = { formDesigner: false, bpmnDesigner: true, settingInfo: true };
    } else {
      stepsDisabled.value = { formDesigner: false, bpmnDesigner: false, settingInfo: false };
    }
    refreshStatus();
    autoSaveStatus.value = -1;
    stepLoadStatus.value = {
      formDesigner: currentStep === 0,
      bpmnDesigner: currentStep === 1,
      settingInfo: currentStep === 2,
    };
    if (data.modelId) {
      getByModelId(data.modelId)
        .then((res) => {
          modelBaseInfo.value = res;
          processModelName.value = res.name;
        })
        .catch(() => {
          console.error('通过ModelId查询modelInfo失败！');
        });
    }
    modelBaseInfo.value = {};
  });*/

  function initData(data) {
    // 从缓存中获取当前编辑的步骤
    const currentStep = processSettingStore?.getDesignerCurrentStepValue(data.modelId);
    currentStepValue.value = currentStep;
    saveLoading.value = false;

    modelKey.value = data.modelKey;
    // formType: custom/biz
    formType.value = data.formType;
    processModelId.value = data.modelId;
    modelId.value = data.modelId;
    categoryCode.value = data.categoryCode;

    // 如果是新增
    if (!data.modelId) {
      stepsDisabled.value = { formDesigner: false, bpmnDesigner: true, settingInfo: true };
    } else {
      stepsDisabled.value = { formDesigner: false, bpmnDesigner: false, settingInfo: false };
    }
    refreshStatus();
    autoSaveStatus.value = -1;
    stepLoadStatus.value = {
      formDesigner: currentStep === 0,
      bpmnDesigner: currentStep === 1,
      settingInfo: currentStep === 2,
    };
    if (data.modelId) {
      getByModelId(data.modelId)
          .then((res) => {
            modelBaseInfo.value = res;
            processModelName.value = res.name;
          })
          .catch(() => {
            console.error('通过ModelId查询modelInfo失败！');
          });
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

  // function autoSaveHandle() {
  //   getBpmnModelXml().then((res) => {
  //     const { xml } = res;
  //     const data = {
  //       modelId: unref(processModelId),
  //       // categoryCode: unref(categoryCode),
  //       modelXml: xml,
  //     };
  //     data.modelXml = validXmlModelKey(data.modelXml);
  //     autoSaveStatus.value = 1;
  //     saveBpmnModel(data)
  //       .then((res) => {
  //         if (res.success) {
  //           autoSaveStatus.value = 0;
  //         } else {
  //           autoSaveStatus.value = 2;
  //         }
  //         refreshStatus();
  //       })
  //       .catch((e) => {
  //         autoSaveStatus.value = 2;
  //       });
  //   });
  // }

  function handleSave() {
    if (currentStepValue.value === 0) {
      saveFormDesignerInfo();
    }
    if (currentStepValue.value === 1) {
      const issues = getIssuesMap();
      const errorLen = Object.keys(issues).length;
      getBpmnModelXml().then((res) => {
        if (errorLen > 0) {
          createConfirm({
            iconType: 'warning',
            title: '温馨提示',
            content: `目前流程图存在 ${errorLen} 个错误, 确定要保存吗？`,
            onOk: () => {
              saveBpmnModelInfo(res);
            },
            onCancel: () => {
              changeLoading(false);
              saveLoading.value = false;
            },
          });
        } else {
          saveBpmnModelInfo(res);
        }
      });
    }
    if (currentStepValue.value === 2) {
      saveBaseInfo();
    }
    refreshStatus();
  }

  const saveBaseInfo = () => {
    saveLoading.value = true;
    baseSettingRef.value
      .handleSubmit()
      .then(() => {
        saveLoading.value = false;
        refreshStatus();
      })
      .catch(() => {
        saveLoading.value = false;
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

  const saveFormDesignerInfo = () => {
    saveLoading.value = true;
    return formDesignerRef.value
      .handleSave()
      .then((res) => {
        modelBaseInfo.value.name = res.modelName;
        processModelId.value = res.modelId;
        processModelName.value = res.modelName;
        modelId.value = res.modelId;
        modelKey.value = res.modelKey;
        refreshStatus();
        saveLoading.value = false;
        return Promise.resolve(true);
      })
      .catch((e) => {
        console.error(e);
        // message.error(typeof e === 'object' ? JSON.stringify(e) : e);
        saveLoading.value = false;
        return Promise.reject(false);
      });
  };

  const saveBpmnModelInfo = (res) => {
    const { xml } = res;
    const data = {
      modelId: unref(processModelId),
      // categoryCode: unref(categoryCode),
      modelXml: xml,
    };
    saveLoading.value = true;
    changeLoading(true);
    validateBpmnModel(data)
      .then((res) => {
        if (res.success) {
          if (res.data) {
            // 如果验证成功直接保存
            saveBpmnModelInfoBase(data);
          } else {
            createConfirm({
              iconType: 'warning',
              title: '温馨提示',
              content: `${res.msg}`,
              onOk: () => {
                saveBpmnModelInfoBase(data);
              },
              onCancel: () => {
                changeLoading(false);
                saveLoading.value = false;
              },
            });
          }
        } else {
          message.error(res.msg);
          changeLoading(false);
          saveLoading.value = false;
        }
      })
      .catch((e) => {
        message.error('调用验证Bpmn的XML时出现异常！' + e);
        saveLoading.value = false;
      });
  };

  onMounted(() => {});

  if (modelId.value) {
    // 修改可用状态
    processInfoDisabled.value = false;
  }

  function handleStepChange(current) {
    if (current === 0) {
      stepLoadStatus.value.formDesigner = true;
      stepsDisabled.value.formDesigner = false;
    }
    if (current === 1) {
      stepLoadStatus.value.bpmnDesigner = true;
      stepsDisabled.value.bpmnDesigner = false;
    }
    if (current === 2) {
      stepLoadStatus.value.settingInfo = true;
      stepsDisabled.value.settingInfo = false;
    }
    setStepStore(current);
  }

  // 设置操作步骤缓存
  function setStepStore(current) {
    if (unref(processModelId)) {
      const stepSettingObj = Object.assign({});
      stepSettingObj[`modelId_${unref(processModelId)}`] = current;
      processSettingStore.setDesignerStepObj(stepSettingObj);
    }
  }

  function handleClose() {
    modalApi.close();
    dataStatusIsDraft.value = {
      formDesigner: false,
      bpmnDesigner: false,
      settingInfo: false,
      finallyStatus: false,
    };
    emit('success');
  }

  // 加载三个步骤的状态
  function refreshStatus() {
    if (!unref(processModelId)) {
      designerStatus.value = {
        formDesignerStatus: 0,
        bpmnDesignerStatus: 0,
        settingInfoStatus: 0,
        finallyStatus: 0,
      };
      dataStatusIsDraft.value = {
        formDesigner: true,
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
          formDesigner: res.formDesignerStatus === 1,
          bpmnDesigner: res.bpmnDesignerStatus === 1,
          settingInfo: res.settingInfoStatus === 1,
          finallyStatus: res.finallyStatus === 1,
        };
      },
    );
  }

  const handleNext = () => {
    if (unref(designerStatus).finallyStatus === 3) {
      unref(currentStepValue) <= 2 && currentStepValue.value++;
      handleStepChange(unref(currentStepValue));
      return;
    }

    if (unref(currentStepValue) === 0) {
      saveFormDesignerInfo().then(() => {
        unref(currentStepValue) <= 2 && currentStepValue.value++;
        handleStepChange(unref(currentStepValue));
      });
      return;
    }
    if (unref(currentStepValue) === 1) {
      getBpmnModelXml().then((res) => {
        saveBpmnModelInfo(res);
        setTimeout(() => {
          unref(currentStepValue) <= 2 && currentStepValue.value++;
          handleStepChange(unref(currentStepValue));
        }, 300);
      });
      return;
    }
    unref(currentStepValue) <= 2 && currentStepValue.value++;
    handleStepChange(unref(currentStepValue));
  };
  const handlePrev = () => {
    // 如果已发布后 - 返回上一步则跳转到发布前的那个步骤
    if (unref(currentStepValue) === 3) {
      currentStepValue.value = unref(publishLastStepValue);
    } else {
      currentStepValue.value--;
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

  function doCopyContent(content) {
    copyText(content);
  }
  defineExpose({
    handleSave,
    ...modalApi
  });
</script>
<style lang="less">
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
