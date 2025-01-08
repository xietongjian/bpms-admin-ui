<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineEmits } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { formSchema } from './module.data';
  import { saveOrUpdate } from '#/api/privilege/module';
  import { getModelInfoByModelKey } from '#/api/flowable/bpmn/modelInfo';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    setModalProps({ loading: true, confirmLoading: true });
    isUpdate.value = !!data?.isUpdate;
    let formData = data.record;

    // 通过流程标识 获取流程信息组装流程选择器的参数
    if (unref(isUpdate)) {
      let moduleType = '';
      if (formData.component === 'LAYOUT') {
        moduleType = 'dictionary';
      } else {
        moduleType = 'menu';
        if (formData.sn) {
          try {
            const modelInfo = await getModelInfoByModelKey({ modelKey: formData.sn });
            if (modelInfo) {
              formData.modelInfoSelector = [
                {
                  value: modelInfo.modelKey,
                  label: modelInfo.name,
                  key: modelInfo.modelKey,
                  title: modelInfo.name,
                  name: modelInfo.name,
                },
              ];
            }
          } catch (e) {
            setModalProps({ loading: false, confirmLoading: false });
          }
        }
      }
      setFieldsValue({
        ...formData,
        moduleType,
      });
    }
    setModalProps({ loading: false, confirmLoading: false });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));

  function randomString(e) {
    e = e || 32;
    let t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
      a = t.length,
      n = '';
    for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n;
  }

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      const values = await validate();
      const models = values.modelInfoSelector;
      if (!values.id) {
        if (values.moduleType === 'dictionary') {
          const sn = randomString(6);
          values.component = 'LAYOUT';
          values.sn = 'FormData_' + sn;
          values.url = (!values.pid ? '/' : '') + 'formData_' + sn;
        } else {
          if (models && models.length > 0) {
            values.sn = models[0].modelKey;
            values.url = values.sn;
            values.component = '/report/formData/index';
          }
        }
      } else {
        if (models && models.length > 0) {
          values.sn = models[0].modelKey;
          values.url = values.sn;
        }
      }
      delete values.modelInfoSelector;
      delete values.moduleType;

      await saveOrUpdate(values);
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
