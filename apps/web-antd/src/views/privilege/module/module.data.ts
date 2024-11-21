import type { VxeGridProps } from '#/adapter/vxe-table';

const colProps = {
  span: 24,
};
export const listColumns: VxeGridProps['columns'] = [
  {
    title: '菜单名称',
    field: 'name',
    align: 'left',
    width: 300,
    resizable: true,
    treeNode: true,
    slots: {default: 'name'}

  },
  {
    title: 'URL',
    field: 'url',
    align: 'left',
    width: 180,
  },
  {
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
  },
  {
    title: '状态',
    field: 'status',
    width: 60,
    slots: {default: 'status'}
  },
  {
    title: '菜单类型',
    field: 'showStatus',
    width: 100,
    slots: {default: 'showStatus'}
  },
  {
    title: '权限值',
    field: 'pvs',
    align: 'left',
    width: 300,
    resizable: true,
    slots: {default: 'pvs'}
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
    width: 120,
  },
];

export const searchFormSchema: any[] = [
  {
    component: 'Input',
    fieldName: 'keyword',
    label: '关键字',
    componentProps: {
      placeholder: '请输入关键字',
      allowClear: true,
    }
  },
];

export const formSchema: any[] = [
  {
    field: 'id',
    label: 'ID',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    field: 'pid',
    label: 'pid',
    required: false,
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
    field: 'sn',
    label: '标识',
    required: true,
    component: 'Input',
    dynamicDisabled: ({values})=> !!values.id,
    colProps,
  },
  {
    field: 'url',
    label: 'URL',
    component: 'Input',
    rules: [
      {
        required: true,
        whitespace: true,
        message: 'URL不能为空！',
      },
      {
        pattern: new RegExp('[^\/]+(\/(.+))*'),
        type: 'string',
        message: '请输入正确的URL地址！',
      },
      {
        max: 128,
        message: '字符长度不能大于128！',
      },
    ],
    dynamicDisabled: ({values})=> !!values.id,
    colProps,
  },
  {
    field: 'component',
    label: '组件地址',
    component: 'Input',
    rules: [
      {
        required: true,
        whitespace: true,
        message: '组件目录地址不能为空！',
      },
      {
        pattern: new RegExp('^\\/?(\\w+\\/?)+(\\.?\\w+)?$'),
        type: 'string',
        message: '请输入正确的目录地址！',
      },
      {
        max: 128,
        message: '字符长度不能大于128！',
      },
    ],
    dynamicDisabled: ({values})=> !!values.id,
    colProps,
  },
  {
    field: 'redirect',
    label: '跳转地址',
    helpMessage: '目录菜单跳转地址！',
    component: 'Input',
    rules: [
      {
        required: false,
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
    helpMessage: '数值越小越靠前！',
    component: 'InputNumber',
    // defaultValue: OrderNoDefaultEnum.VALUE,
    // componentProps: {
    //   min: OrderNoDefaultEnum.MIN,
    //   max: OrderNoDefaultEnum.MAX,
    // },
  },
  {
    field: 'status',
    label: '状态',
    required: false,
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
    required: false,
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

export const pValueFormSchema: any[] = [
  {
    field: 'id',
    label: 'ID',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    field: 'pvs',
    label: ' ',
    required: false,
    component: 'CheckboxGroup',
    labelWidth: 10,
    componentProps: {},
  },
];
