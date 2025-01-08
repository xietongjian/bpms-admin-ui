<template>
  <BasicModal v-bind="$attrs" @register="registerModal" @ok="handleSubmit">
    <BasicForm @register="registerForm" >
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { fetchBackMessageFormSchema } from './action.data';
  import { Button, Tag } from 'ant-design-vue';
  import {
    getCommentInfoByTaskId,
    updateCommentInfo
  } from "#/api/process/process";
  import { useGo } from '@/hooks/web/usePage';
  import { useMessage } from '@/hooks/web/useMessage';

  export default defineComponent({
    name: 'FetchBackMessageModal',
    components: { BasicModal, BasicForm, Button, Tag },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { createMessage } = useMessage();
      const go = useGo();

      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: fetchBackMessageFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        await resetFields();
        const { taskId } = data;
        setModalProps({title: '取回我的审批意见'});

        setFieldsValue({
          taskId,
        });

        // 加载已审批的审批意见
        getCommentInfoByTaskId({taskId}).then(res=>{
          setFieldsValue({
            id: res.id,
            message: res.message,
          });
        });

        setModalProps({ confirmLoading: false });
      });

      async function handleSubmit() {
        const defaultMsg = '网络异常，请稍后再试！';
        const values = await validate();
        setModalProps({ confirmLoading: true });
        updateCommentInfo(values).then(res=>{
          const result = res.data;
          if(result.success){
            createMessage.success(result.msg);
            closeModal();
            emit('success');
          }else{
            createMessage.error(result.msg||defaultMsg)
          }
          setModalProps({ confirmLoading: false });
        }).catch(()=>{
          createMessage.error(defaultMsg)
          setModalProps({ confirmLoading: false });
        });
      }

      return {
        registerModal,
        registerForm,
        handleSubmit,
      };
    },
  });
</script>
