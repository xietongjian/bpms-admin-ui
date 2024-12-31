/**
 * @desc mongoManagement.data
 * @author DragonTeam <https://www.bpmport.com>
 * @since 2024/9/28 18:58
 */
import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';

export const SyncForm: FormSchema[] = [
  {
    label: '时间选择',
    field: 'date',
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

export const mongoJobColumns: BasicColumn[] = [
  {
    title: '任务',
    dataIndex: 'label',
    align: 'left',
    width: 240,
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    align: 'left',
    width: 200,
  },
  {
    title: '截止时间',
    dataIndex: 'endTime',
    align: 'left',
    width: 200,
  },
];
