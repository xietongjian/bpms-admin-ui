import { BasicColumn, FormSchema } from '@/components/Table';
import { RemarkDefaultEnum } from '@/enums/constantEnum';
import { Tag } from 'ant-design-vue';
import { h } from 'vue';

const colProps = {
  span: 24,
};
export const columns: BasicColumn[] = [
  {
    title: '类型',
    dataIndex: 'type',
    align: 'left',
    width: 90,
    customRender: ({ record }) => {
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
    },
  },
  {
    title: 'appKey',
    dataIndex: 'appKey',
    width: 150,
    align: 'left',
    resizable: true,
  },
  {
    title: '秘钥',
    dataIndex: 'appSecret',
    align: 'left',
    width: 180,
    resizable: true,
  },
  {
    title: '应用Id',
    dataIndex: 'agentId',
    width: 120,
    align: 'left',
  },
  {
    title: '企业Id',
    dataIndex: 'corpId',
    width: 120,
    align: 'left',
  },
  {
    title: '跳转路径',
    dataIndex: 'returnUrl',
    width: 150,
    align: 'left',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
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

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'type',
    label: '类型',
    required: true,
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
    field: 'appKey',
    label: 'appKey',
    required: true,
    component: 'Input',
    rules: [
      {
        required: true,
        whitespace: true,
        message: 'appKey不能为空！',
      },
      {
        max: 32,
        message: 'appKey长度不能大于32！',
      },
    ],
    colProps,
  },
  {
    field: 'appSecret',
    label: '秘钥',
    required: false,
    component: 'InputTextArea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    show: true,
    rules: [
      {
        max: 1500,
        message: '字符长度不能大于1500！',
      },
    ],
    colProps,
  },
  {
    field: 'returnUrl',
    label: '回调地址',
    required: true,
    component: 'Input',
    rules: [
      {
        required: true,
        whitespace: true,
        message: '回调地址不能为空！',
      },
      {
        max: 128,
        message: '字符长度不能大于128！',
      },
    ],
    colProps,
  },
  {
    field: 'agentId',
    label: '应用Id',
    required: false,
    component: 'Input',
    colProps,
  },
  {
    field: 'corpId',
    label: '企业Id',
    required: false,
    component: 'Input',
    colProps,
  },
];

export const secretKeyFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'appKey',
    label: 'appKey',
    component: 'Input',
    slot: 'snSlot',
    colProps,
  },
  {
    label: '密钥',
    field: 'appSecret',
    component: 'Input',
    slot: 'snSlot',
    colProps,
  },
];
