<template>
  <BasicModal
    class="w-[800px] min-h-[400px] overflow-y-hidden"
    contentClass="overflow-y-hidden flex flex-col flex-1 w-full"
    centered
    :title="getTitle"
  >
    <div class="min-h-[30px] !border-1">
      <template v-if="selectedList && selectedList.length > 0" v-for="(item, index) in selectedList" :key="item.id">
        <Tag color="processing" closable @close="removeSelectedItem(item.id)">
          {{ item.shortName }}
        </Tag>
      </template>
      <template v-else>
        请选择组织
      </template>
    </div>
    <div class="flex-1 w-full flex flex-col min-h-[300px]">
      <div class="h-[40px] items-center flex">
        <InputSearch
          size="middle"
          v-model:value="searchValue"
          placeholder="请输入关键字"
        />
      </div>
      <div class="flex-1 overflow-y-auto mt-2">
        <Transfer
            show-search
            :filter-option="filterOption"
            v-model:target-keys="targetKeys"
            class="tree-transfer"
            :data-source="dataSource"
            :render="item => item.title"
            :show-select-all="false"
            @search="handleSearch"
        >
          <template #children="{ direction, selectedKeys, onItemSelect }">
            <Tree
                v-if="direction === 'left'"
                block-node
                checkable
                check-strictly
                default-expand-all
                :checked-keys="[...selectedKeys, ...targetKeys]"
                :tree-data="treeData"
                @check="
                  (_, props) => {
                    onChecked(props, [...selectedKeys, ...targetKeys], onItemSelect);
                  }
                "
                @select="
                  (_, props) => {
                    onChecked(props, [...selectedKeys, ...targetKeys], onItemSelect);
                  }
                "
            />
          </template>
        </Transfer>
        <Tree
          ref="treeRef"
          title="组织"
          search
          block-node
          show-search
          :clickRowToExpand="false"
          :treeData="treeData"
          @check="handleCheck"
          :expandedKeys="expandedKeys"
          :auto-expand-parent="autoExpandParent"
          @expand="onExpand"
          @select="handleSelect"
          :checkable="multiSelect ? true : false"
          :selectable="multiSelect ? false : true"
          :checkStrictly="true"
        >
          <template #title="{ title }">
            <span v-if="title.indexOf(searchValue) > -1">
              {{ title.substring(0, title.indexOf(searchValue)) }}
              <span style="color: #f50">{{ searchValue }}</span>
              {{ title.substring(title.indexOf(searchValue) + searchValue.length) }}
            </span>
            <span v-else>{{ title }}</span>
          </template>
        </Tree>
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
    ref,
    unref,
    nextTick,
  } from 'vue';
  import { Tag, Input, Tree, Transfer } from 'ant-design-vue';
  import {useVbenModal} from '@vben/common-ui';
  import { listToTree, forEach } from '#/utils/helper/treeHelper';
  import type { TransferProps, TreeProps } from 'ant-design-vue';

  import { getOrgTree, getOrgListData } from '#/api/org/dept';
  import {getCompanies, getCompaniesListData} from '#/api/org/company';
  const targetKeys = ref<string[]>([]);
  const transferDataSource: TransferProps['dataSource'] = [];

  const dataSource = ref(transferDataSource);
  const InputSearch = Input.Search;
  enum OrgSelectType {
    COMPANY = '1',
    DEPT = '2',
    ORG = '3',
  }

  const emit = defineEmits(['change', 'register'])
  const props = defineProps({
    title: {
      type: String,
      default: '人员选择',
    }
  });

  const searchValue = ref('');
  // 使用id，shortName进行赋值
  const selectedList = ref([]);
  const multiSelect = ref<boolean>(false);
  const treeData = ref([]);
  const selectedRowKeys = ref([]);
  const treeRef = ref(null);
  const gData = ref<TreeProps['treeData']>(treeData);

  const expandedKeys = ref<(string | number)[]>([]);
  const autoExpandParent = ref<boolean>(true);
  const filterOption = (inputValue: string, option: any) => {
    debugger;
    return option.title.indexOf(inputValue) > -1;
  };

  const handleSearch = (dir: string, value: string) => {
    debugger;
    console.log('search:', dir, value);
  };
  function isChecked(selectedKeys: (string | number)[], eventKey: string | number) {
    return selectedKeys.indexOf(eventKey) !== -1;
  }
  const onChecked = (
      e: Parameters<TreeProps['onCheck']>[1] | Parameters<TreeProps['onSelect']>[1],
      checkedKeys: string[],
      onItemSelect: (n: any, c: boolean) => void,
  ) => {
    const { eventKey } = e.node;
    onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
  };
  function getTree() {
    const tree = unref(treeRef);
    if (!tree) {
      throw new Error('tree is null!');
    }
    return tree;
  }

  const state = reactive({
    selectedList: [],
    selectedRowKeys: [],
  });

  function getFilterTree(source, list) {
    const initData = JSON.parse(JSON.stringify(list));
    const data = JSON.parse(JSON.stringify(source));
    const obj = {};
    data.forEach((item) => {
      obj[item.id] = item;
    });
    //合并完整树
    data.forEach((item) => {
      let pid = item.pid;
      while (pid) {
        const parent = obj[pid];
        if (!parent) {
          const organParent = initData.find((item) => item.id == pid);
          if (organParent) {
            obj[pid] = organParent;
            pid = organParent.pid;
            data.push(organParent);
          } else {
            pid = null;
          }
        } else {
          pid = null;
        }
      }
    });
    const trees = flatToTree(data, obj);
    return {data, trees};
  }

  function flatToTree(data, obj) {
    const trees = [];
    data.forEach((item) => {
      const parent = obj[item.pid];
      if (parent) {
        if (!item.children) {
          item.children = [];
        }
        (parent.children || (parent.children = [])).push(item);
      } else {
        trees.push(item);
      }
    });
    return trees;
  }

  function getTreeIds(list) {
    const ids = [];
    list.map((item) => {
      ids.push(item.id);
    });
    return ids;
  }

  // 过滤树并得到新树，filterArrForKey({ tree: 遍历的树, searchKey: 查询依据的key, searchValue: 查询内容 })
  const filterArrForKey = ({ tree, searchKey, searchValue }) => {
    if (!(tree && tree.length)) {
      return [];
    }
    let newArr = [];
    newArr = tree.map((item) => {
      if (item?.[searchKey]?.toString()?.includes(searchValue)) {
        return item;
      }
      if (item.children && item.children.length) {
        const newChildren = filterArrForKey({
          tree: item.children,
          searchKey,
          searchValue,
        });
        if (newChildren && newChildren.length) {
          return {
            ...item,
            children: newChildren,
          };
        }
        return null;
      }
      return null;
    });
    newArr = newArr.filter(item => item != null);
    return newArr;
  }

  const search = () => {
    const val = searchValue.value;
    // 获取目标节点数据
    const flatData = treeListData.value.filter((item) => {
      return item.title.includes(val);
    });

    // 获取目标节点与之相关的数据，以及组合后新的树形结构数据
    const {data, trees} = getFilterTree(flatData, treeListData.value);

    const ids: string[] = getTreeIds(data);

    nextTick(()=> {
      treeData.value = trees;
      if(trees){
        spread(ids.length, 0, ids);
      }else {
        expandedKeys.value = [];
      }
    })
  };

  function multiFilterTree(tree, name, isOpen) {
    const filteredNodes = [];
    for (const node of tree) {
      const isNameMatch = name === null || (typeof name === 'string' && node.name.includes(name));
      const isOpenMatch = isOpen === null || node.isOpen === isOpen;

      if (isNameMatch && isOpenMatch) {
        const children = multiFilterTree(node.children, name, isOpen);
        filteredNodes.push({ ...node, children: children.length > 0 ? children : [] });
      } else {
        const children = multiFilterTree(node.children, name, isOpen);
        if (children.length > 0) {
          filteredNodes.push({ ...node, children });
        }
      }
    }
    return filteredNodes;
  }


  watch(searchValue, value => {
    // search();
     const res = filterArrForKey({tree: treeListData.value, searchKey: "name", searchValue: searchValue.value});

     debugger;
    treeData.value = res||[];
    /*const expanded = treeData.value
      .map((item: TreeProps['treeData']) => {
        debugger;
        if (item.title.indexOf(value) > -1) {
          debugger;
          return getParentKey(item.key, gData.value);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    debugger;
    expandedKeys.value = expanded;
    searchValue.value = value;
    autoExpandParent.value = true;*/
  });

  function spread(num: number, index = 0, ids: string[]) {
    const keys: string[] = [];
    for (let i = 0; i < 50; i++) {
      if (num <= 0) break;
      num--;
      index++;
      keys.push(ids[index]);
    }
    if (num > 0) {
      let timer = setTimeout(() => {
        return spread(num, index, ids);
      }, 600);
    }
    debugger;
    expandedKeys.value = [...expandedKeys.value, ...keys];
  }

  const getParentKey = (id: string, tree): string | number | undefined => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item) => item.id === id)) {
          parentKey = node.id;
        } else if (getParentKey(id, node.children)) {
          parentKey = getParentKey(id, node.children);
        }
      }
    }
    return parentKey;
  };

  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    async onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          debugger;
          await initData(values);
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

  const onExpand = (keys: string[]) => {
    expandedKeys.value = keys;
    autoExpandParent.value = false;
  };

  const treeListData = ref([]);

  async function initData(values) {
    if (values.selectType === 'company') {
      const list = await getCompaniesListData();

      treeData.value = listToTree(list);
      treeListData.value = listToTree(list);
      if (unref(multiSelect)) {
        setTimeout(() => {
          // getTree()?.setCheckedKeys(selectedRowKeys);
        }, 20);
      } else {
        setTimeout(() => {
          // getTree()?.setSelectedKeys(selectedRowKeys);
          // getTree()?.setExpandedKeys(selectedRowKeys);
        }, 20);
      }

      setTimeout(() => {
        // getTree()?.setExpandedKeys(unref(treeData).map((item) => item.id));
      }, 100);
    } else {
      // 部门和公司树（组织树）
      const list = await getOrgListData();
      treeData.value = listToTree(list);
      treeListData.value = listToTree(list);
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
