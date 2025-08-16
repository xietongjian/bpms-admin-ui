import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/commonEnum';

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    minWidth: 200,
    align: 'left',
    slots: { default: 'nameRender' },
    treeNode: true
  },
  {
    title: '标识',
    field: 'sn',
    width: 100,
    align: 'left',
  },
  /*{
    title: '是否关联主体的签发人',
    field: 'refSubjectSigner',
    width: 100,
    align: 'center',
    customRender: ({record}) => {
      const enable = record.refSubjectSigner;
      const color = enable ? 'green' : 'red';
      const text = enable ? '是' : '否';
      return h(Tag, {color: color}, () => text);
    },
  },
  {
    title: '是否有签发人',
    field: 'haveSigner',
    width: 100,
    align: 'center',
    customRender: ({record}) => {
      const enable = record.haveSigner;
      const color = enable ? 'green' : 'red';
      const text = enable ? '是' : '否';
      return h(Tag, {color: color}, () => text);
    },
  },*/
  {
    title: '排序号',
    field: 'orderNo',
    width: 100,
    align: 'left',
  },
  {
    title: '签发人姓名',
    field: 'signerName',
    width: 100,
    align: 'left',
    slots: { default: 'signerNameRender' },
  },
  {
    title: '启用状态',
    field: 'status',
    width: 100,
    align: 'center',
    slots: {default: 'status'},
  },
  {
    title: '备注',
    field: 'remark',
    align: 'left',
  },
  {
    title: '操作',
    width: 120,
    align: 'center',
    slots: { default: 'action' },
    fixed: 'right',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称',
    },
    labelWidth: 60,
  },
];

export const formSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: '主键',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['id']
    }
  },
  {
    fieldName: 'pid',
    label: '父级ID',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['pid']
    }
  },
  {
    fieldName: 'name',
    label: '名称',
    component: 'Input',
    formItemClass: 'col-span-3',
    rules: z
        .string({
          required_error: '名称不能为空！'
        })
        .trim()
        .min(1, '名称不能为空！')
        .max(256, '字符长度不能大于256！'),
  },
  {
    fieldName: 'sn',
    label: '标识',
    component: 'Input',
    formItemClass: 'col-span-3',
    rules: z
        .string({
          required_error: '标识不能为空！'
        })
        .trim()
        .min(1, '标识不能为空！')
        .max(256, '字符长度不能大于256！')
        .regex(new RegExp(FormValidPatternEnum.SN), '请输入英文或数字且以英文或下划线开头！'),
  },
  {
    fieldName: 'style',
    label: '样式',
    component: 'Input',
    // slot: 'styleRenderSlot',
    formItemClass: 'col-span-3',
  },
  {
    fieldName: 'haveSigner',
    label: '是否有签发人',
    // colProps: { span: 6 },
    component: 'Switch',
    defaultValue: false,
    formItemClass: 'col-span-1',
    componentProps: {
      checkedChildren: '是',
      unCheckedChildren: '否',
    },
  },
  {
    fieldName: 'refSubjectSigner',
    component: 'RadioGroup',
    hideLabel: true,
    defaultValue: true,
    formItemClass: 'col-span-1',
    componentProps: {
      options: [
        {
          label: '关联主体的签发人',
          value: true,
        },
        {
          label: '自定义',
          value: false,
        },
      ],
    },
    dependencies: {
      triggerFields: ['haveSigner'],
      show: (values) => {
        return values.haveSigner
      },
      rules: (values) => {
        return values.haveSigner?'selectRequired': '';
      }
    },
  },
  {
    fieldName: 'signerSelector',
    hideLabel: true,
    component: 'PersonalSelector',
    componentProps: {
      placeholder: '请选择签发人',
    },
    formItemClass: 'col-span-1',
    dependencies: {
      triggerFields: ['haveSigner', 'refSubjectSigner'],
      show: (values) => {
        return values.haveSigner && !values.refSubjectSigner
      },
      rules: (values) => {
        return values.haveSigner && !values.refSubjectSigner?'selectRequired': '';
      }
    },
  },
  {
    fieldName: 'status',
    label: '启用状态',
    component: 'Switch',
    defaultValue: true,
    componentProps: {
      checkedChildren: '启用',
      unCheckedChildren: '禁用',
    },
    formItemClass: 'col-span-3',
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
    formItemClass: 'col-span-3',
  },
  {
    fieldName: 'remark',
    label: '备注',
    component: 'Textarea',
    formItemClass: 'col-span-3',
    rules: z
        .string()
        .max(512, "字符长度不能大于512！")
        .nullish()
        .optional(),
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
  },
];
