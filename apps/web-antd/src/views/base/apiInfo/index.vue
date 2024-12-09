
<script lang="ts" setup>
import {nextTick, ref, h, unref} from 'vue';
import {getApiInfoListByPage, getApiCategoryListData, deleteApiCategoryById, deleteApiInfoById} from '@/api/base/apiInfo';
import type { Recordable } from '@vben/types';
import {listToTree} from "#/utils/helper/treeHelper";
import {PerEnum} from "#/enums/perEnum";
import {useVbenVxeGrid, type VxeGridProps} from '#/adapter/vxe-table';
import {AccessControl} from '@vben/access';

import {columns, searchFormSchema} from "./apiInfo.data";
import apiInfoDrawer from "./api-info-drawer.vue";
import apiCategoryModal from "./api-category-modal.vue";
import {DeleteOutlined, PlusOutlined, EditOutlined} from "@ant-design/icons-vue";
import {Popconfirm, Button, Row, Col, message, Tree, Tooltip} from "ant-design-vue";
import {Page, useVbenModal, useVbenDrawer, VbenFormProps} from '@vben/common-ui';
import { TableAction } from '#/components/table-action';

const selectNodeIds = ref([]);
const treeLoading = ref(true);

const [registerApiInfoDrawer, {openDrawer: openApiInfoDrawer, setDrawerProps: setApiInfoDrawerProps}] = useDrawer();

const [ApiInfoDrawer, baseDrawerApi] = useVbenDrawer({
  // 连接抽离的组件
  connectedComponent: apiInfoDrawer,
});
const [ApiCategoryModal, baseModalApi] = useVbenModal({
  // 连接抽离的组件
  connectedComponent: apiCategoryModal,
});

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  actionWrapperClass: 'col-span-2 col-start-2 text-left ml-4',
  resetButtonOptions: {
    show: false,
  },
  schema: searchFormSchema,
};

const gridOptions: VxeGridProps<any> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns,
  columnConfig: {resizable: true},
  pagerConfig: {
    enabled: true,
  },
  rowConfig: {
    keyField: 'id',
  },
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        return await getApiInfoListByPage({
          query: {
            pageNum: page.currentPage,
            pageSize: page.pageSize,
          },
          entity: formValues || {},
        });
      },
    },
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

const apiCategoryDataMap = ref<any>({});
const apiCategoryTreeData = ref<any[]>([]);
const [registerApiCategoryModal, {openModal: openApiCategoryModal, setModalProps: setApiCategoryModalProps}] = useModal();

const treeActionList: any[] = [
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
            handleUpdateCategory({id: node.id, pid: node.pid, name: node.title, orderNo: node.orderNo});
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

const currentNode = ref(undefined);
initApiCategoryTree();

function handleCreateCategory(node: any) {
  openApiCategoryModal(true, {
    isUpdate: false,
    record: {pid: node?.id}
  });
  setApiCategoryModalProps({ title: "新增分类", centered: true });
}

function handleUpdateCategory(node: any) {
  openApiCategoryModal(true, {
    isUpdate: true,
    record: node
  });
  setApiCategoryModalProps({ title: "修改分类", centered: true });
}

async function handleDeleteCategory(node: any) {
  //openFullLoading();
  try {
    const {success, msg} = await deleteApiCategoryById(node.id);
    if(success){
      message.success(msg);
      initApiCategoryTree();
    } else {
      message.error(msg);
    }

  } finally {
    // closeFullLoading();
  }
}

function handleCreate() {
  openApiInfoDrawer(true, {
    isUpdate: false,
    record: {categoryId: unref(currentNode)?.id}
  });
  setApiInfoDrawerProps({ title: `新建接口` });
}

function handleEdit(record: Recordable) {
  openApiInfoDrawer(true, {
    record,
    isUpdate: true,
  });
  setApiInfoDrawerProps({ title: `编辑-${record.name}` });
}

function handleDeleteApiInfo(record: Recordable) {
  deleteApiInfoById(record.id).then(() => {
    reload();
  });
}

async function initApiCategoryTree() {
  treeLoading.value = true;
  const res = await getApiCategoryListData();
  const tempCategoryMap = {};
  res.forEach(item => {
    tempCategoryMap[item.id] = item;
    item.title = item.name;
  })
  apiCategoryDataMap.value = tempCategoryMap;

  const treeData = listToTree(res);
  apiCategoryTreeData.value = treeData;
  treeLoading.value = false;
}

function handleSuccess() {
  setTimeout(() => {
    const {getFieldsValue} = getForm();
    const values = getFieldsValue();
    reload({searchInfo: {categoryId: unref(currentNode)?.id, ...values}});
  }, 200);
}
function handleCategorySuccess() {
  initApiCategoryTree();
}

async function handleSelect(node: any, e: any) {
  const selectedNode = e.selectedNodes[0];
  if (selectedNode) {
    currentNode.value = selectedNode;
    const {getFieldsValue} = getForm();
    const values = getFieldsValue();
    await reload({searchInfo: {categoryId: selectedNode.id, ...values}});
  } else {
    currentNode.value = undefined;
    await reload();
  }
}
</script>

<div>
  <Page auto-content-height>
    <div class="p-4 h-full">
      <SplitPane>
        <div>
          <Tree
              v-bind="$attrs"
              v-if="apiCategoryTreeData.length > 0"
              v-model:selected-keys="selectNodeIds"
              :class="$attrs.class"
              :field-names="{ title: 'title', key: 'key' }"
              :show-line="{ showLeafIcon: false }"
              :tree-data="apiCategoryTreeData"
              block-node
              :virtual="false"
              default-expand-all
              @select="handleSelect"
          >
            <template #headerTitle >
              <Row align="middle" class="w-full">
                <Col span="12">
                  接口分类
                </Col>
                <Col span="12" class="text-right">
                  <Button size="small" @click="handleCreateCategory" type="primary">新增分类</Button>
                </Col>
              </Row>
            </template>
          </Tree>
        </div>
        <div>
          <BasicTable @register="registerTable" class="!p-0">
            <template #toolbar>
              <AccessControl :codes="['App:'+PerEnum.ADD]" type="code">
                <a-button type="primary" @click="handleCreate">新增</a-button>
              </AccessControl>
            </template>
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'categoryId'">
                {{ apiCategoryDataMap[record.categoryId]?.name || '-' }}
              </template>
              <template v-if="column.key === 'action'">
                <TableAction
                  :actions="[
                    {
                      auth: 'App:' + PerEnum.UPDATE,
                      tooltip: '修改',
                      icon: 'clarity:note-edit-line',
                      onClick: handleEdit.bind(null, record),
                    },
                    {
                      auth: 'App:' + PerEnum.DELETE,
                      tooltip: '删除',
                      icon: 'ant-design:delete-outlined',
                      color: 'error',
                      popConfirm: {
                        placement: 'left',
                        title: '是否确认删除',
                        confirm: handleDeleteApiInfo.bind(null, record),
                      },
                    },
                  ]"
                />
              </template>
            </template>
          </BasicTable>
        </div>
      </SplitPane>
    </div>
    <ApiInfoDrawer @register="registerApiInfoDrawer" @success="handleSuccess" />
    <ApiCategoryModal @register="registerApiCategoryModal" @success="handleCategorySuccess"/>
  </Page>
</template>
