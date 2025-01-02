import { h } from 'vue';
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';

import {FormValidPatternEnum, RemarkDefaultEnum} from '#/enums/commonEnum';
// import { CodeEditor, MODE } from '@/components/CodeEditor';

const colProps = {
  span: 24,
};
export const columns: VxeGridProps['columns'] = [
  {
    title: '接口类型',
    field: 'type',
    width: 80,
    align: 'center',
  },
  {
    title: '名称',
    minWidth: 200,
    field: 'name',
    align: 'left',
    resizable: true,
  },

  {
    title: '请求地址',
    field: 'url',
    align: 'left',
  },
  {
    title: '请求方式',
    field: 'method',
    width: 80,
    align: 'center',
  },
  {
    title: 'Token名称',
    field: 'tokenName',
    align: 'left',
  },
  {
    title: 'Token键名',
    field: 'tokenKey',
    align: 'left',
  },
  {
    title: '备注',
    field: 'remark',
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
    field: 'type',
    component: 'Select',
    label: '服务类型',
    labelWidth: 60,
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '请选择服务类型',
      options: [
        {
          label: '微服务',
          value: 'sc',
        },
        {
          label: 'RestFull',
          value: 'rest',
        },
      ]
    },
  },
  {
    field: 'name',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入Token名称！',
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
    field: 'type',
    component: 'RadioButtonGroup',
    label: '服务类型',
    colProps: {
      span: 24,
    },
    defaultValue: 'sc',
    componentProps: ({schema, formModel, formActionType}) => {
      return {
        options: [
          {
            label: '微服务',
            value: 'sc',
          },
          {
            label: 'RestFull',
            value: 'rest',
          },
          /*{
            label: 'Http',
            value: 'http',
          },*/
        ],
        onChange: (val) => {
          formActionType.updateSchema([
            { field: 'serviceId', required: val === 'sc', componentProps: { show: val==='sc'  } },

          ]);
        },
      };
    },
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
        .max(80, "字符长度不能大于80！")
   /* rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 32,
        message: '字符长度不能大于80！',
      },
    ],*/
  },
  {
    field: 'serviceId',
    label: 'ServiceId',
    required: true,
    component: 'Input',
    show: ({ values }) => {
      return values.type === 'sc';
    },
    colProps,
  },
  {
    field: 'url',
    label: '请求地址',
    required: true,
    component: 'Input',
    rules: z
        .string({
          required_error: 'URL不能为空',
        })
        .trim()
        .min(1, "URL不能为空")
        .max(255, "字符长度不能大于255！")
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: 'URL不能为空！',
      },
      {
        max: 255,
        message: '字符长度不能大于255！',
      },
    ],
    colProps,*/
  },
  {
    field: 'method',
    component: 'RadioButtonGroup',
    label: '请求方式',
    required: true,
    colProps: {
      span: 24,
    },
    defaultValue: '',
    componentProps: {
      options: [
        {
          label: 'Get',
          value: 'GET',
        },
        {
          label: 'Post',
          value: 'POST',
        },
      ],
      onChange: (e) => {
        console.log(e);
      },
    },
  },
  {
    field: 'params',
    label: '请求参数',
    component: 'InputTextArea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    /* render: ({ model, field }) => {
      return h(CodeEditor, {
        value: model[field],
        mode: MODE.JSON,
        onChange: (value: string) => {
          model[field] = value;
        },
        config: {
          tabSize: 2,
          height: 100,
        }
      });
    },*/
    dynamicRules: () => {
      return [
        {
          trigger: ['change', 'blur'],
          validator: (_, value) => {
            if (value) {
              try {
                JSON.parse(value);
                return Promise.resolve();
              } catch (error) {
                return Promise.reject("请输入JSON格式");
              }
            } else {
              return Promise.resolve();
            }
          },
        },
      ];
    },
    colProps,
  },
  {
    field: 'tokenKey',
    label: 'Token键名',
    helpMessage: '返回值中取token的字段名',
    component: 'Input',
    colProps,
  },
  {
    field: 'tokenName',
    label: 'Token名称',
    helpMessage: '设置到接口header里面的Token键名',
    required: true,
    component: 'Input',
    colProps,
  },
  {
    field: 'serverAddr',
    label: '注册地址',
    component: 'Input',
    show: ({ values }) => {
      return values.type === 'sc';
    },
    colProps,
  },
  {
    field: 'namespaceId',
    label: '命名空间',
    component: 'Input',
    show: ({ values }) => {
      return values.type === 'sc';
    },
    colProps,
  },
  {
    field: 'groupName',
    label: '组名',
    component: 'Input',
    show: ({ values }) => {
      return values.type === 'sc';
    },
    colProps,
  },
  {
    label: '备注',
    field: 'remark',
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
    ],
    colProps,*/
  },
];