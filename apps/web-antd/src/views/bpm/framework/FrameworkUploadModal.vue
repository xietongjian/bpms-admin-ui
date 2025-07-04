<script setup lang="ts">
import {ref, shallowRef, defineExpose} from 'vue';
import {Button, Upload, message} from 'ant-design-vue';
import type {UploadProps} from 'ant-design-vue';
import {useVbenModal} from '@vben/common-ui';

import {UploadOutlined} from '@ant-design/icons-vue';
import {multiUploadFrameWork} from '#/api/bpm/framework';

defineOptions({name: 'FrameworkUploadModal'});

const emit = defineEmits(['success']);

const framework = ref({});

const [BasicModal, modalApi] = useVbenModal({
  title: '-',
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  async onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const values = modalApi.getData<Record<string, any>>();
      if (values) {
        framework.value = values || {};
        modalApi.setState({loading: false, confirmLoading: false});
      }
    }
  },
  onConfirm() {
    // await baseFormApi.submitForm();
    // handleSubmit();
  },
});


const fileList = shallowRef<UploadProps['fileList']>([]);
const uploading = ref<boolean>(false);

const handleRemove: UploadProps['onRemove'] = (file) => {
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  fileList.value = [file];
  return false;
};

const handleUpload = async () => {
  try {
    const formData = new FormData();
    formData.append('file', fileList.value[0]);
    uploading.value = true;

    const {success, msg, data} = await multiUploadFrameWork(framework.value.id, {
      file: fileList.value[0],
    });
    if (success) {
      message.success(msg);
      emit('success', framework.value);
      modalApi.close();
    } else {
      message.error(msg);
    }
  } catch (e) {
    console.error(e);
  } finally {
    uploading.value = false;
  }

  // request('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
  //   method: 'post',
  //   data: formData,
  // })
  //   .then(() => {
  //     fileList.value = [];
  //     uploading.value = false;
  //     message.success('upload successfully.');
  //   })
  //   .catch(() => {
  //     uploading.value = false;
  //     message.error('upload failed.');
  //   });
};

function closeModal() {
  modalApi.close();
}

defineExpose(modalApi);
</script>

<template>
  <BasicModal v-bind="$attrs" :canFullscreen="false">
    <template #title>
      <span>导入架构 - {{ framework.name }}</span>
    </template>

    <div class="flex">
      <span>选择文件：</span>
      <Upload
          accept=".xlsx"
          :max-count="1"
          :file-list="fileList"
          :before-upload="beforeUpload"
          @remove="handleRemove"
      >
        <Button size="small" type="primary">
          <UploadOutlined/>
        </Button>
      </Upload>
    </div>

    <template #footer>
      <Button @click="closeModal">取消</Button>
      <Button type="primary" :loading="uploading" :disabled="!fileList.length" @click="handleUpload"
      >导入
      </Button
      >
    </template>
  </BasicModal>
</template>

<style scoped lang="less"></style>
