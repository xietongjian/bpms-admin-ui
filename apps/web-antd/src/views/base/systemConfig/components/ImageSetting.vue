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
import {message, Modal} from "ant-design-vue";

const props = defineProps({
  dataItem: {
    type: Object,
    default: () => {},
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
      beforeUpload: () => {
        return false;
      },
      accept: getAccepts(),
      disabled: false,
      maxCount: 1,
      multiple: false,
      showUploadList: true,
      // 上传列表的内建样式，支持四种基本样式 text, picture, picture-card 和 picture-circle
      listType: 'picture-card',
      class: 'w-full xxxxxxxxxxxxxx'
    },
    wrapperClass: 'w-full aaaaaaaaaaa',
    labelClass: 'w-full wwwwwwwwwwwwwwww [&_+div].w-full',
    formItemClass: 'w-full ![&_>div]:w-full ![&_>label]:text-2xl',
    fieldName: 'imageValue',
    label: props.dataItem.configName,
    defaultValue: props.dataItem.imageBase64 ? [{url: props.dataItem.imageBase64}] : [],
    description: props.dataItem.remark,
    renderComponentContent: () => {
      return {
        default: () => '点击上传图片',
      };
    },
  }
];

const PerPrefix = 'SystemConfig:';

function getAccepts () {
  if (props.dataItem.configSn === 'SYS_FAVICON_IMG') {
    return '.ico';
  }
  return '.png';
};

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

async function handleSubmit() {
  try {
    // modalApi.setState({loading: true, confirmLoading: true});
    const {valid} = await formApi.validate();
    if (!valid) {
      return;
    }
    const {id, imageValue} = await formApi.getValues();
    if(imageValue.length > 0){
      const reader = new FileReader();
      reader.readAsArrayBuffer(imageValue[0].originFileObj);
      // 文件读取成功完成后的处理
      reader.onload = async function (ev) {
        const array = new Uint8Array(ev.target.result);
        const fileByteArray = [];
        formApi.setState({
          submitButtonOptions: { loading: true },
        });
        for (let i = 0; i < array.length; i++) {
          fileByteArray.push(array[i]);
        }
        const params = {
          id,
          image: fileByteArray
        }
        const {success, msg} = await saveOrUpdate(params);
        formApi.setState({
          submitButtonOptions: { loading: false },
        });
        if (success) {
          message.success(msg);
        } else {
          message.error(msg);
        }
      };
    } else {
      handleRemoveImg({id});
    }
  } catch (e) {
    formApi.setState({
      submitButtonOptions: { loading: false },
    });
  }
}

const handleRemoveImg = (record: any) => {
  Modal.confirm({
    iconType: 'warning',
    content: '确定要删除图片吗？',
    async onOk() {
      try {
        formApi.setState({
          submitButtonOptions: { loading: true },
        });
        const {success, msg} = await saveOrUpdate({id: record.id, image: []});
        if(success){
          message.success('删除成功，按Ctrl+F5强制刷新页面才能生效');
        } else {
          message.error(msg);
        }
      } catch (e) {
        console.error(e);
      } finally {
        formApi.setState({
          submitButtonOptions: { loading: false },
        });
      }
    },
    okButtonProps: {
      danger: true,
    },
  });
};
</script>

<style lang="scss" scoped>
</style>
