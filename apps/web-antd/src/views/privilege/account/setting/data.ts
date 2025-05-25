import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { z } from '#/adapter/form';

export interface ListItem {
  key: string;
  title: string;
  description: string;
  extra?: string;
  avatar?: string;
  color?: string;
}

// tab的list
export const settingList = [
  {
    key: '1',
    name: '基本设置',
    component: 'BaseSetting',
  },
  {
    key: '2',
    name: '安全设置',
    component: 'SecureSetting',
  },
/*  {
    key: '3',
    name: '账号绑定',
    component: 'AccountBind',
  },
  {
    key: '4',
    name: '新消息通知',
    component: 'MsgNotify',
  },*/
];

// 基础设置 form
export const baseSetSchemas: FormSchema[] = [
  {
    fieldName: 'realName',
    component: 'Input',
    label: '姓名',
    formItemClass: 'col-span-2',
  },
/*  {
    fieldName: 'introduction',
    component: 'Textarea',
    label: '个人简介',
    colProps: { span: 18 },
  },*/
  {
    fieldName: 'tel',
    component: 'Input',
    label: '联系电话',
    formItemClass: 'col-span-2',
  },
  {
    fieldName: 'email',
    component: 'Input',
    label: '邮箱',
    formItemClass: 'col-span-2',
  },
  {
    fieldName: 'address',
    component: 'Input',
    label: '所在地区',
    formItemClass: 'col-span-2',
  },
  {
    fieldName: 'address',
    component: 'Divider',
    label: '组件测试',
    componentProps: {
      style: 'height: 2px; background-color: #7cb305'
    },
    formItemClass: 'col-span-3',
  },
  {
    fieldName: 'testCompanySelector',
    component: 'OrgSelector',
    label: '公司选择-下拉-单选',
    componentProps: {
      placeholder: '请选择组织',
      multiple: false,
      type: 'company',
      selectOnModal: false,
    },
    formItemClass: '',
  },
  /*{
    fieldName: 'testCompanySelector1',
    component: 'OrgSelector',
    label: '公司选择-下拉-多选',
    componentProps: {
      placeholder: '请选择组织',
      multiple: true,
      type: 'company',
      modelValue: [{
        id: '1', value: '1', type: 'company',
      },{
        id: '2', value: '2', type: 'company',
      }]
    },
    formItemClass: '',
  },
  {
    fieldName: 'testCompanySelectorModal',
    component: 'OrgSelector',
    label: '公司选择-弹窗',
    componentProps: {
      placeholder: '请选择组织',
      multiple: true,
      type: 'company',
      modelValue: [{
        id: '1', value: '1', type: 'company',
      },{
        id: '2', value: '2', type: 'company',
      }]
    },
    formItemClass: '',
  },
  {
    fieldName: 'testOrgSelectorModal',
    component: 'OrgSelector',
    label: '组织选择-弹窗',
    componentProps: {
      placeholder: '请选择组织',
      multiple: true,
      type: 'org',
      closeOnSelect: false,
      selectOnModal: true,
      modelValue: [{
        id: '001', value: '1', type: 'company',
      },{
        id: '002', value: '2', type: 'company',
      }]
    }
  },
  {
    fieldName: 'personalSelector',
    component: 'PersonalSelector',
    label: '测试人员选择',
    componentProps: {
      placeholder: '请选择人员',
      multiple: true,
      type: 'personal',
      closeOnSelect: false,
      selectOnModal: true,
    },
    rules: 'selectRequired'
  },
  {
    fieldName: 'iconSelector',
    component: 'IconPicker',
    label: '人员选择',
    // value: 'ant-design:link-outlined'
  },*/
];

// 安全设置 list
export const secureSettingList: ListItem[] = [
  {
    key: '1',
    title: '账户密码',
    description: '当前密码强度：：强',
    extra: '修改',
  },
  /*{
    key: '2',
    title: '密保手机',
    description: '已绑定手机：：138****8293',
    extra: '修改',
  },
  {
    key: '3',
    title: '密保问题',
    description: '未设置密保问题，密保问题可有效保护账户安全',
    extra: '修改',
  },
  {
    key: '4',
    title: '备用邮箱',
    description: '已绑定邮箱：：ant***sign.com',
    extra: '修改',
  },
  {
    key: '5',
    title: 'MFA 设备',
    description: '未绑定 MFA 设备，绑定后，可以进行二次确认',
    extra: '修改',
  },*/
];

// 账号绑定 list
export const accountBindList: ListItem[] = [
  {
    key: '1',
    title: '绑定淘宝',
    description: '当前未绑定淘宝账号',
    extra: '绑定',
    avatar: 'ri:taobao-fill',
    color: '#ff4000',
  },
  {
    key: '2',
    title: '绑定支付宝',
    description: '当前未绑定支付宝账号',
    extra: '绑定',
    avatar: 'fa-brands:alipay',
    color: '#2eabff',
  },
  {
    key: '3',
    title: '绑定钉钉',
    description: '当前未绑定钉钉账号',
    extra: '绑定',
    avatar: 'ri:dingding-fill',
    color: '#2eabff',
  },
];

// 新消息通知 list
export const msgNotifyList: ListItem[] = [
  {
    key: '1',
    title: '账户密码',
    description: '其他用户的消息将以站内信的形式通知',
  },
  {
    key: '2',
    title: '系统消息',
    description: '系统消息将以站内信的形式通知',
  },
  {
    key: '3',
    title: '待办任务',
    description: '待办任务将以站内信的形式通知',
  },
];

export const passwordFormSchema: FormSchema[] = [
  {
    fieldName: 'oldPassword',
    label: '当前密码',
    component: 'StrengthMeter',
    componentProps: {
      placeholder: '当前密码',
    },
    rules: z
        .string({
          required_error: '密码不能为空！'
        })
        .min(6, "长度必需在6-32之间！")
        .max(32, "长度必需在6-32之间！")
        .regex(new RegExp('[^\\u4e00-\\u9fa5]+'), "密码不能输入汉字！"),
  },
  {
    fieldName: 'passwordNew',
    label: '新密码',
    component: 'StrengthMeter',
    componentProps: {
      placeholder: '新密码',
    },
    rules: z
        .string({
          required_error: '密码不能为空！'
        })
        .min(6, "长度必需在6-32之间！")
        .max(32, "长度必需在6-32之间！")
        .regex(new RegExp('[^\\u4e00-\\u9fa5]+'), "密码不能输入汉字！"),
  },
  {
    fieldName: 'confirmPassword',
    label: '确认密码',
    component: 'InputPassword',
    dependencies: {
      rules(values) {
        const { passwordNew } = values;
        return z
            .string({
              required_error: "确认密码不能为空"
            })
            .min(1, "长度必需在6-32之间！")
            .max(32, '长度必需在6-32之间！')
            .refine((value) => value === passwordNew, {
              message: '两次输入的密码不一致！',
            });
      },
      triggerFields: ['confirmPassword', 'passwordNew'],
    },
  },
];
