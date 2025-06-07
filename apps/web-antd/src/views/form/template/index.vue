<template>
  <ColPage
      :left-max-width="50"
      :left-min-width="10"
      :left-width="15"
      :split-handle="true"
      :split-line="true"
      :resizable="true"
      :left-collapsible="true"
      :auto-content-height="true"
      content-class="h-full">
    <template #left class="h-full bg-card">
      <Tree
        class="h-full"
          :loading="treeLoading"
          treeWrapperClassName="h-[calc(100%-35px)] overflow-auto h-full"
          :clickRowToExpand="false"
          :treeData="formCategoryTreeData"
          @select="handleSelect"
          ref="basicTreeRef"
          block-node
          :field-names="{title: 'name'}"
          :actionList="treeActionList"
      >
        <template #headerTitle >
          <Row align="middle" class="w-full">
            <Col span="12">
              表单分类
            </Col>
            <Col span="12" class="text-right">
              <Button size="small" @click="handleCreateCategory" type="primary">新增分类</Button>
            </Col>
          </Row>
        </template>
      </Tree>
    </template>
    <div class="bg-card h-full">
      <BasicTable >
        <template #toolbar-tools >
          <Button v-access:code="PerPrefix+PerEnum.ADD" type="primary" @click="handleAddFormTemplate"> 新增</Button>
        </template>
        <template #action="{row}">
          <TableAction :actions="createActions(row)" />
        </template>
        <template #categoryCode="{row}">
          {{ formCategoryDataMap[row.categoryCode]?.name || '-' }}
        </template>
        <template #status="{row}">
          <Popconfirm
            :title="row.status == 1 ? '确定要将状态改为未生效吗？' : '确定要将状态改为已生效吗？'"
            @confirm="(e) => handleStatusChange(row, row.status != 1)"
            okText="确定"
            cancelText="取消"
          >
            <Switch
              :checked="row.status == 1"
              :checkedChildren="'已生效'"
              :unCheckedChildren="'未生效'"
              :loading="row.pendingStatus"
            />
          </Popconfirm>
        </template>
      </BasicTable>
    </div>
    <FormTemplateModal
      ref="formTemplateModalRef"
      :closeFunc="handleCloseFunc"
      @success="handleCloseFunc"
    />
    <FormCategoryModal ref="formCategoryModalRef" @success="handleCategorySuccess"/>
  </ColPage>
</template>

<script lang="ts" setup>
  import {h, ref} from 'vue';
  import { PerEnum } from '#/enums/perEnum';
  import type {Recordable} from '@vben/types';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {VxeGridProps, VxeGridListeners} from '#/adapter/vxe-table';
  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {ColPage, Page} from '@vben/common-ui';
  import {TableAction} from '#/components/table-action';

  import { columns, searchFormSchema } from './formTemplate.data';
  import FormTemplateModal from './FormTemplateModal.vue';

  import { getFormTemplateList, deleteById, getFormCategoryListData, deleteFormCategoryById, updateStatusById } from '#/api/form/formTemplate';
  import {Button, Tree, Col, Popconfirm, Row, Tooltip, message, Switch} from "ant-design-vue";

  import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons-vue";
  import {listToTree} from "#/utils/helper/treeHelper";
  import FormCategoryModal from "#/views/form/template/FormCategoryModal.vue";
  import type { DataNode } from 'ant-design-vue/es/tree';

  interface TreeNode extends DataNode {
    id: string | number;
    code: string;
    name: string;
    title?: string;
    pid?: string | number;
    orderNo?: number;
    children?: TreeNode[];
  }

  const formTemplateModalRef = ref();
  const formCategoryModalRef = ref();
  const PerPrefix = 'FormTemplate:';

  const treeLoading = ref(true);
  const formCategoryTreeData = ref<TreeNode[]>([]);
  const currentNode = ref<TreeNode | undefined>();
  const formCategoryDataMap = ref<Record<string, TreeNode>>({});

  const formOptions: VbenFormProps = {
    showCollapseButton: false,
    submitOnEnter: true,
    commonConfig: {
      labelWidth: 60,
    },
    wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    actionWrapperClass: 'col-span-2 col-start-2 text-left ml-2',
    resetButtonOptions: {
      show: false,
    },
    schema: searchFormSchema,
  };

  const gridOptions: VxeGridProps = {
    columns,
    columnConfig: {resizable: true},
    height: 'auto',
    border: false,
    keepSource: true,
    autoResize: false,
    stripe: true,
    round: false,
    radioConfig: {
      highlight: true,
      labelField: 'name',
      trigger: 'row',
    },
    proxyConfig: {
      ajax: {
        query: async ({page}, formValues) => {
          return await getFormTemplateList({
            query: {
              pageNum: page.currentPage,
              pageSize: page.pageSize,
            },
            entity: {...formValues, categoryCode: currentNode.value?.code},
          });
        },
      },
    },
  };

  const gridEvents: VxeGridListeners = {
    radioChange: ({row}) => {
      // clickRow(row);
    }
  };

  const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions, gridEvents});

  function createActions (row: Recordable<any>) {
    return [
      {
        auth: [PerPrefix + PerEnum.UPDATE],
        tooltip: '修改',
        icon: 'clarity:note-edit-line',
        onClick: handleEditFormTemplate.bind(null, row),
      },
      {
        auth: [PerPrefix + PerEnum.DELETE],
        tooltip: '删除',
        icon: 'ant-design:delete-outlined',
        danger: true,
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, row),
          placement: 'left',
          okButtonProps: {
            danger: true,
          }
        },
      },
    ];
  }

  const treeActionList = [
    {
      render: (node) => {
        return h(Tooltip, {placement: 'top', title:'新建子分类'}, [
          h(PlusOutlined, {
            class: 'ml-2',
            onClick: (e) => {
              e.stopPropagation();
              handleCreateCategory(node);
            },
          })
        ]);
      },
    },
    {
      render: (node) => {
        return h(Tooltip, {placement: 'top', title:'编辑'}, [
          h(EditOutlined, {
            class: 'ml-2',
            onClick: (e) => {
              e.stopPropagation();
              handleUpdateCategory({id: node.id, pid: node.pid, code: node.code, name: node.title, orderNo: node.orderNo});
            },
          })
        ]);
      },
    },
    {
      render: (node) => {
        return h(Popconfirm, {
          title: '确定要删除分类吗？',
          onConfirm: () => {
            handleDeleteCategory(node);
          }
        }, [
          h(Tooltip, {placement: 'top', title: '删除'}, [
            h(DeleteOutlined, {
              onClick: (e) => {
                e.stopPropagation();
              }, class: 'ml-2', style: {color: 'red'}
            })
          ])
        ])
      },
    },
  ];
  function handleCategorySuccess() {
    initFormCategoryTree();
  }
  async function initFormCategoryTree() {
    treeLoading.value = true;
    const res = await getFormCategoryListData();
    const tempCategoryMap = {};
    res.forEach(item => {
      tempCategoryMap[item.code] = item;
      item.title = item.name;
    })
    formCategoryDataMap.value = tempCategoryMap;

    const treeData = listToTree(res);
    formCategoryTreeData.value = treeData;
    treeLoading.value = false;
  }

  initFormCategoryTree();

  function handleCreateCategory(node: any) {
    formCategoryModalRef.value.setData({pid: node?.id});
    formCategoryModalRef.value.open();
    formCategoryModalRef.value.setState({
      title: "新增分类"
    });
  }

  function handleUpdateCategory(node: any) {
    formCategoryModalRef.value.setData(node);
    formCategoryModalRef.value.open();
    formCategoryModalRef.value.setState({
      title: "修改分类"
    });
  }
  async function handleSelect(node: any, e: any) {
    const selectedNode = e.selectedNodes[0];
    if (selectedNode) {
      currentNode.value = selectedNode;
      await tableApi.reload();
    } else {
      currentNode.value = undefined;
      await tableApi.reload();
    }
  }
  function handleAddFormTemplate() {
    formTemplateModalRef.value.setData({ categoryCode: currentNode.value?.code });
    formTemplateModalRef.value.setState({
      title: '添加模板'
    });
    formTemplateModalRef.value.open();
  }

  function handleEditFormTemplate(record: Recordable<any>) {
    formTemplateModalRef.value.setData(record);
    formTemplateModalRef.value.open();
    formTemplateModalRef.value.setState({
      title: '添加模板'
    });
  }

  function handleCloseFunc() {
    tableApi.reload();
  }

  function handleDelete(record: Recordable<any>) {
    const status = record.status;
    if (status == 1) {
      message.warning('已生效状态不能删除！');
      return;
    }
    deleteById([record.id]).then(() => {
      tableApi.reload();
    });
  }

  async function handleStatusChange(record: Recordable<any>, checked: boolean) {
    if (!Reflect.has(record, 'pendingStatus')) {
      record.pendingStatus = false;
    }
    record.pendingStatus = true;
    const newStatus = checked ? 1 : 0;
    try {
      await updateStatusById(record.id, newStatus.toString());
      record.status = newStatus;
      message.success('修改状态成功');
    } catch (error) {
      message.error('修改状态失败');
    } finally {
      record.pendingStatus = false;
    }
  }

  async function handleDeleteCategory(node: any) {
    if(node.children && node.children.length>0){
      message.warning('该分类下有子分类，不允许删除');
      return;
    }
    try {
      const {success, msg} = await deleteFormCategoryById(node.id);
      if(success){
        message.success(msg);
        initFormCategoryTree();
      } else {
        message.error(msg);
      }
    } finally {
      // closeFullLoading();
    }
  }
</script>

