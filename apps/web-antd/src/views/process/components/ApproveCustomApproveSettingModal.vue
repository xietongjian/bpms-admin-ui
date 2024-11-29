<template>
  <BasicModal v-bind="$attrs" @register="registerModal" @ok="handleSubmit" >
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
  import { complete } from "@/api/process/process";
  import { useGo } from '@/hooks/web/usePage';
  import { useMessage } from '@/hooks/web/useMessage';

  // 配置下一审批人 - 字段前缀
  const nextUserPrefix = 'next_user__';

  export default defineComponent({
    name: 'ApproveCustomApproveSettingModal',
    components: { BasicModal, BasicForm, Button, Tag },
    emits: ['success', 'register', 'saveForm'],
    setup(_, { emit }) {
      const selectorTypeRef = ref("");
      const { createMessage } = useMessage();
      const go = useGo();
      function goBack(backRoute){
        const currentUrl = window.location.href;
        const newUrl = currentUrl.replace('/process/approve/', '/process/view/');
        window.location.replace(newUrl);
      }
      const [registerForm, { setFieldsValue, resetSchema, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: approveActionFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps }] = useModalInner(async (data) => {
        await resetFields();
        const { actionType, multiple, taskId,
          procInstId,
          message,
          approveSettings,
        } = data.selectorProps;
        selectorTypeRef.value = actionType;

        // 设置模拟数据 - 示例
        // approveSettings['next_user'] = [{name: '上级领导', code: 'parentLeader', multiple: true}];
        // approveSettings['flow_to'] = [{name: '线条一', code: 'line-1'}, {name: '线条二', code: 'line-2'}];

        // 组装表单字段
        let customFields = [];

        if(approveSettings.flow_to){
          const flowToField = {
            field: "flowTo",
            label: "流转条件",
            component: 'Select',
            componentProps: {
              options: approveSettings.flow_to.map(item=>{
                return {label: item.name, value: item.code}
              })
            },
            colProps: {span: 12},
            required: true,
          };
          customFields.push(flowToField);
        }

        if(approveSettings.next_user){
          const nextUserFields = approveSettings.next_user.map(item=>{
            return {
              field: nextUserPrefix + item.code,
              label: item.name,
              component: 'PersonalSelector',
              componentProps: {
                multiple: item.multiple,
              },
              colProps: {span: 22},
              required: true,
            };
          });
          customFields = customFields.concat(nextUserFields);
        }

        setModalProps({title: "审批"});

        resetSchema([
          ...customFields,
          {
            field: 'message',
            label: '审批意见',
            component: 'InputTextArea',
            colProps: {span: 22},
            componentProps: {
              autoSize: {
                minRows: 2,
                maxRows: 8,
              }
            },
            rules: [
              {
                max: 256,
                message: '字符长度不能大于256！',
              },
            ],
          },
          {
            field: 'taskId',
            label: 'taskId',
            required: false,
            component: 'Input',
            show: false,
          },
          /*{
            field: 'procInstId',
            label: 'procInstId',
            required: false,
            component: 'Input',
            show: false,
          },*/
        ]);

        setFieldsValue({
          actionType,
          taskId,
          procInstId,
          message
        });
        setModalProps({loading: false, confirmLoading: false});
      });

      async function handleSubmit() {
        const defaultMsg = '网络异常，请稍后再试！';
        const values = await validate();
        // 审批参数封装
        // 封装nextUsers字段(code,name,values)
        let nextUsers = [];
        for(let item in values){
          if(item.indexOf(nextUserPrefix) === 0){
            const personals = values[item];
            nextUsers.push({
              code: item.replace(nextUserPrefix, ''),
              values: personals.map(itm => itm.code)
            });
          }
        }
        const params = {
          taskId: values.taskId,
          message: values.message,
          nextSequenceFlow: { code: values.flowTo },
          nextUsers: nextUsers
        };
        setModalProps({loadingTip: '处理中...', loading: true, confirmLoading: true});
        emit('saveForm', (saveFormRes)=>{
          if(saveFormRes.success){
            console.log('审批的数据：', params);
            complete(params).then(res=>{
              const result = res.data;
              if(result.success){
                createMessage.success({duration: 1, content: result.msg, onClose: ()=>{
                    setModalProps({loading: false, confirmLoading: false});
                    goBack("/process/todo");
                  }
                });
              }else{
                createMessage.error(result.msg||defaultMsg)
                setModalProps({loading: false, confirmLoading: false});
              }
            }).catch(()=>{
              createMessage.error(defaultMsg);
              setModalProps({loading: false, confirmLoading: false});
            });
          } else {
            createMessage.error(saveFormRes.msg||defaultMsg);
            setModalProps({loading: false, confirmLoading: false});
          }
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
