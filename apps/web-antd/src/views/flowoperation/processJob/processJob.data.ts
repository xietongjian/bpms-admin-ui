import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import {getAll} from "#/api/base/app";

export const timerJobColumns: VxeGridProps['columns'] = [
  {
    title: '流程标题',
    field: 'processName',
    align: 'left',
    minWidth: 300,
    slots: {default: 'processName'},

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
    slots: {default: 'processInstanceId'},
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
  {
    field: 'action',
    fixed: 'right',
    slots: {default: 'action'},
    title: '操作',
    width: 120,
  },
];

export const deadLetterJobColumns: VxeGridProps['columns'] = [
  {
    type: 'checkbox',
    title: '流程标题',
    field: 'processName',
    align: 'left',
    minWidth: 300,
    slots: {default: 'processName'},
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
    slots: {default: 'tenantId'},
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
    slots: {default: 'duedate'},
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
    fieldName: 'processName',
    label: '流程标题',
    component: 'Input',
    componentProps: {
      placeholder: '请输入流程标题',
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
    fieldName: 'tenantId',
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
];

export const timerJobFormSchema: FormSchema[] = [
  {
    fieldName: 'jobId',
    label: 'ID',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['jobId']
    }
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
    // rules: [{ required: true }],
    rules: 'selectRequired',
  },
];
