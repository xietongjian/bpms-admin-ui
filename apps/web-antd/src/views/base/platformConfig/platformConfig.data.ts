import { RemarkDefaultEnum, FormValidPatternEnum } from '#/enums/commonEnum';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import { checkEntityExist } from '#/api/base/platformConfig';

const PlatformTypeList = [
  { label: '钉钉', value: 'dingtalk' },
  { label: '微信', value: 'weixin' },
  { label: '飞书', value: 'feishu' },
];

export const columns: VxeGridProps['columns'] = [
  {
    title: '类型',
    field: 'type',
    align: 'left',
    width: 90,
    slots: {
      default: 'type'
    }
  },
  {
    title: 'appKey',
    field: 'appKey',
    align: 'left',
    slots: {default: 'appKey'},
    resizable: true,
  },
  {
    title: '秘钥',
    field: 'appSecret',
    align: 'left',
    slots: {default: 'appSecret'},
    resizable: true,
  },
  {
    title: '应用Id',
    field: 'agentId',
    slots: {default: 'agentId'},
    align: 'left',
  },
  {
    title: '企业Id',
    field: 'corpId',
    slots: {default: 'corpId'},
    align: 'left',
  },
  {
    title: '跳转路径',
    field: 'returnUrl',
    align: 'left',
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 180,
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
      placeholder: '请输入名称/标识',
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
    label: '类型',
    rules: 'selectRequired',
    component: 'Select',
    componentProps: {
      options: PlatformTypeList,
    },
  },
  {
    fieldName: 'appKey',
    label: 'appKey',
    component: 'Input',
    rules: z
        .string({
          required_error: 'appKey不能为空',
        })
        .trim()
        .min(1, "appKey不能为空")
        .max(32, "字符长度不能大于32！")
  },
  {
    fieldName: 'appSecret',
    label: '秘钥',
    component: 'Textarea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    rules: z
        .string()
        .max(1500, "字符长度不能大于1500！")
        .nullish()
        .optional(),
  },
  {
    fieldName: 'returnUrl',
    label: '回调地址',
    component: 'Input',
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(128, "字符长度不能大于128！")
  },
  {
    fieldName: 'agentId',
    label: '应用Id',
    component: 'Input',
  },
  {
    fieldName: 'corpId',
    label: '企业Id',
    component: 'Input',
  },
];

export const secretKeyFormSchema: FormSchema[] = [
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
    fieldName: 'appKey',
    label: 'appKey',
    component: 'Input',
    slot: 'snSlot',
  },
  {
    label: '密钥',
    fieldName: 'appSecret',
    component: 'Input',
    slot: 'snSlot',
  },
];
