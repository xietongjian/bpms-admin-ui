import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { z } from '#/adapter/form';
import { RemarkDefaultEnum } from '#/enums/commonEnum';
import {
  checkEntityExist,
} from '#/api/base/flowListener';

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
    type: 'expand',
    slots: {
      default: 'name',
      content: 'expandContent',
    }
  },
  {
    title: '监听类型',
    field: 'listenerType',
    width: 180,
    align: 'left',
  },
  {
    title: '类型',
    field: 'type',
    width: 180,
    align: 'left',
  },
  {
    title: '值',
    field: 'value',
    align: 'left',
  },
  {
    title: '备注',
    field: 'remark',
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

export const propertiesColumns: VxeGridProps['columns'] = [
  {
    title: 'ID',
    field: 'id',
    visible: false,
  },
  {
    title: 'listenerId',
    field: 'listenerId',
    visible: false,
  },
  {
    title: '操作',
    field: 'option',
    align: 'center',
    slots: {default: 'option'},
    width: 100,
  },
  {
    title: '名称',
    field: 'name',
    align: 'left',
    //edit: true,
    //editable: true,
    // editComponent: 'Input',
   /* editComponentProps: {
      size: 'small',
    },*/
  },
  {
    title: '值',
    field: 'value',
    align: 'left',
  },
  {
    title: '类型',
    field: 'type',
    align: 'left',
/*    customRender: ({ record }) => {
      let text = '未知';
      let color = 'default';
      if (record.type === 'string') {
        text = '字符串';
        color = 'default';
      } else if (record.type === 'expression') {
        text = '表达式';
        color = 'processing';
      }
      return h(Tag, { color: color }, () => text);
    },*/
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'listenerType',
    label: '监听类型',
    component: 'Select',
    labelWidth: 80,
  },
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

export const formSchema: FormSchema[] = [
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
    fieldName: 'listenerType',
    label: '监听类型',
    component: 'RadioGroup',
    rules: 'selectRequired',
  },
  {
    fieldName: 'type',
    label: '类型',
    component: 'RadioGroup',
    defaultValue: 'class',
    rules: 'selectRequired'
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
        .max(80, "字符长度不能大于80！")
  },
  {
    fieldName: 'value',
    label: '值',
    component: 'Input',
    rules: z
        .string({
          required_error: '值不能为空',
        })
        .trim()
        .min(1, "值不能为空")
        .max(300, "字符长度不能大于300！")
  },

  {
    label: '备注',
    fieldName: 'remark',
    component: 'Textarea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    rules: z
        .string()
        .max(255, "字符长度不能大于255！")
        .nullable()
        .optional()
  },
];

export const propertiesFormSchema: FormSchema[] = [
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
    fieldName: 'listenerId',
    label: 'listenerId',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['listenerId'],
    }
  },
  {
    fieldName: 'type',
    label: '类型',
    component: 'RadioGroup',
    defaultValue: 'string',
    rules: "selectRequired"
  },
  {
    fieldName: 'name',
    label: '名称',
    help: '监听器的属性名',
    component: 'Input',
    rules: z
        .string({
          required_error: '属性名不能为空',
        })
        .trim()
        .min(1, "属性名不能为空")
        .max(80, "字符长度不能大于80！")
  },
  {
    fieldName: 'value',
    label: '值',
    help: '监听器的属性值',
    component: 'Input',
    rules: z
        .string({
          required_error: '属性值不能为空',
        })
        .trim()
        .min(1, "属性值不能为空")
        .max(80, "字符长度不能大于80！")
    /*
    FIXME
    rules: [
      {
        required: false,
        whitespace: true,
        message: '值不能为空！',
      },
      {
        max: 255,
        message: '字符长度不能大于255！',
      },
    ],
    colProps,*/
  },
];
