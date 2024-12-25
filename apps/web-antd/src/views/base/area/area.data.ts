import {FormValidPatternEnum, OrderNoDefaultEnum} from '#/enums/commonEnum';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { z } from '#/adapter/form';
import { checkEntityExist } from '#/api/base/area';

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
    treeNode: true
  },
  {
    title: '编码',
    field: 'code',
    width: 300,
    align: 'left',
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
      placeholder: '请输入名称/编码',
    },
    labelWidth: 60,
  },
];

export const formSchema: FormSchema[] = [
  {
    fieldName: 'pcode',
    label: 'pcode',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: [''],
    }
  },
  {
    fieldName: 'name',
    label: '名称',
    component: 'Input',
    rules: z
        .string({
          required_error: '全称不能为空！',
        })
        .trim()
        .min(1, "全称不能为空！")
        .max(32, "字符长度不能大于32！"),
  },
  {
    fieldName: 'code',
    label: '编码',
    component: 'Input',
    dependencies: {
      rules(values) {
        const { code } = values;
        return z
            .string({
              required_error: "编码不能为空"
            })
            .min(1, "编码不能为空")
            .max(10, '最多输入10个字符')
            .regex(new RegExp(FormValidPatternEnum.SN), '请输入英文或数字')
            .refine(
                async (e) => {
                  let result = false;
                  try {
                    result = await checkEntityExist({
                      id: code,
                      field: 'code',
                      fieldValue: code || '',
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
      triggerFields: ['code'],
    },
  },
];
