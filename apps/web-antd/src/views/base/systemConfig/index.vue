<template>
  <Page auto-content-height class="overflow-y-auto">

    <div v-for="(item, index) in configList" :key="index">
<!--      <FaviconSetting v-if="item.configSn === 'SYS_FAVICON_IMG'" :data-item="item"/>-->
      <TextSetting
          v-if="['SYS_WATERMARK_RULE', 'SYS_BEI_AN_NO', 'SYS_COMPANY_NAME', 'SYS_APP_NAME'].includes(item.configSn)"
          :data-item="item"
      />

      <ImageSetting
          v-if="['SYS_LOGIN_BG_IMG', 'SYS_LOGO_IMG', 'SYS_FAVICON_IMG'].includes(item.configSn)"
          :data-item="item"
      />

      <SwitchSetting
          v-if="['SYS_WATERMARK_SWITCH'].includes(item.configSn)"
          :data-item="item"
          @change="handleChange"
      />
<!--      <BasicForm class="bg-card p-4 mb-4" :schema="dynamicFormSchema(item)" />-->
<!--      <div v-if="item.configSn.endsWith(IMG_END_WITH)">
        图片

      </div>-->
<!--      {{index}}
      {{item.id}}
      {{item.image}}

      {{item.remark}}-->
<!--      {{item.configValue}}-->


    </div>
    {{configList}}
  </Page>
</template>
<script lang="ts" setup>
import {nextTick, ref, onMounted} from 'vue';
import {PerEnum} from '#/enums/perEnum';
// import { BasicTable, useTable, TableAction, TableImg } from '@/components/Table';
import {getSystemConfigListByPage, deleteByIds, saveOrUpdate} from '#/api/base/systemConfig';
import {Upload, Tooltip, Space, message, Modal, Button} from 'ant-design-vue';
import { dynamicFormSchema} from './systemConfig.data';
import type {Recordable} from '@vben/types';
import {useVbenForm} from "#/adapter/form";

import {Page} from "@vben/common-ui";
import FaviconSetting from "./components/ImageSetting.vue";
import TextSetting from "./components/TextSetting.vue";
import ImageSetting from "./components/ImageSetting.vue";
import SwitchSetting from "#/views/base/systemConfig/components/SwitchSetting.vue";

const PerPrefix = 'SystemConfig:';

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

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      // class: 'w-full',
    },
  },
  showDefaultActions: true,
  wrapperClass: 'grid-cols-2 md:grid-cols-1 lg:grid-cols-3',
  actionWrapperClass: 'col-span-4 col-start-0 text-left ml-0',
  submitButtonOptions: {
    content: '保存'
  },
  resetButtonOptions: {show: false},
  layout: 'vertical',
});

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
