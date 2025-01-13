import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { OrderNoDefaultEnum, RemarkDefaultEnum,FormValidPatternEnum } from '#/enums/commonEnum';
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import { checkEntityExist } from '#/api/org/dept';

import { getCompaniesListData } from '#/api/org/company';

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
    width: 120,
    align: 'left',
    resizable: true,
  },
  {
    title: '部门领导',
    field: 'leaderName',
    width: 100,
    align: 'center',
    slots: { default: 'leaderName' }
  },
  {
    title: '分管领导',
    field: 'superiorName',
    width: 100,
    align: 'center',
    slots: { default: 'superiorName' }
  },
  {
    title: '所属公司',
    field: 'companyName',
    width: 120,
    align: 'left',
    resizable: true,
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 180,
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
      placeholder: '请输入名称/标识',
      allowClear: true,
    },
    labelWidth: 60,
  },
];

export const deptFormSchema: FormSchema[] = [
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
        .max(100, {message: '字符长度不能大于100！'}),
  },
  {
    fieldName: 'code',
    label: '编码',
    component: 'Input',
    dependencies: {
      rules(values) {
        const { id, code } = values;
        return z
            .string({required_error: '编码不能为空！'})
            .min(1, {message: '编码不能为空！'})
            .max(100, {message: '字符长度不能大于100！'})
            .regex(new RegExp(FormValidPatternEnum.SN), '请输入英文或数字')
            .refine(
                async (e) => {
                  let result = false;
                  try {
                    result = await checkEntityExist({
                      id: id,
                      field: 'code',
                      fieldValue: code || '',
                      fieldName: '系统标识',
                    });
                  } catch (e) {
                    console.error(e);
                  }
                  return result;
                },
                {
                  message: '系统标识已存在',
                },
            );
      },
      triggerFields: [''],
    },
  },
  {
    fieldName: 'leaderPersonal',
    label: '部门领导',
    component: 'PersonalSelector',
    componentProps: {
      multiple: false,
    },
  },
  {
    fieldName: 'leaderName',
    label: '部门领导',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['']
    }
  },
  {
    fieldName: 'superiorPersonal',
    label: '分管领导',
    component: 'PersonalSelector',
    componentProps: {
      multiple: false,
    },
  },
  {
    fieldName: 'superiorName',
    label: '分管领导',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['']
    }
  },
  {
    fieldName: 'companyId',
    label: '所属公司',
    component: 'ApiTreeSelect',
    componentProps: {
      api: getCompaniesListData,
      // childrenField: 'children',
      treeDataSimpleMode: { id: "id", pId: "pid", rootPId: null },
      labelField: 'cname',
      valueField: 'code',
      allowClear: true,
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
        .max(500, "字符长度不能大于500！")
        .nullish()
        .optional(),
  },
];
