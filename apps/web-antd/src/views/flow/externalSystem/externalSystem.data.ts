import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';
import { z } from '#/adapter/form';

export const searchFormSchema: VbenFormProps['schema'] = [
  {
    component: 'Input',
    fieldName: 'keyword',
    label: '关键字',
    componentProps: { placeholder: '请输入关键字', allowClear: true },
  },
];

export const externalSystemColumns: VxeTableGridOptions['columns'] = [
  { type: 'seq', width: 60, align: 'center' },
  { field: 'name', title: '名称', align: 'left', minWidth: 150 },
  { field: 'code', title: '编码', align: 'left', minWidth: 150 },
  { field: 'url', title: '跳转地址', align: 'left', minWidth: 150 },
  { field: 'params', title: '参数', align: 'left', minWidth: 120 },
  { field: 'description', title: '描述', align: 'left', minWidth: 150 },
  { field: 'createTime', title: '创建时间', width: 180, align: 'center' },
  {
    cellRender: { name: 'VbenTableAction' },
    field: 'action',
    fixed: 'right',
    title: '操作',
    width: 140,
  },
];

export const externalSystemFormSchema = [
  { component: 'Input', fieldName: 'id', label: 'ID', componentProps: { hidden: true } },
  {
    component: 'Input',
    fieldName: 'name',
    label: '名称',
    rules: z.string().min(1, '名称不能为空').max(255, '名称长度不能大于255'),
  },
  {
    component: 'Input',
    fieldName: 'code',
    label: '编码',
    rules: z.string().min(1, '编码不能为空').max(64, '编码长度不能大于64'),
  },
  { component: 'Input', fieldName: 'url', label: '跳转地址' },
  { component: 'Input', fieldName: 'params', label: '参数' },
  {
    component: 'InputNumber',
    fieldName: 'orderNo',
    label: '排序号',
    defaultValue: 1,
    componentProps: { min: 0, max: 9999, style: { width: '100%' } },
  },
  {
    component: 'Textarea',
    fieldName: 'description',
    label: '描述',
    componentProps: { rows: 4, placeholder: '请输入描述' },
  },
];
