import { OrderNoDefaultEnum } from '#/enums/constantEnum';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { z } from '#/adapter/form';

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
    treeNode: true
  },
  {
    title: '编码',
    field: 'code',
    width: 300,
    align: 'left',
  },
  {
    title: '修改时间',
    field: 'updateTime',
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
];

export const formSchema: FormSchema[] = [
  {
    fieldName: 'pcode',
    label: 'pcode',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['code'],
    }
  },
  {
    fieldName: 'name',
    label: '名称',
    // required: true,
    component: 'Input',
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 32,
        message: '字符长度不能大于32！',
      },
    ],*/
  },
  {
    fieldName: 'code',
    label: '编码',
    // required: true,
    component: 'Input',
  },
];
