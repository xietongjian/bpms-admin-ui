import type {VbenFormSchema as FormSchema} from '@vben/common-ui';


export const bizKeyFormSchema: FormSchema[] = [
  {
    fieldName: 'bizKeys',
    label: '业务表单Key',
    component: 'Input',
    rules: 'required',
    help: '根据业务表单Key清理数据！',
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
    fieldName: 'procInstIds',
    label: '流程ProcInstId',
    component: 'Input',
    rules: 'required',
    help: '根据流程ProcInstId清理数据！',
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
    fieldName: 'modelKeys',
    label: '流程ModelKey',
    component: 'Input',
    rules: 'required',
    help: '根据流程ModelKey清理数据！',
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
    fieldName: 'modelKey',
    label: '流程ModelKey',
    component: 'Input',
    rules: 'required',
    help: '根据流程ModelKey删除流程模板数据！',
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
