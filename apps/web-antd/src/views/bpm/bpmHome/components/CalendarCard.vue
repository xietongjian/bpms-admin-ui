<template>
  <Card title="日历" v-bind="$attrs" bodyStyle="padding: 0;">
    <Calendar v-model:value="value" :fullscreen="false" @panelChange="onPanelChange"/>
  </Card>
</template>
<script lang="ts" setup>
import {ref} from 'vue';
import {Dayjs} from 'dayjs';

import {Card, Calendar} from 'ant-design-vue';

const value = ref<Dayjs>();
const onPanelChange = (value: Dayjs, mode: string) => {
  console.log(value, mode);
};



</script>
