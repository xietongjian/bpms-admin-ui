<template>
  <PageWrapper contentFullHeight dense fixedHeight class="h-full">
    <div class="p-4 h-full">
      <SplitPane>
        <template #left>
          <BasicTree
            :loading="treeLoading"
            treeWrapperClassName="h-[calc(100%-35px)] overflow-auto h-full"
            :clickRowToExpand="false"
            :treeData="formCategoryTreeData"
            @select="handleSelect"
            ref="basicTreeRef"
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
          </BasicTree>
        </template>
        <template #main>
          <BasicTable @register="registerTable" class="!p-0">
            <template #toolbar>
              <Authority :value="'FormTemplate:' + PerEnum.ADD">
                <a-button type="primary" @click="handleAddFormTemplate"> 新增</a-button>
              </Authority>
            </template>
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'action'">
                <TableAction
                  :actions="[
                {
                  auth: 'FormTemplate:' + PerEnum.UPDATE,
                  tooltip: '修改',
                  icon: 'clarity:note-edit-line',
                  onClick: handleEditFormTemplate.bind(null, record),
                },
                {
                  auth: 'FormTemplate:' + PerEnum.DELETE,
                  tooltip: '删除',
                  icon: 'ant-design:delete-outlined',
                  color: 'error',
                  popConfirm: {
                    title: '是否确认删除',
                    confirm: handleDelete.bind(null, record),
                    placement: 'left',
                  },
                },
              ]"
                />
              </template>
              <template v-else-if="column.key === 'categoryCode'">
                {{ formCategoryDataMap[record.categoryCode]?.name || '-' }}
              </template>
            </template>
          </BasicTable>
        </template>
      </SplitPane>
    </div>
    <FormTemplateModal
      @register="registerModal"
      :closeFunc="handleCloseFunc"
      @success="handleCloseFunc"
    />
    <FormCategoryModal @register="registerFormCategoryModal" @success="handleCategorySuccess"/>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import {h, ref} from 'vue';
  import { PerEnum } from '@/enums/perEnum';
  import SplitPane from '@/views/components/splitPane/index.vue';
  import {PageWrapper} from '@/components/Page';

  import { Authority } from '@/components/Authority';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { useModal } from '@/components/Modal';
  import { columns, searchFormSchema } from './formTemplate.data';
  import FormTemplateModal from './FormTemplateModal.vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { getFormTemplateList, deleteById, getFormCategoryListData, deleteFormCategoryById } from '#/api/form/formTemplate';
  import {Button, Col, Popconfirm, Row, Tooltip} from "ant-design-vue";
  import {BasicTree, TreeActionItem} from "@/components/Tree";
  import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons-vue";
  import {listToTree} from "@/utils/helper/treeHelper";
  import FormCategoryModal from "@/views/form/template/FormCategoryModal.vue";
  import {useLoading} from "@/components/Loading";

  const { createMessage } = useMessage();
  const treeLoading = ref(true);
  const formCategoryTreeData = ref([]);
  const currentNode = ref(undefined);
  const [registerModal, { openModal, setModalProps }] = useModal();
  const formCategoryDataMap = ref<any>({});
  const [registerFormCategoryModal, {openModal: openFormCategoryModal, setModalProps: setFormCategoryModalProps}] = useModal();
  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '加载中...',
  });
  const [registerTable, { reload, getForm }] = useTable({
    title: '列表',
    api: getFormTemplateList,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      showAdvancedButton: false,
      showResetButton: false,
      autoSubmitOnEnter: true,
    },
    canColDrag: true,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: true,
    indexColumnProps: {
      width: 50,
    },
    actionColumn: {
      width: 100,
      title: '操作',
      dataIndex: 'action',
    },
  });

  const treeActionList: TreeActionItem[] = [
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
    openFormCategoryModal(true, {
      isUpdate: false,
      record: {pid: node?.id}
    });
    setFormCategoryModalProps({ title: "新增分类", centered: true });
  }

  function handleUpdateCategory(node: any) {
    openFormCategoryModal(true, {
      isUpdate: true,
      record: node
    });
    setFormCategoryModalProps({ title: "修改分类", centered: true });
  }
  async function handleSelect(node: any, e: any) {
    const selectedNode = e.selectedNodes[0];
    if (selectedNode) {
      currentNode.value = selectedNode;
      const {getFieldsValue} = getForm();
      const values = getFieldsValue();
      await reload({searchInfo: {categoryCode: selectedNode.code, ...values}});
    } else {
      currentNode.value = undefined;
      await reload();
    }
  }
  function handleAddFormTemplate() {
    openModal(true, { categoryCode: currentNode.value?.code });
    setEditModalProps('添加模板');
  }

  function handleEditFormTemplate(record: Recordable) {
    openModal(true, record);
    setEditModalProps('编辑模板');
  }

  function setEditModalProps(title) {
    setModalProps({
      title: title,
      bodyStyle: { padding: '0px', margin: '0px' },
      defaultFullscreen: true,
      maskClosable: false,
      centered: true,
      keyboard: false,
      showOkBtn: false,
      showCancelBtn: false,
      draggable: false,
      canFullscreen: false,
      closable: false,
      destroyOnClose: true,
    });
  }

  function handleCloseFunc() {
    setTimeout(() => {
      reload();
    }, 500);
  }

  function handleDelete(record: Recordable) {
    const status = record.status;
    if (status == 1) {
      createMessage.warning('已生效状态不能删除！');
      return;
    }
    deleteById([record.id]).then(() => {
      reload();
    });
  }

  async function handleDeleteCategory(node: any) {
    if(node.children && node.children.length>0){
      createMessage.waring('该分类下有子分类，不允许删除');
      return;
    }
    openFullLoading();
    try {
      const {success, msg} = await deleteFormCategoryById(node.id);
      if(success){
        createMessage.success(msg);
        initFormCategoryTree();
      } else {
        createMessage.error(msg);
      }
    } finally {
      closeFullLoading();
    }
  }
</script>

