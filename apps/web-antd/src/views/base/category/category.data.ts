import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';

import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/commonEnum';
import { checkEntityExist } from '#/api/base/category';

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
    minWidth: 200,
    resizable: true,
    treeNode: true
  },
  {
    title: '编码',
    field: 'code',
    resizable: true,
    align: 'left',
  },
  {
    title: '简称',
    field: 'shortName',
    resizable: true,
    align: 'left',
  },
  {
    title: '所属公司',
    field: 'cName',
    align: 'left',
    resizable: true,
    slots: { default: 'cName'}
  },
  {
    title: '前台显示',
    field: 'frontShow',
    width: 80,
    /*customRender: ({ record }) => {
      const status = record.frontShow;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '显示' : '隐藏';
      return h(Tag, { color: color }, () => text);
    },*/
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
        .string({
          required_error: '名称不能为空！'
        })
        .trim()
        .min(1, '名称不能为空！')
        .max(200, '字符长度不能大于200！'),
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
            .regex(new RegExp('^[a-zA-Z_]{1,}[0-9a-zA-Z_]{1,}$'), '请输入英文或数字且以英文或下划线开头！')
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
    fieldName: 'shortName',
    label: '简称',
    component: 'Input',
    rules: z
        .string()
        .max(200, "字符长度不能大于200！")
        .nullish()
        .optional(),
  },
  {
    fieldName: 'companyId',
    label: '所属公司',
    component: 'TreeSelect',
    componentProps: {
      treeNodeFilterProp: 'cname',
      getPopupContainer: () => document.body,
    },
    rules: 'selectRequired'
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
    fieldName: 'frontShow',
    label: '状态',
    component: 'Switch',
    defaultValue: true,
    componentProps: {
      checkedChildren: '显示',
      unCheckedChildren: '隐藏',
    },
  },
  {
    fieldName: 'note',
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
        .max(200, "字符长度不能大于200！")
        .nullish()
        .optional(),
  },
];
