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
      beforeUpload: file => {
        // fileList.value = [...(fileList.value || []), file];
        return false;
      },
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
      class: 'w-full xxxxxxxxxxxxxx'
    },
    wrapperClass: 'w-full aaaaaaaaaaa',
    formItemClass: 'w-full bbbbbbbbbb',

    fieldName: 'imageValue',
    label: props.dataItem.configName,
    defaultValue: [{url: props.dataItem.imageBase64}],
    description: props.dataItem.remark,
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
      class: 'w-full',
    },
    hideRequiredMark: true,
    labelClass: 'text-md w-full justify-start text-md !font-bold xxxx',
    formItemClass: 'w-full flex-col justify-start wwww',
    wrapperClass: 'w-full flex-col justify-start eeee'
  },
  compact: true,
  showDefaultActions: true,
  wrapperClass: 'grid-cols-1 md:grid-cols-1 lg:grid-cols-1',
  actionWrapperClass: 'col-span-1 col-start-0 text-left ml-0',
  submitButtonOptions: {
    content: '保存'
  },
  resetButtonOptions: {show: false},
  layout: 'horizontal',
  handleSubmit
});

function getBase64(img: Blob, callback: (base64Url: any) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader as any));
  reader.readAsBinaryString(img);
}

async function handleSubmit() {
  try {
    // modalApi.setState({loading: true, confirmLoading: true});
    const {valid} = await formApi.validate();
    if (!valid) {
      return;
    }
    const {id, imageValue} = await formApi.getValues();

    debugger;
    getBase64(imageValue[0].originFileObj, async (base64Url: any) => {
      debugger;
      const params = {
        id,
        image: base64Url
      }

      console.log(params);
      const {success, msg} = await saveOrUpdate(params);
      if (success) {
        message.success(msg);
      } else {
        message.error(msg);
      }

    });
  } finally {
    // modalApi.setState({loading: false, confirmLoading: false});
  }
}
</script>
<style lang="scss" scoped>
</style>
