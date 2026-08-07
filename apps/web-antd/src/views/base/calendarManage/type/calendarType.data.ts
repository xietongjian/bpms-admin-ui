import type { VxeGridProps } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';
import { z } from '#/adapter/form';

export const calendarTypeColumns: VxeGridProps['columns'] = [
  { type: 'seq', title: '序号', width: 60, align: 'center' },
  { field: 'code', title: '编码', width: 160, align: 'left' },
  { field: 'name', title: '名称', minWidth: 160, align: 'left' },
  { field: 'sortNo', title: '排序', width: 100, align: 'center' },
  { field: 'remark', title: '备注', minWidth: 200, align: 'left' },
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
    fieldName: 'name',
    label: '名称',
    componentProps: {
      placeholder: '请输入名称',
      allowClear: true,
    },
  },
];

export const calendarTypeFormSchema = [
  {
    component: 'Input',
    fieldName: 'id',
    label: 'id',
    componentProps: {
      hidden: true,
    },
  },
  {
    component: 'Input',
    fieldName: 'code',
    label: '编码',
    rules: z.string().min(1, '请输入编码').max(50, '编码长度不超过50个字符'),
    componentProps: {
      placeholder: '请输入编码',
    },
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '名称',
    rules: z.string().min(1, '请输入名称').max(50, '名称长度不超过50个字符'),
    componentProps: {
      placeholder: '请输入名称',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'sortNo',
    label: '排序',
    defaultValue: 100,
    componentProps: {
      placeholder: '请输入排序号',
      min: 0,
      max: 999999999,
      style: { width: '100%' },
    },
  },
  {
    component: 'Textarea',
    fieldName: 'remark',
    label: '备注',
    componentProps: {
      placeholder: '请输入备注',
      rows: 3,
    },
  },
];

export const remarkFormSchema = [
  {
    component: 'Input',
    fieldName: 'id',
    label: 'id',
    componentProps: {
      hidden: true,
    },
  },
  {
    component: 'Textarea',
    fieldName: 'remark',
    label: '备注',
    rules: z.string().min(1, '请输入备注'),
    componentProps: {
      placeholder: '请输入备注',
      rows: 3,
    },
  },
];
