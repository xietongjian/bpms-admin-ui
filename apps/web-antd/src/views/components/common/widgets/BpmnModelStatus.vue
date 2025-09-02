<template>
  <Tag :color="tagColor">{{statusName}}</Tag>
</template>

<script lang="ts" setup>
/**
 * 流程模板状态
 */
import {computed, defineProps} from 'vue';
import {Tag} from 'ant-design-vue';

const props = defineProps({
  status: {default: '', type: Number},
  statusName: {default: '草稿', type: String},
});

const tagColor = computed(() => {
  let color = '';
  if (~~props.status === 2) {
    color = '#2db7f5';
  } else if (~~props.status === 3) {
    color = '#87d068';
  } else if (~~props.status === 4) {
    color = '#f50';
  } else {
    color = 'gray';
  }
  return color;
})

const statusName = computed(() => {
  return props.statusName || '草稿';
})

</script>
