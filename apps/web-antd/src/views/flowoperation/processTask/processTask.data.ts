import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import { getAll } from '#/api/base/app';

export const columns: VxeGridProps['columns'] = [
  {
    title: '流程标题',
    field: 'formName',
    align: 'left',
    minWidth: 300,
    resizable: true,
    slots: {default: 'formName'}
  },
  {
    title: '提交人',
    field: 'startPersonName',
    width: 100,
    align: 'center',
    slots: {default: 'startPersonName'}
  },
  {
    title: '任务名称',
    field: 'name',
    align: 'left',
    width: 200,
    resizable: true,
  },
  {
    title: '待办人',
    field: 'assigneeName',
    align: 'center',
    minWidth: 200,
    slots: {default: 'assigneeName'}
  },
  {
    title: '停留时间',
    field: 'stayHour',
    align: 'left',
    minWidth: 100,
  },
  {
    title: '状态',
    width: 100,
    field: 'processStatusName',
    align: 'center',
    slots: {default: 'processStatusName'}
  },
  {
    title: '所属系统',
    field: 'appName',
    align: 'left',
    minWidth: 140,
  },
  {
    title: '任务ID',
    field: 'taskId',
    align: 'left',
    width: 200,
    resizable: true,
    slots: {default: 'taskId'}
  },
  {
    title: '业务单号',
    field: 'businessKey',
    align: 'left',
    width: 200,
    resizable: true,
    slots: {default: 'businessKey'}
  },
  {
    title: '流程实例ID',
    field: 'processInstanceId',
    align: 'left',
    width: 200,
    resizable: true,
    slots: {default: 'processInstanceId'}
  },
  {
    title: '任务创建时间',
    field: 'createTime',
    sorter: true,
    width: 150,
    align: 'center',
  },
  {
    title: '流程发起时间',
    field: 'processStartTime',
    sorter: true,
    width: 150,
    align: 'center',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: {default: 'action'},
    title: '操作',
    width: 150,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'formName',
    label: '流程标题',
    component: 'Input',
    componentProps: {
      placeholder: '请输入流程标题',
    },
  },
  {
    fieldName: 'name',
    label: '节点名称',
    component: 'Input',
    componentProps: {
      placeholder: '请输入流程标题',
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
    fieldName: 'userCode',
    label: '待办人',
    component: 'PersonalSelector',
    componentProps: {
      placeholder: '请选择待办人',
    },
  },
  {
    fieldName: 'appSn',
    label: '系统',
    component: 'ApiSelect',
    componentProps: {
      api: getAll,
      fieldNames: {
        value: 'sn',
        label: 'name'
      },
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['id']
    }
  },
  {
    fieldName: 'name',
    label: '名称',
    required: true,
    component: 'Input',
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 32,
        message: '字符长度不能大于32！',
      },
    ],*/
  },
  {
    fieldName: 'sn',
    label: '标识',
    required: true,
    component: 'Input',
  },
  {
    fieldName: 'url',
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
    fieldName: 'indexUrl',
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
    fieldName: 'image',
    label: '图标',
    required: false,
    component: 'IconPicker',
  },
  {
    fieldName: 'orderNo',
    label: '排序号',
    help: '数值越小越靠前！',
    component: 'InputNumber',
  },
  {
    fieldName: 'status',
    label: '状态',
    component: 'Switch',
    defaultValue: true,
    componentProps: {
      checkedChildren: '启用',
      unCheckedChildren: '禁用',
    },
  },
  {
    label: '备注',
    fieldName: 'note',
    component: 'Textarea',
    rules: [
      {
        max: 500,
        message: '字符长度不能大于500！',
      },
    ],
  },
];
