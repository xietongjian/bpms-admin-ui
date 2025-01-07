<template>
  <BasicModal
      class="w-[800px]"
    wrapClassName="dmn-viewer-container "
    v-bind="$attrs"
    @cancel="simulatorMode = false"
  >
    <div class="dmn-container">
      <div v-if="controllerBtnVisibility" class="svg-controller">
        <Tooltip :title="simulatorMode ? '退出模拟' : '模拟'">
          <Button
            title="模拟"
            shape="circle"
            size="small"
            @click="handleSimulator"
            :type="simulatorMode ? 'error' : 'success'"
          >
            <CloseOutlined v-if="simulatorMode" />
            <CaretRightOutlined v-else />
          </Button>
        </Tooltip>
      </div>
      <div class="containers" ref="container">
        <div :id="dmnCanvasId" class="dmnCanvas canvas" ref="dmnCanvas"></div>
      </div>
      <div class="dmn-simulator-container" :class="{ simulator: simulatorMode }">
        <Row class="text-center">
          <Col span="10">
            <h1 class="mt-0">输入参数</h1>
          </Col>
          <Col span="4" />
          <Col span="10">
            <h1 class="mt-0">执行结果</h1>
          </Col>
        </Row>
        <Row class="dmn-engine-container" justify="space-around" align="middle">
          <Col span="10">
            <div class="dmn-engine-result">
              <div
                :style="{ display: simulatorInputParams.length > 0 ? 'block' : 'none' }"
                v-loading="simulatorInputParamsLoading"
              >
                <BasicForm />
              </div>
              <Empty v-if="simulatorInputParams.length <= 0" description="无输入参数" />
            </div>
          </Col>
          <Col span="4">
            <div class="dmn-engine text-center">
              <div class="dmn-engine-arrow">
                <ArrowRightOutlined />
              </div>
              <div class="dmn-engine-box" @click="handleSubmit">
                <ForwardOutlined style="font-size: 50px" />
              </div>
              <div class="dmn-engine-arrow">
                <ArrowRightOutlined />
              </div>
            </div>
          </Col>
          <Col span="10">
            <div class="dmn-engine-result" v-loading="simulatorOutputParamsLoading">
              <div v-if="simulatorOutputParams">
                <CodeEditor
                  readonly
                  autoFormat
                  v-model:value="simulatorOutputParams"
                  :mode="MODE.JSON"
                />
              </div>
              <Empty v-else description="暂无输出" />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  // DMN模拟 - 参考：https://consulting.camunda.com/dmn-simulator/
  // 高亮显示行 - 参考：https://forum.bpmn.io/t/dmn-js-how-to-highlight-selected-rules/4633/5
  import {computed, ref, unref, defineEmits, defineExpose} from 'vue';
  import {message} from 'ant-design-vue';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';

  import { Button, Tooltip, Col, Empty, Row } from 'ant-design-vue';
  import {
    CloseOutlined,
    CaretRightOutlined,
    ForwardOutlined,
    ArrowRightOutlined,
  } from '@ant-design/icons-vue';
  import 'dmn-js/dist/assets/diagram-js.css';
  import 'dmn-js/dist/assets/dmn-js-drd.css';
  import 'dmn-js/dist/assets/dmn-js-decision-table.css';
  import 'dmn-js/dist/assets/dmn-js-decision-table-controls.css';
  import 'dmn-js/dist/assets/dmn-js-literal-expression.css';
  import 'dmn-js/dist/assets/dmn-js-shared.css';
  import 'dmn-js/dist/assets/dmn-font/css/dmn.css';
  import DmnViewer from 'dmn-js/lib/Viewer';
  // import customTranslate from './plugins/translate/customTranslate';
  import customTranslate from './plugins/dmn-translate/ZhCnTranslate';
  import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas';
  import ZoomScrollModule from 'diagram-js/lib/navigation/zoomscroll';

  import {
    calcDmnSimulatorOutput,
    getByModelId,
    getDmnSimulatorInputParamsByModelKey,
  } from '#/api/flowable/dmn/modelInfo';
  import { CodeEditor, MODE } from '#/components/CodeEditor';


  import { dmnSimulatorInputFormSchema } from '#/views/flowable/dmn/modelInfo/modelInfo.data';
  import {apiCategoryFormSchema} from "#/views/base/apiInfo/apiInfo.data";
  import { usePreferences } from '@vben/preferences';

  const { isDark } = usePreferences();
  const getTheme = computed(() => (isDark.value ? 'dark' : 'light'));

  const fieldNameReplaceStr = '_______';

  let dmnViewer = null;
  const customTranslateModule = {
    translate: ['value', customTranslate],
  };

  const dmnCanvasId = ref('dmnCanvas' + new Date().getTime());
  const exportLoading = ref<boolean>(false);
  const simulatorMode = ref<boolean>(false);
  const controllerBtnVisibility = ref<boolean>(false);
  const modelName = ref('');

  const simulatorInputParams = ref([]);
  const simulatorOutputParams = ref(null);
  const modelKey = ref('');
  const simulatorInputParamsLoading = ref(false);
  const simulatorOutputParamsLoading = ref(false);
/*  const [
    registerSimulatorInputForm,
    { setFieldsValue, resetSchema, updateSchema, resetFields, validate },
  ] = useForm({
    labelWidth: 100,
    schemas: dmnSimulatorInputFormSchema,
    showActionButtonGroup: false,
    autoFocusFirstItem: true,
  });*/
/*
  const [registerModal, { setModalProps, closeModal, changeLoading }] = useModalInner(
    async (data) => {
      const { modelId } = data;
      modelKey.value = data.modelKey;
      await init(modelId);
      resetFields();
      simulatorMode.value = false;
      simulatorInputParams.value = [];
      simulatorOutputParams.value = null;
      simulatorOutputParamsLoading.value = false;
      setModalProps({ confirmLoading: false });
      changeLoading(true);
    },
  );*/


  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          formApi.setValues(values);
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      // await formApi.submitForm();
      handleSubmit();
    },
  });

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: dmnSimulatorInputFormSchema,
    wrapperClass: 'grid-cols-1',
  });

  function importXml(modelInfo) {
    let modelXmlTemp = modelInfo.modelXml;
    dmnViewer.importXML(modelXmlTemp, function (err) {
      const views = dmnViewer.getViews();

      const decisionTableViews = views.filter(({ type }) => type === 'decisionTable');

      if (decisionTableViews.length === 1) {
        dmnViewer.open(decisionTableViews[0]);
      }

      const canvas = dmnViewer.getActiveViewer().get('canvas');
      return new Promise(function (resolve, reject) {
        canvas.resized();
        canvas.zoom('fit-viewport', { x: 0, y: 0 });
        return resolve();
      });
    });
  }

  async function init(modelId) {
    changeLoading(true);

    dmnViewer && dmnViewer.destroy();
    dmnViewer = new DmnViewer({
      container: document.getElementById(dmnCanvasId.value),
      decisionTable: {
        additionalModules: [customTranslateModule],
      },
      drd: {
        additionalModules: [MoveCanvasModule, ZoomScrollModule],
      },
    });

    getByModelId({ modelId }).then((res) => {
      controllerBtnVisibility.value = res.status == 3;
      importXml(res);
      changeLoading(false);
    });
  }

  // 根据所需类型进行转码并返回下载地址
  function setEncoded(type, filename = 'diagram', data) {
    const encodedData = encodeURIComponent(data);
    return {
      filename: `${filename}.${type}`,
      href: `data:application/${type === 'svg' ? 'text/xml' : 'bpmn20-xml'};charset=UTF-8,${encodedData}`,
      data: data,
    };
  }

  // 下载流程图到本地
  async function downloadProcess(type, name) {
    try {
      // 按需要类型创建文件并下载
      if (type === 'xml' || type === 'bpmn') {
        const { err, xml } = await dmnViewer.saveXML();
        // 读取异常时抛出异常
        if (err) {
          console.error(`[Process Designer Warn ]: ${err.message || err}`);
        }
        let { href, filename } = setEncoded(type.toUpperCase(), name, xml);
        downloadFunc(href, filename);
      } else {
        const { err, svg } = await dmnViewer.saveSVG();
        // 读取异常时抛出异常
        if (err) {
          return console.error(err);
        }
        let { href, filename } = setEncoded('SVG', name, svg);
        downloadFunc(href, filename);
      }
    } catch (e) {
      console.error(`[Process Designer Warn ]: ${e.message || e}`);
    }

    // 文件下载方法
    function downloadFunc(href, filename) {
      if (href && filename) {
        let a = document.createElement('a');
        a.download = filename; //指定下载的文件名
        a.href = href; //  URL对象
        a.click(); // 模拟点击
        URL.revokeObjectURL(a.href); // 释放URL 对象
      }
    }
  }

  function handleExportDiagram() {
    // 导出流程图
    exportLoading.value = true;
    downloadProcess('svg', modelName.value).finally(() => {
      exportLoading.value = false;
    });
  }

  async function handleSimulator() {
    simulatorMode.value = !simulatorMode.value;
    if (simulatorMode.value) {
      if (simulatorInputParams.value.length > 0) {
        return;
      }
      try {
        simulatorInputParamsLoading.value = true;
        simulatorInputParams.value = await getDmnSimulatorInputParamsByModelKey({
          modelKey: modelKey.value,
        });
        if (unref(simulatorInputParams) && unref(simulatorInputParams).length > 0) {
          const schemaItems = unref(simulatorInputParams).map((item) => {
            return {
              field: item.fieldName.replace(/\./g, fieldNameReplaceStr),
              component: 'Input',
              label: item.fieldLabel,
              required: true,
              colProps: { span: 24 },
              componentProps: {
                autocomplete: 'off',
              },
            };
          });
          await resetSchema(schemaItems);
        }
        simulatorInputParamsLoading.value = false;
      } finally {
        changeLoading(false);
        simulatorInputParamsLoading.value = false;
      }
    }
  }

  async function handleSubmit() {
    try {
      simulatorOutputParamsLoading.value = true;
      setModalProps({ confirmLoading: true });
      const values = await validate();
      const datas = { decisionKey: unref(modelKey) };

      const inputDataVos = [];
      for (let value in values) {
        const variable = value.replace(new RegExp(fieldNameReplaceStr, 'ig'), '.');
        inputDataVos.push({
          variable: variable,
          value: values[value],
          label: 'xx',
        });
      }

      if (inputDataVos.length <= 0) {
        simulatorOutputParamsLoading.value = false;
        setModalProps({ confirmLoading: false });
        message.warn('输入参数不能为空！');
        return;
      }

      datas['inputDataVos'] = inputDataVos;
      const res = await calcDmnSimulatorOutput(datas);
      simulatorOutputParams.value = res;
      simulatorOutputParamsLoading.value = false;
    } finally {
      changeLoading(false);
      setModalProps({ confirmLoading: false });
      simulatorOutputParamsLoading.value = false;
    }
  }
</script>

<style lang="less">
  @import 'index.less';
  .dmn-viewer-container {
    overflow: visible;
    padding: 10px;
    .ant-modal {
      .ant-modal-content {
        .ant-modal-body {
          .scroll-container {
            overflow: visible;
            padding: 0;
          }
          .scrollbar__wrap {
            overflow: visible;
          }
        }
      }
    }

    .dmn-simulator-container {
      position: absolute;
      top: 0;
      left: 10px;
      right: 10px;
      border: 3px solid #00be00;
      height: 100%;
      padding: 20px;
      opacity: 0;
      transition: 0.8s;
      background: var(--component-background-color);
      z-index: 1;
      &.simulator {
        opacity: 1;
        z-index: 5;
      }

      .dmn-engine-container {
        .dmn-engine-result {
          border-radius: 8px;
          border: 1px solid #eee;
          min-height: 200px;
          padding: 20px;
        }
      }
      .dmn-engine {
        display: flex;
        color: rgba(3, 71, 27, 0.7);

        .dmn-engine-arrow {
          width: 40px;
          margin: auto;
          font-size: 30px;
          color: #ccc;
        }

        .dmn-engine-box {
          border-radius: 8px;
          border: 1px solid #eee;
          padding: 10px;
          width: 80px;
          margin: auto;
          cursor: pointer;
          &:hover {
            color: rgba(3, 71, 27, 0.9);
            border: 1px solid #ccc;
          }
        }
      }
    }

    .dmn-container {
      padding: 0 10px;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      overflow: visible;
      .containers {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 4;
        .canvas {
          width: 100%;
          height: 100%;
        }
        .bjs-powered-by {
          display: none;
        }
      }
      .svg-controller {
        text-align: center;
        position: absolute;
        bottom: -5px;
        opacity: 0;
        transition: 0.8s;
        margin: auto;
        width: 100%;
        z-index: 9;
      }

      &:hover {
        .svg-controller {
          bottom: 5px;
          opacity: 1;
        }
      }
    }
  }
</style>
