import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';

import { getCompanyTypes } from '#/api/org/companyType';
import { OrderNoDefaultEnum, RemarkDefaultEnum, FormValidPatternEnum } from '#/enums/commonEnum';
import { checkEntityExist } from '#/api/org/company';


export const columns: VxeGridProps['columns'] = [
  {
    title: '全称',
    field: 'cname',
    align: 'left',
    minWidth: 200,
    resizable: true,
    treeNode: true
  },
  {
    title: '编码',
    field: 'code',
    align: 'left',
    width: 100,
    resizable: true,
  },

  {
    title: '简称',
    field: 'shortName',
    align: 'left',
    width: 180,
    resizable: true,
  },
  {
    title: '类型',
    field: 'typeId',
    align: 'left',
    width: 180,
    slots: {default: 'typeId'}
  },

  {
    title: '状态',
    field: 'status',
    width: 80,
    slots: {default: 'status'},
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
    fieldName: 'cname',
    label: '全称',
    component: 'Input',
    rules: z
        .string({
          required_error: '全称不能为空！',
        })
        .trim()
        .min(1, "全称不能为空！")
        .max(64, "字符长度不能大于64！"),
  },
  {
    fieldName: 'shortName',
    label: '简称',
    component: 'Input',
    rules: z
        .string({
          required_error: '简称不能为空！',
        })
        .trim()
        .min(1, "简称不能为空！")
        .max(64, "字符长度不能大于64！"),
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
                async () => {
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
      triggerFields: [''],
    },
  },
  {
    fieldName: 'typeId',
    label: '类型',
    component: 'ApiTreeSelect',
    componentProps: {
      class: 'w-full',
      api: getCompanyTypes,
      placeholder: '请选择公司类型',
      getPopupContainer: () => document.body,
      treeDataSimpleMode: { id: "id", pId: "pid", rootPId: null },
      // 菜单接口转options格式
      labelField: 'name',
      valueField: 'id',
    },
    rules: z
        .string({
          required_error: '类型不能为空！',
        })
        .trim()
        .min(1, "类型不能为空！"),
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
    fieldName: 'status',
    label: '状态',
    component: 'Switch',
    defaultValue: 1,
    componentProps: {
      checkedValue: 1,
      unCheckedValue: 0,
      checkedChildren: '启用',
      unCheckedChildren: '禁用',
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
        .max(200, "字符长度不能大于200！")
        .nullish()
        .optional(),
  },
];
