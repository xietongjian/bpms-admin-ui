<template>
  <div class="">
    <BasicForm class="bg-card p-4" :schema="dynamicFormSchema" />
  </div>
</template>
<script lang="ts" setup>
import {defineProps} from 'vue';
import {useVbenForm, z} from "#/adapter/form";
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {saveOrUpdate} from "#/api/base/systemConfig";
import {message} from "ant-design-vue";

const props = defineProps({
  dataItem: {
    type: Array,
    default: () => [],
  },
})
const dynamicFormSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    defaultValue: props.dataItem.id,
    dependencies: {
      show: false,
      triggerFields: ['id']
    }
  },
  {
    fieldName: 'configValue',
    component: 'Input',
    label: props.dataItem.configName,
    description: props.dataItem.remark,
    defaultValue: props.dataItem.configValue,
    wrapperClass: 'flex-col items-start',
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(30, "字符长度不能大于30！")
  }
];


const PerPrefix = 'SystemConfig:';


const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      // class: 'w-full',
    },
    hideRequiredMark: true,
    labelClass: 'text-md !font-bold'
  },
  showDefaultActions: true,
  wrapperClass: 'grid-cols-1 md:grid-cols-1 lg:grid-cols-1',
  actionWrapperClass: 'mt-[26px] col-span-2 col-start-2 text-left ml-0',
  submitButtonOptions: {
    content: '保存'
  },
  resetButtonOptions: {show: false},
  layout: 'vertical',
  handleSubmit
});


async function handleSubmit() {
  try {
    // modalApi.setState({loading: true, confirmLoading: true});
    const {valid} = await formApi.validate();
    if (!valid) {
      return;
    }
    const values = await formApi.getValues();
    const {success, msg} = await saveOrUpdate(values);
    if (success) {
      // 更新


      message.success(msg);
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
