<template>
  <BasicModal
      wrapClassName="selector-body "
      v-bind="$attrs"
      @register="registerModal"
      :title="getTitle"
      @ok="handleSubmit"
  >
    <div class="selected-items mb-2">
      <template
          v-if="selectedList && selectedList.length > 0"
          v-for="(item, index) in selectedList"
          :key="item.code"
      >
        <Tag color="processing" closable @close="removeSelectedItem(item.code)">
          {{ item.name }}
        </Tag>
      </template>
      <template v-else>
        <div class="ant-select-selection-placeholder">请选择人员</div>
      </template>
    </div>
    <div class="flex">
      <div class="left-tree bg-white w-1/4 xl:w-3/10 mr-2 overflow-hidden h-full">
        <BasicTree
            title="组织"
            toolbar
            search
            treeWrapperClassName="h-[calc(100%-35px)] overflow-auto"
            :clickRowToExpand="false"
            :treeData="treeData"
            @select="handleSelect"
            ref="treeRef"
        />
      </div>

      <div class="w-3/4 xl:w-7/10 mb-0">
        <Search
            v-model:value="searchTxt"
            placeholder="请输入姓名/工号/手机/邮箱"
            style="width: 100%"
            @search="doSearchFilter"
            @press-enter="doSearchFilter"
            :allowClear="true"
        />
        <Table
            size="small"
            :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)"
            class="mt-2 ant-table-striped"
            :row-selection="{
              type: multiSelect ? 'checkbox' : 'radio',
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange,
            }"
            :columns="columns"
            :dataSource="tableData"
            :pagination="pagination"
            :scroll="{ y: 260 }"
            :loading="personalTableLoading"
            rowKey="code"
            :customRow="customRow"
        />
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { defineExpose, computed, reactive, toRefs, ref, defineEmits, unref, nextTick } from 'vue';
  // import { BasicModal, useModal, useModalInner } from '@/components/Modal';

  // import { useUserStore } from '@/store/modules/user';

  import { getPersonalPageList } from '#/api/org/personal';

  // import { PageWrapper } from '@/components/Page';
  import {useVbenModal} from '@vben/common-ui';

  import { Tag, Table, Input, Checkbox, Radio } from 'ant-design-vue';
  import { columns } from './selector.data';
  // import { BasicTree, TreeActionType, TreeItem } from '@/components/Tree';
  import { getOrgTree } from '#/api/org/dept';
  import { FormItemRest } from 'ant-design-vue/es/form';

  const { Search } = Input;

const emit = defineEmits(['change'])

  const multiSelect = ref<boolean>(false);
  const personalTableLoading = ref<boolean>(false);
  const treeData = ref<any[]>([]);
  const tableData = ref([]);
  const searchTxt = ref('');
  const currentNode = ref({});
  const userStore = useUserStore();
  const treeRef = ref<any>(null);

  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          formApi.setValues(values);
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      // await formApi.submitForm();
      handleSubmit();
    },
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
    fetchPageList({ keyword: unref(searchTxt) });
  };

  const showSizeChange = (current, pageSize) => {
    queryParam.value.pageSize = pageSize;
    queryParam.value.pageNum = current;
    fetchPageList({ keyword: unref(searchTxt) });
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

  async function fetch() {
    const data = await getOrgTree();
    treeData.value = data as unknown as TreeItem[];
    nextTick(() => {
      // 加载后展开节层级
      if (data.length < 10) {
        getTree()?.filterByLevel(1);
      }
    });
  }

  async function fetchPageList(params) {
    try {
      let org = {};
      if (unref(currentNode)) {
        if (unref(currentNode) && unref(currentNode).sourceType === '1') {
          // 组织类型代表公司
          org = { companyId: unref(currentNode).id };
        } else if (unref(currentNode) && unref(currentNode).sourceType === '2') {
          // 组织类型代表部门
          org = { deptId: unref(currentNode).id };
        }
      }
      personalTableLoading.value = true;
      const searchInfo = {
        pageSize: unref(queryParam).pageSize,
        pageNum: unref(queryParam).pageNum,
        ...params,
        ...org,
      };
      const { rows, total } = await getPersonalPageList(searchInfo);
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

  const [registerModal, { setModalProps, closeModal, changeLoading }] = useModalInner(
      (data) => {
        const { selectorProps } = data;

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
            currentNode.value = { id: loginUser.departmentId, sourceType: '2' };
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

  const getTitle = computed(() => '选择人员');

  function doSearchFilter(e) {
    queryParam.value.pageNum = 1;
    fetchPageList({ keyword: e, pageNum: 1 });
  }

  const removeSelectedItem = (code) => {
    const keys = state.selectedRowKeys.filter((tag) => tag !== code);
    const selectedRowKeys = keys;

    const idx = state.selectedList.findIndex((item) => item.code === code);

    state.selectedList.splice(idx, 1);
    Object.assign(state, {
      selectedRowKeys,
      selectedList: state.selectedList,
    });
    console.log(state.selectedRowKeys, state.selectedList);
  };

  // 选择多选框选中行
  function onSelectChange(selectedKeys, selectedRecords) {
    console.log(selectedKeys, '####====================');
    // , ...state.selectedRowKeys
    // FIXME 这里有个问题：点击行的时候可以进行分页选择，当点击复选框后会把其他页选中的都清掉
    let selectedRowKeys = [...selectedKeys];
    let selectedList = selectedRecords.map((item) => {
      return { id: item.id, code: item.code, name: item.name };
    });
    let temp = [...state.selectedList, ...selectedList];
    let result = selectedKeys.map((item) => {
      const arr = temp.filter((itm) => {
        return itm.code === item;
      });
      return arr[0];
    });
    Object.assign(state, {
      selectedRowKeys,
      selectedList: [...result],
    });
  }

  // 行点击
  function rowClick(record: any) {
    let selectedRowKeys = state.selectedRowKeys;
    let selectedList = state.selectedList;
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
      Object.assign(state, {
        selectedRowKeys,
        selectedList,
      });
    } else {
      Object.assign(state, {
        selectedRowKeys: [code],
        selectedList: [record],
      });
    }
  }

  function handleSubmit() {
    emit('change', state.selectedList);
    closeModal();
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

  defineExpose(defineExpose);
</script>

