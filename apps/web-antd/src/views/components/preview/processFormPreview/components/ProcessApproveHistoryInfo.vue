<template>
  <div class="w-full">
    <ApproveHistoryList :historyList="historyList" :loading="loading" />
  </div>
</template>
<script lang="ts" setup>
import {ref, onMounted} from 'vue';

import ApproveHistoryList from '#/views/components/process/ApproveHistoryList.vue';
import { getCommentInfosByProcessInstanceId } from '#/api/flowable/bpmn/modelInfo';

// const emit = defineEmits(['success']);
const props = defineProps({
  procInstId: {
    type: String,
    default: undefined,
  },
  bizId: {
    type: String,
    default: ''
  },
  taskId: {
    type: String,
    default: ''
  },
  modelKey: {
    type: String,
    default: ''
  }
});

const historyList = ref([]);

const loading = ref(false);

onMounted(() => {
  loadCommentList();
});
async function loadCommentList() {
  try {
    loading.value = true;
    const res = await getCommentInfosByProcessInstanceId({procInstId: props.procInstId});
    historyList.value = res;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}

</script>
