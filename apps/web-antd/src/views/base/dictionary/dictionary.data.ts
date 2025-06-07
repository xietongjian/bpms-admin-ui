import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { FormValidPatternEnum, RemarkDefaultEnum, OrderNoDefaultEnum } from '#/enums/commonEnum';
import { checkEntityExist, checkDictItemEntityExist} from '#/api/base/dictionary';

// #######################数据字典属性配置
export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'cname',
    align: 'left',
    type: 'radio'
  },
  /*  {
    title: '英文名称',
    field: 'ename',
    align: 'left',
  },*/
  {
    title: '编码',
    field: 'code',
    width: 120,
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
      placeholder: '请输入名称/标识',
      allowClear: true,
    },
    labelWidth: 60,
  },
];

export const dictionaryFormSchema: FormSchema[] = [
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
    fieldName: 'dicTypeId',
    label: 'dicTypeId',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['']
    }
  },
  {
    fieldName: 'cname',
    label: '名称',
    component: 'Input',
    rules: z
        .string({
          required_error: '名称不能为空！'
        })
        .trim()
        .min(1, '名称不能为空！')
        .max(60, "字符长度不能大于60！"),
  },
  /*{
    fieldName: 'ename',
    label: '英文名称',
    component: 'Input',
    required: true,
    rules: [
      {
        whitespace: true,
        required: true,
        message: '名称不能为空！',
      },
      {
        pattern: new RegExp('^[0-9a-zA-Z\-_]{1,}$'),
        type: 'string',
        message: '请输入英文或数字！',
      },
      {
        pattern: new RegExp('^.{1,60}$'),
        type: 'string',
        message: '字符长度不能大于60！',
      },
    ],
  },*/
  {
    fieldName: 'code',
    label: '编码',
    component: 'Input',
    dependencies: {
      rules(values) {
        const { id, code } = values;
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
  {
    label: '备注',
    fieldName: 'remark',
    component: 'Textarea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    rules: z
        .string()
        .max(200, "字符长度不能大于200！")
        .nullish()
        .optional(),
  },
];

// #######################数据字典项属性配置
export const itemColumns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'cname',
    align: 'left',
  },
  /*{
    title: '英文名称',
    field: 'ename',
    align: 'left',
  },*/
  {
    title: '编码',
    field: 'code',
    width: 120,
    align: 'left',
  },
  {
    title: '排序编号',
    field: 'orderNo',
    width: 80,
    align: 'right',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: {default: 'action'},
    title: '操作',
    width: 120,
  },
];

export const dictionaryItemSearchFormSchema: FormSchema[] = [
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

export const dictionaryItemFormSchema: FormSchema[] = [
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
    fieldName: 'mainId',
    label: 'mainId',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['']
    }
  },
  {
    fieldName: 'cname',
    label: '名称',
    component: 'Input',
    rules: z
        .string({
          required_error: '名称不能为空！'
        })
        .trim()
        .min(1, '名称不能为空！')
        .max(60, "字符长度不能大于60！"),
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
              required_error: "编码不能为空！"
            })
            .min(1, "编码不能为空！")
            .max(30, '字符长度不能大于30！')
            .regex(new RegExp(FormValidPatternEnum.SN), '请输入英文或数字且以英文或下划线开头！')
            .refine(
                async (e) => {
                  let result = false;
                  try {
                    result = await checkDictItemEntityExist({
                      id: id,
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
];
