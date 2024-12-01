import {useVbenVxeGrid} from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/constantEnum';
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
    width: 300,
    minWidth: 300,
    resizable: true,
  },
  {
    title: '编码',
    field: 'code',
    width: 120,
    align: 'left',
    resizable: true,
  },
  {
    title: '部门领导',
    field: 'leaderName',
    width: 100,
    align: 'center',
  },
  {
    title: '分管领导',
    field: 'superiorName',
    width: 100,
    align: 'center',
  },
  {
    title: '所属公司',
    field: 'companyName',
    width: 120,
    align: 'left',
    resizable: true,
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
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
    fieldName: 'id',
    label: 'ID',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'pid',
    label: 'pid',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'name',
    label: '名称',
    component: 'Input',
    required: true,
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 100,
        message: '字符长度不能大于100！',
      },
    ],*/
    colProps: {
      span: 24,
    },
  },
  {
    fieldName: 'code',
    label: '编码',
    component: 'Input',
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    fieldName: 'leaderPersonal',
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
    fieldName: 'leaderName',
    label: '部门领导',
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'superiorPersonal',
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
    fieldName: 'superiorName',
    label: '分管领导',
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'companyId',
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
  },
  {
    label: '备注',
    fieldName: 'note',
    component: 'InputTextArea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    /*rules: [
      {
        max: 256,
        message: '字符长度不能大于256！',
      },
    ],*/
    colProps: {
      span: 24,
    },
  },
];
