<template>
  <div>
    {{dataItem}}
    <img :src="dataItem.imageBase64" class="w-20 h-20" :alt="dataItem.configName" />
    <Button >保存</Button>
  </div>
</template>
<script lang="ts" setup>
import {nextTick, ref, onMounted, defineProps} from 'vue';
import {getSystemConfigListByPage, deleteByIds, saveOrUpdate} from '#/api/base/systemConfig';
import {Upload, Tooltip, Space, message, Modal, Button} from 'ant-design-vue';
import type {Recordable} from '@vben/types';

const PerPrefix = 'SystemConfig:';
const props = defineProps({
  dataItem: {
    type: Array,
    default: () => [],
  },
})

const configList = ref([]);

onMounted(async () => {
  const res = await getSystemConfigListByPage({
    query: {
      pageNum: 0,
      pageSize: 9999,
    },
    entity:  {},
  });

  configList.value = res.rows;
})

const beforeUpload = (record, file) => {
  setLoading(true);
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  // 文件读取成功完成后的处理
  reader.onload = function (ev) {
    const array = new Uint8Array(ev.target.result);
    const fileByteArray = [];

    for (let i = 0; i < array.length; i++) {
      fileByteArray.push(array[i]);
    }

    saveOrUpdate({id: record.id, image: fileByteArray})
        .then((res) => {
          createMessage.success('上传成功，按Ctrl+F5强制刷新页面才能生效');
          handleSuccess();
        })
        .finally(() => {
          setLoading(false);
        });
  };
  return false;
};

const handleRemoveImg = (record) => {
  createConfirm({
    iconType: 'warning',
    content: '确定要删除图片吗？',
    onOk() {
      saveOrUpdate({id: record.id, image: []})
          .then((res) => {
            createMessage.success('删除成功，按Ctrl+F5强制刷新页面才能生效');
            handleSuccess();
          })
          .finally(() => {
            setLoading(false);
          });
    },
    okButtonProps: {
      danger: true,
    },
  });
};

const getAccepts = (record) => {
  if (record.configSn === 'SYS_FAVICON_IMG') {
    return '.ico';
  }
  return '.png';
};


function handleUpload(record: Recordable<any>) {
}

</script>
<style lang="scss" scoped>
</style>
