import { BasicColumn, FormSchema } from '@/components/Table';

export const baseColumns: BasicColumn[] = [
  {
    title: '名称',
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

export const searchFormSchema: FormSchema[] = [
  /*{
    field: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/编码',
    },
    labelWidth: 60,
    colProps: {span: 6, lg:{span: 6, offset:0}, sm:{span: 10, offset: 0}, xs:{span: 16, offset: 0}},
  },*/
  {
    field: 'dateRange',
    label: '时间范围',
    component: 'RangePicker',
    labelWidth: 70,
    colProps: {
      span: 8,
      lg: { span: 8, offset: 0 },
      sm: { span: 8, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
];

export const modelInfoFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'categoryCode',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(200, "字符长度不能大于200！")
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 200,
        message: '字符长度不能大于200！',
      },
    ],*/
  },
  {
    field: 'modelKey',
    label: '标识',
    component: 'Input',
    required: true,
  },
  {
    field: 'appSn',
    label: '所属系统',
    component: 'Select',
    componentProps: {
      getPopupContainer: () => document.body,
    },
    required: true,
  },
];

export const copyModelInfoFormSchema: FormSchema[] = [
  {
    field: 'fromModelKey',
    label: '来源ModelKey',
    component: 'Input',
    show: false,
  },
  {
    field: 'newModelName',
    label: '新表单名称',
    component: 'Input',
    required: true,
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(200, "字符长度不能大于200！")
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 200,
        message: '字符长度不能大于200！',
      },
    ],*/
  },
  {
    field: 'newCategoryCode',
    label: '新分类',
    required: true,
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
