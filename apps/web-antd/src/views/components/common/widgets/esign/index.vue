<template>
  <div class="">
    <div class="flex items-center h-8">
      <span v-if="!!currentSignImg" class="w-25 h-8 border border-dotted border-gray-500 mr-2" @click="editSign" >
        <img :src="currentSignImg" alt="签名图片" class="w-full h-full" :class="{'invert': isDark}"/>
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
import {ref,watch, watchEffect, defineModel, defineEmits } from 'vue';
import {Tooltip, TypographyLink} from 'ant-design-vue';
import {EditOutlined} from '@ant-design/icons-vue'
import SignModal from './SignModal.vue';
import { usePreferences } from '@vben/preferences';

const emit = defineEmits<{
  change: [string];
}>();

const { isDark } = usePreferences();

const modalValue = defineModel({ default: '', type: String });

const currentSignImg = ref('');

const signModalRef = ref();

function editSign() {
  signModalRef.value.open();
  signModalRef.value.setData({});
}

function signSuccess(imgBase64) {
  currentSignImg.value = imgBase64;
}

watchEffect(() => {
  currentSignImg.value = modalValue.value;
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
