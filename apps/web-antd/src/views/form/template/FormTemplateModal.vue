<template>
  <BasicModal class="p-0">
    <template #title>
      <div class="w-full">
        <Row>
          <Col span="16" class="flex flex-row items-center">
            <span v-if="templateId">编辑模板 - </span>
            <span v-else>新建模板 - </span>
            {{ templateInfo?.name }}
          </Col>
          <Col span="8" class="text-right">
            <Space>
              <Button type="primary" @click="handleSubmit" :loading="saveLoading">保存</Button>
              <Button type="default" @click="handleClose">关闭</Button>
            </Space>
          </Col>
        </Row>
      </div>
    </template>
    <div class="h-full">
      <MakingForm
          ref="makingFormRef" preview
          class="making-form-container [&_.center-container>header]:flex [&_>footer]:hidden h-full min-h-[500px]">
        <template #widgetconfig="{ type, data, customProps }">
          <div v-if="useInFlowTypes.includes(type)" class="m-2">
            <div class="mb-2">扩展属性</div>
            <Space direction="vertical">
              <Checkbox v-model:checked="customProps.useInFlow">
                <span class="fm-custom-label">在流程中使用</span>
                <Tooltip>
                  <template #title>
                    在流程中使用变量方法：<br/>
                    ${form.{{ data.model }}}
                  </template>
                  <QuestionCircleOutlined class="ml-1 text-blue-500"/>
                </Tooltip>
              </Checkbox>

              <div v-if="type === 'input'">
                <span class="fm-custom-label">字段长度</span>
                <Tooltip title="数据库字段长度限制">
                  <QuestionCircleOutlined class="ml-1 text-blue-500"/>
                </Tooltip>
                <InputNumber
                    class="w-full"
                    defaultValue="128"
                    :min="1"
                    :max="1024"
                    placeholder="字段长度"
                    v-model:value="customProps.fieldLength"
                />
              </div>
            </Space>
            <Divider/>
          </div>
        </template>
        <template #action>
          <div class="flex flex-row flex-grow-1 flex-1 items-center">
            <div class="action-bar-left w-full text-left">
              <BasicForm class="w-full"/>
            </div>
          </div>
        </template>
      </MakingForm>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
import {ref, unref, defineEmits, defineExpose} from 'vue';
import type {Recordable} from '@vben/types';

import {useVbenModal} from '@vben/common-ui';
import {useVbenForm} from '#/adapter/form';

import {MakingForm} from '/public/static/form-making';
import {QuestionCircleOutlined, SaveOutlined} from '@ant-design/icons-vue';
import {
  getFormTemplateById,
  saveOrUpdate
} from '#/api/form/formTemplate';
import {Space, message, InputNumber, Checkbox, Divider, Tooltip, Row, Col, Button} from 'ant-design-vue';
import {useInFlowTypes} from '#/views/components/form/formMaking/formMaking.data';
import {formSchema} from "./formTemplate.data.ts";

const emit = defineEmits(['success']);
const makingFormRef = ref(null);
const templateId = ref('');
const templateInfo = ref(null);
const saveLoading = ref(false);

function changeLoading(loading: boolean) {
  modalApi.setState({loading, confirmLoading: loading});
}

const [BasicModal, modalApi] = useVbenModal({
  fullscreenButton: false,
  showCancelButton: false,
  closable: false,
  footer: false,
  headerClass: 'p-2',
  fullscreen: true,
  contentClass: 'p-0',
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }
    changeLoading(true);
    const values = modalApi.getData();

    await loadData(values);
    templateId.value = values.id;
    changeLoading(false);
  },
});


const [BasicForm, formApi] = useVbenForm({
  compact: true,
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    hideLabel: true,
    hideRequiredMark: true,
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: formSchema,
  wrapperClass: 'grid grid-cols-3',
});

async function loadData(values: Recordable<any>) {
  if (values.id) {
    try {
      saveLoading.value = true;
      const res = await getFormTemplateById(values.id);
      templateInfo.value = res;
      const {formJson, name, categoryCode, id} = res;
      const formJsonData = typeof formJson === 'string' ? JSON.parse(formJson) : formJson;
      await formApi.setValues({
        categoryCode,
        name,
        id
      });
      unref(makingFormRef).setJSON(formJsonData);
    } catch (e) {
      console.error(e);
    } finally {
      saveLoading.value = false;
    }
  } else {
    await formApi.setValues({categoryCode: values.categoryCode});
    unref(makingFormRef)?.clear();
  }
}

async function handleSubmit() {
  const {valid} = await formApi.validate();
  if (!valid) {
    return;
  }
  try {
    saveLoading.value = true;
    changeLoading(true);

    const formJson = unref(makingFormRef).getJSON();
    const formModels = unref(makingFormRef).getFormModels()
    console.log(formModels);
    const values = await formApi.getValues();
    const params = {
      formJson,
      ...values
    };

    const {success, msg, data} = await saveOrUpdate(params);
    if (success) {
      formApi.setValues({id: data.id});
      message.success('保存成功！');
    } else {
      message.error(msg);
    }
  } catch (e) {
    console.error(e);
  } finally {
    saveLoading.value = false;
    changeLoading(false);
  }
}

function handleClose() {
  modalApi.close();
  emit('success');
}

defineExpose(modalApi)
</script>

<style lang="scss">
.making-form-container {
  .form-config-container {
    .el-form {
      .el-form-item:first-child {
        display: none;
      }
    }
  }
}
</style>
