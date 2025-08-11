<script lang="ts" setup>
  import { PerEnum } from '#/enums/perEnum';
  import { ref, onMounted, nextTick } from 'vue';
  import { Button, Tag, message} from 'ant-design-vue';
  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import type {VbenFormProps} from '@vben/common-ui';
  import type { Recordable } from '@vben/types';
  import type {VxeGridProps} from '#/adapter/vxe-table';
  import {Page} from '@vben/common-ui';
  import { TableAction } from '#/components/table-action';

  import {deleteByIds, getFlowCategoryTreeData} from '#/api/base/category';
  import { columns, searchFormSchema } from './category.data';
  import CategoryModal from './CategoryModal.vue';

  import {getCompaniesListData} from '#/api/org/company';

  const PerPrefix = "Category:";

  const categoryModalRef = ref();

  const companiesMap = ref([]);
  const filterText = ref('')

  const treeData = ref([]);
  const matchedIds = ref(new Set())

  const formOptions: VbenFormProps = {
    showCollapseButton: false,
    submitOnEnter: true,
    commonConfig: {
      labelWidth: 60,
    },
    wrapperClass: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    actionWrapperClass: 'pl-2 !justify-end md:!justify-start',
    actionPosition: 'left',
    actionLayout: 'inline',
    resetButtonOptions: {
      show: false,
    },
    handleSubmit: (values) => {
      filterText.value = values.keyword;

      if (!values.keyword) {
        tableApi.grid.loadData(treeData.value);
      } else {
        const result = filterNodes(treeData.value, values.keyword.toLowerCase())
        tableApi.grid.loadData(result);
        handleFilter();
      }
      return Promise.resolve();
    },
    schema: searchFormSchema,
  };

  // 高亮匹配文本
  const highlightMatch = (text) => {
    if (!filterText.value) return text
    const regex = new RegExp(`(${filterText.value})`, 'gi')
    return text.replace(regex, '<span class="highlight-text">$1</span>')
  }

  // 处理过滤
  const handleFilter = () => {
    if (!filterText.value) {
      handleClearFilter()
      return
    }
    // 展开匹配节点
    nextTick(() => {
      expandMatchedNodes()
    })
  }
  // 清除过滤
  const handleClearFilter = () => {
    filterText.value = ''
    matchedIds.value.clear()
    nextTick(() => {
      tableApi.grid?.clearTreeExpand()
    })
  }

  // 展开匹配节点及其父节点
  const expandMatchedNodes = () => {
    const table = tableApi.grid
    if (!table) return

    const nodesToExpand = new Set()

    // 收集需要展开的节点
    matchedIds.value.forEach(id => {
      const node = table.getRowById(id)
      if (node) {
        // 添加当前节点
        nodesToExpand.add(node.id)

        // 添加所有父节点
        let parent = table.getTreeParentRow(node)
        while (parent) {
          nodesToExpand.add(parent.id)
          parent = table.getTreeParentRow(parent)
        }
      }
    })

    // 先收起所有节点
    table.setAllTreeExpand(false)

    // 展开需要的节点
    nodesToExpand.forEach(id => {
      const node = table.getRowById(id)
      if (node) {
        table.setTreeExpand(node, true)
      }
    })
  }

  // 行样式
  const applyRowClass = ({ row }) => {
    return matchedIds.value.has(row.id) ? 'matched-row' : ''
  }

  const filterNodes = (nodes, keyword) => {
    const result = []
    nodes.forEach(node => {
      const newNode = { ...node }
      let isMatched = false

      // 检查当前节点是否匹配
      if (newNode.name.toLowerCase().includes(keyword)) {
        isMatched = true
        matchedIds.value.add(newNode.id)
      }

      // 处理子节点
      if (newNode.children && newNode.children.length) {
        const filteredChildren = filterNodes(newNode.children, keyword)
        if (filteredChildren.length) {
          newNode.children = filteredChildren
          isMatched = true
        } else {
          delete newNode.children
        }
      }

      if (isMatched) {
        result.push(newNode)
      }
    })

    return result
  }

  const gridOptions: VxeGridProps = {
    checkboxConfig: {
      highlight: true,
      labelField: 'name',
    },
    columns,
    showOverflow: true,
    columnConfig: {resizable: true},
    pagerConfig: {
      enabled: false,
    },
    rowConfig: {
      keyField: 'id',
      isHover: true,
    },
    treeConfig: {
      childrenField: 'children'
    },
    height: 'auto',
    keepSource: true,
    border: false,
    stripe: true,
  };

  const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

  function reloadData() {
    getFlowCategoryTreeData().then(res => {
      treeData.value = res;
      tableApi.grid.loadData(treeData.value);
    })
  }

  reloadData();

  function createActions(row: Recordable<any>) {
    return [
      {
        auth: [PerPrefix + PerEnum.ADD],
        tooltip: '添加子分类',
        icon: 'ant-design:plus-outlined',
        onClick: handleCreateChild.bind(null, row),
      },
      {
        auth: [PerPrefix + PerEnum.UPDATE],
        tooltip: '修改',
        icon: 'clarity:note-edit-line',
        onClick: handleEdit.bind(null, row),
      },
      {
        auth: [PerPrefix + PerEnum.DELETE],
        tooltip: '删除',
        icon: 'ant-design:delete-outlined',
        danger: true,
        onClick: (e) => {
          e.stopPropagation();
        },
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

  onMounted(() => {
    getCompaniesListData().then((res) => {
      res.forEach((item) => {
        companiesMap.value[item.id] = item;
      });
    });
  });

  function handleCreate() {
    categoryModalRef.value.setData({});
    categoryModalRef.value.open();
    categoryModalRef.value.setState({
      title: '新增流程分类'
    });
  }

  function handleEdit(record: Recordable<any>, e) {
    e.stopPropagation();
    categoryModalRef.value.setData(record);
    categoryModalRef.value.open();
    categoryModalRef.value.setState({
      title: '修改流程分类'
    });
  }

  function handleCreateChild(record: Recordable<any>, e) {
    e.stopPropagation();
    categoryModalRef.value.setData({
      pid: record.id,
      frontShow: 1,
    });
    categoryModalRef.value.open();
    categoryModalRef.value.setState({
      title: '新增【' + record.name + '】的子分类'
    });
  }

  async function handleDelete(record: Recordable<any>, e) {
    e.stopPropagation();
    if (record.children && record.children.length > 0) {
      message.warning('有子节点，不能删除！');
      return;
    }
    const {success, msg} = await deleteByIds([record.id]);
    if (success) {
      tableApi.reload();
      message.success(msg);
    } else {
      message.error(msg);
    }
  }

  function handleSuccess() {
    tableApi.reload();
  }
</script>

<template>
  <Page auto-content-height>
    <BasicTable>
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix+PerEnum.ADD" type="primary" @click="handleCreate">新增</Button>
      </template>
      <template #action="{ row }">
        <TableAction :actions="createActions(row)"/>
      </template>

      <template #name="{ row }">
        <span v-html="highlightMatch(row.name)"></span>
      </template>
      <template #cName="{ row }">
        {{ companiesMap[row.companyId]?.shortName }}
      </template>
      <template #frontShow="{ row }">
        <Tag v-if="row.frontShow === 1" class="text-green-500">显示</Tag>
        <Tag v-else class="text-gray-500" >隐藏</Tag>
      </template>
    </BasicTable>
    <CategoryModal ref="categoryModalRef" @success="handleSuccess" />
  </Page>
</template>

<style lang="scss">
.highlight-text {
  color: #ff4d4f;
  font-weight: bold;
}
</style>
