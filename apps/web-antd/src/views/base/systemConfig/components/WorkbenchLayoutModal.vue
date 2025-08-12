<template>
  <BasicModal contentClass="!p-0">
    <template #title>
      <div class="w-full flex items-center justify-between">
        <div class="text-base">
          工作台页面布局
        </div>
        <div class="space-x-3">
          <Button type="primary" @click="handleSave" :loading="saveLoading">
            保存
          </Button>
          <Button type="default" @click="handleClose">关闭</Button>
        </div>
      </div>
    </template>
    <div class="h-full">
      <WorkbenchLayoutContainer ref="workbenchLayoutContainer"/>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import { Button } from "ant-design-vue";
import WorkbenchLayoutContainer from "#/views/base/systemConfig/components/WorkbenchLayoutContainer.vue";
import {useVbenModal} from '@vben/common-ui';

const saveLoading = ref(false);

const privilegeSn = "";
const workbenchLayoutContainer = ref();

const [BasicModal, modalApi] = useVbenModal({
  fullscreen: true,
  fullscreenButton: false,
  draggable: false,
  closable: false,
  footer: false,
  onCancel() {
    modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const values = modalApi.getData<Record<string, any>>();
      if (values) {
        // formApi.setValues(values);
        // modalApi.setState({loading: false, confirmLoading: false});
      }
    }
  },
  onConfirm() {
    // await baseFormApi.submitForm();
    // handleSubmit();
  },
});
async function handleSave() {
  saveLoading.value = true;
  try {
    await workbenchLayoutContainer.value.doSave();
  } catch (e) {
    console.error(e);
  } finally {
    saveLoading.value = false;
  }
}
function handleClose() {
  modalApi.close();
}

defineExpose(modalApi);
</script>

