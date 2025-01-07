<template>
  <div
    class="relative !h-full w-full overflow-hidden"
    :class="{ 'ant-input': props.bordered, 'css-dev-only-do-not-override-kqecok': props.bordered }"
    ref="el"
  ></div>
</template>

<script lang="ts" setup>
  import {
    type PropType,
    ref,
    onMounted,
    onUnmounted,
    watchEffect,
    watch,
    unref,
    nextTick,
  } from 'vue';
  // import type { Nullable } from '@vben/types';
  // import { useWindowSizeFn } from '@vben/hooks';

  import { useDebounceFn, useWindowSize } from '@vueuse/core';
  // import { useAppStore } from '@/store/modules/app';
  import {usePreferences} from '@vben/preferences';

  // 引入所需的 CodeMirror 模块
  import { basicSetup } from 'codemirror'
  import EditorView from 'codemirror'

  // import CodeMirror from 'codemirror';
  // import type { EditorConfiguration } from 'codemirror';
  import { MODE, parserDynamicImport } from './../typing';


  const props = defineProps({
    mode: {
      type: String as PropType<MODE>,
      default: MODE.JSON,
      validator(value: any) {
        // 这个值必须匹配下列字符串中的一个
        return Object.values(MODE).includes(value);
      },
    },
    value: { type: String, default: '' },
    readonly: { type: Boolean, default: false },
    bordered: { type: Boolean, default: false },
    config: { type: Object as PropType<EditorConfiguration>, default: () => {} },
  });

  const emit = defineEmits(['change']);

  const el = ref();
  let editor: Nullable<CodeMirror.Editor>;

  const debounceRefresh = useDebounceFn(refresh, 100);
  // const appStore = useAppStore();
  const {isDark} = usePreferences();
  watch(
    () => props.value,
    async (value) => {
      await nextTick();
      const oldValue = editor?.getValue();
      if (value !== oldValue) {
        editor?.setValue(value ? value : '');
      }
    },
    { flush: 'post' },
  );

  watchEffect(async () => {
    await parserDynamicImport(props.mode)();
    editor?.setOption('mode', props.mode);
  });

  watch(
    () => isDark,
    async () => {
      setTheme();
    },
    {
      immediate: true,
    },
  );

  function setTheme() {
    unref(editor)?.setOption(
      'theme',
        !isDark ? 'idea' : 'material-palenight',
    );
  }

  function refresh() {
    editor?.refresh();
  }

  async function init() {
    const addonOptions = {
      autoCloseBrackets: true,
      autoCloseTags: true,
      foldGutter: true,
      gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    };

    editor = CodeMirror(el.value!, {
      value: '',
      mode: props.mode,
      readOnly: props.readonly,
      tabSize: 2,
      theme: 'material-palenight',
      lineWrapping: true,
      lineNumbers: true,
      ...addonOptions,
      ...props.config,
    });
    editor?.setValue(props.value);
    setTheme();
    editor?.on('change', () => {
      emit('change', editor?.getValue());
    });
  }

  onMounted(async () => {
    await nextTick();
    init();
    debounceRefresh();
    // useWindowSizeFn(debounceRefresh);
    // useWindowSize();
  });

  onUnmounted(() => {
    editor = null;
  });
</script>
