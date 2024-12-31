<template>
  <BasicModal class="w-[800px]" v-bind="$attrs" @register="registerModal" wrap-class-name="code-preview-modal ">
    <!--    <pre v-highlight style="margin-bottom:0;"><code :class="codeType" spellcheck="false">{{codeTxt||"&nbsp;"}}</code></pre>-->
    <CodeEditor class="h-full" readonly autoFormat v-model:value="codeTxt" :mode="codeType" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, defineEmits, defineExpose } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  // import { CodeEditor } from '@/components/CodeEditor';

  const codeTxt = ref();
  const codeType = ref('htmlmixed');

  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          // formApi.setValues(values);
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      // await formApi.submitForm();
      // handleSubmit();
    },
  });

/*  const [registerModal, { setModalProps, changeLoading, closeModal }] = useModalInner(
    async (data) => {
      // changeLoading(true);
      const { code, type } = data.record;
      codeTxt.value = code;
      codeType.value = type;
    },
  );*/
</script>
<style lang="less">
  .code-preview-modal {
    .ant-modal-body {
      .scroll-container {
        padding: 0 !important;
        .CodeMirror-wrap {
          height: 100% !important;
        }
      }
      top: 10%;
      padding-bottom: 10%;
    }
  }
</style>
