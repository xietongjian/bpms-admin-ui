<template>
  <Space>
    <!--    <a-button @click="doSimulation" > 模拟 </a-button>-->
    <a-button type="primary" @click="doLaunch" :loading="loading"> 提交</a-button>
    <!--    <a-button @click="doSave" :loading="loading" > 存草稿 </a-button>-->
    <!--    <PopConfirmButton v-if="canStop" type="error" title="确定要作废该流程吗？" @confirm="doStop"  > 作废 </PopConfirmButton>-->
    <a-button @click="doBack"> 取消</a-button>
  </Space>
</template>
<script lang="ts" setup>
  import {defineEmits, defineProps, ref, unref, defineExpose} from 'vue';
  import {stopProcess} from "#/api/process/process";
  import {message} from "ant-design-vue";

  // import {useLoading} from '@/components/Loading';
  import {Space} from 'ant-design-vue';

  const emit = defineEmits(['doLaunch', 'doSimulation', 'doSave', 'doClose', 'doStop'])
  const props = defineProps({
    taskId: {type: String},
    procInstId: {type: String}
  });

  const loading = ref(false);
  // 判断是否有任务ID

  const canStop = ref(props.taskId && props.taskId !== '0' && props.procInstId && props.procInstId !== '0');

  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '处理中...',
  });

  function doLaunch() {
    emit('doLaunch');
  }

  function setActionLoading(status) {
    loading.value = status;
  }

  function doSimulation() {
    emit('doSimulation');
  }

  function doSave() {
    emit('doSave');
  }

  function doStop() {
    openFullLoading();
    stopProcess({processInstanceId: props.procInstId, taskId: props.taskId}).then(res => {
      if (res.success) {
        message.success(res.msg, 1, () => {
          doBack();
        });
      } else {
        message.error(res.msg);
      }
      closeFullLoading();
    }).catch(e => {
      closeFullLoading();
    });
  }

  // 审批成功后跳转到查看页面
  function doBack() {
    emit('doClose');
  }

  defineExpose({
    setActionLoading
  });
</script>
