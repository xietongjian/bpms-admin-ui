import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import type {VxeGridProps} from '#/adapter/vxe-table';

import { Badge } from 'ant-design-vue';
// import {getApproveStatusIcon} from "@/utils";
export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
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
    component: 'Select',
    labelWidth: 60,
  }
];
export const launchedTableSchema: VxeGridProps['columns'] = [
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
    title: '待办人',
    width: 150,
    field: 'currentAssignees',
    align: 'left',
    slots: { default: 'currentAssignees' }
  },
  {
    title: '提交时间',
    width: 150,
    field: 'startTime',
  },
  {
    title: '流程耗时',
    width: 100,
    field: 'stayHour',
    align: 'left',
  },
  {
    title: '所属系统',
    width: 150,
    field: 'appName',
    align: 'left',
  },
];
