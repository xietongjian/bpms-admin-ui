import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import { Tag } from 'ant-design-vue';
import {getAll} from '#/api/base/app';

import { h } from 'vue';

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    minWidth: 200,
    align: 'left',
  },
  {
    title: 'KEY',
    field: 'modelKey',
    width: 100,
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
  {
    title: '应用范围',
    field: 'appliedRangeName',
    width: 100,
    align: 'left',
  },
  {
    title: '状态',
    field: 'statusName',
    width: 70,
    align: 'center',
    customRender: ({ record }) => {
      const { status, statusName } = record;
      let color = '';
      if (~~status === 2) {
        color = 'warning';
      } else if (~~status === 3) {
        color = 'success';
      } else if (~~status === 4) {
        color = 'error';
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
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/编码',
      allowClear: true,
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
      placeholder: '请选择系统',
      allowClear: true,
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
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['id']
    }
  },
  {
    fieldName: 'categoryCode',
    label: 'ID',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['id']
    }
  },
  {
    fieldName: 'name',
    label: '名称',
    component: 'Input',
    /*required: true,
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
    colProps,*/
  },
  {
    fieldName: 'modelKey',
    label: '标识',
    component: 'Input',
    /*required: true,
    colProps,*/
  },
  {
    fieldName: 'appSn',
    label: '所属系统',
    component: 'Select',
    componentProps: {
      getPopupContainer: () => document.body,
    },
    /*required: true,
    colProps,*/
  },
];
