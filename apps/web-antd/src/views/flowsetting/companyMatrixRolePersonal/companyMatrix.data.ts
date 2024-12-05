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
    label: '公司名/编码',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/标识',
    },
    labelWidth: 90,
    colProps: { span: 6 },
  },
  {
    field: 'roleKeyword',
    label: '角色名',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称',
    },
    labelWidth: 90,
    colProps: { span: 6 },
  },
];
