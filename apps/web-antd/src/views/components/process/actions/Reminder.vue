<template>
  <Popconfirm
    ok-text="确定"
    cancel-text="关闭"
    @confirm="handleReminder"
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
        v-model:value="reminderMsg"
        :autosize="{ minRows: 2, maxRows: 6 }"
        class="w-80"
        placeholder="请输入催办内容"
      />
    </template>
    <slot>
      <Button type="primary">催办</Button>
    </slot>
  </Popconfirm>
</template>
<script lang="ts" setup>
import {ref, defineProps, defineEmits} from 'vue';
import {Tag, Popconfirm, message, Button, Textarea} from 'ant-design-vue';
import {EmpInfo} from '#/views/components/EmpInfo';
import {reminderTask} from "#/api/process/process";

const reminderMsg = ref('');

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

// 催办
async function handleReminder() {
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
