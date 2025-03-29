<template>
  <BasicModal v-bind="$attrs" :title="getTitle" @ok="handleSubmit">
    <BasicForm/>
  </BasicModal>
</template>
<script lang="ts" setup>
import {ref, computed, unref, defineEmits, defineExpose} from 'vue';
import {useVbenForm} from "#/adapter/form";
import {useVbenModal} from '@vben/common-ui';
import {formSchema} from './module.data';
import {saveOrUpdate} from '#/api/privilege/module';
import {getModelInfoByModelKey} from '#/api/flowable/bpmn/modelInfo';

const emit = defineEmits(['success', 'register']);

const isUpdate = ref(true);

const [BasicModal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  async onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const formData = modalApi.getData<Record<string, any>>();

      await formApi.resetForm();
      // setModalProps({ loading: true, confirmLoading: true });
      modalApi.setState({loading: true, confirmLoading: true});

      // 通过流程标识 获取流程信息组装流程选择器的参数
      if (unref(isUpdate)) {
        let moduleType = '';
        if (formData.component === 'LAYOUT') {
          moduleType = 'dictionary';
        } else {
          moduleType = 'menu';
          if (formData.sn) {
            try {
              const modelInfo = await getModelInfoByModelKey({modelKey: formData.sn});
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
              // setModalProps({ loading: false, confirmLoading: false });
            }
          }
        }
        formApi.setValues({
          ...formData,
          moduleType,
        });
      }
      modalApi.setState({loading: false, confirmLoading: false});
    }
  },
  onConfirm() {
    // await baseFormApi.submitForm();
    handleSubmit();
  },
});

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      // class: 'w-full',
    },
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: formSchema,
  wrapperClass: 'grid-cols-1',
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
    modalApi.setState({loading: true, confirmLoading: true});

    const {valid} = await formApi.validate();
    if (!valid) {
      return;
    }
    const values = await formApi.getValues();
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
    modalApi.close();
    emit('success');
  } finally {
    modalApi.setState({loading: false, confirmLoading: false});
  }
}

defineExpose(modalApi)
</script>
