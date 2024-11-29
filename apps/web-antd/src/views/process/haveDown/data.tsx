import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import type {VxeGridProps} from '#/adapter/vxe-table';

import { Badge } from 'ant-design-vue';
// import {getApproveStatusIcon} from "@/utils";
export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'formName',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/编码',
    },
    labelWidth: 60,
    colProps: {span: 6, lg:{span: 6, offset:0}, sm:{span: 10, offset: 0}, xs:{span: 16, offset: 0}},
  },
  {
    fieldName: 'dateRange',
    label: '时间范围',
    component: 'RangePicker',
    labelWidth: 80,
    colProps: {span: 6, lg:{span: 6, offset:0}, sm:{span: 10, offset: 0}, xs:{span: 16, offset: 0}},
  },
  {
    fieldName: 'appSn',
    label: '系统',
    component: 'Select',
    labelWidth: 60,
    colProps: {span: 6, lg:{span: 6, offset:0}, sm:{span: 10, offset: 0}, xs:{span: 16, offset: 0}},
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
