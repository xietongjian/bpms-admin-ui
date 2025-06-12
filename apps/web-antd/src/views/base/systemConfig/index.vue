<template>
  <Page auto-content-height class="overflow-y-auto">

    <div v-for="(item, index) in configList" :key="index">
      <TextSetting
          v-if="['SYS_WATERMARK_RULE', 'SYS_BEI_AN_NO', 'SYS_COMPANY_NAME', 'SYS_APP_NAME'].includes(item.configSn)"
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

    </div>
  </Page>
</template>
<script lang="ts" setup>
import {ref, onMounted, computed} from 'vue';
import { getAll } from '#/api/base/systemConfig';
import {Page} from "@vben/common-ui";
import TextSetting from "./components/TextSetting.vue";
import ImageSetting from "./components/ImageSetting.vue";
import SwitchSetting from "./components/SwitchSetting.vue";
import WatermarkSetting from "./components/WatermarkSetting.vue";

const END_WITH_IMG = "_IMG";
const END_WITH_SWITCH = "_SWITCH";

const configList = ref([]);

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
  const res = await getAll();

  configList.value = res as any[];
})
</script>
<style lang="scss" scoped>
</style>
