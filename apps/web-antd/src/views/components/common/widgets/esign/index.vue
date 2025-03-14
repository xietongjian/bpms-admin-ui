<template>
  <div class="">
<!--    <Input :value="currentSignImg" v-bind="$attrs" type="hidden"/>-->
    <div class="flex items-center h-8">
      <span v-if="!!signImg" class="w-25 h-8 border border-dotted border-gray-500 mr-2" @click="editSign" >
        <img :src="signImg" alt="签名图片" class="w-full h-full"/>
      </span>
      <Tooltip title="编辑签名">
        <TypographyLink @click="editSign">
          <EditOutlined />
        </TypographyLink>
      </Tooltip>
    </div>
    <SignModal ref="signModalRef" @success="signSuccess" />
  </div>
</template>
<script lang="ts" setup>
import {ref,watch, watchEffect, defineEmits } from 'vue';
import {Input, Tooltip, TypographyLink} from 'ant-design-vue';
import {EditOutlined} from '@ant-design/icons-vue'
import SignModal from './SignModal.vue';
const emit = defineEmits(['blur', 'change']);

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
<style lang="scss" >
.approve-sign-form-item {
  position: absolute;
  bottom: 35px;
  right: 50px;
  z-index: 9;
}
</style>
