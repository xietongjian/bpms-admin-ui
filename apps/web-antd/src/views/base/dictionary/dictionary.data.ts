import { BasicColumn, FormSchema } from '@/components/Table';
import { OrderNoDefaultEnum, RemarkDefaultEnum } from '@/enums/constantEnum';

const colProps = {
  span: 24,
};
// #######################数据字典属性配置
export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'cname',
    align: 'left',
  },
  /*  {
    title: '英文名称',
    dataIndex: 'ename',
    align: 'left',
  },*/
  {
    title: '编码',
    dataIndex: 'code',
    width: 120,
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
    colProps: { span: 16 },
  },
];

export const dictionaryFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    field: 'dicTypeId',
    label: 'dicTypeId',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    field: 'cname',
    label: '名称',
    component: 'Input',
    required: true,
    rules: [
      {
        whitespace: true,
        required: true,
        message: '名称不能为空！',
      },
      {
        pattern: new RegExp('^.{1,60}$'),
        type: 'string',
        message: '字符长度不能大于60！',
      },
    ],
    colProps,
  },
  /*{
    field: 'ename',
    label: '英文名称',
    component: 'Input',
    required: true,
    rules: [
      {
        whitespace: true,
        required: true,
        message: '名称不能为空！',
      },
      {
        pattern: new RegExp('^[0-9a-zA-Z\-_]{1,}$'),
        type: 'string',
        message: '请输入英文或数字！',
      },
      {
        pattern: new RegExp('^.{1,60}$'),
        type: 'string',
        message: '字符长度不能大于60！',
      },
    ],
  },*/
  {
    field: 'code',
    label: '编码',
    component: 'Input',
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
    colProps,
  },
];

// #######################数据字典项属性配置
export const itemColumns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'cname',
    align: 'left',
  },
  /*{
    title: '英文名称',
    dataIndex: 'ename',
    align: 'left',
  },*/
  {
    title: '编码',
    dataIndex: 'code',
    width: 120,
    align: 'left',
  },
  {
    title: '排序编号',
    dataIndex: 'orderNo',
    width: 80,
    align: 'right',
  },
];

export const dictionaryItemSearchFormSchema: FormSchema[] = [
  {
    field: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/标识',
    },
    labelWidth: 60,
    colProps: { span: 16 },
  },
];

export const dictionaryItemFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    field: 'mainId',
    label: 'mainId',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    field: 'cname',
    label: '名称',
    component: 'Input',
    required: true,
    rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 60,
        message: '字符长度不能大于60！',
      },
    ],
    colProps,
  },
  /*{
    field: 'ename',
    label: '英文名称',
    component: 'Input',
    required: true,
    rules: [
      {
        required: true,
        whitespace: true,
        message: '英文名称不能为空！',
      },
      {
        pattern: new RegExp('^[0-9a-zA-Z\-_]{1,}$'),
        type: 'string',
        message: '请输入英文或数字！',
      },
      {
        max: 60,
        message: '字符长度不能大于60！',
      },
    ],
  },*/
  {
    field: 'code',
    label: '编码',
    component: 'Input',
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
    colProps,
  },
];
