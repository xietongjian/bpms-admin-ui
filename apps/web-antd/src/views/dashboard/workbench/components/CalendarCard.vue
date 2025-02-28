<template>
  <Card v-bind="$attrs" body-style="padding: 0px">
    <Calendar v-model:value="value" :fullscreen="false" @panelChange="onPanelChange"/>
  </Card>
</template>
<script lang="ts" setup>
import {ref} from 'vue';
import {Dayjs} from 'dayjs';

import {Calendar, Card} from 'ant-design-vue';

const value = ref<Dayjs>();
const onPanelChange = (value: Dayjs, mode: string) => {
  console.log(value, mode);
};
</script>
