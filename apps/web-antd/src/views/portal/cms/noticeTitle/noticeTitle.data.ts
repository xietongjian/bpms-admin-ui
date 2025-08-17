import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/commonEnum';

export const columns: VxeGridProps['columns'] = [
  {
    title: '标题',
    field: 'title',
    align: 'left',
    slots: { default: 'title' },
    minWidth: 300,
  },
  {
    title: '发文代号',
    field: 'shortTitle',
    align: 'left',
  },
  {
    title: '启用状态',
    field: 'status',
    width: 100,
    align: 'center',
    slots: { default: 'status' },
  },
  {
    title: '排序号',
    field: 'orderNo',
    width: 100,
    align: 'left',
  },
  {
    title: '操作',
    width: 120,
    align: 'center',
    slots: { default: 'action' },
    fixed: 'right',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入标题',
    },
    labelWidth: 60,
  },
];

export const formSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: '主键',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['id']
    }
  },
  {
    fieldName: 'title',
    label: '标题',
    component: 'Input',
    rules: z
        .string({
          required_error: '标题不能为空！'
        })
        .trim()
        .min(1, '标题不能为空！')
        .max(64, '字符长度不能大于64！'),
  },
  {
    fieldName: 'shortTitle',
    label: '发文代号',
    component: 'Input',
    componentProps: {
      placeholder: `用于生成字号，如：XXXXXX【${new Date().getFullYear()}】008号`,
    },
    help: () => `用于生成字号，如：XXXXXX【${new Date().getFullYear()}】008号`,
    rules: z
        .string({
          required_error: '发文代号不能为空！'
        })
        .trim()
        .min(1, '发文代号不能为空！')
        .max(32, '字符长度不能大于32！'),
  },
  {
    fieldName: 'status',
    label: '启用状态',
    component: 'Switch',
    defaultValue: true,
    componentProps: {
      checkedChildren: '启用',
      unCheckedChildren: '禁用',
    },
  },
  {
    fieldName: 'orderNo',
    label: '排序号',
    help: '数值越小越靠前！',
    component: 'InputNumber',
    defaultValue: OrderNoDefaultEnum.VALUE,
    componentProps: {
      min: OrderNoDefaultEnum.MIN,
      max: OrderNoDefaultEnum.MAX,
    },
  },
  {
    fieldName: 'remark',
    label: '备注',
    component: 'Textarea',
    rules: z
        .string()
        .max(512, "字符长度不能大于512！")
        .nullish()
        .optional(),
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
  },
];
