<template>
  <BasicModal
    v-bind="$attrs"
    width="70%"
    showFooter
    @ok="handleSubmit"
  >
    <BasicForm class="iconInf_form">
      <template #field3="slotProps">
        <Input placeholder="请输入" v-bind="slotProps" />
      </template>
      <template #icon="{ model, field }">
        <Upload
          style="margin: auto"
          name="avatar"
          list-type="picture-card"
          class="icon-uploader"
          :show-upload-list="false"
          :before-upload="beforeUpload"
          :multiple="false"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" class="w-20 h-20 object-contain" />
          <div v-else>
            <plus-outlined />
            <div class="ant-upload-text">上传图标</div>
          </div>
        </Upload>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref, defineExpose } from 'vue';
  import { iconInfoFormSchema } from './iconInfo.data';
  import { Input, message } from 'ant-design-vue';
  import { saveOrUpdateIconInfo } from '#/api/base/iconInfo';
  import { Upload } from 'ant-design-vue';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';

  const imageUrl = ref<string>('');

  const emit = defineEmits(['success']);

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
          imageUrl.value = values?.icon || '';
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
    schema: iconInfoFormSchema,
    wrapperClass: 'grid-cols-1',
  });

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/svg+xml';
    if (!isJpgOrPng) {
      message.error('只允许上传JPG图片！');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片不能大于2MB！');
      return false;
    }
    getBase64(file, (imgUrl) => {
      imageUrl.value = imgUrl;
    });
    return false;
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    // 读取文件
    reader.readAsDataURL(img);
  };
  async function handleSubmit() {
    try {
      modalApi.setState({loading: true, confirmLoading: true});
      const {valid} = await formApi.validate();
      if (!valid) {
        return;
      }
      const values = await formApi.getValues();

      values.icon = imageUrl.value;

      const { success, msg } = await saveOrUpdateIconInfo(values);
      if (success) {
        message.success(msg);
        await modalApi.close();
        emit('success');
      } else {
        message.error(msg);
      }
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }
  defineExpose(modalApi)
</script>
<style lang="scss">
  .iconInfo_form .local_urlValue {
    width: calc(100% - 100px);
    margin-bottom: 0;
    margin-left: -1px;
    border-right: 0;

    .ant-input {
      border-radius: 0 6px 6px 0;
    }
  }
</style>
