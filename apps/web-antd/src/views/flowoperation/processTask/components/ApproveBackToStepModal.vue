<template>
  <BasicModal v-bind="$attrs" @register="registerModal" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #backToStepNodeRender="{ schame, field }">
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
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { approveBackToStepFormSchema, backToStepTableColumns } from './action.data';
  import { Button, Tag, Table } from 'ant-design-vue';
  import { backToStep, backToSubmitter, getBackToStepNodes } from '@/api/flowoperation/processTask';
  import { useGo } from '@/hooks/web/usePage';
  import { useMessage } from '@/hooks/web/useMessage';
  import { ResultEnum } from '@/enums/httpEnum';

  export default defineComponent({
    name: 'ApproveBackToStepModal',
    components: { BasicModal, BasicForm, Table, Button, Tag },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      // const isUpdate = ref(true);
      const backToStepNodeList = ref([]);
      const backToStepNodeListLoading = ref(false);
      const selectedKeys = ref([]);
      const selectedRows = ref([]);
      const backToStepNodeTableRef = ref();
      const { createMessage } = useMessage();
      const go = useGo();

      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
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
      );

      function closeCurrModal() {
        genLoading(false);
        closeModal();
        emit('success');
      }

      function genLoading(status) {
        setModalProps({ confirmLoading: status });
        changeLoading(status);
      }

      async function handleSubmit() {
        try {
          genLoading(true);
          const values = await validate();
          const params = {
            taskId: values.taskId,
            processInstanceId: values.procInstId,
            message: values.message,
          };

          if (unref(selectedKeys) && unref(selectedKeys).length > 0) {
            params['distFlowElementId'] = unref(selectedKeys)[0];
            backToStep(params)
              .then((res) => {
                const result = res.data;
                if (result.code === ResultEnum.SUCCESS) {
                  createMessage.success(result.msg);
                  closeCurrModal();
                } else {
                  createMessage.error(result.msg);
                }
                genLoading(false);
              })
              .catch(() => {
                createMessage.error('网络异常，请稍后再试！');
              })
              .finally(() => {
                genLoading(false);
              });
          } else {
            createMessage.error('请选择要驳回的节点!');
            genLoading(false);
            return;
          }
        } catch (e) {
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

      return {
        customRow,
        backToStepNodeTableRef,
        registerModal,
        backToStepTableColumns,
        backToStepNodeList,
        registerForm,
        selectedKeys,
        changeSelect,
        handleSubmit,
        backToStepNodeListLoading,
      };
    },
  });
</script>
