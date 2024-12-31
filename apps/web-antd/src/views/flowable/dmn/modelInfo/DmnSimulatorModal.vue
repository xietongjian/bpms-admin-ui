<template>
  <BasicModal v-bind="$attrs" @register="registerModal" @ok="handleSubmit">
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
            <BasicForm @register="registerSimulatorInputForm" />
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
            <SlidersOutlined style="font-size: 50px" />
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
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref, defineExpose, defineEmits } from 'vue';
  // import { BasicModal, useModalInner } from '@/components/Modal';
  import {useVbenModal} from '@vben/common-ui';

  import {useVbenForm} from '#/adapter/form';

  import { dmnSimulatorInputFormSchema } from './modelInfo.data';
  import {
    calcDmnSimulatorOutput,
    getDmnSimulatorInputParamsByModelKey,
  } from '#/api/flowable/dmn/modelInfo';
  import { Row, Col, message, Empty } from 'ant-design-vue';
  import { SlidersOutlined, ArrowRightOutlined } from '@ant-design/icons-vue';
  import {apiCategoryFormSchema} from "#/views/base/apiInfo/apiInfo.data";
  // import { CodeEditor, MODE } from '@/components/CodeEditor';

  const fieldNameReplaceStr = '_______';

  const simulatorInputParams = ref([]);
  const simulatorOutputParams = ref(null);
  const modelKey = ref('');

  const simulatorInputParamsLoading = ref(false);
  const simulatorOutputParamsLoading = ref(false);
  /*const [
    registerSimulatorInputForm,
    { setFieldsValue, resetSchema, updateSchema, resetFields, validate },
  ] = useForm({
    labelWidth: 100,
    schemas: dmnSimulatorInputFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });*/
/*
  const [registerModal, { setModalProps, changeLoading, closeModal }] = useModalInner(
    async (data) => {
      resetFields();
      simulatorInputParams.value = [];
      simulatorOutputParams.value = null;
      simulatorOutputParamsLoading.value = false;

      setModalProps({ confirmLoading: false });
      changeLoading(true);
      let formData = data.record;

      modelKey.value = formData.modelKey;

      try {
        simulatorInputParamsLoading.value = true;
        simulatorInputParams.value = await getDmnSimulatorInputParamsByModelKey({
          modelKey: formData.modelKey,
        });
        if (simulatorInputParams.value) {
          const schemaItems = unref(simulatorInputParams).map((item) => {
            return {
              field: item.fieldName.replace(/\./g, fieldNameReplaceStr),
              component: 'Input',
              label: item.fieldLabel,
              required: true,
              colProps: { span: 24 },
            };
          });
          await resetSchema(schemaItems);
        }
        simulatorInputParamsLoading.value = false;
      } finally {
        changeLoading(false);
        simulatorInputParamsLoading.value = false;
      }
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
    schema: apiCategoryFormSchema,
    wrapperClass: 'grid-cols-1',
  });

  async function handleSubmit() {
    try {
      simulatorOutputParamsLoading.value = true;
      modalApi.setState({loading: true, confirmLoading: true});

      const {valid} = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();
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
        modalApi.setState({loading: false, confirmLoading: false});
        message.warn('输入参数不能为空！');
        return;
      }

      datas['inputDataVos'] = inputDataVos;
      const res = await calcDmnSimulatorOutput(datas);
      simulatorOutputParams.value = res;
      simulatorOutputParamsLoading.value = false;
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
      simulatorOutputParamsLoading.value = false;
    }
  }

  defineExpose(modalApi);
</script>

<style lang="less">
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
</style>
