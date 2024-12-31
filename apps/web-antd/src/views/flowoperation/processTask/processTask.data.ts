import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '流程标题',
    dataIndex: 'formName',
    align: 'left',
    width: 300,
    resizable: true,
  },
  {
    title: '提交人',
    dataIndex: 'startPersonName',
    width: 100,
    align: 'center',
  },
  {
    title: '任务名称',
    dataIndex: 'name',
    align: 'left',
    width: 200,
    resizable: true,
  },
  {
    title: '待办人',
    dataIndex: 'assigneeName',
    align: 'center',
  },
  {
    title: '停留时间',
    dataIndex: 'stayHour',
    align: 'left',
  },
  {
    title: '状态',
    width: 100,
    dataIndex: 'processStatusName',
    align: 'center',
  },
  {
    title: '所属系统',
    dataIndex: 'appName',
    align: 'left',
  },
  {
    title: '任务ID',
    dataIndex: 'taskId',
    align: 'left',
    width: 200,
    resizable: true,
  },
  {
    title: '业务单号',
    dataIndex: 'businessKey',
    align: 'left',
    width: 200,
    resizable: true,
  },
  {
    title: '流程实例ID',
    dataIndex: 'processInstanceId',
    align: 'left',
    width: 200,
    resizable: true,
  },
  {
    title: '任务创建时间',
    dataIndex: 'createTime',
    sorter: true,
    width: 150,
    align: 'center',
  },
  {
    title: '流程发起时间',
    dataIndex: 'processStartTime',
    sorter: true,
    width: 150,
    align: 'center',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'formName',
    label: '流程标题',
    component: 'Input',
    componentProps: {
      placeholder: '请输入流程标题',
    },
    colProps: {
      span: 6,
      lg: { span: 6, offset: 0 },
      sm: { span: 10, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
  {
    field: 'formName',
    label: '节点名称',
    component: 'Input',
    componentProps: {
      placeholder: '请输入流程标题',
    },
    colProps: {
      span: 6,
      lg: { span: 6, offset: 0 },
      sm: { span: 10, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
  {
    field: 'businessKey',
    label: '业务单号',
    component: 'Input',
    componentProps: {
      placeholder: '请输入业务表单编号',
    },
    colProps: {
      span: 6,
      lg: { span: 6, offset: 0 },
      sm: { span: 10, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
  {
    field: 'processInstanceId',
    label: '流程实例ID',
    component: 'Input',
    componentProps: {
      placeholder: '请输入流程实例ID',
    },
    colProps: {
      span: 6,
      lg: { span: 6, offset: 0 },
      sm: { span: 10, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
  {
    field: 'userCode',
    label: '待办人',
    component: 'PersonalSelector',
    componentProps: {
      placeholder: '请选择待办人',
    },
    colProps: {
      span: 6,
      lg: { span: 6, offset: 0 },
      sm: { span: 10, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
  {
    field: 'appSn',
    label: '系统',
    component: 'Select',
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
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: '名称',
    required: true,
    component: 'Input',
    rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 32,
        message: '字符长度不能大于32！',
      },
    ],
  },
  {
    field: 'sn',
    label: '标识',
    required: true,
    component: 'Input',
  },
  {
    field: 'url',
    label: '系统URL',
    required: true,
    component: 'Input',
    rules: [
      {
        required: true,
        whitespace: true,
        message: '系统URL不能为空！',
      },
      {
        pattern: new RegExp('[a-zA-z]+://[^\\s]*'),
        type: 'string',
        message: '请输入正确的URL地址！',
      },
      {
        max: 40,
        message: '字符长度不能大于40！',
      },
    ],
  },
  {
    field: 'indexUrl',
    label: '首页URL',
    required: true,
    component: 'Input',
    rules: [
      {
        required: true,
        whitespace: true,
        message: '首页URL不能为空！',
      },
      {
        pattern: new RegExp('^\\/(\\w+\\/?)+(\\.?\\w+)?$'),
        type: 'string',
        message: '请输入正确的URL地址！！',
      },
      {
        max: 128,
        message: '字符长度不能大于128！',
      },
    ],
  },
  {
    field: 'image',
    label: '图标',
    required: false,
    component: 'IconPicker',
  },
  {
    field: 'orderNo',
    label: '排序号',
    helpMessage: '数值越小越靠前！',
    required: false,
    component: 'InputNumber',
  },
  {
    field: 'status',
    label: '状态',
    required: false,
    component: 'Switch',
    defaultValue: true,
    componentProps: {
      checkedChildren: '启用',
      unCheckedChildren: '禁用',
    },
  },
  {
    label: '备注',
    field: 'note',
    component: 'InputTextArea',
    rules: [
      {
        max: 500,
        message: '字符长度不能大于500！',
      },
    ],
  },
];
