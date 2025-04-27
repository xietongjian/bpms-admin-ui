import type { VxeGridProps } from '#/adapter/vxe-table';
import {z} from "@vben/common-ui";
import { FormValidPatternEnum, OrderNoDefaultEnum } from '#/enums/commonEnum';

import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { checkEntityExist } from '#/api/privilege/module';

export const listColumns: VxeGridProps['columns'] = [
  {
    title: '菜单名称',
    field: 'name',
    align: 'left',
    minWidth: 250,
    resizable: true,
    treeNode: true,
    slots: {default: 'name'}
  },
  {
    title: 'URL',
    field: 'url',
    align: 'left',
    width: 180,
  },
  {
    resizable: true,
    title: '标识',
    field: 'sn',
    align: 'left',
    width: 120,
  },
  {
    resizable: true,
    width: 200,
    title: '组件',
    field: 'component',
    align: 'left',
  },
  {
    title: '菜单类型',
    field: 'component',
    width: 100,
    slots: { default: 'componentType'}
  },
  {
    title: '状态',
    field: 'status',
    width: 60,
    slots: {default: 'status'}
  },
  {
    title: '是否显示',
    field: 'showStatus',
    width: 100,
    slots: {default: 'showStatus'}
  },
  {
    title: '权限值',
    field: 'pvs',
    align: 'left',
    minWidth: 200,
    resizable: true,
    slots: {default: 'pvs'}
  },
  {
    title: '排序',
    field: 'orderNo',
    width: 60,
    align: 'right',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 150,
  },
];

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
    fieldName: 'menuType',
    label: 'menuType',
    component: 'Input',
    defaultValue: 1,
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
    fieldName: 'image',
    label: '图标',
    component: 'IconPicker',
    componentProps: {
      // mode: 'svg'
    },
  },
  {
    fieldName: 'name',
    label: '名称',
    component: 'Input',
      rules: z
          .string({
              required_error: '名称不能为空',
          })
          .trim()
          .min(1, "名称不能为空")
          .max(32, "名称不能大于32个字符")
  },
  {
    fieldName: 'sn',
    label: '标识',
    component: 'Input',
    // dynamicDisabled: ({values})=> !!values.id,
    dependencies: {
      disabled: (values) => !!values.id,
      triggerFields: ['sn'],
      rules(values) {
        const {id, sn} = values;
        return z.string({
          required_error: '标识不能为空！'
        }).min(1, '标识不能为空！')
            .max(64, '')
            .regex(new RegExp(FormValidPatternEnum.SN), "请输入英文或数字！")
            .refine(
                async () => {
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
      }
    }
  },
  {
    fieldName: 'url',
    label: 'URL',
    component: 'Input',
    dependencies: {
      disabled: (values) => !!values.id,
      triggerFields: ['']
    },
    rules: z
        .string({
          required_error: 'URL不能为空',
        })
        .trim()
        .min(1, "URL不能为空")
        .max(128, "URL不能大于32个字符")
        .refine((val) => {
          return new RegExp('[^\/]+(\/(.+))*').test(val);
        }, {message: '请输入正确的URL地址！'})
  },
  {
    fieldName: 'moduleType',
    label: '菜单类型',
    component: 'RadioGroup',
    defaultValue: 'dictionary',
    componentProps: {
      options: [
        {label: '目录', value: 'dictionary'},
        {label: '菜单', value: 'menu'},
      ],
    },
    dependencies: {
      disabled: (values) => !!values.id,
      triggerFields: ['moduleType', 'id'],
      trigger(values, form) {
        !values.id && form.setFieldValue('component', values.moduleType === 'dictionary' ? 'LAYOUT' : '');
      },
    }
  },
  {
    fieldName: 'component',
    label: '组件地址',
    component: 'Input',
    help: '项目中views目录下的文件路径，如：/process/todo/index',
    dependencies: {
      disabled: (values)=> !!values.id,
      show: (values) => !(values.moduleType === 'dictionary'),
      triggerFields: ['moduleType'],
      rules: (values) => {
        if(values.moduleType === 'dictionary'){
          return null;
        }
        return z
            .string({
              required_error: '组件地址不能为空',
            })
            .trim()
            .min(1, "组件地址不能为空")
            .max(128, "字符长度不能大于128")
            .refine((val) => {
              return new RegExp('^\\/?(\\w+\\/?)+(\\.?\\w+)?$').test(val);
            }, {message: '请输入正确的组件地址！'})
      }
    }
  },
  {
    fieldName: 'redirect',
    label: '跳转地址',
    help: '目录菜单跳转地址！',
    component: 'Input',
    dependencies: {
      show: (values) => values.moduleType === 'dictionary',
      triggerFields: ['moduleType']
    },
    rules: z
        .string()
        .max(128, "字符长度不能大于128！")
        .refine((val) => {
          return new RegExp('[^\/]+(\/(.+))*').test(val);
        }, {message: '请输入正确的目录菜单跳转地址！'}).optional()
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
    fieldName: 'showStatus',
    label: '是否显示',
    component: 'Switch',
    defaultValue: 1,
    componentProps: {
      checkedValue: 1,
      unCheckedValue: 0,
      checkedChildren: '显示',
      unCheckedChildren: '隐藏',
    },
  },
];

export const pValueFormSchema: any[] = [
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
    fieldName: 'pvs',
    label: ' ',
    component: 'CheckboxGroup',
    labelWidth: 10,
    componentProps: {},
  },
];
