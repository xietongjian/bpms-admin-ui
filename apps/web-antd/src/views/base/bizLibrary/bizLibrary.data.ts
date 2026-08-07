import type { VxeGridProps } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';
import { z } from '#/adapter/form';
import { OrderNoDefaultEnum } from '#/enums/commonEnum';

export const columns: VxeGridProps['columns'] = [
  { type: 'seq', title: '序号', width: 60, align: 'center' },
  { field: 'name', title: '名称', minWidth: 160, align: 'left' },
  { field: 'bizName', title: '业务名称', width: 140, align: 'center' },
  { field: 'orderNo', title: '排序编号', width: 120, align: 'center' },
  {
    field: 'status',
    title: '状态',
    width: 100,
    align: 'center',
    slots: { default: 'status' },
  },
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

export const formSchema = [
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
    fieldName: 'name',
    label: '名称',
    rules: z.string().min(1, '请输入名称').max(50, '名称长度不超过50个字符'),
    componentProps: {
      placeholder: '请输入名称',
    },
  },
  {
    component: 'Select',
    fieldName: 'bizName',
    label: '业务名称',
    rules: z.string().min(1, '请选择业务名称'),
    componentProps: {
      placeholder: '请选择业务名称',
      options: [{ label: '拼图背景图', value: '1' }],
    },
  },
  {
    component: 'Input',
    fieldName: 'icon',
    label: '图标地址',
    componentProps: {
      placeholder: '请输入图标地址',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'orderNo',
    label: '排序编号',
    defaultValue: OrderNoDefaultEnum.VALUE,
    componentProps: {
      placeholder: '请输入排序编号',
      min: OrderNoDefaultEnum.MIN,
      max: OrderNoDefaultEnum.MAX,
      style: { width: '100%' },
    },
  },
  {
    component: 'Switch',
    fieldName: 'status',
    label: '状态',
    defaultValue: 1,
  },
];
