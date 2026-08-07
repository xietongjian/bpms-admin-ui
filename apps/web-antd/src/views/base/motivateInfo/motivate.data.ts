import type { VxeGridProps } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';
import { z } from '#/adapter/form';

export const columns: VxeGridProps['columns'] = [
  { type: 'seq', title: '序号', width: 60, align: 'center' },
  { field: 'phrase', title: '短语内容', minWidth: 300, align: 'left' },
  { field: 'author', title: '短语作者', width: 150, align: 'center' },
  { field: 'createTime', title: '创建时间', width: 170, align: 'center' },
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
    fieldName: 'phrase',
    label: '短语内容',
    componentProps: {
      placeholder: '请输入短语内容',
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
    component: 'Textarea',
    fieldName: 'phrase',
    label: '短语内容',
    rules: z.string().min(1, '请输入短语内容'),
    componentProps: {
      placeholder: '请输入短语内容',
      rows: 3,
    },
  },
  {
    component: 'RadioGroup',
    fieldName: 'type',
    label: '类型',
    rules: z.string().min(1, '请选择类型'),
    componentProps: {
      options: [
        { label: '有作者', value: '2' },
        { label: '无作者', value: '1' },
      ],
    },
  },
  {
    component: 'Input',
    fieldName: 'author',
    label: '作者',
    rules: z.string().optional(),
    componentProps: {
      placeholder: '请输入作者',
    },
  },
];
