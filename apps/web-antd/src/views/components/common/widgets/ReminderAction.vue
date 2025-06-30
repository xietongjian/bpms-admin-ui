<template>
  <Popconfirm
    ok-text="确定"
    cancel-text="关闭"
    @confirm="handleReminder"
    placement ="bottomRight"
    @openChange="handleOpenChange"
  >
    <template #title>
      <div class="!text-md font-thin w-full flex flex-row gap-1">
        <span v-if="sendToPersonalList && sendToPersonalList.length > 0">向</span>
        <EmpInfo :zIndex="2001" v-for="item in sendToPersonalList" :no="item.code" :name="item.name">
          <span class="text-blue-500 flex flex-row gap-1">
            {{ item.name }}
          </span>
        </EmpInfo>
        发送催办消息
      </div>
    </template>
    <template #description>
      <Textarea
        :status="reminderMsgStatus"
        v-model:value="reminderMsg"
        :autosize="{ minRows: 2, maxRows: 6 }"
        class="w-80"
        placeholder="请输入催办内容"
        allow-clear
      />
    </template>
    <div>
      <slot>
        <Button type="primary">催办</Button>
      </slot>
    </div>
  </Popconfirm>
</template>
<script lang="ts" setup>
import {ref, defineProps, watch} from 'vue';
import {Popconfirm, message, Button, Textarea} from 'ant-design-vue';
import {EmpInfo} from '#/views/components/EmpInfo';
import {reminderTask} from "#/api/process/process";

const reminderMsg = ref('');
const reminderMsgStatus = ref('');

export type SendToPersonalList = {
  code: string;
  name: string;
}

const props = defineProps({
  procInstId: {
    type: String,
  },
  sendToPersonalList: {
    type: Array<SendToPersonalList>,
  },
});

function handleOpenChange(open) {
  if(open){
    reminderMsgStatus.value = '';
  }
}

watch(reminderMsg, (value, oldValue, onCleanup) => {
  if(value){
    reminderMsgStatus.value = '';
  } else {
    reminderMsgStatus.value = 'error';
  }
});

// 催办
async function handleReminder() {
  if(!reminderMsg.value){
    reminderMsgStatus.value = 'error';
    return Promise.reject(false);
  }
  const {success, msg} = await reminderTask({
    processInstanceId: props.procInstId,
    message: reminderMsg.value,
  });
  if (success) {
    reminderMsg.value = '';
    message.success(msg);
  } else {
    message.error(msg);
  }
}
</script>
