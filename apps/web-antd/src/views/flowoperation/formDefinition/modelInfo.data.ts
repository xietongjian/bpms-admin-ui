import type { VbenFormSchema as FormSchema } from '@vben/common-ui';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const modelStatusMap: Record<number, { name: string; color: string }> = {
  1: { name: '草稿', color: 'gray' },
  2: { name: '待发布', color: '#0096F5' },
  3: { name: '已发布', color: '#00D7B7' },
  4: { name: '停用', color: '#f50' },
};

export const getStatusColor = (status: number): string => {
  return modelStatusMap[status]?.color || 'default';
};

export const getStatusName = (status: number): string => {
  return modelStatusMap[status]?.name || '未知';
};

// 主表格搜索表单
export const searchFormSchema: FormSchema[] = [
  {
    component: 'Input',
    fieldName: 'keyword',
    label: '关键字',
    componentProps: { placeholder: '请输入名称/编码', allowClear: true },
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      placeholder: '请选择状态',
      allowClear: true,
      options: [
        { label: '全部', value: '' },
        { label: '草稿', value: 0 },
        { label: '发布', value: 1 },
        { label: '停用', value: 2 },
      ],
    },
  },
];

// 主表格列
export const columns: VxeGridProps['columns'] = [
  {
    field: 'name',
    title: '名称',
    minWidth: 200,
    align: 'left',
    type: 'expand',
    slots: {
      default: 'name',
      content: 'expandContent',
    },
  },
  {
    field: 'modelKey',
    title: '标识',
    minWidth: 200,
    align: 'left',
  },
  {
    field: 'categoryName',
    title: '分类',
    width: 150,
    align: 'center',
  },
  {
    field: 'systemName',
    title: '子系统',
    width: 100,
    align: 'center',
  },
  {
    field: 'statusName',
    title: '状态',
    width: 80,
    align: 'center',
    cellRender: { name: 'CellTag', props: { type: 'success' } },
  },
  {
    field: 'appliedRange',
    title: '可见范围',
    width: 100,
    align: 'center',
    cellRender: {
      name: 'CellText',
      props: {
        showText: (row: Record<string, any>) => (row.appliedRange === '0' ? '公共' : '可见'),
      },
    },
  },
  {
    field: 'createTime',
    title: '创建时间',
    width: 170,
    align: 'center',
  },
  {
    field: 'updateTime',
    title: '更新时间',
    width: 170,
    align: 'center',
  },
  {
    field: 'action',
    title: '操作',
    width: 80,
    align: 'center' as const,
    slots: { default: 'action' },
    fixed: 'right',
  },
];

// 子表格列（展开行内 - vxe-grid 格式）
export const subColumns: VxeGridProps['columns'] = [
  { field: 'name', title: '名称', minWidth: 250, align: 'left' },
  { field: 'version', title: '版本号', width: 100, align: 'center' },
  { field: 'updateTime', title: '最后更新时间', width: 170, align: 'center' },
  { field: 'updator', title: '更新人', width: 100, align: 'center' },
  {
    field: 'statusName',
    title: '状态',
    width: 80,
    align: 'center',
    slots: { default: 'statusName' },
  },
  {
    field: 'action',
    title: '操作',
    width: 120,
    align: 'center' as const,
    fixed: 'right',
    slots: { default: 'action' },
  },
];

