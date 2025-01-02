<script setup lang="ts">
  /**
   * @desc ProcessVariablesModal
   * @author DragonTeam <https://www.bpmport.com>
   * @since 2024/9/11 15:26
   */

  import { BasicModal, useModalInner } from '@/components/Modal';
  import { ComponentInstance, nextTick, ref, shallowRef } from 'vue';
  import {
    compensateProcessInstanceVariables,
    getProcessInstanceVariables,
  } from '#/api/flowoperation/processInst';
  import JsonVariablesEditor from '@/components/JsonVariables/JsonVariablesEditor.vue';

  defineOptions({ name: 'ProcessVariablesModal' });

  const presetVariables = ref<any[]>([]);
  const disabledKeys = ref<string[]>([]);
  const processInstanceId = ref<string>('');
  const variablesEditor = shallowRef<ComponentInstance<typeof JsonVariablesEditor>>();

  const [registerModal, { setModalProps, closeModal, changeLoading }] = useModalInner(
    async (data) => {
      setModalProps({ confirmLoading: true, title: '变量补偿', width: 1000 });
      changeLoading(true);
      const { record } = data;

      const response = await getProcessInstanceVariables(record.processInstanceId);

      processInstanceId.value = record.processInstanceId;
      presetVariables.value = response || [];
      disabledKeys.value = presetVariables.value.map((i) => i.name);

      await nextTick();
      variablesEditor.value?.updateValues(presetVariables.value, true);

      changeLoading(false);
      setModalProps({ confirmLoading: false });
    },
  );

  async function handleSubmit() {
    try {
      const error = variablesEditor.value?.validate();
      if (error) {
        return;
      }

      setModalProps({ confirmLoading: true });
      const requestBody: any = {};

      for (const item of presetVariables.value) {
        requestBody[item.name] = item.value;
      }

      await compensateProcessInstanceVariables(processInstanceId.value, requestBody);

      closeModal();
    } catch (e) {
      console.error(e);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>

<template>
  <BasicModal v-bind="$attrs" @register="registerModal" @ok="handleSubmit">
    <JsonVariablesEditor ref="variablesEditor" v-model:value="presetVariables" />
  </BasicModal>
</template>
