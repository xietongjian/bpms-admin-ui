import { OrderNoDefaultEnum } from '#/enums/constantEnum';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { z } from '#/adapter/form';

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
    width: 300,
    resizable: true,
  },
  {
    title: '编码',
    field: 'code',
    align: 'left',
  },
  {
    title: '排序号',
    field: 'orderNo',
    width: 100,
    align: 'right',
  },
  /*{
    title: '创建人',
    field: 'creator',
    width: 100,
    align: 'left',
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 100,
    align: 'left',
  },
  {
    title: '修改人',
    field: 'updator',
    width: 100,
    align: 'left',
  },
  {
    title: '修改时间',
    field: 'updateTime',
    width: 100,
    align: 'left',
  }*/
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/编码',
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
      triggerFields: ["id"]
    }
  },
  {
    fieldName: 'name',
    label: '名称',
    component: 'Input',
    rules: z
        .string({
          required_error: '名称不能为空！'
        })
        .min(1, {message: '名称不能为空！'})
        .max(80, {message: '字符长度不能大于80！'}),

  },
  {
    fieldName: 'code',
    label: '编码',
    component: 'Input',
    rules: 'required',
  },
  {
    fieldName: 'typeId',
    label: '类型ID',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'typeCode',
    label: '类别编码',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'orderNo',
    label: '排序号',
    helpMessage: '数值越小越靠前！',
    required: false,
    component: 'InputNumber',
    defaultValue: OrderNoDefaultEnum.VALUE,
    componentProps: {
      min: OrderNoDefaultEnum.MIN,
      max: OrderNoDefaultEnum.MAX,
    },
    show: true,
  },
];