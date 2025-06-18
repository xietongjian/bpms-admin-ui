import { OrderNoDefaultEnum, RemarkDefaultEnum, FormValidPatternEnum } from '#/enums/commonEnum';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import {CodeEditor, MODE} from '#/components/CodeEditor';
// import { CodeEditor, MODE } from '#/components/CodeEditor';

import { Tag } from 'ant-design-vue';
import { h, markRaw } from 'vue';
import {getApiCategoryListData} from "#/api/base/apiInfo";
import RequestUrl from "#/views/base/bizTokenConfig/component/request-url.vue";

const colProps = {
  span: 24,
};
export const columns: VxeGridProps['columns'] = [
  {
    title: '接口名',
    field: 'name',
    align: 'left',
    resizable: true,
    minWidth: 200,
    showHeaderOverflow: true,
  },
  {
    title: '请求方式',
    field: 'method',
    align: 'left',
    width: 90,
    showHeaderOverflow: true,
    customRender: ({ record }) => {
      const { method } = record;
      let color = '';
      if (method === 'POST') {
        color = 'green';
      } else if (method === 'GET') {
        color = 'lime';
      } else {
        color = 'blue';
      }
      return h(Tag, { color: color }, () => method);
    },
  },
  {
    title: '请求地址',
    field: 'url',
    width: 150,
    align: 'left',
    resizable: true,
    showHeaderOverflow: true,
  },
  {
    title: '所属分类',
    field: 'categoryId',
    width: 120,
    align: 'left',
    showHeaderOverflow: true,
  },
  {
    title: '排序号',
    field: 'orderNo',
    width: 120,
    align: 'left',
    showHeaderOverflow: true,
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 180,
    showHeaderOverflow: true,
  },
  {
    title: '接口描述',
    field: 'remark',
    align: 'left',
    width: 180,
    showHeaderOverflow: true,
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
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/标识',
      allowClear: true,
    },
    labelWidth: 60,
    /*colProps: {
      span: 8,
      lg: { span: 8, offset: 0 },
      sm: { span: 10, offset: 0 },
      xs: { span: 16, offset: 0 },
    },*/
  },
];

export const apiCategoryFormSchema: FormSchema[] = [
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
    fieldName: 'pid',
    label: '父级分类',
    component: 'TreeSelect',
    componentProps: {
      show: ({ values }) => {
        return !!values.pid && !values.id;
      },
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
        .max(255, "字符长度不能大于255！")
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

export const apiInfoFormSchema: FormSchema[] = [
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
    fieldName: 'categoryId',
    label: '分类',
    component: 'ApiTreeSelect',
    componentProps: {
      api: getApiCategoryListData,
      treeDataSimpleMode: {id: 'id', pId: 'pid', rootPid: null},
      fieldNames: {
        label: 'name',
        value: 'id',
      },
      getPopupContainer: () => document.body,
      class: 'w-full'
    },
    wrapperClass: 'w-full',
    formItemClass: 'w-full',
    rules: 'selectRequired'
  },
  {
    fieldName: 'name',
    label: '接口名称',
    component: 'Input',
    rules: z
        .string({
          required_error: '名称不能为空！'
        })
        .min(1, {message: '名称不能为空！'})
        .max(255, {message: '字符长度不能大于255！'}),
  },
  {
    fieldName: 'remark',
    label: '接口描述',
    component: 'Textarea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
  },
  {
    fieldName: 'requestMethodUrl',
    label: '请求地址',
    component: markRaw(RequestUrl),
    disabledOnChangeListener: false,
    defaultValue: ['GET', ''],
    /*rules: z
        .string({
          required_error: 'URL不能为空',
        })
        .trim()
        .min(1, "URL不能为空")
        .max(255, "字符长度不能大于255！"),*/
    rules: z
        .array(z.string().optional())
        .length(2, '请选择请求方式并输入请求地址')
        .refine((v) => !!v[0], {
          message: '请选择请求方式',
        })
        .refine((v) => !!v[1] && v[1] !== '', {
          message: '　　　　　　　　 输入请求URL',
        })
        .refine((v) => v[1]?.match(new RegExp(FormValidPatternEnum.URL)), {
          // 使用全角空格占位，将错误提示文字挤到手机号码输入框的下面
          message: '　　　　　　　　 URL格式不正确',
        }),
  },
  {
    fieldName: 'requestParamList',
    label: '请求头参数',
    component: 'Input',
    formItemClass: 'items-start',
    labelClass: '!pt-2',
  },
  {
    fieldName: 'requestBody',
    label: '请求参数',
    wrapperClass: 'border',
    component: markRaw(CodeEditor),
    componentProps: {
      type: 'json',
      class: 'w-full',
      codeStyle: {
        width: '100%', minHeight: '100px'
      },
      placeholder: '请输入有效的JSON对象数据格式：如{"a": "123"}',
    },
    formItemClass: 'items-start',
    help: '请输入有效的JSON对象数据格式：如{"a": "123"}',
    rules: z.string().refine((v) => {
      try {
        JSON.parse(v);
        return true;
      } catch (error) {
        return false;
      }
    }, '请输入正确的参数格式，如{"a": "123"}').optional(),
  },
  {
    fieldName: 'responseBodyCase',
    label: '响应示例',
    component: markRaw(CodeEditor),
    wrapperClass: 'border',
    componentProps: {
      type: 'json',
      class: 'w-full',
      codeStyle: {
        width: '100%', minHeight: '100px'
      },
      placeholder: '请输入有效的JSON对象数据格式：如{"a": "123"}',
    },
  },
];

export const vxeFlowVariableTableColumns = [
  {
    title: '序号',
    type: 'seq',
    fixed: 'left',
    width: '48',
    align: 'center',
  },
  {
    title: '字段标识',
    width: 120,
    field: 'field',
    align: 'left',
    editRender: {
      name: 'input',
      placeholder: '请点击输入',
    },
  },
  {
    title: '字段名',
    field: 'label',
    align: 'left',
    editRender: {
      name: 'input',
      placeholder: '请点击输入',
    },
  },
  {
    title: '是否必填',
    width: 100,
    field: 'required',
    align: 'center',
    slots: { default: 'requiredOpen' },
  },
  {
    title: '字段描述',
    field: 'helpMessage',
    align: 'left',
    editRender: {
      name: 'input',
      placeholder: '请点击输入',
    },
  },
  {
    title: '默认值',
    width: 100,
    field: 'defaultValue',
    align: 'left',
    editRender: {
      name: 'input',
      placeholder: '请点击输入',
    },
  },
  {
    width: 60,
    title: '操作',
    align: 'center',
    slots: { default: 'action' },
    fixed: 'center',
  },
];
