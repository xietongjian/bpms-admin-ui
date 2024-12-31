import { BasicColumn, FormSchema } from '@/components/Table';

export const timerJobColumns: BasicColumn[] = [
  {
    title: '流程标题',
    dataIndex: 'processName',
    align: 'left',
    width: 300,
    resizable: true,
  },
  {
    title: '节点名称',
    dataIndex: 'elementName',
    align: 'left',
    width: 200,
    resizable: true,
  },
  {
    title: '所属系统',
    dataIndex: 'tenantId',
    align: 'left',
    width: 150,
    resizable: true,
  },
  {
    title: '执行时间',
    dataIndex: 'duedate',
    align: 'left',
    width: 180,
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
    title: '流程定义ID',
    dataIndex: 'processDefinitionId',
    align: 'left',
    width: 200,
    resizable: true,
  },
  {
    title: '类型',
    dataIndex: 'jobType',
    align: 'left',
    width: 100,
    resizable: true,
  },
  {
    title: '提交时间',
    dataIndex: 'createTime',
    width: 180,
    align: 'left',
    sorter: true,
  },
];

export const deadLetterJobColumns: BasicColumn[] = [
  {
    title: '流程标题',
    dataIndex: 'processName',
    align: 'left',
    width: 300,
    resizable: true,
  },
  {
    title: '节点名称',
    dataIndex: 'elementName',
    align: 'left',
    width: 200,
    resizable: true,
  },
  {
    title: '所属系统',
    dataIndex: 'tenantId',
    align: 'left',
    width: 150,
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
    title: '流程定义ID',
    dataIndex: 'processDefinitionId',
    align: 'left',
    width: 200,
    resizable: true,
  },
  {
    title: '执行时间',
    dataIndex: 'duedate',
    align: 'left',
    width: 180,
    resizable: true,
  },
  {
    title: '类型',
    dataIndex: 'jobType',
    align: 'left',
    width: 100,
    resizable: true,
  },
  {
    title: '异常信息',
    dataIndex: 'exceptionMessage',
    align: 'left',
    width: 200,
    resizable: true,
  },
  {
    title: '提交时间',
    dataIndex: 'createTime',
    width: 180,
    align: 'left',
    sorter: true,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'processName',
    label: '流程标题',
    component: 'Input',
    componentProps: {
      placeholder: '请输入流程标题',
    },
    colProps: {
      sm: 12,
      md: 12,
      lg: 8,
      xl: 6,
      xxl: 6,
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
      sm: 12,
      md: 12,
      lg: 8,
      xl: 6,
      xxl: 6,
    },
  },
  {
    field: 'tenantId',
    label: '系统',
    component: 'Select',
    colProps: {
      sm: 12,
      md: 12,
      lg: 8,
      xl: 6,
      xxl: 6,
    },
  },
];

export const timerJobFormSchema: FormSchema[] = [
  {
    field: 'jobId',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'processName',
    label: '流程名称',
    component: 'Input',
    slot: 'processNameRender',
  },
  {
    field: 'elementName',
    label: '节点名称',
    component: 'Input',
    slot: 'elementNameRender',
  },
  {
    field: 'duedate',
    label: '执行时间',
    component: 'DatePicker',
    componentProps: {
      placeholder: '请选择执行时间',
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
    },
    rules: [{ required: true }],
    colProps: {
      span: 24,
    },
  },
];
