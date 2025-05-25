<template>
  <div class="h-full bg-card overflow-hidden making-form-container" >
    <MakingForm ref="makingFormRef" preview class="h-full [&_.el-footer]:hidden">
      <template #widgetconfig="{ type, data, customProps }">
        <div v-if="formType === 'custom' && useInFlowTypes.includes(type)" class="m-2">
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
      <!-- preview clearable upload -->
      <template #action>
        <div class="action-bar">
          <div class="action-bar-left">
            <BasicForm class="form-base-info">
              <!--              <template #formKeySlot="{ model, field }">
                <a-input v-model:value="model[field]" placeholder="请输入流程标识" />
              </template>-->
            </BasicForm>
            <!--
            <div class="action-bar-input">
              <a-input ref="formNameRef" v-model:value="formInfo.formName" placeholder="请输入名称" />
            </div>
            <div v-if="formType === 'biz'" class="action-bar-input">
              <a-input :disabled="!!id" ref="modelKeyRef" v-model:value="formInfo.modelKey" placeholder="请输入标识" />
            </div>-->
          </div>
          <div class="action-bar-right">
            <!--            <a-button type="link" @click="handleSave">
              <save-outlined />保存
            </a-button>-->
            <Dropdown>
              <Button type="link" @click.prevent>
                <SettingOutlined />
                更多
              </Button>
              <template #overlay>
                <Menu @click="handleFormSettingClick">
                  <MenuItem key="genJSON">
                    <a href="javascript:;"> <FileTextOutlined />&nbsp生成JSON </a>
                  </MenuItem>

                  <MenuItem key="import">
                    <a href="javascript:;"> <ImportOutlined />&nbsp插入模板 </a>
                  </MenuItem>
                  <MenuItem key="clear">
                    <a href="javascript:;"> <ClearOutlined />&nbsp清空 </a>
                  </MenuItem>
                </Menu>
              </template>
            </Dropdown>
          </div>
        </div>
      </template>
    </MakingForm>
    <FormTemplateSelectorModal
      ref="formTemplateSelectorModalRef"
      @success="handleInsertTemplate"
    />
    <CodePreviewModal ref="codePreviewModalRef" type="json" />
    <FormPreviewModal ref="formPreviewModalRef" />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, toRefs, unref, nextTick, watch, createVNode, defineProps, defineEmits, defineExpose } from 'vue';
  import {
    Space,
    InputNumber,
    Dropdown,
    Menu,
    MenuItem,
    Checkbox,
    Divider,
    Tooltip,
    message,
    Modal,
    Button,
  } from 'ant-design-vue';
  import {
    SettingOutlined,
    ClearOutlined,
    ImportOutlined,
    FileTextOutlined,
    QuestionCircleOutlined,
  } from '@ant-design/icons-vue';

  import { MakingForm } from '/public/static/form-making';
  import { getFormInfoByModelKey, saveFormInfo } from '#/api/form/customForm';
  import { getBizInfoByModelKey, saveBizInfo, checkEntityExist } from '#/api/form/bizForm';
  import { getTaskFormMakInfoById, saveTaskFormInfo } from '#/api/form/customTaskForm';
  import FormTemplateSelectorModal from './FormTemplateSelectorModal.vue';
  import CodePreviewModal from '#/views/components/preview/codePreview/index.vue';
  import FormPreviewModal from '#/views/components/form/formMaking/FormPreviewModal.vue';
  // import {useUserStore} from "#/store/modules/user";
  import {useUserStore} from '@vben/stores';

  import { formBaseInfoFormSchema } from './formBaseInfo.data';
  import { FormValidPatternEnum } from '#/enums/commonEnum';

  import { useInFlowTypes } from '#/views/components/form/formMaking/formMaking.data';
  import {useVbenForm} from "#/adapter/form";

  const formTemplateSelectorModalRef = ref(),
      codePreviewModalRef = ref();

  const userStore = useUserStore();

  const props = defineProps({
    formType: {
      type: String,
      default: 'custom', // 参照值：custom biz customTask templateForm
    },
    modelName: {
      type: String,
      default: '',
    },
    modelKey: {
      type: String,
      default: '',
    },
    categoryCode: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
  });
  const loading = ref<boolean>(false);
  const makingFormRef = ref(null);
  const { modelKey, modelName, formType, id } = toRefs(props);

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      componentProps: {
        class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: formBaseInfoFormSchema,
  });

  watch(
    () => props.modelKey,
    (newVal, oldVal) => {
      fetch();
    },
  );

  onMounted(() => {
    if (!props.modelKey) {
      ctrlForm();
    } else {
      fetch();
    }
    nextTick(() => {
      window['currentUser'] = userStore.userInfo;
    });
  });

  function setFormJson(formJson) {
    debugger
    if (formJson) {
      if (typeof formJson === 'string') {
        formJson = JSON.parse(formJson);
      }
      nextTick(() => {
        loading.value = true;
        setTimeout(() => {
          makingFormRef.value.setJSON(formJson);
          loading.value = false;
        }, 300);
      });
    } else {
      makingFormRef.value.setJSON([]);
    }
  }

  async function fetch() {
    ctrlForm();
    if (props.modelKey) {
      formApi.setValues({
        formKey: props.modelKey,
      })
      loading.value = true;
      if (props.formType === 'custom') {
        getFormInfoByModelKey({ modelKey: props.modelKey })
          .then((res) => {
            formApi.setValues({
              id: res.id,
              formName: res.title,
            })
            setFormJson(res.formJson);
            loading.value = false;
          })
          .catch((e) => {
            loading.value = false;
          });
      } else if (props.formType === 'biz') {
        formApi.setValues({
          formName: props.modelName,
        })
        getBizInfoByModelKey({ modelKey: props.modelKey })
          .then((res) => {
            debugger;
            formApi.setValues({
              id: res.id,
              formName: res.title,
            });
            /*formApi.updateSchema({
              fieldName: 'formKey',
              componentProps: {
                disabled: true,
              },
            });*/

            setFormJson(res.formJson);
            loading.value = false;
          })
          .catch((e) => {
            loading.value = false;
          });
      } else if (props.formType === 'customTask') {
        if (props.id) {
          getTaskFormMakInfoById({ formId: props.id })
            .then((res) => {
              formApi.setValues({
                id: res.id,
                formName: res.title,
              });
              setFormJson(res.formJson);
              loading.value = false;
            })
            .catch((e) => {
              loading.value = false;
            });
        } else {
          setFormJson(null);
          loading.value = false;
        }
      }
    }
  }

  function ctrlForm() {
    /*const getBaseDynamicRules = (params: any) => {
      if (props.id) {
        return [];
      }
      return [
        {
          max: 60,
          message: '字符长度不能大于60！',
        },
        {
          // 英文或数字且以英文或下划线开头
          pattern: new RegExp('^[a-zA-Z_]{1,}[0-9a-zA-Z_]{0,}$'),
          type: 'string',
          message: '请输入英文或数字且以英文或下划线开头！',
        },
        {
          trigger: ['change', 'blur'],
          validator: (_, value) => {
            if (value) {
              return checkEntityExist({
                id: params.id,
                field: params.field,
                fieldValue: value,
                fieldName: params.fieldName,
              })
                .then((res) => {
                  if (res) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(params.fieldName + '已存在，请修改！');
                  }
                })
                .catch((res) => {
                  return Promise.reject(res);
                });
            } else {
              return Promise.resolve();
            }
          },
        },
      ];
    };*/
    if (props.formType === 'biz') {
      // 业务表单增加表单验证
      formApi.updateSchema([
        {
          fieldName: 'formName',
          show: false,
          dependencies: {
            show: false,
            triggerFields: ['']
          }
        },
        {
          fieldName: 'formKey',
          dependencies: {
            show: false,
            triggerFields: ['']
          }
        },
      ]);
    } else {
    }
  }

  function handlePreviewCode(type: string) {
    const code = unref(makingFormRef).getJSON();
    codePreviewModalRef.value.open();
    codePreviewModalRef.value.setData({code, type});
    codePreviewModalRef.value.setState({
      title: `查看${type === 'application/json' ? 'JSON' : 'HTML'}`
    });
  }

  function handleFormSettingClick({ key }) {
    switch (key) {
      case 'genJSON':
        handlePreviewCode('application/json');
        break;
      /*case 'genHTML':
        handlePreviewCode('html')
        break;*/
      case 'import':
        formTemplateSelectorModalRef.value.setData({});
        formTemplateSelectorModalRef.value.open();
        formTemplateSelectorModalRef.value.setState({
          title: '插入模板'
        });
        break;
      case 'clear':
        Modal.confirm({
          icon: createVNode(QuestionCircleOutlined),
          content: '确定要清空设计器吗？',
          onOk() {
            unref(makingFormRef).clear();
          },
          okType: 'primary',
          okButtonProps: {
            danger: true,
          },
        });
        break;
    }
  }

  async function handleSave() {
    const jsonStr = makingFormRef.value.getJSON();
    const html = makingFormRef.value.getHtml();
    const {valid, errors} = await formApi.validate();
    if(!valid){
      return Promise.reject(errors);
    }

    const values = await formApi.getValues();

    const jsonObj = JSON.parse(jsonStr);

    if (!jsonObj.list || jsonObj.list.length === 0) {
      message.warning({ content: '请添加表单字段！', style: { marginTop: '40px' } });
      return;
    }
    loading.value = true;
    const saveData = {
      id: values.id,
      categoryCode: props.categoryCode,
      title: values.formName.trim(),
      name: values.formName.trim(),
      content: html,
      formStatus: 1,
      version: '1.0',
      formJson: jsonStr,
      flowLevelFlag: 0,
    };

    if (props.formType === 'custom') {
      return saveFormInfo(saveData)
        .then((res) => {
          formApi.setValues({
            id: res.formInfoId,
          });
          // emit('onSave', res);
          message.success({ content: '保存成功！', style: { marginTop: '40px' } });
          return Promise.resolve(res);
        })
        .finally(() => {
          loading.value = false;
        });
    } else if (props.formType === 'biz') {
      saveData.id = values.id;
      saveData.code = values.formKey;

      return saveBizInfo(saveData)
        .then((res) => {
          formApi.setValues({
            id: res.formInfoId,
            formKey: res.modelKey,
          });
          /*updateSchema({
            field: 'formKey',
            componentProps: {
              disabled: true,
            },
          });*/
          message.success({ content: '保存成功！', style: { marginTop: '40px' } });
          // emit('onSave', res);
          return Promise.resolve(res);
        })
        .finally(() => {
          loading.value = false;
        });
    } else if (props.formType === 'customTask') {
      saveData.modelKey = props.modelKey;
      return saveTaskFormInfo(saveData)
        .then((res) => {
          setFieldsValue({
            id: res,
          });
          message.success('保存成功！');
          // emit('onSave', res);
        })
        .finally(() => {
          loading.value = false;
        });
    } else if (props.formType === 'templateForm') {
    }
  }

  function handleInsertTemplate(record, type) {
    if ('insert' === type) {
      const formJson = record.formJson;
      const jsonStr = unref(makingFormRef).getJSON();
      const jsonObj = JSON.parse(jsonStr);
      jsonObj.list = [...jsonObj.list, ...formJson.list];
      setFormJson(jsonObj);
      message.success('插入成功！');
      // 插入成功后滚动到最后 fix: 会影响弹窗页面样式错乱，所以去掉此操作
      // setTimeout(()=>{
      //   unref(makingFormRef).$el.querySelector('.widget-form-list').lastChild.scrollIntoView()
      // }, 200);
    } else if ('replace' === type) {
      setFormJson(record.formJson);
      message.success('插入成功！');
    }
  }

  defineExpose({
    handleSave,
  });
</script>
<style lang="scss">
  @import './index.scss';
  .fm-custom-label{
    font-size: 13px;
    color: rgb(96, 98, 102);
  }
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
