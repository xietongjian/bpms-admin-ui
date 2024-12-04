// import { BasicColumn, FormSchema } from '@/components/Table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import type {VxeGridProps} from '#/adapter/vxe-table';
import {z} from "@vben/common-ui";

export const columns: VxeGridProps['columns'] = [
  {
    title: '头像',
    field: 'image',
    width: 80,
    align: 'center',
    slots: {default: 'image'},
  },
  {
    title: '用户类型',
    field: 'type',
    width: 120,
    align: 'center',
    slots: {default: 'type'},
  },
  {
    title: '用户名',
    field: 'username',
    width: 120,
    align: 'left',
  },
  {
    title: '姓名',
    field: 'realName',
    width: 120,
    align: 'left',
  },
  {
    title: '工号',
    field: 'userNo',
    width: 120,
    align: 'left',
  },
  {
    title: '手机',
    field: 'mobile',
    width: 120,
    align: 'left',
  },
  {
    title: '邮箱',
    field: 'email',
    width: 120,
    align: 'left',
  },
  {
    title: '性别',
    field: 'sex',
    width: 60,
  },
  {
    title: '所属组',
    field: 'groups',
    align: 'left',
    slots: {default: 'groups'},
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
      placeholder: '请输入账号名/姓名/手机',
    },
    labelWidth: 60,
    colProps: {
      span: 6,
      lg: {span: 6, offset: 0},
      sm: {span: 10, offset: 0},
      xs: {span: 16, offset: 0},
    },
  },
];

export const accountFormSchema: FormSchema = [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'type',
    label: '用户类型',
    component: 'RadioButtonGroup',
    required: true,
    defaultValue: 0,
    componentProps: {
      options: [
        {label: '普通用户', value: 0},
        {label: '管理员', value: 1},
      ],
    },
    colProps: {
      span: 16,
    },
  },
  {
    fieldName: 'username',
    label: '用户名',
    component: 'Input',
    required: true,
    colProps: {
      span: 16,
    },
  },
  {
    fieldName: 'realName',
    label: '用户名',
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'realNameSelector',
    label: '姓名',
    required: true,
    component: 'PersonalSelector',
    colProps: {
      span: 16,
    },
  },
  {
    fieldName: 'headImg',
    label: '',
    component: 'Input',
    slot: 'headImg',
    colProps: {
      style: 'margin: auto;position: absolute;right: 20px;',
      span: 10,
    },
  },
  {
    fieldName: 'sex',
    label: '性别',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        {label: '男', value: 1},
        {label: '女', value: 0},
      ],
    },
    colProps: {span: 10},
  },
  {
    fieldName: 'userNo',
    label: '工号',
    component: 'Input',
    required: true,
    colProps: {
      span: 16,
    },
  },
  {
    label: '手机',
    fieldName: 'mobile',
    component: 'Input',
    required: true,
    colProps: {
      span: 16,
    },
  },
  {
    label: '邮箱',
    fieldName: 'email',
    component: 'Input',
    required: false,
    colProps: {
      span: 20,
    },
  },
];

export const passwordFormSchema: FormSchema = [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'passwordNew',
    label: '密码',
    component: 'StrengthMeter',
    componentProps: {
      placeholder: '密码',
    },
    rules: z
      .string({
        required_error: '密码不能为空！'
      })
      .min(6, "长度必需在6-32之间！")
      .max(32, "长度必需在6-32之间！")
      .regex(new RegExp('[^\\u4e00-\\u9fa5]+'), "密码不能输入汉字！"),
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '请输入密码！',
      },
      {
        pattern: new RegExp('[^\\u4e00-\\u9fa5]+'),
        type: 'string',
        message: '密码不能输入汉字！',
      },
      {
        min: 6,
        max: 32,
        message: '长度必需在6-32之间！',
      },
    ],*/
    colProps: {
      span: 24,
    },
  },
  {
    fieldName: 'confirmPassword',
    label: '确认密码',
    component: 'InputPassword',
    dependencies: {
      rules(values) {
        const { passwordNew, confirmPassword } = values;
        return z
          .string({
            required_error: "确认密码不能为空"
          })
          .min(1, "长度必需在6-32之间！")
          .max(32, '长度必需在6-32之间！')
          .refine(() => {

          }, "两次输入的密码不一致!");
      }
    },
    dynamicRules: ({values}) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('确认密码不能为空');
            }
            if (value !== values.passwordNew) {
              return Promise.reject('两次输入的密码不一致!');
            }
            return Promise.resolve();
          },
        },
        {
          pattern: new RegExp('[^\\u4e00-\\u9fa5]+'),
          type: 'string',
          message: '密码不能输入汉字！',
        },
        {
          min: 6,
          max: 32,
          message: '长度必需在6-32之间！',
        },
      ];
    },
    colProps: {
      span: 24,
    },
  },
];

export const setGroupFormSchema = () => [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    label: '选择组',
    fieldName: 'groups',
    component: 'Select',
    labelWidth: 50,
    componentProps: {
      placeholder: '请选择用户组',
    },
    colProps: {
      span: 24,
    },
  },
];
