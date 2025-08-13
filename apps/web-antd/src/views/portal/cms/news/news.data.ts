import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import { h } from 'vue';
import { getAllNewsCategory } from '#/api/portal/cms/newsCategory';
import { Tinymce } from '#/components/Tinymce';
import { uploadApi } from '#/api/sys/upload';
// import {getAllBoard} from "#/api/portal/cms/board";
import { RemarkDefaultEnum } from '#/enums/commonEnum';
// import {baseColumns} from "#/utils";

export const columns: VxeGridProps['columns'] = [
  {
    title: '标题',
    field: 'title',
    width: 300,
    align: 'left',
    resizable: true,
  },
  /* {
    title: '发布人',
    field: 'personalName',
    width: 100,
    align: 'left',
    slots: {customRender: 'publishPersonalRender'},
  },
  {
    title: '发布单位',
    field: 'companyName',
    width: 100,
    align: 'left',
  },*/
  {
    title: '分类',
    field: 'categoryName',
    width: 100,
    align: 'left',
  },
  {
    title: '发布状态',
    field: 'publishStatusName',
    width: 100,
    align: 'center',
    // slots: {customRender: 'publishStatusRender'},
  },
  {
    title: '发布时间',
    field: 'publishTime',
    width: 100,
    align: 'left',
  },
  {
    title: '浏览量',
    field: 'visitCount',
    width: 100,
    align: 'right',
  },
  {
    title: '操作',
    width: 120,
    align: 'center',
    slots: { default: 'action' },
    fixed: 'right',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称',
    },
    labelWidth: 60,
    colProps: {
      span: 6,
      lg: { span: 6, offset: 0 },
      sm: { span: 10, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
  {
    fieldName: 'publishStatus',
    label: '发布状态',
    component: 'Select',
    labelWidth: 70,
    colProps: {
      span: 6,
      lg: { span: 6, offset: 0 },
      sm: { span: 10, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
  /*{
    fieldName: 'publishBoard',
    label: '发布版块',
    component: 'ApiSelect',
    componentProps: {
      api: getAllBoard,
      params: {type: 1},
      placeholder: '请选择发布状态',
    },
    labelWidth: 70,
    colProps: {
      span: 6,
      lg: {span: 6, offset: 0},
      sm: {span: 10, offset: 0},
      xs: {span: 16, offset: 0}
    },
  },*/
];

export const formSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: '主键',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'title',
    label: '标题',
    required: true,
    component: 'Input',
    show: true,
    rules: [
      {
        required: false,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 256,
        message: '字符长度不能大于256！',
      },
    ],
    componentProps: {
      autocomplete: 'off',
    },
    colProps: {
      span: 24,
    },
  },
  {
    fieldName: 'categoryId',
    label: '新闻类型',
    required: false,
    show: true,
    component: 'ApiTreeSelect',
    componentProps: {
      filterTreeNode: true,
      api: getAllNewsCategory,
    },
    colProps: {
      span: 24,
    },
  },
  {
    fieldName: 'publishTime',
    label: '发布时间',
    required: false,
    component: 'DatePicker',
    show: true,
    colProps: {
      span: 24,
    },
  },
  {
    fieldName: 'thumbImg',
    label: '缩略图',
    required: false,
    component: 'Upload',
    show: true,
    componentProps: {
      api: uploadApi,
    },
    colProps: {
      span: 24,
    },
  },
  /*  {
    fieldName: 'publishBoard',
    label: '发布版块标识（存储多个版块用逗号分隔）',
    required: false,
    component: 'Input',
    show: true,
  },*/
  {
    fieldName: 'shortContent',
    label: '关键内容',
    required: false,
    component: 'Input',
    show: true,
    rules: [
      {
        max: 260,
        message: '字符长度不能大于260！',
      },
    ],
    colProps: {
      span: 24,
    },
  },
  {
    fieldName: 'orderNo',
    label: '排序号',
    required: false,
    component: 'InputNumber',
    show: true,
  },
  {
    fieldName: 'remark',
    label: '备注',
    required: false,
    component: 'InputTextArea',
    show: true,
    rules: [
      {
        max: 516,
        message: '字符长度不能大于516！',
      },
    ],
    colProps: {
      span: 24,
    },
  },
];

export const baseFormSchema: FormSchema[] = [
  /*{
    fieldName: 'publishBoard',
    label: '发布版块',
    component: 'CheckboxGroup',
    show: true,
    required: true,
    colProps: {
      span: 24,
    }
  },*/
  {
    fieldName: 'id',
    label: '主键',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'title',
    label: '标题',
    required: true,
    component: 'Input',
    show: true,
    componentProps: {
      maxlength: 256,
      autocomplete: 'off',
    },
    colProps: {
      span: 20,
    },
  },
  /*{
    fieldName: 'keywords',
    label: '关键字',
    required: false,
    component: 'Select',
    componentProps: {
      mode: "tags",
      placeholder: '请输入关键字，回车确定！',
      open: false
    },
    colProps: {
      span: 20,
    }
  },*/
  {
    fieldName: 'categoryId',
    label: '新闻分类',
    required: true,
    show: true,
    component: 'ApiTreeSelect',
    componentProps: {
      filterTreeNode: true,
      api: getAllNewsCategory,
      params: { status: true },
    },
    colProps: {
      span: 12,
    },
  },
  {
    fieldName: 'publishRanges',
    label: '发送范围',
    required: true,
    component: 'OrgPersonalSelector',
    componentProps: {
      multiple: true,
    },
    show: true,
    colProps: {
      span: 20,
    },
  },
  /*  {
    fieldName: 'thumbUploader',
    label: '封面图片',
    // required: true,
    component: 'UploadFile',
    show: true,
    componentProps: {
      maxSize: 2,
      maxNumber: 1,
      helpText: '大小不超过2M，建议上传尺寸(像素)：300px*168px'
    },
    colProps: {
      span: 20,
    }
  },*/
  {
    fieldName: 'shortContent',
    label: '简介',
    required: false,
    component: 'InputTextArea',
    show: true,
    colProps: {
      span: 24,
    },
    componentProps: {
      maxlength: 200,
      showCount: true,
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
  },
  {
    fieldName: 'content',
    component: 'Input',
    label: '内容',
    defaultValue: '',
    rules: [{ required: true }],
    render: ({ model, field }) => {
      return h(Tinymce, {
        value: model[field],
        showImageUpload: false,
        options: [],
        plugins: [],
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
    colProps: {
      span: 24,
    },
  },
  /*{
    fieldName: 'publishTime',
    label: '发布时间',
    required: false,
    component: 'DatePicker',
    show: true,
  },
  {
    fieldName: 'orderNo',
    label: '排序号',
    helpMessage:'数值越小越靠前！',
    required: false,
    component: 'InputNumber',
    show: true,
    colProps: {
      span: 10
    },
    defaultValue: OrderNoDefaultEnum.VALUE,
    componentProps: {
      min: OrderNoDefaultEnum.MIN,
      max: OrderNoDefaultEnum.MAX
    },
  }*/
];

export const contentFormSchema: FormSchema[] = [
  // 集成UEditor
  // https://blog.csdn.net/weixin_43588821/article/details/109131958
];
