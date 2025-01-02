import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';

export const timerJobColumns: VxeGridProps['columns'] = [
  {
    title: '流程标题',
    field: 'processName',
    align: 'left',
    width: 300,
    resizable: true,
  },
  {
    title: '节点名称',
    field: 'elementName',
    align: 'left',
    width: 200,
    resizable: true,
  },
  {
    title: '所属系统',
    field: 'tenantId',
    align: 'left',
    width: 150,
    resizable: true,
  },
  {
    title: '执行时间',
    field: 'duedate',
    align: 'left',
    width: 180,
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
    title: '流程定义ID',
    field: 'processDefinitionId',
    align: 'left',
    width: 200,
    resizable: true,
  },
  {
    title: '类型',
    field: 'jobType',
    align: 'left',
    width: 100,
    resizable: true,
  },
  {
    title: '提交时间',
    field: 'createTime',
    width: 180,
    align: 'left',
    sorter: true,
  },
];

export const deadLetterJobColumns: VxeGridProps['columns'] = [
  {
    title: '流程标题',
    field: 'processName',
    align: 'left',
    width: 300,
    resizable: true,
  },
  {
    title: '节点名称',
    field: 'elementName',
    align: 'left',
    width: 200,
    resizable: true,
  },
  {
    title: '所属系统',
    field: 'tenantId',
    align: 'left',
    width: 150,
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
    title: '流程定义ID',
    field: 'processDefinitionId',
    align: 'left',
    width: 200,
    resizable: true,
  },
  {
    title: '执行时间',
    field: 'duedate',
    align: 'left',
    width: 180,
    resizable: true,
  },
  {
    title: '类型',
    field: 'jobType',
    align: 'left',
    width: 100,
    resizable: true,
  },
  {
    title: '异常信息',
    field: 'exceptionMessage',
    align: 'left',
    width: 200,
    resizable: true,
  },
  {
    title: '提交时间',
    field: 'createTime',
    width: 180,
    align: 'left',
    sorter: true,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'processName',
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
    fieldName: 'processInstanceId',
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
    fieldName: 'tenantId',
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
    fieldName: 'jobId',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'processName',
    label: '流程名称',
    component: 'Input',
    slot: 'processNameRender',
  },
  {
    fieldName: 'elementName',
    label: '节点名称',
    component: 'Input',
    slot: 'elementNameRender',
  },
  {
    fieldName: 'duedate',
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
