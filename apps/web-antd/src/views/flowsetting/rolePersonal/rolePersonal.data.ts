import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    align: 'left',
    width: 300,
    resizable: true,
  },
  {
    title: '编码',
    dataIndex: 'sn',
    width: 120,
    align: 'left',
    resizable: true,
  },
  /*{
    title: '所属公司',
    dataIndex: 'companyName',
    width: 120,
    align: 'left',
  },*/
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
];

export const personalColumns: BasicColumn[] = [
  {
    title: '操作',
    dataIndex: 'action',
    width: 50,
  },
  {
    title: '姓名',
    dataIndex: 'personalName',
    align: 'left',
    width: 200,
  },
  {
    title: '所属公司',
    dataIndex: 'companyName',
    align: 'left',
    // width: 200,
  },
  {
    title: '所属部门',
    dataIndex: 'deptName',
    align: 'left',
    // width: 200,
  },
  /*{
    title: '配置管辖范围',
    dataIndex: 'setManagerRange',
    align: 'center',
    slots: { align:'right',customRender: 'setManagerRange' },
  },*/
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

export const companyRoleFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    required: false,
    component: 'Input',
    show: false,
  },
];
