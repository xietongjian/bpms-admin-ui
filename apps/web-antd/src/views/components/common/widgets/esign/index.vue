<template>
  <div class="">
    <div class="flex items-center h-8">
      <span v-if="!!currentSignImg" class="cursor-pointer w-25 h-8 border border-dotted border-gray-500 mr-2" @click="editSign" >
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
import {ref, watch, watchEffect, defineModel, defineEmits, onMounted} from 'vue';
import {Tooltip, TypographyLink} from 'ant-design-vue';
import {EditOutlined} from '@ant-design/icons-vue'
import SignModal from './SignModal.vue';
import { usePreferences } from '@vben/preferences';
import {getCurrUserSignatureImg} from "#/api/org/personal";

const emit = defineEmits<{
  change: [string];
}>();

const { isDark } = usePreferences();

const modalValue = defineModel({ default: '', type: String });

const currentSignImg = ref('');

const signModalRef = ref();

function editSign() {
  signModalRef.value.setData({currentSignImg: currentSignImg.value});
  signModalRef.value.open();
}

function signSuccess(imgBase64) {
  currentSignImg.value = imgBase64;
}

watchEffect(() => {
  currentSignImg.value = modalValue.value;
});

onMounted(async () => {
  try {
    const res = await getCurrUserSignatureImg();
    currentSignImg.value = res;
  } catch (e) {
    console.error(e);
  }
})

watch(
  () => currentSignImg.value,
  (v) => {
    emit('change', v);
  },
);

</script>
