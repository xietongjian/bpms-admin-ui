<script setup lang="ts">
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import {message} from 'ant-design-vue';

  // import { BasicModal, useModalInner } from '@/components/Modal';
  import { nextTick, ref, shallowRef, defineExpose } from 'vue';
  import {
    compensateProcessInstanceVariables,
    getProcessInstanceVariables,
  } from '#/api/flowoperation/processInst';
  // import JsonVariablesEditor from '#/components/JsonVariables/JsonVariablesEditor.vue';

  defineOptions({ name: 'ProcessVariablesModal' });

  const presetVariables = ref<any[]>([]);
  const disabledKeys = ref<string[]>([]);
  const processInstanceId = ref<string>('');
  const variablesEditor = shallowRef<any>();

  /*const [registerModal, { setModalProps, closeModal, changeLoading }] = useModalInner(
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
  );*/


  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          // formApi.setValues(values);
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      // await formApi.submitForm();
      // handleSubmit();
    },
  });

  async function handleSubmit() {
    try {
      const error = variablesEditor.value?.validate();
      if (error) {
        return;
      }

      modalApi.setState({loading: true, confirmLoading: true});
      const requestBody: any = {};

      for (const item of presetVariables.value) {
        requestBody[item.name] = item.value;
      }

      await compensateProcessInstanceVariables(processInstanceId.value, requestBody);

      modalApi.close();
    } catch (e) {
      console.error(e);
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }
  defineExpose(modalApi)
</script>

<template>
  <BasicModal v-bind="$attrs" @ok="handleSubmit">
<!--    <JsonVariablesEditor ref="variablesEditor" v-model:value="presetVariables" />-->
  </BasicModal>
</template>
