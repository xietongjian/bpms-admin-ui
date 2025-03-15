<template>
  <div>
    <Upload
      v-model:file-list="fileList"
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
<!--          <div class="w-10 min-w-10 h-10 text-center leading-10 mr-2 text-[32px]">
            <LoadingOutlined v-if="file.status === 'uploading'" />
            <FileOutlined v-else />
          </div>
          <div class="w-full overflow-hidden flex-wrap flex-1 flex flex-col">
            <div class="w-full whitespace-nowrap break-keep text-ellipsis overflow-hidden" :style="file.status === 'error' ? 'color: red' : ''">
              &lt;!&ndash;                  {{ file.response.data }}&ndash;&gt;
              <Tooltip :title="file.name">
                <a v-if="file.response && file.response.data" :href="file.response?.data" target="downloadFile" download>{{ file.name }}</a>
                <span v-else >{{ file.name }}</span>
              </Tooltip>
            </div>
            <div class="text-[12px]">
              <span v-if="file.status === 'uploading'" class="color-red" >上传中...&nbsp;{{Math.floor(file.percent)}}%</span>
              <span v-else >{{file.name.split('.').pop().toUpperCase()}}</span>
              <span class="ml-2">{{formatFileSize(file.size)}}</span>
            </div>
            <div class="absolute hidden -right-1 -top-2 group-hover:block ">
              <a href="javascript:;" @click="actions.remove">
                <CloseOutlined />
              </a>
            </div>
          </div>-->
        </div>
      </template>
    </Upload>
  </div>
</template>
<script lang="ts" setup>
import {ref,watch, defineEmits, nextTick, defineExpose} from 'vue';
import {
  message,
  TypographyLink,
  Upload,
  Tooltip
} from 'ant-design-vue';
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
import { useAccessStore } from '@vben/stores';

import {
  CloseOutlined,
  PaperClipOutlined
} from '@ant-design/icons-vue'
import ProcessFileItem from '#/views/components/common/widgets/processFileItem/index.vue';

const emit = defineEmits(['blur', 'change']);

const fileList = ref<UploadProps['fileList']>([]);
const accessStore = useAccessStore();

const headers = {
  accept: 'application/json, text/plain, */*',
  authorization: accessStore.accessToken,
  flowtoken: accessStore.accessToken
};

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList);
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

watch(
  () => fileList.value,
  (v) => {
    emit('change', v);
  },
);
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
