import { z } from '#/adapter/form';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import type { VxeGridProps } from '#/adapter/vxe-table';
import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/constantEnum';

export const columns: VxeGridProps['columns'] = [
  {
    title: '功能点名',
    field: 'name',
    width: 300,
    align: 'left',
  },
  {
    title: '标识',
    field: 'sn',
    width: 300,
    align: 'left',
  },
  {
    title: '是否默认',
    field: 'ifDefault',
    width: 80,
    /*customRender: ({ record }) => {
      const status = record.ifDefault;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '是' : '否';
      return h(Tag, { color: color }, () => text);
    },*/
  },
  {
    title: '排序号',
    field: 'orderNo',
    width: 100,
    align: 'right',
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
    fieldName: 'id',
    label: '表id',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'name',
    label: '功能点名',
    required: true,
    component: 'Input',
    show: true,
    rules: [
      {
        required: true,
        whitespace: true,
        message: '功能点名不能为空！',
      },
      {
        max: 96,
        message: '字符长度不能大于96！',
      },
    ],
  },
  {
    fieldName: 'sn',
    label: '标识',
    required: true,
    component: 'Input',
    show: true,
  },
  {
    fieldName: 'ifDefault',
    label: '是否默认',
    required: false,
    component: 'Switch',
    componentProps: {
      checkedChildren: '是',
      unCheckedChildren: '否',
    },
    show: true,
  },
  {
    fieldName: 'orderNo',
    label: '排序号',
    helpMessage: '数值越小越靠前！',
    required: false,
    component: 'InputNumber',
    defaultValue: OrderNoDefaultEnum.VALUE,
    componentProps: {
      min: OrderNoDefaultEnum.MIN,
      max: OrderNoDefaultEnum.MAX,
    },
    show: true,
  },
  {
    fieldName: 'remark',
    label: '备注',
    required: false,
    component: 'Textarea',
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
  },
];
