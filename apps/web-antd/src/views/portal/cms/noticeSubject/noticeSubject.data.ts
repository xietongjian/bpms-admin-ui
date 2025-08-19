import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/commonEnum';
import {uploadFile} from "#/api/core/upload";
import { checkEntityExist } from '#/api/portal/cms/noticeSubject';

export const columns: VxeGridProps['columns'] = [
  {
    title: '标题',
    field: 'title',
    minWidth: 300,
    align: 'left',
  },
  {
    title: '标识',
    field: 'sn',
    width: 150,
    align: 'left',
  },
  {
    title: '短标题',
    field: 'shortTitle',
    align: 'left',
  },
  {
    title: '状态',
    field: 'status',
    width: 60,
    align: 'center',
    slots: { default: 'status' },
  },
  // {
  //   title: '主体LOGO',
  //   field: 'logo',
  //   width: 100,
  //   align: 'center',
  //   slots: { customRender: 'logoRender' },
  // },
  {
    title: '签章图片',
    field: 'signatureImg',
    width: 100,
    align: 'center',
    slots: { default: 'signatureImg' },
  },
  {
    title: '签发人',
    field: 'signerName',
    width: 100,
    align: 'left',
    slots: { default: 'signerName' },
  },
  // {
  //   title: '所属单位名称',
  //   field: 'companyName',
  //   width: 100,
  //   align: 'left',
  // },
  // {
  //   title: '所属部门名称',
  //   field: 'deptName',
  //   width: 100,
  //   align: 'left',
  // },
  {
    title: '排序号',
    field: 'orderNo',
    width: 100,
    align: 'left',
  },
  {
    title: '操作',
    width: 120,
    align: 'center',
    slots: { default: 'action' },
    fixed: 'right',
  },
  /*{
    align: 'right',
    cellRender: {
      attrs: {
        nameField: 'title',
        // onClick: onActionClick,
      },
      name: 'CellOperation',
      options: [
        {
          code: 'append',
          text: '新增下级',
          icon: 'ant-design:form-outlined',
        },
        'edit', // 默认的编辑按钮
        // 'delete', // 默认的删除按钮
        {
          code: 'delete',
          icon: 'ant-design:delete-outlined',
          text: '',
          title: '删除',
          okButtonProps: { danger: true },
        }
      ],
    },
    field: 'operation',
    fixed: 'right',
    headerAlign: 'center',
    showOverflow: false,
    title: '操作',
    width: 200,
  },*/
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
    label: '名称',
    component: 'Input',
    rules: z
        .string({
          required_error: '名称不能为空！'
        })
        .trim()
        .min(1, '名称不能为空！')
        .max(256, '字符长度不能大于256！'),
    help: '用于生成落款',
    formItemClass: 'col-span-3',
  },
  {
    fieldName: 'shortTitle',
    label: '短标题',
    component: 'Input',
    formItemClass: 'col-span-3',
    rules: z
        .string({
          required_error: '短标题不能为空！'
        })
        .trim()
        .min(1, '短标题不能为空！')
        .max(32, '字符长度不能大于32！'),
  },
  {
    fieldName: 'sn',
    label: '标识',
    component: 'Input',
    formItemClass: 'col-span-3',
    dependencies: {
      rules(values) {
        const { id, sn } = values;
        return z
            .string({
              required_error: '标识不能为空！'
            })
            .trim()
            .min(1, '标识不能为空！')
            .max(256, '字符长度不能大于256！')
            .regex(new RegExp(FormValidPatternEnum.SN), '请输入英文或数字且以英文或下划线开头！')
            .refine(
                async (e) => {
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
      },
      triggerFields: ['sn'],
    },
  },
  /*  {
    fieldName: 'titleId',
    label: '公文套头',
    required: false,
    component: 'ApiSelect',
    componentProps: {
      api: getAllNoticeTitle,
      placeholder: '请选择公文套头',
      mode:"multiple",
    },
    helpMessage: '当前发文主体可使用的套头',
    show: true,
  },*/
  /*  {
    fieldName: 'usingRanges',
    label: '使用范围',
    required: true,
    component: 'OrgPersonalSelector',
    componentProps: {
      multiple: true
    },
    show: true,
  },*/
  {
    fieldName: 'pid',
    label: '父主体ID',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['pid']
    }
  },
  // {
  //   fieldName: 'logoUploader',
  //   label: '主体LOGO',
  //   required: true,
  //   component: 'UploadFile',
  //   show: true,
  //   componentProps: {
  //     maxSize: 10,
  //     maxNumber: 1,
  //     // helpText: 'XXXXXXXXXXXXXX'
  //   },
  // },
  /*{
    fieldName: 'signatureImg',
    label: '签章图片',
    required: false,
    component: 'Upload',
    show: true,
    componentProps: {
      api: uploadApi,
      name: 'file',
      maxCount: 1,
      listType: 'picture-card',
      maxSize: 1,
      maxNumber: 1,
      multiple: false,
      helpText: '(仅支持gif,png)大小不超过1M，建议上传尺寸(像素)：200px*200px',
      accept: ['gif', 'png'],
    },
  },*/
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
      listType: 'picture-card',
    },
    fieldName: 'signatureImgUpload',
    label: '签章图片',
    renderComponentContent: () => {
      return {
        default: () => '请选择图片',
      };
    },
    formItemClass: 'col-span-3',
    // rules: 'required',
  },

  /*{
    fieldName: 'companyId',
    label: '所属单位',
    required: false,
    component: 'OrgSelector',
    show: true,
    componentProps: {
      selectType: OrgSelectType.COMPANY
    }
  },*/

  {
    fieldName: 'haveSigner',
    label: '是否有签发人',
    component: 'Switch',
    defaultValue: false,
    componentProps: {
      checkedChildren: '是',
      unCheckedChildren: '否',
    },
    formItemClass: 'col-span-1',
  },
  {
    fieldName: 'signerSelector',
    label: '签发人',
    hideLabel: true,
    component: 'PersonalSelector',
    componentProps: {
      placeholder: '请选择签发人'
    },
    dependencies: {
      triggerFields: ['haveSigner'],
      show: (values) => {
        return values.haveSigner
      },
      rules: (values) => {
        return values.haveSigner?'selectRequired': '';
      }
    },
    formItemClass: 'col-span-2'
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
    formItemClass: 'col-span-3',
    rules: 'selectRequired'
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
    formItemClass: 'col-span-3',
  },
  {
    fieldName: 'remark',
    label: '备注',
    component: 'Textarea',
    formItemClass: 'col-span-3',
    rules: z
        .string()
        .max(512, "字符长度不能大于512！")
        .nullish()
        .optional(),
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
  },
];
