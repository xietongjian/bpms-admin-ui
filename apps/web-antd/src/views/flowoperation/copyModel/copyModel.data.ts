import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {getFlowCategoryTreeData} from "#/api/base/category";

export const customFormSchema: FormSchema[] = [
  {
    fieldName: 'type',
    label: '类型',
    component: 'Input',
    defaultValue: 0,
    dependencies: {
      show: false,
      triggerFields: ["type"]
    }
  },
  {
    fieldName: 'sourceModel',
    label: '源流程',
    component: 'FlowModelSelector',
    // required: true,
    componentProps: {
      title: '选择流程',
      formType: 0, // 0表示自定义表单
      placeholder: '请选择源流程',
      multiple: false,
    },
  },
  {
    fieldName: 'categoryCode',
    label: '目标分类',
    rules: 'selectRequired',
    component: 'ApiTreeSelect',
    componentProps: {
      class: 'w-full',
      labelField: 'label',
      valueField: 'value',
      childrenField: 'children',
      api: getFlowCategoryTreeData,
    },
  },
];

export const bizFormSchema: FormSchema[] = [
  {
    fieldName: 'type',
    label: '类型',
    component: 'Input',
    defaultValue: 1,
    dependencies: {
      show: false,
      triggerFields: ["type"]
    }
  },
  {
    fieldName: 'sourceModel',
    label: '源流程',
    component: 'FlowModelSelector',
    // required: true,
    componentProps: {
      title: '选择流程',
      formType: 1, // 1表示业务表单
      placeholder: '请选择源流程',
      multiple: false,
    },
  },
  {
    fieldName: 'categoryCode',
    label: '目标分类',
    rules: 'selectRequired',
    component: 'ApiTreeSelect',
    componentProps: {
      class: 'w-full',
      labelField: 'label',
      valueField: 'value',
      childrenField: 'children',
      api: getFlowCategoryTreeData,
    },
  },
  {
    fieldName: 'targetModelInfo',
    label: '目标流程',
    dependencies: {
      show: false,
      triggerFields: ["targetModelInfo"]
    },
    componentProps: {
      disabled: true,
      allowClear: false,
    },
    component: 'Input',
  },
];

export const customTaskFormSchema: FormSchema[] = [
  {
    fieldName: 'type',
    label: '类型',
    component: 'Input',
    defaultValue: 0,
    dependencies: {
      show: false,
      triggerFields: ["type"]
    }
  },
  {
    fieldName: 'sourceModel',
    label: '源流程',
    component: 'ModelInfoSelector',
    // required: true,
    componentProps: {
      title: '选择流程',
      formType: 0, // 0表示自定义表单
      placeholder: '请选择源流程',
      multiple: false,
    },

  },
  {
    fieldName: 'categoryCode',
    label: '目标分类',
    // required: true,
    rules: 'selectRequired',
    component: 'TreeSelect',
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
