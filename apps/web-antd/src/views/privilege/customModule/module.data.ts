import { BasicColumn, FormSchema } from '@/components/Table';

import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import Icon from '@/components/Icon/Icon.vue';
import { OrderNoDefaultEnum } from '#/enums/commonEnum';
import {VxeGridProps} from "@vben/plugins/src/vxe-table";

const colProps = {
  span: 24,
};
export const columns: VxeGridProps['columns'] = [
  {
    title: '标题',
    field: 'name',
    align: 'left',
    width: 300,
    resizable: true,
    customRender: ({ record }) => {
      return h('span', {}, [h(Icon, { icon: record.image }), h('span', record.name)]);
      // return h(Icon, { icon: record.image });
    },
  },
  {
    title: 'URL',
    field: 'url',
    align: 'left',
    width: 180,
  },
 /* {
    resizable: true,
    title: '标识',
    field: 'sn',
    align: 'left',
    width: 120,
  },
  {
    resizable: true,
    width: 200,
    title: '组件',
    field: 'component',
    align: 'left',
  },*/
  {
    title: '菜单类型',
    field: 'component',
    width: 100,
    customRender: ({ record }) => {
      const isDictionary = record.component === 'LAYOUT';
      const color = isDictionary ? 'blue' : 'green';
      const text = isDictionary ? '目录' : '菜单';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '状态',
    field: 'status',
    width: 60,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '是否显示',
    field: 'showStatus',
    width: 100,
    customRender: ({ record }) => {
      const status = record.showStatus;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'gray';
      const text = enable ? '显示' : '隐藏';
      return h(Tag, { color: color }, () => text);
    },
  },
/*  {
    title: '权限值',
    field: 'pvs',
    align: 'left',
    width: 300,
    resizable: true,
  },*/
  {
    title: '排序',
    field: 'orderNo',
    width: 60,
    align: 'right',
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
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'menuType',
    label: 'menuType',
    component: 'Input',
    defaultValue: 2,
    show: false,
  },
  {
    fieldName: 'pid',
    label: 'pid',
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'image',
    label: '图标',
    component: 'IconPicker',
    componentProps: {
      // mode: 'svg'
    },
    colProps,
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
    colProps,
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
    colProps: {span: 24},
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
    colProps,
  },
  {
    fieldName: 'url',
    label: 'URL',
    component: 'Input',
    show: false,
    dynamicDisabled: ({values})=> !!values.id,
    colProps,
  },
  {
    fieldName: 'component',
    label: '组件地址',
    component: 'Input',
    show: false,
    dynamicDisabled: ({values})=> !!values.id,
    colProps,
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
    colProps,
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
    colProps,
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
    colProps,
  },
];

export const pValueFormSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'pvs',
    label: ' ',
    component: 'CheckboxGroup',
    labelWidth: 10,
    componentProps: {},
  },
];
