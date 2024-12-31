import { FormSchema } from '@/components/Table';

export const bizKeyFormSchema: FormSchema[] = [
  {
    field: 'bizKeys',
    label: '业务表单Key',
    component: 'Input',
    required: true,
    helpMessage: '根据业务表单Key清理数据！',
    componentProps: {
      placeholder: '请输入业务表单Key！',
    },
    colProps: {
      span: 16,
      lg: { span: 16, offset: 0 },
      sm: { span: 20, offset: 0 },
      xs: { span: 24, offset: 0 },
    },
  },
];
export const procInstIdFormSchema: FormSchema[] = [
  {
    field: 'procInstIds',
    label: '流程ProcInstId',
    component: 'Input',
    required: true,
    helpMessage: '根据流程ProcInstId清理数据！',
    componentProps: {
      placeholder: '请输入流程ProcInstId！',
    },
    colProps: {
      span: 16,
      lg: { span: 16, offset: 0 },
      sm: { span: 20, offset: 0 },
      xs: { span: 24, offset: 0 },
    },
  },
];

export const modelKeyFormSchema: FormSchema[] = [
  {
    field: 'modelKeys',
    label: '流程ModelKey',
    component: 'Input',
    required: true,
    helpMessage: '根据流程ModelKey清理数据！',
    componentProps: {
      placeholder: '请输入流程ModelKey！',
    },
    colProps: {
      span: 16,
      lg: { span: 16, offset: 0 },
      sm: { span: 20, offset: 0 },
      xs: { span: 24, offset: 0 },
    },
  },
];

export const deleteModelByModelKeyFormSchema: FormSchema[] = [
  {
    field: 'modelKey',
    label: '流程ModelKey',
    component: 'Input',
    required: true,
    helpMessage: '根据流程ModelKey删除流程模板数据！',
    componentProps: {
      placeholder: '请输入流程ModelKey！',
    },
    colProps: {
      span: 16,
      lg: { span: 16, offset: 0 },
      sm: { span: 20, offset: 0 },
      xs: { span: 24, offset: 0 },
    },
  },
];
