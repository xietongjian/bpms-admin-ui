import {FormValidPatternEnum, OrderNoDefaultEnum} from '#/enums/commonEnum';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { z } from '#/adapter/form';
import { checkEntityExist } from '#/api/org/jobGrade';

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
    minWidth: 300,
    resizable: true,
    treeNode: true,
  },
  {
    title: '编码',
    field: 'code',
    minWidth: 100,
    align: 'left',
  },
  {
    title: '排序号',
    field: 'orderNo',
    width: 100,
    align: 'right',
  },
  /*{
    title: '创建人',
    field: 'creator',
    width: 100,
    align: 'left',
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 100,
    align: 'left',
  },
  {
    title: '修改人',
    field: 'updator',
    width: 100,
    align: 'left',
  },
  {
    title: '修改时间',
    field: 'updateTime',
    width: 100,
    align: 'left',
  },*/
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
      triggerFields: ["id"]
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
        .min(1, {message: '名称不能为空！'})
        .max(80, {message: '字符长度不能大于80！'}),

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
          .max(256, '字符长度不能大于256！')
          .regex(new RegExp(FormValidPatternEnum.CODE), '请输入英文或数字且以英文或下划线开头！')
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
    fieldName: 'typeId',
    label: '类型ID',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ["id"]
    }
  },
  {
    fieldName: 'typeCode',
    label: '类别编码',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ["id"]
    }
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
