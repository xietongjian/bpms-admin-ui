<template>
  <div class="verifyMask" v-show="showBox">
    <div
      :class="'verifybox'"
      :style="{ 'max-width': parseInt(imgSize.width) + 30 + 'px' }"
    >
      <div class="verifybox-top">
        请完成安全验证
        <span class="verifybox-close" @click="closeBox">
          <i class="verify-iconfont icon-close"></i>
        </span>
      </div>
      <div class="verifybox-bottom" style="padding: '15px'">
        <VerifySlide
          :vSpace="vSpace"
          :explain="explain"
          :imgSize="imgSize"
          :blockSize="blockSize"
          :barSize="barSize"
          :loginFn="loginFn"
          ref="instance"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import VerifySlide from './Verify/VerifySlide.vue'
import { computed, ref } from 'vue'

const props = defineProps({
  vSpace: {
    type: Number,
  },
  explain: {
    type: String,
  },
  imgSize: {
    type: Object,
    default() {
      return {
        width: '310px',
        height: '160px',
      }
    },
  },
  blockSize: {
    type: Object,
  },
  barSize: {
    type: Object,
  },
  loginFn: {
    type: Function,
    default: () => {},
  },
})

const clickShow = ref(false)
const instance = ref({})

const showBox = computed(() => {
  return clickShow.value
})

const refresh = () => {
  if (instance.value.refresh) {
    instance.value.refresh()
  }
}
const closeBox = () => {
  clickShow.value = false
  refresh()
}
const show = () => {
  clickShow.value = true
}

defineExpose({ show, refresh, closeBox })
</script>

<style scoped>
.verifyMask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  transition: all 0.5s;
}
.verifyMask .verifybox {
  position: relative;
  box-sizing: border-box;
  border-radius: 2px;
  border: 1px solid #e4e7eb;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.verifyMask .verifybox-top {
  padding: 0 15px;
  height: 50px;
  line-height: 50px;
  text-align: left;
  font-size: 16px;
  color: #45494c;
  border-bottom: 1px solid #e4e7eb;
  box-sizing: border-box;
}
.verifyMask .verifybox-bottom {
  padding: 15px;
  box-sizing: border-box;
}
.verifyMask .verifybox-close {
  position: absolute;
  top: 13px;
  right: 9px;
  width: 24px;
  height: 24px;
  text-align: center;
  cursor: pointer;
}
.verifyMask .verify-iconfont {
  font-family: 'iconfont' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.verifyMask .icon-close:before {
  content: '\2716';
  display: block;
  width: 16px;
  height: 16px;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9999;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #666;
}
</style>
