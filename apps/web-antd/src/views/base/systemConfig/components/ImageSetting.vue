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
    component: 'Upload',
    componentProps: {
      // 更多属性见：https://ant.design/components/upload-cn
      accept: '.png,.jpg,.jpeg',
      // 自动携带认证信息
      // customRequest: upload_file,
      disabled: false,
      maxCount: 1,
      multiple: false,
      showUploadList: true,
      // 上传列表的内建样式，支持四种基本样式 text, picture, picture-card 和 picture-circle
      listType: 'picture-card',
    },
    fieldName: 'configName',
    label: props.dataItem.configName,
    defaultValue: [{url: props.dataItem.imageBase64}],
    renderComponentContent: () => {
      return {
        default: () => '点击上传图片',
      };
    },
    rules: 'required',
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
