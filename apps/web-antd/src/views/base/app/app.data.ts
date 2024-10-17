import type {
  VbenFormSchema as FormSchema,
} from '@vben/common-ui';

// import { h } from 'vue';
// import { Tag } from 'ant-design-vue';
// import Icon from '@/components/Icon/Icon.vue';
// import { OrderNoDefaultEnum, RemarkDefaultEnum } from '@/enums/constantEnum';

const colProps = {
  span: 24,
};
/*
export const columns: BasicColumn[] = [
  {
    title: '图标',
    dataIndex: 'image',
    width: 60,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.image });
    },
  },
  {
    title: '名称',
    width: 200,
    dataIndex: 'name',
    align: 'left',
    resizable: true,
  },
  {
    title: '标识',
    dataIndex: 'sn',
    width: 150,
    align: 'left',
  },
  {
    title: 'URL',
    dataIndex: 'url',
    align: 'left',
  },
  {
    title: '首页',
    dataIndex: 'indexUrl',
    width: 100,
    align: 'left',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '推送状态',
    dataIndex: 'platformEnabled',
    width: 100,
    customRender: ({ record }) => {
      const platformEnabled = record.platformEnabled;
      const enable = ~~platformEnabled === 0;
      const color = enable ? 'green' : 'blue';
      const text = enable ? '不推送' : '推送';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '排序',
    dataIndex: 'orderNo',
    width: 80,
    align: 'right',
  },
  {
    title: '备注',
    dataIndex: 'note',
    align: 'left',
  },
];
*/

/*
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
*/

export const formSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['name']
    }
  },
  {
    fieldName: 'name',
    label: '名称',
    rules: 'required',
    component: 'Input',
    componentProps: {
      placeholder: '请输入用户名',
    },
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 32,
        message: '字符长度不能大于32！',
      },
    ],*/
    colProps,
  },
  {
    fieldName: 'sn',
    label: '标识',
    rules: 'required',
    component: 'Input',
    colProps,
  },
  {
    fieldName: 'url',
    label: '系统URL',
    rules: 'required',
    component: 'Input',
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '系统URL不能为空！',
      },
      {
        pattern: new RegExp('[a-zA-z]+://[^\\s]*'),
        type: 'string',
        message: '请输入正确的URL地址！',
      },
      {
        max: 40,
        message: '字符长度不能大于40！',
      },
    ],*/
    colProps,
  },
  {
    fieldName: 'indexUrl',
    label: '首页URL',
    rules: 'required',
    component: 'Input',
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '首页URL不能为空！',
      },
      {
        pattern: new RegExp('^\\/(\\w+\\/?)+(\\.?\\w+)?$'),
        type: 'string',
        message: '请输入正确的URL地址！！',
      },
      {
        max: 128,
        message: '字符长度不能大于128！',
      },
    ],*/
    colProps,
  },
/*  {
    field: 'image',
    label: '图标',
    required: false,
    component: 'IconPicker',
    colProps,
  },*/
/*  {
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
  },*/
  {
    fieldName: 'status',
    label: '状态',
    // required: false,
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
    fieldName: 'platformEnabled',
    label: '是否推送',
    // helpMessage: '是否推送消息至第三方平台！',
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
    fieldName: 'note',
    component: 'Textarea',
    componentProps: {
      // autosize: true,
      autoSize: {
        minRows: 4,
        maxRows: 8,
      },
      rows: 4
    }
/*    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },*/
    /*rules: [
      {
        max: 500,
        message: '字符长度不能大于500！',
      },
    ],*/
    // colProps,
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
    field: 'sn',
    label: '标识（appKey）',
    // component: 'Input',
    slot: 'snSlot',
    colProps,
  },
  {
    label: '密钥（appSecretKey）',
    field: 'secretKey',
    // component: 'InputTextArea',
    slot: 'secretKeySlot',
    colProps,
  },
];
