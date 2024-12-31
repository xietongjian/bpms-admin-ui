import { BasicColumn, FormSchema } from '@/components/Table';

import { getProcessStatusEnums } from '@/api/flowoperation/processInst';

let processStatus = [];
const processStatusObj = {};

getProcessStatusEnums().then((res) => {
  processStatus = res;
  res.forEach((item) => {
    processStatusObj[item.value] = item.label;
  });
});

export const columns: BasicColumn[] = [
  {
    title: '流程标题',
    dataIndex: 'formName',
    align: 'left',
    width: 300,
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
    title: '业务单号',
    dataIndex: 'businessKey',
    align: 'left',
    width: 200,
    resizable: true,
  },
  {
    title: '状态',
    dataIndex: 'processStatusName',
    width: 100,
    align: 'center',
  },
  {
    title: '提交单位',
    dataIndex: 'startedUserComName',
    align: 'left',
    width: 200,
    resizable: true,
  },
  {
    title: '提交部门',
    dataIndex: 'startedUserDeptName',
    align: 'left',
    width: 100,
    resizable: true,
  },
  {
    title: '提交人',
    dataIndex: 'startedUserName',
    width: 100,
    align: 'center',
  },
  {
    title: '提交时间',
    dataIndex: 'startTime',
    width: 180,
    align: 'left',
    sorter: true,
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
    colProps: {
      sm: 12,
      md: 12,
      lg: 8,
      xl: 6,
      xxl: 6,
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
    field: 'appSn',
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
  {
    field: 'processDefinitionKey',
    label: '流程模板',
    component: 'ModelInfoSelector',
    componentProps: {
      placeholder: '请选择流程模板',
      multiple: false,
      title: '选择流程模板',
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
    field: 'companyId',
    label: '提交单位',
    component: 'OrgSelector',
    componentProps: {
      placeholder: '请选择提交单位',
      selectType: '1',
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
    field: 'deptId',
    label: '提交部门',
    component: 'OrgSelector',
    componentProps: {
      placeholder: '请选择提交部门',
      selectType: '2',
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
    field: 'startedUserIds',
    label: '提交人',
    component: 'PersonalSelector',
    componentProps: {
      placeholder: '请选择提交人',
      multiple: true,
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
    field: 'dateRange',
    label: '时间范围',
    component: 'RangePicker',
    colProps: {
      sm: 12,
      md: 12,
      lg: 8,
      xl: 6,
      xxl: 6,
    },
  },
  {
    field: 'processStatus',
    label: '状态',
    component: 'ApiSelect',
    componentProps: {
      api: getProcessStatusEnums,
      labelField: 'value',
      valueField: 'label',
      disabled: true,
    },
    colProps: {
      sm: 12,
      md: 12,
      lg: 8,
      xl: 6,
      xxl: 6,
    },
  },
];

export const processNodeSelectionFormSchema: FormSchema[] = [
  {
    field: 'activityIds',
    label: '选择节点',
    required: true,
    ifShow: true,
    component: 'Select',
    componentProps: {
      placeholder: '请选择任务节点',
      options: [],
    },
    colProps: { span: 24 },
  },
  {
    field: 'message',
    required: false,
    ifShow: false,
    label: '干预信息',
    component: 'InputTextArea',
    colProps: { span: 24 },
    rules: [
      {
        max: 1024,
        message: '字符长度不能大于1024！',
      },
    ],
    componentProps: {
      placeholder: '请输入干预信息',
      autoSize: {
        minRows: 2,
        maxRows: 10,
      },
    },
  },
];

export const processVersionSelectionFormSchema: FormSchema[] = [
  {
    field: 'version',
    label: '版本',
    required: true,
    component: 'Select',
    componentProps: {
      placeholder: '请选择流程版本',
      options: [],
    },
    colProps: { span: 24 },
  },
  {
    field: 'params',
    required: false,
    label: '参数',
    slot: 'paramsList',
    colProps: { span: 24 },
    rules: [
      {
        trigger: 'change',
        validator: async (_, value = []) => {
          const keysSet = new Set();
          for (const item of value) {
            if (!item.key) {
              return Promise.reject('参数的 Key 不能为空');
            }
            if (keysSet.has(item.key)) {
              return Promise.reject(`参数 Key " ${item.key} " 重复`);
            }
            keysSet.add(item.key);
          }
          return Promise.resolve();
        },
      },
    ],
  },
];
