<template>
  <div>
    <Input :value="currentSignImg" v-bind="$attrs" type="hidden"/>
    <div class="flex items-center h-8">
      <span v-if="!!signImg" >
        <img :src="signImg" alt="签名图片" class="w-25 h-8 border-1"/>
      </span>
      <TypographyLink @click="editSign">
        <EditOutlined />
      </TypographyLink>
    </div>
    <SignModal ref="signModalRef" @success="signSuccess" />
  </div>
</template>
<script lang="ts" setup>
import {ref,watch, watchEffect, defineProps, defineEmits, nextTick, defineExpose} from 'vue';
import {Input, Popover, Spin, Button, message, TypographyLink} from 'ant-design-vue';
import {EditOutlined, PaperClipOutlined} from '@ant-design/icons-vue'
import SignModal from './SignModal.vue';

const emit = defineEmits<{
  change: [string];
}>();
const signImg = ref('');
const currentSignImg = ref('');

const signModalRef = ref();

function editSign() {
  signModalRef.value.open();
  signModalRef.value.setData({});
}

function signSuccess(imgBase64) {
  signImg.value = imgBase64;
}

watchEffect(() => {
  currentSignImg.value = signImg.value;
});

watch(
  () => currentSignImg.value,
  (v) => {
    emit('change', v);
  },
);
</script>
