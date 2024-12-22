import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import type {VxeGridProps} from '#/adapter/vxe-table';

import { Badge } from 'ant-design-vue';
import {getApps} from "#/api/process/process";
// import {getApproveStatusIcon} from "@/utils";
export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'formName',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/编码',
      allowClear: true,
    },
    labelWidth: 60,
  },
  {
    fieldName: 'dateRange',
    label: '时间范围',
    component: 'RangePicker',
    labelWidth: 80,
  },
  {
    fieldName: 'appSn',
    label: '系统',
    component: 'ApiSelect',
    labelWidth: 60,
    componentProps: {
      api: getApps,
      labelField: 'name',
      valueField: 'sn',
      placeholder: '请选择系统',
      allowClear: true,
    },
  }
];
export const haveDownTableSchema: VxeGridProps['columns']= [
  {
    title: '状态',
    width: 80,
    align: 'left',
    field: 'processStatusName',
    customRender: ({ record }) => {
      let status = getApproveStatusIcon(record.processStatus)
      return <Badge status={status} text={record.processStatusName} />;
    },
  },
  {
    title: '流程标题',
    field: 'formName',
    align: 'left',
    slots: { default: 'formName' }
  },
  {
    title: '提交人',
    width: 85,
    field: 'startPersonName',
    align: 'left',
  },
  {
    title: '审批时间',
    width: 150,
    field: 'endTime',
  },
  {
    title: '审批耗时',
    width: 150,
    field: 'taskDurationStr',
  },
  {
    title: '流程耗时',
    width: 150,
    field: 'processInstanceDurationStr',
    align: 'left',
  },
  {
    title: '所属系统',
    width: 150,
    field: 'appName',
    align: 'left',
  },
];
