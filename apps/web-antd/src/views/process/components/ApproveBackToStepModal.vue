<template>
  <BasicModal v-bind="$attrs" @register="registerModal" @ok="handleSubmit">
    <BasicForm @register="registerForm" >
      <template #backToStepNodeRender="{schame, field}">
        <Table
          ref="backToStepNodeTableRef"
          :pagination="false"
          rowKey="nodeId"
          :row-selection="{type: 'radio', selectedRowKeys: selectedKeys, onChange: changeSelect}"
          :columns="backToStepTableColumns"
          :data-source="backToStepNodeList"
          size="small"
          :loading="backToStepNodeListLoading"
          :customRow="customRow"
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
  import {backToStep, backToSubmitter, getBackToStepNodes} from "@/api/process/process";
  import { useGo } from '@/hooks/web/usePage';
  import { useMessage } from '@/hooks/web/useMessage';
  import {ResultEnum} from "@/enums/httpEnum";

  export default defineComponent({
    name: 'ApproveBackToStepModal',
    components: { BasicModal, BasicForm, Table, Button, Tag },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      // const isUpdate = ref(true);
      const backToStepNodeList = ref([]);
      const selectedKeys = ref([]);
      const selectedRows = ref([]);
      const backToStepNodeTableRef = ref();
      const backToStepNodeListLoading = ref(false);
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

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        await resetFields();
        const { taskId, procInstId, message } = data.selectorProps;
        selectedKeys.value = [];
        selectedRows.value = [];
        setModalProps({title: "驳回"});
        loadBackNodeList(taskId);
        setFieldsValue({
          taskId,
          procInstId,
          message
        });
        setModalProps({ confirmLoading: false });
      });

      function loadBackNodeList(taskId){
        // 加载
        backToStepNodeListLoading.value = true;
        getBackToStepNodes({taskId}).then(res=>{
          backToStepNodeList.value = res;
        }).finally(()=>{
          backToStepNodeListLoading.value = false;
        });
      }

      function goBack(backRoute){
        const currentUrl = window.location.href;
        const newUrl = currentUrl.replace('/process/approve/', '/process/view/');
        window.location.replace(newUrl);
      }
      async function handleSubmit() {
        const values = await validate();
        const params = { taskId: values.taskId, processInstanceId: values.procInstId, message: values.message};

        setModalProps({confirmLoading: true});

        if(unref(selectedKeys) && unref(selectedKeys).length>0){
          params['distFlowElementId'] =unref(selectedKeys)[0];
          backToStep(params).then(res=>{
            const result = res.data;
            if(result.success){
              createMessage.success(result.msg, 1, ()=>{
                goBack('/process/todo');
              });
            }else{
              createMessage.error(result.msg)
            }
          }).catch(()=>{
            createMessage.error("网络异常，请稍后再试！")
          }).finally(()=>{
            setModalProps({confirmLoading: false});
          });
        }else{
          createMessage.error('请选择要驳回的节点!');
          setModalProps({confirmLoading: false});
          return;
        }

        /*if(values.backToStepType === '1'){

        }else{
          // createMessage.info('驳回到提交人单独的接口!');
          backToSubmitter(params).then(res=>{
            const result = res.data;
            if(result.success){
              createMessage.success(result.msg, 1, ()=>{
                goBack('/process/todo');
              });
            }else{
              createMessage.error(result.msg)
            }
          }).finally(()=>{
            setModalProps({confirmLoading: false});
          })
        }*/
      }

      function changeSelect(e){
        selectedRows.value = unref(backToStepNodeList).filter(item=>item.nodeId === e[0]);
        selectedKeys.value = e;
      }
      function customRow(record, index) {
        return {
          onClick: ()=>{
            selectedKeys.value = [record.nodeId]
            selectedRows.value = [record];
          }
        };
      }

      return {
        customRow,
        backToStepNodeTableRef,
        registerModal,
        backToStepTableColumns,
        backToStepNodeList,
        backToStepNodeListLoading,
        registerForm,
        selectedKeys,
        changeSelect,
        handleSubmit,
      };
    },
  });
</script>
