import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { FormValidPatternEnum } from '#/enums/commonEnum';
import {z} from "@vben/common-ui";

const colProps = {
  span: 24,
};
export const columns: BasicColumn[] = [
  {
    title: '控件类型',
    dataIndex: 'controlType',
    width: 180,
    align: 'left',
  },
  {
    title: '表单类型',
    dataIndex: 'makType',
    width: 180,
    align: 'left',
  },
  {
    title: '数据库类型',
    dataIndex: 'dbType',
    width: 180,
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入关键字',
    },
    labelWidth: 60,
    colProps: {
      span: 6,
      lg: { span: 6, offset: 0 },
      sm: { span: 10, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'controlType',
    label: '控件类型',
    required: true,
    component: 'Input',
    rules: z
        .string({
          required_error: '不能为空',
        })
        .trim()
        .min(1, "不能为空")
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
    colProps,
  },
  {
    field: 'makType',
    label: '表单类型',
    required: false,
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
    field: 'dbType',
    label: '数据库类型',
    required: true,
    component: 'Input',
    rules: z
        .string({
          required_error: '不能为空！',
        })
        .trim()
        .min(1, "不能为空")
        .max(32, "字符长度不能大于32！")
        .regex(new RegExp(FormValidPatternEnum.FIELD_NAME_SN), '请输入英文或数字（以英文或下划线开头）！'),

    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
    colProps,
  },
];
