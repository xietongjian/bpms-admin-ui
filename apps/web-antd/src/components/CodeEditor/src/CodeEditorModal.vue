<script setup lang="ts">
  /**
   * @desc CodeEditorModal
   * @author DragonTeam <https://www.bpmport.com>
   * @since 2024/9/12 14:23
   */

  import { FormItemRest } from 'ant-design-vue/es/form';
  // import { BasicModal, useModalInner } from '@/components/Modal';
  import { ref } from 'vue';
  import CodeEditor from '#/components/CodeEditor/src/CodeEditor.vue';

  defineOptions({ name: 'CodeEditorModal' });

  const emit = defineEmits(['change', 'register']);

  const codeValue = ref<any>();
  const codeEditorProps = ref<any>({});

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    const { value, editorProps = {}, title = '代码编辑' } = data;

    setModalProps({ title });
    codeValue.value = value;
    codeEditorProps.value = editorProps;
  });

  function handleSubmit() {
    emit('change', codeValue.value);
    closeModal();
  }
</script>

<template>
  <FormItemRest>
    <BasicModal
      wrapClassName="selector-body "
      v-bind="$attrs"
      @register="registerModal"
      @ok="handleSubmit"
    >
      <div class="w-full h-full overflow-hidden">
        <CodeEditor v-model:value="codeValue" v-bind="codeEditorProps" />
      </div>
    </BasicModal>
  </FormItemRest>
</template>
