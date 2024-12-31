<script setup lang="ts">
  /**
   * @desc SyncModal
   * @author DragonTeam <https://www.bpmport.com>
   * @since 2024/9/28 18:57
   */

  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { SyncForm } from './mongoManagement.data';
  import { defineEmits, ref } from 'vue';
  import {
    syncAll,
    syncHiProcInst,
    syncHiTaskInst,
    syncHiActInst,
    syncHiVarInst,
    syncFlowCommentInfo,
    syncFlowExtendHisprocinst,
    syncHiIdEntityLink,
  } from '@/api/flowoperation/MongoManagement';

  defineOptions({ name: 'SyncModal' });

  const emit = defineEmits(['success', 'register']);

  const [registerForm, { resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: SyncForm,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const urlTarget = ref(1);

  const [registerModal, { setModalProps, closeModal, changeLoading }] = useModalInner(
    async (data) => {
      const { mode, title } = data;
      urlTarget.value = mode;
      await resetFields();
      setModalProps({ confirmLoading: false, title });
      changeLoading(false);
    },
  );

  function emitSuccess() {
    closeModal();
    emit('success');
  }

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });

      const time = values.date;

      if (urlTarget.value === 1) {
        await syncAll(time);
        return emitSuccess();
      }
      if (urlTarget.value === 2) {
        await syncHiProcInst(time);
        return emitSuccess();
      }
      if (urlTarget.value === 3) {
        await syncHiTaskInst(time);
        return emitSuccess();
      }
      if (urlTarget.value === 4) {
        await syncHiActInst(time);
        return emitSuccess();
      }
      if (urlTarget.value === 5) {
        await syncHiVarInst(time);
        return emitSuccess();
      }
      if (urlTarget.value === 6) {
        await syncFlowCommentInfo(time);
        return emitSuccess();
      }
      if (urlTarget.value === 7) {
        await syncFlowExtendHisprocinst(time);
        return emitSuccess();
      }
      if (urlTarget.value === 8) {
        await syncHiIdEntityLink(time);
        return emitSuccess();
      }
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>

<template>
  <BasicModal v-bind="$attrs" title="日期选择" @register="registerModal" @ok="handleSubmit">
    <BasicForm @register="registerForm" class="SyncModal" />
  </BasicModal>
</template>

<style scoped lang="less"></style>
