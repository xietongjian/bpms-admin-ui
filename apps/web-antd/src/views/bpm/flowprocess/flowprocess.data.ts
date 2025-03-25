import type { VxeGridProps } from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { RemarkDefaultEnum } from '@/enums/constantEnum';

const colProps = {
  span: 24,
};
export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    width: 400,
    align: 'left',
  },
  {
    title: '描述',
    field: 'descr',
    align: 'left',
  },
  {
    title: '创建人',
    field: 'creator',
    width: 120,
    align: 'left',
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 150,
    align: 'left',
  },
];

export const formSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'pid',
    label: '父id',
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'name',
    label: '名称',
    component: 'Input',
    required: true,
    rules: [
      {
        whitespace: true,
        required: true,
        message: '名称不能为空！',
      },
      {
        pattern: new RegExp('^.{1,40}$'),
        type: 'string',
        message: '字符长度不能大于40！',
      },
    ],
    colProps,
  },
  {
    label: '备注',
    fieldName: 'descr',
    component: 'InputTextArea',
    rules: [
      {
        max: 256,
        message: '字符长度不能大于256！',
      },
    ],
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS + 1,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    colProps,
  },
];
