<template>
  <BasicModal class="p-0" >
    <template #title>
      <div class="w-full">
        <Row>
          <Col span="16" class="flex flex-row items-center">
            <span v-if="templateId">编辑模板 - </span>
            <span v-else>新建模板 - </span>
            {{ formName }}
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
                    在流程中使用变量方法：<br />
                    ${form.{{ data.model }}}
                  </template>
                  <QuestionCircleOutlined style="color: #1890ff" />
                </Tooltip>
              </Checkbox>

              <div v-if="type === 'input'">
                <span class="fm-custom-label">字段长度</span>
                <Tooltip title="数据库字段长度限制">
                  <QuestionCircleOutlined style="color: #1890ff" />
                </Tooltip>
                <InputNumber
                  style="width: 100%"
                  defaultValue="128"
                  :min="1"
                  :max="1024"
                  placeholder="字段长度"
                  v-model:value="customProps.fieldLength"
                />
              </div>
            </Space>
            <Divider />
          </div>
        </template>
        <template #action>
          <div class="flex flex-row flex-grow-1 flex-1">
            <div class="action-bar-left w-full text-left">
              <BasicForm class="w-full"/>
<!--              <TreeSelect
                ref="formCategoryRef"
                class="form-category"
                style="width: 30%;"
                tree-default-expand-all
                v-model:value="formCategory"
                placeholder="请选择分类"
                :treeData="formCategoryTreeData"
              />
              <div style="width: 70%;" class="action-bar-input">
                <Input ref="formNameRef" status="error" v-model:value="formName" placeholder="请输入名称" />
              </div>-->
            </div>
<!--            <div class="action-bar-right">
              &lt;!&ndash;            <a-button type="link" @click="handleSubmit">
                            <save-outlined />保存
                          </a-button>&ndash;&gt;
            </div>-->
          </div>
        </template>
      </MakingForm>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
import {ref, unref, defineEmits, defineExpose, watch} from 'vue';

  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';

  import { MakingForm } from '/public/static/form-making';
  import { QuestionCircleOutlined, SaveOutlined } from '@ant-design/icons-vue';
  import {
    getFormCategoryListData,
    getFormTemplateById,
    saveOrUpdate
  } from '#/api/form/formTemplate';
  import { Space, message, TreeSelect, Input, InputNumber, Checkbox, Divider, Tooltip, Row, Col, Button } from 'ant-design-vue';
  import { useInFlowTypes } from '#/views/components/form/formMaking/formMaking.data';
  import {listToTree} from "#/utils/helper/treeHelper";
  import {formSchema} from "./formTemplate.data.ts";

  const emit = defineEmits(['success']);
  const treeLoading = ref(true);

  const makingFormRef = ref(null);
  const formCategory = ref(null);
  const formCategoryRef = ref(null);

  const templateId = ref('');
  const formName = ref('');
  const formNameRef = ref(null);
  const saveLoading = ref(false);
  const formCategoryTreeData = ref([]);

  function changeLoading(loading: boolean) {
    modalApi.setState({loading});
  }

  /*const [registerModal, { changeLoading, closeModal }] = useModalInner(async (data) => {
    loadData(data.id);
    formCategory.value = data.categoryCode;
    templateId.value = data.id;
  });*/

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
      modalApi.setState({loading: true, confirmLoading: true});
      const values = modalApi.getData();

      loadData(values.id);
      formCategory.value = values.categoryCode;
      templateId.value = values.id;
      modalApi.setState({loading: false, confirmLoading: false});
    },
  });


const [BasicForm, baseFormApi] = useVbenForm({
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
  wrapperClass: 'grid-cols-3',
});

  async function initFormCategoryTree() {
    treeLoading.value = true;
    const res = await getFormCategoryListData();
    res.forEach(item => {
      item.label = item.name;
      item.value = item.code;
      item.key = item.code;
    })
    const treeData = listToTree(res);
    formCategoryTreeData.value = treeData;
    treeLoading.value = false;
  }

  function loadData(id: string) {
    initFormCategoryTree();
    if (id) {
      saveLoading.value = true;
      getFormTemplateById(id)
        .then((res) => {
          const formJson = typeof res.formJson === 'string' ? JSON.parse(res.formJson): res.formJson;
          unref(makingFormRef).setJSON(formJson);
          formName.value = res.name;
          formCategory.value = res.categoryCode;
          saveLoading.value = false;
        })
        .finally(() => {
          saveLoading.value = false;
        });
    } else {
      formName.value = '';
      unref(makingFormRef)?.clear();
    }
  }

  async function handleSubmit() {
    const jsonStr = unref(makingFormRef).getJSON();
    if (!unref(formCategory)) {
      message.warning('请选择模板分类！');
      unref(formCategoryRef).focus();
      return;
    }
    if (!unref(formName)) {
      message.warning('请输入模板名称！');
      unref(formNameRef).focus();
      return;
    }
    const params = {
      formJson: jsonStr,
      id: unref(templateId),
      name: unref(formName),
      categoryCode: unref(formCategory),
    };
    changeLoading(true);
    saveLoading.value = true;
    saveOrUpdate(params)
      .then((res) => {
        templateId.value = res.id;
        message.success('保存成功！');

        saveLoading.value = false;
        changeLoading(false);
      })
      .catch((e) => {
        saveLoading.value = false;
        changeLoading(false);
      });
  }

  function handleVisibleChange(visible: boolean) {
    if (!visible) {
      unref(makingFormRef).clear();
    }
  }
  function handleClose() {
    modalApi.close();
    emit('success');
  }

  defineExpose(modalApi)
</script>

<style lang="scss">
  //@import '../../components/form/formMaking/index.less';
  /*.form-designer-container {
    .ant-modal {
      .ant-modal-body {
        .scroll-container {
          padding-top: 0;
          padding-bottom: 0;
          .fm-custom-label{
            font-size: 13px;
            color: rgb(96, 98, 102);
          }
        }
      }
    }
  }*/
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
