<template>
  <div :class="prefixCls">
    <Spin
      wrapperClassName="custom-spin-container"
      :spinning="loading"
      size="large"
      :style="getWrapStyle"
    >
      <iframe :src="frameSrc" :class="`${prefixCls}__main`" ref="frameRef"></iframe>
    </Spin>
  </div>
</template>
<script lang="ts">
  import type { CSSProperties } from 'vue';
  import { defineComponent, ref, unref, onMounted, nextTick, computed } from 'vue';
  import { Spin } from 'ant-design-vue';
  import { getViewportOffset } from '#/utils/domUtils';
  import { useWindowSizeFn } from '@vben/hooks';
  import { propTypes } from '@/utils/propTypes';
  import { useDesign } from '@/hooks/web/useDesign';

  const defaultHeight = 200;

  export default defineComponent({
    name: 'ProcessFormIFrame',
    components: { Spin },
    props: {
      frameSrc: propTypes.string.def(''),
      onLoad: {
        type: Function,
        default: () => {},
      },
    },
    setup(_, { emit }) {
      const loading = ref(false);
      const topRef = ref(50);
      const heightRef = ref(window.innerHeight);
      const frameRef = ref<HTMLFrameElement | null>(null);
      const { prefixCls } = useDesign('iframe-page');
      // useWindowSizeFn(calcHeight, 2000, { immediate: true });
      const calclHeightInterval = ref(null);
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
        top += 20;
        topRef.value = top;
        heightRef.value = window.innerHeight - top;
        const clientHeight = iframe.contentDocument.body.scrollHeight + 20;

        let resultHeight = clientHeight <= defaultHeight ? defaultHeight : clientHeight;

        // 判断是否有弹窗，有弹窗则重新调整高度，避免弹窗与当前可视窗口不匹配的视觉影响
        const dialogs =
          iframe.contentWindow.document.getElementsByClassName('cus-dialog-container');
        if (dialogs.length > 0) {
          for (const item of dialogs) {
            if (item.style.display !== 'none') {
              resultHeight = defaultHeight + 300;
            }
          }
        }
        iframe.style.height = `${resultHeight}px`;
      }

      function autoCalcHeight() {
        calclHeightInterval.value = setInterval(() => {
          calcHeight();
          try {
            const ev = document.createEvent('Event');
            ev.initEvent('resize', true, true);
            window.dispatchEvent(ev);
          } catch (e) {
            console.warn('此浏览器不支持触发resize事件，触发resize事件失败！');
          }
        }, 500);
      }

      function hideLoading() {
        loading.value = false;
        calcHeight();
        if (unref(calclHeightInterval)) {
          clearInterval(unref(calclHeightInterval));
        }
        autoCalcHeight();
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
              emit('onLoad');
            };
          }
        });
      }
      onMounted(() => {
        loading.value = true;
        init();
      });
      function hideIframeLoading() {
        hideLoading();
      }
      return {
        getWrapStyle,
        loading,
        frameRef,
        prefixCls,
        hideIframeLoading,
      };
    },
  });
</script>
<style lang="less">
  .custom-spin-container {
    .ant-spin-container {
      width: 100%;
      height: 100%;
    }
  }
</style>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-iframe-page';

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
  }
</style>
