<script setup lang="ts">
  /**
   * @desc FrameworkUploadModal
   * @author DragonTeam <https://www.bpmport.com>
   * @since 2024/9/2 14:57
   */

  import { BasicModal, useModalInner } from '@/components/Modal';
  import { Button, Upload, UploadProps } from 'ant-design-vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { ref, shallowRef } from 'vue';
  import { multiUploadFrameWork } from '#/api/bpm/framework';
  import { ResultEnum } from '@/enums/httpEnum';
  import { useMessage } from '@/hooks/web/useMessage';

  defineOptions({ name: 'FrameworkUploadModal' });

  const emit = defineEmits(['success']);

  const framework = ref({});

  const [registerModal, { closeModal }] = useModalInner((node) => {
    framework.value = node || {};
  });
  const { createMessage } = useMessage();

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

      const { data } = await multiUploadFrameWork(framework.value.id, {
        file: fileList.value[0],
      });

      if (data.code === ResultEnum.SUCCESS) {
        message.success(data.msg);
        emit('success', framework.value);
        closeModal();
      } else {
        message.error(data.msg);
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
</script>

<template>
  <BasicModal v-bind="$attrs" :canFullscreen="false" @register="registerModal">
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
          <UploadOutlined />
        </Button>
      </Upload>
    </div>

    <template #footer>
      <Button @click="closeModal">取消</Button>
      <Button type="primary" :loading="uploading" :disabled="!fileList.length" @click="handleUpload"
        >导入</Button
      >
    </template>
  </BasicModal>
</template>

<style scoped lang="less"></style>
