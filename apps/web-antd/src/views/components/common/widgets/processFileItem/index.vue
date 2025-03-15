<template>
  <div>
    <div class="relative flex flex-row items-center w-[250px] border border-solid rounded-xl">
      <div class="w-10 min-w-10 h-10 text-center leading-10 mr-2 text-[32px]">
        <LoadingOutlined v-if="fileStatus === 'uploading'" />
        <div v-else class="h-full ml-[2px] ">
          <FileExcelOutlined v-if="['XLS', 'XLSX'].includes(type)" />
          <span
              v-else-if="['GIF', 'PNG', 'BMP', 'JPG', 'JPEG'].includes(type)"
              class="rounded-xl overflow-hidden block rounded-md overflow-hidden flex items-center outline-1 outline-offset-1 outline-blue-500 h-full w-9 text-center">
              <img :src="filePath" class="block object-contain w-full h-full" />
            </span>
          <FileMarkdownOutlined v-else-if="['MD'].includes(type)" />
          <FilePdfOutlined v-else-if="['PDF'].includes(type)" />
          <FilePptOutlined v-else-if="['PPT', 'PPTX'].includes(type)" />
          <FileWordOutlined v-else-if="['DOC', 'DOCX'].includes(type)" />
          <FileZipOutlined v-else-if="['ZIP', 'RAR', '7Z', 'TAR', 'GZ', 'BZ2'].includes(type)" />
          <FileTextOutlined v-else-if="['TXT'].includes(type)" />
          <FileOutlined v-else />
        </div>
      </div>
      <div class="w-full overflow-hidden flex-wrap flex-1 flex flex-col">
        <div class="w-full whitespace-nowrap break-keep text-ellipsis overflow-hidden" :style="fileStatus === 'error' ? 'color: red' : ''">
          <Tooltip :title="fileName">
            <a v-if="filePath" @click="filePreview(fileName, filePath)" >{{ fileName }}</a>
            <span v-else >{{ fileName }}</span>
          </Tooltip>
        </div>
        <div class="text-[12px]">
          <span v-if="fileStatus === 'uploading'" class="color-red" >上传中...&nbsp;{{Math.floor(percent)}}%</span>
          <span v-else>{{fileName.split('.').pop().toUpperCase()}}</span>
          <span class="ml-2">{{formatFileSize(fileSize)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, onMounted, ref, watch, computed } from 'vue';
import {
  FileOutlined,
  FileExcelOutlined,
  FileMarkdownOutlined,
  FilePdfOutlined,
  FilePptOutlined,
  FileWordOutlined,
  FileZipOutlined,
  FileTextOutlined, LoadingOutlined, CloseOutlined,
} from '@ant-design/icons-vue';
import {formatFileSize} from "#/utils";
import {Tooltip} from "ant-design-vue";
import {downloadFile} from "#/api/sys/download";

const props = defineProps({
  fileStatus: { default: '', type: String },
  fileName: { default: '', type: String },
  fileType: { default: '', type: String },
  filePath: { default: '', type: String },
  fileSize: { default: 0, type: Number },
  filePercent: { default: 0, type: Number },
});

const percent = ref(0);
const type = computed(() => props.fileName.split('.').pop().toUpperCase());

watch(
  () => props.filePercent,
  (newVal, oldVal) => {
    percent.value = newVal;
  },
);

function filePreview(fileName, filePath) {
  const fileType = fileName.split('.').pop().toUpperCase();
  if (['GIF', 'PNG', 'BMP', 'JPG', 'JPEG'].includes(fileType)) {
    window.open(filePath);
  } else {
    downloadFile({
      path: filePath,
      name: fileName
    })
  }
}
</script>
