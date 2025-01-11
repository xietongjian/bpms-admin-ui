import { OrderNoDefaultEnum, RemarkDefaultEnum,FormValidPatternEnum } from '#/enums/commonEnum';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { z } from '#/adapter/form';
import {checkEntityExist} from '#/api/org/role';

export const columns: VxeGridProps['columns']  = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
    resizable: true,
  },
  {
    title: '编码',
    field: 'sn',
    align: 'left',
    width: 200,
    resizable: true,
  },
  {
    title: '类型',
    field: 'type',
    width: 120,
    slots: {default: 'type'},
  },
  {
    title: '排序号',
    field: 'orderNo',
    width: 80,
    align: 'right',
  },
  {
    title: '修改时间',
    field: 'updateTime',
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
      triggerFields: ['']
    }
  },
  {
    fieldName: 'type',
    label: '类型',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '公司矩阵角色', value: 1 },
        { label: '部门矩阵角色', value: 2 },
      ],
    },
  },
  {
    fieldName: 'name',
    label: '名称',
    component: 'Input',
    rules: z
        .string({required_error: '编码不能为空！'})
        .min(1, {message: '编码不能为空！'})
        .max(64, {message: '字符长度不能大于64！'}),
  },
  {
    fieldName: 'sn',
    label: '编码',
    component: 'Input',
    dependencies: {
      rules(values) {
        const { id, sn } = values;
        return z
            .string({
              required_error: "编码不能为空"
            })
            .min(1, "编码不能为空")
            .max(100, '最多输入100个字符')
            .regex(new RegExp(FormValidPatternEnum.SN), '请输入英文或数字')
            .refine(
                async (e) => {
                  let result = false;
                  try {
                    result = await checkEntityExist({
                      id: id,
                      field: 'sn',
                      fieldValue: sn || '',
                      fieldName: '编码',
                    });
                  } catch (e) {
                    console.error(e);
                  }
                  return result;
                },
                {
                  message: '编码已存在',
                },
            );
      },
      triggerFields: ['sn'],
    },
  },
  {
    fieldName: 'companyId',
    label: '所属公司',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: [""]
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
    rules: z
        .string()
        .max(1024, "字符长度不能大于1024！")
        .nullish()
        .optional(),
  },
];
