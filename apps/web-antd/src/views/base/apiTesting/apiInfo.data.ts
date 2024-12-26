import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/commonEnum';
import {z} from "@vben/common-ui";

const colProps = {
  span: 24,
};

// name
// method
// url
// params
// urlParams
export const columns: BasicColumn[] = [
  {
    title: '名称',
    width: 200,
    field: 'name',
    align: 'left',
    resizable: true,
  },
  {
    title: 'URL',
    field: 'url',
    align: 'left',
  },
  {
    title: '请求方式',
    field: 'method',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? 'GET' : 'POST';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '接口描述',
    field: 'note',
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/标识',
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


export const pathVariableFormSchema: FormSchema[] = [

];

export const queryVariableFormSchema: FormSchema[] = [

];
export const headerFormSchema: FormSchema[] = [

];

export const apiTestingFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: '名称',
    required: true,
    component: 'Input',
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(32, "字符长度不能大于32！")
  },
  {
    field: 'sn',
    label: '标识',
    required: true,
    component: 'Input',
    colProps,
  },
  {
    field: 'url',
    label: '系统URL',
    required: true,
    component: 'Input',
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(40, "字符长度不能大于40！")
        .regex(new RegExp('[a-zA-z]+://[^\\s]*'), '请输入正确的URL地址！')
    /*
    rules: [
      {
        required: true,
        whitespace: true,
        message: '系统URL不能为空！',
      },
      {
        pattern: ,
        type: 'string',
        message: ,
      },
      {
        max: 40,
        message: '字符长度不能大于40！',
      },
    ],*/
    // colProps,
  },
  {
    field: 'indexUrl',
    label: '首页URL',
    required: true,
    component: 'Input',
    rules: z
        .string({
          required_error: '',
        })
        .trim()
        .min(1, "首页URL不能为空！")
        .max(128, "字符长度不能大于128！")
        .regex(new RegExp('^\\/(\\w+\\/?)+(\\.?\\w+)?$'),'请输入正确的URL地址！')
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '！',
      },
      {
        pattern:
        type: 'string',
        message: ,
      },
      {
        max: 128,
        message: '字符长度不能大于128！',
      },
    ],
    colProps,*/
  },
  {
    field: 'image',
    label: '图标',
    required: false,
    component: 'IconPicker',
    colProps,
  },
  {
    field: 'orderNo',
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
    field: 'status',
    label: '状态',
    required: false,
    component: 'Switch',
    defaultValue: 1,
    componentProps: {
      checkedValue: 1,
      unCheckedValue: 0,
      checkedChildren: '启用',
      unCheckedChildren: '禁用',
    },
    colProps,
  },
  {
    field: 'platformEnabled',
    label: '是否推送',
    helpMessage: '是否推送消息至第三方平台！',
    required: false,
    component: 'Switch',
    defaultValue: 0,
    componentProps: {
      checkedValue: 1,
      unCheckedValue: 0,
      checkedChildren: '推送',
      unCheckedChildren: '不推送',
    },
    colProps: { span: 24 },
  },
  {
    label: '备注',
    field: 'note',
    component: 'InputTextArea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    rules: z
        .string()
        .max(500, "字符长度不能大于500！")
        .nullable()
        .optional()
    /*rules: [
      {
        max: 500,
        message: '字符长度不能大于500！',
      },
    ],*/
    // colProps,
  },
];
