import type { VxeGridProps } from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { getAllLevels } from '#/api/bpm/flowprocess';
// import { DescItem } from '@/components/Description';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { RemarkDefaultEnum } from '#/enums/commonEnum';

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
  },
  {
    title: '编号',
    field: 'code',
    width: 120,
    align: 'left',
  },
  {
    title: '层级',
    field: 'level',
    width: 60,
    align: 'left',
  },
  {
    title: '责任人',
    field: 'ownerName',
    width: 120,
    align: 'left',
  },
  {
    title: '责任部门',
    field: 'deptName',
    width: 120,
    align: 'left',
  },
  /*{
    title: '流程体系id',
    field: 'processSystemId',
    width: 120,
    align: 'left',
  },*/
  {
    title: '创建时间',
    field: 'createTime',
    width: 120,
    align: 'left',
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
      lg: { span: 8, offset: 0 },
      sm: { span: 14, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
];

export const flowFrameworkFormSchema: FormSchema[] = [
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
    fieldName: 'pid',
    label: '父id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [""]
    }
  },
  {
    fieldName: 'diagramsInfoId',
    label: 'diagramsInfoId',
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
        whitespace: true,
        required: true,
        message: '名称不能为空！',
      },
      {
        pattern: new RegExp('^.{1,64}$'),
        type: 'string',
        message: '字符长度不能大于64！',
      },
    ],*/
  },
  {
    fieldName: 'code',
    label: '编号',
    component: 'Input',
    required: true,
    /*rules: [
      {
        whitespace: true,
        required: true,
        message: '编号不能为空！',
      },
      {
        pattern: new RegExp('^.{1,40}$'),
        type: 'string',
        message: '编号长度不能大于40！',
      },
    ],*/
  },
  {
    fieldName: 'orderNo',
    label: '序号',
    component: 'InputNumber',
    componentProps: {
      min: 0,
      step: 1,
      precision: 0,
    },
    required: true,
    // rules: [
    //   {
    //     required: true,
    //     type: 'number',
    //     message: '序号不能为空！',
    //   },
    // ],
  },
  {
    label: '流程层级',
    fieldName: 'level',
    component: 'ApiSelect',
    componentProps: {
      labelField: 'name',
      valueField: 'value',
      api: getAllLevels,
    },
    required: true,
  },
  {
    label: '流程描述',
    fieldName: 'descr',
    component: 'InputTextArea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
  },
  {
    label: '流程目的',
    fieldName: 'objective',
    component: 'InputTextArea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
  },
  {
    label: '责任人',
    fieldName: 'ownerPersonal',
    component: 'PersonalSelector',
    componentProps: {
      multiple: false,
    },
  },
  {
    label: '责任部门',
    fieldName: 'ownerDept',
    component: 'OrgSelector',
    componentProps: {
      multiple: false,
      selectType: '2',
      placeholder: '请选择流程归属部门',
    },
  },
  {
    label: '包含下一层流程',
    fieldName: 'nextProcess',
    component: 'InputTextArea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
  },
  {
    label: '流程输入信息',
    fieldName: 'inputInfo',
    component: 'InputTextArea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
  },
  {
    label: '流程输出信息',
    fieldName: 'outputInfo',
    component: 'InputTextArea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
  },
  {
    label: '流程起始',
    fieldName: 'processStart',
    component: 'InputTextArea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
  },
  {
    label: '流程终止',
    fieldName: 'processEnd',
    component: 'InputTextArea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
  },
  {
    label: '流程的KPI',
    fieldName: 'processKpi',
    component: 'InputTextArea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
  },
];

export const formSchemaBusiness: FormSchema[] = [
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
    fieldName: 'frameworkId',
    label: '架构id',
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
        whitespace: true,
        required: true,
        message: '名称不能为空！',
      },
      {
        pattern: new RegExp('^.{1,64}$'),
        type: 'string',
        message: '字符长度不能大于64！',
      },
    ],*/
  },
  {
    fieldName: 'startActivity',
    label: '开始活动',
    component: 'Input',
  },
  {
    label: '结束活动',
    fieldName: 'endActivity',
    component: 'Input',
  },
  {
    label: '流程输入信息',
    fieldName: 'inputInfo',
    component: 'InputTextArea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
  },
  {
    label: '流程输出信息',
    fieldName: 'outputInfo',
    component: 'InputTextArea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
  },
  {
    label: '预估角色数',
    fieldName: 'roles',
    component: 'Input',
  },
  {
    label: '预估活动数',
    fieldName: 'activities',
    component: 'Input',
  },
];

export const detailSchema: any[] = [
  {
    fieldName: 'name',
    label: '流程负责人',
  },
  {
    fieldName: 'ownerName',
    label: '负责人',
  },
  {
    fieldName: 'deptName',
    label: '责任部门',
  },
  {
    fieldName: 'level',
    label: '流程层级',
  },
  {
    fieldName: 'nextProcess',
    label: '包含下一层流程',
  },
  {
    fieldName: 'descr',
    label: '流程描述',
  },
  {
    fieldName: 'processKpi',
    label: '流程的KPI',
  },
  {
    fieldName: 'processStart',
    label: '流程起始',
  },
  {
    fieldName: 'processEnd',
    label: '流程终止',
  },
  {
    fieldName: 'objective',
    label: '流程目的',
  },
  {
    fieldName: 'deptName',
    label: '开始活动',
  },
  {
    fieldName: 'startActivity',
    label: '开始活动',
  },
  {
    fieldName: 'endActivity',
    label: '结束活动',
  },
  {
    fieldName: 'inputInfo',
    label: '输入信息',
  },
  {
    fieldName: 'outputInfo',
    label: '输出信息',
  },
];

export const detailViewSchema: any[] = [
  {
    fieldName: 'name',
    label: '名称',
  },
  {
    fieldName: 'type',
    label: '类型',
    render: () => {
      return h(Tag, { color: '#108ee9' }, '架构');
    },
  },
  {
    fieldName: 'code',
    label: '编码',
  },
  {
    fieldName: 'ownerName',
    label: '负责人',
  },
  {
    fieldName: 'deptName',
    label: '责任部门',
  },
  {
    fieldName: 'level',
    label: '流程层级',
  },
  {
    fieldName: 'nextProcess',
    label: '包含下一层流程',
  },
  {
    fieldName: 'descr',
    label: '流程描述',
  },
  {
    fieldName: 'processKpi',
    label: '流程的KPI',
  },
  {
    fieldName: 'processStart',
    label: '流程起始',
  },
  {
    fieldName: 'processEnd',
    label: '流程终止',
  },
  {
    fieldName: 'objective',
    label: '流程目的',
  },
  {
    fieldName: 'inputInfo',
    label: '输入信息',
  },
  {
    fieldName: 'outputInfo',
    label: '输出信息',
  },
];

export const detailSystemViewSchema: any[] = [
  {
    fieldName: 'name',
    label: '名称',
  },
  {
    fieldName: 'type',
    label: '类型',
    render: () => {
      return h(Tag, { color: '#108ee9' }, '体系');
    },
  },
  {
    fieldName: 'descr',
    label: '流程描述',
  },
];

export const flowSystemFormSchema: FormSchema[] = [
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
    fieldName: 'diagramsInfoId',
    label: 'diagramsInfoId',
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
    labelWidth: 60,
    /*rules: [
      {
        whitespace: true,
        required: true,
        message: '名称不能为空！',
      },
      {
        pattern: new RegExp('^.{1,40}$'),
        type: 'string',
        message: '字符长度不能大于40！',
      },
    ],*/
  },
  {
    fieldName: 'orderNo',
    label: '序号',
    component: 'InputNumber',
    componentProps: {
      min: 0,
      step: 1,
      precision: 0,
    },
    required: true,
    labelWidth: 60,
    /*rules: [
      {
        required: true,
        message: '序号不能为空！',
      },
    ],*/
  },
  {
    label: '备注',
    fieldName: 'descr',
    component: 'InputTextArea',
    labelWidth: 60,
    /*rules: [
      {
        max: 1024,
        message: '字符长度不能大于1024！',
      },
    ],*/
    componentProps: {
      autoSize: {
        minRows: 3,
        maxRows: 20,
      },
    },
  },
];
