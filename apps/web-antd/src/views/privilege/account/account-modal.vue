<script lang="ts" setup>
import {defineExpose, defineEmits, ref} from 'vue';
import {useVbenModal} from '@vben/common-ui';
import {Input, message, Upload} from 'ant-design-vue';
import {accountFormSchema} from './account.data';
import {useVbenForm} from '#/adapter/form';
import {saveOrUpdate} from '#/api/privilege/account';
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';

const emit = defineEmits<{
  onSuccess: [void];
}>();

const [BasicModal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  async onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const values = modalApi.getData<Record<string, any>>();
      if (values) {
        const formData = JSON.parse(JSON.stringify(values));
        imageUrl.value = formData?.image;

        formData.userNo && (formData.realNameSelector = [{
          label: formData.realName,
          value: formData.userNo
        }]);
        await baseFormApi.setValues(formData);
        modalApi.setState({loading: false, confirmLoading: false});
      }
    }
  },
  onConfirm() {
    handleSubmit();
  },
});

const [BasicForm, baseFormApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    formItemClass: 'col-span-3',
    labelWidth: 80,
  },
  showDefaultActions: false,
  layout: 'horizontal',
  wrapperClass: 'grid grid-cols-5',
  schema: accountFormSchema,
});

async function handleSubmit() {
  try {
    modalApi.setState({loading: true, confirmLoading: true});
    const {valid} = await baseFormApi.validate();
    if (!valid) {
      return;
    }
    const values = await baseFormApi.getValues();

    values.image = imageUrl.value;
    delete values.realNameSelector;

    const {msg, success} = await saveOrUpdate(values);
    if (success) {
      message.success(msg);
      modalApi.close();
      emit('onSuccess');
    } else {
      message.error(msg);
    }
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      message.error(error.message);
    } else {
      message.error('An unknown error occurred');
    }
  } finally {
    modalApi.setState({loading: false, confirmLoading: false});
  }
}

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

const imageUrl = ref<string>('');

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
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

defineExpose(modalApi);
</script>

<template>
  <BasicModal class="w-[800px]">
    <BasicForm>
      <template #headImgSlot="slotProps">
        <div class="">
          <Upload
            style="margin: auto"
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            :multiple="false"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" class="w-[100px] h-[100px] object-contain"/>
            <div v-else>
              <plus-outlined />
              <div class="ant-upload-text">上传头像</div>
            </div>
          </Upload>
        </div>
      </template>
    </BasicForm>
  </BasicModal>
</template>

<style lang="scss" scoped>
</style>
