import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import { getBoardTypes, checkEntityExist } from '#/api/portal/cms/board';
import {FormValidPatternEnum, OrderNoDefaultEnum, RemarkDefaultEnum} from '#/enums/commonEnum';

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    minWidth: 250,
    align: 'left',
  },
  {
    title: '标识',
    field: 'sn',
    width: 200,
    align: 'left',
  },
  {
    title: '类型',
    field: 'type',
    width: 100,
    align: 'left',
    slots: { default: 'typeRender' }
  },
  {
    title: '启用状态',
    field: 'status',
    width: 100,
    align: 'center',
    slots: { default: 'status' },
  },
  {
    title: '排序号',
    field: 'orderNo',
    width: 100,
    align: 'left',
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
    fieldName: 'type',
    label: '类型',
    component: 'ApiSelect',
    componentProps: {
      api: getBoardTypes,
      allowClear: true,
      placeholder: '请选择类型',
    },
    labelWidth: 60,
  },
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      allowClear: true,
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
    fieldName: 'type',
    label: '类型',
    component: 'ApiSelect',
    componentProps: {
      class: 'w-full',
      api: getBoardTypes,
      placeholder: '请选择类型',
    },
    rules: 'selectRequired'
  },
  {
    fieldName: 'name',
    label: '名称',
    component: 'Input',
    rules: z
        .string({
          required_error: '名称不能为空！'
        })
        .min(1, "名称不能为空！")
        .max(255, "字符长度不能大于255！"),
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
              required_error: "标识不能为空！"
            })
            .min(1, "标识不能为空！")
            .max(30, '字符长度不能大于30！')
            .regex(new RegExp(FormValidPatternEnum.SN), '请输入英文或数字且以英文或下划线开头！')
            .refine(
                async (e) => {
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
    fieldName: 'status',
    label: '启用状态',
    component: 'Switch',
    defaultValue: true,
    componentProps: {
      checkedChildren: '启用',
      unCheckedChildren: '禁用',
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
