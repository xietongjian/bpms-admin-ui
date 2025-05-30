<template>
  <div class="h-full h-full">
    <Spin wrapperClassName="h-full w-full custom-spin-container" :spinning="loading" size="large">
      <iframe class="!w-full !h-full border-0" :src="frameSrc" ref="frameRef"></iframe>
    </Spin>
  </div>
</template>

<script lang="ts" setup>
import {ref, unref, onMounted, nextTick, defineExpose, defineEmits, watch, computed} from 'vue';
import {Spin, message} from 'ant-design-vue';
import {getViewportOffset} from '#/utils/domUtils';
// import { useWindowSizeFn } from '@vben/hooks';
import {useAccessStore} from '@vben/stores';


// import { useDesign } from '@/hooks/web/useDesign';
// import { getToken } from '@/utils/auth';
import {getBpmnByModelId} from '#/api/flowable/bpmn/modelInfo';
// import { useDarkModeTheme } from '@/hooks/setting/useDarkModeTheme';
import {usePreferences} from '@vben/preferences';

const {isDark} = usePreferences();
const getTheme = computed(() => (isDark.value ? 'dark' : 'light'));

const accessStore = useAccessStore();

const dmnModeler = ref<any>();
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
    default: () => {
    },
  },
});

const frameSrc = '/static/dmn/designer/index.html';

const emit = defineEmits(['onLoadSuccess']);

const loading = ref(false);
const topRef = ref(50);
const heightRef = ref(window.innerHeight);
const frameRef = ref<HTMLIFrameElement>();

// const { prefixCls } = useDesign('iframe-page');
// useWindowSizeFn(calcHeight, { immediate: true, wait: 150 });

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
  let {top} = getViewportOffset(iframe);
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
    loading.value = true;
    const iframe = unref(frameRef);
    if (!iframe) return;

    const _frame = iframe as any;
    if (_frame.attachEvent) {
      _frame.attachEvent('onload', () => {
        try {
          emit('onLoadSuccess', _frame);
          handleLoadSuccess(_frame);
          fitHeight();
        } catch (e) {
          console.warn('未定义加载成功回调函数 - 【onLoadSuccess】');
        } finally {
          loading.value = false;
        }
      });
    } else {
      iframe.onload = () => {
        try {
          emit('onLoadSuccess', _frame);
          handleLoadSuccess(iframe);
          // fitHeight();
        } catch (e) {
          console.error(e);
          console.warn('未定义加载成功回调函数 - 【onLoadSuccess】');
        } finally {
          loading.value = false;
        }
      };
    }
  });
}

const initCallback = (modeler) => {
  modeler.on('linting.completed', ({issues}) => {
    issuesMap.value = issues;
    console.log(issues);
  });
};
const handleLoadSuccess = (iframe) => {
  // 发送消息到子窗口
  const iframeContentWindow = iframe.contentWindow;
  const msg = {
    type: 'userInfo',
    message: {
      token: accessStore.accessToken
    },
  };

  iframeContentWindow.postMessage(JSON.stringify(msg), '*');
};

// 加载xml
const loadModelXml = async (modelXml: string) => {
  if (!modelXml) {
    message.error('modelXml为空，加载失败！');
    return;
  }
  const frameWindow = frameRef.value?.contentWindow;
  const dmnModeler = frameWindow.dmnModeler;
  loading.value = true;
  try {
    if (dmnModeler) {
      dmnModeler.importXML(modelXml).then(() => {
        dmnModeler?.get('canvas').zoom('fit-viewport', {});
        loading.value = false;
        hideViewDrdBtn(frameWindow);
      }).catch((e) => {
        // message.error('加载设计器XML失败！', e);
        console.error(e);
        loading.value = false;
      });

    } else {
      console.error('未获取到dmnModeler对象');
    }
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

function hideViewDrdBtn() {
  const frameWindow = frameRef.value?.contentWindow;

  const viewDrdBtn = frameWindow.document.querySelector(
    '.dmn-full-designer .tjs-container .view-drd',
  );
  if (!viewDrdBtn) {
    return;
  }
  viewDrdBtn.style.display = 'none';
}

async function updateModelInfo() {
  await nextTick();
  const iframeContentWindow = frameRef.value?.contentWindow as any;
  if (!iframeContentWindow || !iframeContentWindow.updateModelInfo) {
    return;
  }
  console.log('更新流程信息: ', {modelKey: props.modelKey, modelName: props.modelName});
  // 新增内容，手动设置模板id和名称
  iframeContentWindow.updateModelInfo({id: props.modelKey, name: props.modelName});
}

const getModelXml = () => {
  const frameWindow = frameRef.value?.contentWindow;
  const dmnModeler = frameWindow.dmnModeler;
  return dmnModeler.saveXML({format: true});
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
  init();
});

watch(
  () => props.modelKey,
  () => updateModelInfo(),
  {immediate: true},
);

defineExpose({
  getModelXml,
  loadModelXml,
  getIssuesMap,
  hideViewDrdBtn,
});
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
