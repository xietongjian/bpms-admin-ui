<template>
  <BasicModal>
    <BasicForm >
      <template #signType="slotProps">
<!--        <Input placeholder="请输入" v-bind="slotProps" />-->
       aaa <Checkbox v-bind="slotProps" /> 加载
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineExpose, defineEmits } from 'vue';
  // import { BasicModal, useModalInner } from '@/components/Modal';
  // import { BasicForm, useForm } from '@/components/Form/index';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';

  import { approveActionFormSchema } from './action.data';
  import {Button, Tag, message, Input, Checkbox} from 'ant-design-vue';
  import {
    afterAddSign,
    beforeAddSign,
    delegateTask,
    turnTask,
    reviewTask,
    complete,
  } from '#/api/flowoperation/processTask';
  import {formSchema} from "#/views/org/jobGrade/jobGrade.data";
  // import { useGo } from '@/hooks/web/usePage';
  // import { ResultEnum } from '#/enums/httpEnum';

  const nextUserPrefix = 'next_user__';
  // const isUpdate = ref(true);
  const selectorTypeRef = ref('');
  // const go = useGo();

  /*const [registerForm, { setFieldsValue, resetSchema, updateSchema, resetFields, validate }] =
      useForm({
        labelWidth: 100,
        schemas: approveActionFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    const { actionType, multiple, taskId, procInstId, message, approveSettings } =
        data.selectorProps;
    selectorTypeRef.value = actionType;

    // 设置模拟数据
    // approveSettings['next_user'] = [{name: '上级领导', code: 'parentLeader', multiple: true}];
    // approveSettings['flow_to'] = [{name: '线条一', code: 'line-1'}, {name: '线条二', code: 'line-2'}];

    // 组装表单字段
    let customFields = [];

    if (approveSettings.flow_to) {
      const flowToField = {
        field: 'flowTo',
        label: '流转条件',
        component: 'Select',
        componentProps: {
          options: approveSettings.flow_to.map((item) => {
            return { label: item.name, value: item.code };
          }),
        },
        required: true,
      };
      customFields.push(flowToField);
    }

    if (approveSettings.next_user) {
      const nextUserFields = approveSettings.next_user.map((item) => {
        return {
          field: nextUserPrefix + item.code,
          label: item.name,
          component: 'PersonalSelector',
          componentProps: {
            multiple: item.multiple,
          },
          required: true,
        };
      });
      customFields = customFields.concat(nextUserFields);
    }

    setModalProps({ title: '审批' });

    resetSchema([
      ...customFields,
      {
        field: 'message',
        label: '审批意见',
        component: 'Textarea',
        componentProps: {
          autoSize: {
            minRows: 2,
            maxRows: 8,
          },
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
      /!*{
        field: 'procInstId',
        label: 'procInstId',
        required: false,
        component: 'Input',
        show: false,
      },*!/
    ]);

    setFieldsValue({
      actionType,
      taskId,
      procInstId,
      message,
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
          formApi.setValues(values);
          debugger;
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      // await formApi.submitForm();
      // handleSubmit();
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
    schema: approveActionFormSchema,
    wrapperClass: 'grid-cols-1',
  });


  async function handleSubmit() {
    const defaultMsg = '网络异常，请稍后再试！';
    try {
      modalApi.setState({loading: true, confirmLoading: true});
      const {valid} = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();
      // 审批参数封装
      // 封装nextUsers字段(code,name,values)
      let nextUsers = [];
      for (let item in values) {
        if (item.indexOf(nextUserPrefix) === 0) {
          const personals = values[item];
          nextUsers.push({
            code: item.replace(nextUserPrefix, ''),
            values: personals.map((itm) => itm.code).join(','),
          });
        }
      }
      const params = {
        taskId: values.taskId,
        message: values.message,
        nextSequenceFlow: { code: values.flowTo },
        nextUsers: nextUsers,
      };
      complete(params)
          .then((res) => {
            const result = res.data;
            if (result.success) {
              message.success(result.msg);
              // go("/process/todo");
              alert('操作成功后关闭窗口');
            } else {
              message.error(result.msg || defaultMsg);
            }
            modalApi.setState({loading: false, confirmLoading: false});
          })
          .catch(() => {
            message.error(defaultMsg);
          });
    } catch (e) {
      modalApi.setState({loading: false, confirmLoading: false});
    } finally {
    }
  }
  defineExpose(modalApi);
</script>
