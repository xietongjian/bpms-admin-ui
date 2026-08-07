<template>
  <div class="code-editor-wrapper" :class="{ 'border rounded': bordered }">
    <Codemirror
      :model-value="displayValue"
      :disabled="readonly"
      :extensions="extensions"
      :style="{ height: height }"
      :autofocus="false"
      @update:model-value="onUpdate"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { json } from '@codemirror/lang-json';
import { xml } from '@codemirror/lang-xml';
import { markdown } from '@codemirror/lang-markdown';
import { vue } from '@codemirror/lang-vue';
import { EditorView } from '@codemirror/view';
import { MODE } from './typing';

interface CodeEditorProps {
  modelValue?: string | Record<string, any>;
  mode?: MODE;
  readonly?: boolean;
  autoFormat?: boolean;
  bordered?: boolean;
  height?: string;
}

const props = withDefaults(defineProps<CodeEditorProps>(), {
  modelValue: '',
  mode: MODE.JSON,
  readonly: false,
  autoFormat: true,
  bordered: true,
  height: '300px',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'format-error', error: Error): void;
}>();

const displayValue = computed(() => {
  if (props.mode === MODE.JSON && props.autoFormat && props.modelValue) {
    try {
      const obj = typeof props.modelValue === 'string'
        ? JSON.parse(props.modelValue)
        : props.modelValue;
      return JSON.stringify(obj, null, 2);
    } catch {
      return typeof props.modelValue === 'string'
        ? props.modelValue
        : JSON.stringify(props.modelValue, null, 2);
    }
  }
  return typeof props.modelValue === 'string'
    ? props.modelValue
    : JSON.stringify(props.modelValue, null, 2);
});

function onUpdate(value: string) {
  if (!props.readonly) {
    emit('update:modelValue', value);
  }
}

const extensions = computed(() => {
  const ext: any[] = [];

  switch (props.mode) {
    case MODE.JSON:
      ext.push(json());
      break;
    case MODE.XML:
      ext.push(xml());
      break;
    case MODE.MARKDOWN:
      ext.push(markdown());
      break;
    case MODE.VUE:
      ext.push(vue());
      break;
    case MODE.HTML:
    case MODE.CSS:
    case MODE.JAVASCRIPT:
    default:
      break;
  }

  ext.push(EditorView.lineWrapping);

  return ext;
});
</script>

<style scoped>
.code-editor-wrapper {
  overflow: hidden;
}
.code-editor-wrapper :deep(.cm-editor) {
  font-size: 13px;
}
.code-editor-wrapper :deep(.cm-scroller) {
  font-family: 'Fira Code', 'Consolas', monospace;
}
</style>
