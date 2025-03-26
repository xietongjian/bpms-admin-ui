// import { BasicColumn, FormSchema } from '@/components/Table';
import { LevelNoDefaultEnum, OrderNoDefaultEnum } from '#/enums/commonEnum';
import { uploadInstitutionFile } from '#/api/institution/institution';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';


export const InstitutionColumns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
    minWidth: 300,
    resizable: true,
  },
  {
    title: '级别',
    field: 'level',
    align: 'left',
    width: 80,
    resizable: true,
  },
  {
    title: '权限范围',
    field: 'privilegeRange',
    align: 'right',
    width: 120,
    format: (text) => (text === '1' ? '公开' : '范围内可见'),
  },
  {
    title: '部门',
    field: 'deptRangeData',
    minWidth: 300,
    width: 300,
  },
  {
    title: '岗位',
    field: 'positionRangeData',
    minWidth: 300,
    width: 300,
  },
  {
    title: '排序',
    field: 'orderNo',
    align: 'right',
    width: 80,
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 180,
  },
  {
    width: 100,
    align: 'left',
    title: '操作',
    field: 'action',
    slots: {default: 'action'},
    fixed: 'right'
  }
];

export const InstitutionSearchForm: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/编码',
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
    fieldName: 'categoryId',
    label: '',
    component: 'Input',
    show: false,
  },
];

export const InstitutionModalForm: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [""]
    }
  },
  {
    fieldName: 'categoryId',
    label: 'categoryId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [""]
    }
  },
  {
    fieldName: 'name',
    label: '名称',
    component: 'Input',
    required: true,
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 20,
        message: '字符长度不能大于20！',
      },
    ],*/
  },
  {
    fieldName: 'level',
    label: '级别',
    component: 'InputNumber',
    required: true,
    defaultValue: LevelNoDefaultEnum.VALUE,
    componentProps: {
      min: LevelNoDefaultEnum.MIN,
      max: LevelNoDefaultEnum.MAX,
    },
  },
  {
    fieldName: 'orderNo',
    label: '排序号',
    helpMessage: '数值越小越靠前！',
    component: 'InputNumber',
    defaultValue: OrderNoDefaultEnum.VALUE,
    componentProps: {
      min: OrderNoDefaultEnum.MIN,
      max: OrderNoDefaultEnum.MAX,
    },
  },
  {
    fieldName: 'filePath',
    slot: 'UploadFile',
    label: '制度文件',
    // rules: [{ required: true, trigger: 'change', message: '请选择上传文件' }],
  },
  {
    fieldName: 'privilegeRange',
    component: 'RadioGroup',
    label: '权限范围',
    required: true,
    componentProps: {
      options: [
        {
          label: '公开',
          value: '1',
        },
        {
          label: '设置范围',
          value: '2',
        },
      ],
    },
  },
  {
    ifShow: ({ values }) => values?.['privilegeRange'] === '2',
    fieldName: 'deptRangeData',
    label: '部门',
    component: 'OrgSelector',
    componentProps: {
      multiple: true,
      selectType: '2',
      placeholder: '请选择可见部门',
    },
    // componentProps: {
    //   treeNodeFilterProp: 'name',
    //   getPopupContainer: () => document.body,
    // },
    required: true,
  },
  {
    ifShow: ({ values }) => values?.['privilegeRange'] === '2',
    fieldName: 'positionRangeData',
    label: '岗位',
    component: 'PositionSelector',
    componentProps: {
      title: '选择岗位',
      multiple: true,
    },
    // componentProps: {
    //   treeNodeFilterProp: 'name',
    //   getPopupContainer: () => document.body,
    // },
    required: true,
  },
];
