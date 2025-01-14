<template>
  <div class="w-full">
    <ApproveHistoryList :historyList="historyList" :loading="loading" />
  </div>
</template>
<script lang="ts" setup>
import {ref, defineProps, defineEmits, onMounted, defineExpose, watch, unref, nextTick} from 'vue';
import {Collapse, CollapsePanel, Descriptions, DescriptionsItem} from 'ant-design-vue';

import ApproveHistoryList from '#/views/components/process/ApproveHistoryList.vue';
import { getCommentInfosByProcessInstanceId } from '#/api/flowable/bpmn/modelInfo';

const emit = defineEmits(['success']);
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
const activeKey = ref(1);
const baseFormInfo = ref({});
const jsonData = ref({});
const generateFormRef = ref();
const showErrorMsg = ref(false);
const errorMsg = ref();

/*
watch(() => props.procInstId, (newVal, oldValue) => {
  getStartHeadInfoVo();
});
*/

onMounted(() => {
  loadCommentList();
});
function loadCommentList() {
  loading.value = true;
  getCommentInfosByProcessInstanceId({procInstId: props.procInstId})
      .then((res) => {
        historyList.value = res;
      })
      .finally(() => {
        loading.value = false;
      });

}

defineExpose({});
</script>
