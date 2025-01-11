import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';

import { Tag } from 'ant-design-vue';

import { h } from 'vue';
import {getAll} from "#/api/base/app";

export const columns: VxeGridProps['columns'] = [
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
    width: 120,
    align: 'left',
    resizable: true,
  },
  {
    title: '分类名称',
    field: 'categoryName',
    width: 120,
    align: 'left',
    resizable: true,
  },
  {
    title: '系统',
    field: 'appName',
    width: 100,
    align: 'left',
    resizable: true,
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
    title: '应用范围',
    field: 'appliedRangeName',
    width: 100,
    align: 'left',
    resizable: true,
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 150,
    align: 'center',
  },
  {
    title: '更新时间',
    field: 'updateTime',
    width: 150,
    align: 'center',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'appSn',
    label: '系统',
    component: 'ApiSelect',
    labelWidth: 60,
    componentProps: {
      class: 'w-full',
      api: getAll,
      placeholder: '请选择系统',
      allowClear: true,
      fieldNames: {
        value: 'sn',
        label: 'name'
      },
    }
  },
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
    fieldName: 'categoryCode',
    label: '',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['categoryCode']
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
      triggerFields: ['categoryCode']
    }
  },
  {
    fieldName: 'name',
    label: '名称',
    component: 'Input',
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(200, "字符长度不能大于200！")
  },
  {
    fieldName: 'modelKey',
    label: '标识',
    component: 'Input',
    // required: true,
  },
  {
    fieldName: 'appSn',
    label: '所属系统',
    component: 'Select',
    componentProps: {
      getPopupContainer: () => document.body,
    },
    // required: true,
  },
];
