<template>
  <BasicModal class="w-[1000px] h-[80%]">
    <div class="group outline outline-1 outline-primary/80 !outline-dotted mb-2 relative">
      <div class="flex flex-wrap gap-y-2 p-1 pr-5 max-h-24 overflow-y-auto">
        <template
            v-if="selectedRowsList && selectedRowsList.length > 0"
            v-for="(item, index) in selectedRowsList"
            :key="index"
        >
          <Tag color="processing" closable @close="removeSelectedItem(item.modelKey)">
            {{ item.modelName }}
          </Tag>
        </template>
        <span class="text-sm text-foreground/50 p-px" v-else>
          请选择人员
        </span>
      </div>
      <span class="h-full flex items-center absolute right-2 top-0">
        <a class="p-1 cursor-pointer invisible group-hover:visible " @click="clearSelectedItems()"><CloseCircleOutlined /></a>
      </span>
    </div>
    <div ref="selectorContainerRef" class="flex-1 flex p-0 h-0 gap-2">
      <div class="w-[30%] flex flex-col h-full outline outline-1 outline-gray-200/20">
        <div class="h-8 border-b leading-8 pl-2">
          模板分类
        </div>
        <div class="flex-1 p-1 overflow-y-auto">
          <Tree
              class=""
              :clickRowToExpand="false"
              :treeData="treeData"
              @select="handleSelect"
              :fieldNames="{children: 'children', title: 'name', value: 'code'}"
              ref="treeRef"
          />
        </div>
      </div>
      <div class="w-[70%] h-full flex flex-col">
        <div class="h-10">
          <Search
              class="w-full"
              v-model:value="searchTxt"
              placeholder="请输入名称/编码"
              @search="doSearchFilter"
              @press-enter="doSearchFilter"
              :allowClear="true"
          />
        </div>

        <div ref="tableContainerRef" class="bg-card border flex-1">
          <Table
              :bordered="false"
              size="small"
              :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)"
              class="ant-table-striped"
              :row-selection="rowSelection"
              :columns="columns"
              :dataSource="tableData"
              :pagination="pagination"
              :resizable="true"
              :scroll="{ y: tableHeight }"
              :loading="tableLoading"
              rowKey="modelKey"
              :customRow="customRow"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex === 'opt'">
                <Popover
                    :title="`${record.name} - 流程图`"
                    :arrowPointAtCenter="true"
                    @visible-change="(e) => showPopover(e, record.modelKey)"
                    placement="right"
                >
                  <template #content>
                    <Spin :spinning="popoverLoading">
                      <div class="process-show-box">
                        <!-- 预览流程图-->
                        <div @mousewheel="changeScale" class="containers" ref="container">
                          <BpmnPresetViewer
                              ref="presetViewer"
                              theme="light"
                              :toolbar="false"
                              :modelKey="record.modelKey"
                              @viewer-init="handleViewerInit"
                          />
                        </div>
                      </div>
                    </Spin>
                  </template>
                  <a-button type="link" title="预览流程图" @click="(e) => e.stopPropagation()">
                    <PictureOutlined />
                  </a-button>
                </Popover>
              </template>
            </template>
          </Table>
        </div>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
import {
  defineExpose,
  computed,
  ref,
  defineEmits,
  unref,
  nextTick,
  watch
} from 'vue';

import {useVbenModal} from '@vben/common-ui';

import {Tag, Tree, Table, Input, Popover, Spin} from 'ant-design-vue';
import {getFlowCategoryTreeData} from '#/api/base/category';
import {getModelInfoPageList} from '#/api/flowable/bpmn/modelInfo';
import {columns} from './selector.data';
import { useElementSize } from '@vueuse/core'
import {CloseCircleOutlined, PictureOutlined} from '@ant-design/icons-vue'

const {Search} = Input;

const tableHeight = ref(250);

const emit = defineEmits(['change'])

//保存被选中的行的完整数据
const selectedRowsList = ref([])

const selectorContainerRef = ref();

const { width, height } = useElementSize(selectorContainerRef)
watch(height, () => {
  tableHeight.value = height.value-150;
})

const [BasicModal, modalApi] = useVbenModal({
  title: '选择流程模板',
  draggable: true,
  contentClass: 'flex flex-col min-h-[200px] h-full',
  onCancel() {
    modalApi.close();
  },
  async onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const {selectedList, multiple} = modalApi.getData<Record<string, any>>();
      if(selectedList){
        let temp = JSON.parse(JSON.stringify(selectedList));
        temp = temp.map(item => {
          return {modelKey: item.value, modelName: item.label};
        })
        selectedRowsList.value = temp;
      } else {
        selectedRowsList.value = [];
      }

      multiSelect.value = multiple;

      await fetchTreeData();
      fetchPageList({keyword: ''});

      modalApi.setState({loading: false, confirmLoading: false});
    }
  },
  onConfirm() {
    handleSubmit();
  },
});

const multiSelect = ref<boolean>(false);
const tableLoading = ref<boolean>(false);
const treeData = ref<any[]>([]);
const tableData = ref([]);
const searchTxt = ref('');
const currentNode = ref({});
const treeRef = ref<any>(null);
// 保存被选中的行的id列表
const selectedRowKeyList = computed(() => {
  return selectedRowsList.value.map(item => item.modelKey)
})
const rowSelection = computed(() => {
  return {
    preserveSelectedRowKeys: true,
    type: multiSelect.value ? 'checkbox' : 'radio',
    selectedRowKeys: selectedRowKeyList,
    onSelect: onSelectChange,
    onSelectAll: handleSelectAll
  }
});
function handleSelectAll(selected, selectedRows) {
  if(selected){
    if(selectedRows){
      selectedRows.forEach(item => {
        if(!item){
          return;
        }
        let itemObj = selectedRowsList.value.find(itm => itm.modelKey === item.modelKey)
        if (!itemObj) {
          selectedRowsList.value.push(genSelectedData(item));
        }
      });
    }
  } else {
    if(tableData.value){
      tableData.value.forEach(item => {
        let idx = selectedRowsList.value.findIndex(itm => itm.modelKey === item.modelKey)
        if(idx !== -1){
          selectedRowsList.value.splice(idx, 1);
        }
      })
    }
  }
}

const queryParam = ref({
  pageSize: 15,
  pageNum: 1,
});

const changePage = (page, pageSize) => {
  queryParam.value.pageSize = pageSize;
  queryParam.value.pageNum = page;
  fetchPageList({keyword: unref(searchTxt)});
};

const showSizeChange = (current, pageSize) => {
  queryParam.value.pageSize = pageSize;
  queryParam.value.pageNum = current;
  fetchPageList({keyword: unref(searchTxt)});
};

const customRow = (record) => {
  return {
    onClick: () => {
      rowClick(record);
    },
  };
};

const pagination = ref({
  pageSize: 15,
  current: 1,
  total: 0,
  showSizeChanger: true, // 显示可改变每页数量
  pageSizeOptions: ['15', '30', '50', '100'], // 每页数量选项
  onChange: changePage,
  onShowSizeChange: showSizeChange,
});

async function fetchTreeData() {
  const data = await getFlowCategoryTreeData();
  treeData.value = data;
  await nextTick();
  // 加载后展开节层级
  if (data.length < 10) {
    // getTree()?.filterByLevel(1);
  }
}

async function fetchPageList(params) {
  try {
    let category = {};
    if (unref(currentNode)) {
        category = {categoryCode: unref(currentNode).code};
    }
    tableLoading.value = true;
    const searchInfo = {
      query: {
        pageSize: unref(queryParam).pageSize,
        pageNum: unref(queryParam).pageNum
      },
      entity: {
        ...params,
        ...category,
      },
    };
    const {rows, total} = await getModelInfoPageList(searchInfo);
    tableData.value = rows;
    unref(pagination).current = unref(queryParam).pageNum;
    unref(pagination).pageSize = unref(queryParam).pageSize;
    unref(pagination).total = total;
  } catch (e) {
    unref(pagination).total = 0;
    unref(pagination).current = 1;
    tableData.value = [];
  } finally {
    tableLoading.value = false;
  }
}

/*
const [registerModal, {setModalProps, closeModal, changeLoading}] = useModalInner(
    (data) => {
      const {selectorProps} = data;

      multiSelect.value = selectorProps.multiple;
      changeLoading(true);
      // 加载已选中项
      let selectedList = JSON.parse(JSON.stringify(selectorProps.selectedList));
      let selectedRowKeys = selectorProps.selectedList?.map((item) => item.code);

      // 初始化加载
      if (!selectedRowKeys || selectedRowKeys.length <= 0) {
        // 如果没有数据时默认展开当前登录人所在的部门
        let loginUser = userStore.getUserInfo || {};
        // 用户所有的公司：loginUser.companyId
        // 用户所在的部门：loginUser.departmentId
        let defaultExpandNodes = [];
        loginUser.companyId && defaultExpandNodes.push(loginUser.companyId);
        loginUser.departmentId && defaultExpandNodes.push(loginUser.departmentId);
        unref(treeRef)?.setExpandedKeys(defaultExpandNodes);
        if (loginUser.departmentId) {
          unref(treeRef)?.setSelectedKeys([loginUser.departmentId]);
          currentNode.value = {id: loginUser.departmentId, sourceType: '2'};
        }
      }

      try {
        fetch();
        fetchPageList({});
      } finally {
        changeLoading(false);
      }

      Object.assign(state, {
        selectedRowKeys,
        selectedList,
      });
      setModalProps({
        wrapClassName: 'selector-content',
      });
    },
);
*/

// const getTitle = computed(() => '选择人员');

function doSearchFilter(e) {
  queryParam.value.pageNum = 1;
  fetchPageList({keyword: e, pageNum: 1});
}

const removeSelectedItem = (code) => {
  const idx = selectedRowsList.value.findIndex((item) => item.modelKey === code);
  selectedRowsList.value.splice(idx, 1);
};

const clearSelectedItems = () => {
  selectedRowsList.value = [];
};

// 选择多选框选中行
// function onSelectChange(selectedKeys: Array<object>, selectedRecords: Array<object>) {
function onSelectChange(record, selected, selectedRows, nativeEvent) {
  if(selected){
    rowClick(record);
  } else {
    let idx = selectedRowsList.value.findIndex(item => item.modelKey === record.modelKey)
    selectedRowsList.value.splice(idx, 1);
  }
}

// 行点击
function rowClick(record: any) {
  let selectedList = JSON.parse(JSON.stringify(selectedRowsList.value));
  let code = record.modelKey;
  if (multiSelect.value) {
    if (selectedList.length > 0) {
      const idx = selectedList.findIndex((item) => item.modelKey === code);
      if (idx !== -1) {
        selectedList.splice(idx, 1);
      } else {
        selectedList.push(genSelectedData(record));
      }
    } else {
      selectedList.push(genSelectedData(record));
    }
    selectedRowsList.value = selectedList;
  } else {
    selectedRowsList.value = [genSelectedData(record)];
  }
}

function handleSubmit() {
  emit('change', selectedRowsList.value);
  modalApi.close();
}

function genSelectedData (record: any) {
  return {modelKey: record.modelKey, modelName: record.name};
}

// 选择树
function handleSelect(keys, e) {
  if (e.selectedNodes && e.selectedNodes.length > 0) {
    currentNode.value = e.selectedNodes[0];
  } else {
    currentNode.value = {};
  }
  queryParam.value.pageNum = 1;
  unref(pagination).current = 1;
  fetchPageList({});
}

defineExpose(modalApi);
</script>

<style scoped lang="scss">
[data-vxe-ui-theme='light'] .ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}

[data-vxe-ui-theme='dark'] .ant-table-striped :deep(.table-striped) td {
  background-color: rgb(29, 29, 29);
}
</style>
