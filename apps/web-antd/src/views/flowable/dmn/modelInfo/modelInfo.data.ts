import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';

import { getAll } from '#/api/base/app';
import {checkEntityExist} from '#/api/flowable/bpmn/modelInfo';


export const columns: VxeGridProps['columns'] = [
  {
    type: 'radio',
    title: '名称',
    field: 'name',
    align: 'left',
    minWidth: 200,
    slots: {default: 'name'},
  },
  {
    title: 'KEY',
    field: 'modelKey',
    minWidth: 200,
    align: 'left',
  },
  {
    title: '分类名称',
    field: 'categoryName',
    width: 100,
    align: 'left',
  },
  {
    title: '系统',
    field: 'appName',
    width: 100,
    align: 'left',
  },
  {
    title: '状态',
    field: 'status',
    width: 85,
    align: 'center',
    slots: {default: 'status'},
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 140,
    align: 'center',
  },
  {
    title: '创建人',
    field: 'creator',
    width: 140,
    align: 'left',
  },
  {
    title: '更新时间',
    field: 'updateTime',
    width: 140,
    align: 'center',
  },
  {
    title: '更新人',
    field: 'updator',
    width: 140,
    align: 'left',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: {default: 'action'},
    title: '操作',
    width: 130,
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
  {
    fieldName: 'appSn',
    label: '系统',
    component: 'ApiSelect',
    labelWidth: 60,
    componentProps: {
      api: getAll,
      placeholder: '请选择系统',
      allowClear: true,
      fieldNames: {
        value: 'sn',
        label: 'name'
      },
    }
  },
];

export const modelInfoFormSchema: FormSchema[] = [
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
    fieldName: 'categoryCode',
    label: 'categoryCode',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ["categoryCode"]
    }
  },
  {
    fieldName: 'name',
    label: '名称',
    component: 'Input',
    rules: 'required',
  },
  {
    fieldName: 'modelKey',
    label: '标识',
    component: 'Input',
    // required: true,
  },
  {
    fieldName: 'appSn',
    label: '所属系统',
    component: 'ApiSelect',
    componentProps: {
      getPopupContainer: () => document.body,
      api: getAll,
      placeholder: '请选择系统',
      allowClear: true,
      fieldNames: {
        value: 'sn',
        label: 'name'
      },
    },
    rules: 'selectRequired'
    // required: true,
  },
];

export const dmnBaseFormSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['id'],
    }
  },
  {
    fieldName: 'modelId',
    label: 'modelId',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['modelId'],
    }
  },
  {
    fieldName: 'dmnType',
    label: 'dmnType',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['dmnType'],
    }
  },
  {
    fieldName: 'categoryCode',
    label: 'categoryCode',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['categoryCode'],
    }
  },
  {
    fieldName: 'name',
    label: '名称',
    labelWidth: 60,
    component: 'Input',
    rules: z
        .string({
          required_error: '名称不能为空！',
        })
        .trim()
        .min(1, "名称不能为空！")
        .max(200, "字符长度不能大于200！"),
  },
  {
    fieldName: 'modelKey',
    label: '标识',
    labelWidth: 60,
    component: 'Input',
    dependencies: {
      rules(values) {
        const { id, modelKey } = values;
        return z
            .string({
              required_error: "标识不能为空"
            })
            .min(1, "标识不能为空")
            .max(60, '字符长度不能大于60！')
            .regex(new RegExp('^[a-zA-Z_]{1,}[0-9a-zA-Z_]{0,}$'), '请输入英文或数字且以英文或下划线开头！')
            .refine(
                async (e) => {
                  let result = false;
                  try {
                    result = await checkEntityExist({
                      id: id,
                      field: 'modelKey',
                      fieldValue: modelKey,
                      fieldName: '流程标识',
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
      triggerFields: ['modelKey'],
    },
  },
  {
    fieldName: 'appSn',
    label: '所属系统',
    component: 'ApiSelect',
    componentProps: {
      api: getAll,
      placeholder: '请选择系统',
      allowClear: true,
      fieldNames: {
        value: 'sn',
        label: 'name'
      },
      class: 'w-full',
      getPopupContainer: () => document.body,
    },
    rules: 'selectRequired'
  },
];

export const dmnSimulatorInputFormSchema: FormSchema[] = [];
