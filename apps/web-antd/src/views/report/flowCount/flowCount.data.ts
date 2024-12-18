import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import type {VxeGridProps} from '#/adapter/vxe-table';
import { z } from '#/adapter/form';

import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns: VxeGridProps['columns'] = [
  {
    title: '公司名称',
    field: 'companyName',
    align: 'left',
  },
  {
    title: '部门名称',
    field: 'deptName',
    align: 'left',
  },
  {
    title: '人员',
    field: 'personalName',
    align: 'center',
  },
  {
    title: '创建时间',
    field: 'createTime',
    align: 'left',
  },
  {
    title: '流程名称',
    field: 'processName',
    align: 'left',
  },
  {
    title: '状态',
    field: 'processStatusName',
    width: 120,
    customRender: ({ record }) => {
      /*processStatus
        processStatusName*/
      const status = record.processStatus;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '办结' : '审批中';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    field: 'action',
    fixed: 'right',
    slots: {default: 'action'},
    title: '操作',
    width: 120,
  },
];

/*
* userNo
deptId
companyId
startDate
endDate
* */
export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'userNo',
    label: '提交人',
    component: 'PersonalSelector',
    componentProps: {
      placeholder: '请选择提交人',
    },
    labelWidth: 80,
    /*colProps: {
      span: 6,
      lg: { span: 6, offset: 0 },
      sm: { span: 6, offset: 0 },
      xs: { span: 16, offset: 0 },
    },*/
  },

  {
    fieldName: 'deptId',
    label: '部门名称',
    component: 'OrgSelector',
    componentProps: {
      placeholder: '请选择提交部门',
      selectType: '2',
      multiple: false,
    },
    /*colProps: {
      span: 8,
      lg: { span: 8, offset: 0 },
      sm: { span: 6, offset: 0 },
      xs: { span: 16, offset: 0 },
    },*/
  },
  {
    fieldName: 'companyId',
    label: '提交单位',
    component: 'OrgSelector',
    componentProps: {
      placeholder: '请选择提交单位',
      selectType: '1',
      multiple: false,
    },
    /*colProps: {
      span: 8,
      lg: { span: 8, offset: 0 },
      sm: { span: 6, offset: 0 },
      xs: { span: 16, offset: 0 },
    },*/
  },
  {
    fieldName: 'dateRange',
    label: '时间范围',
    component: 'RangePicker',
    /*colProps: {
      span: 8,
      lg: { span: 8, offset: 0 },
      sm: { span: 8, offset: 0 },
      xs: { span: 16, offset: 0 },
    },*/
  },
];
