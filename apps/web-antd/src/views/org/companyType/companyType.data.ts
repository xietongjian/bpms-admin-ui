import type { VxeGridProps } from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { OrderNoDefaultEnum, RemarkDefaultEnum, FormValidPatternEnum } from '#/enums/commonEnum';
import { checkEntityExist } from '#/api/org/companyType';

import {z} from "@vben/common-ui";

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
    resizable: true,
    treeNode: true,
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
    title: '描述',
    field: 'descr',
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

export const formSchema : FormSchema[] = [
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
    fieldName: 'pid',
    label: 'pid',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['']
    }
  },
  {
    fieldName: 'name',
    label: '名称',
    component: 'Input',
    rules: z
        .string({required_error: '名称不能为空！'})
        .min(1, {message: '名称不能为空！'})
        .max(64, {message: '字符长度不能大于64！'}),
  },
  {
    fieldName: 'code',
    label: '编码',
    component: 'Input',
    dependencies: {
      rules(values) {
        const { id, code } = values;
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
                  field: 'code',
                  fieldValue: code || '',
                  fieldName: '类型编码',
                });
              } catch (e) {
                console.error(e);
              }
              return result;
            },
            {
              message: '类型编码已存在',
            },
          );
      },
      triggerFields: ['sn'],
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
    fieldName: 'descr',
    label: '描述',
    component: 'Textarea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    rules: z
      .string()
      .max(64, "字符长度不能大于64！")
      .nullish()
      .optional(),
  },
];