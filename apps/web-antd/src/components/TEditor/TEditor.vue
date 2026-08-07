<script setup lang="ts">
import { computed } from 'vue';
import { VbenTiptap } from '@vben/plugins/tiptap';

const props = defineProps<{
  value?: string;
  minHeight?: number;
  maxHeight?: number;
  placeholder?: string;
}>();
const emit = defineEmits<{
  change: [value: string];
  'update:value': [value: string];
}>();

const modelValue = computed({
  get: () => props.value ?? '',
  set: (val: string) => {
    emit('change', val);
    emit('update:value', val);
  },
});
</script>

<template>
  <VbenTiptap
    v-model="modelValue"
    :min-height="minHeight ?? 400"
    :max-height="maxHeight ?? 600"
    :placeholder="placeholder ?? '请输入'"
    class="w-full"
  />
</template>
