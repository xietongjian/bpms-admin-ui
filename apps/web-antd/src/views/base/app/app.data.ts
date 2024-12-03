import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import {checkEntityExist} from "#/api/base/app";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';


/**
 * 列表
 */
export const listColumns: VxeGridProps['columns'] = [
  {title: '序号', type: 'seq', width: 50},
  {
    field: 'image',
    align: 'center',
    title: '图标',
    slots: {default: 'image'}
  },

  {field: 'name', align: 'left', title: '名称', showOverflow: true},
  {field: 'sn', align: 'left', title: '标识', showOverflow: true},
  {field: 'url', align: 'left', title: 'URL'},
  {field: 'indexUrl', align: 'left', title: '首页地址', showHeaderOverflow: true},
  {field: 'status', title: '状态', slots: {default: 'status'}, width: 100},

  {
    field: 'platformEnabled',
    title: '开启平台推送',
    slots: {default: 'platformEnabled'},
    width: 100,
    showHeaderOverflow: true
  },
  {field: 'orderNo', align: 'right', title: '排序', width: 100},
  {field: 'note', align: 'left', title: '备注'},
  {
    field: 'action',
    fixed: 'right',
    slots: {default: 'action'},
    title: '操作',
    width: 120,
  },
];

/**
 * 搜索条件
 */
export const searchFormSchema: FormSchema[] = [
  {
    component: 'Input',
    fieldName: 'keyword',
    label: '关键字',
    componentProps: {
      placeholder: '请输入关键字',
      allowClear: true,
    }
  },
];

/**
 * 表单信息
 */
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
    componentProps: {
      placeholder: '请输入应用名',
    },
    rules: z
      .string({
        required_error: '名称不能为空',
      })
      .trim()
      .min(1, "名称不能为空")
      .max(64, "系统名称不能大于64个字符")
  },
  {
    fieldName: 'sn',
    label: '标识',
    rules: 'required',
    component: 'Input',
    componentProps: {
      placeholder: '请输入英文或数字'
    },
    dependencies: {
      rules(values) {
        const { id, sn } = values;
        return z
          .string({
            required_error: "系统标识不能为空"
          })
          .min(1, "系统标识不能为空")
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
      triggerFields: ['sn'],
    },
  },
  {
    fieldName: 'url',
    label: '系统URL',
    component: 'Input',
    componentProps: {
      placeholder: '请输入系统URL'
    },
    rules: z
      .string()
      .max(128, "字符长度不能大于128")
      .regex(new RegExp('^[a-zA-z]+://[^\\s]*$'), "请输入正确的URL地址")
      .nullish()
      .nullable()
      .optional(),
  },
  {
    fieldName: 'indexUrl',
    label: '首页URL',
    component: 'Input',
    help: '例如：/index.html',
    componentProps: {
      placeholder: '如：/index.html'
    },
    rules: z
      .string()
      .max(128, "字符长度不能大于128")
      .regex(new RegExp('^\\/(\\w+\\/?)+(\\.?\\w+)?$'), "请输入正确的URL地址")
      .nullish()
      .nullable()
      .optional(),
  },
  {
    fieldName: 'orderNo',
    label: '排序号',
    help: '数值越小越靠前！',
    component: 'InputNumber',
    defaultValue: 100,
    componentProps: {
      placeholder: '请输入排序号',
      min: 0,
      max: 999999,
      class: 'w-1/2'
    },
    rules: z
      .number({
        required_error: '排序号不能为空',
        invalid_type_error: '格式不正确'
      })
      .min(0, "排序号不能为空")
      .nullish()
      .optional(),
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
    fieldName: 'platformEnabled',
    label: '是否推送',
    help: '是否推送消息至第三方平台！',
    component: 'Switch',
    defaultValue: 0,
    componentProps: {
      checkedValue: 1,
      unCheckedValue: 0,
      checkedChildren: '推送',
      unCheckedChildren: '不推送',
    },
  },
  {
    label: '备注',
    fieldName: 'note',
    component: 'Textarea',
    componentProps: {
      // autosize: true,
      autoSize: {
        minRows: 4,
        maxRows: 8,
      },
      rows: 4
    },
    rules: z
      .string()
      .max(500, "字符长度不能大于500！")
      .nullish()
      .optional(),
  },
];

/**
 * 更新密钥
 */
export const secretKeyFormSchema: FormSchema[] = [
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
    fieldName: 'sn',
    label: '标识（appKey）',
    component: 'Input',
  },
  {
    label: '密钥（appSecretKey）',
    fieldName: 'secretKey',
    component: 'Textarea',
    componentProps: {
      readonly: true
    }
  },
  {
    label: '',
    fieldName: 'ctrl',
    component: 'Input',
  },
];
