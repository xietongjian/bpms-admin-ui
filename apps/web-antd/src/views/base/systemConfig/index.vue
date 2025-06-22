<template>
  <Page auto-content-height
        class="w-full"
        title="系统配置">
    <template #description>
      <div class="w-[40%] m-auto">
        <InputSearch
          v-model:value="keyword"
          placeholder="请输入关键字"
          :loading="loading"
          enter-button
        />
      </div>
    </template>
    <div class="w-[80%] m-auto">
      <div class="min-h-96" v-loading="loading">
        <Card class="mb-4" size="small  " v-for="(item, index) in configList" :key="index">
          <TextSetting
            v-if="['SYS_BEI_AN_NO', 'SYS_COMPANY_NAME', 'SYS_APP_NAME'].includes(item.configSn)"
            :data-item="item"
          />

          <ImageSetting
            v-if="item.configSn.endsWith(END_WITH_IMG)"
            :data-item="item"
          />

          <SwitchSetting
            v-if="!['SYS_WATERMARK_SWITCH'].includes(item.configSn)
          && item.configSn.endsWith(END_WITH_SWITCH)"
            :data-item="item"
          />

          <WatermarkSetting
            v-if="['SYS_WATERMARK_SWITCH'].includes(item.configSn)"
            :switch-data-item="watermarkSwitchDataItem"
            :rule-data-item="watermarkRuleDataItem"
          />

        </Card>
      </div>
    </div>
  </Page>
</template>
<script lang="ts" setup>
import {ref, onMounted, computed} from 'vue';
import {getAll} from '#/api/base/systemConfig';
import {Page} from "@vben/common-ui";
import TextSetting from "./components/TextSetting.vue";
import ImageSetting from "./components/ImageSetting.vue";
import SwitchSetting from "./components/SwitchSetting.vue";
import WatermarkSetting from "./components/WatermarkSetting.vue";
import {Card, Input} from 'ant-design-vue'

const InputSearch = Input.Search;

const END_WITH_IMG = "_IMG";
const END_WITH_SWITCH = "_SWITCH";

const configList = ref([]);
const keyword = ref('');
const loading = ref(false);

const watermarkSwitchDataItem = computed(() => {
  return configList.value.find(item => {
    return ['SYS_WATERMARK_SWITCH'].includes(item.configSn)
  });
})
const watermarkRuleDataItem = computed(() => {
  return configList.value.find(item => {
    return ['SYS_WATERMARK_RULE'].includes(item.configSn)
  });
})

onMounted(async () => {
  loading.value = true;
  try {
    const res = await getAll();
    configList.value = res as any[];
  } catch (e) {
  } finally {
    loading.value = false;
  }
})
</script>
<style lang="scss" scoped>
</style>
