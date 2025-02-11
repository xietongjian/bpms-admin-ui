<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { ref, watchEffect } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { vue } from '@codemirror/lang-vue'
import { markdown } from '@codemirror/lang-markdown'
import { json } from '@codemirror/lang-json'
import { xml } from '@codemirror/lang-xml'
import { oneDark } from '@codemirror/theme-one-dark'
import { usePreferences } from '@vben/preferences';

const { isDark } = usePreferences();

interface Props {
  codeStyle?: CSSProperties // 代码样式
  dark?: boolean // 是否暗黑主题
  code?: string // 代码字符串
  placeholder?: string // 占位文本
  autofocus?: boolean // 自动聚焦
  disabled?: boolean // 禁用输入行为和更改状态
  indentWithTab?: boolean // 启用 tab 按键
  tabSize?: number // tab 按键缩进空格数
  autoDestroy?: boolean // 组件销毁时是否自动销毁代码编辑器实例
  type: 'xml' | 'json' | 'vue' | 'markdown'
}
const props = withDefaults(defineProps<Props>(), {
  codeStyle: () => ({}),
  dark: false,
  code: '',
  placeholder: 'Code goes here...',
  autofocus: false,
  disabled: false,
  indentWithTab: true,
  tabSize: 2,
  type: 'xml'
})
const extensions = (props.dark || isDark.value) ? [oneDark] : [];
if(props.type === 'xml'){
  extensions.push(xml());
} else if(props.type === 'json'){
  extensions.push(json());
} else if(props.type === 'vue'){
  extensions.push(vue());
} else if(props.type === 'markdown'){
  extensions.push(markdown());
}
const codeValue = ref('')
watchEffect(() => {
  codeValue.value = props.code
})
const emits = defineEmits(['update:code', 'ready', 'change', 'focus', 'blur'])
function handleReady (payload: any) {
  // console.log('ready')
  emits('ready', payload)
  debugger;
  //editor.autoFormatRange({ line: 0, ch: 0 }, { line: totalLines });

}
function onChange (value: string, viewUpdate: any) {
  emits('change', value, viewUpdate)
  emits('update:code', value)
}
function onBlur (viewUpdate: any) {
  emits('blur', viewUpdate)
}
function onFocus (viewUpdate: any) {
  emits('focus', viewUpdate)
}
</script>
<template>
  <Codemirror
      v-model="codeValue"
      :style="codeStyle"
      :disabled="disabled"
      :extensions="extensions"
      @ready="handleReady"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
      v-bind="$attrs"
  />
</template>
<style lang="scss" scoped>
:deep(.cm-editor) {
  border-radius: 2px;
  outline: none;
  border: 1px solid transparent;
  .cm-scroller {
    border-radius: 2px;
  }
}
:deep(.cm-focused) {
  //border: 1px solid fade(@themeColor, 48%);
}
</style>
