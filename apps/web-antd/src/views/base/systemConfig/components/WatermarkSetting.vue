<template>
  <div class="">
    <BasicForm class="bg-card p-4 mb-4" :schema="dynamicFormSchema"/>
  </div>
</template>
<script lang="ts" setup>
import {defineProps} from 'vue';
import {useVbenForm, z} from "#/adapter/form";
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {saveOrUpdate} from "#/api/base/systemConfig";
import {message} from "ant-design-vue";
import {useWatermark} from '@vben/hooks';
import {useUserStore} from '@vben/stores';
import {formatToDateTime} from '#/utils/dateUtil';

const {destroyWatermark, updateWatermark} = useWatermark();
const userStore = useUserStore();

const props = defineProps({
  switchDataItem: {
    type: Object,
    default: () => {
    },
  },
  ruleDataItem: {
    type: Object,
    default: () => {
    },
  },
})


const dynamicFormSchema: FormSchema[] = [
  {
    fieldName: 'switchId',
    label: 'ID',
    component: 'Input',
    defaultValue: props.switchDataItem.id,
    dependencies: {
      show: false,
      triggerFields: ['id']
    }
  },
  {
    fieldName: 'switchConfigValue',
    label: props.switchDataItem.configName,
    component: 'Switch',
    description: props.switchDataItem.remark,
    defaultValue: props.switchDataItem.configValue,
    wrapperClass: 'flex-col items-end',
    formItemClass: 'items-start',
    componentProps: {
      checkedValue: '1',
      unCheckedValue: '0',
    },
  },
  {
    fieldName: 'ruleId',
    label: 'ID',
    component: 'Input',
    defaultValue: props.ruleDataItem.id,
    dependencies: {
      show: false,
      triggerFields: ['id']
    }
  },
  {
    fieldName: 'ruleConfigValue',
    component: 'Input',
    label: props.ruleDataItem.configName,
    description: props.ruleDataItem.remark,
    defaultValue: props.ruleDataItem.configValue,
    wrapperClass: 'flex-col items-start',
    formItemClass: 'items-start',
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(30, "字符长度不能大于30！"),
    dependencies: {
      show: (values) => {
        const switchValue = values.switchConfigValue === '1';
        formApi.setState({
          showDefaultActions: switchValue
        });
        return switchValue;
      },
      triggerFields: ['switchConfigValue']
    }
  }
];

const PerPrefix = 'SystemConfig:';

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      // class: 'w-full',
    },
    hideRequiredMark: true,
    labelClass: 'justify-start text-md !font-bold'
  },
  showDefaultActions: true,
  resetButtonOptions: {
    show: false
  },
  submitButtonOptions: {
    content: '保存'
  },
  wrapperClass: 'grid-cols-1 md:grid-cols-1 lg:grid-cols-1',
  actionWrapperClass: 'w-full justify-start',
  layout: 'horizontal',
  handleValuesChange: (values, fieldsChanged) => {
    if (fieldsChanged.includes('switchConfigValue')) {
      handleSubmit();
    }
  },
  handleSubmit: handleSubmitRule
});

async function handleSubmit() {
  try {
    // modalApi.setState({loading: true, confirmLoading: true});
    const {valid} = await formApi.validate();
    if (!valid) {
      return;
    }
    const {switchId, switchConfigValue, ruleId, ruleConfigValue} = await formApi.getValues();

    const params = {
      id: switchId,
      configValue: switchConfigValue,
    };

    const {success, msg} = await saveOrUpdate(params);
    if (success) {
      message.success(msg);
      if (params.configValue === '1') {
        // 定义一个简单的模板引擎函数
        setWatermarkContent(ruleConfigValue);
      } else {
        destroyWatermark();
      }

    } else {
      message.error(msg);
    }
  } finally {
    // modalApi.setState({loading: false, confirmLoading: false});
  }
}

async function setWatermarkContent(rule: string) {
  // 定义一个简单的模板引擎函数
  const simpleTemplateEngine = (template, data) => {
    // 使用正则表达式匹配模板字符串中的${}占位符
    const pattern = /\$\{(\w+)\}/g;
    // 使用replace方法替换所有匹配到的占位符
    return template.replace(pattern, (match, key) => {
      // 如果数据对象中存在该键，则替换为相应的值，否则保持原样
      return key in data ? data[key] : match;
    });
  };

  const info = userStore.userInfo;
  let content = `${userStore.userInfo?.username} - ${userStore.userInfo?.realName}`;
  if (rule) {
    content = simpleTemplateEngine(rule, {
      ...info,
      currentDate: formatToDateTime(new Date()),
    })
  }

  await updateWatermark({
    content,
  });
}

async function handleSubmitRule() {
  try {
    // modalApi.setState({loading: true, confirmLoading: true});
    const {valid} = await formApi.validate();
    if (!valid) {
      return;
    }
    const {ruleId, ruleConfigValue} = await formApi.getValues();

    const params = {
      id: ruleId,
      configValue: ruleConfigValue,
    };

    const {success, msg} = await saveOrUpdate(params);
    if (success) {
      message.success(msg);
      setWatermarkContent(ruleConfigValue);
    } else {
      message.error(msg);
    }
  } finally {
    // modalApi.setState({loading: false, confirmLoading: false});
  }
}
</script>
<style lang="scss" scoped>
</style>
