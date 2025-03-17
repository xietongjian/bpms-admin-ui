import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import type {VxeGridProps} from '#/adapter/vxe-table';

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
  },
  {
    fieldName: 'title',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/编码',
      allowClear: true
    },
    labelWidth: 60,
  },
];
export const messageTableSchema: VxeGridProps['columns'] = [
  {
    title: '标题',
    field: 'title',
    align: 'left',
    slots: {default: 'formName'}
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
