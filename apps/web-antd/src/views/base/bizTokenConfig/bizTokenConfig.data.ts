import { h , markRaw} from 'vue';
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';

import {FormValidPatternEnum, RemarkDefaultEnum} from '#/enums/commonEnum';
import { CodeEditor, MODE } from '#/components/CodeEditor';
import RequestUrl from './component/request-url.vue';


const ServerTypeList = [
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
];

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    minWidth: 200,
    field: 'name',
    align: 'left',
    resizable: true,
    type: 'expand',
    slots: {
      default: 'name',
      content: 'nameContent',
    },
  },
  {
    title: '接口类型',
    field: 'type',
    width: 100,
    align: 'center',
    slots: {default: 'type'},
  },

  {
    title: '请求地址',
    field: 'url',
    minWidth: 200,
    align: 'left',
  },
  {
    title: '请求方式',
    field: 'method',
    width: 80,
    align: 'center',
    slots: {default: 'method'},
  },
  {
    title: 'Token名称',
    field: 'tokenName',
    minWidth: 200,
    align: 'left',
  },
  {
    title: 'Token键名',
    field: 'tokenKey',
    minWidth: 200,
    align: 'left',
  },
  {
    title: '备注',
    field: 'remark',
    minWidth: 200,
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
    fieldName: 'type',
    component: 'Select',
    label: '服务类型',
    labelWidth: 60,
    componentProps: {
      placeholder: '请选择服务类型',
      options: ServerTypeList
    },
  },
  {
    fieldName: 'name',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入Token名称！',
      allowClear: true,
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
    fieldName: 'type',
    component: 'RadioGroup',
    label: '服务类型',
    defaultValue: 'sc',
    componentProps: {
      placeholder: '请选择服务类型',
      options: ServerTypeList,
      class: 'w-full'
    },
    rules: 'selectRequired',
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
        .max(80, "字符长度不能大于80！")
  },
  {
    fieldName: 'serviceId',
    label: 'ServiceId',
    component: 'Input',
    dependencies: {
      show: (values) => {
        return values.type === 'sc';
      },
      required(values) {
        return values.type === 'sc';
      },
      triggerFields: ['type'],
    },
  },
  {
    fieldName: 'requestArr',
    label: '请求地址',
    component: markRaw(RequestUrl),
    disabledOnChangeListener: false,
    defaultValue: ['GET', ''],
    rules: z
      .array(z.string().optional())
      .length(2, '请选择请求方式并输入请求地址')
      .refine((v) => !!v[0], {
        message: '请选择请求方式',
      })
      .refine((v) => !!v[1] && v[1] !== '', {
        message: '　　　　　　　　 输入请求URL',
      })
      .refine((v) => {
        return (new RegExp(FormValidPatternEnum.URL, 'i').test(v[1]||''));
      }, {
        // 使用全角空格占位，将错误提示文字挤到手机号码输入框的下面
        message: '　　　　　　　　 URL格式不正确',
      }),
  },
  /*{
    fieldName: 'method',
    component: 'Radio',
    label: '请求方式',
    rules: 'selectRequired',
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
  },*/
  {
    fieldName: 'params',
    label: '请求参数',
    component: 'Textarea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    /* render: ({ model, fieldName }) => {
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
  },
  {
    fieldName: 'tokenKey',
    label: 'Token键名',
    help: '返回值中取token的字段名',
    component: 'Input',
  },
  {
    fieldName: 'tokenName',
    label: 'Token名称',
    help: '设置到接口header里面的Token键名',
    component: 'Input',
    rules: 'required'
  },
  {
    fieldName: 'serverAddr',
    label: '注册地址',
    component: 'Input',
    dependencies: {
      show: (values) => {
        return values.type === 'sc';
      },
      triggerFields: ['type'],
    }
  },
  {
    fieldName: 'namespaceId',
    label: '命名空间',
    component: 'Input',
    dependencies: {
      show: (values) => {
        return values.type === 'sc';
      },
      triggerFields: ['type'],
    }
  },
  {
    fieldName: 'groupName',
    label: '组名',
    component: 'Input',
    dependencies: {
      show: (values) => {
        return values.type === 'sc';
      },
      triggerFields: ['type'],
    }
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
    rules: z
        .string()
        .max(500, "字符长度不能大于500！")
        .nullable()
        .optional()
  },
];
