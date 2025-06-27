<template>
  <BasicModal class="w-[1000px] h-[80%]">
    <div class="group border border-primary !border-dotted mb-2 flex justify-between">
      <div class="flex flex-wrap gap-y-2 p-1">
        <template
          v-if="selectedRowsList && selectedRowsList.length > 0"
          v-for="(item, index) in selectedRowsList"
          :key="index"
        >
          <Tag color="processing" closable @close="removeSelectedItem(item.code)">
            {{ item.name }}
          </Tag>
        </template>
        <span class="text-sm" v-else>
          请选择人员
        </span>
      </div>
      <span class="h-full flex items-center">
        <a class="p-1 cursor-pointer invisible group-hover:visible "><CloseCircleOutlined /></a>
      </span>
    </div>
    <div ref="selectorContainerRef" class="flex-1 flex p-0 h-0 gap-2">
      <div class="w-[30%] flex flex-col h-full border border-gray-200">
        <div class="h-8 border-b leading-8 pl-2">
          组织
        </div>
        <div class="flex-1 p-1 overflow-y-auto">
          <Tree
              class=""
              title="组织"
              toolbar
              search
              :clickRowToExpand="false"
              :treeData="treeData"
              @select="handleSelect"
              ref="treeRef"
          />
        </div>
      </div>
      <div class="w-[70%] h-full flex flex-col">
        <div class="h-10">
          <Search
              class="w-full"
              v-model:value="searchTxt"
              placeholder="请输入姓名/工号/手机/邮箱"
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
            :loading="personalTableLoading"
            rowKey="code"
            :customRow="customRow"
          />
        </div>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
import {
  defineExpose,
  computed,
  useTemplateRef,
  reactive,
  onMounted,
  toRefs,
  ref,
  defineEmits,
  unref,
  nextTick,
  watch
} from 'vue';

import {ColPage, useVbenModal} from '@vben/common-ui';

import {getPersonalPageList} from '#/api/org/personal';
import {Tag, Tree, Table, Input, Checkbox, Radio} from 'ant-design-vue';
import {getOrgTree} from '#/api/org/dept';
import {columns, searchFormSchema} from './selector.data';
import { useElementSize } from '@vueuse/core'
import {CloseCircleOutlined} from '@ant-design/icons-vue'

const {Search} = Input;

const tableHeight = ref(250);

const emit = defineEmits(['change'])
// 保存被选中的行的id列表
const selectedRowKeyList = ref([])
//保存被选中的行的完整数据
const selectedRowsList = ref([])

const selectorContainerRef = ref();

const { width, height } = useElementSize(selectorContainerRef)
watch(height, () => {
  tableHeight.value = height.value-150;
})

const [BasicModal, modalApi] = useVbenModal({
  title: '选择人员',
  draggable: true,
  contentClass: 'flex flex-col min-h-[200px] h-full',
  onCancel() {
    modalApi.close();
  },
  async onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const {selectedList, multiple} = modalApi.getData<Record<string, any>>();
      if(selectedList){
        selectedRowsList.value = JSON.parse(JSON.stringify(selectedList));
        selectedRowsList.value.forEach(item => {
          item['code'] = item.value;
          item['name'] = item.label;
        });
        selectedRowKeyList.value = selectedRowsList.value.map((item : any) => item.code).filter((item: any) => !!item);
      } else {
        selectedRowsList.value = [];
        selectedRowKeyList.value = [];
      }

      // debugger;
      multiSelect.value = multiple;

      await fetchTreeData();
      fetchPageList({keyword: ''});
      // await initData(values);
      // baseFormApi.setValues(values);
      modalApi.setState({loading: false, confirmLoading: false});
    }
  },
  onConfirm() {
    // await baseFormApi.submitForm();
    handleSubmit();
  },
});


const multiSelect = ref<boolean>(false);
const personalTableLoading = ref<boolean>(false);
const treeData = ref<any[]>([]);
const tableData = ref([]);
const searchTxt = ref('');
const currentNode = ref({});
// const userStore = useUserStore();
const treeRef = ref<any>(null);

const rowSelection = computed(() => {
  return {
    preserveSelectedRowKeys: true,
    type: multiSelect.value ? 'checkbox' : 'radio',
    selectedRowKeys: selectedRowKeyList,
    onChange: onSelectChange,
  }
});

function getTree() {
  const tree = unref(treeRef);
  if (!tree) {
    throw new Error('tree is null!');
  }
  return tree;
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

const state = reactive({
  selectedList: [],
  selectedRowKeys: [],
});

async function fetchTreeData() {
  const data = await getOrgTree();
  treeData.value = data;
  await nextTick();
  // 加载后展开节层级
  if (data.length < 10) {
    // getTree()?.filterByLevel(1);
  }
}

async function fetchPageList(params) {
  try {
    let org = {};
    if (unref(currentNode)) {
      if (unref(currentNode) && unref(currentNode).sourceType === '1') {
        // 组织类型代表公司
        org = {companyId: unref(currentNode).id};
      } else if (unref(currentNode) && unref(currentNode).sourceType === '2') {
        // 组织类型代表部门
        org = {deptId: unref(currentNode).id};
      }
    }
    personalTableLoading.value = true;
    const searchInfo = {
      query: {
        pageSize: unref(queryParam).pageSize,
        pageNum: unref(queryParam).pageNum
      },
      entity: {
        ...params,
        ...org,
      },
    };
    const {rows, total} = await getPersonalPageList(searchInfo);
    tableData.value = rows;
    unref(pagination).current = unref(queryParam).pageNum;
    unref(pagination).pageSize = unref(queryParam).pageSize;
    unref(pagination).total = total;
  } catch (e) {
    unref(pagination).total = 0;
    unref(pagination).current = 1;
    tableData.value = [];
  } finally {
    personalTableLoading.value = false;
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
  selectedRowKeyList.value = selectedRowKeyList.value.filter((tag) => tag !== code);

  const idx = selectedRowsList.value.findIndex((item) => item.code === code);

  selectedRowsList.value.splice(idx, 1);

};

// 选择多选框选中行
function onSelectChange(selectedKeys: Array<object>, selectedRecords: Array<object>) {
  selectedRowsList.value = selectedRecords;
  selectedRowKeyList.value = selectedKeys;
  debugger;
  console.log(selectedKeys, '####====================');
  return;
  // , ...state.selectedRowKeys
  // FIXME 这里有个问题：点击行的时候可以进行分页选择，当点击复选框后会把其他页选中的都清掉
  let selectedRowKeys = [...selectedKeys];
  let selectedList = selectedRecords.map((item) => {
    return {id: item.id, code: item.code, name: item.name};
  });
  let temp = [...state.selectedList, ...selectedList];
  let result = selectedKeys.map((item) => {
    const arr = temp.filter((itm) => {
      return itm.code === item;
    });
    return arr[0];
  });

    selectedRowKeyList.value = selectedRowKeys;

  Object.assign(state, {
    selectedRowKeys,
    selectedList: [...result],
  });
}

// 行点击
function rowClick(record: any) {
  let selectedRowKeys = JSON.parse(JSON.stringify(selectedRowKeyList.value));
  let selectedList = JSON.parse(JSON.stringify(selectedRowsList.value));

  let code = record.code;
  if (multiSelect.value) {
    if (selectedRowKeys.length > 0) {
      const haveKeyIdx = selectedRowKeys.indexOf(code);
      if (haveKeyIdx != -1) {
        selectedRowKeys.splice(haveKeyIdx, 1);
        const idx = selectedList.findIndex((item) => item.code === code);
        if (idx !== -1) {
          selectedList.splice(haveKeyIdx, 1);
        }
      } else {
        selectedRowKeys.push(code);
        selectedList.push(record);
      }
    } else {
      selectedRowKeys.push(code);
      selectedList.push(record);
    }
    selectedRowsList.value = selectedList;
    selectedRowKeyList.value = selectedRowKeys;
  } else {
    selectedRowsList.value = [record];
    selectedRowKeyList.value = [code];
  }
}

function handleSubmit() {
  emit('change', selectedRowsList.value);
  modalApi.close();
}

function genPersonalData (record) {
  return {
    label: record.name,
    key: record.code,
    sex: record.sex,
    mobile: record.mobile,
  };
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
