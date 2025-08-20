import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/commonEnum';
import {checkEntityExist} from "#/api/portal/cms/newsCategory";

const colorList = [
  '',
  '#547BD5',
  '#5CCDB2',
  '#FF4D4F',
  '#B57DD7',
  '#F1A347',
  '#00af57',
  '#00afee',
  '#0071be',
  '#00215f',
  '#72349d',
];

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    minWidth: 200,
    align: 'left',
    slots: { default: 'name' },
    resizable: true,
    treeNode: true
  },
  {
    title: '标识',
    field: 'sn',
    align: 'left',
  },
  {
    title: '启用状态',
    field: 'status',
    width: 80,
    align: 'center',
    slots: {default: 'status'},
  },
  {
    title: '排序号',
    field: 'orderNo',
    width: 80,
    align: 'right',
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
      allowClear: true,
      placeholder: '请输入关键字',
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
    fieldName: 'name',
    label: '名称',
    component: 'Input',
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
    dependencies: {
      rules(values) {
        const { id, sn } = values;
        return z
            .string({
              required_error: "编码不能为空！"
            })
            .min(1, "编码不能为空！")
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
    fieldName: 'style',
    label: '样式',
    component: 'Input',
  },
  {
    fieldName: 'pid',
    label: '父级分类ID',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['pid']
    }
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
