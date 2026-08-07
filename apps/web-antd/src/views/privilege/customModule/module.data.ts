import type {VbenFormSchema as FormSchema} from '@vben/common-ui';

import { OrderNoDefaultEnum } from '#/enums/commonEnum';
import type {VxeGridProps} from '#/adapter/vxe-table';

export const columns: VxeGridProps['columns'] = [
  {
    title: '标题',
    field: 'name',
    align: 'left',
    minWidth: 250,
    resizable: true,
    treeNode: true,
    slots: { default: 'name' },
  },
  {
    title: 'URL',
    field: 'url',
    align: 'left',
    width: 180,
  },
  {
    title: '菜单类型',
    field: 'componentType',
    width: 100,
    slots: { default: 'componentType' },
  },
  {
    title: '状态',
    field: 'status',
    width: 60,
    slots: { default: 'status' },
  },
  {
    title: '是否显示',
    field: 'showStatus',
    width: 100,
    slots: { default: 'showStatus' },
  },
  {
    title: '权限值',
    field: 'pvs',
    align: 'left',
    minWidth: 200,
    resizable: true,
    slots: { default: 'pvs' },
  },
  {
    title: '排序',
    field: 'orderNo',
    width: 60,
    align: 'right',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 150,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/标识',
      allowClear: true,
    },
    labelWidth: 60,
  },
];

export const formSchema: FormSchema[] = [
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
    fieldName: 'menuType',
    label: 'menuType',
    component: 'Input',
    defaultValue: 2,
    dependencies: {
      show: false,
      triggerFields: ['menuType']
    }
  },
  {
    fieldName: 'pid',
    label: 'pid',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['pid']
    }
  },
  {
    fieldName: 'image',
    label: '图标',
    component: 'IconPicker',
    componentProps: {
      // mode: 'svg'
    },
  },
  {
    fieldName: 'name',
    label: '名称',
    required: true,
    component: 'Input',
    rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 32,
        message: '字符长度不能大于32！',
      },
    ],
  },
  {
    fieldName: 'moduleType',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: 'dictionary',
    componentProps: {
      options: [
        {label: '目录', value: 'dictionary'},
        {label: '菜单', value: 'menu'},
      ],
    },
  },
  {
    fieldName: 'modelInfoSelector',
    label: '表单流程模板',
    required: ({values}) => values.moduleType === 'menu',
    component: 'ModelInfoSelector',
    componentProps: {
      formType: 0,
    },
    // dynamicDisabled: ({values})=> !!values.id,
    show: ({values}) => values.moduleType === 'menu',
  },
  {
    fieldName: 'url',
    label: 'URL',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['url']
    },
    dynamicDisabled: ({values})=> !!values.id,
  },
  {
    fieldName: 'component',
    label: '组件地址',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['component']
    },
    dynamicDisabled: ({values})=> !!values.id,
  },
  {
    fieldName: 'redirect',
    label: '跳转地址',
    help: '目录菜单跳转地址！',
    component: 'Input',
    rules: [
      {
        whitespace: true,
        message: 'URL不能为空！',
      },
      {
        pattern: new RegExp('[^\/]+(\/(.+))*'),
        type: 'string',
        message: '请输入正确的目录菜单跳转地址！',
      },
      {
        max: 128,
        message: '字符长度不能大于128！',
      },
    ],
  },
  {
    fieldName: 'orderNo',
    label: '排序号',
    help: '数值越小越靠前！',
    component: 'InputNumber',
    defaultValue: OrderNoDefaultEnum.VALUE,
    componentProps: {
      min: OrderNoDefaultEnum.MIN,
      max: OrderNoDefaultEnum.MAX,
    },
  },
  {
    fieldName: 'status',
    label: '状态',
    component: 'Switch',
    defaultValue: 1,
    componentProps: {
      checkedValue: 1,
      unCheckedValue: 0,
      checkedChildren: '启用',
      unCheckedChildren: '禁用',
    },
  },
  {
    fieldName: 'showStatus',
    label: '是否显示',
    component: 'Switch',
    defaultValue: 1,
    componentProps: {
      checkedValue: 1,
      unCheckedValue: 0,
      checkedChildren: '显示',
      unCheckedChildren: '隐藏',
    },
  },
];

export const pValueFormSchema: FormSchema[] = [
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
    fieldName: 'pvs',
    label: ' ',
    component: 'CheckboxGroup',
    labelWidth: 10,
    componentProps: {},
  },
];
