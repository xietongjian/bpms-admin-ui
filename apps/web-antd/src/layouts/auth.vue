<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';

import { AuthPageLayout } from '@vben/layouts';
import {updatePreferences, preferences} from '@vben/preferences';

import { $t } from '#/locales';
import {getSysConfig} from "#/api/sys/user";

const appName = computed(() => preferences.app.name);
const logo = computed(() => preferences.logo.source);
const sloganImage = computed(() => preferences.app.sloganImage);

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
