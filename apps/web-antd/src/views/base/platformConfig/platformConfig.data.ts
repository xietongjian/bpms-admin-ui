import { RemarkDefaultEnum, FormValidPatternEnum } from '#/enums/commonEnum';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';


const colProps = {
  span: 24,
};
export const columns: VxeGridProps['columns'] = [
  {
    title: '类型',
    field: 'type',
    align: 'left',
    width: 90,
    /*customRender: ({ record }) => {
      const { type } = record;
      let typeName = '钉钉';
      let color = '';
      if (type === 'weixin') {
        color = 'green';
        typeName = '微信';
      } else if (type === 'feishu') {
        color = 'lime';
        typeName = '飞书';
      } else {
        color = 'blue';
      }
      return h(Tag, { color: color }, () => typeName);
    },*/
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
    },
    labelWidth: 60,
  },
];

export const formSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'type',
    label: '类型',
    // required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: '钉钉', value: 'dingtalk' },
        { label: '微信', value: 'weixin' },
        { label: '飞书', value: 'feishu' },
      ],
    },
    colProps: { span: 16 },
  },
  {
    fieldName: 'appKey',
    label: 'appKey',
    // required: true,
    component: 'Input',
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: 'appKey不能为空！',
      },
      {
        max: 32,
        message: 'appKey长度不能大于32！',
      },
    ],*/
    colProps,
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
    show: true,
    /*rules: [
      {
        max: 1500,
        message: '字符长度不能大于1500！',
      },
    ],*/
    colProps,
  },
  {
    fieldName: 'returnUrl',
    label: '回调地址',
    required: true,
    component: 'Input',
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '回调地址不能为空！',
      },
      {
        max: 128,
        message: '字符长度不能大于128！',
      },
    ],*/
    colProps,
  },
  {
    fieldName: 'agentId',
    label: '应用Id',
    component: 'Input',
    colProps,
  },
  {
    fieldName: 'corpId',
    label: '企业Id',
    component: 'Input',
    colProps,
  },
];

export const secretKeyFormSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'appKey',
    label: 'appKey',
    component: 'Input',
    slot: 'snSlot',
    colProps,
  },
  {
    label: '密钥',
    fieldName: 'appSecret',
    component: 'Input',
    slot: 'snSlot',
    colProps,
  },
];
