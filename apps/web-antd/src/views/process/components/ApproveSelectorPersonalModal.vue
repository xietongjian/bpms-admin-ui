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
  import { approveActionFormSchema } from './action.data';
  import { Button, Tag } from 'ant-design-vue';
  import {afterAddSign, beforeAddSign, delegateTask, turnTask, reviewTask} from "#/api/process/process";
  import { useGo } from '@/hooks/web/usePage';
  import { useMessage } from '@/hooks/web/useMessage';

  export default defineComponent({
    name: 'ApproveSelectorPersonalModal',
    components: { BasicModal, BasicForm, Button, Tag },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const selectorTypeRef = ref("");
      const { createMessage } = useMessage();
      const go = useGo();

      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: approveActionFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        await resetFields();
        setModalProps({confirmLoading: false, loading: false});
        const { actionType, multiple, taskId,
          procInstId,
          message } = data.selectorProps;
        selectorTypeRef.value = actionType;

        const updatePropsByActionType = (title, actionPersonalLabel, messageLabel)=>{
          setModalProps({title: title});
          updateSchema({
            field: 'actionPersonal',
            label: actionPersonalLabel,
            componentProps: {
              multiple: !!multiple
            }
          });
          updateSchema({
            field: 'message',
            label: messageLabel
          });
        }

        switch(actionType){
          case 'reviewTask':
            updatePropsByActionType('流程转阅', '转阅人员', '转阅附言');
            break;
          case 'delegateTask':
            updatePropsByActionType('流程委派', '委派人员', '委派附言');
            break;
          case 'turnTask':
            updatePropsByActionType('流程转办', '转办人员', '转办附言');
            break;
          case 'addsign':
            updatePropsByActionType('流程加签', '加签人员', '加签附言');
            break;
        }

        /*updateSchema({
          field: 'actionPersonal',
          componentProps: {
            multiple
          }
        });*/
        setFieldsValue({
          actionType,
          taskId,
          procInstId,
          message
        });
        setModalProps({ confirmLoading: false });
      });

      function goBack(backRoute){
        const currentUrl = window.location.href;
        const newUrl = currentUrl.replace('/process/approve/', '/process/view/');
        window.location.replace(newUrl);
      }

      async function handleSubmit() {
        const defaultMsg = '网络异常，请稍后再试！';
        const values = await validate();
        const params = { taskId: values.taskId, processInstanceId: values.procInstId, message: values.message};
        setModalProps({loadingTip: '处理中...', loading: true, confirmLoading: true});
        switch (values.actionType) {
          case 'reviewTask': // 转阅
            // 设置转阅给哪些人
            params['transferToUserNos'] = values.actionPersonal.map(item=>item.code);
            reviewTask(params).then(res=>{
              const result = res.data;
              if(result.success){
                createMessage.success(result.msg);
                closeModal();
                emit('success');
              }else{
                createMessage.error(result.msg||defaultMsg)
              }
            }).catch(()=>{
              createMessage.error(defaultMsg)
            }).finally(()=>{
              setModalProps({confirmLoading: false, loading: false});
            });
            break;
          case 'delegateTask':
            params['delegateUserCode'] = values.actionPersonal.map(item=>item.code)[0];
            delegateTask(params).then(res=>{
              const result = res.data;
              if(result.success){
                createMessage.success(result.msg, 1,()=>{
                  setModalProps({confirmLoading: false, loading: false});
                  goBack('/process/todo')
                })
                // go("/process/todo");
              }else{
                createMessage.error(result.msg||defaultMsg)
              }
            }).catch(()=>{
              createMessage.error(defaultMsg)
              setModalProps({confirmLoading: false, loading: false});
            });
            break;
          case 'turnTask':
            params['turnToUserId'] = values.actionPersonal.map(item=>item.code)[0];
            turnTask(params).then(res=>{
              const result = res.data;
              if(result.success){
                createMessage.success(result.msg, 1,()=>{
                  goBack('/process/todo')
                })
              }else{
                createMessage.error(result.msg||defaultMsg)
              }
            }).catch(()=>{
              createMessage.error(defaultMsg)
            }).finally(()=>{
              setModalProps({confirmLoading: false, loading: false});
            });
            break;
          case 'addsign':
            params['signPersonals'] = values.actionPersonal.map(item=>item.code);
            if(values.signType){
              beforeAddSign(params).then(res=>{
                const result = res.data;
                if(result.success){
                  createMessage.success(result.msg, 1,()=>{
                    goBack('/process/todo')
                  })
                  // go("/process/todo");
                }else{
                  createMessage.error(result.msg||defaultMsg)
                }
              }).catch(()=>{
                createMessage.error(defaultMsg)
              }).finally(()=>{
                setModalProps({confirmLoading: false, loading: false});
              });
            } else {
              afterAddSign(params).then(res=>{
                const result = res.data;
                if(result.success){
                  createMessage.success(result.msg)
                  createMessage.success(result.msg, 1,()=>{
                    goBack('/process/todo')
                  })
                }else{
                  createMessage.error(result.msg||defaultMsg)
                }
              }).catch(()=>{
                createMessage.error(defaultMsg)
              }).finally(()=>{
                setModalProps({confirmLoading: false, loading: false});
              });
            }
            break;
        }
      }

      return {
        registerModal,
        registerForm,
        handleSubmit,
      };
    },
  });
</script>
