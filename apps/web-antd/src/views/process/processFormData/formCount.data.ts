import type { VbenFormSchema } from '#/adapter/form';

export const baseColumns = [
  {
    title: '流程标题',
    dataIndex: 'name',
    align: 'left',
    minWidth: 300,
    width: 300,
    resizable: true,
  },
  {
    title: 'KEY',
    dataIndex: 'modelKey',
    width: 100,
    align: 'left',
    resizable: true,
  },
];

export const searchFormSchema: VbenFormSchema[] = [
  {
    fieldName: 'title',
    label: '流程标题',
    component: 'Input',
    componentProps: {
      placeholder: '请输入标题',
    },
    colProps: {
      span: 8,
    },
  },
];

export const modelInfoFormSchema: VbenFormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    ifShow: false,
  },
  {
    fieldName: 'categoryCode',
    label: 'ID',
    component: 'Input',
    ifShow: false,
  },
  {
    fieldName: 'name',
    label: '流程标题',
    component: 'Input',
    required: true,
    rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空',
      },
      {
        max: 200,
        message: '最多200个字符',
      },
    ],
  },
  {
    fieldName: 'modelKey',
    label: '流程Key',
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
    required: true,
  },
];

export const editProcessTitleFormSchema: VbenFormSchema[] = [
  {
    fieldName: 'procInstId',
    label: '流程实例ID',
    component: 'Input',
    ifShow: false,
  },
  {
    fieldName: 'tableName',
    label: '表名',
    component: 'Input',
    ifShow: false,
  },
  {
    fieldName: 'formName',
    label: '流程标题',
    component: 'Input',
    required: true,
    rules: [
      {
        required: true,
        whitespace: true,
        message: '流程标题不能为空',
      },
      {
        max: 500,
        message: '最多500个字符',
      },
    ],
    colProps: {
      span: 24,
    },
  },
];
