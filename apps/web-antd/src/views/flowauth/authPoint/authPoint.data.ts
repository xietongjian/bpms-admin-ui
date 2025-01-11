import { z } from '#/adapter/form';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import type { VxeGridProps } from '#/adapter/vxe-table';
import {FormValidPatternEnum, OrderNoDefaultEnum, RemarkDefaultEnum} from '#/enums/commonEnum';
import { checkEntityExist } from '#/api/flowauth/authPoint';


export const columns: VxeGridProps['columns'] = [
  {
    title: '功能点名',
    field: 'name',
    minWidth: 300,
    align: 'left',
  },
  {
    title: '标识',
    field: 'sn',
    width: 300,
    align: 'left',
  },
  {
    title: '是否默认',
    field: 'ifDefault',
    width: 80,
    slots: { default: 'ifDefault' },
  },
  {
    title: '排序号',
    field: 'orderNo',
    width: 100,
    align: 'right',
  },
  {
    title: '备注',
    field: 'remark',
    align: 'left',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: {default: 'action'},
    title: '操作',
    width: 120,
  },
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
  },
];

export const formSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: '表id',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['id'],
    }
  },
  {
    fieldName: 'name',
    label: '功能点名',
    component: 'Input',
    rules: z
        .string({
          required_error: '功能点名不能为空',
        })
        .trim()
        .min(1, "功能点名不能为空")
        .max(96, "字符长度不能大于96！")
  },
  {
    fieldName: 'sn',
    label: '标识',
    component: 'Input',
    dependencies: {
      rules(values) {
        const { id, sn } = values;
        return z
          .string({
            required_error: "标识不能为空"
          })
          .min(1, "标识不能为空")
          .max(64, '最多输入64个字符')
          .regex(new RegExp(FormValidPatternEnum.SN), '请输入英文或数字')
          .refine(
            async () => {
              let result = false;
              try {
                result = await checkEntityExist({
                  id: id,
                  field: 'sn',
                  fieldValue: sn || '',
                  fieldName: '标识',
                });
              } catch (e) {
                console.error(e);
              }
              return result;
            },
            {
              message: '标识已存在',
            },
          );
      },
      triggerFields: ['sn'],
    },
  },
  {
    fieldName: 'ifDefault',
    label: '是否默认',
    component: 'Switch',
    componentProps: {
      checkedValue: 1,
      unCheckedValue: 0,
      checkedChildren: '是',
      unCheckedChildren: '否',
    },
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
    fieldName: 'remark',
    label: '备注',
    component: 'Textarea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    rules: z
        .string()
        .max(1500, "字符长度不能大于1500！")
        .nullable()
        .optional()
  },
];
