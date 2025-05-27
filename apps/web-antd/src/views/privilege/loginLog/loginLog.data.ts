import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const columns: VxeGridProps['columns'] = [
  {
    type: 'checkbox',
    title: '访问IP',
    field: 'ip',
    minWidth: 100,
    align: 'left',
    showHeaderOverflow: true,
  },
  {
    title: '操作人ID',
    field: 'operationId',
    width: 300,
    align: 'left',
    showHeaderOverflow: true,
  },
  {
    title: '操作人工号',
    field: 'operationPerson',
    width: 100,
    align: 'left',
    showHeaderOverflow: true,
  },
  {
    title: '操作人姓名',
    field: 'operationUsername',
    width: 100,
    align: 'left',
    showHeaderOverflow: true,
  },
  {
    title: '操作内容',
    field: 'operationContent',
    width: 100,
    align: 'left',
    showHeaderOverflow: true,
  },
  {
    title: '操作时间',
    field: 'operationTime',
    width: 200,
    align: 'left',
    // customRender: ({ text }) => {
    //   return formatToDateTime(text);
    // },
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
      allowClear: true,
    },
    labelWidth: 60,
  },
  {
    fieldName: 'dateRange',
    label: '时间范围',
    component: 'RangePicker',
    labelWidth: 80,
  },
];

export const formSchema: FormSchema[] = [
  {
    fieldName: 'ip',
    label: '访问ip',
    component: 'Input',
  },
  {
    fieldName: 'operationId',
    label: '操作人id',
    component: 'Input',
  },
  {
    fieldName: 'operationUsername',
    label: '操作人的姓名',
    component: 'Input',
    /*rules: [
      {
        whitespace: true,
        message: '操作人的姓名不能为空！',
      },
      {
        max: 32,
        message: '字符长度不能大于32！',
      },
    ],*/
  },
  {
    fieldName: 'operationPerson',
    label: '操作人姓名',
    component: 'Input',
  },
  {
    fieldName: 'operationContent',
    label: '操作内容',
    component: 'Input',
  },
  {
    fieldName: 'operationTime',
    label: '操作时间',
    component: 'DatePicker',
  },
];
