<template>
  <div class="w-full">
    <Descriptions size="small"  v-loading="loading">
      <DescriptionsItem label="发起人">{{ baseFormInfo?.personalName || '-' }}</DescriptionsItem>
      <DescriptionsItem label="发起单位">{{ baseFormInfo?.companyName || '-' }}</DescriptionsItem>
      <DescriptionsItem label="发起部门">{{ baseFormInfo?.deptName || '-' }}</DescriptionsItem>
      <DescriptionsItem label="联系电话">{{ baseFormInfo?.phoneNumber || '-' }}</DescriptionsItem>
      <DescriptionsItem label="发起时间">{{ baseFormInfo?.launchTime || '-' }}</DescriptionsItem>
    </Descriptions>
  </div>
</template>
<script lang="ts" setup>
import {ref, defineProps, defineEmits, onMounted, defineExpose, watch} from 'vue';
import {Descriptions, DescriptionsItem} from 'ant-design-vue';
import {getStartHeadInfoVoByProcessInstanceId} from "#/api/flowoperation/processInst";

const emit = defineEmits(['success']);
const props = defineProps({
  procInstId: {
    type: String,
    default: undefined,
  }
});
const loading = ref(false);
const activeKey = ref(1);
const baseFormInfo = ref({});
/*
watch(() => props.procInstId, (newVal, oldValue) => {
  getStartHeadInfoVo();
});
*/

onMounted(() => {
  getStartHeadInfoVo();
});

/**
 * 获取流程头信息
 */
async function getStartHeadInfoVo() {
  try {
    if(!props.procInstId){
      return;
    }
    loading.value = true;
    const res = await getStartHeadInfoVoByProcessInstanceId({procInstId: props.procInstId});
    const {starterInfo, createTime} = res;
    baseFormInfo.value = {
      personalCode: starterInfo?.userCode,
      personalName: starterInfo?.userName,
      positionName: starterInfo?.positionName,
      companyName: starterInfo?.companyName,
      deptName: starterInfo?.deptName,
      phoneNumber: starterInfo?.mobile,
      launchTime: createTime,
    };
  } catch (e) {
  } finally {
    loading.value = false;
  }
}

defineExpose({});
</script>
