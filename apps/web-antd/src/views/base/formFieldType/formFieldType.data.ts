import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { FormValidPatternEnum } from '#/enums/commonEnum';
import {z} from "@vben/common-ui";

export const columns: VxeGridProps['columns'] = [
  {
    title: '控件类型',
    field: 'controlType',
    minWidth: 180,
    align: 'left',
  },
  {
    title: '表单类型',
    field: 'makType',
    width: 180,
    align: 'left',
  },
  {
    title: '数据库类型',
    field: 'dbType',
    width: 180,
    align: 'left',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: {default: 'action'},
    title: '操作',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入关键字',
    },
    labelWidth: 60,
  },
];

export const formSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ["id"]
    }
  },
  {
    fieldName: 'controlType',
    label: '控件类型',
    component: 'Input',
    rules: z
        .string({
          required_error: '控件类型不能为空',
        })
        .trim()
        .min(1, "控件类型不能为空")
        .max(30, "字符长度不能大于30！")
        .regex(new RegExp(FormValidPatternEnum.FIELD_NAME_SN), '请输入英文或数字（以英文或下划线开头）！'),
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '不能为空！',
      },
      {
        pattern:
        type: 'string',
        message: ,
      },
      {
        max: 30,
        message: '字符长度不能大于30！',
      },
    ],*/
  },
  {
    fieldName: 'makType',
    label: '表单类型',
    component: 'Input',
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(60, "字符长度不能大于60！")
    /*rules: [
      {
        pattern: new RegExp(FormValidPatternEnum.FIELD_NAME_SN),
        type: 'string',
        message: '请输入英文或数字（以英文或下划线开头）！',
      },
      {
        max: 64,
        message: '字符长度不能大于64！',
      },
    ],
    colProps,*/
  },
  {
    fieldName: 'dbType',
    label: '数据库类型',
    component: 'Input',
    dependencies: {
      triggerFields: ["dbType"],
      disabled: (values)=>!!values.id
    },
    rules: z
        .string({
          required_error: '数据库类型不能为空！',
        })
        .trim()
        .min(1, "数据库类型不能为空")
        .max(32, "字符长度不能大于32！")
        .regex(new RegExp(FormValidPatternEnum.FIELD_NAME_SN), '请输入英文或数字（以英文或下划线开头）！'),
  },
];
