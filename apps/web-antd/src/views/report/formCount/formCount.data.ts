import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';

export const baseColumns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
    minWidth: 300,
    resizable: true,
  },
  {
    title: 'KEY',
    field: 'modelKey',
    width: 100,
    align: 'left',
    resizable: true,
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
  /*{
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/编码',
    },
    labelWidth: 60,
    colProps: {span: 6, lg:{span: 6, offset:0}, sm:{span: 10, offset: 0}, xs:{span: 16, offset: 0}},
  },*/
  {
    fieldName: 'dateRange',
    label: '时间范围',
    component: 'RangePicker',
    labelWidth: 70,
    colProps: {
      span: 8,
      lg: { span: 8, offset: 0 },
      sm: { span: 8, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
];

export const modelInfoFormSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'categoryCode',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'name',
    label: '名称',
    component: 'Input',
    required: true,
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(200, "字符长度不能大于200！")
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 200,
        message: '字符长度不能大于200！',
      },
    ],*/
  },
  {
    fieldName: 'modelKey',
    label: '标识',
    component: 'Input',
    required: true,
  },
  {
    fieldName: 'appSn',
    label: '所属系统',
    component: 'Select',
    componentProps: {
      getPopupContainer: () => document.body,
    },
    required: true,
  },
];

export const copyModelInfoFormSchema: FormSchema[] = [
  {
    fieldName: 'fromModelKey',
    label: '来源ModelKey',
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'newModelName',
    label: '新表单名称',
    component: 'Input',
    required: true,
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(200, "字符长度不能大于200！")
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 200,
        message: '字符长度不能大于200！',
      },
    ],*/
  },
  {
    fieldName: 'newCategoryCode',
    label: '新分类',
    required: true,
    component: 'TreeSelect',
    componentProps: {
      treeNodeFilterProp: 'name',
      replaceFields: {
        title: 'name',
        key: 'code',
        value: 'code',
      },
      getPopupContainer: () => document.body,
    },
  },
];
