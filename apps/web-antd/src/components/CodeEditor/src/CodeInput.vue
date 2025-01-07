<script setup lang="ts">
  /**
   * @desc CodeInput
   * @author DragonTeam <https://www.bpmport.com>
   * @since 2024/9/12 14:17
   */

  import { MODE } from './typing';
  import { Input } from 'ant-design-vue';
  import { computed } from 'vue';
  import CodeEditorModal from '#/components/CodeEditor/src/CodeEditorModal.vue';
  import { useModal } from '@/components/Modal';

  defineOptions({ name: 'CodeInput' });

  const props = defineProps({
    value: {
      type: [Object, Number, Boolean, String] as PropType<
        Record<string, any> | number | boolean | string
      >,
    },
    mode: {
      type: String as PropType<MODE>,
      default: MODE.JSON,
      validator(value: any) {
        return Object.values(MODE).includes(value);
      },
    },
    title: {
      type: String as PropType<string>,
    },
  });

  const emit = defineEmits(['change', 'update:value']);

  const [registerCodeEditorModal, { openModal: openCodeEditorModal }] = useModal();

  const formatedValue = computed(() => {
    if (props.value && typeof props.value === 'object') {
      return JSON.stringify(props.value);
    }
    return props.value;
  });

  function handleOpen() {
    openCodeEditorModal(true, {
      value: props.value,
      title: props.title,
      editorProps: {
        mode: props.mode,
      },
    });
  }

  function handleChange(val) {
    emit('update:value', val);
    emit('change', val);
  }
</script>

<template>
  <div class="w-full">
    <Input :value="formatedValue" readonly @click="handleOpen" />

    <CodeEditorModal @register="registerCodeEditorModal" @change="handleChange" />
  </div>
</template>
