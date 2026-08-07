import type { VxeGridProps } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';
import { z } from '#/adapter/form';

export const assignmentColumns: VxeGridProps['columns'] = [
  { type: 'seq', title: '序号', width: 60, align: 'center' },
  { field: 'yearName', title: '日历名称', minWidth: 180, align: 'left' },
  { field: 'year', title: '年份', width: 100, align: 'center' },
  { field: 'orgName', title: '适用组织', width: 180, align: 'left' },
  { field: 'remark', title: '备注', minWidth: 180, align: 'left' },
  { field: 'createTime', title: '创建时间', width: 170, align: 'center' },
  { field: 'updateTime', title: '更新时间', width: 170, align: 'center' },
  {
    cellRender: { name: 'VbenTableAction' },
    field: 'action',
    fixed: 'right',
    title: '操作',
    width: 'auto',
  },
];

export const searchFormSchema: VbenFormProps['schema'] = [
  {
    component: 'Input',
    fieldName: 'year',
    label: '年份',
    componentProps: {
      placeholder: '请输入年份',
      allowClear: true,
    },
  },
  {
    component: 'Input',
    fieldName: 'yearName',
    label: '日历名称',
    componentProps: {
      placeholder: '请输入日历名称',
      allowClear: true,
    },
  },
];

export const assignmentFormSchema = [
  {
    component: 'Input',
    fieldName: 'id',
    label: 'ID',
    componentProps: {
      hidden: true,
    },
  },
  {
    component: 'Input',
    fieldName: 'orgId',
    label: '组织ID',
    componentProps: {
      hidden: true,
    },
  },
  {
    component: 'Input',
    fieldName: 'orgName',
    label: '当前组织',
    componentProps: {
      disabled: true,
    },
  },
  {
    component: 'RadioGroup',
    fieldName: 'year',
    label: '年份',
    rules: z.string().min(1, '请选择年份'),
    componentProps: {
      options: [],
      disabled: false,
    },
  },
  {
    component: 'RadioGroup',
    fieldName: 'typeCode',
    label: '日历类型',
    rules: z.string().min(1, '请选择日历类型'),
    componentProps: {
      options: [],
      disabled: false,
    },
  },
  {
    component: 'Select',
    fieldName: 'yearId',
    label: '可选日历',
    rules: z.string().min(1, '请选择日历'),
    componentProps: {
      showSearch: true,
      filterOption: false,
      placeholder: '请选择可分配日历',
      options: [],
      disabled: false,
    },
  },
  {
    component: 'Input',
    fieldName: 'yearName',
    label: '日历名称',
    componentProps: {
      hidden: true,
    },
  },
  {
    component: 'Textarea',
    fieldName: 'remark',
    label: '备注',
    componentProps: {
      rows: 4,
      placeholder: '请输入备注',
    },
  },
];
