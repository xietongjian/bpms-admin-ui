<template>
  <div v-if="type === 'icon'" class="!w-[120px] !h-[120px] flex items-center justify-center">
    <img :alt="statusName"
         :title="statusName"
         :src="approveStatusBgSvg"
         :class="`status_bg_color_${statusStyle}`"
    />
    <span class="absolute rotate-[0.258rad] top-[48%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-[20px]">
      {{statusName}}
    </span>
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
import approveStatusBgSvg from '#/assets/images/approve-status-bg.svg'
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
  } else if (['ZZ', 'zz'].includes(props.status)) {
    // 已终止
    statusStyle = 'error';
  } else {
    // 其他
    statusStyle = 'default';
  }
  return statusStyle;
}

</script>

<style lang="scss">
.status_bg_color {
  &_processing{
    filter: brightness(73) saturate(80%) invert(62%) sepia(238%) saturate(437%) hue-rotate(168deg) brightness(95%) contrast(221%);
    &+span {
      color: #006be6;
    }
  }
  &_error {
    filter: brightness(73) saturate(80%) invert(62%) sepia(238%) saturate(437%) hue-rotate(290deg) brightness(73%) contrast(221%);
    &+span {
      color: red;
    }
  }
  &_success {
    filter: brightness(26) saturate(24%) invert(62%) sepia(285%) saturate(500%) hue-rotate(107deg) brightness(98%) contrast(167%);
    &+span {
      color: #16a652;
    }
  }
  &_default {
    filter: contrast(0);
    &+span {
      color: #888;
    }
  }
}
</style>
