import {useVbenVxeGrid} from '#/adapter/vxe-table';
import { OrderNoDefaultEnum, RemarkDefaultEnum } from '@/enums/constantEnum';

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    align: 'left',
    width: 300,
    minWidth: 300,
    resizable: true,
  },
  {
    title: '编码',
    dataIndex: 'code',
    width: 120,
    align: 'left',
    resizable: true,
  },
  {
    title: '部门领导',
    dataIndex: 'leaderName',
    width: 100,
    align: 'center',
  },
  {
    title: '分管领导',
    dataIndex: 'superiorName',
    width: 100,
    align: 'center',
  },
  {
    title: '所属公司',
    dataIndex: 'companyName',
    width: 120,
    align: 'left',
    resizable: true,
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
      lg: { span: 8, offset: 0 },
      sm: { span: 14, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
];

export const deptFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    required: false,
    component: 'Input',
    show: false,
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
    component: 'Input',
    required: true,
    rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 100,
        message: '字符长度不能大于100！',
      },
    ],
    colProps: {
      span: 24,
    },
  },
  {
    field: 'code',
    label: '编码',
    component: 'Input',
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'leaderPersonal',
    label: '部门领导',
    component: 'PersonalSelector',
    componentProps: {
      multiple: false,
    },
    required: false,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'leaderName',
    label: '部门领导',
    component: 'Input',
    show: false,
  },
  {
    field: 'superiorPersonal',
    label: '分管领导',
    component: 'PersonalSelector',
    componentProps: {
      multiple: false,
    },
    required: false,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'superiorName',
    label: '分管领导',
    component: 'Input',
    show: false,
  },
  {
    field: 'companyId',
    label: '所属公司',
    component: 'TreeSelect',
    componentProps: {
      treeNodeFilterProp: 'cname',
      getPopupContainer: () => document.body,
    },
    required: true,
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
    label: '备注',
    field: 'note',
    component: 'InputTextArea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    rules: [
      {
        max: 256,
        message: '字符长度不能大于256！',
      },
    ],
    colProps: {
      span: 24,
    },
  },
];
