import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';

import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';

export const SyncForm: FormSchema[] = [
  {
    label: '时间选择',
    fieldName: 'date',
    required: true,
    component: 'DatePicker',
    componentProps: {
      showTime: true,
    },
    colProps: {
      span: 24,
    },
  },
];

export const mongoJobColumns: VxeGridProps['columns'] = [
  {
    title: '任务',
    field: 'label',
    align: 'left',
    width: 240,
  },
  {
    title: '开始时间',
    field: 'startTime',
    align: 'left',
    width: 200,
  },
  {
    title: '截止时间',
    field: 'endTime',
    align: 'left',
    width: 200,
  },
];
