<template>
  <div v-if="type === 'icon'" class="!w-[120px] !h-[120px] flex items-center justify-center">
<!--    <Badge :status="statusStyle" :text="statusName" />-->
    <svg class="opacity-50 w-full h-full" xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24" viewBox="0 0 24 24">
      <path fill="currentColor" d="M20.39 19.37L16.38 18L15 22l-3.08-6L9 22l-1.38-4l-4.01 1.37l2.92-6A6.97 6.97 0 0 1 5 9a7 7 0 0 1 7-7a7 7 0 0 1 7 7c0 1.65-.57 3.17-1.53 4.37zM7 9l2.69 1.34l-.19 3l2.5-1.66l2.5 1.65l-.17-2.99L17 9l-2.68-1.35l.18-2.98L12 6.31L9.5 4.65l.17 3.01z"/>
    </svg>
    <span class="absolute rotate-45 top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-[20px]">{{statusName}}</span>
  </div>
  <div v-else-if="type === 'text'" >
    <Badge :status="statusStyle" :text="statusName" />
  </div>
  <div v-else>
    未知状态
  </div>
</template>

<script lang="ts" setup>
import { type PropType } from 'vue'
import {computed, defineProps} from 'vue';
import {Badge} from 'ant-design-vue';

const props = defineProps({
  status: {
    type: String as PropType<'SPZ' | 'BJ' | 'JQ' | 'ZZ' | 'applying' | 'draft' | 'revoke' | 'end' | 'zz'>,
    default: 'draft',
  },
  statusName: {
    type: String,
    default: '-',
  },
  type: {
    type: String,
    default: 'text',
  },
});

const statusStyle = computed(() => {
  return getApproveStatusIcon();
})

function getApproveStatusIcon(){
  let statusStyle = '';
  if (['SPZ', 'applying'].includes(props.status)) {
    // 审批中
    statusStyle = 'processing';
  } else if (['BJ', 'end'].includes(props.status)) {
    // 已办结
    statusStyle = 'success';
  } else if (['JQ', 'revoke'].includes(props.status)) {
    // 已驳回
    statusStyle = 'warning';
  } else if (['ZZ'].includes(props.status)) {
    // 已终止
    statusStyle = 'error';
  } else {
    // 其他
    statusStyle = 'default';
  }
  return statusStyle;
}

</script>
