import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/constantEnum';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { z } from '#/adapter/form';

export const columns: VxeGridProps['columns']  = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
    width: 300,
    resizable: true,
  },
  {
    title: '编码',
    field: 'sn',
    align: 'left',
    width: 200,
    resizable: true,
  },
  {
    title: '类型',
    field: 'type',
    width: 120,
  },
  {
    title: '排序号',
    field: 'orderNo',
    width: 80,
    align: 'right',
  },
  {
    title: '修改时间',
    field: 'updateTime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/标识',
    },
    labelWidth: 60,
    colProps: {
      span: 6,
      lg: { span: 8, offset: 0 },
      sm: { span: 14, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
];

export const roleFormSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    required: false,
    component: 'Input',
    show: false,
    dependencies: {
      show: false,
      triggerFields: ['']
    }
  },
  {
    fieldName: 'type',
    label: '类型',
    component: 'RadioButtonGroup',
    required: true,
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '公司矩阵角色', value: 1 },
        { label: '部门矩阵角色', value: 2 },
      ],
    },
    colProps: {
      span: 24,
    },
  },
  {
    fieldName: 'name',
    label: '名称',
    component: 'Input',
    rules: z
        .string({required_error: '编码不能为空！'})
        .min(1, {message: '编码不能为空！'})
        .max(64, {message: '字符长度不能大于64！'}),
    colProps: {
      span: 24,
    },
  },
  {
    fieldName: 'sn',
    label: '编码',
    component: 'Input',
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    fieldName: 'companyId',
    label: '所属公司',
    component: 'Input',
    required: false,
    show: false,
  },
  {
    fieldName: 'orderNo',
    label: '排序号',
    helpMessage: '数值越小越靠前！',
    required: false,
    component: 'InputNumber',
    defaultValue: OrderNoDefaultEnum.VALUE,
    componentProps: {
      min: OrderNoDefaultEnum.MIN,
      max: OrderNoDefaultEnum.MAX,
    },
  },
  {
    label: '备注',
    fieldName: 'note',
    component: 'InputTextArea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    rules: z
        .string()
        .max(1024, "字符长度不能大于1024！")
        .nullish()
        .optional(),
    /*rules: [
      {
        max: 1024,
        message: '字符长度不能大于1024！',
      },
    ],*/
    colProps: {
      span: 24,
    },
  },
];
