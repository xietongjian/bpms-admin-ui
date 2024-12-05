import { BasicColumn, FormSchema } from '@/components/Table';

export const baseColumns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    align: 'left',
    width: 200,
    resizable: true,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/标识',
    },
    labelWidth: 60,
    colProps: {
      span: 6,
      lg: { span: 8, offset: 0 },
      sm: { span: 14, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
];
