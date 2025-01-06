import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import type {VxeGridProps} from '#/adapter/vxe-table';

export const SyncForm: FormSchema[] = [
  {
    label: '时间选择',
    fieldName: 'date',
    rules: 'selectRequired',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
    },
  },
];

export const mongoJobColumns: VxeGridProps['columns'] = [
  {
    title: '任务',
    field: 'label',
    align: 'left',
    minWidth: 240,
  },
  {
    title: '开始时间',
    field: 'startTime',
    align: 'left',
    width: 200,
    slots: {default: 'startTime'}
  },
  {
    title: '截止时间',
    field: 'endTime',
    align: 'left',
    width: 200,
    slots: {default: 'endTime'}
  },
  {
    field: 'action',
    fixed: 'right',
    slots: {default: 'action'},
    title: '操作',
    width: 200,
  },
];
