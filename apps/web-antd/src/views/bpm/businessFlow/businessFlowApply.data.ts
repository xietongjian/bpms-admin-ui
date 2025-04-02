import type { VxeGridProps } from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { Tag } from 'ant-design-vue';
import { h } from 'vue';
// import { DescItem } from '@/components/Description';
import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/commonEnum';
import {z} from "@vben/common-ui";

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    width: 120,
    field: 'name',
    align: 'left',
  },
  {
    title: '流程体系',
    field: 'processSystemName',
    width: 120,
    align: 'left',
  },
  {
    title: '流程架构',
    field: 'frameworkName',
    width: 120,
    align: 'left',
  },
  {
    title: '流程负责人',
    field: 'ownerName',
    align: 'center',
    width: 100,
  },
  {
    title: '状态',
    field: 'status',
    width: 80,
    align: 'center',
    slots: { default: 'status'}
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 120,
    align: 'left',
  },
];

export const formColumns: VxeGridProps['columns'] = [
  {
    title: '操作',
    field: 'action',
    width: 100,
    align: 'center',
  },
  {
    field: 'name',
    align: 'left',
    title: '名称',
    width: 120,
  },
  {
    field: 'status',
    align: 'left',
    title: '状态',
    width: 80,
    customRender: ({ record }) => {
      const { status } = record;
      let statusName = '草稿';
      let color = '';
      if (status === 'ZZ') {
        statusName = '终止';
        color = 'red';
      } else if (status === 'BJ') {
        color = 'yellow';
        statusName = '审批结束';
      } else if (status === 'SPZ') {
        color = 'green';
        statusName = '审批中';
      } else if (status === 'CG') {
        color = 'blue';
      }
      return h(Tag, { color: color }, () => statusName);
    },
  },
  {
    title: '流程负责人',
    field: 'ownerName',
    align: 'center',
    width: 100,
  },
  {
    title: '业务表单key',
    field: 'modelKey',
    align: 'left',
    width: 100,
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 180,
  },
  {
    title: '修改时间',
    field: 'updateTime',
    width: 180,
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
];

export const formSchema: FormSchema[] = [
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
    label: '父id',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['pid']
    }
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
        .max(64, "名称不能大于64个字符"),
  },
  {
    fieldName: 'code',
    label: '编号',
    component: 'Input',
    rules: z
        .string({
          required_error: '编号不能为空',
        })
        .trim()
        .min(1, "编号不能为空")
        .max(64, "编号不能大于64个字符"),
  },
  {
    label: '流程层级',
    fieldName: 'level',
    component: 'Input',
    rules: 'required'
  },
  {
    label: '流程描述',
    fieldName: 'descr',
    component: 'Textarea',
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
    component: 'Textarea',
  },
  {
    label: '责任人',
    fieldName: 'personalCodePersonal',
    component: 'PersonalSelector',
    componentProps: {
      multiple: false,
    },
  },
  {
    fieldName: 'personalCode',
    label: '责任人',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [""]
    }
  },
  {
    label: '责任部门',
    fieldName: 'deptPersonal',
    component: 'OrgSelector',
    componentProps: {
      multiple: false,
      selectType: '2',
      placeholder: '请选择流程归属部门',
    },
  },
  {
    label: '责任部门',
    fieldName: 'deptId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [""]
    }
  },
  {
    label: '包含下一层流程',
    fieldName: 'nextProcess',
    component: 'Textarea',
  },
  {
    label: '流程输入信息',
    fieldName: 'inputInfo',
    component: 'Textarea',
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
    component: 'Textarea',
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
    component: 'Textarea',
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
    component: 'Textarea',
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
    component: 'Textarea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
  },
];

export const authSettingFormSchema: FormSchema[] = [
  {
    fieldName: 'businessFlowId',
    label: 'ID',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [""]
    },
    rules: 'required'
  },
  {
    fieldName: 'authType',
    label: '授权范围',
    component: 'RadioButtonGroup',
    defaultValue: '1',
    componentProps: () => {
      return {
        options: [
          { label: '指定范围', value: '0' },
          { label: '全员可见', value: '1' },
        ],
      };
    },
  },
  {
    label: '岗位',
    fieldName: 'positionInfos',
    component: 'PositionSelector',
    componentProps: {
      title: '选择岗位',
      multiple: true,
    },

    required: ({ values }) => {
      return false;
      return values.authType === '0';
    },
    show: ({ values }) => {
      return values.authType === '0';
    },
  },
  {
    label: '角色',
    fieldName: 'rolesRange',
    component: 'RoleSelector',
    componentProps: {
      title: '选择角色',
      multiple: true,
    },
    required: ({ values }) => {
      return false;
      return values.authType === '0';
    },
    show: ({ values }) => {
      return values.authType === '0';
    },
  },

  {
    label: '人员',
    fieldName: 'personals',
    component: 'PersonalSelector',
    componentProps: {
      multiple: true,
    },
    required: ({ values }) => {
      return false;
      return values.authType === '0';
    },
    show: ({ values }) => {
      return values.authType === '0';
    },
  },
];

export const businessFlowApplyFormSchema: FormSchema[] = [
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
    fieldName: 'businessFlowId',
    label: 'businessFlowId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [""]
    }
  },
  {
    fieldName: 'diagramsInfoId',
    label: 'businessFlowId',
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
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(64, "名称不能大于64个字符")
  },
  {
    fieldName: 'businessFlowId',
    label: '主表ID',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [""]
    }
  },
  {
    fieldName: 'frameworkId',
    label: '所属架构',
    component: 'Input',
    rules: 'required',
    dependencies: {
      show: () => false,
      triggerFields: [""]
    }
  },
  {
    fieldName: 'diagramsInfoId',
    label: '流程图设计器表ID',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [""]
    }
  },
  // {
  //   fieldName: 'modelKey',
  //   label: '绑定流程',
  //   component: 'ModelInfoSelector',
  //   componentProps: {
  //     multiple: false,
  //     title: '选择流程模板',
  //     extendParams: {
  //       searchInfo: { appSn: 'businessFlow' }, // 只过滤某个系统下的流程模板数据
  //       showLeftTreeNodes: [], // 需要显示的树节点ID
  //     },
  //   },
  //   colProps: { span: 24 },
  // },
  {
    fieldName: 'ownerCode',
    label: '流程Owner',
    rules: 'selectRequired',
    component: 'PersonalSelector',
    componentProps: {
      multiple: false,
      title: '选择流程拥有者',
    },
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
    component: 'Textarea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS + 1,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
  },
  {
    label: '流程输出信息',
    fieldName: 'outputInfo',
    component: 'Textarea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS + 1,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
  },
  /*{
    label: '授权范围',
    fieldName: 'authRange',
    component: 'Textarea',
    colProps: {span: 18, lg:{span: 18, offset:0}, sm:{span: 24, offset: 0}, xs:{span: 24, offset: 0}},
    componentProps: {
      autoSize: {
        minRows: 3,
        maxRows: 20
      }
    }
  },*/
  {
    label: '预估角色数',
    fieldName: 'roles',
    component: 'InputNumber',
    componentProps: {
      min: OrderNoDefaultEnum.MIN,
      max: OrderNoDefaultEnum.MAX,
    },
  },
  {
    label: '预估活动数',
    fieldName: 'activities',
    component: 'InputNumber',
    componentProps: {
      min: OrderNoDefaultEnum.MIN,
      max: OrderNoDefaultEnum.MAX,
    },
  },
];
// 业务流程详情字段
export const detailSchema: any[] = [
  {
    fieldName: 'name',
    label: '名称',
  },
  {
    fieldName: 'code',
    label: '编号',
  },
  {
    fieldName: 'ownerName',
    label: '流程Owner',
  },
  {
    fieldName: 'status',
    label: '状态',
    render: (curVal, data) => {
      const status = data.status;
      if (status == 0) {
        return '待发布';
      } else {
        return '已发布';
      }
    },
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
  {
    fieldName: 'roles',
    label: '预估角色数',
  },
  {
    fieldName: 'activities',
    label: '预估活动数',
  },
  {
    fieldName: 'createTime',
    label: '创建时间',
  },
];

// 绑定完整流程详情字段
export const flowDetailSchema: any[] = [
  {
    fieldName: 'name',
    label: '名称',
  },
  {
    fieldName: 'appSn',
    label: '归属系统',
    render: (_, data) => {
      return data.appSn === 'flow' ? '流程中心' : '门户';
    },
  },
  {
    fieldName: 'ownDeptName',
    label: '归属部门',
  },
  {
    fieldName: 'categoryName',
    label: '所属分类',
  },
  {
    fieldName: 'flowOwnerName',
    label: '流程Owner',
  },
  {
    fieldName: 'processDockingName',
    label: '流程BP',
  },
  {
    fieldName: 'orderNo',
    label: '排序号',
  },
];
