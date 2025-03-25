import {useVbenVxeGrid} from '#/adapter/vxe-table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { OrderNoDefaultEnum } from '#/enums/commonEnum';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { checkEntityExist } from '#/api/org/positionInfo';
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';


export const columns: VxeGridProps['columns'] = [
  {
    title: '岗位名称',
    field: 'name',
    align: 'left',
    width: 300,
    resizable: true,
  },
  {
    title: '编码',
    field: 'code',
    align: 'left',
    width: 200,
    resizable: true,
  },

  {
    title: '排序编号',
    field: 'orderNo',
    width: 100,
    align: 'right',
  },
  {
    title: '状态',
    field: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '成立日期',
    field: 'startDate',
    width: 100,
    align: 'left',
  },
  {
    title: '操作',
    width: 120,
    align: 'center',
    slots: { default: 'action' },
    fixed: 'right',
  }
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/编码',
      allowClear: true,
    },
    labelWidth: 60,
    colProps: {
      span: 6,
      lg: { span: 6, offset: 0 },
      sm: { span: 10, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
];

export const formSchema: FormSchema[] = [
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
    label: '岗位名称',
    // required: true,
    component: 'Input',
    show: true,
   /* rules: [
      {
        required: true,
        whitespace: true,
        message: '岗位名称不能为空！',
      },
      {
        max: 80,
        message: '字符长度不能大于80！',
      },
    ],*/
    colProps: {
      span: 24,
    },
  },
  {
    fieldName: 'code',
    label: '编码',
    // required: true,
    component: 'Input',
    show: true,
    colProps: {
      span: 24,
    },
  },
  {
    fieldName: 'positionSeqId',
    label: '岗位序列ID',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['positionSeqId']
    }
  },
  {
    fieldName: 'positionSeqCode',
    label: '岗位序列编码',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['positionSeqCode']
    }
  },

  {
    fieldName: 'startDate',
    label: '成立日期',
    component: 'DatePicker',
    show: true,
    componentProps: {
      getPopupContainer: () => document.body,
    },
    colProps: {
      span: 24,
    },
  },
  {
    fieldName: 'orderNo',
    label: '排序编号',
    help: '数值越小越靠前！',
    component: 'InputNumber',
    defaultValue: OrderNoDefaultEnum.VALUE,
    componentProps: {
      min: OrderNoDefaultEnum.MIN,
      max: OrderNoDefaultEnum.MAX,
    },
    show: true,
  },
  {
    fieldName: 'status',
    label: '状态',
    component: 'Switch',
    defaultValue: 1,
    componentProps: {
      checkedValue: 1,
      unCheckedValue: 0,
      checkedChildren: '启用',
      unCheckedChildren: '停用',
    },
    colProps: {
      span: 24,
    },
  },
];
