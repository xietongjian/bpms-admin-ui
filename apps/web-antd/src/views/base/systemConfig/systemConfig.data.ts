import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { checkEntityExist } from '#/api/base/systemConfig';

import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/commonEnum';


export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'configName',
    align: 'left',
  },
  {
    title: '标识',
    field: 'configSn',
    width: 100,
    align: 'left',
  },
  {
    title: '配置Key',
    field: 'configKey',
    width: 100,
    align: 'left',
  },
  {
    title: '配置Value',
    field: 'configValue',
    align: 'left',
  },
  {
    title: '图片',
    field: 'image',
    align: 'center',
  },
  {
    title: '备注',
    field: 'remark',
    align: 'left',
  },
  {
    title: '排序',
    field: 'configOrder',
    width: 80,
    align: 'right',
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 180,
  },
  {
    title: '操作',
    field: 'action',
    align: 'center',
    width: 120,
    slots: {
      default: 'action',
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/编码',
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
      triggerFields: ['id']
    }
  },
  {
    fieldName: 'configName',
    label: '名称',
    required: true,
    component: 'Input',
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(30, "字符长度不能大于30！")
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 30,
        message: '字符长度不能大于30！',
      },
    ],*/
  },
  {
    fieldName: 'configSn',
    label: '标识',
    required: true,
    component: 'Input',
  },
  {
    fieldName: 'configKey',
    label: '配置Key',
    required: true,
    component: 'Input',
  },
  {
    fieldName: 'configValue',
    label: '配置Value',
    component: 'Input',
    rules: z
        .string()
        .max(100, "字符长度不能大于100！")
        .nullable()
        .optional()
    /*rules: [
      {
        max: 100,
        message: '字符长度不能大于100！',
      },
    ],*/
  },
  {
    fieldName: 'configOrder',
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
    label: '描述',
    component: 'Textarea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    rules: z
        .string()
        .max(1024, "字符长度不能大于1024！")
        .nullable()
        .optional()
    /*rules: [
      {
        max: 1024,
        message: '字符长度不能大于1024！',
      },
    ],*/
  },
];
