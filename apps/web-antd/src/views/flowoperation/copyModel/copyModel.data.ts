import { FormSchema } from '@/components/Table';

export const customFormSchema: FormSchema[] = [
  {
    fieldName: 'type',
    label: '类型',
    component: 'Input',
    defaultValue: 0,
    show: false,
  },
  {
    fieldName: 'sourceModel',
    label: '源流程',
    component: 'ModelInfoSelector',
    required: true,
    componentProps: {
      title: '选择流程',
      formType: 0, // 0表示自定义表单
      placeholder: '请选择源流程',
      multiple: false,
    },
    colProps: {
      span: 8,
      lg: { span: 8, offset: 0 },
      sm: { span: 12, offset: 0 },
      xs: { span: 20, offset: 0 },
    },
  },
  {
    fieldName: 'categoryCode',
    label: '目标分类',
    required: true,
    component: 'TreeSelect',
    colProps: {
      span: 8,
      lg: { span: 8, offset: 0 },
      sm: { span: 12, offset: 0 },
      xs: { span: 20, offset: 0 },
    },
    componentProps: {
      treeNodeFilterProp: 'title',
      getPopupContainer: () => document.body,
    },
  },
];

export const bizFormSchema: FormSchema[] = [
  {
    fieldName: 'type',
    label: '类型',
    component: 'Input',
    defaultValue: 1,
    show: false,
  },
  {
    fieldName: 'sourceModel',
    label: '源流程',
    component: 'ModelInfoSelector',
    required: true,
    componentProps: {
      title: '选择流程',
      formType: 1, // 1表示业务表单
      placeholder: '请选择源流程',
      multiple: false,
    },
    colProps: {
      span: 8,
      lg: { span: 8, offset: 0 },
      sm: { span: 12, offset: 0 },
      xs: { span: 20, offset: 0 },
    },
  },
  {
    fieldName: 'categoryCode',
    label: '目标分类',
    required: true,
    component: 'TreeSelect',
    colProps: {
      span: 8,
      lg: { span: 8, offset: 0 },
      sm: { span: 12, offset: 0 },
      xs: { span: 20, offset: 0 },
    },
    componentProps: {
      treeNodeFilterProp: 'title',
      getPopupContainer: () => document.body,
    },
  },
  {
    fieldName: 'targetModelInfo',
    label: '目标流程',
    required: false,
    show: false,
    componentProps: {
      disabled: true,
      allowClear: false,
    },
    component: 'Input',
    colProps: {
      span: 8,
      lg: { span: 8, offset: 0 },
      sm: { span: 10, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
];

export const customTaskFormSchema: FormSchema[] = [
  {
    fieldName: 'type',
    label: '类型',
    component: 'Input',
    defaultValue: 0,
    show: false,
  },
  {
    fieldName: 'sourceModel',
    label: '源流程',
    component: 'ModelInfoSelector',
    required: true,
    componentProps: {
      title: '选择流程',
      formType: 0, // 0表示自定义表单
      placeholder: '请选择源流程',
      multiple: false,
    },
    colProps: {
      span: 8,
      lg: { span: 8, offset: 0 },
      sm: { span: 12, offset: 0 },
      xs: { span: 20, offset: 0 },
    },
  },
  {
    fieldName: 'categoryCode',
    label: '目标分类',
    required: true,
    component: 'TreeSelect',
    colProps: {
      span: 8,
      lg: { span: 8, offset: 0 },
      sm: { span: 12, offset: 0 },
      xs: { span: 20, offset: 0 },
    },
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
