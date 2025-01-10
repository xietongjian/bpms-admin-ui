<script lang="ts" setup>
  import VueJsonPretty from 'vue-json-pretty';
  import 'vue-json-pretty/lib/styles.css';
  import { usePreferences } from '@vben/preferences';
  import {computed} from "vue";

  const { isDark } = usePreferences();

  const getTheme = computed(() => (isDark.value ? 'dark' : 'light'));

  defineProps({
    data: Object,
  });
</script>

<template>
  <vue-json-pretty
    :theme="getTheme"
    :path="'res'"
    :deep="3"
    :showLength="true"
    :data="data"
  />
</template>
