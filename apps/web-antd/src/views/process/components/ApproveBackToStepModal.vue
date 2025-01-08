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
<script lang="ts" setup>
  import { defineComponent, ref, computed, unref, defineEmits, defineProps, defineExpose } from 'vue';
  // import { BasicModal, useModalInner } from '@/components/Modal';
  // import { BasicForm, useForm } from '@/components/Form/index';

  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';

  import { approveBackToStepFormSchema, backToStepTableColumns } from './action.data';
  import { Button, message, Tag, Table } from 'ant-design-vue';
  import {backToStep, backToSubmitter, getBackToStepNodes} from "#/api/process/process";
  // import { useGo } from '@/hooks/web/usePage';
  // import { useMessage } from '@/hooks/web/useMessage';
  import {ResultEnum} from "#/enums/httpEnum";
  import {formCategoryFormSchema} from "#/views/form/template/formTemplate.data";

  const emit = defineEmits(['success', 'register']);

  // const isUpdate = ref(true);
  const backToStepNodeList = ref([]);
  const selectedKeys = ref([]);
  const selectedRows = ref([]);
  const backToStepNodeTableRef = ref();
  const backToStepNodeListLoading = ref(false);
  // const { message } = useMessage();


  /*const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
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
  });*/


  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          const { taskId, procInstId, message } = values.selectorProps;
          selectedKeys.value = [];
          selectedRows.value = [];
          modalApi.setState({title: "驳回"});
          loadBackNodeList(taskId);
          formApi.setValues({
            taskId,
            procInstId,
            message
          });
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
    schema: approveBackToStepFormSchema,
    wrapperClass: 'grid-cols-1',
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
    const {valid} = await formApi.validate();
    if(!valid){
      return;
    }
    const values = await formApi.getValues();
    const params = { taskId: values.taskId, processInstanceId: values.procInstId, message: values.message};

    modalApi.setState({loading: true, confirmLoading: true});

    if(unref(selectedKeys) && unref(selectedKeys).length>0){
      params['distFlowElementId'] =unref(selectedKeys)[0];
      backToStep(params).then(res=>{
        const result = res.data;
        if(result.success){
          message.success(result.msg, 1, ()=>{
            goBack('/process/todo');
          });
        }else{
          message.error(result.msg)
        }
      }).catch(()=>{
        message.error("网络异常，请稍后再试！")
      }).finally(()=>{
        modalApi.setState({loading: false, confirmLoading: false});
      });
    }else{
      message.error('请选择要驳回的节点!');
      modalApi.setState({loading: false, confirmLoading: false});
      return;
    }

    /*if(values.backToStepType === '1'){

    }else{
      // message.info('驳回到提交人单独的接口!');
      backToSubmitter(params).then(res=>{
        const result = res.data;
        if(result.success){
          message.success(result.msg, 1, ()=>{
            goBack('/process/todo');
          });
        }else{
          message.error(result.msg)
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

  defineProps(modalApi)
</script>
