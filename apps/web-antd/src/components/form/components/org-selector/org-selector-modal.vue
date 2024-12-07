<template>
  <BasicModal
    class="w-[1000px] min-h-[400px]"
    centered
    :title="getTitle"
  >
    <div class="flex flex-col h-full !border-1 !border-gray-200">
      <div class="min-h-[30px] w-full !border-1">
        <template v-if="selectedList && selectedList.length > 0" v-for="(item, index) in selectedList" :key="item.id">
          <Tag color="processing" closable @close="removeSelectedItem(item.id)">
            {{ item.shortName }}
          </Tag>
        </template>
        <template v-else>
          请选择组织
        </template>
      </div>
      <div class="flex-1 w-full">
        <div class="org-tree w-4/4 xl:w-10/10 overflow-hidden">
          <Tree
            ref="treeRef"
            class="w-4/4 org-tree"
            title="组织"
            search
            treeWrapperClassName="h-[calc(100%-35px)] overflow-auto"
            :clickRowToExpand="false"
            :treeData="treeData"
            @check="handleCheck"
            @select="handleSelect"
            :checkable="multiSelect ? true : false"
            :selectable="multiSelect ? false : true"
            :checkStrictly="true"
          />
        </div>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import {
    defineEmits,
    defineExpose,
    defineProps,
    computed,
    watch,
    reactive,
    toRefs,
    ref,
    unref,
    onMounted,
    nextTick,
  } from 'vue';
  import { Tag, Table, Tree } from 'ant-design-vue';
  import {useVbenModal} from '@vben/common-ui';

  import { columns, searchFormSchema } from './selector.data';
  import { getOrgTree } from '#/api/org/dept';
  import { getCompanies } from '#/api/org/company';
  import { forEach } from '#/utils/helper/treeHelper';

  const emit = defineEmits(['change', 'register'])
  const props = defineProps({
    title: {
      type: String,
      default: '人员选择',
    }
  });
  // 使用id，shortName进行赋值
  const selectedList = ref([]);
  const multiSelect = ref<boolean>(false);
  // const [registerModal] = useModal();
  const treeData = ref([]);
  const tableData = ref([]);
  const selectedRowKeys = ref([]);
  const treeRef = ref(null);
  function getTree() {
    const tree = unref(treeRef);
    if (!tree) {
      throw new Error('tree is null!');
    }
    return tree;
  }
  const expandedKeys = ref([]);

  const state = reactive({
    selectedList: [],
    selectedRowKeys: [],
  });


  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          initData();
          // baseFormApi.setValues(values);
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      // await baseFormApi.submitForm();
      handleSubmit();
    },
  });

  function initData() {
    if (selectorProps.selectType === OrgSelectType.COMPANY) {
      getCompanies()
        .then((res) => {
          treeData.value = res as unknown as TreeItem[];
          if (unref(multiSelect)) {
            setTimeout(() => {
              getTree()?.setCheckedKeys(selectedRowKeys);
            }, 20);
          } else {
            setTimeout(() => {
              getTree()?.setSelectedKeys(selectedRowKeys);
              getTree()?.setExpandedKeys(selectedRowKeys);
            }, 20);
          }

          setTimeout(() => {
            getTree()?.setExpandedKeys(unref(treeData).map((item) => item.id));
          }, 100);
        })
        .finally(() => {
          // getTree().filterByLevel(1)
        });
    } else {
      // 部门和公司树（组织树）
      getOrgTree()
        .then((res) => {
          const expandKeys = [];
          // 如果只能选择部门，则将公司的数据设置禁用
          if (selectorProps.selectType === OrgSelectType.DEPT) {
            forEach(res, (item) => {
              // 只能选部门
              item.disabled = item.sourceType === OrgSelectType.COMPANY; // 部门选择器，禁用公司的选项
              item.sourceType === OrgSelectType.COMPANY && expandKeys.push(item.id); // 如果只能选择部门，需要将公司全部展开
            });
          }

          treeData.value = res as unknown as TreeItem[];

          if (unref(multiSelect)) {
            setTimeout(() => {
              unref(treeRef)?.setCheckedKeys(selectedRowKeys);
            }, 200);
          } else {
            setTimeout(() => {
              // TODO 这里有个问题：默认展开时无法展开父节点
              console.log(selectedRowKeys);
              getTree()?.setSelectedKeys(selectedRowKeys);
            }, 200);
          }
          expandKeys.concat(selectedRowKeys);

          getTree()?.setExpandedKeys(expandKeys);
        })
        .finally(() => {});
    }
  }


  /*const [registerModal, { setModalProps, closeModal }] = useModalInner(async (values) => {
    const { selectorProps } = values;
    // 加载已选中项
    // selectedList.value = selectorProps.selectedList;
    multiSelect.value = selectorProps.multiple;
    // selectType
    let selectedList = selectorProps.selectedList
      ? JSON.parse(JSON.stringify(selectorProps.selectedList))
      : [];
    let selectedRowKeys = selectedList ? selectedList.map((item) => item.id) : [];
    // 公司树
    if (selectorProps.selectType === OrgSelectType.COMPANY) {
      getCompanies()
        .then((res) => {
          treeData.value = res as unknown as TreeItem[];
          if (unref(multiSelect)) {
            setTimeout(() => {
              getTree()?.setCheckedKeys(selectedRowKeys);
            }, 20);
          } else {
            setTimeout(() => {
              getTree()?.setSelectedKeys(selectedRowKeys);
              getTree()?.setExpandedKeys(selectedRowKeys);
            }, 20);
          }

          setTimeout(() => {
            getTree()?.setExpandedKeys(unref(treeData).map((item) => item.id));
          }, 100);
        })
        .finally(() => {
          // getTree().filterByLevel(1)
        });
    } else {
      // 部门和公司树（组织树）
      getOrgTree()
        .then((res) => {
          const expandKeys = [];
          // 如果只能选择部门，则将公司的数据设置禁用
          if (selectorProps.selectType === OrgSelectType.DEPT) {
            forEach(res, (item) => {
              // 只能选部门
              item.disabled = item.sourceType === OrgSelectType.COMPANY; // 部门选择器，禁用公司的选项
              item.sourceType === OrgSelectType.COMPANY && expandKeys.push(item.id); // 如果只能选择部门，需要将公司全部展开
            });
          }

          treeData.value = res as unknown as TreeItem[];

          if (unref(multiSelect)) {
            setTimeout(() => {
              unref(treeRef)?.setCheckedKeys(selectedRowKeys);
            }, 200);
          } else {
            setTimeout(() => {
              // TODO 这里有个问题：默认展开时无法展开父节点
              console.log(selectedRowKeys);
              getTree()?.setSelectedKeys(selectedRowKeys);
            }, 200);
          }
          expandKeys.concat(selectedRowKeys);

          getTree()?.setExpandedKeys(expandKeys);
        })
        .finally(() => {});
    }

    Object.assign(state, {
      selectedRowKeys,
      selectedList,
    });
    /!*setSelectedRowKeys(selectedList.value.map(item=>item.code));
    setProps({
      rowSelection:{
        type: selectorProps.multiSelect?'checkbox':'radio',
        columnWidth: 30,
      }
    });*!/
    setModalProps({
      wrapClassName: 'selector-content',
    });
    //reload();
  });*/

  // 给表单元素添加回车事件
  searchFormSchema.forEach((item: object) => {
    if (item) {
      item['componentProps']['onkeypress'] = (e) => {
        if (e.keyCode === 13) {
          //reload();
        }
      };
    }
  });

  const getTitle = computed(() => '选择人员');

  function handleSuccess() {
    //reload();
  }

  const removeSelectedItem = (id) => {
    const keys = state.selectedRowKeys.filter((tag) => tag !== id);
    const selectedRowKeys = keys;

    const idx = state.selectedList.findIndex((item) => item.id === id);
    state.selectedList.splice(idx, 1);
    Object.assign(state, {
      selectedRowKeys,
      selectedList: state.selectedList,
    });

    // unref(treeRef).setSelectedKeys(selectedRowKeys);
    unref(treeRef).setCheckedKeys(selectedRowKeys);
  };

  // checkbox/radio选择
  function selectionChanged({ rows }) {
    // selectedList.value = rows.map(item=>{return {id: item.id, code: item.code, name: item.name}});
  }

  function onSelectChange(selectedKeys, selectedRecords) {
    let selectedRowKeys = selectedKeys;
    let selectedList = selectedRecords.map((item) => {
      return { id: item.id, code: item.code, name: item.name };
    });
    Object.assign(state, {
      selectedRowKeys,
      selectedList,
    });
  }

  // 行点击
  function rowClick(record, index, e) {
    let selectedRowKeys = state.selectedRowKeys;
    let selectedList = state.selectedList;

    if (selectedRowKeys.length > 0) {
      const haveKeyIdx = selectedRowKeys.indexOf(record.code);
      if (haveKeyIdx != -1) {
        selectedRowKeys.splice(haveKeyIdx, 1);
        const idx = selectedList.findIndex((item) => item.code === record.code);
        if (idx !== -1) {
          selectedList.splice(haveKeyIdx, 1);
        }
      } else {
        selectedRowKeys.push(record.code);
        selectedList.push(record);
      }
    } else {
      selectedRowKeys.push(record.code);
      selectedList.push(record);
    }
    Object.assign(state, {
      selectedRowKeys,
      selectedList,
    });
  }

  function handleSubmit() {
    // const selectedRows = getSelectRows();
    emit('change', state.selectedList);
    // closeModal();
  }

  // 选择树
  function handleSelect(node: any, e) {
    let selectedRowKeys = [];
    let selectedList = treeNodes2SelectedList(e.selectedNodes);
    selectedList.forEach((item) => {
      delete item.children;
      delete item.node;
    });
    Object.assign(state, {
      selectedRowKeys,
      selectedList,
    });
  }

  function treeNodes2SelectedList(selectedNodes) {
    return selectedNodes.map((item) => {
      return {
        code: item.code,
        companyId: item.companyId,
        companyName: item.companyName,
        disabled: item.disabled,
        id: item.id,
        key: item.key,
        leaderCode: item.leaderCode,
        leaderName: item.leaderName,
        name: item.name,
        pid: item.pid,
        shortName: item.shortName,
        sourceType: item.sourceType,
      };
    });
  }

  function handleCheck(e, record, b) {
    let selectedRowKeys = [];
    let selectedList = [];
    if (!multiSelect.value) {
      selectedRowKeys = JSON.parse(JSON.stringify(e.checked.length > 0 ? [e.checked[0]] : []));
    } else {
      selectedRowKeys = JSON.parse(JSON.stringify(e.checked));
      selectedList = treeNodes2SelectedList(record.checkedNodes);
    }
    Object.assign(state, {
      selectedRowKeys,
      selectedList,
    });
  }
  defineExpose(modalApi)
</script>
<!--<style lang="less">
  @import './index.less';
</style>-->
