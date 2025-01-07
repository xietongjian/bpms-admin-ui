<template>
  <BasicModal class="w-[1000px] min-h-[550px]" >
    <div class="absolute">
      <CodeEditor
          :codeStyle="{width: '100%', height: '100%', fontSize: '16px' }"
          v-model="codeTxt"
          v-bind="$attrs"
          :disabled="true"
      />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, defineExpose } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import { CodeEditor } from '#/components/CodeEditor';

  const codeTxt = ref();

  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    showConfirmButton: false,
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          codeTxt.value = values.code;
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
  });
  defineExpose(modalApi)
</script>
