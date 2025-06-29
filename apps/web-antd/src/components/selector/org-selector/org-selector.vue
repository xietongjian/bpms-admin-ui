<script setup lang="ts">
import { ref, watch, unref, defineProps,useAttrs, onMounted, computed, watchEffect } from 'vue';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons-vue';
import OrgSelectorModal from './org-selector-modal.vue';
import { ApiComponent } from '@vben/common-ui';

import {
  Select,
  TreeSelect,
  Tooltip,
  Tag,
  Popover,
} from 'ant-design-vue';

import {getCompaniesListData, getCompanyTreeData} from "#/api/org/company";
import {getOrgListData, getOrgTree} from "#/api/org/dept";
import {forEach} from "#/utils/helper/treeHelper";
import {objectOmit} from "@vueuse/core";

interface Props {
  multiple?: boolean;
  type?: 'org' | 'company' | 'dept';
  /**
   * 是否弹窗选择数据
   */
  selectOnModal?: boolean,
  placeholder?: string,
  // 仅在multipart=false单选时有效
  closeOnSelect?: boolean,
  // modelValue?: Array<any>,
  selectType?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请选择组织',
  multiple: false,
  type: 'org',
  closeOnSelect: true,
  // modelValue: () => [],
  selectOnModal: false,
  selectType: '',
});

onMounted(() => {
  !props.selectOnModal && initData();
});

const selectorDataList = ref([]);
const selectorRef = ref();
const orgSelectorModalRef = ref();
const treeData = ref([]);
const emit = defineEmits<{
  change: [string];
}>();

const modelValue = defineModel({default: [], type: Array});

const currentSelect = ref(undefined);

function handleDropdownVisibleChange(open) {
  // 展开时默认展开并滚动到选中的树节点
  if(open){
    // console.log(props.modelValue);
  }
}

function handleFilterTreeNode (searchValue: string, treeNode: any) {
  if (!searchValue) return false;
  return treeNode?.title?.indexOf(searchValue) > -1;
}

/*watchEffect(() => {
  // debugger;
  currentSelect.value = modelValue.value;
});

watch(
  () => currentSelect.value,
  (v) => {
    // debugger;
    emit('change', v);
  },
);*/

watch(
    () => modelValue.value,
    (v) => {
      debugger;
      // emit('change', v);
      // if (typeof props.change === 'function') {
      //   props.change(v);
      // }
    },
);

enum OrgSelectType {
  COMPANY = '1',
  DEPT = '2',
  ORG = '3',
}

async function initData() {
  if (props.type === 'company') {
    const res = await getCompaniesListData();
    debugger;
    treeData.value = res;
    if (unref(props.multiple)) {
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
    const res = await getOrgListData();
    debugger;
    treeData.value = res;
    const expandKeys = [];
    // 如果只能选择部门，则将公司的数据设置禁用
    if (props.selectType === OrgSelectType.DEPT) {
      forEach(res, (item) => {
        // 只能选部门
        item.disabled = item.sourceType === OrgSelectType.COMPANY; // 部门选择器，禁用公司的选项
        item.sourceType === OrgSelectType.COMPANY && expandKeys.push(item.id); // 如果只能选择部门，需要将公司全部展开
      });
    }

    treeData.value = res as unknown as any[];

    // if (unref(props.multiple)) {
    //   setTimeout(() => {
    //     // unref(treeRef)?.setCheckedKeys(selectedRowKeys);
    //   }, 200);
    // } else {
    //   setTimeout(() => {
    //     // TODO 这里有个问题：默认展开时无法展开父节点
    //     console.log(selectedRowKeys);
    //     // getTree()?.setSelectedKeys(selectedRowKeys);
    //   }, 200);
    // }
    // expandKeys.concat(selectedRowKeys);

    // getTree()?.setExpandedKeys(expandKeys);
  }
}

function openSelectorModal() {
  debugger;
  console.log(props);
  orgSelectorModalRef.value.setData({
    values: modelValue.value,
    ...props,
  });
  orgSelectorModalRef.value.setState({
    title: props.title || '选择组织'
  });
  orgSelectorModalRef.value.open();
}
const attrs = useAttrs();

const bindProps = computed(() => {
  return {
    ...objectOmit(attrs, ['onUpdate:value']),
  };
});

const api = computed(() => {
  switch (props.type){
    case 'company':
      return getCompanyTreeData;
    case 'dept':
      return getOrgListData;
    case 'org':
      return getOrgListData;
    default:
      return getOrgListData;
  }
})

function handleChange(items) {
  const selectedItems = JSON.parse(JSON.stringify(items));
  debugger;
  const result = selectedItems.map(item => {
    return {
      label: item.name || item.label || item.shortName,
      value: item.code || item.value,
      key: item.code,
      id: item.id,
      code: item.code,
      companyId: item.companyId,
      companyName: item.companyName,
      disabled: item.disabled,
      leaderCode: item.leaderCode,
      leaderName: item.leaderName,
      name: item.name,
      pid: item.pid,
      shortName: item.shortName,
      sourceType: item.sourceType,
    }
  });
  modelValue.value = result;
  currentSelect.value = result;
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

</script>
<template>
  <div class="w-full">
    <template v-if="selectOnModal">
      <Select
        v-bind="$attrs"
        ref="selectorRef"
        :value="modelValue"
        :placeholder="placeholder"
        class="w-full"
        :open="false"
        :mode="props.multiple? 'multiple': 'tags'"
        :allowClear="true"
        :labelInValue="true"
        maxTagPlaceholder=""
        @change="changeSelectItem"
        @click="openSelectorModal"
        :showArrow="true"
      >
        <template #clearIcon>
          <CloseCircleOutlined @click="clearSelectedList"/>
        </template>
        <template #suffixIcon>
          <SearchOutlined style="color: #666"/>
        </template>
        <template #[item]="data" v-for="item in Object.keys($slots)">
          <slot :name="item" v-bind="data"></slot>
        </template>
      </Select>

      <OrgSelectorModal ref="orgSelectorModalRef" @change="handleChange"/>
    </template>
    <template v-else>
<!--      <ApiComponent
          labelField="name"
          valueField="code"
          :api="api"
          class="w-full"
          placeholder="请选择"
          :labelInValue="true"
          :mode="'tags'"
          :allowClear="true"
          :component="TreeSelect"
          :treeDataSimpleMode="{id: 'id', pId: 'pid', rootPId: null}"
          loadingSlot="suffixIcon"
          optionsPropName="treeData"
          visibleEvent="onVisibleChange"
          :multiple="multiple"
          v-bind="bindProps"
        >
          <template #tagRender="{ label, closable, onClose, option }">
            <Popover :z-index="1200">
              <template #content>
                {{ label || '-' }}
              </template>
              <Tag class="flex items-center gap-1 !text-sm p-px m-px mr-1" :closable="closable"
                   :color="option.color" @close="onClose">
                <span class="size-4"></span>
                {{ label || '-' }}
              </Tag>
            </Popover>
          </template>
      </ApiComponent>-->
      <TreeSelect
          labelField="name"
          valueField="id"
          ref="selectorRef"
          searchPlaceholder="请选择"
          v-model:value="modelValue"
          :placeholder="placeholder"
          :treeCheckStrictly="props.multiple"
          showCheckedStrategy="SHOW_ALL"
          class="w-full "
          :multiple="props.multiple"
          :allowClear="true"
          :labelInValue="props.multiple"
          :tree-data="treeData"
          :treeDataSimpleMode="{id: 'id', pId: 'pid', rootPId: null}"
          :showSearch="true"
          :filterTreeNode="handleFilterTreeNode"
      >
<!--        <template #tagRender="{ label, closable, onClose, option }">
          <Popover :z-index="1200">
            <template #content>
              {{ label || '-' }}
            </template>
            <Tag class="flex items-center gap-1 !text-sm p-px m-px mr-1" :closable="closable" :color="option.color" @close="onClose">
              <span class="icon-building2 size-4" ></span>
              {{ label || '-' }}
            </Tag>
          </Popover>
        </template>-->
      </TreeSelect>
    </template>
  </div>
</template>
