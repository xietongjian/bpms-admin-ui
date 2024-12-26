<template>
  <div class="h-full" :class="prefixCls">
    <Spin wrapperClassName="custom-spin-container" :spinning="loading" size="large">
      <iframe class="w-full" :src="frameSrc" :class="`${prefixCls}__main`" ref="frameRef"></iframe>
    </Spin>
  </div>
</template>

<script lang="ts" setup>
  import { ref, unref, onMounted, nextTick, defineExpose, watch } from 'vue';
  import { Spin } from 'ant-design-vue';
  import { getViewportOffset } from '#/utils/domUtils';
  // import { useWindowSizeFn } from '@vben/hooks';

  // import { useDesign } from '@/hooks/web/useDesign';
  // import { getToken } from '@/utils/auth';
  import { getBpmnByModelId } from '#/api/flowable/bpmn/modelInfo';
  // import { useDarkModeTheme } from '@/hooks/setting/useDarkModeTheme';

  const { isDark } = useDarkModeTheme();

  const bpmnModeler = ref<any>();
  const issuesMap = ref({});

  const props = defineProps({
    modelId: {
      type: String,
      default: '',
    },
    modelKey: {
      type: String,
      default: '',
    },
    modelName: {
      type: String,
      default: '',
    },
    onLoad: {
      type: Function,
      default: () => {},
    },
  });

  const frameSrc = '/static/bpmn/designer/index.html';

  const emit = defineEmits(['onLoadSuccess']);

  const loading = ref(false);
  const topRef = ref(50);
  const heightRef = ref(window.innerHeight);
  const frameRef = ref<HTMLIFrameElement>();
  const { createMessage } = useMessage();

  const { prefixCls } = useDesign('iframe-page');
  useWindowSizeFn(calcHeight, { immediate: true, wait: 150 });

  // const getWrapStyle = computed((): CSSProperties => {
  //   return {
  //     height: `${unref(heightRef)}px`,
  //   };
  // });

  function calcHeight() {
    const iframe = unref(frameRef);
    if (!iframe) {
      return;
    }
    let { top } = getViewportOffset(iframe);
    top += 2;
    topRef.value = top;
    heightRef.value = window.innerHeight - top;
    const clientHeight = document.documentElement.clientHeight - top;
    iframe.style.height = `${clientHeight}px`;
  }

  function fitHeight() {
    // loading.value = false;
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
            emit('onLoadSuccess', _frame);
            handleLoadSuccess(_frame);
          } catch (e) {
            console.warn('未定义加载成功回调函数 - 【onLoadSuccess】');
          }
          fitHeight();
        });
      } else {
        iframe.onload = () => {
          try {
            emit('onLoadSuccess', _frame);
            handleLoadSuccess(iframe);
          } catch (e) {
            console.warn('未定义加载成功回调函数 - 【onLoadSuccess】');
          }
          fitHeight();
        };
      }
    });
  }

  const initCallback = (modeler) => {
    modeler.on('linting.completed', ({ issues }) => {
      issuesMap.value = issues;
      console.log(issues);
    });
  };

  // 将token发送给子iframe窗口
  const handleLoadSuccess = (iframe) => {
    // 发送消息到子窗口
    const iframeContentWindow = iframe.contentWindow;
    bpmnModeler.value = iframeContentWindow.bpmnModeler;
    if (!iframeContentWindow.bpmnModeler) {
      createMessage.error('设计器加载失败，原因：window下面bpmnModeler对象丢失！');
      return;
    }
    const msg = {
      type: 'userInfo',
      message: {
        token: getToken(),
      },
    };
    hideSaveBtn(iframe);
    changeDesignerTheme(iframe);
    initCallback(bpmnModeler.value);
    iframeContentWindow.postMessage(JSON.stringify(msg), '*');
    // 加载 xml
    loadModelXml(iframe);
  };

  // 加载xml
  const loadModelXml = () => {
    if (!props.modelKey) {
      createMessage.error('modelKey为空，加载失败！');
      return;
    }
    loading.value = true;
    getBpmnByModelId({ modelId: props.modelId })
      .then((res) => {
        if (bpmnModeler.value) {
          bpmnModeler.value
            .importXML(res.modelXml)
            .then(() => {
              bpmnModeler.value?.get('canvas').zoom('fit-viewport', {});
              loading.value = false;
            })
            .catch((e) => {
              createMessage.error('加载设计器XML失败！', e);
              loading.value = false;
            });

          updateModelInfo();
        } else {
          loading.value = false;
        }
      })
      .catch((e) => {
        console.error(e);
        loading.value = false;
      });
  };

  async function updateModelInfo() {
    await nextTick();
    const iframeContentWindow = frameRef.value?.contentWindow as any;
    if (!iframeContentWindow || !iframeContentWindow.updateModelInfo) {
      return;
    }
    console.log('更新流程信息: ', { modelKey: props.modelKey, modelName: props.modelName });
    // 新增内容，手动设置模板id和名称
    iframeContentWindow.updateModelInfo({ id: props.modelKey, name: props.modelName });
  }

  const getBpmnXml = () => {
    return bpmnModeler.value.saveXML({ format: true });
  };

  const hideSaveBtn = (iframe) => {
    const iframeWindow = iframe.contentWindow;
    if (iframeWindow) {
      const btns = iframeWindow.document.querySelector('.bpmn-toolbar .arco-btn-group');
      if (btns) {
        if (btns.children) {
          if (btns.children[0].innerText === '保存') {
            btns.children[0].style.display = 'none';
          }
        }
      }
    }
  };

  const changeDesignerTheme = (iframe) => {
    // 获取当前框架主题
    const iframeWindow = iframe.contentWindow;
    if (iframeWindow) {
      if (isDark.value) {
        iframeWindow.document.body.setAttribute('arco-theme', 'dark');
      } else {
        iframeWindow.document.body.removeAttribute('arco-theme');
      }
    }
  };

  const getIssuesMap = () => {
    return issuesMap.value;
  };

  onMounted(() => {
    loading.value = true;
    init();
  });

  watch(
    () => props.modelKey,
    () => updateModelInfo(),
    { immediate: true },
  );

  defineExpose({
    getBpmnXml,
    getIssuesMap,
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
  /*@prefix-cls: ~'@{namespace}-iframe-page';

  .@{prefix-cls} {
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
