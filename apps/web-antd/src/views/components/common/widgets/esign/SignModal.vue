<template>
  <BasicModal title="编辑签名" content-class="flex flex-col h-full p-0" class="w-[800px] h-[400px] min-h-[300px]" >
    <div class="flex-1 border border-3 mb-2 border-dashed">
      <VueEsign
        class="h-full flex-1"
        ref="vueSignRef"
        :width="800"
        height="300"
        :isCrop="false"
        :lineWidth="6"
        :lineColor="'#000000'"
        v-model:bgColor="bgColor" />
    </div>
    <div class="h-20 text-center leading-20">
      <Button danger @click="handleReset">清空画板</Button>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref, defineExpose, defineEmits } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import VueEsign from 'vue-esign'
  import {Button} from 'ant-design-vue';

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
      }
    },
    onConfirm() {
      handleSubmit();
    },
  });

  function handleReset () {
    vueSignRef.value.reset();
  }

  async function handleGenerate () {
    try{
      const res = await vueSignRef.value.generate();
      resultImg.value = res
    } catch (e){
      console.error(e);
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

  defineExpose(modalApi);
</script>
