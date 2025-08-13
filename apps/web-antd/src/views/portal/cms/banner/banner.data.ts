import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/commonEnum';
// import { optionsListApi } from '#/api/demo/select';
import { getAllBoard } from '#/api/portal/cms/board';
import { uploadApi } from '#/api/sys/upload';
// import {baseColumns} from "#/utils"


// 各频道的Banner尺寸提示
const bannerImgHelpMsgObj = {
  workbench_banner: '大小不超过2M，建议上传尺寸(像素)：288px*160px',
  news_home_banner: '大小不超过2M，建议上传尺寸(像素)：510px*248px',
  person_resource_banner: '大小不超过2M，建议上传尺寸(像素)：440px*148px',
  it_home_banner: '大小不超过2M，建议上传尺寸(像素)：440px*148px',
  financial_banner: '大小不超过2M，建议上传尺寸(像素)：322px*210px',
};

export const columns: VxeGridProps['columns'] = [
  {
    title: '标题',
    field: 'title',
    minWidth: 250,
    align: 'center',
    slots: { default: 'imgs' },
  },
  {
    title: '跳转链接地址',
    field: 'linkUrl',
    align: 'left',
    slots: { default: 'linkUrlRender' },
  },

  {
    title: '跳转方式',
    field: 'linkType',
    width: 80,
    align: 'center',
    customRender: ({ record }) => {
      const status = record.linkType;
      const enable = ~~status === 1;
      const color = enable ? 'green' : '#faad14';
      const text = enable ? '打开新页面' : '覆盖当前页';
      return h(Tag, { color: color }, () => text);
    },
  },
  // {
  //   title: '生效时间',
  //   field: 'startTime',
  //   width: 200,
  //   align: 'center',
  //   slots: { customRender: 'timeRangeRender' },
  // },
  // {
  //   title: '发布时间',
  //   field: 'publishTime',
  //   width: 100,
  //   align: 'left',
  // },
  {
    title: '启用状态',
    field: 'status',
    width: 70,
    align: 'center',
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '排序号',
    field: 'orderNo',
    width: 80,
    align: 'left',
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
];

export const formSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: '主键',
    required: false,
    component: 'Input',
    show: false,
  },
  /*{
    fieldName: 'publishBoard',
    label: '发布版块',
    component: 'ApiRadioGroup',
    componentProps: {
      api: getAllBoard,
      params: {
        type: 3,
      },
      resultField: 'list',
      // use name as label
      labelField: 'name',
      // use id as value
      valueField: 'id',
    },
    show: true,
    colProps: {
      span: 24,
    },
  },*/
  {
    fieldName: 'imgPath',
    label: '上传图片',
    required: true,
    component: 'Upload',
    show: true,
    componentProps: ({ formModel }) => {
      return {
        api: uploadApi,
        name: 'file',
        listType: 'picture-card',
        className: 'banner-view',
        maxSize: 1,
        maxNumber: 1,
        multiple: false,
        // helpText: bannerImgHelpMsgObj[formModel.publishBoard],
      };
    },
  },
  {
    fieldName: 'title',
    label: '标题',
    required: true,
    component: 'Input',
    show: true,
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '标题不能为空！',
      },
      {
        max: 260,
        message: '字符长度不能大于260！',
      },
    ],*/
    componentProps: {
      autocomplete: 'off',
    },
  },
  {
    fieldName: 'shortContent',
    label: '简介',
    required: false,
    component: 'Textarea',
    show: true,
    /*rules: [
      {
        max: 1024,
        message: '字符长度不能大于1024！',
      },
    ],*/
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
  },
  /*  {
    fieldName: 'keywords',
    label: '关键字',
    required: false,
    component: 'Select',
    componentProps: {
      mode: "tags",
      placeholder: '请输入关键字，回车确定！',
      open: false
    },
    colProps
  },*/
  {
    fieldName: 'linkUrl',
    label: '跳转链接',
    required: false,
    component: 'Input',
    show: true,
    colProps: { span: 16 },
    /*rules: [
      {
        type: 'url',
        message: '请输入正确的链接地址！',
      },
    ],*/
    componentProps: {
      placeholder: 'https://xxx.xxx.com/xxxx',
    },
  },
  {
    fieldName: 'linkType',
    label: ' ',
    required: false,
    component: 'RadioGroup',
    defaultValue: 1,
    show: true,
    componentProps: {
      options: [
        {
          label: '打开新页面',
          value: 1,
        },
        {
          label: '覆盖当前页',
          value: 2,
        },
      ],
    },
    colProps: { span: 8 },
    labelWidth: 10,
  },
  {
    fieldName: 'publishRanges',
    label: '发布范围',
    required: true,
    component: 'OrgSelector',
    show: true,
    componentProps: {
      multiple: true,
    },
  },
  /*{
    fieldName: 'posterUploader',
    label: '上传海报',
    required: false,
    component: 'UploadFile',
    helpMessage:'上传长图',
    show: true,
    componentProps: {
      className: 'banner-view',
      maxSize: 10,
      maxNumber: 1,
      helpText: '大小不超过10M，建议尺寸图片宽度不超过1500px'
    }
  },*/
  {
    fieldName: 'validTimeRange',
    label: '生效时间',
    required: false,
    component: 'RangePicker',
    show: true,
  },
  {
    fieldName: 'status',
    label: '启用状态',
    required: false,
    component: 'Switch',
    defaultValue: true,
    show: true,
    componentProps: {
      checkedChildren: '启用',
      unCheckedChildren: '禁用',
    },
  },
  {
    fieldName: 'orderNo',
    label: '排序号',
    colProps: { span: 9 },
    helpMessage: '数值越小越靠前！',
    required: false,
    component: 'InputNumber',
    show: true,
    defaultValue: OrderNoDefaultEnum.VALUE,
    componentProps: {
      min: OrderNoDefaultEnum.MIN,
      max: OrderNoDefaultEnum.MAX,
    },
  },
];
