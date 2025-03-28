<template>
  <div :style="getWrapStyle">
    <Spin
      wrapperClassName="custom-spin-container"
      :spinning="loading"
      size="large"
      :style="getWrapStyle"
    >
      <iframe
        id="customTaskFormIframe"
        :src="frameSrc"
        :class="`__main`"
        ref="frameRef"
      ></iframe>
    </Spin>
  </div>
</template>
<script lang="ts" setup>
  import type { CSSProperties } from 'vue';
  import { ref, unref, defineProps, onMounted, nextTick, computed } from 'vue';
  import { Spin } from 'ant-design-vue';

  import { getViewportOffset } from '#/utils/domUtils';
  import { useWindowSize } from '@vueuse/core'

  // import { useWindowSizeFn } from '@vben/hooks';

  // import { propTypes } from '#/utils/propTypes';
  // import { useDesign } from '@/hooks/web/useDesign';

  const loading = ref(false);
  const topRef = ref(50);
  const heightRef = ref(window.innerHeight);
  const frameRef = ref<HTMLFrameElement | null>(null);
  // const { prefixCls } = useDesign('iframe-page');
  useWindowSize(calcHeight, 200, { immediate: true });

  const props = defineProps({
    frameSrc: {
      type: String,
      default: ''
    },
  })

  const reloadFrame = (src) => {
    const iframe = unref(frameRef);
    if (!iframe) {
      return;
    }
  };
  const getWrapStyle = computed((): CSSProperties => {
    return {
      height: `${unref(heightRef)}px`,
    };
  });

  function calcHeight() {
    const iframe = unref(frameRef);
    if (!iframe) {
      return;
    }
    let { top } = getViewportOffset(iframe);
    top += 15;
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
          hideLoading();
        });
      } else {
        iframe.onload = () => {
          hideLoading();
        };
      }
    });
  }
  onMounted(() => {
    loading.value = true;
    init();
  });

  /*export default defineComponent({
    name: 'IFrame',
    components: { Spin },
    props: {
      frameSrc: propTypes.string.def(''),
    },
    setup() {


      return {
        getWrapStyle,
        loading,
        frameRef,
        reloadFrame,
        calcHeight,
        prefixCls,
      };
    },
  });*/
</script>
<style lang="less">
  .custom-spin-container {
    .ant-spin-container {
      width: 100%;
      height: 100%;
    }
  }
</style>
<style lang="scss" scoped>
  /*@prefix-cls: ~'@{namespace}-iframe-page';

  .@{prefix-cls} {
    .ant-spin-nested-loading {
      position: relative;
      height: 100%;
      .ant-spin-container {
        width: 100%;
        height: 100%;
        padding: 10px;
        background: red;
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
