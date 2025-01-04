<template>
  <BasicModal
    class="w-[800px]"
    v-bind="$attrs"
    @register="registerModal"
    :wrapperFooterOffset="0"
    :defaultFullscreen="false"
  >
    <div class="h-full">
      <GenerateForm ref="generateFormRef" style="height: 100%" :data="formJson" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { nextTick, ref, unref, defineExpose } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import {message} from 'ant-design-vue';

  import { GenerateForm } from '/public/static/form-making';

  // const { createMessage, createConfirm } = useMessage();
  const generateFormRef = ref(null);

  const formJson = ref({});


  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          loadData(values.formJson);
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
      loadData(data.formJson);
    },
  );*/

  function loadData(json) {
    formJson.value = json;
    nextTick(() => {
      unref(generateFormRef).refresh();
    });
  }
  defineExpose(modalApi)
</script>
