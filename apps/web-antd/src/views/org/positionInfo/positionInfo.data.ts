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
    minWidth: 300,
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
    slots: {default: 'status'}
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
    component: 'Input',
    rules: z
        .string({
          required_error: '岗位名称不能为空',
        })
        .trim()
        .min(1, "岗位名称不能为空")
        .max(80, "字符长度不能大于80！"),
  },
  {
    fieldName: 'code',
    label: '编码',
    // required: true,
    component: 'Input',
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
    componentProps: {

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
  },
];
