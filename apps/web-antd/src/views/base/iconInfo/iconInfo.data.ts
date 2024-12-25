import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum, OrderNoDefaultEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import {checkEntityExist, getIconCategoryTreeData} from "#/api/base/iconInfo";
// import {uploadApi} from "#/api/sys/upload";

const colProps = {
  span: 24,
};
export const columns: VxeGridProps['columns'] = [
  {
    title: '图标名称',
    field: 'name',
    width: 100,
    align: 'center',
    resizable: true,
  },
  {
    title: '所属分类',
    field: 'categoryId',
    width: 120,
    align: 'left',
  },
  {
    title: '排序号',
    field: 'orderNo',
    width: 120,
    align: 'left',
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/标识',
    },
    labelWidth: 60,
    colProps: {
      span: 8,
      lg: { span: 8, offset: 0 },
      sm: { span: 10, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
];

export const iconCategoryFormSchema: FormSchema[] = [
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
    label: '父级分类',
    component: 'TreeSelect',
    /*show: ({ values }) => {
      return !!values.pid && !values.id;
    },*/
    dependencies: {
      show: false,
      triggerFields: ['']
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
        required_error: '名称不能为空',
      })
      .trim()
      .min(1, "名称不能为空")
      .max(255, "名称不能大于255个字符"),
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

export const iconInfoFormSchema: FormSchema[] = [
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
    fieldName: 'categoryId',
    label: '分类',
    rules: "required",
    component: 'ApiTreeSelect',
    componentProps: {
      api: getIconCategoryTreeData,
      fieldNames: {
        label: 'name',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    fieldName: 'name',
    label: '图标名称',
    component: 'Input',
    rules: z
      .string({
        required_error: '名称不能为空',
      })
      .trim()
      .min(1, "名称不能为空")
      .max(255, "名称不能大于255个字符")
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
            required_error: "标识不能为空"
          })
          .min(1, "标识不能为空")
          .max(100, '最多输入100个字符')
          .regex(new RegExp(FormValidPatternEnum.SN), '请输入英文或数字')
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
    fieldName: 'icon',
    label: '图标',
    component: 'Input',
  },
  /*{
    field: 'icon',
    label: '图标',
    required: false,
    component: 'ImageUpload',
    show: true,
    componentProps: {
      api: uploadApi,
      name: 'file',
      maxCount: 1,
      listType: 'picture-card',
      maxSize: 1,
      maxNumber: 1,
      multiple: false,
      helpText: '(仅支持gif,png)大小不超过1M，建议上传尺寸(像素)：200px*200px',
      accept: ['gif', 'png'],
    },
    colProps: {
      span: 12,
    },
  },*/
];
