import {useVbenVxeGrid} from '#/adapter/vxe-table';
import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/commonEnum';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import type {VxeGridProps} from '#/adapter/vxe-table';


export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
    resizable: true,
  },
  {
    title: '编码',
    field: 'sn',
    width: 120,
    align: 'left',
    resizable: true,
  },
  {
    title: '所属公司',
    field: 'companies',
    align: 'center',
    width: 100,
    resizable: false,
    slots: { default: 'companies' }
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 180,
  },
  {
    field: 'action',
    fixed: 'right',
    slots: {default: 'action'},
    title: '操作',
    width: 120,
  },
];

export const personalColumns: VxeGridProps['columns'] = [
  {
    title: '操作',
    field: 'action',
    width: 50,
    slots: { customRender: 'action' },
  },
  {
    field: 'name',
    align: 'left',
    width: 200,
    slots: { title: 'customName' },
    customRender: ({ record }) => {
      return record.name + ' - [' + record.code + ']';
    },
  },
  {
    title: '所属公司',
    field: 'companyName',
    align: 'left',
    // width: 200,
  },
  {
    title: '所属部门',
    field: 'deptName',
    align: 'left',
    // width: 200,
  },
  /*{
    title: '配置管辖范围',
    field: 'setManagerRange',
    align: 'center',
    slots: { align:'right',customRender: 'setManagerRange' },
  },*/
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/标识',
      allowClear: true,
    },
    labelWidth: 60,
  },
];

export const roleFormSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['id']
    }
  },
  {
    fieldName: 'name',
    label: '名称',
    component: 'Input',
    required: true,
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '编码不能为空！',
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
    fieldName: 'sn',
    label: '编码',
    component: 'Input',
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    fieldName: 'companyId',
    label: '所属公司',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['companyId']
    }
  },
  {
    fieldName: 'orderNo',
    label: '排序号',
    help: '数值越小越靠前！',
    component: 'InputNumber',
    defaultValue: OrderNoDefaultEnum.VALUE,
    componentProps: {
      min: OrderNoDefaultEnum.MIN,
      max: OrderNoDefaultEnum.MAX,
    },
  },
  {
    label: '备注',
    fieldName: 'note',
    component: 'Textarea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    /*rules: [
      {
        max: 1024,
        message: '字符长度不能大于1024！',
      },
    ],*/
  },
];
