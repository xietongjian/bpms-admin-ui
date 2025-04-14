import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { h, markRaw } from 'vue';
import { Tag } from 'ant-design-vue';

import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/commonEnum';
import {z} from "@vben/common-ui";
import {CodeEditor} from "#/components/CodeEditor";

const colProps = {
  span: 24,
};

// name
// method
// url
// params
// urlParams
export const columns: VxeGridProps['columns'] = [
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
      allowClear: true,
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

export const requestBodyFormSchema: FormSchema[] = [
  {
    fieldName: 'bodyParams',
    label: '',
    hideLabel: true,
    // component: 'Textarea',
    component: markRaw(CodeEditor),
    componentProps: {
      type: 'json',
      class: 'w-full',
      codeStyle: {
        width: '100%', minHeight: '100px'
      },
      placeholder: '请输入有效的JSON对象数据格式：如{"a": "123"}',
    },
    formItemClass: 'items-start',
    help: '请输入有效的JSON对象数据格式：如{"a": "123"}',
    rules: z.string().refine((v) => {
      try {
        JSON.parse(v);
        return true;
      } catch (error) {
        return false;
      }
    }, '请输入正确的参数格式，如{"a": "123"}').optional(),
  }
];
export const headerFormSchema: FormSchema[] = [

];

export const apiTestingFormSchema: FormSchema[] = [
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
    fieldName: 'name',
    label: '名称',
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
    fieldName: 'sn',
    label: '标识',
    // required: true,
    component: 'Input',
  },
  {
    fieldName: 'url',
    label: '系统URL',
    // required: true,
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
    fieldName: 'indexUrl',
    label: '首页URL',
    // required: true,
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
    fieldName: 'image',
    label: '图标',
    component: 'IconPicker',
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
    fieldName: 'status',
    label: '状态',
    component: 'Switch',
    defaultValue: 1,
    componentProps: {
      checkedValue: 1,
      unCheckedValue: 0,
      checkedChildren: '启用',
      unCheckedChildren: '禁用',
    },
  },
  {
    fieldName: 'platformEnabled',
    label: '是否推送',
    help: '是否推送消息至第三方平台！',
    component: 'Switch',
    defaultValue: 0,
    componentProps: {
      checkedValue: 1,
      unCheckedValue: 0,
      checkedChildren: '推送',
      unCheckedChildren: '不推送',
    },
  },
  {
    label: '备注',
    fieldName: 'note',
    component: 'Textarea',
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
  },
];
