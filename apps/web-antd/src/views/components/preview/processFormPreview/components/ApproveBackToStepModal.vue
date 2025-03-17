<template>
  <BasicModal title="驳回" class="w-[800px]" >
    <BasicForm class="relative">
      <template #backToStepNodeList="slotProps">
        <Table
          ref="backToStepNodeTableRef"
          :pagination="false"
          rowKey="nodeId"
          :row-selection="{ type: 'radio', selectedRowKeys: selectedKeys, onChange: changeSelect }"
          :columns="backToStepTableColumns"
          :data-source="backToStepNodeList"
          :scroll="{ y: 180 }"
          size="small"
          :customRow="customRow"
          :loading="backToStepNodeListLoading"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineExpose } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import { approveBackToStepFormSchema, backToStepTableColumns } from './action.data';
  import { Button, Tag, Table, message } from 'ant-design-vue';
  import { backToStep, backToSubmitter, getBackToStepNodes } from '#/api/flowoperation/processTask';

  const backToStepNodeList = ref([]);
  const backToStepNodeListLoading = ref(false);
  const selectedKeys = ref([]);
  const selectedRows = ref([]);
  const backToStepNodeTableRef = ref();
  // const go = useGo();

  /*const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: approveBackToStepFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps, changeLoading, closeModal }] = useModalInner(
      async (data) => {
        await resetFields();
        genLoading(false);
        const { taskId, procInstId, message } = data.selectorProps;
        selectedKeys.value = [];
        selectedRows.value = [];
        setModalProps({ title: '驳回' });

        backToStepNodeListLoading.value = true;
        getBackToStepNodes({ taskId })
            .then((res) => {
              backToStepNodeList.value = res;
              backToStepNodeListLoading.value = false;
            })
            .then((e) => {
              backToStepNodeListLoading.value = false;
            });

        setFieldsValue({
          taskId,
          procInstId,
          message,
        });
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
          formApi.setValues(values);
          loadBackToStepNodes(values.taskId);
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      // await formApi.submitForm();
      handleSubmit();
    },
  });

  async function loadBackToStepNodes(taskId) {
    backToStepNodeListLoading.value = true;
    try {
      const res = await getBackToStepNodes({taskId});
      backToStepNodeList.value = res;
    } catch (e) {
      console.error(e);
    } finally {
      backToStepNodeListLoading.value = false;
    }
  }

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: approveBackToStepFormSchema,
    wrapperClass: 'grid-cols-1',
  });

  function closeCurrModal() {
    genLoading(false);
    modalApi.close();
    emit('success');
  }

  function genLoading(status) {
    // setModalProps({ confirmLoading: status });
    modalApi.setState({loading: status, confirmLoading: status})
    // changeLoading(status);
  }

  async function handleSubmit() {
    try {
      genLoading(true);
      const {valid} = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();
      const params = {
        taskId: values.taskId,
        processInstanceId: values.procInstId,
        message: values.message,
      };

      if (unref(selectedKeys) && unref(selectedKeys).length > 0) {
        params['distFlowElementId'] = unref(selectedKeys)[0];
        const {success, msg, data} = await backToStep(params);
        if (success) {
          message.success(msg);
          closeCurrModal();
        } else {
          message.error(msg);
        }
      } else {
        message.error('请选择要驳回的节点!');
        genLoading(false);
        return;
      }
    } catch (e) {
      message.error('请选择要驳回的节点!');
    } finally {
      genLoading(false);
    }
  }

  function changeSelect(e) {
    selectedRows.value = unref(backToStepNodeList).filter((item) => item.nodeId === e[0]);
    selectedKeys.value = e;
  }
  function customRow(record, index) {
    return {
      onClick: () => {
        selectedKeys.value = [record.nodeId];
        selectedRows.value = [record];
      },
    };
  }

  defineExpose(modalApi);
</script>
