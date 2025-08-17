import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/commonEnum';
// import { optionsListApi } from '#/api/demo/select';
import { getAllBoard } from '#/api/portal/cms/board';
import {uploadFile} from "#/api/core/upload";


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
    slots: { default: 'status' },
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
      placeholder: '请输入关键字',
    },
    labelWidth: 60,
  },
];

export const formSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: '主键',
    component: 'Input',
    dependencies: {
      triggerFields: ['id'],
      show: false,
    }
  },
  {
    component: 'ApiSelect',
    // 对应组件的参数
    componentProps: {
      class: 'w-full',
      api: getAllBoard,
      params: {
        type: 3,
      },
    },
    // 字段名
    fieldName: 'publishBoard',
    // 界面显示的label
    label: '发布版块',
    rules: 'selectRequired'
  },
  {
    component: 'Upload',
    componentProps: {
      // 更多属性见：https://ant.design/components/upload-cn
      accept: '.png,.jpg,.jpeg',
      // 自动携带认证信息
      customRequest: uploadFile,
      disabled: false,
      maxCount: 1,
      multiple: false,
      showUploadList: true,
      // 上传列表的内建样式，支持四种基本样式 text, picture, picture-card 和 picture-circle
      listType: 'picture',
    },
    fieldName: 'imgPathUpload',
    label: '上传图片',
    renderComponentContent: () => {
      return {
        default: () => '请选择图片',
      };
    },
    wrapperClass: `
      [&_.ant-upload-wrapper]:min-h-40
      [&_.ant-upload-wrapper]:border
      [&_.ant-upload-wrapper]:w-full
    `,
    rules: 'required',
  },

  {
    fieldName: 'title',
    label: '标题',
    component: 'Input',
    rules: z
        .string({
          required_error: '标题不能为空！'
        })
        .min(1, "标题不能为空！")
        .max(255, "字符长度不能大于255！"),
    componentProps: {
      autocomplete: 'off',
    },
  },
  {
    fieldName: 'shortContent',
    label: '简介',
    component: 'Textarea',
    rules: z
        .string()
        .max(1024, "字符长度不能大于1024！")
        .nullish()
        .optional(),
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
    component: 'Input',
    rules: z
        .string()
        .max(255, "字符长度不能大于255！")
        .regex(new RegExp(FormValidPatternEnum.URL), "请输入正确的URL地址")
        .nullish()
        .optional(),
    // colProps: { span: 16 },
    componentProps: {
      placeholder: 'https://xxx.xxx.com/xxxx',
    },
  },
  {
    fieldName: 'linkType',
    label: ' ',
    component: 'RadioGroup',
    defaultValue: 1,
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
    // colProps: { span: 8 },
    labelWidth: 10,
  },
  {
    fieldName: 'publishRanges',
    label: '发布范围',
    rules: 'selectRequired',
    component: 'OrgSelector',
    componentProps: {
      multiple: true,
    },
  },
  /*{
    fieldName: 'posterUploader',
    label: '上传海报',
    component: 'UploadFile',
    helpMessage:'上传长图',
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
    component: 'RangePicker',
  },
  {
    fieldName: 'status',
    label: '启用状态',
    component: 'Switch',
    defaultValue: true,
    componentProps: {
      checkedChildren: '启用',
      unCheckedChildren: '禁用',
    },
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
