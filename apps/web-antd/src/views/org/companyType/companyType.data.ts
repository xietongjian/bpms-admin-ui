import type { VxeGridProps } from '#/adapter/vxe-table';
import {useVbenVxeGrid} from '#/adapter/vxe-table';

import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/constantEnum';

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    dataIndex: 'name',
    align: 'left',
    width: 300,
    resizable: true,
    treeNode: true,
  },
  {
    title: '编码',
    dataIndex: 'code',
    align: 'left',
    width: 100,
    resizable: true,
  },

  {
    title: '排序',
    dataIndex: 'orderNo',
    align: 'right',
    width: 80,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: '描述',
    dataIndex: 'descr',
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/编码',
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
    colProps: {
      span: 24,
    },
  },
  {
    field: 'pid',
    label: 'pid',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: '名称',
    required: true,
    component: 'Input',
    rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 64,
        message: '字符长度不能大于64！',
      },
    ],
    colProps: {
      span: 24,
    },
  },
  {
    field: 'code',
    label: '编码',
    required: true,
    component: 'Input',
    colProps: {
      span: 24,
    },
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
  },
  {
    field: 'descr',
    label: '描述',
    required: false,
    component: 'InputTextArea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    rules: [
      {
        max: 200,
        message: '字符长度不能大于64！',
      },
    ],
    colProps: {
      span: 24,
    },
  },
];
