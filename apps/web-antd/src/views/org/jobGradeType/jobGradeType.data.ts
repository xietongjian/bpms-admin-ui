import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/constantEnum';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import {checkEntityExist} from "#/api/base/app";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';

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
    width: 200,
    resizable: true,
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
    title: '排序编号',
    field: 'orderNo',
    width: 100,
    align: 'right',
  },
  {
    title: '备注',
    field: 'note',
    align: 'left',
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
    label: '',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['']
    }
  },
  {
    fieldName: 'code',
    label: '编码',
    required: true,
    component: 'Input',
    show: true,
    colProps: {
      span: 24,
    },
  },
  {
    fieldName: 'name',
    label: '名称',
    required: true,
    component: 'Input',
    show: true,
    rules: z
        .string({required_error: '名称不能为空！'})
        .min(1, {message: '名称不能为空！'})
        .max(80, {message: '字符长度不能大于80！'}),
    colProps: {
      span: 24,
    },
  },
  {
    fieldName: 'status',
    label: '状态',
    required: false,
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
  {
    fieldName: 'orderNo',
    label: '排序编号',
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
  {
    fieldName: 'note',
    label: '备注',
    required: false,
    component: 'InputTextArea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    show: true,
    rules: z
        .string()
        .max(1024, "字符长度不能大于1024！")
        .nullish()
        .optional(),
    colProps: {
      span: 24,
    },
  },
];