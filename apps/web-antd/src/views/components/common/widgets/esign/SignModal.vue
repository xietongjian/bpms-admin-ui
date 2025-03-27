<template>
  <BasicModal title="编辑签名" content-class="flex flex-col h-full p-0" class="w-[800px]" >
    <div class="flex-1 border border-3 mb-2 border-dashed relative group">
      <VueEsign
        class="h-full flex-1"
        :class="{'invert': isDark}"
        ref="vueSignRef"
        :width="800"
        height="300"
        :isCrop="false"
        :lineWidth="6"
        :lineColor="'#000000'"
        v-model:bgColor="bgColor" />
      <div v-if="bgColor" @click="handleReset" class="group-hover:flex hidden absolute w-full h-full bg-gray-300/10 top-0 left-0 items-center justify-center cursor-pointer">
        <div class="bg-red-500/50 text-white text-center text-3xl w-50 p-3">擦除并重新签名</div>
      </div>
    </div>
    <div class="h-14 text-center leading-10">
      <Button danger @click="handleReset">清空画板</Button>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref, defineExpose, defineEmits } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import VueEsign from 'vue-esign'
  import {Button} from 'ant-design-vue';
  import { usePreferences } from '@vben/preferences';

  const { isDark } = usePreferences();

  const emit = defineEmits(['success']);

  const bgColor = ref();
  const vueSignRef = ref();
  const resultImg = ref();
  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    fullscreenButton: false,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData();
        values.currentSignImg && (bgColor.value = `url(${values.currentSignImg})`);
      }
    },
    onConfirm() {
      handleSubmit();
    },
  });

  function handleReset () {
    vueSignRef.value.reset();
  }
  function handleSetBgColor (val) {
    bgColor.value = val;
  }

  async function handleGenerate () {
    try{
      const res = await vueSignRef.value.generate();
      resultImg.value = res
    } catch (e){
      console.error(e);
      resultImg.value = '';
    }
  }

  async function handleSubmit() {
    try {
      await handleGenerate();
      emit('success', resultImg.value);
      modalApi.close();
    } catch (e) {
      console.error(e);
    }
  }

  defineExpose({...modalApi, handleSetBgColor});
</script>
