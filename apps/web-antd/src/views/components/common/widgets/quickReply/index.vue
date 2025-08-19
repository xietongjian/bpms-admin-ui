<template>
  <div class="">
    <div class="flex items-center h-8 bg-white/50">
      <Tag v-for="item in commonApproveMsgList" class="cursor-pointer" color="processing" @click="handleSelect(item)">
        {{item.msg}}
      </Tag>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref, defineEmits, onMounted} from 'vue';
import {Tag} from 'ant-design-vue';
import {getCommonApproveMsgList} from "#/api/process/process";

const emit = defineEmits<{
  select: () => {};
}>();

const commonApproveMsgList = ref<any>([]);

function handleSelect(item: any) {
  emit('select', item.msg);
}

onMounted(async () => {
  try {
    const res = await getCommonApproveMsgList();
    commonApproveMsgList.value = res;
  } catch (e) {
    console.error(e);
  }
})

</script>
