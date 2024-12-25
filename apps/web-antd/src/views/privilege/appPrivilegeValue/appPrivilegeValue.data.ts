import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/commonEnum';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import type {VxeGridProps} from '#/adapter/vxe-table';
import {z} from "@vben/common-ui";

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
  },
  {
    title: '位',
    field: 'position',
    width: 100,
  },
  {
    title: '排序号',
    field: 'orderNo',
    width: 100,
    align: 'right',
  },
  {
    title: '备注',
    field: 'remark',
    width: 400,
    align: 'left',
  },
  {
    title: '操作',
    field: 'action',
    width: 100,
    align: 'left',
    fixed: 'right',
    slots: {
      default: 'action',
    }
  },
];

export const formSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: [''],
    },
  },
  {
    fieldName: 'name',
    label: '名称',
    component: 'Input',
    rules: z
      .string({
        required_error: '名称不能为空！'
      })
      .min(1, '名称不能为空')
      .max(32, "字符长度不能大于32！"),
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 32,
        message: '字符长度不能大于32！',
      },
    ],*/
  },
  {
    fieldName: 'position',
    label: '位',
    rules: 'required',
    component: 'InputNumber',
  },
  {
    fieldName: 'orderNo',
    label: '排序',
    help: '数值越小越靠前！',
    component: 'InputNumber',
    defaultValue: OrderNoDefaultEnum.VALUE,
    componentProps: {
      min: OrderNoDefaultEnum.MIN,
      max: OrderNoDefaultEnum.MAX,
    },
  },
  {
    label: '备注',
    fieldName: 'remark',
    component: 'Textarea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    /*rules: [
      {
        max: 200,
        message: '字符长度不能大于200！',
      },
    ],*/
  },
];
