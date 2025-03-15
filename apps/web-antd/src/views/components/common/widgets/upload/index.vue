<template>
  <div>
    <Upload
      v-model:file-list="modelValue"
      name="file"
      action="/flow/api/public/uploadFile"
      :headers="headers"
      @change="handleChange"
    >
      <Tooltip title="上传附件">
        <TypographyLink>
          <PaperClipOutlined />
        </TypographyLink>
      </Tooltip>
      <template #itemRender="{ file, actions }">
        <div class="relative flex flex-row w-[250px] group">
          <ProcessFileItem
            :file-name="file.name"
            :file-path="file.response?.data"
            :file-size="file.size"
            :file-status="file.status"
            :file-percent="file.percent"
          />
          <div class="absolute hidden -right-1 -top-2 group-hover:block ">
            <a href="javascript:;" @click="actions.remove">
              <CloseOutlined />
            </a>
          </div>
        </div>
      </template>
    </Upload>
  </div>
</template>
<script lang="ts" setup>
import { defineEmits, defineModel, defineExpose} from 'vue';
import {
  message,
  TypographyLink,
  Upload,
  Tooltip
} from 'ant-design-vue';
import type { UploadChangeParam } from 'ant-design-vue';
import { useAccessStore } from '@vben/stores';

import {
  CloseOutlined,
  PaperClipOutlined
} from '@ant-design/icons-vue'
import ProcessFileItem from '#/views/components/common/widgets/processFileItem/index.vue';

const emit = defineEmits<{
  change: [string];
}>();

const modelValue = defineModel({ default: [], type: Array });

const accessStore = useAccessStore();

const headers = {
  accept: 'application/json, text/plain, */*',
  authorization: accessStore.accessToken,
  flowtoken: accessStore.accessToken
};

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status !== 'uploading') {
    // console.log(info.file, info.fileList);
  }
  if (info.file.status === 'done') {
    if (info.file.response.success) {
      message.success(`${info.file.name} 文件上传成功！`);
    } else{
      message.error(`${info.file.name} 文件上传失败.`);
      info.file.status = 'error';
    }
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} 文件上传失败.`);
  }
};

defineExpose({

});
</script>
<style lang="scss" >
.approve-attachment-form-item {
  position: initial;

  > div {
    overflow: visible;
    .approve-attachment-wrapper{
      position: initial;
    }
  }
  .ant-upload-select {
    position: absolute;
    bottom: 48px;
    right: 20px;
    z-index: 9;
  }
  .ant-upload-list{
    &::before{
      content: none;
    }
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
}
</style>
