import { BasicColumn, FormSchema } from '@/components/Table';
const colProps = {
  span: 22,
};
export const backToStepTableColumns: BasicColumn[] = [
  {
    title: '节点名称',
    dataIndex: 'nodeName',
    align: 'left',
  },
  {
    title: '审批人姓名',
    dataIndex: 'userName',
    width: 120,
    align: 'left',
  },
  {
    title: '审批人工号',
    dataIndex: 'userCode',
    width: 120,
    align: 'left',
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

export const approveActionFormSchema: FormSchema[] = [
  {
    field: 'actionType',
    label: 'actionType',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    field: 'taskId',
    label: 'taskId',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    field: 'procInstId',
    label: 'procInstId',
    required: false,
    component: 'Input',
    show: false,
  },

  {
    field: 'actionPersonal',
    label: '选择操作人员',
    component: 'PersonalSelector',
    componentProps: {
      multiple: true,
    },
    required: true,
  },

  {
    field: 'signType',
    component: 'Checkbox',
    label: ' ',
    colProps,
    ifShow: ({values})=>values.actionType === 'addsign',
    renderComponentContent: '加签审批完成之后是否流转到我审批',
  },
  {
    field: 'message',
    label: '审批意见',
    component: 'InputTextArea',
    required: true,
    rules: [
      {
        max: 4000,
        message: '字符长度不能大于4000！',
      },
    ],
    componentProps: {
      autoSize: {
        minRows: 2,
        maxRows: 10,
      },
    },
  },
];
export const fetchBackMessageFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    field: 'taskId',
    label: 'taskId',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    field: 'message',
    label: '审批意见',
    component: 'InputTextArea',
    rules: [
      {
        max: 256,
        message: '字符长度不能大于256！',
      },
    ],
    componentProps: {
      autoSize: {
        minRows: 2,
        maxRows: 10,
      },
    },
  },
];

export const approveBackToStepFormSchema: FormSchema[] = [
  {
    field: 'actionType',
    label: 'actionType',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    field: 'taskId',
    label: 'taskId',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    field: 'procInstId',
    label: 'procInstId',
    required: false,
    component: 'Input',
    show: false,
  },

  {
    field: 'message',
    label: '驳回意见',
    component: 'InputTextArea',
    required: true,
    rules: [
      {
        max: 256,
        message: '字符长度不能大于256！',
      },
    ],
    componentProps: {
      autoSize: {
        minRows: 2,
        maxRows: 10,
      },
    },
    colProps: {
      span: 24,
    },
  },
  {
    field: 'backToStepNodeList',
    label: '选择驳回节点',
    component: 'Input',
    defaultValue: '0',
    slot: 'backToStepNodeRender',
    ifShow: true,
  },
];
