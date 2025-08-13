import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/commonEnum';

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    minWidth: 200,
    align: 'left',
    slots: { customRender: 'nameRender' },
    resizable: true,
  },
  {
    title: '标识',
    field: 'sn',
    width: 100,
    align: 'left',
  },
  {
    title: '启用状态',
    field: 'status',
    width: 80,
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
    width: 80,
    align: 'left',
  },
  {
    title: '备注',
    field: 'remark',
    width: 200,
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
      placeholder: '请输入名称',
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
        max: 256,
        message: '字符长度不能大于256！',
      },
    ],*/
  },
  {
    fieldName: 'sn',
    label: '标识',
    required: true,
    component: 'Input',
    show: true,
  },
  {
    fieldName: 'style',
    label: '样式',
    component: 'Input',
    slot: 'styleRenderSlot',
    show: true,
  },
  {
    fieldName: 'pid',
    label: '父级分类ID',
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'status',
    label: '启用状态',
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
    component: 'InputTextArea',
    show: true,
    /*rules: [
      {
        max: 512,
        message: '字符长度不能大于512！',
      },
    ],*/
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
  },
];
