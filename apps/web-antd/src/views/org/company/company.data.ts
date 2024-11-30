import {useVbenVxeGrid} from '#/adapter/vxe-table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';


import { getCompanyTypes } from '#/api/org/companyType';
import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/constantEnum';

let companyTypeTreeData = [];
const companyTypeObj = {};

export const columns: VxeGridProps['columns'] = [
  {
    title: '全称',
    field: 'cname',
    align: 'left',
    minWidth: 300,
    width: 300,
    resizable: true,
  },
  {
    title: '编码',
    field: 'code',
    align: 'left',
    width: 100,
    resizable: true,
  },

  {
    title: '简称',
    field: 'shortName',
    align: 'left',
    width: 180,
    resizable: true,
  },
  {
    title: '类型',
    field: 'typeId',
    align: 'left',
    width: 180,
    customRender: ({ record }) => {
      return companyTypeObj[record.typeId] || '未设置';
    },
  },

  {
    title: '状态',
    field: 'status',
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
    title: '排序',
    field: 'orderNo',
    align: 'right',
    width: 80,
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

export const searchFormSchema: VxeGridProps['columns'] = [
  {
    fieldName: 'keyword',
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


export const modalSchema =  [
  {
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
    fieldName: 'dictId',
    label: 'dictId',
  },
  {
    component: 'Input',
    fieldName: 'dictName',
    label: '字典名称',
    // rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'dictType',
    help: '使用英文/下划线命名, 如:sys_normal_disable',
    label: '字典类型',
    rules: z
        .string()
        .regex(/^[a-z_]+$/i, { message: '字典类型只能使用英文/下划线命名' }),
  },
  {
    component: 'Textarea',
    fieldName: 'remark',
    formItemClass: 'items-baseline',
    label: '备注',
  },
];


export const formSchema = [
  {
    field: 'id',
    label: 'ID',
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
    field: 'cname',
    label: '全称',
    required: true,
    component: 'Input',
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '全称不能为空！',
      },
      {
        max: 64,
        message: '字符长度不能大于64！',
      },
    ],*/
    colProps: {
      span: 24,
    },
  },
  {
    field: 'shortName',
    label: '简称',
    required: false,
    component: 'Input',
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '简称不能为空！',
      },
      {
        max: 64,
        message: '字符长度不能大于64！',
      },
    ],*/
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
    field: 'typeId',
    label: '类型',
    required: true,
    component: 'ApiTreeSelect',
    componentProps: {
      api: getCompanyTypes,
      getPopupContainer: () => document.body,
    },
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
    field: 'status',
    label: '状态',
    required: false,
    component: 'Switch',
    defaultValue: 1,
    componentProps: {
      checkedValue: 1,
      unCheckedValue: 0,
      checkedChildren: '启用',
      unCheckedChildren: '禁用',
    },
    colProps: {
      span: 24,
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
    /*rules: [
      {
        max: 200,
        message: '字符长度不能大于64！',
      },
    ],*/
    colProps: {
      span: 24,
    },
  },
];
