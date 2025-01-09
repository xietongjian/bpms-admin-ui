import { BasicColumn, FormSchema } from '@/components/Table';

import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import Icon from '@/components/Icon/Icon.vue';
import { OrderNoDefaultEnum } from '#/enums/commonEnum';

const colProps = {
  span: 24,
};
export const columns: BasicColumn[] = [
  {
    title: '标题',
    dataIndex: 'name',
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
    dataIndex: 'url',
    align: 'left',
    width: 180,
  },
 /* {
    resizable: true,
    title: '标识',
    dataIndex: 'sn',
    align: 'left',
    width: 120,
  },
  {
    resizable: true,
    width: 200,
    title: '组件',
    dataIndex: 'component',
    align: 'left',
  },*/
  {
    title: '菜单类型',
    dataIndex: 'component',
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
    dataIndex: 'status',
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
    dataIndex: 'showStatus',
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
    dataIndex: 'pvs',
    align: 'left',
    width: 300,
    resizable: true,
  },*/
  {
    title: '排序',
    dataIndex: 'orderNo',
    width: 60,
    align: 'right',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/标识',
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
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'menuType',
    label: 'menuType',
    component: 'Input',
    defaultValue: 2,
    show: false,
  },
  {
    field: 'pid',
    label: 'pid',
    component: 'Input',
    show: false,
  },
  {
    field: 'image',
    label: '图标',
    component: 'IconPicker',
    componentProps: {
      // mode: 'svg'
    },
    colProps,
  },
  {
    field: 'name',
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
    field: 'moduleType',
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
    field: 'modelInfoSelector',
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
    field: 'url',
    label: 'URL',
    component: 'Input',
    show: false,
    dynamicDisabled: ({values})=> !!values.id,
    colProps,
  },
  {
    field: 'component',
    label: '组件地址',
    component: 'Input',
    show: false,
    dynamicDisabled: ({values})=> !!values.id,
    colProps,
  },
  {
    field: 'redirect',
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
    field: 'orderNo',
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
    field: 'status',
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
    field: 'showStatus',
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
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'pvs',
    label: ' ',
    component: 'CheckboxGroup',
    labelWidth: 10,
    componentProps: {},
  },
];
