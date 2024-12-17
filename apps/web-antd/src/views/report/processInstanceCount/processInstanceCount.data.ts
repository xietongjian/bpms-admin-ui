/**
 * @desc processInstanceCount.data
 * @author DragonTeam <https://www.bpmport.com>
 * @since 2024/10/10 14:12
 */
import { FormSchema } from '@/components/Form';

export const searchFormSchema: FormSchema[] = [
  {
    field: 'formName',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入查询关键字',
    },
    labelWidth: 80,
    colProps: {
      span: 12,
    },
  },
  {
    field: 'modelKey',
    label: '流程',
    component: 'ModelInfoSelector',
    componentProps: {
      placeholder: '请选择流程',
    },
    labelWidth: 80,
    colProps: {
      span: 12,
    },
  },
  {
    field: 'opType',
    slot: 'opType',
    label: '统计方式',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'date',
    label: '时间选择',
    component: 'DatePicker',
    componentProps: {
      showTime: false,
      picker: 'date',
    },
    colProps: {
      span: 12,
    },
  },
];
