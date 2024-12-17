import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '模板名称',
    dataIndex: 'modelName',
    align: 'left',
  },
  {
    title: '人员姓名',
    dataIndex: 'personalName',
    align: 'center',
  },
  {
    title: '角色名称',
    dataIndex: 'roleNames',
    align: 'left',
  },
  {
    title: '角色标识',
    dataIndex: 'roleSn',
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'userNo',
    label: '人员',
    component: 'PersonalSelector',
    componentProps: {
      placeholder: '请选择人员',
    },
    labelWidth: 60,
    colProps: {
      span: 6,
      lg: { span: 6, offset: 0 },
      sm: { span: 10, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
  /*{
    field: 'roleSn',
    label: '角色',
    helpMessage:'组件暂未开发',
    component: 'Input',
    componentProps: {
      placeholder: '请选择角色',
    },
    colProps: {span: 6, lg:{span: 6, offset:0}, sm:{span: 10, offset: 0}, xs:{span: 16, offset: 0}},
  },*/
];
