import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum, RemarkDefaultEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';

import { uploadApi } from '#/api/sys/upload';

/**
 * name
 * url
 * imgUrl
 * description
 */
export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
    resizable: true,
  },
  {
    title: '跳转路径',
    field: 'url',
    width: 380,
    align: 'left',
  },
  {
    title: '系统描述',
    field: 'description',
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
    fieldName: 'name',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入关键字',
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
    compnentProps: {
      placeholder: '请输入名称',
    },
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(64, "名称不能大于64个字符"),
  },
  {
    fieldName: 'url',
    label: '跳转地址',
    component: 'Input',
    componentProps: {
      placeholder: '请输入跳转地址',
    },
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(64, "名称不能大于64个字符"),
  },
  {
    fieldName: 'imgUrl',
    label: '图标',
    component: 'ImageUpload',
    dependencies: {
      show: false,
      triggerFields: ["id"]
    },
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
  },
  {
    label: '系统描述',
    fieldName: 'description',
    component: 'Textarea',
    componentProps: {
      placeholder: '请输入系统描述',
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
