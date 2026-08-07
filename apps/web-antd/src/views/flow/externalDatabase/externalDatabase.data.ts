import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';
import { z } from '#/adapter/form';

export const DATABASE_TYPES = [
  { label: 'MySQL', value: 'mysql' },
  { label: 'Oracle', value: 'oracle' },
  { label: 'SQLServer', value: 'sqlserver' },
  { label: 'PostgreSQL', value: 'postgresql' },
];
export const DATABASE_TYPES_MAP = new Map(DATABASE_TYPES.map((item) => [item.value, item.label]));

export const databaseSearchFormSchema: VbenFormProps['schema'] = [
  {
    component: 'Input',
    fieldName: 'keyword',
    label: '关键字',
    componentProps: { placeholder: '请输入关键字', allowClear: true },
  },
];

export const externalDatabaseColumns: VxeTableGridOptions['columns'] = [
  { type: 'seq', width: 60, align: 'center' },
  { field: 'name', title: '名称', align: 'left', minWidth: 150 },
  {
    field: 'type',
    title: '类型',
    align: 'left',
    width: 120,
    formatter: ({ cellValue }: any) => DATABASE_TYPES_MAP.get(cellValue) || cellValue,
  },
  { field: 'url', title: '地址', align: 'left', minWidth: 200 },
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

export const externalDatabaseFormSchema = [
  { component: 'Input', fieldName: 'id', label: 'ID', componentProps: { hidden: true } },
  {
    component: 'Input',
    fieldName: 'name',
    label: '名称',
    rules: z.string().min(1, '名称不能为空').max(255, '名称长度不能大于255'),
  },
  {
    component: 'Select',
    fieldName: 'type',
    label: '类型',
    rules: z.string().min(1, '请选择类型'),
    componentProps: { options: DATABASE_TYPES, placeholder: '请选择类型' },
  },
  {
    component: 'Textarea',
    fieldName: 'url',
    label: '地址',
    rules: z.string().min(1, '地址不能为空'),
    componentProps: { rows: 3, placeholder: '请输入地址' },
  },
  { component: 'Input', fieldName: 'username', label: '用户名', rules: z.string().min(1, '用户名不能为空') },
  {
    component: 'InputPassword',
    fieldName: 'password',
    label: '密码',
    rules: z.string().min(1, '请输入密码').min(6, '长度至少6位').max(32, '长度不能超过32位'),
  },
  {
    component: 'Textarea',
    fieldName: 'description',
    label: '描述',
    componentProps: { rows: 4, placeholder: '请输入描述' },
  },
];
