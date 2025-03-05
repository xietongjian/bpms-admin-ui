// import {BasicColumn} from '@/components/Table/src/types/table';
// import {FormSchema} from '@/components/Table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import type {VxeGridProps} from '#/adapter/vxe-table';
import {z} from "@vben/common-ui";

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'status',
    label: '',
    labelWidth: 0,
    component: 'RadioGroup',
    defaultValue: '',
    componentProps: {
      options: [
        {
          label: '所有',
          value: '',
        },
        {
          label: '未读',
          value: '0',
        },
        {
          label: '已读',
          value: '1',
        },
      ],
      placeholder: '请输入名称/编码',
    },
    labelWidth: 60,
    colProps: {span: 6, lg:{span: 6, offset:0}, sm:{span: 10, offset: 0}, xs:{span: 16, offset: 0}},
  },
  {
    fieldName: 'title',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/编码',
    },
    labelWidth: 60,
    colProps: {span: 6, lg:{span: 6, offset:0}, sm:{span: 10, offset: 0}, xs:{span: 16, offset: 0}},
  },
  /*{
    fieldName: 'dateRange',
    label: '发布时间',
    component: 'RangePicker',
    componentProps: {
      format: "YYYY-MM-DD"
    },
    labelWidth: 80,
    colProps: {span: 8},
  }*/
];
export const messageTableSchema: VxeGridProps['columns'] = [
  {
    title: '标题',
    field: 'title',
    align: 'left',
  },
  {
    title: '发送人',
    field: 'fromAssigneeName',
    width: 150,
    align: 'center',
  },
  {
    title: '类型',
    field: 'typeName',
    width: 150,
    align: 'center',
  },
  {
    title: '接收时间',
    width: 150,
    align: 'center',
    field: 'createTime',
  },
];
