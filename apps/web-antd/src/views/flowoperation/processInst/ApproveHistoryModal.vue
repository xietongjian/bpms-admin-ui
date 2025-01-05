<template>
  <BasicModal class="w-[800px]">
    <ApproveHistoryList :historyList="historyList" :loading="approvalHistoryLoading" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import {message} from 'ant-design-vue';
  import ApproveHistoryList from '#/views/components/process/ApproveHistoryList.vue';

  import { getCommentInfosByProcessInstanceId } from '#/api/flowable/bpmn/modelInfo';

  const historyList = ref([]);
  const approvalHistoryLoading = ref(false);

  /*const [registerModal, { setModalProps, changeLoading, closeModal }] = useModalInner(
    async (data) => {
      setModalProps({
        width: 1000,
      });
      const { processInstanceId } = data.record;
      approvalHistoryLoading.value = true;
      getCommentInfosByProcessInstanceId({ procInstId: processInstanceId })
        .then((res) => {
          historyList.value = res;
        })
        .finally(() => {
          approvalHistoryLoading.value = false;
        });
    },
  );*/


  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();

        const { processInstanceId } = values;
        approvalHistoryLoading.value = true;
        getCommentInfosByProcessInstanceId({ procInstId: processInstanceId })
          .then((res) => {
            historyList.value = res;
          })
          .finally(() => {
            approvalHistoryLoading.value = false;
          });
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

  defineExpose(modalApi)
</script>
