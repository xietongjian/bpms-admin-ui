import { BasicColumn, FormSchema } from '@/components/Table';

const colProps = {
  span: 24,
};
export const columns: BasicColumn[] = [
  {
    title: '授权人',
    dataIndex: 'currUserName',
    width: 100,
    align: 'center',
    slots: { default: 'currUserName'}
  },
  {
    title: '被授权人',
    dataIndex: 'authUserName',
    width: 100,
    align: 'center',
    slots: { default: 'authUserName'}
  },
  {
    title: '授权流程模板名称',
    dataIndex: 'authFlowKeys',
    align: 'left',
    slots: {default: 'authFlowKeys'}
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    width: 150,
    align: 'center',
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    width: 150,
    align: 'center',
  },

  {
    field: 'action',
    fixed: 'right',
    slots: {default: 'action'},
    title: '操作',
    width: 120,
  },
  /*{
    title: '创建人',
    dataIndex: 'creator',
    width: 100,
    align: 'left',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 150,
    align: 'center',
  },
  {
    title: '更新人',
    dataIndex: 'updator',
    width: 100,
    align: 'left',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 150,
    align: 'center',
  },*/
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/编码',
    },
    labelWidth: 60,
    colProps: {
      span: 6,
      lg: { span: 6, offset: 0 },
      sm: { span: 10, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: '表id',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    field: 'currUser',
    label: '授权人',
    required: true,
    component: 'PersonalSelector',
    colProps: { span: 13 },
    componentProps: {
      multiple: false,
    },
    show: true,
  },
  {
    field: 'authUser',
    label: '被授权人',
    required: true,
    component: 'PersonalSelector',
    colProps: { span: 13 },
    componentProps: {
      multiple: false,
    },
    show: true,
  },
  {
    field: 'dateRange',
    label: '授权时间',
    required: true,
    component: 'RangePicker',
    colProps,
  },
  {
    field: 'authType',
    label: '授权范围',
    component: 'RadioButtonGroup',
    defaultValue: '1',
    componentProps: ({ formActionType }) => {
      return {
        options: [
          { label: '所有模板', value: '1' },
          { label: '指定模板', value: '0' },
        ],
      };
    },
    colProps,
  },
  {
    field: 'authFlowKeys',
    label: '流程模板',
    required: ({ values }) => {
      return values.authType === '0';
    },
    component: 'ModelInfoSelector',
    show: ({ values }) => {
      return values.authType === '0';
    },
    componentProps: {
      multiple: true,
      title: '选择流程模板',
    },
    colProps,
  },
];
