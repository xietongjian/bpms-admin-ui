import type {VbenFormSchema as FormSchema} from '@vben/common-ui';

import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import { checkEntityExist } from '#/api/org/positionSeq';

import { OrderNoDefaultEnum, RemarkDefaultEnum,FormValidPatternEnum } from '#/enums/commonEnum';

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
    minWidth: 300,
    resizable: true,
    treeNode: true
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
    slots: {default: 'status'}
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
    label: '名称',
    // required: true,
    component: 'Input',
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(80, "字符长度不能大于80！")
  },
  {
    fieldName: 'code',
    label: '编码',
    // required: true,
    // rules: 'required',
    component: 'Input',
    dependencies: {
      rules(values) {
        const { id, code } = values;
        return z
            .string({
              required_error: "标识不能为空"
            })
            .min(1, "标识不能为空")
            .max(60, '字符长度不能大于60！')
            .regex(new RegExp(FormValidPatternEnum.SN), '请输入英文或数字且以英文或下划线开头！')
            .refine(
                async (e) => {
                  let result = false;
                  try {
                    result = await checkEntityExist({
                      id: id,
                      field: 'code',
                      fieldValue: code,
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
      triggerFields: ['code'],
    },
  },
  {
    fieldName: 'pid',
    label: '父级编码',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['pid']
    }
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
  {
    fieldName: 'note',
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
        .max(255, "字符长度不能大于255！")
        .nullish()
        .optional(),
  },
];
