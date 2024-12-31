<template>
  <BasicModal v-bind="$attrs" @register="registerModal">
    <ApproveHistoryList :historyList="historyList" :loading="approvalHistoryLoading" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import ApproveHistoryList from '@/views/components/process/ApproveHistoryList.vue';

  import { getCommentInfosByProcessInstanceId } from '@/api/flowable/bpmn/modelInfo';

  const historyList = ref([]);
  const approvalHistoryLoading = ref(false);
  const [registerModal, { setModalProps, changeLoading, closeModal }] = useModalInner(
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
  );
</script>
