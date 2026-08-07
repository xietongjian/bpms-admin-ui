export const searchFormSchema = [
  {
    field: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入代码/名称',
    },
    labelWidth: 60,
    colProps: { span: 8, lg: { span: 8, offset: 0 }, sm: { span: 10, offset: 0 }, xs: { span: 16, offset: 0 } },
  },
];
