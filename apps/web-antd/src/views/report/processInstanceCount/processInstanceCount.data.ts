import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { z } from '#/adapter/form';

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'formName',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入查询关键字',
      allowClear: true,
    },
    labelWidth: 80,
  },
  {
    fieldName: 'modelKey',
    label: '流程',
    component: 'ModelInfoSelector',
    componentProps: {
      placeholder: '请选择流程',
    },
    labelWidth: 80,
  },
  {
    fieldName: 'opType',
    slot: 'opType',
    label: '统计方式',
    colProps: {
      span: 12,
    },
  },
  {
    fieldName: 'date',
    label: '时间选择',
    component: 'DatePicker',
    componentProps: {
      showTime: false,
      picker: 'date',
    },
  },
];
