import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/constantEnum';

export const columns: BasicColumn[] = [
  {
    title: '名称',
    field: 'name',
    width: 100,
    align: 'left',
  },
  {
    title: '位',
    field: 'position',
    width: 100,
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
    width: 400,
    align: 'left',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    fieldName: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    fieldName: '名称',
    required: true,
    component: 'Input',
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
    colProps: {
      span: 24,
    },
  },
  {
    fieldName: 'position',
    label: '位',
    required: true,
    component: 'InputNumber',
    colProps: {
      span: 24,
    },
  },
  {
    fieldName: 'orderNo',
    label: '排序',
    helpMessage: '数值越小越靠前！',
    required: true,
    component: 'InputNumber',
    defaultValue: OrderNoDefaultEnum.VALUE,
    componentProps: {
      min: OrderNoDefaultEnum.MIN,
      max: OrderNoDefaultEnum.MAX,
    },
  },
  {
    label: '备注',
    fieldName: 'remark',
    component: 'InputTextArea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    /*rules: [
      {
        max: 200,
        message: '字符长度不能大于200！',
      },
    ],*/
    colProps: {
      span: 24,
    },
  },
];
