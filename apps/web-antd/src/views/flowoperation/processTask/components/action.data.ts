import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';

const colProps = {
  span: 22,
};
export const backToStepTableColumns: VxeGridProps['columns'] = [
  {
    title: '节点名称',
    field: 'nodeName',
    align: 'left',
  },
  {
    title: '审批人姓名',
    field: 'userName',
    width: 120,
    align: 'left',
  },
  {
    title: '审批人工号',
    field: 'userCode',
    width: 120,
    align: 'left',
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
    fieldName: 'actionType',
    label: 'actionType',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'taskId',
    label: 'taskId',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'procInstId',
    label: 'procInstId',
    required: false,
    component: 'Input',
    show: false,
  },

  {
    fieldName: 'actionPersonal',
    label: '选择操作人员',
    component: 'PersonalSelector',
    componentProps: {
      multiple: true,
    },
    required: true,
  },

  {
    fieldName: 'signType',
    component: 'Checkbox',
    label: ' ',
    colProps,
    ifShow: ({values})=>values.actionType === 'addsign',
    renderComponentContent: '加签审批完成之后是否流转到我审批',
  },
  {
    fieldName: 'message',
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
    fieldName: 'id',
    label: 'id',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'taskId',
    label: 'taskId',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'message',
    label: '审批意见',
    component: 'Textarea',
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
    fieldName: 'actionType',
    label: 'actionType',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'taskId',
    label: 'taskId',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'procInstId',
    label: 'procInstId',
    required: false,
    component: 'Input',
    show: false,
  },

  {
    fieldName: 'message',
    label: '驳回意见',
    component: 'Textarea',
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
    fieldName: 'backToStepNodeList',
    label: '选择驳回节点',
    component: 'Input',
    defaultValue: '0',
    slot: 'backToStepNodeRender',
    ifShow: true,
  },
];
