<script setup lang="ts">
import {defineExpose} from 'vue';

  // import { BasicModal, useModalInner } from '@/components/Modal';
  // import { BasicForm, useForm } from '@/components/Form';

  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';


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
  } from '#/api/flowoperation/MongoManagement';
import {formSchema} from "#/views/base/app/app.data";

  defineOptions({ name: 'SyncModal' });

  const emit = defineEmits(['success', 'register']);

  const urlTarget = ref(1);

/*const [registerForm, { resetFields, validate }] = useForm({
  labelWidth: 100,
  schemas: SyncForm,
  showActionButtonGroup: false,
  actionColOptions: {
    span: 23,
  },
});
  const [registerModal, { setModalProps, closeModal, changeLoading }] = useModalInner(
    async (data) => {
      const { mode, title } = data;
      urlTarget.value = mode;
      await resetFields();
      setModalProps({ confirmLoading: false, title });
      changeLoading(false);
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

        urlTarget.value = values.mode;
        // await resetFields();
        // formApi.setValues({});
        modalApi.setState({loading: false, confirmLoading: false});
      }
    }
  },
  onConfirm() {
    // await formApi.submitForm();
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
  schema: SyncForm,
  wrapperClass: 'grid-cols-1',
});

  function emitSuccess() {
    modalApi.close();
    emit('success');
  }

  const syncMap: Record<number, (time: any) => Promise<any>> = {
    1: syncAll,
    2: syncHiProcInst,
    3: syncHiTaskInst,
    4: syncHiActInst,
    5: syncHiVarInst,
    6: syncFlowCommentInfo,
    7: syncFlowExtendHisprocinst,
    8: syncHiIdEntityLink,
  };

  async function handleSubmit() {
    try {
      const { valid } = await formApi.validate();
      if (!valid) {
        return;
      }
      const values = await formApi.getValues();
      modalApi.setState({ loading: true, confirmLoading: true });

      const time = values.date;
      const syncFn = syncMap[urlTarget.value];
      if (syncFn) {
        await syncFn(time);
        emitSuccess();
      }
    } finally {
      modalApi.setState({ loading: false, confirmLoading: false });
    }
  }

defineExpose(modalApi);
</script>

<template>
  <BasicModal title="日期选择">
    <BasicForm class="SyncModal" />
  </BasicModal>
</template>

<style scoped lang="less"></style>
