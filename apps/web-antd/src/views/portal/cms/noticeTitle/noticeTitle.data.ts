import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/commonEnum';

export const columns: VxeGridProps['columns'] = [
  {
    title: '标题',
    field: 'title',
    align: 'left',
    // slots: { customRender: 'titleRender' },
    minWidth: 300,
    width: 300,
  },
  {
    title: '发文代号',
    field: 'shortTitle',
    align: 'left',
  },
  {
    title: '启用状态',
    field: 'status',
    width: 100,
    align: 'center',
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '排序号',
    field: 'orderNo',
    width: 100,
    align: 'left',
  },
  {
    title: '操作',
    width: 120,
    align: 'center',
    slots: { default: 'action' },
    fixed: 'right',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入标题',
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
    label: '主键',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'title',
    label: '标题',
    required: true,
    component: 'Input',
    show: true,
  },
  {
    fieldName: 'shortTitle',
    label: '发文代号',
    required: true,
    component: 'Input',
    show: true,
    componentProps: {
      placeholder: '用于生成字号，如：XXXXXX【2021】008号',
    },
    helpMessage: ({ model, field }) =>
      `用于生成字号，如：${model[field] || 'XXXXXX'}【${new Date().getFullYear()}】008号`,
    rules: [
      {
        max: 32,
        message: '字符长度不能大于32！',
      },
    ],
  },
  {
    fieldName: 'status',
    label: '启用状态',
    required: true,
    component: 'Switch',
    defaultValue: true,
    show: true,
    componentProps: {
      checkedChildren: '启用',
      unCheckedChildren: '禁用',
    },
  },
  {
    fieldName: 'orderNo',
    label: '排序号',
    helpMessage: '数值越小越靠前！',
    required: false,
    component: 'InputNumber',
    show: true,
    defaultValue: OrderNoDefaultEnum.VALUE,
    componentProps: {
      min: OrderNoDefaultEnum.MIN,
      max: OrderNoDefaultEnum.MAX,
    },
  },
  {
    fieldName: 'remark',
    label: '备注',
    required: false,
    component: 'InputTextArea',
    show: true,
    rules: [
      {
        max: 512,
        message: '字符长度不能大于512！',
      },
    ],
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
  },
];
