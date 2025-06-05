<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';

import { AuthPageLayout } from '@vben/layouts';
import {updatePreferences, preferences} from '@vben/preferences';

import { $t } from '#/locales';
import {getSysConfig} from "#/api/sys/user";

const appName = computed(() => preferences.app.name);
const logo = computed(() => preferences.logo.source);
const sloganImage = ref();
onMounted(() => {

});
getSysConfig().then(res => {
  debugger;
  if(res){
    for (let item in res) {
      /*
      * appName
      :
      "飞流数智化"
      beiAnNo
      :
      "粤ICP备20002509号"
      bpmnDesignerAutoSaveSwitch
      :
      "0"
      companyName
      :
      null
      faviconImg
      :
      "data:image/x-icon;base64,AAABAAEAQEAAAAEAIAAoQgAA
      loginBgImg
      :
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB9A
      logoImg
      :
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMA
      signInDesc
      :
      null
      signInTitle
      :
      null
      watermarkRule
      :
      "BPMS平台：bpmport.com"
      watermarkSwitch
      :
      "1"*/
    }
    sloganImage.value = res.loginBgImg;

    if(res.faviconImg){
      const link = window.document.querySelector("link[rel*='icon']") || window.document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'icon';
      link.href = res.faviconImg;
    }

    updatePreferences({
      app: {
        name: res.appName
      },
      copyright: {
        companyName: res.companyName,
        companySiteLink: res.companySiteLink,
        date: '',
        icp: res.beiAnNo,
        icpLink: 'https://beian.miit.gov.cn',
      },
      logo: {
        source: res.logoImg
      }
    });
  }
})

</script>

<template>
  <AuthPageLayout
    :slogan-image="sloganImage"
    :app-name="appName"
    :logo="logo"
    :page-description="$t('authentication.pageDesc')"
    :page-title="$t('authentication.pageTitle')"
  >
    <!-- 自定义工具栏 -->
    <!-- <template #toolbar></template> -->
  </AuthPageLayout>
</template>
