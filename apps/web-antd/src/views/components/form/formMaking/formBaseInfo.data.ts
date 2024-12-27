import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';

import pinyin from 'js-pinyin';
import { checkEntityExist } from '#/api/form/bizForm';

export const formBaseInfoFormSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: '',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ["id"]
    }
  },
  {
    fieldName: 'formName',
    label: '',
    component: 'Input',
    hideLabel: true,
    hideRequiredMark: true,
    formItemClass: 'pb-0 [&_div_p]:z-10 [&_div_p]:border [&_div_p]:rounded [&_div_p]:border-destructive [&_div_p]:px-2 [&_div_p]:bg-card [&_div_p]:bottom-[-33px] [&_div_p]:leading-8',
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      return {
        placeholder: '流程名称',
        autoComplete: 'off',
        allowClear: false,
        onChange: (e) => {
          if (typeof e !== 'string' && !formModel.id) {
            // 汉字转英文
            let value = e.target.value;
            // 将空格及特殊字符替换替换
            value = value.replace(/[^_|^\d|^\[a-zA-Z\]|^\[\u4e00-\u9fa5\]]/g, '_');
            // 是否统一为小写
            // value = value.toLowerCase();
            formModel.formKey = pinyin.getCamelChars(value);
          }
        },
      };
    },
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(64, "字符长度不能大于64！")
  },
  {
    fieldName: 'formKey',
    label: '',
    component: 'Input',
    componentProps: {
      placeholder: '标识(自动填充，可修改)',
      autoComplete: 'off',
      allowClear: false,
    },
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '标识不能为空！',
      },
      {
        max: 60,
        message: '字符长度不能大于60！',
      },
      {
        // 英文或数字且以英文或下划线开头
        pattern: new RegExp('^[a-zA-Z_]{1,}[0-9a-zA-Z_]{0,}$'),
        type: 'string',
        message: '请输入英文或数字且以英文或下划线开头！',
      },
    ],*/
    dependencies: {
      show: false,
      rules(values) {
        const { id, sn } = values;
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
                      fieldValue: '',
                      fieldName: '流程标识',
                    });
                    /**
                     * id: params.id,
                     * field: params.field,
                     * fieldValue: value,
                     * fieldName: params.fieldName,
                     */
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
];
