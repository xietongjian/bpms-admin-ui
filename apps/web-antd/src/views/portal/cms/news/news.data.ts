import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import { h } from 'vue';
import { getAllNewsCategory } from '#/api/portal/cms/newsCategory';
import { uploadApi } from '#/api/sys/upload';
// import {getAllBoard} from "#/api/portal/cms/board";
import { RemarkDefaultEnum } from '#/enums/commonEnum';

export const columns: VxeGridProps['columns'] = [
  {
    title: '标题',
    field: 'title',
    minWidth: 300,
    align: 'left',
    resizable: true,
    slots: { default: 'title' }
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
    slots: {default: 'publishStatusName'},
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
  },
  {
    fieldName: 'publishStatus',
    label: '发布状态',
    component: 'Select',
    labelWidth: 60,
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
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['id']
    }
  },
  {
    fieldName: 'title',
    label: '标题',
    component: 'Input',
    rules: z
        .string({
          required_error: '名称不能为空！'
        })
        .min(1, "名称不能为空！")
        .max(255, "字符长度不能大于255！"),

    componentProps: {
      autocomplete: 'off',
    },
  },
  {
    fieldName: 'categoryId',
    label: '新闻类型',
    component: 'ApiTreeSelect',
    componentProps: {
      filterTreeNode: true,
      api: getAllNewsCategory,
    },
    rules: 'selectRequired',
  },
  {
    fieldName: 'publishTime',
    label: '发布时间',
    component: 'DatePicker',
  },
  {
    fieldName: 'thumbImg',
    label: '缩略图',
    component: 'Upload',
    componentProps: {
      api: uploadApi,
    },
  },
  /*  {
    fieldName: 'publishBoard',
    label: '发布版块标识（存储多个版块用逗号分隔）',
    component: 'Input',
  },*/
  {
    fieldName: 'shortContent',
    label: '关键内容',
    component: 'Input',
    rules: z
        .string()
        .max(255, "字符长度不能大于255！")
        .nullish()
        .optional(),
  },
  {
    fieldName: 'orderNo',
    label: '排序号',
    component: 'InputNumber',
  },
  {
    fieldName: 'remark',
    label: '备注',
    component: 'InputTextArea',
    rules: z
        .string()
        .max(512, "字符长度不能大于512！")
        .nullish()
        .optional(),
  },
];

export const baseFormSchema: FormSchema[] = [
  /*{
    fieldName: 'publishBoard',
    label: '发布版块',
    component: 'CheckboxGroup',
  },*/
  {
    fieldName: 'id',
    label: '主键',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['id']
    }
  },
  {
    fieldName: 'title',
    label: '标题',
    component: 'Input',
    componentProps: {
      maxlength: 256,
      autocomplete: 'off',
    },
    rules: z
        .string({
          required_error: '标题不能为空！'
        })
        .min(1, "标题不能为空！")
        .max(255, "字符长度不能大于255！"),
  },
  /*{
    fieldName: 'keywords',
    label: '关键字',
    component: 'Select',
    componentProps: {
      mode: "tags",
      placeholder: '请输入关键字，回车确定！',
      open: false
    },
  },*/
  {
    fieldName: 'categoryId',
    label: '新闻分类',
    component: 'ApiTreeSelect',
    componentProps: {
      filterTreeNode: true,
      api: getAllNewsCategory,
      params: { status: true },
    },
    rules: 'selectRequired'
  },
  {
    fieldName: 'publishRanges',
    label: '发送范围',
    component: 'OrgPersonalSelector',
    componentProps: {
      multiple: true,
    },
    rules: 'selectRequired'
  },
  /*  {
    fieldName: 'thumbUploader',
    label: '封面图片',
    component: 'UploadFile',
    componentProps: {
      maxSize: 2,
      maxNumber: 1,
      helpText: '大小不超过2M，建议上传尺寸(像素)：300px*168px'
    },
  },*/
  {
    fieldName: 'shortContent',
    label: '简介',
    component: 'Textarea',
    componentProps: {
      showCount: true,
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    rules: z
        .string()
        .max(256, "字符长度不能大于256！")
        .nullish()
        .optional(),
  },
  {
    fieldName: 'content',
    component: 'Textarea',
    label: '内容',
    defaultValue: '',
    rules: 'required',
    // rules: [{ required: true }],
    /*render: ({ model, field }) => {
      return h(Tinymce, {
        value: model[field],
        showImageUpload: false,
        options: [],
        plugins: [],
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },*/
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
