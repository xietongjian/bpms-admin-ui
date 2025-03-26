import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import type { VxeGridProps } from '#/adapter/vxe-table';
import { OrderNoDefaultEnum } from '#/enums/commonEnum';

export const InstitutionalClassificationColumns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
    minWidth: 300,
    treeNode: true,
    resizable: true,
  },
  {
    title: '编码',
    field: 'code',
    align: 'left',
    width: 100,
    resizable: true,
  },
  {
    title: '排序',
    field: 'orderNo',
    align: 'right',
    width: 80,
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 180,
  },
  {
    width: 120,
    title: '操作',
    field: 'action',
    fixed: 'right',
    slots: {
      default: 'action'
    }
  }
];

export const InstitutionalClassificationSearchForm: FormSchema[] = [
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
];

export const InstitutionalClassificationFormSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [""]
    }
  },
  {
    fieldName: 'pid',
    label: 'pid',
    required: false,
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [""]
    }
  },
  {
    fieldName: 'name',
    label: '名称',
    required: true,
    component: 'Input',
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 64,
        message: '字符长度不能大于64！',
      },
    ],*/
    colProps: {
      span: 24,
    },
  },
  {
    fieldName: 'code',
    label: '编码',
    required: true,
    component: 'Input',
  },
  {
    fieldName: 'orderNo',
    label: '排序号',
    helpMessage: '数值越小越靠前！',
    component: 'InputNumber',
    defaultValue: OrderNoDefaultEnum.VALUE,
    componentProps: {
      min: OrderNoDefaultEnum.MIN,
      max: OrderNoDefaultEnum.MAX,
    },
  },
];
