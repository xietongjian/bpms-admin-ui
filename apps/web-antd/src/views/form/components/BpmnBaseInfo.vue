<template>
  <div class="bg-white overflow-hidden" style="height: 100%" v-loading="loading">
    <div style="width: 500px; margin: 50px auto">
      <BasicForm @register="registerFormBaseInfoForm" class="bpmn-base-info" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, toRefs, unref, nextTick, watch, defineProps, defineExpose } from 'vue';

  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';


  import { getBizInfoByModelKey, saveBizInfo, checkEntityExist } from '#/api/form/bizForm';
  import { formBaseInfoFormSchema } from '#/views/components/form/formMaking/formBaseInfo.data';
  import { FormValidPatternEnum } from '#/enums/commonEnum';
  import {message, Modal} from 'ant-design-vue';

  // const { createMessage, createConfirm } = useMessage();

  const props = defineProps({
    formType: {
      type: String,
      default: 'custom', // 参照值：custom biz customTask templateForm
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
  const formNameRef = ref(null);
  const modelKeyRef = ref(null);
  const { modelKey, formType, id } = toRefs(props);
  const defaultFormJson = ref({
    list: [
      {
        type: 'input',
        icon: 'icon-input',
        options: {
          width: '',
          defaultValue: '',
          required: false,
          requiredMessage: '',
          dataType: '',
          dataTypeCheck: false,
          dataTypeMessage: '',
          pattern: '',
          patternCheck: false,
          patternMessage: '',
          validatorCheck: false,
          validator: '',
          placeholder: '',
          customClass: '',
          disabled: false,
          labelWidth: 100,
          isLabelWidth: false,
          hidden: true,
          dataBind: true,
          showPassword: false,
          clearable: false,
          maxlength: '',
          showWordLimit: false,
          customProps: {},
          tip: '',
          remoteFunc: 'func_5werae3f',
          remoteOption: 'option_5werae3f',
          tableColumn: false,
          subform: false,
        },
        events: {
          onChange: '',
          onFocus: '',
          onBlur: '',
        },
        name: '单行文本',
        key: '5werae3f',
        model: 'input_5werae3f',
        // rules: [],
      },
    ],
    config: {
      labelWidth: 100,
      labelPosition: 'left',
      size: 'default',
      customClass: '',
      ui: 'element',
      layout: 'horizontal',
      width: '100%',
      hideLabel: false,
      hideErrorMessage: false,
      eventScript: [
        {
          key: 'mounted',
          name: 'mounted',
          func: '',
        },
        {
          key: 'refresh',
          name: 'refresh',
          func: '',
        },
      ],
    },
  });

  const [registerFormBaseInfoForm, { setFieldsValue, updateSchema, resetFields, validate }] =
    useForm({
      schemas: formBaseInfoFormSchema,
      showActionButtonGroup: false,
      labelWidth: 120,
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
  });

  function setFormJson(formJson) {
    if (formJson) {
      if (typeof formJson === 'string') {
        formJson = JSON.parse(formJson);
      }
      defaultFormJson.value = formJson;
    } else {
      makingFormRef.value.setJSON([]);
    }
  }

  async function fetch() {
    ctrlForm();
    if (props.modelKey) {
      setFieldsValue({
        formKey: props.modelKey,
      });
      loading.value = true;
      getBizInfoByModelKey({ modelKey: props.modelKey })
        .then((res) => {
          setFieldsValue({
            id: res.id,
            formName: res.title,
          });
          updateSchema({
            field: 'formKey',
            componentProps: {
              disabled: true,
            },
            dynamicRules: () => [],
          });
          setFormJson(res.formJson);
          loading.value = false;
        })
        .catch((e) => {
          loading.value = false;
        });
    }
  }

  function ctrlForm() {
    /*const getBaseDynamicRules = (params: CheckExistParams) => {
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
      ] as Rule[];
    };*/
    if (props.formType === 'biz') {
      // 业务表单增加表单验证
      /*updateSchema([
        {
          field: 'formName',
          label: '流程名称',
          colProps: { span: 24 },
        },
        {
          field: 'formKey',
          label: '流程标识',
          show: true,
          colProps: { span: 24 },
          dynamicRules: () => {
            return [
              {
                required: true,
                whitespace: true,
                message: '标识不能为空！',
              },
              {
                pattern: new RegExp(FormValidPatternEnum.SN),
                type: 'string',
                message: '请输入英文或数字！',
              },
              {
                max: 40,
                message: '字符长度不能大于40！',
              },
              ...getBaseDynamicRules({
                id: unref(id),
                field: 'modelKey',
                fieldValue: '',
                fieldName: '流程标识',
              }),
            ];
          },
        },
      ]);*/
    } else {
    }
  }

  async function handleSave() {
    const json = defaultFormJson.value;
    const values = await validate();

    if (!json.list || json.list.length === 0) {
      createMessage.warning({ content: '请添加字段！', style: { marginTop: '40px' } });
      return;
    }
    loading.value = true;
    const saveData = {
      id: values.id,
      categoryCode: props.categoryCode,
      title: values.formName.trim(),
      name: values.formName.trim(),
      formStatus: 1,
      version: '1.0',
      formJson: JSON.stringify(json),
      flowLevelFlag: 0,
    };
    saveData.id = values.id;
    saveData.code = values.formKey;
    return saveBizInfo(saveData)
      .then((res) => {
        setFieldsValue({
          id: res.formInfoId,
          formKey: res.modelKey,
        });
        updateSchema({
          field: 'formKey',
          componentProps: {
            disabled: true,
          },
        });
        createMessage.success({ content: '保存成功！', style: { marginTop: '40px' } });
        // emit('onSave', res);
        return Promise.resolve(res);
      })
      .finally(() => {
        loading.value = false;
      });
  }

  defineExpose({
    handleSave,
  });
</script>
<style lang="scss"></style>
