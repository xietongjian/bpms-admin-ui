<script setup lang="ts">
import type { SelectValue } from 'ant-design-vue/es/select';

import type { PropType } from 'vue';

import ApiSelect from './api-select.vue';

const props = defineProps({
  options: {
    // 值
    type: [Array] as PropType<SelectValue[]>,
    default: undefined,
  },
});
const apiFun = () => {
  return Promise.resolve(props.options || []);
};
</script>
<template>
  <ApiSelect :api="apiFun" />
</template>
