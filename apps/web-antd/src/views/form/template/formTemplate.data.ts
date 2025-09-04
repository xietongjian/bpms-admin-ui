import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import {FormValidPatternEnum, OrderNoDefaultEnum} from "#/enums/commonEnum";
import {checkTemplateCategoryEntityExist, getFormCategoryListData} from "#/api/form/formTemplate";
import {checkEntityExist} from "#/api/org/company";

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
    minWidth: 200,
  },
  {
    title: '分类名称',
    field: 'categoryCode',
    width: 120,
    align: 'left',
    resizable: true,
    slots: {default: 'categoryCode'}
  },
  {
    title: '状态',
    field: 'status',
    width: 120,
    align: 'center',
    slots: {default: 'status'}

  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 200,
    align: 'center',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: {default: 'action'},
    title: '操作',
    width: 120,
  },
];

export const formCategoryFormSchema: FormSchema[] = [
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
    fieldName: 'pid',
    label: '父级分类',
    component: 'TreeSelect',
    dependencies: {
      show: (values) => !!values.pid && !values.id,
      triggerFields: ['pid']
    },
    componentProps: {
      fieldNames: {
        label: 'name',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    fieldName: 'name',
    label: '分类名称',
    component: 'Input',
    rules: z
        .string({
          required_error: '分类名称不能为空',
        })
        .trim()
        .min(1, "分类名称不能为空")
        .max(200, "字符长度不能大于200！")
  },
  {
    fieldName: 'code',
    label: '标识',
    component: 'Input',
    dependencies: {
      rules(values) {
        const { id, code } = values;
        return z
            .string({
              required_error: "标识不能为空"
            })
            .min(1, "标识不能为空")
            .max(100, '最多输入100个字符')
            .regex(new RegExp(FormValidPatternEnum.SN), '请输入英文或数字')
            .refine(
                async () => {
                  let result = false;
                  try {
                    result = await checkTemplateCategoryEntityExist({
                      id: id,
                      field: 'code',
                      fieldValue: code || '',
                      fieldName: '标识',
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

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称',
      allowClear: true,
    },
    labelWidth: 60,
  },
];

export const formSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'id',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['id']
    }
  },
  {
    fieldName: 'categoryCode',
    label: '分类',
    rules: "selectRequired",
    component: 'ApiTreeSelect',
    formItemClass: 'grid-cols-2 pb-0 [&_div_p]:z-10 [&_div_p]:border [&_div_p]:rounded [&_div_p]:border-destructive [&_div_p]:px-2 [&_div_p]:bg-card [&_div_p]:bottom-[-33px] [&_div_p]:leading-8',
    componentProps: {
      blockNode: true,
      api: getFormCategoryListData,
      treeDataSimpleMode: { id: "id", pId: "pid", rootPId: null },
      // 菜单接口转options格式
      labelField: 'name',
      valueField: 'code',
      numberToString: true,
      fieldNames: { title: 'name', key: 'code', children: 'children' }
    },
  },
  {
    fieldName: 'name',
    label: '名称',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称',
    },
    formItemClass: 'col-span-2 col-start-2 pb-0 [&_div_p]:z-10 [&_div_p]:border [&_div_p]:rounded [&_div_p]:border-destructive [&_div_p]:px-2 [&_div_p]:bg-card [&_div_p]:bottom-[-33px] [&_div_p]:leading-8',
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(32, "字符长度不能大于32！")
  }
];
