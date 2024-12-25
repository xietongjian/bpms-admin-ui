import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {checkEntityExist} from "#/api/base/app";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';

import { OrderNoDefaultEnum, RemarkDefaultEnum,FormValidPatternEnum } from '#/enums/commonEnum';

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
    width: 300,
    resizable: true,
  },
  {
    title: '编码',
    field: 'code',
    align: 'left',
    width: 200,
    resizable: true,
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
    title: '排序编号',
    field: 'orderNo',
    width: 100,
    align: 'right',
  },
  {
    title: '备注',
    field: 'note',
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
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

export const formSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'name',
    label: '名称',
    required: true,
    component: 'Input',
    show: true,
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 80,
        message: '字符长度不能大于80！',
      },
    ],*/
    colProps: {
      span: 24,
    },
  },
  {
    fieldName: 'code',
    label: '编码',
    required: true,
    component: 'Input',
    show: true,
    colProps: {
      span: 24,
    },
  },
  {
    fieldName: 'pid',
    label: '父级编码',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'orderNo',
    label: '排序编号',
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
    fieldName: 'status',
    label: '状态',
    required: false,
    component: 'Switch',
    defaultValue: 1,
    componentProps: {
      checkedValue: 1,
      unCheckedValue: 0,
      checkedChildren: '启用',
      unCheckedChildren: '停用',
    },
    colProps: {
      span: 24,
    },
  },
  {
    fieldName: 'note',
    label: '备注',
    required: false,
    component: 'InputTextArea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    show: true,
    /*rules: [
      {
        max: 255,
        message: '字符长度不能大于255！',
      },
    ],*/
    colProps: {
      span: 24,
    },
  },
];
