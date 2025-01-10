
import { getProcessStatusEnums } from '#/api/flowoperation/processInst';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import {getAll} from "#/api/base/app";

let processStatus = [];
const processStatusObj = {};

getProcessStatusEnums().then((res) => {
  processStatus = res;
  res.forEach((item) => {
    processStatusObj[item.value] = item.label;
  });
});

export const columns: VxeGridProps['columns'] = [
  {
    title: '流程标题',
    field: 'formName',
    align: 'left',
    width: 300,
    resizable: true,
  },
  {
    title: '流程实例ID',
    field: 'processInstanceId',
    align: 'left',
    width: 200,
    resizable: true,
  },
  {
    title: '业务单号',
    field: 'businessKey',
    align: 'left',
    width: 200,
    resizable: true,
  },
  {
    title: '状态',
    field: 'processStatusName',
    width: 100,
    align: 'center',
  },
  {
    title: '提交单位',
    field: 'startedUserComName',
    align: 'left',
    width: 200,
    resizable: true,
  },
  {
    title: '提交部门',
    field: 'startedUserDeptName',
    align: 'left',
    width: 100,
    resizable: true,
  },
  {
    title: '提交人',
    field: 'startedUserName',
    width: 100,
    align: 'center',
  },
  {
    title: '提交时间',
    field: 'startTime',
    width: 180,
    align: 'left',
    sorter: true,
  },
  {
    field: 'action',
    fixed: 'right',
    slots: {default: 'action'},
    title: '操作',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/标识',
    },
  },
  {
    fieldName: 'businessKey',
    label: '业务单号',
    component: 'Input',
    componentProps: {
      placeholder: '请输入业务表单编号',
    },
  },
  {
    fieldName: 'processInstanceId',
    label: '流程实例ID',
    component: 'Input',
    componentProps: {
      placeholder: '请输入流程实例ID',
    },
  },
  {
    fieldName: 'appSn',
    label: '系统',
    component: 'ApiSelect',
    componentProps: {
      class: 'w-full',
      api: getAll,
      fieldNames: {
        value: 'sn',
        label: 'name'
      },
    }
  },
  {
    fieldName: 'processDefinitionKey',
    label: '流程模板',
    component: 'ModelInfoSelector',
    componentProps: {
      placeholder: '请选择流程模板',
      multiple: false,
      title: '选择流程模板',
    },
  },
  {
    fieldName: 'companyId',
    label: '提交单位',
    component: 'OrgSelector',
    componentProps: {
      placeholder: '请选择提交单位',
      selectType: '1',
    },
  },
  {
    fieldName: 'deptId',
    label: '提交部门',
    component: 'OrgSelector',
    componentProps: {
      placeholder: '请选择提交部门',
      selectType: '2',
    },
  },
  {
    fieldName: 'startedUserIds',
    label: '提交人',
    component: 'PersonalSelector',
    componentProps: {
      placeholder: '请选择提交人',
      multiple: true,
    },
  },
  {
    fieldName: 'dateRange',
    label: '时间范围',
    component: 'RangePicker',
  },
  {
    fieldName: 'processStatus',
    label: '状态',
    component: 'ApiSelect',
    componentProps: {
      api: getProcessStatusEnums,
      labelField: 'value',
      valueField: 'label',
      disabled: true,
    },
  },
];

export const processNodeSelectionFormSchema: FormSchema[] = [
  {
    fieldName: 'activityIds',
    label: '选择节点',
    component: 'Select',
    componentProps: {
      placeholder: '请选择任务节点',
      options: [],
    },
    rules: 'selectRequired'
  },
  {
    fieldName: 'message',
    ifShow: false,
    label: '干预信息',
    component: 'Textarea',
    rules: z
        .string()
        .max(1024, "字符长度不能大于1024！")
        .nullable()
        .optional(),
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
    fieldName: 'version',
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
    fieldName: 'params',
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
