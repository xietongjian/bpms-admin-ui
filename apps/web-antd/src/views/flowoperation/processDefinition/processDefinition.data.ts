// import { BasicColumn, FormSchema } from '@/components/Table';
import { Tag } from 'ant-design-vue';
import { h } from 'vue';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";

import type {VxeGridProps} from '#/adapter/vxe-table';
import {getAll} from '#/api/base/app';
export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    minWidth: 200,
    align: 'left',
    type: 'expand',
    slots: {
      default: 'name',
      content: 'expandContent'
    }
  },
  {
    title: 'KEY',
    field: 'modelKey',
    width: 150,
    align: 'left',
  },
  {
    title: '分类名称',
    field: 'categoryName',
    width: 150,
    align: 'left',
  },
  {
    title: '系统',
    field: 'appName',
    width: 100,
    align: 'left',
  },
  {
    title: '状态',
    field: 'statusName',
    width: 70,
    align: 'center',
/*    customRender: ({ record }) => {
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
    },*/
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
    label: '流程标题',
    component: 'Input',
    componentProps: {
      placeholder: '请输入流程标题',
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

export const hisDefinitionColumns: VxeGridProps['columns'] = [
  {
    title: '操作',
    field: 'action',
    width: 120,
    slots: {default: 'action'},
    align: 'center',
  },
  {
    title: '名称',
    field: 'name',
    align: 'left',
  },
  {
    title: 'KEY',
    field: 'key',
    align: 'left',
  },
  {
    title: '版本',
    field: 'version',
    width: 100,
    align: 'center',
  },
  {
    title: '状态',
    field: 'statusName',
    width: 70,
    align: 'center',
    /*customRender: ({ record }) => {
      const { suspensionState } = record;
      let statusName = '未知';
      let color = '';
      if (~~suspensionState === 2) {
        color = 'red';
        statusName = '挂起';
      } else if (~~suspensionState === 1) {
        color = 'green';
        statusName = '激活';
      } else {
        color = 'gray';
      }
      return h(Tag, { color: color }, () => statusName);
    },*/
  },
/*  {
    field: 'action',
    fixed: 'right',
    slots: {default: 'action'},
    title: '操作',
    width: 120,
  },*/
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
      triggerFields: ['categoryCode']
    }
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
    rules: "selectRequired"
  },
];
