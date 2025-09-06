import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { checkEntityExist } from '#/api/base/systemConfig';
import {FormValidPatternEnum, OrderNoDefaultEnum, RemarkDefaultEnum} from '#/enums/commonEnum';

const END_WITH_IMG = "_IMG"
const END_WITH_SWITCH = "_SWITCH"

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'configName',
    align: 'left',
  },
  {
    title: '标识',
    field: 'configSn',
    width: 100,
    align: 'left',
  },
  {
    title: '配置Key',
    field: 'configKey',
    width: 100,
    align: 'left',
  },
  {
    title: '配置Value',
    field: 'configValue',
    align: 'left',
  },
  {
    title: '图片',
    field: 'image',
    align: 'center',
  },
  {
    title: '备注',
    field: 'remark',
    align: 'left',
  },
  {
    title: '排序',
    field: 'configOrder',
    width: 80,
    align: 'right',
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 180,
  },
  {
    title: '操作',
    field: 'action',
    align: 'center',
    width: 120,
    slots: {
      default: 'action',
    },
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
      triggerFields: ['id']
    }
  },
  {
    fieldName: 'configName',
    label: '名称',
    component: 'Input',
    dependencies: {
      disabled: (values) => !!values.id,
      triggerFields: ['configName'],
    },
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(30, "字符长度不能大于30！")
  },
  {
    fieldName: 'configSn',
    label: '标识',
    rules: 'required',
    component: 'Input',
    dependencies: {
      disabled: (values) => !!values.id,
      triggerFields: ['configSn'],
      rules(values) {
        const { id, configSn } = values;
        return z
            .string({
              required_error: "标识不能为空！"
            })
            .min(1, "标识不能为空！")
            .max(30, '字符长度不能大于30！')
            .regex(new RegExp(FormValidPatternEnum.SN), '请输入英文或数字且以英文或下划线开头！')
            .refine(
                async (e) => {
                  let result = false;
                  try {
                    result = await checkEntityExist({
                      id: id,
                      field: 'configSn',
                      fieldValue: configSn || '',
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
    }
  },
  {
    fieldName: 'configKey',
    label: '配置Key',
    rules: 'required',
    component: 'Input',
    dependencies: {
      disabled: (values) => !!values.id,
      triggerFields: ['configKey'],
      rules(values) {
        const { id, configKey } = values;
        return z
            .string({
              required_error: "配置Key不能为空！"
            })
            .min(1, "配置Key不能为空！")
            .max(30, '字符长度不能大于30！')
            .regex(new RegExp(FormValidPatternEnum.SN), '请输入英文或数字且以英文或下划线开头！')
            .refine(
                async (e) => {
                  let result = false;
                  try {
                    result = await checkEntityExist({
                      id: id,
                      field: 'configKey',
                      fieldValue: configKey || '',
                      fieldName: '配置Key',
                    });
                  } catch (e) {
                    console.error(e);
                  }
                  return result;
                },
                {
                  message: '配置Key已存在',
                },
            );
      },
    }
  },
  {
    fieldName: 'configValue',
    label: '配置Value',
    component: 'Textarea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    rules: z
      .string()
      .max(1024, "字符长度不能大于1024！")
      .nullable()
      .optional()
  },
  {
    fieldName: 'configOrder',
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
    fieldName: 'remark',
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
        .max(1024, "字符长度不能大于1024！")
        .nullable()
        .optional()
  },
];




export const textDataFormSchema: FormSchema[] = [
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
    fieldName: 'configName',
    label: '名称',
    component: 'Input',
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(30, "字符长度不能大于30！")
  }
];

export const imgDataFormSchema: FormSchema[] =  (item) => {
  return [
    {
      fieldName: 'id',
      label: 'ID',
      component: 'Input',
      defaultValue: item.id,
      dependencies: {
        show: false,
        triggerFields: ['id']
      }
    },
    {
      fieldName: 'configName',
      label: item.configName,
      component: 'Input',
      defaultValue: item.configValue,
      rules: z
          .string({
            required_error: '名称不能为空',
          })
          .trim()
          .min(1, "名称不能为空")
          .max(30, "字符长度不能大于30！")
    }
  ];
};

export const dynamicFormSchema: FormSchema[] =  (item) => {
  const schema = [{
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    defaultValue: item.id,
    dependencies: {
      show: false,
      triggerFields: ['id']
    }
  }];
  let extenalSchema = null;
  if(item.configSn.endsWith(END_WITH_IMG)){
    extenalSchema = {
      fieldName: 'configName',
      label: item.configName,
      component: 'Upload',
      description: item.remark,
      defaultValue: item.configValue,
      wrapperClass: 'flex-col items-start',
      rules: z
          .string({
            required_error: '名称不能为空',
          })
          .trim()
          .min(1, "名称不能为空")
          .max(30, "字符长度不能大于30！")
    };

    extenalSchema = {
      component: 'Upload',
      componentProps: {
        // 更多属性见：https://ant.design/components/upload-cn
        accept: '.png,.jpg,.jpeg',
        // 自动携带认证信息
        // customRequest: upload_file,
        disabled: false,
        maxCount: 1,
        multiple: false,
        showUploadList: true,
        // 上传列表的内建样式，支持四种基本样式 text, picture, picture-card 和 picture-circle
        listType: 'picture-card',
      },
      fieldName: 'files',
      label: item.configName,
      defaultValue: [{url: item.imageBase64}],
      renderComponentContent: () => {
        return {
          default: () => '点击上传图片',
        };
      },
      rules: 'required',
    };

  } else if(item.configSn.endsWith(END_WITH_SWITCH)){
    extenalSchema = {
      fieldName: 'configName',
      label: item.configName,
      component: 'Switch',
      description: item.remark,
      defaultValue: item.configValue,
      wrapperClass: 'flex-col items-start',
      rules: z
          .string({
            required_error: '名称不能为空',
          })
          .trim()
          .min(1, "名称不能为空")
          .max(30, "字符长度不能大于30！")
    }
  } else {
    extenalSchema = {
      fieldName: 'configName',
      label: item.configName,
      component: 'Input',
      description: item.remark,
      defaultValue: item.configValue,
      wrapperClass: 'flex-col items-start',
      rules: z
          .string({
            required_error: '名称不能为空',
          })
          .trim()
          .min(1, "名称不能为空")
          .max(30, "字符长度不能大于30！")
    }
  }

  schema.push( extenalSchema);

  return schema;
};

export const switchDataFormSchema: FormSchema[] = [
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
    fieldName: 'configName',
    label: '名称',
    component: 'Input',
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(30, "字符长度不能大于30！")
  }
];
