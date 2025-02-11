<template>
  <div class="w-full h-full">
    <Spin
      wrapperClassName="custom-spin-container"
      :spinning="loading"
      size="large"
      class="w-full h-full"
    >
      <iframe class="w-full h-full" :src="frameSrc" ref="frameRef"></iframe>
    </Spin>
  </div>
</template>
<script lang="ts" setup>

import type {CSSProperties} from 'vue';
import {defineProps, defineEmits, defineExpose} from 'vue';
import {ref, unref, onMounted, nextTick, computed} from 'vue';
import {Spin} from 'ant-design-vue';
import {getViewportOffset} from '#/utils/domUtils';
// import { useWindowSizeFn } from '@vben/hooks';
// import { propTypes } from '@/utils/propTypes';
// import { useDesign } from '@/hooks/web/useDesign';
// import { getToken } from '@/utils/auth';
import { useAccessStore } from '@vben/stores';

const props = defineProps({
  frameSrc: {
    type: String,
    default: ''
  },
  onLoad: {
    type: Function,
    default: () => {
    },
  },
});

const emit = defineEmits(['onLoadSuccess'])

const loading = ref(false);
const topRef = ref(50);
const heightRef = ref(window.innerHeight);
const frameRef = ref<HTMLFrameElement | null>(null);

// const { prefixCls } = useDesign('iframe-page');
// useWindowSizeFn(calcHeight, 150, { immediate: true });

const getWrapStyle = computed((): CSSProperties => {
  return {
    height: `100%`,
  };
});

function calcHeight() {
  const iframe = unref(frameRef);
  if (!iframe) {
    return;
  }
  let {top} = getViewportOffset(iframe);
  top += 20;
  topRef.value = top;
  heightRef.value = window.innerHeight - top;
  const clientHeight = document.documentElement.clientHeight - top;
  iframe.style.height = `${clientHeight}px`;
}

function hideLoading() {
  loading.value = false;
  calcHeight();
}

function init() {
  nextTick(() => {
    const iframe = unref(frameRef);
    if (!iframe) return;

    const _frame = iframe as any;
    if (_frame.attachEvent) {
      _frame.attachEvent('onload', () => {
        try {
          emit('onLoadSuccess');
          handleLoadSuccess(_frame);
        } catch (e) {
          console.warn('未定义加载成功回调函数 - 【onLoadSuccess】');
        }
        hideLoading();
      });
    } else {
      iframe.onload = () => {
        try {
          emit('onLoadSuccess', iframe.contentWindow);
          handleLoadSuccess(iframe);
        } catch (e) {
          console.warn('未定义加载成功回调函数 - 【onLoadSuccess】');
        }
        hideLoading();
      };
    }
  });
}

// 将token发送给子iframe窗口
const handleLoadSuccess = (iframe) => {
  const accessStore = useAccessStore();

  // 发送消息到子窗口
  const iframeContentWindow = iframe.contentWindow;

  const msg = {
    type: 'userInfo',
    message: {
      token: accessStore.accessToken,
    },
  };

  iframeContentWindow.postMessage(JSON.stringify(msg), '*');
};

onMounted(() => {
  loading.value = true;
  init();
});

/*
  export default defineComponent({
    name: 'IFrame',
    components: { Spin },
    props: {
      frameSrc: propTypes.string.def(''),
      onLoad: {
        type: Function,
        default: () => {},
      },
    },
    emits: ['onLoadSuccess'],
    setup(_, { emit }) {
      return {
        getWrapStyle,
        loading,
        frameRef,
        prefixCls,
      };
    },
  });*/
</script>
<style lang="scss">
.custom-spin-container {
  .ant-spin-container {
    width: 100%;
    height: 100%;
  }
}
</style>
<style lang="scss" scoped>
//@prefix-cls: ~'@{namespace}-iframe-page';

/*.@{prefix-cls} {
  .ant-spin-nested-loading {
    position: relative;
    height: 100%;

    .ant-spin-container {
      width: 100%;
      height: 100%;
      padding: 10px;
    }
  }

  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__main {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: @component-background;
    border: 0;
    box-sizing: border-box;
  }
}*/
</style>
