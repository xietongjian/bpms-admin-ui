<template>
  <div>
    <Affix :offset-bottom="bottom" class="approve-options-panel">
      <div class="approve-options pt-2">
        <BasicForm />
        <Spin :spinning="authPoints.length <= 0">
          <Space class="mt-2">
            <template v-for="item in authPoints">
              <Button type="primary" v-if="item.sn === 'approve'" :title="item.name" @click="doApprove">
                {{ item.name }}
              </Button>
              <Button type="primary" v-if="item.sn === 'claim'" :title="item.name" @click="doClaimTask">
                {{ item.name }}
              </Button>
              <Button type="primary" v-if="item.sn === 'hold_task'" :title="item.name" @click="doHoldTask">
                {{ item.name }}
              </Button>
              <Button type="primary" v-if="item.sn === 'un_claim'" :title="item.name" @click="doUnClaimTask">
                {{ item.name }}
              </Button>
              <Button type="error" v-if="item.sn === 'stop'" :title="item.name" @click="doStop">
                {{ item.name }}
              </Button>
              <Button type="primary" v-if="item.sn === 'delegate'" :title="item.name" @click="doApproveSelectPersonal('delegateTask', false)">
                {{ item.name }}
              </Button>
              <Button type="primary" v-if="item.sn === 'turn_do'" :title="item.name" @click="doApproveSelectPersonal('turnTask', false)">
                {{ item.name }}
              </Button>
              <Button type="primary" v-if="item.sn === 'addsign'" :title="item.name" @click="doApproveSelectPersonal('addsign', true)">
                {{ item.name }}
              </Button>
              <Button type="error" v-if="item.sn === 'reject'" :title="item.name" @click="doBackToStep">
                {{ item.name }}
              </Button>
              <Button type="error" v-if="item.sn === 'refuse'" :title="item.name" @click="doRefuseTask">
                {{ item.name }}
              </Button>
            </template>
          </Space>
        </Spin>
      </div>
    </Affix>

    <ApproveSelectorPersonalModal ref="approveSelectorPersonalModalRef" @success="handleSuccess" />
    <ApproveCustomApproveSettingModal ref="approveCustomApproveSettingRef" @saveForm="handleSaveForm" @success="handleSuccess" />
    <ApproveBackToStepModal ref="approveBackToStepModalRef" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
import { ref, unref, defineProps, defineEmits } from 'vue';
import { Space, Spin, Button, Affix, message } from 'ant-design-vue';
import ApproveSelectorPersonalModal from './ApproveSelectorPersonalModal.vue';
import ApproveCustomApproveSettingModal from './ApproveCustomApproveSettingModal.vue';
import ApproveBackToStepModal from './ApproveBackToStepModal.vue';
import { useVbenForm } from '#/adapter/form';
import { approveMsgSchemas } from './action.data';
import {
  complete,
  stopProcess,
  unClaimTask,
  claimTask,
  holdTask,
  getCustomApproveSettings,
} from '#/api/process/process';
import { useRouter } from 'vue-router';

const props = defineProps({
  authPoints: {
    type: Array,
    default: [],
  },
});

const emit = defineEmits(['approveValid', 'approveSaveForm']);

const approveSelectorPersonalModalRef = ref();
const approveCustomApproveSettingRef = ref();
const approveBackToStepModalRef = ref();
const bottom = ref(0);
const loading = ref(false);

const { currentRoute } = useRouter();
const { params: { modelKey, bizId, taskId, procInstId } } = unref(currentRoute);

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    hideLabel: true,
    hideRequiredMark: true,
    componentProps: {},
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: approveMsgSchemas,
  wrapperClass: 'gap-0 grid-cols-1',
});

function goBack() {
  const currentUrl = window.location.href;
  const newUrl = currentUrl.replace('/process/approve/', '/process/view/');
  window.location.replace(newUrl);
}

async function doApprove() {
  loading.value = true;
  const { approveMsg } = await formApi.getValues();

  emit('approveValid', async (validRes) => {
    if (!validRes.success) {
      loading.value = false;
      return;
    }

    try {
      const res = await getCustomApproveSettings({ taskId });
      if (res.data && Object.keys(res.data.data).length > 0) {
        loading.value = false;
        approveCustomApproveSettingRef.value.setData({
          taskId,
          procInstId,
          approveSettings: res.data.data,
          message: approveMsg || '',
        });
        approveCustomApproveSettingRef.value.open();
      } else {
        emit('approveSaveForm', async (saveResult) => {
          if (saveResult.success) {
            await approveComplete();
          } else {
            loading.value = false;
          }
        });
      }
    } catch (e) {
      console.error('查询当前节点是否有自定义审批配置项异常！', e);
      message.error('查询自定义审批配置异常！');
      loading.value = false;
    }
  });
}

async function approveComplete() {
  const { approveMsg } = await formApi.getValues();
  try {
    const res = await complete({ taskId, processInstanceId: procInstId, message: approveMsg || '' });
    const result = res.data;
    if (result.success) {
      message.success(result.msg);
      setTimeout(() => {
        loading.value = false;
        goBack();
      }, 1000);
    } else {
      message.error(result.msg);
      loading.value = false;
    }
  } catch (e) {
    message.error('审批失败！');
    loading.value = false;
  }
}

function handleSaveForm(callback) {
  emit('approveSaveForm', (res) => {
    loading.value = false;
    callback(res);
  });
}

function handleSuccess() {
  loading.value = false;
  goBack();
}

async function doStop() {
  loading.value = true;
  const { approveMsg } = await formApi.getValues();
  try {
    const res = await stopProcess({ taskId, processInstanceId: procInstId, message: approveMsg || '' });
    if (res.success) {
      message.success(res.msg);
      setTimeout(() => {
        loading.value = false;
        goBack();
      }, 1000);
    } else {
      message.error(res.msg);
      loading.value = false;
    }
  } catch (e) {
    loading.value = false;
  }
}

async function doUnClaimTask() {
  loading.value = true;
  const { approveMsg } = await formApi.getValues();
  try {
    const res = await unClaimTask({ taskId, processInstanceId: procInstId, message: approveMsg || '' });
    const result = res.data;
    if (result.success) {
      message.success(result.msg);
      setTimeout(() => {
        loading.value = false;
        goBack();
      }, 1000);
    } else {
      message.error(result.msg);
      loading.value = false;
    }
  } catch (e) {
    loading.value = false;
  }
}

async function doClaimTask() {
  loading.value = true;
  const { approveMsg } = await formApi.getValues();
  try {
    const res = await claimTask({ taskId, processInstanceId: procInstId, message: approveMsg || '' });
    const result = res.data;
    if (result.success) {
      message.success(result.msg);
      setTimeout(() => {
        loading.value = false;
        goBack();
      }, 1000);
    } else {
      message.error(result.msg);
      loading.value = false;
    }
  } catch (e) {
    loading.value = false;
  }
}

async function doRefuseTask() {
  loading.value = true;
  const { approveMsg } = await formApi.getValues();
  try {
    const res = await stopProcess({ processInstanceId: procInstId, taskId, message: approveMsg || '' });
    if (res.success) {
      message.success(res.msg);
      setTimeout(() => {
        loading.value = false;
        goBack();
      }, 1000);
    } else {
      message.error(res.msg);
      loading.value = false;
    }
  } catch (e) {
    loading.value = false;
  }
}

async function doHoldTask() {
  loading.value = true;
  const { approveMsg } = await formApi.getValues();
  if (!approveMsg) {
    message.warning('暂存时必须填写审批意见！');
    loading.value = false;
    return;
  }
  try {
    const res = await holdTask({ taskId, processInstanceId: procInstId, message: approveMsg || '' });
    const result = res.data;
    if (result.success) {
      message.success(result.msg);
      setTimeout(() => {
        loading.value = false;
        goBack();
      }, 1000);
    } else {
      message.error(result.msg);
      loading.value = false;
    }
  } catch (e) {
    loading.value = false;
  }
}

function doBackToStep() {
  formApi.getValues().then((values) => {
    approveBackToStepModalRef.value.setData({
      taskId,
      procInstId,
      ...values,
    });
    approveBackToStepModalRef.value.open();
  });
}

function doApproveSelectPersonal(actionType, multiple) {
  formApi.getValues().then((values) => {
    approveSelectorPersonalModalRef.value.setData({
      multiple,
      actionType,
      taskId,
      procInstId,
      ...values,
    });
    approveSelectorPersonalModalRef.value.open();
  });
}
</script>
<style lang="less">
.approve-options-panel {
  height: auto;
  min-height: 140px;

  .ant-affix {
    height: auto !important;
  }

  .approve-options {
    min-height: 140px;
    background: #e1edff;
    border-top: 4px solid #1890ff;
    padding: 10px;
  }

  .approve-msg-form {
    .ant-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
