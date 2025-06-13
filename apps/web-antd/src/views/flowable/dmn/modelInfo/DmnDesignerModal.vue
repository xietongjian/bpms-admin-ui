<template>
  <BasicModal
      :footer="null"
      v-bind="$attrs"
      wrap-class-name="dmn-designer-container"
  >
    <template #title>
      <div class="w-full">
        <Row>
          <Col span="8">
            <span v-if="!baseModelInfo.id">
              新建{{ dmnMode == 0 ? '决策表' : '决策服务' }}
              <span v-if="baseModelInfo.name"> - {{ baseModelInfo.name }} </span>
            </span>
            <Tooltip v-else placement="leftBottom">
              <template #title>
                {{ baseModelInfo.name }}
              </template>
              编辑{{ dmnMode == 0 ? '决策表' : '决策服务' }}
              -
              <TypographyText @click="doCopyContent(baseModelInfo.name)">{{
                  baseModelInfo.name
                }}
              </TypographyText>
              -
              <TypographyText type="secondary" @click="doCopyContent(baseModelInfo.modelKey)">{{
                  baseModelInfo.modelKey
                }}
              </TypographyText>
              -
              <Tag :color="finallyStatusStyle.color">{{ finallyStatusStyle.statusName }}</Tag>
            </Tooltip>
          </Col>
          <Col span="8">
            <div class="w-[200px] m-auto" >
              <Steps
                  class="designer-steps"
                  @change="handleStepChange"
                  v-model:current="currentStepValue"
                  size="small"
                  type="navigation"
                  :style="{ marginBottom: '0px', paddingTop: '0' }"
              >
                <Step>
                  <template #title>
                    <Badge color="#f50" :offset="[5, 0]"> 决策设计</Badge>
                  </template>
                </Step>
                <!--
            <Step :disabled="stepsDisabled.settingInfo">
              <template #title>
                <Badge color="#f50" :dot="dataStatusIsDraft.settingInfo" :offset="[5, 0]">
                  基础配置
                </Badge>
              </template>
            </Step>-->
              </Steps>
            </div>
          </Col>
          <Col span="8" class="text-right">
            <Space>
              <Popconfirm v-access:code="PerPrefix+PerEnum.PUBLISH" v-if="publishBtnVisibility" @confirm="handlePublish">
                <template #title>
                  <div style="max-width: 300px; word-wrap: break-word; white-space: break-spaces">
                    确定要发布【{{ baseModelInfo.name }}】流程吗？
                  </div>
                </template>
                <Button color="success" :disabled="saveLoading">发布</Button>
              </Popconfirm>
              <Popconfirm
                  v-if="designerStatus.finallyStatus === 3 && currentStepValue !== 3"
                  @confirm="handleSaveDmnInfo"
              >
                <template #title>
                  <div style="max-width: 300px; word-wrap: break-word; white-space: break-spaces">
                    该决策【{{ baseModelInfo.name }}】已经发布，<br/>修改后需要重新发布，请确认？
                  </div>
                </template>
                <Button type="primary" :disabled="saveLoading">保存</Button>
              </Popconfirm>
              <Button
                  v-else-if="currentStepValue !== 3"
                  type="primary"
                  @click="handleSaveDmnInfo"
                  :loading="saveLoading"
              >
                保存
              </Button>
              <Button type="default" @click="handleClose">关闭</Button>
            </Space>
          </Col>
        </Row>
      </div>
    </template>
    <div class="flex flex-col h-full">
      <BasicForm/>
      <Divider style="margin: 0; padding: 0"/>
      <div class="flex-1 p-0">
        <!--<div style="position:absolute; top: 0;left:0; z-index: 999; padding-left: 20px" class="">
          <a-button type="primary" @click="handleSaveData">保存</a-button>
        </div>-->
<!--        <FramePage ref="dmnDesignerRef" :frameSrc="url" @on-load-success="handleLoadSuccess"/>-->
        <DmnDesigner ref="dmnDesignerRef" @on-load-success="handleLoadSuccess" />
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
import {ref, computed, nextTick, defineExpose, defineEmits, unref} from 'vue';
import {useVbenModal} from '@vben/common-ui';
import {useVbenForm} from '#/adapter/form';
import { useClipboard } from '@vueuse/core';

import {
  getByModelId,
  initDmnDiagram,
  publishDmn,
  saveOrUpdate,
} from '#/api/flowable/dmn/modelInfo';
import {checkEntityExist} from '#/api/flowable/bpmn/modelInfo';

import {dmnBaseFormSchema} from './modelInfo.data';
import {
  Modal,
  Row,
  Col,
  Steps,
  Divider,
  Button,
  Tooltip,
  TypographyText,
  Tag,
  Badge,
  Result,
  message,
  Space,
  Popconfirm,
} from 'ant-design-vue';
import {PerEnum} from '#/enums/perEnum';
import {updateXMLAttribute} from '#/utils/domUtils';
import {usePreferences} from '@vben/preferences';
import DmnDesigner from "#/views/components/process/DmnDesigner.vue";

const PerPrefix = 'Dmn:';
const {isDark} = usePreferences();
const {  copy } = useClipboard({ legacy: true });

const Step = Steps.Step;

const dmnDesignerRef = ref();
const url = ref<string>('');
const currentStepValue = ref<number>(0);
const saveLoading = ref(false);
const baseModelInfo = ref({});
const emit = defineEmits(['success']);
const dmnMode = ref(0);
const designerStatus = ref({
  formDesignerStatus: 0,
  bpmnDesignerStatus: 0,
  settingInfoStatus: 0,
  finallyStatus: 0,
  finallyStatusName: '',
});

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      // class: 'w-full',
    },
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: dmnBaseFormSchema,
  wrapperClass: 'grid-cols-4',
});

const publishBtnVisibility = computed(() => {
  const {finallyStatus} = unref(designerStatus);
  return finallyStatus === 2;
});

const finallyStatusStyle = computed(() => {
  const {finallyStatus, finallyStatusName} = unref(designerStatus);
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
  return {color, statusName: finallyStatusName};
});

function handleStepChange(current) {
  if (current === 0) {
    // stepLoadStatus.value.formDesigner = true;
    // stepsDisabled.value.formDesigner = false;
  }
  if (current === 1) {
    // stepLoadStatus.value.bpmnDesigner = true;
    // stepsDisabled.value.bpmnDesigner = false;
  }
  if (current === 2) {
    // stepLoadStatus.value.settingInfo = true;
    // stepsDisabled.value.settingInfo = false;
  }
}

const [BasicModal, modalApi] = useVbenModal({
  fullscreen: true,
  closable: false,
  draggable: false,
  fullscreenButton: false,
  showCancelButton: false,
  footer: false,
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const values = modalApi.getData<Record<string, any>>();
      if (values) {
          dmnMode.value = values.dmnType;

          formApi.setValues(values);
        modalApi.setState({loading: false, confirmLoading: false});
        url.value = '/static/dmn/designer/index.html?modelKey=' + (values.modelId || '');

      }
    }
  },
  onConfirm() {
    // await formApi.submitForm();
    // handleSubmit();
  },
});

// iframe加载成功回调
function handleLoadSuccess(frameWindow) {
  changeDesignerTheme(frameWindow);
  initFormData();
}

const changeDesignerTheme = (iframeWindow) => {
  // 获取当前框架主题
  if (iframeWindow) {
    if (isDark.value) {
        iframeWindow.contentDocument.body.setAttribute('arco-theme', 'dark');
    } else {
      iframeWindow.contentDocument.body.removeAttribute('arco-theme');
    }
  }
};

function hideViewDrdBtn(frameWindow) {
  if (!frameWindow) {
    return;
  }
  const viewDrdBtn = frameWindow.document.querySelector(
      '.dmn-full-designer .tjs-container .view-drd',
  );
  if (!viewDrdBtn) {
    return;
  }
  viewDrdBtn.style.display = 'none';
}

async function handleSaveDmnInfo() {
  saveLoading.value = true;
  modalApi.setState({loading: true, confirmLoading: true});

  try {
    const {valid} = await formApi.validate();
    if(!valid){
      return;
    }
    const values = await formApi.getValues();
    try {
      // 获取XML
      // const {xml} = await unref(dmnDesignerRef).frameRef.contentWindow.exportXML();
      const {xml} = await unref(dmnDesignerRef).getModelXml();

      // 如果决策表中没有hitPolicy="UNIQUE" 则添加该属性，默认为"UNIQUE"
      const resultXml = updateXMLAttribute(xml, 'decisionTable', 'hitPolicy', 'UNIQUE');

      values.modelXml = resultXml;
    } catch (e) {
      console.error(e);
      saveLoading.value = false;
    }
    if (!values.modelXml) {
      message.warn('未获取到XML。');
      return;
    }

    // 新建时-处理key和name
    if (!values.id) {
      values.modelXml = values.modelXml.replaceAll(/TEMP___KEY/gi, values.modelKey);
      values.modelXml = values.modelXml.replaceAll(/TEMP___NAME/gi, values.name);
    } else {
      values.modelXml = updateXMLAttribute(
          values.modelXml,
          'decisionService',
          'name',
          values.name,
      );
    }

    const {data, msg, success} = await saveOrUpdate(values);

    if (success && data) {
      const {modelId, id, status, statusName} = data;
        refreshModelStatus(modelId, status, statusName);

        formApi.setValues({
            modelId: modelId,
            id: id,
        });

        updateModelKeyValidate(id);
        message.success(msg);
        (await values.modelXml) &&
        unref(dmnDesignerRef).frameRef.contentWindow.dmnModeler.importXML(values.modelXml);
    } else {
        message.error(msg);
    }
  } catch (e) {
    console.error('表单验证失败！' + e);
    saveLoading.value = false;
  } finally {
    saveLoading.value = false;
    modalApi.setState({loading: false, confirmLoading: false});

  }
}

function refreshModelStatus(modelId, status, statusName) {
  if (status && statusName) {
    designerStatus.value.finallyStatus = status || 1;
    designerStatus.value.finallyStatusName = statusName || '草稿';
  } else {
    getByModelId({modelId}).then((res) => {
      designerStatus.value.finallyStatus = res.status || 1;
      designerStatus.value.finallyStatusName = res.statusName || '草稿';
    });
  }
}

async function handlePublish() {
    modalApi.setState({loading: true, confirmLoading: true});
    // loadingRef.value = true;
    try {
        const values = await formApi.getValues();

        const {modelId} = values;
        const {msg, success, data} = await publishDmn(modelId);
        if (success) {
            message.success(msg, 2);
            refreshModelStatus(modelId, null, null);
        } else {
            message.error(msg, 2);
        }
    } catch (e) {
        console.error(e);
    } finally {
        modalApi.setState({loading: false, confirmLoading: false});
    }
}

async function initFormData() {
  // const {id, modelId, categoryCode} = unref(baseModelInfo);
  const {id, modelId, categoryCode} = await formApi.getValues();

  if (modelId) {
    modalApi.setState({loading: true, confirmLoading: true});
    await nextTick();

    try {
      const res = await getByModelId({modelId});
      res.name = res.modelName;
      baseModelInfo.value.modelKey = res.modelKey;
      baseModelInfo.value.name = res.name;
      res.id = id;
      refreshModelStatus(modelId, res.status, res.statusName);
      // xml渲染
      try {
        (await res.modelXml) &&
        unref(dmnDesignerRef).loadModelXml(res.modelXml);
        setTimeout(() => {
          dmnMode.value == 0 && unref(dmnDesignerRef).hideViewDrdBtn();
        });
      } catch (e) {
        console.error(e);
      }
      // await updateModelKeyValidate(res.id);
      await formApi.setValues(res);
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  } else {
    if (categoryCode) {
      // 传入空会渲染默认xml
      const {
        data: {modelXml},
      } = await initDmnDiagram({key: '', name: '', dmnType: dmnMode.value});
        modelXml && unref(dmnDesignerRef).loadModelXml(modelXml);
        setTimeout(() => {
          dmnMode.value == 0 && unref(dmnDesignerRef).hideViewDrdBtn();
        });
    } else {
      Modal.warning({
        title: '提示',
        content: '请选择分类再进入编辑',
        onOk: () => {
          // handleBack();
        },
      });
      return;
    }
    // updateModelKeyValidate('');
  }
}

async function updateModelKeyValidate(id) {
  const {updateSchema} = formApi;
  await updateSchema([
    {
      fieldName: 'name',
      componentProps: ({formModel}) => {
        return {
          onChange: () => {
            baseModelInfo.value.name = formModel.name;
          },
        };
      },
    },

  ]);
}

function doCopyContent(content) {
    try {
        copy(content);
        message.success("拷贝成功！")
    } catch (e) {
    } finally {
    }
}

function handleClose() {
  modalApi.close();
  // dataStatusIsDraft.value = {
  //     formDesigner: false,
  //     bpmnDesigner: false,
  //     settingInfo: false,
  //     finallyStatus: false,
  // };
  emit('success');
}
defineExpose(modalApi);
</script>

