import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';

import { Tag } from 'ant-design-vue';
import { getAll } from '#/api/base/app';
import { h } from 'vue';

const colProps = {
  span: 24,
};
export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
  },
  {
    title: 'KEY',
    field: 'modelKey',
    width: 200,
    align: 'left',
  },
  {
    title: '分类名称',
    field: 'categoryName',
    width: 100,
    align: 'left',
  },
  {
    title: '系统',
    field: 'appName',
    width: 100,
    align: 'left',
  },
  /*{
    title: '应用范围',
    field: 'appliedRangeName',
    width: 100,
    align: 'left'
  },*/
  {
    title: '状态',
    field: 'statusName',
    width: 70,
    align: 'center',
    customRender: ({ record }) => {
      const { status, statusName } = record;
      let color = '';
      if (~~status === 2) {
        color = '#2db7f5';
      } else if (~~status === 3) {
        color = '#87d068';
      } else if (~~status === 4) {
        color = '#f50';
      } else {
        color = 'gray';
      }
      return h(Tag, { color: color }, () => statusName);
    },
  },
  {
    title: '更新时间',
    field: 'updateTime',
    width: 120,
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
  },
  {
    fieldName: 'appSn',
    label: '系统',
    component: 'ApiSelect',
    labelWidth: 60,
    componentProps: {
      api: getAll,
      fieldNames: {
        value: 'sn',
        label: 'name'
      },
    }
  },
];

export const modelInfoFormSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'categoryCode',
    label: 'categoryCode',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'name',
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
        max: 200,
        message: '字符长度不能大于200！',
      },
    ],
    colProps,
  },
  {
    fieldName: 'modelKey',
    label: '标识',
    component: 'Input',
    required: true,
    colProps,
  },
  {
    fieldName: 'appSn',
    label: '所属系统',
    component: 'Select',
    componentProps: {
      getPopupContainer: () => document.body,
    },
    required: true,
    colProps,
  },
];

export const dmnBaseFormSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'modelId',
    label: 'modelId',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'dmnType',
    label: 'dmnType',
    required: true,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'categoryCode',
    label: 'categoryCode',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'name',
    label: '名称',
    labelWidth: 60,
    component: 'Input',
    required: true,
    rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 200,
        message: '字符长度不能大于200！',
      },
    ],
    colProps: {
      lg: { span: 6, offset: 0 },
      md: { span: 8, offset: 0 },
      sm: { span: 12, offset: 0 },
      xs: { span: 12, offset: 0 },
    },
  },
  {
    fieldName: 'modelKey',
    label: '标识',
    labelWidth: 60,
    component: 'Input',
    required: true,
    itemProps: {
      validateTrigger: ['focus', 'change'],
    },
    colProps: {
      lg: { span: 6, offset: 0 },
      md: { span: 8, offset: 0 },
      sm: { span: 12, offset: 0 },
      xs: { span: 12, offset: 0 },
    },
  },
  {
    fieldName: 'appSn',
    label: '所属系统',
    component: 'ApiSelect',
    componentProps: {
      api: getAll,
      getPopupContainer: () => document.body,
    },
    required: true,
    colProps: {
      lg: { span: 6, offset: 0 },
      md: { span: 8, offset: 0 },
      sm: { span: 12, offset: 0 },
      xs: { span: 12, offset: 0 },
    },
  },
  /*{
    fieldName: 'image',
    label: '附件上传',
    component: 'Upload',
    componentProps: {
    },
    required: true,
    colProps: {lg:{span: 6, offset:0}, md:{span: 8, offset:0}, sm:{span: 12, offset: 0}, xs:{span: 12, offset: 0}},
  },*/
];

export const dmnSimulatorInputFormSchema: FormSchema[] = [];
